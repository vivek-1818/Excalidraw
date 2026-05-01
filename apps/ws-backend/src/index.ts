import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}

interface User {
  ws: WebSocket;
  rooms: number[];
  userId: string;
}

let users: User[] = [];

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("close", () => {
    users = users.filter((user) => user.ws !== ws);
  });

  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data as unknown as string);

    if (parsedData.type == "join_room") {
      const user = users.find((x) => x.ws === ws);
      const roomId = Number(parsedData.roomId);
      if (Number.isInteger(roomId)) {
        user?.rooms.push(roomId);
      }
    }

    if (parsedData.type == "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      const roomId = Number(parsedData.roomId);
      user.rooms = user.rooms.filter((x) => x !== roomId);
    }

    if (parsedData.type == "chat") {
      const roomId = Number(parsedData.roomId);
      if (!Number.isInteger(roomId)) {
        return;
      }
      const message = parsedData.message;

      if (typeof message !== "string") {
        return;
      }

      try {
        await prismaClient.chat.create({
          data: {
            roomId,
            message,
            userId,
          },
        });
      } catch (e) {
        console.error("Failed to save chat message", e);
        return;
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            }),
          );
        }
      });
    }
  });
});
