document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Password tidak cocok!");
        return;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter.");
        return;
    }

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (data.success) {
            alert("Registrasi berhasil. Silakan login.");
            window.location.href = "/auth/login.html";
        } else {
            alert("Registrasi gagal: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan pada server.");
    }
});
