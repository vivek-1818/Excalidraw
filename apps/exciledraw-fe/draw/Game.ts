import { Tool } from "@/components/Canvas";
import { getExistingShapes, parseDrawMessage } from "./http";
import { isPointNearShape } from "./shapes/geometry";
import { drawEraser, drawPencil, drawShape } from "./shapes/renderer";
import { createTextInput, removeTextInput } from "./ui/textInput";
import type { Camera, Point, Shape } from "./types";

export type { Point, Shape } from "./types";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private currentPencilPoints: Point[] = [];
  private activeTextInput: HTMLTextAreaElement | null = null;
  private camera: Camera = { x: 0, y: 0 };
  private isPanning = false;
  private lastPanX = 0;
  private lastPanY = 0;
  private selectedTool: Tool = "select";
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
    this.resize();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("mouseleave", this.mouseLeaveHandler);
    this.canvas.removeEventListener("wheel", this.wheelHandler);
    window.removeEventListener("resize", this.resize);
    removeTextInput(this.activeTextInput);
    this.activeTextInput = null;
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  resize = () => {
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    if (this.canvas.width !== width) {
      this.canvas.width = width;
    }

    if (this.canvas.height !== height) {
      this.canvas.height = height;
    }

    this.clearCanvas();
  };

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedMessage = parseDrawMessage(message.message);
        if (!parsedMessage) return;

        if (parsedMessage.type === "erase") {
          this.eraseAt(parsedMessage.x, parsedMessage.y);
          return;
        }

        this.upsertShape({
          ...parsedMessage,
          id: typeof message.id === "number" ? message.id : parsedMessage.id,
        });
      } else if (message.type === "erase") {
        if (Array.isArray(message.ids)) {
          this.removeShapesByIds(message.ids);
        }
      }
    };
  }

  clearCanvas() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);
    this.existingShapes.forEach((shape) => drawShape(this.ctx, shape));
    this.ctx.restore();
  }

  upsertShape(shape: Shape) {
    const pendingShapeIndex = shape.clientId
      ? this.existingShapes.findIndex(
          (existingShape) => existingShape.clientId === shape.clientId,
        )
      : -1;

    if (pendingShapeIndex >= 0) {
      this.existingShapes[pendingShapeIndex] = shape;
    } else {
      this.existingShapes.push(shape);
    }

    this.clearCanvas();
  }

  addShape(shape: Shape) {
    const shapeWithClientId = {
      ...shape,
      clientId: shape.clientId ?? crypto.randomUUID(),
    };

    this.existingShapes.push(shapeWithClientId);
    this.sendDrawMessage(shapeWithClientId);
    this.clearCanvas();
  }

  eraseAt(x: number, y: number, broadcast = false) {
    const erasedShapes = this.existingShapes.filter((shape) =>
      isPointNearShape(x, y, shape, (text) => {
        this.ctx.font = "20px sans-serif";
        return this.ctx.measureText(text).width;
      }),
    );

    if (erasedShapes.length === 0) return false;

    this.existingShapes = this.existingShapes.filter(
      (shape) => !erasedShapes.includes(shape),
    );
    this.clearCanvas();

    if (broadcast) {
      const ids = erasedShapes
        .map((shape) => shape.id)
        .filter((id): id is number => typeof id === "number");

      if (ids.length > 0) {
        this.sendEraseMessage(ids);
      }
    }

    return true;
  }

  removeShapesByIds(ids: number[]) {
    const idsToRemove = new Set(ids);
    this.existingShapes = this.existingShapes.filter(
      (shape) => typeof shape.id !== "number" || !idsToRemove.has(shape.id),
    );
    this.clearCanvas();
  }

  sendDrawMessage(message: Shape | { type: "erase"; x: number; y: number }) {
    this.socket.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(message),
      }),
    );
  }

  sendEraseMessage(ids: number[]) {
    this.socket.send(
      JSON.stringify({
        type: "erase",
        roomId: this.roomId,
        ids,
      }),
    );
  }

  getWorldPoint(e: MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left + this.camera.x,
      y: e.clientY - rect.top + this.camera.y,
    };
  }

  openTextInput(clientX: number, clientY: number) {
    removeTextInput(this.activeTextInput);
    this.activeTextInput = null;

    const canvasRect = this.canvas.getBoundingClientRect();
    const x = clientX - canvasRect.left + this.camera.x;
    const y = clientY - canvasRect.top + this.camera.y;

    this.activeTextInput = createTextInput({
      clientX,
      clientY,
      onSubmit: (text) => {
        this.activeTextInput = null;
        this.addShape({ type: "text", x, y, text });
      },
      onCancel: () => {
        this.activeTextInput = null;
      },
    });
  }

  startPan(e: MouseEvent) {
    e.preventDefault();
    this.isPanning = true;
    this.lastPanX = e.clientX;
    this.lastPanY = e.clientY;
  }

  updatePan(e: MouseEvent) {
    this.camera.x -= e.clientX - this.lastPanX;
    this.camera.y -= e.clientY - this.lastPanY;
    this.lastPanX = e.clientX;
    this.lastPanY = e.clientY;
    this.clearCanvas();
  }

  drawPreview(width: number, height: number) {
    this.clearCanvas();
    this.ctx.strokeStyle = "white";
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedTool === "circle") {
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);

      this.ctx.beginPath();
      this.ctx.ellipse(
        this.startX + width / 2,
        this.startY + height / 2,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2,
      );
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.selectedTool === "pencil") {
      drawPencil(this.ctx, this.currentPencilPoints);
    }

    this.ctx.restore();
  }

  mouseDownHandler = (e: MouseEvent) => {
    if (e.button === 1 || this.selectedTool === "select") {
      this.startPan(e);
      return;
    }

    if (this.selectedTool === "text") {
      e.preventDefault();
      e.stopPropagation();
      this.clicked = false;
      this.openTextInput(e.clientX, e.clientY);
      return;
    }

    const point = this.getWorldPoint(e);
    this.clicked = true;
    this.startX = point.x;
    this.startY = point.y;
    this.currentPencilPoints = [point];

    if (this.selectedTool === "eraser") {
      const erased = this.eraseAt(point.x, point.y, true);
      if (!erased) this.clearCanvas();
      drawEraser(this.ctx, point.x, point.y, this.camera);
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (this.isPanning) {
      this.isPanning = false;
      return;
    }

    this.clicked = false;

    if (this.selectedTool === "text") return;
    if (this.selectedTool === "eraser") {
      this.clearCanvas();
      return;
    }

    const point = this.getWorldPoint(e);
    const width = point.x - this.startX;
    const height = point.y - this.startY;
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
      shape = {
        type: "circle",
        radiusX: Math.abs(width / 2),
        radiusY: Math.abs(height / 2),
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    } else if (this.selectedTool === "pencil") {
      this.currentPencilPoints.push(point);
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
      };
    }

    if (shape) {
      this.addShape(shape);
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.isPanning) {
      this.updatePan(e);
      return;
    }

    if (!this.clicked) return;

    const point = this.getWorldPoint(e);
    const width = point.x - this.startX;
    const height = point.y - this.startY;

    if (this.selectedTool === "eraser") {
      const erased = this.eraseAt(point.x, point.y, true);
      if (!erased) this.clearCanvas();
      drawEraser(this.ctx, point.x, point.y, this.camera);
      return;
    }

    if (this.selectedTool === "pencil") {
      this.currentPencilPoints.push(point);
    }

    this.drawPreview(width, height);
  };

  mouseLeaveHandler = () => {
    if (this.selectedTool === "eraser") {
      this.clearCanvas();
    }
    this.isPanning = false;
  };

  wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    this.camera.x += e.deltaX;
    this.camera.y += e.deltaY;
    this.clearCanvas();
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("mouseleave", this.mouseLeaveHandler);
    this.canvas.addEventListener("wheel", this.wheelHandler, { passive: false });
    window.addEventListener("resize", this.resize);
  }
}
