# ===========================
# Konica Minolta Driver Installer
# Deploy via Intune Win32
# Runs as SYSTEM
# ===========================

$ErrorActionPreference = "Stop"
$LogFile = "C:\Windows\Temp\KM-Drivers.log"

function Write-Log {
    param([string]$Message)
    Add-Content -Path $LogFile -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
}

Write-Log "=== Starting Driver Install Script ==="

# ------------------------------
# Configurable section
# ------------------------------
$DriverName = "KONICA MINOLTA C759SeriesPCL"
$DriverInf = "Drivers\KOAXPJ__.INF"   # relative to package root

# Resolve path to INF file (Intune extracts package to temp folder)
$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$InfPath = Join-Path $PackageRoot $DriverInf

if (-not (Test-Path $InfPath)) {
    Write-Log "ERROR: Driver INF not found at $InfPath"
    exit 1
}

Write-Log "Found INF at $InfPath"

# ------------------------------
# Install driver via pnputil (use sysnative for 32-bit process)
# ------------------------------
$PNPUtilPath = "$env:windir\sysnative\pnputil.exe"
if (-not (Test-Path $PNPUtilPath)) {
    Write-Log "ERROR: pnputil.exe not found at $PNPUtilPath"
    exit 1
}

Write-Log "Installing driver via pnputil..."
Start-Process -FilePath $PNPUtilPath -ArgumentList "/add-driver `"$InfPath`" /install /subdirs" -Wait -NoNewWindow
Write-Log "pnputil executed successfully"

# ------------------------------
# Explicitly stage driver for Print Spooler
# ------------------------------
try {
    if (-not (Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue)) {
        Write-Log "Registering driver [$DriverName] with Print Spooler..."
        Add-PrinterDriver -Name $DriverName
        Write-Log "Driver [$DriverName] registered successfully"
    } else {
        Write-Log "Driver [$DriverName] already registered with Print Spooler"
    }
}
catch {
    Write-Log "ERROR: Failed to register driver [$DriverName] - $_"
    exit 1
}

Write-Log "=== Driver installation complete ==="
exit 0
