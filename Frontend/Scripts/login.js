const API_BASE_URL = "https://packagebuilder-backend-dd8kv.ondigitalocean.app";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        console.log("Sending login request to:", `${API_BASE_URL}/api/login`);

        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        if (data.success) {
            window.location.href = "site-selection.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Unable to connect to backend.");
        console.error("Login error:", err);
    }
});
