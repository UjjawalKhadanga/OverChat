const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../middlewares/jwtAuth");

const JWT_SECRET = process.env.JWT_SECRET

//** Login /Reg System***************************************

// User Registration
router.post('/register', async (req,res,next) => {
    try {
        const { name, password } = req.body;
        //----------------------------------------------
        const user = await User.create({ name, password });
        //----------------------------------------------
        console.log(user);
        return res.send({ msg: "User has been successfully registered", name: user.name });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

// User Login({name,password})
router.post('/login', async (req,res,next) => {
    try{
        const { name, password } = req.body;
        //---------------------------------------------- 
        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({msg: "User Not Found"});
        console.log(user)
        //----------------------------------------------

        // Validation
        const isvalid = bcrypt.compareSync(password,user.password);
        if (isvalid){
            // create jwt and assign as cookie
            const token = jwt.sign({ _id : user._id }, JWT_SECRET )
            res.cookie('auth', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

            return res.status(200).json({ msg: "success", _id: user._id })
        } else return res.status(400).json({ msg: "Password Incorrect" });
    } catch(err) {
        console.log(`ERROR=>${err}`);
        next(err);
    }
});

// Logout
router.post('/logout',jwtAuth, async (req,res) => {
    if(!req.user) return res.status(400).json({error : 'No User logged in'})
    res.cookie('auth',{},{ maxAge:1 });
    return res.status(200).json({ success :'logout successfull' });
});

router.get('/info',jwtAuth, async (req,res) => {
    if(!req.user) return res.status(400).json({error : 'No User logged in'})
    const user = await User.findById(req.user._id).lean();
    return res.status(200).json(user);  
})

module.exports = router;