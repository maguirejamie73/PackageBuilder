async function loadApps() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/get-apps`);
        const apps = await res.json();
        const select = document.getElementById("appSelect");
        apps.forEach(a => {
            const option = document.createElement("option");
            option.value = a.id;
            option.textContent = a.name;
            select.appendChild(option);
        });
    } catch (err) { console.error(err); }
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const appId = document.getElementById("appSelect").value;
    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-app`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appId })
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `AppPackage_${appId}.zip`;
        a.click();
    } catch (err) { console.error(err); }
});

loadApps();
