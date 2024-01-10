const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const chatServer = require("./chat_server");
const user = require("./routes/user");
const room = require("./routes/room");
const chat = require("./routes/chat");

const PORT = config.get("port");
const DB_URI = config.get("dbURI");
const CLIENT_URL = config.get("clientUrl");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: CLIENT_URL}));
app.use(cookieParser());

// Database Connection
mongoose.connect(DB_URI).then(() => console.log("MongoDB Connected")).catch(err => console.log('Err in connecting to db', err));


// Routes
app.use("/user", user);

app.use("/room", room);

app.use("/chat", chat);


// socket io
const server = http.createServer(app);
chatServer.init(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));