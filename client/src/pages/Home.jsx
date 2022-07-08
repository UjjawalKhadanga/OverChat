import React from 'react'
import CreateRoom from '../components/CreateRoom/CreateRoom'
import Logout from '../components/Logout'
import RoomConnect from '../components/RoomConnect/RoomConnect'

function Home() {
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-11 p-4">
            <h1>Create/Join a Room</h1>
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
            <RoomConnect />
          </div>
        </div>
      </div>


    {/* <RoomConnect/>
    <CreateRoom/> */}
    </>
  )
}

export default Home