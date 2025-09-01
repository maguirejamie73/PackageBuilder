param(
    [string]$UserName
)

# Add user to the local Administrators group
Add-LocalGroupMember -Group "Administrators" -Member $UserName
Write-Output "User $UserName added to Administrators group."
