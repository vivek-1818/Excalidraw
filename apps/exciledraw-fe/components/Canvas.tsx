import { useEffect, useRef, useState } from "react";
import { Game } from "@/draw/Game";
import { CanvasToolbar, type Tool } from "./CanvasToolbar";
export type { Tool } from "./CanvasToolbar";

export function Canvas({
  currentUserId,
  roomId,
  socket,
}: {
  currentUserId: string;
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
      const g = new Game(
        canvasRef.current,
        roomId,
        socket,
        currentUserId,
        setSelectedColor,
      );
      setGame(g);

      return () => {
        g.destroy();
      }
    }
  }, [canvasRef, currentUserId, roomId, socket]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#020617",
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
      <CanvasToolbar
        selectedColor={selectedColor}
        selectedTool={selectedTool}
        setSelectedColor={setSelectedColor}
        setSelectedTool={setSelectedTool}
      />
    </div>
  );
}
