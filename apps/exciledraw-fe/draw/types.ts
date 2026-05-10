export type Point = {
  x: number;
  y: number;
};

export type Shape = (
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
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "diamond";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "pencil";
      points: Point[];
    }
  | {
      type: "text";
      x: number;
      y: number;
      text: string;
    }
) & {
  id?: number;
  clientId?: string;
  color?: string;
  ownerId?: string;
};

export type EraseOperation = {
  type: "erase";
  x: number;
  y: number;
};

export type DrawMessage = Shape | EraseOperation;

export type Camera = {
  x: number;
  y: number;
};
