import React, { useState, useEffect} from "react";
import axios from "axios";
import CreateRoom from '../components/CreateRoom/CreateRoom'
import Logout from '../components/Logout'
import RoomConnect from '../components/RoomConnect/RoomConnect'

function Home() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    axios.get(`${process.env.API_SERVER_URL}/user/info`, {withCredentials: true}).then((res) => {
      console.log(res);
      setUserInfo(res.data);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-11 p-4">
            <h1>Create/Join a Room</h1>
            <h2>Welcome {userInfo.name}</h2>
          </div>
          <div className="col-1 p-4">
            <Logout/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <CreateRoom />
          </div>
          <div className="col-9">
            <RoomConnect userInfo={userInfo}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home