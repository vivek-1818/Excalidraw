import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string;
    socket: WebSocket;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let cleanup: (() => void) | undefined;
        let cancelled = false;

        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket).then((destroy) => {
                if (cancelled) {
                    return;
                }

            });
        }

        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, [roomId, socket]);

    return <div>
        <canvas ref={canvasRef} width={1920} height={935}></canvas>
    </div>;
}
