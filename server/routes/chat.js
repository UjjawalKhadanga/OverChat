const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const User = require("../models/user");
const jwtverification = require("../middlewares/jwtAuth")

router.get('/room/:roomId',jwtverification,async (req,res,next)=>{
    try {
        const { roomId } = req.params;
        const chats = await Chat.find({ room: roomId }).sort({ time: 1 }).populate("sender");
        return res.status(200).json({ chats });
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.post('/:roomId/message',jwtverification,async (req,res,next)=>{
    try {
        const { message } = req.body;
        const { roomId } = req.params;
        const { _id: senderId } = req.user;
        const time = Date.now();
        console.log({ message, senderId, time });
        const chat = await Chat.create({ room: roomId, message, sender: senderId, time });
        return res.status(200).json({ msg:"message added", chat });
    } catch (err) {
        console.log(err);
        next(err);
    }
})




module.exports = router;