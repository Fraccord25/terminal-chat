const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// ========== 1. MongoDB Setup ==========
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// ========== 2. Middleware ==========
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // untuk menerima JSON body

// ========== 3. API Endpoint Register ==========
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ success: false, message: "Semua kolom wajib diisi" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "Username sudah digunakan" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Gagal menyimpan ke database" });
    }
});

// ========== 4. Real-time Chat ==========
let chatHistory = [];

io.on('connection', socket => {
    console.log("User connected");

    socket.emit('chat-history', chatHistory);

    socket.on('chat message', data => {
        chatHistory.push(data);
        if (chatHistory.length > 100) chatHistory.shift();

        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

// ========== 5. Jalankan Server ==========
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
