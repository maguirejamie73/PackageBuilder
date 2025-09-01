param(
    [string]$TimeZone = "Eastern Standard Time"
)

# Set system time zone
Set-TimeZone -Name $TimeZone
Write-Output "Time zone set to $TimeZone."
