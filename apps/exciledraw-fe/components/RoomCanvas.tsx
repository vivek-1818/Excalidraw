"use client";

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export function RooomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(()=>{
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU3NGYxMi02NjQ5LTQ3ZDktOGQ4Ny04NDAyYmMwMWQ5YjgiLCJpYXQiOjE3Nzc2MzY2ODB9.Hf31A0onsE0rZz6kxW3Ox1jd7ZvCX9LU-l1jSnlLLRY`);

    ws.onopen = () =>{
        setSocket(ws)
        ws.send(JSON.stringify({
          type: "join_room",
          roomId
        }))
    }
  },[])

  if(!socket){
    return <div>
        Connecting to server....
    </div>
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket}/>  
    </div>
  );
}
