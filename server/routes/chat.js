const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const User = require("../models/user");
const jwtverification = require("../middlewares/jwtAuth")

router.get('/getroomdata/:id',jwtverification,async (req,res)=>{
    const roomID=req.params.id
    // get all messges from roomID
    const data=await Room.findById(roomID);
    console.log(data)
    res.status(200).json(data)
})

router.post('/addmessage',jwtverification,async (req,res)=>{
    const roomID=req.body.roomID
    const message=req.body.message
    const senderID=req.user._id
    const sender=await User.findById(senderID);
    const senderName=sender.name
    const time=Date.now()
    const room=await Room.findById(roomID)
    console.log({message:message,senderID:senderID,senderName:senderName,time:time})
    room.Messages.push({Message:message,senderID:senderID,senderName,Time:time})
    await room.save()
    res.status(200).json({msg:"message added"})
})




module.exports = router;