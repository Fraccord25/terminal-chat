const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Cek user dan password
    if (!users[username] || users[username].password !== password) {
        alert("Login gagal! Username atau password salah.");
        return;
    }

    // Login berhasil
    localStorage.setItem("username", username);
    alert("Login berhasil!");
    window.location.href = "/index.html";
});
