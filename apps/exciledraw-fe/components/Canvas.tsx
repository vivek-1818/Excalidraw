import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Game } from "@/draw/Game";
import { uploadCanvasImage } from "@/draw/http";
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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("select")
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [uploadingImage, setUploadingImage] = useState(false);

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

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !game) return;

    setUploadingImage(true);

    try {
      const dimensions = await readImageDimensions(file);
      const placement = game.getImagePlacement(dimensions);
      const uploadedImage = await uploadCanvasImage({
        file,
        roomId,
        ...placement,
      });
      game.addPersistedImageShape(uploadedImage);
      game.sendImageCreateMessage(uploadedImage);
      setSelectedTool("select");
    } catch (error) {
      console.error("Image upload failed", error);
      window.alert("Could not upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  }

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
      <input
        ref={imageInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={handleImageChange}
      />
      <CanvasToolbar
        selectedColor={selectedColor}
        selectedTool={selectedTool}
        uploadingImage={uploadingImage}
        onImageUpload={() => imageInputRef.current?.click()}
        setSelectedColor={setSelectedColor}
        setSelectedTool={setSelectedTool}
      />
    </div>
  );
}

function readImageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: 420,
        height: 320,
      });
    };

    image.src = objectUrl;
  });
}
