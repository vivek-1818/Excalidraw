import { Tool } from "@/components/Canvas";
import { getExistingShapes, parseShapeMessage } from "./http";

export type Point = {
  x: number;
  y: number;
};

export type Shape =
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
      type: "pencil";
      points: Point[];
    }
  | {
      type: "text";
      x: number;
      y: number;
      text: string;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private currentPencilPoints: Point[] = [];
  private activeTextInput: HTMLInputElement | null = null;
  private selectedTool: Tool = "circle";
  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.activeTextInput?.remove();
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedShape = parseShapeMessage(message.message);

        if (!parsedShape) return;

        this.existingShapes.push(parsedShape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "white";

      if (shape.type === "rect") {
        this.ctx.strokeRect(
          shape.x,
          shape.y,
          shape.width,
          shape.height,
        );
      } else if (shape.type === "circle") {
        const radiusX = Math.abs(shape.radiusX ?? shape.radius ?? 0);
        const radiusY = Math.abs(shape.radiusY ?? shape.radius ?? 0);

        this.ctx.beginPath();

        this.ctx.ellipse(
          shape.centerX,
          shape.centerY,
          radiusX,
          radiusY,
          0,
          0,
          Math.PI * 2,
        );

        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        this.drawPencil(shape.points);
      } else if (shape.type === "text") {
        this.drawText(shape);
      }
    });
  }

  drawPencil(points: Point[]) {
    if (points.length < 2) return;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    points.slice(1).forEach((point) => {
      this.ctx.lineTo(point.x, point.y);
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawText(shape: Extract<Shape, { type: "text" }>) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px sans-serif";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(shape.text, shape.x, shape.y);
  }

  addShape(shape: Shape) {
    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape),
      }),
    );

    this.clearCanvas();
  }

  createTextInput(x: number, y: number) {
    this.activeTextInput?.remove();

    const input = document.createElement("input");
    input.type = "text";
    input.style.position = "fixed";
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.style.zIndex = "20";
    input.style.background = "transparent";
    input.style.color = "white";
    input.style.border = "1px solid white";
    input.style.outline = "none";
    input.style.font = "20px sans-serif";
    input.style.padding = "2px 4px";

    let finished = false;

    const finish = (save: boolean) => {
      if (finished) return;

      finished = true;
      const text = input.value.trim();
      input.remove();
      this.activeTextInput = null;

      if (save && text) {
        this.addShape({
          type: "text",
          x,
          y,
          text,
        });
      }
    };

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        finish(true);
      } else if (event.key === "Escape") {
        finish(false);
      }
    });

    input.addEventListener("blur", () => {
      finish(true);
    });

    document.body.appendChild(input);
    this.activeTextInput = input;
    input.focus();
  }

  mouseDownHandler = (e: MouseEvent) => {
    if (this.selectedTool === "text") {
      this.clicked = false;
      this.createTextInput(e.clientX, e.clientY);
      return;
    }

    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.currentPencilPoints = [{ x: e.clientX, y: e.clientY }];
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    let shape: Shape | null = null;

    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.selectedTool === "circle") {
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);

      shape = {
        type: "circle",
        radiusX,
        radiusY,
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    } else if (this.selectedTool === "pencil") {
      this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });

      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
      };
    }

    if (!shape) return;

    this.addShape(shape);
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    this.clearCanvas();

    this.ctx.strokeStyle = "white";

    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedTool === "circle") {
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);

      const centerX = this.startX + width / 2;
      const centerY = this.startY + height / 2;

      this.ctx.beginPath();

      this.ctx.ellipse(
        centerX,
        centerY,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2,
      );

      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.selectedTool === "pencil") {
      this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
      this.drawPencil(this.currentPencilPoints);
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
