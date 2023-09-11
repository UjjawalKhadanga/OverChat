import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Members({members}) {
  return (
    <div className="d-flex flex-column">  
      <ul className="list-group">
        {members.map((member) => {
          return (
            <li className="list-group-item" key={member._id}>
              {member.name}
            </li>
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
      <div className="p-3 bg-light position-fixed h-100 col-2 d-flex flex-column">
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