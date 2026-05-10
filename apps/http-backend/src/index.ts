import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import {
  CreateUserSchema,
  JoinRoomSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});
app.use(express.json());

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

app.listen(3001);

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === code
  );
}
