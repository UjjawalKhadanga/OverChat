import axios from 'axios';
import React from 'react'

function TypeBox(props) {
  const [message, setMessage] = React.useState('');
  const handleSend=(e)=>{
    e.preventDefault();
    // add message to the database
    // axios.post('http://localhost:8080/chat/addmessage',{message:message,time:Date.now(),roomID:props.roomID},{withCredentials: true})

    // send msg to socket
    props.socket.emit('message', props.userID, props.roomID, Date.now(), message );
  }
  return (
    <div className="container">
      <form className="d-flex justify-content-between">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Type.."
          aria-label="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={(e)=>{handleSend(e)}} className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}

export default TypeBox