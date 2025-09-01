document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("admin-tasks-form");
    const output = document.getElementById("ps-script-preview");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const tasks = formData.getAll("task");
        const username = formData.get("username") || "";
        const deviceName = formData.get("device-name") || "";

        let psScript = "# Generated Admin Tasks Script\n\n";

        tasks.forEach(task => {
            switch(task) {
                case "add-local-admin":
                    if (!username) {
                        psScript += "# ERROR: Username not provided for Add-LocalAdmin task\n";
                    } else {
                        psScript += `Write-Output "Adding ${username} to local Administrators group"\n`;
                        psScript += `Add-LocalGroupMember -Group "Administrators" -Member "${username}"\n\n`;
                    }
                    break;

                case "enable-remote-desktop":
                    psScript += "Write-Output 'Enabling Remote Desktop'\n";
                    psScript += "Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -Value 0\n";
                    psScript += "Enable-NetFirewallRule -DisplayGroup 'Remote Desktop'\n\n";
                    break;

                case "disable-firewall":
                    psScript += "Write-Output 'Disabling Windows Firewall'\n";
                    psScript += "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False\n\n";
                    break;

                case "enable-windows-update":
                    psScript += "Write-Output 'Enabling Windows Update'\n";
                    psScript += "Set-Service -Name wuauserv -StartupType Automatic\n";
                    psScript += "Start-Service -Name wuauserv\n\n";
                    break;

                default:
                    psScript += `# Unknown task: ${task}\n`;
            }
        });

        if (deviceName) {
            psScript += `# Device-specific commands for ${deviceName} can be added here\n\n`;
        }

        output.textContent = psScript;
    });
});
