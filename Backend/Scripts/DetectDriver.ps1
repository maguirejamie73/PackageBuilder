# ===========================
# Driver Detection Script
# Runs as SYSTEM
# ===========================

$DriverName = "KONICA MINOLTA C759SeriesPCL"
$driver = Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue

if ($null -ne $driver) {
    Write-Output "Driver detected"
    exit 0
} else {
    Write-Output "Driver not detected"
    exit 1
}
