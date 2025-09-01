# Disable Remote Desktop
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -Value 1

# Disable firewall rule
Disable-NetFirewallRule -DisplayGroup "Remote Desktop"

Write-Output "Remote Desktop disabled."
