document.getElementById("printerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const printer = document.getElementById("printer").value;
  const driver = document.getElementById("driver").value;

  if (!printer || !driver) {
    alert("Please select both a printer and a driver.");
    return;
  }

  try {
    const response = await fetch("/api/generate/printer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ printer, driver })
    });

    if (!response.ok) {
      throw new Error("Failed to generate printer package");
    }

    // Convert response to blob and trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${printer}-package.zip`;  // file name for download
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Error: Unable to generate printer package.");
  }
});
