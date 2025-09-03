// login.js

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Hardcoded backend URL for DigitalOcean
    const BACKEND_URL = "https://packagebuilder-backend-dd8kv.ondigitalocean.app";

    try {
        const res = await fetch(`${BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            // Handle HTTP errors
            const errorData = await res.json().catch(() => ({}));
            const message = errorData.message || "Login failed due to server error.";
            alert(message);
            return;
        }

        const data = await res.json();
        if (data.success) {
            // Redirect to site selection page
            window.location.href = "site-selection.html";
        } else {
            alert(data.message || "Invalid credentials.");
        }

    } catch (err) {
        alert("Unable to connect to backend. Check your internet connection or backend URL.");
        console.error("Login error:", err);
    }
});
