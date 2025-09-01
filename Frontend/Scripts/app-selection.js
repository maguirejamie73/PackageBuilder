document.getElementById("appForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const apps = Array.from(document.getElementById("apps").selectedOptions).map(opt => opt.value);

  if (apps.length === 0) {
    alert("Please select at least one app.");
    return;
  }

  try {
    const response = await fetch("/api/generate/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apps })
    });

    if (!response.ok) throw new Error("Failed to generate app package");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apps-package.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Error: Unable to generate app package.");
  }
});
