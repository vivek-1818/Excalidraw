import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(roomId: string) {
    const response = axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return (await response).data.messages
}

export async function ChatRoom({id}:{
    id: string
}) {
    const message = await getChats(id)
    return <ChatRoomClient id={id} message={message}/>
}
