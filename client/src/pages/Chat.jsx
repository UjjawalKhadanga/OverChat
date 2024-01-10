import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/Chat/ChatBox";
import SideBar from "../components/Chat/SideBar";
import TypeBox from "../components/Chat/TypeBox";
import { useSocket } from "../providers/socket";

function Chat() {
  const { roomId } = useParams();
  const socket = useSocket();

  useEffect(() => {
    socket.auth = {roomId};
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <div className="row">
        <div className="col-md-2">
          <SideBar roomId={roomId}/>
        </div>
        <div className="col-md-10 d-flex flex-column min-vh-100">
          <div className="flex-grow-1 p-3"> <ChatBox /> </div>
          <TypeBox />
        </div>
      </div>
  );
}

export default Chat;
