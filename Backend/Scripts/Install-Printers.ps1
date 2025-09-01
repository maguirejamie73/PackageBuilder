param([string]$SiteConfigFile = "MC35.json")

$ErrorActionPreference = "Stop"
$LogFile = "C:\Windows\Temp\KM-Printers.log"

function Write-Log { param([string]$Message)
    Add-Content -Path $LogFile -Value "$(Get-Date -Format s) - $Message"
}

Write-Log "Starting printer installation on $env:COMPUTERNAME for user $env:USERNAME"

# Load JSON config
$ConfigPath = Join-Path $PSScriptRoot $SiteConfigFile
if (-not (Test-Path $ConfigPath)) {
    Write-Log "ERROR: Config file not found: $ConfigPath"
    exit 1
}
$config = Get-Content -Path $ConfigPath | ConvertFrom-Json

$DriverName = $config.DriverName
$Printers   = $config.Printers

# Wait for driver
$MaxRetries = 12
$RetryCount = 0
while ($RetryCount -lt $MaxRetries) {
    $driver = Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue
    if ($null -ne $driver) { Write-Log "Driver [$DriverName] found"; break }
    Write-Log "Driver [$DriverName] not found, waiting..."
    Start-Sleep -Seconds 10
    $RetryCount++
}

if ($null -eq (Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue)) {
    Write-Log "ERROR: Driver [$DriverName] not installed after waiting. Exiting."
    exit 1
}

# Install printers
foreach ($printer in $Printers) {
    $name = $printer.Name
    $port = $printer.Port
    $portName = "TCP-$port"

    # Create TCP/IP port
    if (-not (Get-PrinterPort -Name $portName -ErrorAction SilentlyContinue)) {
        Write-Log "Creating port $portName for IP $port"
        Add-PrinterPort -Name $portName -PrinterHostAddress $port
    }

    # Add printer
    if (-not (Get-Printer -Name $name -ErrorAction SilentlyContinue)) {
        Write-Log "Installing printer $name on $portName"
        Add-Printer -Name $name -DriverName $DriverName -PortName $portName
    } else {
        Write-Log "Printer $name already exists, skipping"
    }
}

Write-Log "Printer installation complete"
exit 0
