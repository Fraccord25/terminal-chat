const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Email tidak valid!");
        return;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Konfirmasi password tidak cocok!");
        return;
    }

    // Simpan ke localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Username sudah terdaftar!");
        return;
    }

    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html"; // Arahkan ke halaman login
});
