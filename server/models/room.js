const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

SALT_WORK_FACTOR = 12;

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    maxLimit: { type: Number, required: true },
    description:{ type: String },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
}, { collection: "OverChat.Room" });

// hash the Roompasswords before saving them to the database
roomSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    }
    next();
});

module.exports = mongoose.model("Room",roomSchema);