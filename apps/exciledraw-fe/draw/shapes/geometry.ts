import { ERASER_SIZE } from "../constants";
import type { Point, Shape } from "../types";
import { getTextHeight, getTextWidth } from "./text";

export function isPointNearShape(
  x: number,
  y: number,
  shape: Shape,
  measureText?: (text: string) => number,
) {
  if (shape.type === "rect") {
    const left = Math.min(shape.x, shape.x + shape.width) - ERASER_SIZE;
    const right = Math.max(shape.x, shape.x + shape.width) + ERASER_SIZE;
    const top = Math.min(shape.y, shape.y + shape.height) - ERASER_SIZE;
    const bottom = Math.max(shape.y, shape.y + shape.height) + ERASER_SIZE;

    return x >= left && x <= right && y >= top && y <= bottom;
  }

  if (shape.type === "circle") {
    const radiusX = Math.abs(shape.radiusX ?? shape.radius ?? 0) + ERASER_SIZE;
    const radiusY = Math.abs(shape.radiusY ?? shape.radius ?? 0) + ERASER_SIZE;

    if (radiusX === 0 || radiusY === 0) return false;

    const normalizedX = (x - shape.centerX) / radiusX;
    const normalizedY = (y - shape.centerY) / radiusY;

    return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
  }

  if (shape.type === "pencil") {
    return shape.points.some((point, index) => {
      const nextPoint = shape.points[index + 1];

      if (!nextPoint) {
        return distanceBetweenPoints(x, y, point.x, point.y) <= ERASER_SIZE;
      }

      return distanceToSegment(x, y, point, nextPoint) <= ERASER_SIZE;
    });
  }

  if (shape.type === "text") {
    const width = getTextWidth(shape.text, measureText);
    const height = getTextHeight(shape.text);

    return (
      x >= shape.x - ERASER_SIZE &&
      x <= shape.x + width + ERASER_SIZE &&
      y >= shape.y - ERASER_SIZE &&
      y <= shape.y + height + ERASER_SIZE
    );
  }

  return false;
}

export function distanceBetweenPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export function distanceToSegment(x: number, y: number, start: Point, end: Point) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (dx === 0 && dy === 0) {
    return distanceBetweenPoints(x, y, start.x, start.y);
  }

  const t = Math.max(
    0,
    Math.min(
      1,
      ((x - start.x) * dx + (y - start.y) * dy) / (dx * dx + dy * dy),
    ),
  );

  return distanceBetweenPoints(x, y, start.x + t * dx, start.y + t * dy);
}
