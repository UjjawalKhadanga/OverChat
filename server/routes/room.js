const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwtverification = require("../middlewares/jwtAuth")


//** ChatRoom Api************************************************

// create room
router.post('/createroom',jwtverification, async (req,res) => {
    try{
        //find owner name from req.user._id
        const RoomOwnerName = await User.findOne({_id: req.user._id},"name");
        const room = new Room({
            "RoomName" : req.body.RoomName,
            "RoomPassword" : req.body.RoomPassword,
            "Desc" : req.body.RoomDescription,
            "MaxLimit": req.body.MaxLimit,
            "RoomOwner" : req.user._id,
            "RoomOwnerName" : RoomOwnerName.name,
            "Members" : [{username: RoomOwnerName.name, userID: req.user._id}]
        });
        const result = await room.save();

        console.log(result);

        res.status(200).json({msg: "Room Created Sucessfully"});
        
    } catch(err){if(err){console.log(err)};}
})

// delete room
router.post('/deleteroom', jwtverification, async (req,res) => {
    try{
        const selectedroom = await Room.findById({_id: req.body.RoomID}).exec();
        if(!selectedroom){throw "Invalid RoomID";}
        const selectedowner = await User.findOne({name : selectedroom.RoomOwner},"name");
        if(!selectedowner){throw "Invalid RoomOwnerID";}
        if(selectedowner._id==req.body.RoomOwnerID){
            // ownerid eneterd is correct now check if user password is correct
            const pass = await User.findById({_id: selectedowner._id}).exec();
            const isvalid = await bcrypt.compare(req.body.RoomOwnerPassword,pass.password)
            if (isvalid){
                // Delete the doc
                const delresult = await Room.findByIdAndDelete(req.body.RoomID);
                res.status(200).json({msg: "deleted", document: delresult});
            } else{
                res.status(400).json({msg: "Wrong User Password"});
            }
        } else{
            res.status(400).json({msg: "User is not the owner"});
        }

        
        
    } catch(err){
        console.log("ERROR "+err);
        res.status(400).json({msg: err});
    }
})

// get all rooms
router.get('/getrooms', jwtverification,async (req,res) => {
    try{
        const data = await Room.find({},"RoomName MaxLimit _id RoomOwnerName Desc");
        
        return res.status(200).json(data);
    } catch(err){
        console.log(err);
        return res.status(400).json({msg: "Error has occured"})
    }
})

// join a room
router.post('/joinroom', jwtverification, async (req,res) => {
    try{
        const selectedroom = await Room.findById({_id: req.body.RoomID});
        if(!selectedroom){throw "Invalid RoomID";}
        const userName = await User.findById({_id: req.user._id});

        // if req.user._id is in Members
        let isPresent = await selectedroom.Members.find(elem => elem.userID===req.user._id); 
        if(isPresent){
            return res.status(200).json({msg: "User already in the room"});
        }
        selectedroom.Members.push({username: userName.name, userID: req.user._id});
        const result = await selectedroom.save();
        return res.status(200).json({msg: "Joined Room Successfully"});
    } catch(err){
        console.log(err);
        return res.status(400).json({msg: "Error has occured"})
    }
})


module.exports = router;