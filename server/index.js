require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const chatServer = require("./chat_server");
const user = require("./routes/user");
const room = require("./routes/room");
const chat = require("./routes/chat");

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials:true }));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.DB_URI).then(() => console.log("MongoDB Connected")).catch(err => console.log('Err in connecting to db', err));


// Routes
app.use("/user", user);

app.use("/room", room);

app.use("/chat", chat);

// Custom err handler
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, msg: "Internal Server Error", error: err.message });
})


// socket io
const server = http.createServer(app);
chatServer.init(server);

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));