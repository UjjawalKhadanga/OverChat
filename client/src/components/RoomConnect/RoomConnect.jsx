import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Card(props) {

    return (
      <div className="col-4 mt-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{props.name}</h5>
              <div className="text-muted">
                <b>Owner:</b> {props.owner}
              </div>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">#{props.id}</h6>
            <p className="card-text">{props.Desc}</p>
            <p className="d-flex justify-content-between">
              {props.desc}
            </p>
          </div>
        </div>
      </div>
    );
}



function RoomConnect() {
  const navigate=useNavigate();
    // random room data to display
    const [rooms,setRooms] = useState([
        {
            _id: "1234567890",
            RoomName: "TestRoom",
            RoomOwner: "Admin",
            desc: "Test Room :=>)"
        }
    ]);
    const [joinID,setJoinID] = useState("");
    useEffect(()=>{
        axios.get('http://localhost:8080/room/getrooms',{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setRooms(res.data)
        })
    },[])
    const handleJoin = async (e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/room/joinroom',{RoomID:joinID},{withCredentials:true})
        console.log(res.data)
        navigate('../chat/'+joinID)
    }
  return (
    <div className="container">
      <form className="overflow-auto d-flex justify-content-between">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Join"
          aria-label="Join"
          onChange={(e)=>{setJoinID(e.target.value)}}
        />
        <button onClick={(e)=>{handleJoin(e)}} className="btn btn-outline-success" type="submit">
          Join Room
        </button>
      </form>
      <div className="overflow-auto m-2">
        <div className="row m-0">
          {rooms.map((room) => {
            return (
              <Card
                key={room._id}
                id={room._id}
                desc={room.Desc}
                name={room.RoomName}
                owner={room.RoomOwnerName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoomConnect