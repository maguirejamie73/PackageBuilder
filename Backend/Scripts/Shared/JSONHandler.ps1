param(
    [Parameter(Mandatory=$true)]
    [string]$JsonPath,

    [Parameter(Mandatory=$true)]
    [string]$Driver,

    [Parameter(Mandatory=$true)]
    [string]$Printer
)

$data = @{
    DriverName = $Driver
    Printers   = @(
        @{
            Name = $Printer
            Port = "AUTO"
        }
    )
}

$data | ConvertTo-Json -Depth 5 | Out-File -FilePath $JsonPath -Encoding UTF8
Write-Output "Created JSON at $JsonPath"
