import axios from 'axios';
import React,{useState} from 'react'

function CreateRoom() {
  const [name,setName]=useState('')
  const [pwd,setPwd]=useState('')
  const [desc,setDesc]=useState('')

  function submit(){
    axios.post('http://localhost:8080/room/createroom',{
                RoomName:name,
                RoomPassword:pwd,
                MaxLimit:10,
                RoomDescription:desc
              },{withCredentials:true})
  }

  return (
    <div className="border">
      <form className="m-2" action="#">
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Room Name:
          </label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Enter Room Name"
            name="email"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            onChange={(e)=>setPwd(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="comment">Description:</label>
          <textarea
            class="form-control"
            rows="5"
            id="comment"
            name="text"
            onChange={(e)=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button 
          type="submit"
          className="btn btn-primary" 
          onClick={
            (e)=>{
              e.preventDefault()
              // post request to backend for creating room
              submit()
              console.log(name,pwd,desc)
              window.location.reload();
            }
          }
        >
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom