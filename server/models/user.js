const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true }
}, { collection: "OverChat.User" });

// hash the passwords before saving them to the database
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    }
    next();
 });


module.exports = mongoose.model("User",userSchema);