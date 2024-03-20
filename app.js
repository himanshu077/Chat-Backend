// app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/database');
const userRoutes = require('./routes/users');
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
app.use((req, res, next) => {
    console.log('\x1b[33m%s\x1b[0m', req.method, req.url); // Logging request method and URL in orange color
    next();
});

app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from any origin
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
app.use('/api/users', userRoutes);

// Connect to MongoDB
connectDb();

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
