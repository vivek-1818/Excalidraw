import { RooomCanvas } from "@/components/RoomCanvas"

type CanvasPageProps = {
    params: Promise<{
        roomId: string;
    }>;
};

export default async function CanvasPage({ params }: CanvasPageProps) {
    const { roomId } = await params;

    return <RooomCanvas roomId={roomId} />;
}
