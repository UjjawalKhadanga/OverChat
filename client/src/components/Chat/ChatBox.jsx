
function Message({name,avatar,message}) {
    return (
        <div className="row m-2">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-1">
                                <img src={avatar} className="img-fluid rounded-circle" alt="avatar" />
                            </div>
                            <div className="col-md-11">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-title h5 opacity-75">{name}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="card-text fs-5">{message}</p>
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


function ChatBox({messages}) {
    return (
            <div className="container">
                <div className="row">
                    <div className="p-4">
                        {
                            messages.length === 0 ? <div className='alert-dismissible'>{ `Itna sannata kyun h bhai :( ... Use chat box to write your first message 👇` }</div> :
                            messages.map((messageObj)=>{
                                return <Message key={messageObj} name={messageObj.sender.name} avatar="https://via.placeholder.com/50" message={messageObj.message} />
                            })
                        }
                    </div>
                </div>
            </div>
    )
}

export default ChatBox