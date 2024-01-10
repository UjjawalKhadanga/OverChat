const { Server } = require("socket.io");
const config = require("config");

const User = require("../models/user");
const Chat = require("../models/chat")

const socketAuth = require("../middlewares/socketAuth");

const collections = {
    // roomId : [{ socketId, userId }, {}, ...]
};

function init(server) {
    const io = new Server(server, { cors : { origin : config.get("clientUrl"), credentials: true } });
    io.use(socketAuth);
    io.on("connection", (socket) => {
        console.log(`User joined room ${socket.room.name} with socketId: ${socket.id}`);
        const { room, user } = socket;
        const roomId = room._id.toString();
        const userId = user._id.toString();

        if (!Object.prototype.hasOwnProperty.call(collections, roomId)) collections[roomId] = new Array();

        // Do an identity brodcast
        socket.emit('identityBrodcast', { user });

        // brodcast to the new user all the users that have already joined
        collections[roomId].map(({ user }) => {
            socket.emit('userJoined', { user })
        })
    
        // join the room event
        socket.join(roomId);
        collections[roomId].push({socketId: socket.id, user });
        console.log(collections)


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
            const objToRemove = collections[roomId].find(obj => obj.socketId === socket.id);
            collections[roomId].splice(collections[roomId].indexOf(objToRemove), 1);
        })
    });
}




module.exports = { init };