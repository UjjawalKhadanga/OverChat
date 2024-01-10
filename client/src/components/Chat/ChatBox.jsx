import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../providers/socket";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChatMessage({name,avatar,message,isLocal,isAdmin}) {
    return (
        <div className={`row m-1`} >
                <div className={`card  ${isLocal ? 'justify-content-right' : 'justify-content-left' } ${isAdmin ? 'justify-content-center' : ''}`} >
                    <div className="card-body h-100">
                        <div className="row">
                            <div className="col-1" style={{'min-width': '4rem'}}>
                                <img src={avatar} className="img-fluid rounded-circle w-auto" alt="avatar" />
                            </div>
                            <div className="col-11">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-title h5 opacity-75">{name}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="card-text fs-5">{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}


function ChatBox() {
    const { roomId } = useParams();
    const socket = useSocket()
    const [messages, setMessages] = useState([/*{ sender: {name: "Admin"}, message: "Welcome to the room!", time: Date.now() }*/]);
    const [typingUsers, setTypingUsers] = useState([]);
    const typingTimoutRef = useRef(null)
    const [currentUser, setCurentUser] = useState({});

    useEffect(() => {
        socket.on('message', (message, sender, time) =>{
          console.log('Message mil gaya', message, sender);
          setMessages((prev) => [...prev, {sender, message, time}])
        })
        socket.on('userJoined', ({user}) => {
          console.log('user joined', user);
          setMessages((prev) => [...prev, {sender: {name: "Admin"}, message: `${user.name} joined the room!`, time: Date.now(), isAdmin: true }])
        })
        socket.on('userLeft', ({user}) => {
          console.log('user left', user);
          setMessages((prev) => [...prev, {sender: {name: "Admin"}, message: `${user.name} left the room!`, time: Date.now(), isAdmin: true }])
        })
        socket.on('userTyping', ({user}) => {
            typingTimoutRef.current && clearTimeout(typingTimoutRef.current)
            console.log(user, 'is typing...');
            setTypingUsers((prev) => {
                if (!prev.find(p => p._id === user._id)) 
                    return [...prev, user]
                return prev;
            });
            typingTimoutRef.current = setTimeout(() => setTypingUsers((prev) => prev.filter((u) => u.id !== user.id)), 3000)
        })
        socket.on('identityBrodcast', ({user}) => setCurentUser(user));

        return () => {
            socket.off('message');
            socket.off('userJoined');
            socket.off('userLeft');
            socket.off('userTyping');
            socket.off('identityBrodcast');

        };
      }, [socket]);

    useEffect(() => {
        // get all the messages from the server
        axios.get(`http://localhost:8080/chat/room/${roomId}`, {withCredentials: true}).then((res) => {
            console.log(res);
            setMessages(res.data.chats);
        });
    }, [roomId]);

    return (
            <div className="container">
                <div className="row">
                    <div className="p-4">
                        {
                            messages.length === 0 ? <div className='alert-dismissible'>{ `Itna sannata kyun h bhai :( ... Use chat box to write your first message 👇` }</div> :
                            messages.map((messageObj)=>{
                                const isLocal = (currentUser._id === messageObj.sender._id);
                                return <ChatMessage key={messageObj} name={messageObj.sender.name} avatar="https://via.placeholder.com/50" message={messageObj.message} isLocal={isLocal} isAdmin={messageObj.isAdmin}/>
                            })
                        }
                    </div>
                </div>
                {
                    typingUsers.length > 0 &&
                    <div>
                        {`${typingUsers.map(u => u.name).join(', ')} typing...`}
                    </div>
                }
            </div>
    )
}

export default ChatBox