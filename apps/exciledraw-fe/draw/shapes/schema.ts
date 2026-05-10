import type { EraseOperation, Point, Shape } from "../types";

export function isShape(value: unknown): value is Shape {
  if (!value || typeof value !== "object") {
    return false;
  }

  const shape = value as Partial<Shape>;

  if (shape.color !== undefined && typeof shape.color !== "string") {
    return false;
  }

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

  if (shape.type === "line" || shape.type === "arrow") {
    return (
      typeof shape.startX === "number" &&
      typeof shape.startY === "number" &&
      typeof shape.endX === "number" &&
      typeof shape.endY === "number"
    );
  }

  if (shape.type === "diamond") {
    return (
      typeof shape.x === "number" &&
      typeof shape.y === "number" &&
      typeof shape.width === "number" &&
      typeof shape.height === "number"
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

export function isPoint(value: unknown): value is Point {
  if (!value || typeof value !== "object") {
    return false;
  }

  const point = value as Partial<Point>;

  return typeof point.x === "number" && typeof point.y === "number";
}

export function isEraseOperation(value: unknown): value is EraseOperation {
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
