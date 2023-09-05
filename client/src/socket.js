import { io } from "socket.io-client";

function createSocket(roomId) {
    return io("http://localhost:8080", {
        autoConnect: false,
        withCredentials: true,
        query: { roomId }
    });
}

export default createSocket;