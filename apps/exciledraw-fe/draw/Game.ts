import { Tool } from "@/components/Canvas";
import { getExistingShapes, parseShapeMessage } from "./http";

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
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
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
  }

  setTool(tool: "circle" | "rect") {
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
      }
    });
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
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
    }

    if (!shape) return;

    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape),
      }),
    );

    this.clearCanvas();
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
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
