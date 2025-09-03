async function loadTasks() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/get-admin-tasks`);
        const tasks = await res.json();
        const select = document.getElementById("taskSelect");
        tasks.forEach(t => {
            const option = document.createElement("option");
            option.value = t.id;
            option.textContent = t.name;
            select.appendChild(option);
        });
    } catch (err) { console.error(err); }
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const taskId = document.getElementById("taskSelect").value;
    const target = document.getElementById("targetName").value;

    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-admin-task`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId, target })
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `AdminTask_${taskId}.ps1`;
        a.click();
    } catch (err) { console.error(err); }
});

loadTasks();
