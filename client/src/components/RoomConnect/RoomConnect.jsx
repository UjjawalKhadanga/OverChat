import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Card({_id, name, owner, description, isOwner}) {
  const navigate = useNavigate();

  const handleJoinClicked = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:8080/room/join/${_id}`, {}, {withCredentials: true})
    console.log(res.data)
    navigate(`/chat/${_id}`, { replace: true })
  };

  const handleDeleteClicked = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:8080/room/${_id}`, {withCredentials: true})
    console.log(res.data)
    window.location.reload();
  };

  return (
      <div className="card w-100 m-1" >
        <div className="card-body">
          <div className="d-flex justify-content-between align-content-between">
            <h5 className=" d-flex align-items-center card-title">{name}</h5>
            <div className="text-muted d-flex small">
              <cite>Owner: {owner.name}</cite>
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted small">#{_id}</h6>
          <p className="d-flex justify-content-between">
            {description}
          </p>
          <button className="btn btn-primary" onClick={handleJoinClicked}>
            Join
          </button>
          {
            isOwner && (
              <button className="btn btn-danger ms-2" onClick={handleDeleteClicked}>
                Delete
              </button>
            )
          }
        </div>
      </div>
  );
}



function RoomConnect({userInfo}) {
    // random room data to display
    const [rooms,setRooms] = useState([
        {
            _id: "1234567890",
            name: "TestRoom",
            owner: "Admin",
            description: "Test Room :=>)"
        }
    ]);
    useEffect(()=>{
        axios.get('http://localhost:8080/room/', {withCredentials: true})
        .then((res)=>{
            console.log(res.data)
            setRooms(res.data)
        })
    },[])
  return (
    <div className="container">
      <div className="overflow-auto m-2">
        <div className="m-2">
          {
            rooms.map((room) => {
              const isOwner = room.owner._id === userInfo._id;
              return (
                <Card
                  key={room._id}
                  _id={room._id}
                  description={room.description}
                  name={room.name}
                  owner={room.owner}
                  isOwner={isOwner}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default RoomConnect