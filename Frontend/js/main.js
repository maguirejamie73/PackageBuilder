document.addEventListener("DOMContentLoaded", function() {
    // Example for Printer Selection page
    const printerDropdown = document.getElementById("printerDropdown");
    if(printerDropdown){
        fetch('/json-templates/Printers.json')
        .then(response => response.json())
        .then(data => {
            data.Printers.forEach(p => {
                let option = document.createElement("option");
                option.value = p.Name;
                option.text = p.Name;
                printerDropdown.add(option);
            });
        });
    }

    // Placeholder for handling uploads and generating packages
    const generateBtn = document.getElementById("generatePackage");
    if(generateBtn){
        generateBtn.addEventListener("click", function(){
            alert("Package generation logic will call backend scripts here.");
        });
    }
});
