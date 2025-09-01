# ===========================
# Konica Minolta Driver Uninstaller
# Runs as SYSTEM
# ===========================

$ErrorActionPreference = "Stop"
$LogFile = "C:\Windows\Temp\KM-Drivers-Uninstall.log"
$DriverName = "KONICA MINOLTA C759SeriesPCL"

function Write-Log {
    param([string]$Message)
    Add-Content -Path $LogFile -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
}

Write-Log "Starting driver uninstall"

try {
    $driver = Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue
    if ($null -ne $driver) {
        Write-Log "Removing driver $DriverName"
        Remove-PrinterDriver -Name $DriverName -ErrorAction Stop
        Write-Log "Driver $DriverName removed successfully"
    }
    else {
        Write-Log "Driver $DriverName not found, nothing to uninstall"
    }
}
catch {
    Write-Log "ERROR during uninstall: $_"
    exit 1
}

Write-Log "Driver uninstall script completed successfully"
exit 0
