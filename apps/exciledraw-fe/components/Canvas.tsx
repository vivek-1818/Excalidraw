import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Eraser, MousePointer2, Pencil, RectangleHorizontalIcon, Type } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "select" | "circle" | "rect" | "pencil" | "text" | "eraser";

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

  useEffect(() => {
    game?.setTool(selectedTool);
  },[selectedTool, game])

  useEffect(() => {
    if(canvasRef.current){
      const g = new Game(canvasRef.current, roomId, socket);
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
      <TopBar setSelectedTool={setSelectedTool  } selectedTool={selectedTool}/>
    </div>
  );
}

function TopBar({selectedTool, setSelectedTool}:{
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
  return <div
    style={{
      position: "fixed",
      top: 10,
      left: 10,
      zIndex: 30,
        }}>
        <div className="flex gap-t">
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
        </div>
  </div>;
}
