import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { isPointNearShape } from "./shapes/geometry";
import { isEraseOperation, isShape } from "./shapes/schema";
import type { DrawMessage, Shape } from "./types";

export async function getExistingShapes(roomId: string) {
  const [chatRes, imageRes] = await Promise.all([
    axios.get(`${HTTP_BACKEND}/chats/${roomId}`),
    axios.get(`${HTTP_BACKEND}/images/${roomId}`),
  ]);
  const messages = [...chatRes.data.messages].reverse();
  let shapes: Shape[] = [];

  messages.forEach((x: { id: number; message: string; userId?: string }) => {
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
        ownerId: x.userId ?? parsedMessage.ownerId,
      });
    }
  });

  const imageShapes: Shape[] = (imageRes.data.images ?? []).map(
    (image: {
      id: number;
      imageUrl: string;
      x: number;
      y: number;
      width: number;
      height: number;
      userId?: string;
    }) => ({
      type: "image",
      imageId: image.id,
      clientId: `image-${image.id}`,
      imageUrl: image.imageUrl,
      x: image.x,
      y: image.y,
      width: image.width,
      height: image.height,
      ownerId: image.userId,
    }),
  );

  shapes = [...shapes, ...imageShapes];

  return shapes;
}

export async function uploadCanvasImage({
  file,
  roomId,
  x,
  y,
  width,
  height,
}: {
  file: File;
  roomId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", file);
  formData.append("roomId", roomId);
  formData.append("x", String(x));
  formData.append("y", String(y));
  formData.append("width", String(width));
  formData.append("height", String(height));

  const res = await axios.post(`${HTTP_BACKEND}/image/upload`, formData, {
    headers: {
      Authorization: token ?? "",
    },
  });

  const image = res.data.image as {
    id: number;
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
    userId?: string;
  };

  return {
    type: "image",
    imageId: image.id,
    clientId: `image-${image.id}`,
    imageUrl: image.imageUrl,
    x: image.x,
    y: image.y,
    width: image.width,
    height: image.height,
    ownerId: image.userId,
  } satisfies Shape;
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
