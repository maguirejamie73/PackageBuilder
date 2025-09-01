document.getElementById("adminForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selected = Array.from(document.querySelectorAll("input[name='task']:checked")).map(cb => cb.value);

  if (selected.length === 0) {
    alert("Please select at least one admin task.");
    return;
  }

  try {
    const response = await fetch("/api/generate/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: selected })
    });

    if (!response.ok) throw new Error("Failed to generate admin package");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-tasks-package.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Error: Unable to generate admin tasks package.");
  }
});
