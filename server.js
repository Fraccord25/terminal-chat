const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log("User connected");

    socket.on('chat message', data => {
        io.emit('chat message', data); // Kirim ke semua user
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
