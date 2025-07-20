const socket = io();
const messagesBox = document.getElementById('chatMessages');
const input = document.getElementById('messageInput');

// Ambil username dari localStorage atau fallback
const username = localStorage.getItem("username") || "Anonymous";

// Fungsi untuk menghasilkan warna dari nama user (tetap konsisten)
function getColorFromUsername(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.abs(hash % 360)}, 70%, 60%)`;
}

// Fungsi tampilkan pesan ke dalam chat box
function appendMessage({ username, text }) {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.innerHTML = `<span class="user" style="color:${getColorFromUsername(username)}">${username}:</span> <span class="text">${text}</span>`;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Kirim pesan ke server
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const message = { username, text };
    socket.emit('chat message', message);
    input.value = "";
}

// Event saat menerima satu pesan baru dari server
socket.on('chat message', appendMessage);

// Event saat menerima semua histori saat user baru masuk
socket.on('chat-history', (messages) => {
    messages.forEach(appendMessage);
});

// Tekan Enter untuk kirim
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Hindari submit form jika ada
        sendMessage();
    }
});
