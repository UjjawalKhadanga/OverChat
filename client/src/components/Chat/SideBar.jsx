import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/socket";

function Member({ user, isConnected }) {
  if (isConnected) return (
      <li className="list-group-item bg-success" key={user._id}>
        {user.name}
      </li>
  );
  else return (
      <li className="list-group-item bg-secondary" key={user._id}>
        {user.name}
      </li>
  )
}

function Members({members}) {
  const socket = useSocket();
  const [membersStatus, setMembersStatus] = useState({})
  useEffect(() => {
    socket.on('userJoined', ({user})=>{
      console.log(user, 'joined');
      setMembersStatus(prev => {
        return {...prev, [user._id]: true}
      })
    })
    socket.on('userLeft', ({user})=>{
      console.log(user, 'left');
      setMembersStatus(prev => {
        return {...prev, [user._id]: false}
      })
    })
  
    return () => {
      socket.off('userJoined');
      socket.off('userLeft');
    }
  }, [socket])
  return (
    <div className="d-flex flex-column">  
      <ul className="list-group">
        {members.map((member) => {
          return (
            <Member user={member} isConnected={membersStatus[member._id] ?? false } key={member._id} />
          );
        })}
      </ul>
    </div>
  )
}


function SideBar({roomId}) {
  const navigate = useNavigate();
  const [roomName,setRoomName] = useState('<room_name>');
  const [roomDesc,setRoomDesc] = useState('<room_description>');
  const [roomMembers,setRoomMembers] = useState([/* { _id: "1234567890", name: "Member 1" } */]);
  useEffect(() => {
    // get room metadata from the server
    axios.get(`http://localhost:8080/room/${roomId}`, {withCredentials: true}).then((res) => {
      console.log(res);
      setRoomName(res.data.name);
      setRoomDesc(res.data.description);
      setRoomMembers(res.data.members)
    });
  },[roomId]);

  const handleLeaveClicked = () => {
    navigate('../home');
  };

  return (
      <div className="p-3 bg-light d-flex flex-column h-100">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="h1">{roomName} </div>
          <div className=""> {roomDesc} </div>
        </div>
        <hr className="w-100" /> 
        <Members members={roomMembers}/>
        {/* leave room button */}
        <button className="btn btn-danger mt-auto" onClick={handleLeaveClicked} >
          Leave Room
        </button>
      </div>
  )
}

export default SideBar