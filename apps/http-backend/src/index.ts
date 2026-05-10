import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";
import {
  CreateUserSchema,
  JoinRoomSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

loadLocalEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});
app.use(express.json());

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only JPG, PNG, WEBP, and GIF images are allowed"));
  },
});

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const hashedPass = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: hashedPass,
        name: parsedData.data?.name,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exist with this username",
    });
  }
});

app.post("/signin", async (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: data.data.username,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "User not Found",
    });
    return;
  }

  const isMatch = await bcrypt.compare(data.data.password, user.password);

  if (!isMatch) {
    res.json({
      message: "Incorrect Credentials",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  try {
    //@ts-ignore
    const userId = req.userId;
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        password: await bcrypt.hash(parsedData.data.password, 10),
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    console.error("Failed to create room", e);

    if (isPrismaError(e, "P2002")) {
      res.status(409).json({
        message: "Room already exists with this name",
      });
      return;
    }

    if (isPrismaError(e, "P2022")) {
      res.status(500).json({
        message: "Database migration is missing. Please apply the latest room password migration.",
      });
      return;
    }

    res.status(500).json({
      message: "Could not create room. Please try again.",
    });
  }
});

app.post("/room/join", middleware, async (req, res) => {
  const parsedData = JoinRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const room = await prismaClient.room.findFirst({
    where: {
      slug: parsedData.data.name,
    },
  });

  if (!room) {
    res.status(404).json({
      message: "Room not found",
    });
    return;
  }

  const passwordMatches = await bcrypt.compare(
    parsedData.data.password,
    room.password,
  );

  if (!passwordMatches) {
    res.status(403).json({
      message: "Incorrect room password",
    });
    return;
  }

  res.json({
    roomId: room.id,
  });
});

app.post(
  "/image/upload",
  middleware,
  imageUpload.single("image"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({
        message: "Image file is required",
      });
      return;
    }

    const roomId = Number(req.body.roomId);
    const x = Number(req.body.x);
    const y = Number(req.body.y);
    const width = Number(req.body.width);
    const height = Number(req.body.height);

    if (
      !Number.isInteger(roomId) ||
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      width <= 0 ||
      height <= 0
    ) {
      res.status(400).json({
        message: "Valid room id and image position are required",
      });
      return;
    }

    try {
      const uploadResult = await uploadBufferToCloudinary(req.file.buffer);
      //@ts-ignore
      const userId = req.userId;
      const canvasImage = await prismaClient.canvasImage.create({
        data: {
          roomId,
          userId,
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          x,
          y,
          width,
          height,
        },
      });

      res.json({
        image: canvasImage,
      });
    } catch (e) {
      console.error("Failed to upload image", e);
      res.status(500).json({
        message: "Could not upload image",
      });
    }
  },
);

app.get("/images/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);

  if (!Number.isInteger(roomId)) {
    res.status(400).json({
      message: "Invalid room id",
    });
    return;
  }

  const images = await prismaClient.canvasImage.findMany({
    where: {
      roomId,
    },
    orderBy: {
      id: "asc",
    },
  });

  res.json({
    images,
  });
});

app.get("/rooms/me", middleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  const rooms = await prismaClient.room.findMany({
    where: {
      adminId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      createdAt: true,
      _count: {
        select: {
          chats: true,
        },
      },
    },
  });

  res.json({
    rooms,
  });
});

app.delete("/room/:roomId", middleware, async (req, res) => {
  const roomId = Number(req.params.roomId);
  if (!Number.isInteger(roomId)) {
    res.status(400).json({
      message: "Invalid room id",
    });
    return;
  }

  //@ts-ignore
  const userId = req.userId;

  const room = await prismaClient.room.findFirst({
    where: {
      id: roomId,
    },
  });

  if (!room) {
    res.status(404).json({
      message: "Room not found",
    });
    return;
  }

  if (room.adminId !== userId) {
    res.status(403).json({
      message: "You can only delete rooms created by you",
    });
    return;
  }

  await prismaClient.chat.deleteMany({
    where: {
      roomId,
    },
  });

  await prismaClient.canvasImage.deleteMany({
    where: {
      roomId,
    },
  });

  await prismaClient.room.delete({
    where: {
      id: roomId,
    },
  });

  res.json({
    message: "Room deleted",
  });
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 1000,
  });
  res.json({
    messages,
  });
});

app.get("/room/:slug", async (req,res)=> {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where:{
      slug
    }
  })

  res.json({
    room
  })
})

const port = Number(process.env.PORT ?? 3001);

app.listen(port);

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === code
  );
}

function uploadBufferToCloudinary(buffer: Buffer) {
  return new Promise<{
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "exciledraw/canvas-images",
        resource_type: "image",
        transformation: [
          {
            width: 1600,
            height: 1600,
            crop: "limit",
          },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        });
      },
    );

    uploadStream.end(buffer);
  });
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const envFile = fs.readFileSync(envPath, "utf8");

  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) return;

    const equalsIndex = trimmedLine.indexOf("=");
    if (equalsIndex === -1) return;

    const key = trimmedLine.slice(0, equalsIndex).trim();
    const value = trimmedLine.slice(equalsIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}
