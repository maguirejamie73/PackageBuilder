// login.js for PackageBuilder Frontend
// Make sure this is loaded in login.html with <script src="scripts/login.js"></script>

const API_BASE_URL = "https://packagebuilder-backend-dd8kv.ondigitalocean.app";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        // If backend responds with non-2xx, throw to catch
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || "Login failed");
        }

        const data = await response.json();
        if (data.success) {
            // Redirect to site selection
            window.location.href = "site-selection.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Unable to connect to backend. Please check your internet connection or try again later.");
        console.error("Login error:", err);
    }
});
