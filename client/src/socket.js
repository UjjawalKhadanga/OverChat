import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
    autoConnect: false,
    withCredentials: true
});

export default socket;