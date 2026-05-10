import {
  ArrowUpRight,
  Circle,
  Diamond,
  Eraser,
  ImagePlus,
  Home,
  Minus,
  MousePointer2,
  Pencil,
  RectangleHorizontalIcon,
  Type,
} from "lucide-react";
import Link from "next/link";
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
  uploadingImage?: boolean;
  setSelectedColor: (color: string) => void;
  setSelectedTool: (tool: Tool) => void;
  onImageUpload: () => void;
};

export function CanvasToolbar({
  selectedColor,
  selectedTool,
  uploadingImage = false,
  setSelectedColor,
  setSelectedTool,
  onImageUpload,
}: CanvasToolbarProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
      }}
    >
      <div className="flex max-w-[calc(100vw-32px)] items-center gap-3 overflow-x-auto rounded-full border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md">
        <Link
          aria-label="Go home"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white transition hover:border-white hover:bg-white/10"
          href="/"
          title="Go home"
        >
          <Home />
        </Link>
        <label
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-black/70 transition hover:border-white"
          title="Select drawing color"
        >
          <span
            className="h-7 w-7 rounded-full border border-white/40"
            style={{ background: selectedColor }}
          />
          <input
            aria-label="Select drawing color"
            type="color"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
            className="sr-only"
          />
        </label>
        <IconButton
          onClick={() => setSelectedTool("select")}
          activated={selectedTool === "select"}
          icon={<MousePointer2 />}
          title="Select and pan"
        />
        <IconButton
          onClick={() => setSelectedTool("pencil")}
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
          title="Pencil"
        />
        <IconButton
          onClick={() => setSelectedTool("text")}
          activated={selectedTool === "text"}
          icon={<Type />}
          title="Text"
        />
        <IconButton
          onClick={onImageUpload}
          activated={uploadingImage}
          icon={<ImagePlus />}
          title={uploadingImage ? "Uploading image" : "Upload image"}
        />
        <IconButton
          onClick={() => setSelectedTool("eraser")}
          activated={selectedTool === "eraser"}
          icon={<Eraser />}
          title="Eraser"
        />
        <IconButton
          onClick={() => setSelectedTool("rect")}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
          title="Rectangle"
        />
        <IconButton
          onClick={() => setSelectedTool("circle")}
          activated={selectedTool === "circle"}
          icon={<Circle />}
          title="Circle"
        />
        <IconButton
          onClick={() => setSelectedTool("line")}
          activated={selectedTool === "line"}
          icon={<Minus />}
          title="Line"
        />
        <IconButton
          onClick={() => setSelectedTool("arrow")}
          activated={selectedTool === "arrow"}
          icon={<ArrowUpRight />}
          title="Arrow"
        />
        <IconButton
          onClick={() => setSelectedTool("diamond")}
          activated={selectedTool === "diamond"}
          icon={<Diamond />}
          title="Diamond"
        />
      </div>
    </div>
  );
}
