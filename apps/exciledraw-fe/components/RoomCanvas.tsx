"use client";

import { WS_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

function getUserIdFromToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1] ?? ""));
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export function RooomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      localStorage.removeItem("token");
      router.push("/signin");
      return;
    }

    setCurrentUserId(userId);
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () =>{
        setSocket(ws)
        ws.send(JSON.stringify({
          type: "join_room",
          roomId
        }))
    }

    return () => {
      ws.close();
      setSocket(null);
      setCurrentUserId(null);
    };
  }, [roomId, router])

  if(!socket || !currentUserId){
    return <div>
        Connecting to server....
    </div>
  }

  return (
    <div>
      <Canvas currentUserId={currentUserId} roomId={roomId} socket={socket}/>  
    </div>
  );
}
