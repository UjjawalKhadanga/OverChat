import axios from 'axios';
import React,{useState} from 'react'

function CreateRoom() {
  const [name,setName]=useState('')
  const [pwd,setPwd]=useState('')
  const [desc,setDesc]=useState('')

  async function submit(){
    await axios.put(`${process.env.REACT_APP_API_SERVER_URL}/room/`,
      {
        name,
        password:pwd,
        maxLimit:10,
        description:desc
      }, {withCredentials:true}
    );
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
            async (e)=>{
              e.preventDefault();
              // post request to backend for creating room
              await submit();
              console.log(name,pwd,desc);
              setTimeout(() => window.location.reload(), 300);
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