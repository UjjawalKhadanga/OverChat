// import axios from 'axios';
import React from 'react'

function TypeBox({socket}) {
  const [message, setMessage] = React.useState('');

  const handleSend=(e)=>{
    e.preventDefault();
    socket.emit('message', message, Date.now());
    // reset form with id='typebox'
    document.getElementById('typebox').reset();
  }

  return (
      <form id='typebox' className="d-flex justify-content-between">
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
  );
}

export default TypeBox