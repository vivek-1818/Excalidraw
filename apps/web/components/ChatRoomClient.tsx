"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  message,
  id,
}: {
  message: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(message);
  const [currentMessage, setCurentMessage] = useState("");
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }),
      );

      socket.onmessage = (event) => {
        const parseData = JSON.parse(event.data);
        if (parseData.type == "chat") {
          setChats((c) => [...c, { message: parseData.message }]);
        }
      };

      return () => {
        socket.onmessage = null;
      }
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}

      <input type="text" value={currentMessage} onChange={(e)=>{
        setCurentMessage(e.target.value)
      }} />

      <button onClick={()=>{
        socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message: currentMessage
        }))
        setCurentMessage("");
      }}>Send Message   </button>
    </div>
  );
}
