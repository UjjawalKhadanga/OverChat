const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("JWT_SECRET");

// Auth Middleware
module.exports = function (req,res,next){
    // extracting auth token from cookie
    const token = req.cookies.auth;
    
    if(!token) return res.status(401).json({msg: " Unauthorized User Access Denied"});

    // verify token
    try {
        const verified=jwt.verify(token,JWT_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        return res.status(400).json({msg: "Invalid Token"})
    }
}