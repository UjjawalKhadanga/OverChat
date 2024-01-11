import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        return io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`, {
            autoConnect: false,
            withCredentials: true
        });
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}


