import axios from "axios";
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/Chat/ChatBox";
import SideBar from "../components/Chat/SideBar";
import TypeBox from "../components/Chat/TypeBox";
import createSocket from "../socket";


function Chat() {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([/*{ sender: {name: "Admin"}, message: "Welcome to the room!", time: Date.now() }*/]);
  const [socket, setSocket] = useState(createSocket(roomId));

  useEffect(() => {
    socket.connect();
    socket.on('message', (message, sender, time) =>{
      console.log('Message mil gaya', message, sender);
      setMessages((prev) => [...prev, {sender, message, time}])
    })

    return () => {
      socket.off('message');
      socket.disconnect();
      setSocket(undefined);
    };
  }, [socket]);

  useEffect(() => {
    // get all the messages from the server
    axios.get(`http://localhost:8080/chat/room/${roomId}`, {withCredentials: true}).then((res) => {
        console.log(res);
        setMessages(res.data.chats);
    });
  }, [roomId]);

  return (
      <div className="row">
        <div className="col-md-2">
          <SideBar roomId={roomId}/>
        </div>
        <div className="col-md-10 d-flex flex-column min-vh-100">
          <div className="flex-grow-1 p-3"> <ChatBox messages={messages} /> </div>
          <TypeBox socket={socket}/>
        </div>
      </div>
  );
}

export default Chat;
