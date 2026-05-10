import {
  ArrowUpRight,
  Circle,
  Diamond,
  Eraser,
  Minus,
  MousePointer2,
  Pencil,
  RectangleHorizontalIcon,
  Type,
} from "lucide-react";
import { IconButton } from "./IconButton";

export type Tool =
  | "select"
  | "circle"
  | "rect"
  | "line"
  | "arrow"
  | "diamond"
  | "pencil"
  | "text"
  | "eraser";

type CanvasToolbarProps = {
  selectedColor: string;
  selectedTool: Tool;
  setSelectedColor: (color: string) => void;
  setSelectedTool: (tool: Tool) => void;
};

export function CanvasToolbar({
  selectedColor,
  selectedTool,
  setSelectedColor,
  setSelectedTool,
}: CanvasToolbarProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
      }}
    >
      <div className="flex items-center gap-2">
        <input
          aria-label="Select drawing color"
          title="Select drawing color"
          type="color"
          value={selectedColor}
          onChange={(event) => setSelectedColor(event.target.value)}
          className="h-10 w-10 cursor-pointer rounded-full border border-white bg-black p-1"
        />
        <IconButton
          onClick={() => setSelectedTool("select")}
          activated={selectedTool === "select"}
          icon={<MousePointer2 />}
        />
        <IconButton
          onClick={() => setSelectedTool("pencil")}
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
        />
        <IconButton
          onClick={() => setSelectedTool("text")}
          activated={selectedTool === "text"}
          icon={<Type />}
        />
        <IconButton
          onClick={() => setSelectedTool("eraser")}
          activated={selectedTool === "eraser"}
          icon={<Eraser />}
        />
        <IconButton
          onClick={() => setSelectedTool("rect")}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
        />
        <IconButton
          onClick={() => setSelectedTool("circle")}
          activated={selectedTool === "circle"}
          icon={<Circle />}
        />
        <IconButton
          onClick={() => setSelectedTool("line")}
          activated={selectedTool === "line"}
          icon={<Minus />}
        />
        <IconButton
          onClick={() => setSelectedTool("arrow")}
          activated={selectedTool === "arrow"}
          icon={<ArrowUpRight />}
        />
        <IconButton
          onClick={() => setSelectedTool("diamond")}
          activated={selectedTool === "diamond"}
          icon={<Diamond />}
        />
      </div>
    </div>
  );
}
