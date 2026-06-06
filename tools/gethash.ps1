param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Value
)

if (Test-Path -LiteralPath $Value -PathType Leaf)
{
    (Get-FileHash -LiteralPath $Value -Algorithm SHA512).Hash.Substring(0,8)
}
else
{
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
    $sha512 = [System.Security.Cryptography.SHA512]::Create()
    $hashBytes = $sha512.ComputeHash($bytes)
    $hash = [BitConverter]::ToString($hashBytes).Replace("-", "")

    $hash.Substring(0,8)
}