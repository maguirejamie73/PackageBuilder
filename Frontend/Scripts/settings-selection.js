async function loadSettings() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/get-settings`);
        const tasks = await res.json();
        const select = document.getElementById("settingsSelect");
        tasks.forEach(t => {
            const option = document.createElement("option");
            option.value = t.id;
            option.textContent = t.name;
            select.appendChild(option);
        });
    } catch (err) { console.error(err); }
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const taskId = document.getElementById("settingsSelect").value;
    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-settings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId })
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Settings_${taskId}.ps1`;
        a.click();
    } catch (err) { console.error(err); }
});

loadSettings();
