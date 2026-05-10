import { ERASER_SIZE, TEXT_FONT } from "../constants";
import type { Camera, Point, Shape } from "../types";
import { getTextLines } from "./text";

export function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  ctx.strokeStyle = "white";

  if (shape.type === "rect") {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  } else if (shape.type === "circle") {
    const radiusX = Math.abs(shape.radiusX ?? shape.radius ?? 0);
    const radiusY = Math.abs(shape.radiusY ?? shape.radius ?? 0);

    ctx.beginPath();
    ctx.ellipse(shape.centerX, shape.centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  } else if (shape.type === "pencil") {
    drawPencil(ctx, shape.points);
  } else if (shape.type === "text") {
    drawText(ctx, shape);
  }
}

export function drawPencil(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  points.slice(1).forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.stroke();
  ctx.closePath();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  shape: Extract<Shape, { type: "text" }>,
) {
  ctx.fillStyle = "white";
  ctx.font = TEXT_FONT;
  ctx.textBaseline = "top";

  getTextLines(shape.text).forEach((line, index) => {
    ctx.fillText(line, shape.x, shape.y + index * 24);
  });
}

export function drawEraser(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  camera: Camera,
) {
  ctx.strokeStyle = "white";
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(
    x - camera.x - ERASER_SIZE,
    y - camera.y - ERASER_SIZE,
    ERASER_SIZE * 2,
    ERASER_SIZE * 2,
  );
  ctx.setLineDash([]);
}
