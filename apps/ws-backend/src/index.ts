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

      const ownedMessage = attachOwnerToShapeMessage(message, userId);

      let chatId: number;

      try {
        const chat = await prismaClient.chat.create({
          data: {
            roomId,
            message: ownedMessage,
            userId,
          },
        });
        chatId = chat.id;
      } catch (e) {
        console.error("Failed to save chat message", e);
        return;
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              id: chatId,
              message: ownedMessage,
              roomId,
              userId,
            }),
          );
        }
      });
    }

    if (parsedData.type == "erase") {
      const roomId = Number(parsedData.roomId);
      if (!Number.isInteger(roomId)) {
        return;
      }

      if (!Array.isArray(parsedData.ids)) {
        return;
      }

      const ids = parsedData.ids
        .map((id: unknown) => Number(id))
        .filter((id: number) => Number.isInteger(id));

      if (ids.length === 0) {
        return;
      }

      let deletedIds: number[] = [];

      try {
        const ownedChats = await prismaClient.chat.findMany({
          where: {
            roomId,
            userId,
            id: {
              in: ids,
            },
          },
          select: {
            id: true,
          },
        });

        deletedIds = ownedChats.map((chat) => chat.id);

        if (deletedIds.length === 0) {
          return;
        }

        await prismaClient.chat.deleteMany({
          where: {
            roomId,
            userId,
            id: {
              in: deletedIds,
            },
          },
        });
      } catch (e) {
        console.error("Failed to erase chat messages", e);
        return;
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "erase",
              ids: deletedIds,
              roomId,
            }),
          );
        }
      });
    }

    if (parsedData.type == "update_shape") {
      const roomId = Number(parsedData.roomId);
      const id = Number(parsedData.id);
      const message = parsedData.message;

      if (
        !Number.isInteger(roomId) ||
        !Number.isInteger(id) ||
        typeof message !== "string"
      ) {
        return;
      }

      const ownedMessage = attachOwnerToShapeMessage(message, userId);

      try {
        const result = await prismaClient.chat.updateMany({
          where: {
            roomId,
            id,
            userId,
          },
          data: {
            message: ownedMessage,
          },
        });

        if (result.count === 0) {
          return;
        }
      } catch (e) {
        console.error("Failed to update shape message", e);
        return;
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "update_shape",
              id,
              message: ownedMessage,
              roomId,
              userId,
            }),
          );
        }
      });
    }

    if (parsedData.type == "camera") {
      const roomId = Number(parsedData.roomId);
      const x = Number(parsedData.x);
      const y = Number(parsedData.y);

      if (
        !Number.isInteger(roomId) ||
        !Number.isFinite(x) ||
        !Number.isFinite(y)
      ) {
        return;
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "camera",
              roomId,
              clientId:
                typeof parsedData.clientId === "string"
                  ? parsedData.clientId
                  : undefined,
              x,
              y,
            }),
          );
        }
      });
    }
  });
});

function attachOwnerToShapeMessage(message: string, userId: string) {
  try {
    const parsed = JSON.parse(message);
    if (!parsed || typeof parsed !== "object" || parsed.type === "erase") {
      return message;
    }

    return JSON.stringify({
      ...parsed,
      ownerId: userId,
    });
  } catch {
    return message;
  }
}
