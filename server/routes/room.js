const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwtverification = require("../middlewares/jwtAuth")


//** ChatRoom Api************************************************

// create room
router.put('/',jwtverification, async (req,res,next) => {
    try{
        const { name, password, description, maxLimit } = req.body;
        const { _id: owner } = req.user;
        const room = await Room.create({
            name, password, description, maxLimit, owner, members: [owner]
        });
        console.log(room);
        return res.status(200).json({ msg: "Room Created Sucessfully", room });
    } catch(err) {
        console.log(err);
        next(err);
    }
})

// delete room
router.delete('/:roomId', jwtverification, async (req,res) => {
    try{
        const { roomId } = req.params;
        const { _id: ownerId } = req.user;
        const room = await Room.findById(roomId);
        if(!room) throw "Invalid roomId";

        const owner = await User.findById(ownerId);
        if(!owner) throw "Invalid owner";
        
        const deleteRes = await Room.findByIdAndDelete(roomId);
        return res.status(200).json({ msg: "deleted", document: deleteRes });
    } catch(err){
        console.log(err);
        next(err);
    }
})

// get all rooms
router.get('/', jwtverification,async (req,res,next) => {
    try{
        const rooms = await Room.find({}).populate([
            { path: "owner", select: "name" },
            { path: "members", select: "name" }
        ]);
        return res.status(200).json(rooms);
    } catch(err){
        console.log(err);
        next(err);
    }
})

// get room by id
router.get('/:roomId', jwtverification,async (req,res,next) => {
    try{
        const { roomId } = req.params;
        const room = await Room.findById(roomId).populate([
            { path: "owner", select: "name" },
            { path: "members", select: "name" }
        ]);
        return res.status(200).json(room);
    } catch(err){
        console.log(err);
        next(err);
    }
})

// join a room
router.post('/join/:roomId', jwtverification, async (req,res,next) => {
    try{
        const { roomId } = req.params;
        const { _id: userId } = req.user;
        const room = await Room.findById(roomId);
        if(!room) throw "Invalid RoomID";

        const user = await User.findById(userId);
        const isMember = room.members.find(memberId => memberId == userId);
        if (isMember) return res.status(200).json({msg: "User already in the room"});

        room.members.push(userId);
        const result = await room.save();
        return res.status(200).json({ msg: "Joined Room Successfully" });
    } catch(err){
        console.log(err);
        next(err);
    }
})


module.exports = router;