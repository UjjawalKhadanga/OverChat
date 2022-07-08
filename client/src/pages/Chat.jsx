import axios from "axios";
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/Chat/ChatBox";
import SideBar from "../components/Chat/SideBar";
import TypeBox from "../components/Chat/TypeBox";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function Chat() {
  // get all the messages + room data from the server
  const [messages, setMessages] = useState([]);
  const [roomName,setRoomName] = useState('{Room Name}');
  const [roomDesc,setRoomDesc] = useState('{Room Description}');
  const [roomMembers,setRoomMembers] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:8080/chat/getroomdata/${params.roomID}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      setMessages(res.data.Messages);
      setRoomName(res.data.RoomName);
      setRoomDesc(res.data.Desc);
      setRoomMembers(res.data.Members)
    })

    socket.on('message', (from, to, time, message) =>{
      // axios.post('http://localhost:8080/chat/addmessage',{message: message, time: time, roomID: to},{withCredentials: true}).then(
        
      // )
      setMessages([...messages, {senderID: from, Time: time, Message: message}])

    })


    // return () => {
    //   socket.disconnect();
    //   setSocket(null);
    // };
  },[]);


  const params = useParams();

  return (
    <div className="row">
      <div className="col-md-2">
        <SideBar roomName = {roomName} roomDesc = {roomDesc} roomMembers = {roomMembers}/>
      </div>
      <div className="col-md-10">
        <ChatBox messages={messages} />
        <TypeBox roomID={params.roomID} userID={"random"} socket={socket}/>
      </div>
    </div>
  );
}

export default Chat;
