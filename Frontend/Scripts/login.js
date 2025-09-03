// frontend/scripts/login.js

// Set your deployed backend URL here
const API_BASE_URL = "https://packagebuilder-backend-dd8kv.ondigitalocean.app";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            alert(`Login failed: ${res.statusText}`);
            return;
        }

        const data = await res.json();

        if (data.success) {
            // Optionally store login state in sessionStorage
            sessionStorage.setItem("username", username);
            window.location.href = "site-selection.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Unable to connect to backend. Check your network or backend URL.");
        console.error(err);
    }
});
