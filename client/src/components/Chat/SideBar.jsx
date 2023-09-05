import axios from "axios";
import React, { useState, useEffect} from "react";

function SideBar({roomId}) {
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

  return (
      <div className="p-3 bg-light position-fixed h-100 col-2 d-flex flex-column">
        <div className="d-flex align-items-center">
          <h1 className="fs-4 text-center">{roomName}</h1>
        </div>
        <ul className="nav nav-pills flex-column mb-auto">
            Group Members
            {
              roomMembers.map((member) => <li key={member.name} className="nav-item"> {member.name} </li> ) 
            }
        </ul>
        {roomDesc}
      </div>
  )
}

export default SideBar