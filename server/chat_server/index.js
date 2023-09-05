const { Server } = require("socket.io");
const config = require("config");

const User = require("../models/user");
const Chat = require("../models/chat")

const socketAuth = require("../middlewares/socketAuth");

const collections = {
    // roomId : [socket1, socket2, ...]
    // roomId : [socket1, socket2, ...]
};

function init(server) {
    const io = new Server(server, { cors : { origin : config.get("clientUrl"), credentials: true } });
    io.use(socketAuth);
    io.on("connection", (socket) => {
        console.log(`User joined room ${socket.room.name} with socketId: ${socket.id}`);
        const { room, user } = socket;
        const roomId = room._id.toString();
        const userId = user._id.toString();
    
        // join the room event
        socket.join(roomId);
        if (!Object.prototype.hasOwnProperty.call(collections, roomId)) {
            collections[roomId] = new Array();
        }
        collections[roomId].push(socket.id);
        console.log(collections)
        
        // message event
        socket.on("message", async (message, time) => {
            console.log(`Message Recieved: ${message} from ${userId} in room:${roomId} at ${time}}`);
            const sender = await User.findById(userId).lean();
            io.to(roomId).emit("message", message, sender, time);
            Chat.create({ room: roomId, sender: userId, message, time }).catch(err => {
                console.log('Could not save', {message, userId, err});
            });
        });
    
        // disconnect event
        socket.on("disconnect", () => {
            console.log(`User Disconnected from socket ${socket.id}`);
            const index = collections[roomId].indexOf(socket.id);
            if (index > -1) collections[roomId].splice(index, 1);
        })
    });
}




module.exports = { init };