require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieparsal= require('cookie-parser')
const connectDb = require('./db/connect');
const chatsRoutes = require('./routes/chats');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true 
}));
app.use(express.json());
app.use(cookieparsal());

// Routes
app.use('/api/chats', chatsRoutes);

app.get('/', (req, resp) => {
    resp.send('Hi, I am live');
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        io.emit('chat message', msg); 
    });
});

const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        server.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

start();
