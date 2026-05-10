import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import type { Shape } from "./Game";

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages
    .map((x: { message: string }) => parseShapeMessage(x.message))
    .filter((shape: Shape | null): shape is Shape => Boolean(shape));

  return shapes;
}

export function parseShapeMessage(message: string): Shape | null {
  try {
    const messageData = JSON.parse(message);
    const shape = messageData?.shape ?? messageData;

    return isShape(shape) ? shape : null;
  } catch {
    return null;
  }
}

function isShape(value: unknown): value is Shape {
  if (!value || typeof value !== "object") {
    return false;
  }

  const shape = value as Partial<Shape>;

  if (shape.type === "rect") {
    return (
      typeof shape.x === "number" &&
      typeof shape.y === "number" &&
      typeof shape.width === "number" &&
      typeof shape.height === "number"
    );
  }

  if (shape.type === "circle") {
    const hasRadius = typeof shape.radius === "number";
    const hasEllipseRadii =
      typeof shape.radiusX === "number" && typeof shape.radiusY === "number";

    return (
      typeof shape.centerX === "number" &&
      typeof shape.centerY === "number" &&
      (hasRadius || hasEllipseRadii)
    );
  }

  return false;
}
