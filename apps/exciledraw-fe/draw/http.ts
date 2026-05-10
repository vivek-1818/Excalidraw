import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { isPointNearShape } from "./shapes/geometry";
import { isEraseOperation, isShape } from "./shapes/schema";
import type { DrawMessage, Shape } from "./types";

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = [...res.data.messages].reverse();
  let shapes: Shape[] = [];

  messages.forEach((x: { id: number; message: string }) => {
    const parsedMessage = parseDrawMessage(x.message);

    if (!parsedMessage) return;

    if (parsedMessage.type === "erase") {
      shapes = shapes.filter(
        (shape) => !isPointNearShape(parsedMessage.x, parsedMessage.y, shape),
      );
    } else {
      shapes.push({
        ...parsedMessage,
        id: x.id,
      });
    }
  });

  return shapes;
}

export function parseShapeMessage(message: string): Shape | null {
  const parsedMessage = parseDrawMessage(message);

  return parsedMessage && parsedMessage.type !== "erase" ? parsedMessage : null;
}

export function parseDrawMessage(message: string): DrawMessage | null {
  try {
    const messageData = JSON.parse(message);
    const shape = messageData?.shape ?? messageData;

    if (isEraseOperation(shape)) {
      return shape;
    }

    return isShape(shape) ? shape : null;
  } catch {
    return null;
  }
}
