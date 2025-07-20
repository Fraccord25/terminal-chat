document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Semua kolom harus diisi!");
        return;
    }

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem("username", username);
            alert("Login berhasil!");
            window.location.href = "/index.html";
        } else {
            alert("Login gagal: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat login.");
    }
});
