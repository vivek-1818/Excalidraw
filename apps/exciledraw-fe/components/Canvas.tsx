import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
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
import { Game } from "@/draw/Game";

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

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("select")
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  useEffect(() => {
    game?.setTool(selectedTool);
  },[selectedTool, game])

  useEffect(() => {
    game?.setColor(selectedColor);
  }, [selectedColor, game]);

  useEffect(() => {
    if(canvasRef.current){
      const g = new Game(canvasRef.current, roomId, socket, setSelectedColor);
      setGame(g);

      return () => {
        g.destroy();
      }
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
          cursor: selectedTool === "select" ? "grab" : "crosshair",
        }}
      ></canvas>
      <TopBar
        selectedColor={selectedColor}
        selectedTool={selectedTool}
        setSelectedColor={setSelectedColor}
        setSelectedTool={setSelectedTool}
      />
    </div>
  );
}

function TopBar({selectedColor, selectedTool, setSelectedColor, setSelectedTool}:{
    selectedColor: string,
    selectedTool: Tool,
    setSelectedColor: (color: string) => void,
    setSelectedTool: (s: Tool) => void
}) {
  return <div
    style={{
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 30,
        }}>
        <div className="flex items-center gap-2">
            <input
              aria-label="Select drawing color"
              title="Select drawing color"
              type="color"
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
              className="h-10 w-10 cursor-pointer rounded-full border border-white bg-black p-1"
            />
            <IconButton onClick={() => {
                setSelectedTool("select")
            }} activated={selectedTool === "select"} icon={<MousePointer2/>} />
            <IconButton onClick={() => {
                setSelectedTool("pencil")
            }} activated={selectedTool === "pencil"} icon={<Pencil/>} />
            <IconButton onClick={() => {
                setSelectedTool("text")
            }} activated={selectedTool === "text"} icon={<Type/>} />
            <IconButton onClick={() => {
                setSelectedTool("eraser")
            }} activated={selectedTool === "eraser"} icon={<Eraser/>} />
            <IconButton onClick={() => {
                setSelectedTool("rect")
            }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon/>}/>
            <IconButton onClick={() => {
                setSelectedTool("circle")
            }} activated={selectedTool === "circle"} icon={<Circle/>} />
            <IconButton onClick={() => {
                setSelectedTool("line")
            }} activated={selectedTool === "line"} icon={<Minus/>} />
            <IconButton onClick={() => {
                setSelectedTool("arrow")
            }} activated={selectedTool === "arrow"} icon={<ArrowUpRight/>} />
            <IconButton onClick={() => {
                setSelectedTool("diamond")
            }} activated={selectedTool === "diamond"} icon={<Diamond/>} />
        </div>
  </div>;
}
