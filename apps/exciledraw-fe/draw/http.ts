import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { isPointNearShape } from "./shapes/geometry";
import type { DrawMessage, EraseOperation, Point, Shape } from "./types";

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

  if (shape.type === "pencil") {
    return (
      Array.isArray(shape.points) &&
      shape.points.length > 1 &&
      shape.points.every(isPoint)
    );
  }

  if (shape.type === "text") {
    return (
      typeof shape.x === "number" &&
      typeof shape.y === "number" &&
      typeof shape.text === "string"
    );
  }

  return false;
}

function isPoint(value: unknown): value is Point {
  if (!value || typeof value !== "object") {
    return false;
  }

  const point = value as Partial<Point>;

  return typeof point.x === "number" && typeof point.y === "number";
}

function isEraseOperation(value: unknown): value is EraseOperation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const operation = value as Partial<EraseOperation>;

  return (
    operation.type === "erase" &&
    typeof operation.x === "number" &&
    typeof operation.y === "number"
  );
}
