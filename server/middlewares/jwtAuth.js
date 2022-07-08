const jwt = require("jsonwebtoken");
const config = require("config");

// Auth Middleware
module.exports = function (req,res,next){
    // extracting auth token from req cookies
    const token = req.cookies.auth;
    
    if(!token){
        return res.status(401).json({msg: " Unauthorized User Access Denied"})
    }

    // verify token
    try {
        const verified=jwt.verify(token,config.get("JWT_SECRET"));
        req.user=verified;
        console.log(`cookie parsed => _id : ${verified._id} `)
        next();
    } catch (error) {
        return res.status(400).json({msg: "Invalid Token"})
    }
}