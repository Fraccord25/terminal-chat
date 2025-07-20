const socket = io();
const messagesBox = document.getElementById('chatMessages');
const input = document.getElementById('messageInput');

const username = localStorage.getItem("username");

// Jika belum login, redirect ke login page
if (!username) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/auth/login.html";
}

// Fungsi: warna unik untuk setiap username
function getColorFromUsername(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
}

// Tambahkan pesan ke tampilan chat
function appendMessage({ username, text }) {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.innerHTML = `<span class="user" style="color:${getColorFromUsername(username)}">${username}:</span> <span class="text">${text}</span>`;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Kirim pesan
function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    const message = { username, text };
    socket.emit('chat message', message);
    input.value = "";
}

// Terima satu pesan baru
socket.on('chat message', data => {
    appendMessage(data);
});

// Terima seluruh histori pesan saat koneksi awal
socket.on('chat-history', messages => {
    messages.forEach(msg => appendMessage(msg));
});

// Tekan Enter untuk kirim
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

// Tombol Logout (jika ada)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        alert("Logout berhasil.");
        window.location.href = "/auth/login.html";
    });
}
