import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../providers/socket";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function LocalChatMessage({name,avatar,message,time}) {
    return (
        <div className="d-flex justify-content-end mb-4">
            <div className="ms-auto rounded bg-primary p-2 text-white">
                {message}
            </div>
            <div className="ms-3">
                <img 
                src={avatar}
                className="rounded-circle" 
                alt={`avatar-${name}`}
                />
                <small className="d-block text-muted">{time}</small>
            </div>
        </div>
    )
}

function RemoteChatMessage({name,avatar,message,time}) {
    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="ms-3">
                <img 
                src={avatar}
                className="rounded-circle" 
                alt={`avatar-${name}`}
                />
                <small className="d-block text-muted">{time}</small>
            </div>
            <div className="bg-light p-2 me-auto rounded">
                {message}
            </div>
        </div>
    )
}

function Message({name,time,avatar,message,isLocal,isAdmin}) {
    const timeString = moment(time).format('hh:mm A')
    if (isAdmin) return (
        <div className={`row m-1`}>
            <div className="w-100 text-center">
                {`[${timeString}] ${message}`}
            </div>
        </div>
    )
    return (
        isLocal ? <LocalChatMessage name={name} message={message} time={timeString} avatar={avatar}/> : 
        <RemoteChatMessage name={name} message={message} time={timeString} avatar={avatar}/>
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
        <div className="d-flex flex-column h-100">
            {
                messages.length === 0 ? <div className='alert-dismissible'>{ `Itna sannata kyun h bhai :( ... Use chat box to write your first message 👇` }</div> :
                messages.map((messageObj)=>{
                    const isLocal = (currentUser._id === messageObj.sender._id);
                    return <Message key={messageObj} time={messageObj.time} name={messageObj.sender.name} avatar="https://via.placeholder.com/40" message={messageObj.message} isLocal={isLocal} isAdmin={messageObj.isAdmin}/>
                })
            }
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