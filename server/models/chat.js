const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    room: { type: mongoose.Types.ObjectId, required: true, ref: "Room" },
    sender: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    message: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now() }
}, { collection: "Chat" });


module.exports = mongoose.model("Chat", chatSchema);    