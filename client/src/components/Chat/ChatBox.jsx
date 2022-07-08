import React from 'react'

function Message(props) {
    return (
        <div className="row m-2">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-1">
                                <img src={props.avatar} className="img-fluid rounded-circle" alt="avatar" />
                            </div>
                            <div className="col-md-11">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="card-title fs-6">{props.name}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="card-text">{props.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function ChatBox(props) {

  return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {
                        props.messages.map((message)=>{
                            return <Message name={message.senderName} avatar="https://via.placeholder.com/50" message={message.Message} />
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default ChatBox