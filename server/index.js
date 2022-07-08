const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const PORT = config.get("PORT");
const app = express()

// set views
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

// Database Connection
mongoose.connect(config.get("db.mongoUrl"));


// Routes
const user = require("./routes/user");
app.use("/user", user);

const room = require("./routes/room");
app.use("/room", room);

const chat = require("./routes/chat");
app.use("/chat", chat);

app.get('/', (req,res) => {
    res.render('pages/index');
})


// socket io
const server = http.createServer(app);
const io = new Server(server,{
    cors : {origin : "http://localhost:3000"}
});


io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    // handling events
    socket.on("message", (from, to, time, message)=>{
        console.log(`from ${from} to ${to}: ${message} at time=${time}`);
        socket.emit('message', from, to, time, message);
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected ${socket.id}`);
    })
})


server.listen(PORT, () => {
    console.log(`Server : ${config.get("name")} => running on port ${PORT}`);
});