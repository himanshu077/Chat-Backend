// socket.js
const socketIo = require('socket.io');
const app = require('express')();

module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log('A user connected');

        // When a new message is received
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            // Broadcast the message to all connected clients
            io.emit('chat message', msg);
        });

        // When a user disconnects
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

};
