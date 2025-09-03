async function loadPrinters() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/get-printers`);
        const printers = await res.json();
        const select = document.getElementById("printerSelect");
        printers.forEach(p => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name;
            select.appendChild(option);
        });
    } catch (err) {
        console.error("Failed to load printers", err);
    }
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const printerId = document.getElementById("printerSelect").value;
    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-printer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ printerId })
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `PrinterScript_${printerId}.ps1`;
        a.click();
    } catch (err) {
        console.error(err);
    }
});

loadPrinters();
