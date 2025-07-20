const socket = io();
const messagesBox = document.getElementById('chatMessages');
const input = document.getElementById('messageInput');

const username = localStorage.getItem("username");

// Kalau tidak login, kembali ke login
if (!username) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/auth/login.html";
}

// Warna unik dari username
function getColorFromUsername(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
}

function appendMessage({ username, text }) {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.innerHTML = `<span class="user" style="color:${getColorFromUsername(username)}">${username}:</span> <span class="text">${text}</span>`;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    const message = { username, text };
    socket.emit('chat message', message);
    input.value = "";
}

// Menerima chat dari server
socket.on('chat message', data => {
    appendMessage(data);
});

// Simpan histori pesan di localStorage
socket.on('chat-history', (messages) => {
    messages.forEach(msg => appendMessage(msg));
});

input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "/auth/login.html";
    });
}
