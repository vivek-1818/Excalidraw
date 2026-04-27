import { useEffect, useState } from "react";
import { WS_URL } from "../config";


export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNThiNzQwYy0yYzk1LTRiMGYtYWM5NC04ZTZkMDE4YjkzYmYiLCJpYXQiOjE3NzcyMjE4Nzd9.DrvGCJanJ7P5Lvk3cqJrH0ro5yl7QqBdcRraYCnP1rI`);
        ws.onopen = () =>{
            setLoading(false);
            setSocket(ws)
        }
    },[])
    return {
        socket,
        loading
    }
}