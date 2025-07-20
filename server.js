const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Simpan histori chat di memori (reset saat server restart)
let chatHistory = [];

// Serve file statis
app.use(express.static(path.join(__dirname, 'public')));

// Saat ada koneksi baru
io.on('connection', socket => {
    console.log("User connected");

    // Kirim histori chat ke client baru
    socket.emit('chat-history', chatHistory);

    // Saat menerima pesan dari client
    socket.on('chat message', data => {
        // Simpan ke histori
        chatHistory.push(data);

        // Hanya simpan max 100 pesan
        if (chatHistory.length > 100) {
            chatHistory.shift();
        }

        // Kirim ke semua user
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
