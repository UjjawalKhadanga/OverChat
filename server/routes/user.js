const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const jwtAuth = require("../middlewares/jwtAuth");

//** Login /Reg System***************************************

// User Registration
router.post('/register', async (req,res) => {
    try{
        //----------------------------------------------
        const user = new User({
            "name": req.body.name,
            "password": req.body.password
        });
        const result = await user.save();
        //----------------------------------------------
        console.log(result);
        res.send({msg: "User has been successfully registered", name: result.name});
    } catch(err){if(err){console.log(err);}}
});

// User Login({name,password})
router.post('/login', async (req,res) => {
    try{
        //---------------------------------------------- 
        const result = await User.findOne({name: req.body.name},"name password");
        console.log(result)
        //----------------------------------------------

        if (!result){
            res.status(400).json({msg: "User Not Found"});
            throw "User Not Found";
        }   

        // Validation
        const isvalid = await bcrypt.compare(req.body.password,result.password);
        if (isvalid){
            // valid
            
            // create jwt
            const token = jwt.sign({_id : result._id,}, config.get("JWT_SECRET"))
            // assign jwt as cookie
            res.cookie('auth', token, {
                httpOnly: true,
                withCredentials: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
            res.status(200).json({
                msg: "success", 
                name: req.body.name
            })

        } else{
            // invalid
            res.status(400).json({msg: "Password Incorrect"})
            throw "Incorrect Password";
        }
    } catch(err){if(err){console.log("ERROR=> "+err);}}
});

// Logout
router.post('/logout',jwtAuth, async (req,res) => {
    if(req.user){
        res.cookie('auth',{},{maxAge:1});
        res.status(200).json({success :'logout successfull'});
    }
    res.status(400).json({error : 'No User logged in'})
});

module.exports = router;