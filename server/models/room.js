const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 12;

const roomSchema = new mongoose.Schema({
    RoomName: {
        type: String,
        unique: true,
        required: true
    },
    RoomPassword: {
        type: String,
        required: true
    },
    MaxLimit: {
        type: Number,
        required: true
    },
    Desc:{
        type: String
    },
    RoomOwner: {
        type: String,
        required: true
    },
    RoomOwnerName: {
        type: String,
        required: true
    },
    Members: [{
        username: {type : String},
        userID: {type: String},
    }],
    Messages: [
        {
            senderID: {
                type: String,
                unique: true,
                required: true
            },
            senderName: {
                type: String,
                required: true
            },
            Message: {
                type: String,
                required: true
            },
            Time: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ],
},{collection: "Rooms"});

// hash the Roompasswords before saving them to the database
roomSchema.pre('save', async function(next) {
    if (this.isModified('RoomPassword')) {
        this.RoomPassword = await bcrypt.hash(this.RoomPassword, SALT_WORK_FACTOR);
    }
    next();
 });



module.exports = mongoose.model("Room",roomSchema);