// import axios from 'axios';
import React, { useRef } from 'react'
import { useSocket } from '../../providers/socket';

function TypeBox() {
  const socket = useSocket();
  const formRef = useRef(null);
  const [message, setMessage] = React.useState('');

  const handleSend=(e)=>{
    e.preventDefault();
    socket.emit('message', message, Date.now());
    // reset form with id='typebox'
    formRef.current.reset();
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
    socket.emit('userTyping');
  }

  return (
      <form id='typebox' className="d-flex justify-content-between" ref={formRef} >
        <input
          className="form-control me-2"
          type="text"
          placeholder="Type.."
          aria-label="Message"
          onChange={handleMessageChange}
        />
        <button onClick={(e)=>{handleSend(e)}} className="btn btn-primary">
          Send
        </button>
      </form>
  );
}

export default TypeBox