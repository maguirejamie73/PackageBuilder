param(
    [Parameter(Mandatory=$true)]
    [string]$ScriptPath,

    [Parameter(Mandatory=$true)]
    [string]$OutputPath
)

$toolPath = Join-Path $PSScriptRoot "tools\IntuneWinAppUtil.exe"

if (-not (Test-Path $toolPath)) {
    Write-Error "IntuneWinAppUtil.exe not found in $toolPath"
    exit 1
}

# Create a temp working folder
$tempFolder = Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName())
New-Item -ItemType Directory -Path $tempFolder | Out-Null

# Copy script into working folder
Copy-Item $ScriptPath -Destination $tempFolder

# Wrap into .intunewin
& $toolPath -c $tempFolder -s (Split-Path $ScriptPath -Leaf) -o (Split-Path $OutputPath) -q

# Cleanup
Remove-Item $tempFolder -Recurse -Force
Write-Output "Packaged $ScriptPath into $OutputPath"
