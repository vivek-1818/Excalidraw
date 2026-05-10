import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius?: number;
      radiusX?: number;
      radiusY?: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
) {
  const ctx = canvas.getContext("2d");
  let existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = parseShapeMessage(message.message);
      if (!parsedShape) {
        return;
      }
      existingShapes.push(parsedShape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    //@ts-ignore
    const selectedTool = window.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);
      shape = {
        type: "circle",
        radiusX,
        radiusY,
        centerX: startX + width / 2,
        centerY: startY + height / 2,
      };
    }
    if(!shape){
        return
    }
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify(shape),
      }),
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      //@ts-ignore
      const selectedTool = window.selectedTool;
      if (selectedTool === "rect") {
        ctx.strokeRect(startX, startY, width, height);
      } else if (selectedTool === "circle") {
        const radiusX = Math.abs(width / 2);
        const radiusY = Math.abs(height / 2);
        const centerX = startX + width / 2;
        const centerY = startY + height / 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      }
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      const radiusX = Math.abs(shape.radiusX ?? shape.radius ?? 0);
      const radiusY = Math.abs(shape.radiusY ?? shape.radius ?? 0);

      ctx.beginPath();
      ctx.ellipse(
        shape.centerX,
        shape.centerY,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.closePath();
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages
    .map((x: { message: string }) => parseShapeMessage(x.message))
    .filter((shape: Shape | null): shape is Shape => Boolean(shape));
  return shapes;
}

function parseShapeMessage(message: string): Shape | null {
  try {
    const messageData = JSON.parse(message);
    return isShape(messageData) ? messageData : null;
  } catch {
    return null;
  }
}

function isShape(value: unknown): value is Shape {
  if (!value || typeof value !== "object") {
    return false;
  }

  const shape = value as Partial<Shape>;
  return shape.type === "rect" || shape.type === "circle";
  /*  */
}
