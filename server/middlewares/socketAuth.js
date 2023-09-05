const User = require("../models/user");
const Room = require("../models/room");
const jwt = require("jsonwebtoken");
const config = require("config");
const cookie = require('cookie');


const JWT_SECRET = config.get("JWT_SECRET");

// get the room id from the socket and check if the user is a member of the room
async function socketAuth(socket, next) {
    try {
        const token = cookie.parse(socket.handshake.headers.cookie).auth;
        const roomId = socket.handshake.query.roomId;
        const {_id: userId} = jwt.verify(token, JWT_SECRET);
    
        const user = await User.findById(userId).lean();
        if (!user) return next(new Error("Invalid User"));
        const room = await Room.findById(roomId).lean();
        if (!room) return next(new Error("Invalid Room"));
    
        if (!room.members.find(mem => mem.toString() === userId)) return next(new Error("Unauthorized User"));
    
        socket.room = room;
        socket.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = socketAuth;