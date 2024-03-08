// app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/database');
const chatsRoutes = require('./routes/chats');
const socketHandler = require('./socket');
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketIo(server,
    {
        cors: { origin: "*" }
    }
);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
    credentials: true // Allow sending cookies
}));

app.use(express.json());
app.use(cookieParser());

// Middleware to attach socket.io instance to request object
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket.io handlers
socketHandler(io);

// Routes
app.use('/api/chats', chatsRoutes);

// Connect to MongoDB
connectDb(process.env.MONGODB_URL);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
