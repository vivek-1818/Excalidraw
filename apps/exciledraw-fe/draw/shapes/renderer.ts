import { ERASER_SIZE, TEXT_FONT } from "../constants";
import type { Camera, Point, Shape } from "../types";
import { getTextLines } from "./text";

const imageCache = new Map<string, HTMLImageElement>();

export function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  overrideColor?: string,
) {
  const color = overrideColor ?? shape.color ?? "white";
  ctx.strokeStyle = color;

  if (shape.type === "rect") {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  } else if (shape.type === "circle") {
    const radiusX = Math.abs(shape.radiusX ?? shape.radius ?? 0);
    const radiusY = Math.abs(shape.radiusY ?? shape.radius ?? 0);

    ctx.beginPath();
    ctx.ellipse(shape.centerX, shape.centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  } else if (shape.type === "line") {
    drawLine(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
  } else if (shape.type === "arrow") {
    drawArrow(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
  } else if (shape.type === "diamond") {
    drawDiamond(ctx, shape.x, shape.y, shape.width, shape.height);
  } else if (shape.type === "pencil") {
    drawPencil(ctx, shape.points);
  } else if (shape.type === "text") {
    drawText(ctx, shape, color);
  } else if (shape.type === "image") {
    drawImage(ctx, shape);
  }
}

export function preloadCanvasImage(imageUrl: string, onLoad: () => void) {
  const cachedImage = imageCache.get(imageUrl);

  if (cachedImage) {
    if (cachedImage.complete) onLoad();
    return cachedImage;
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = onLoad;
  image.src = imageUrl;
  imageCache.set(imageUrl, image);

  return image;
}

export function drawImage(
  ctx: CanvasRenderingContext2D,
  shape: Extract<Shape, { type: "image" }>,
) {
  const image = imageCache.get(shape.imageUrl);

  if (image?.complete && image.naturalWidth > 0) {
    ctx.drawImage(image, shape.x, shape.y, shape.width, shape.height);
    return;
  }

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  ctx.restore();
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

export function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.closePath();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  drawLine(ctx, startX, startY, endX, endY);

  const angle = Math.atan2(endY - startY, endX - startX);
  const headLength = 14;

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6),
  );
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6),
  );
  ctx.stroke();
  ctx.closePath();
}

export function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width, y + height / 2);
  ctx.lineTo(x + width / 2, y + height);
  ctx.lineTo(x, y + height / 2);
  ctx.closePath();
  ctx.stroke();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  shape: Extract<Shape, { type: "text" }>,
  overrideColor?: string,
) {
  ctx.fillStyle = overrideColor ?? shape.color ?? "white";
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
