param(
    [Parameter(Mandatory=$true)]
    [string]$ScriptPath
)

# Find a code signing cert in the local machine or user store
$cert = Get-ChildItem Cert:\CurrentUser\My -CodeSigningCert | Select-Object -First 1

if (-not $cert) {
    Write-Error "No code signing certificate found. Please install one first."
    exit 1
}

try {
    Set-AuthenticodeSignature -FilePath $ScriptPath -Certificate $cert -TimestampServer "http://timestamp.digicert.com" | Out-Null
    Write-Output "Successfully signed $ScriptPath"
} catch {
    Write-Error "Failed to sign script: $_"
    exit 1
}
