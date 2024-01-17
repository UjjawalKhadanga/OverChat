const { Server } = require("socket.io");
const User = require("../models/user");
const Chat = require("../models/chat")

const socketAuth = require("../middlewares/socketAuth");

const connections = {
    // roomId : [{ socketId, userId }, {}, ...]
};

function connectionHandler(io, socket) {
    console.log(`User joined room ${socket.room.name} with socketId: ${socket.id}`);
    const { room, user } = socket;
    const roomId = room._id.toString();
    const userId = user._id.toString();

    // Do an identity brodcast
    socket.emit('identityBrodcast', { user });
    
    if (!Object.prototype.hasOwnProperty.call(connections, roomId)) connections[roomId] = new Array();

    // brodcast prev joinees to the new user
    connections[roomId].map(({ user }) => socket.emit('userJoined', { user }));

    // join the room event
    socket.join(roomId);
    connections[roomId].push({ socketId: socket.id, user });
    console.log(connections)


    // brodcast to all the room members connected that a new user has joined
    io.to(roomId).emit("userJoined", { user });
    
    // message event
    socket.on("message", async (message, time) => {
        console.log(`Message Recieved: ${message} from ${userId} in room:${roomId} at ${time}}`);
        const sender = await User.findById(userId).lean();
        io.to(roomId).emit("message", message, sender, time);
        Chat.create({ room: roomId, sender: userId, message, time }).catch(err => {
            console.log('Could not save', {message, userId, err});
        });
    });

    // typing
    socket.on("userTyping", () => {
        console.log(`User ${user.name} is typing`);
        socket.broadcast.to(roomId).emit("userTyping", {user});
    });

    // disconnect event
    socket.on("disconnect", () => {
        console.log(`User Disconnected from socket ${socket.id}`);
        socket.broadcast.to(roomId).emit("userLeft", { user })
        const objToRemove = connections[roomId].find(obj => obj.socketId === socket.id);
        connections[roomId].splice(connections[roomId].indexOf(objToRemove), 1);
    })
}

function init(server) {
    const io = new Server(server, { cors : { origin : process.env.CLIENT_URL, credentials: true } });

    // socket auth with jwt cookie
    io.use(socketAuth);

    io.on("connection", (socket) => connectionHandler(io, socket));
}




module.exports = { init };