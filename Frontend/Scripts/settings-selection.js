document.getElementById("settingsForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selected = Array.from(document.querySelectorAll("input[name='setting']:checked")).map(cb => cb.value);

  if (selected.length === 0) {
    alert("Please select at least one setting.");
    return;
  }

  try {
    const response = await fetch("/api/generate/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: selected })
    });

    if (!response.ok) throw new Error("Failed to generate settings package");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings-package.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Error: Unable to generate settings package.");
  }
});
