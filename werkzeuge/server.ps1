# Kleiner Webserver zum Testen, ohne Python oder Node.
# Nur dieser Computer:   powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1
# Auch Handy im WLAN:    powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1 -Netz
# Beim ersten Start mit -Netz fragt Windows nach einer Firewall-Freigabe: "Private Netzwerke" erlauben.
param(
  [string]$Wurzel = (Join-Path $PSScriptRoot "..\site"),
  [int]$Port = 8080,
  [switch]$Netz
)

$Wurzel = (Resolve-Path $Wurzel).Path
$typen = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".svg" = "image/svg+xml"; ".json" = "application/json"; ".ico" = "image/x-icon"
}

$adresse = if ($Netz) { [Net.IPAddress]::Any } else { [Net.IPAddress]::Loopback }
$listener = New-Object Net.Sockets.TcpListener($adresse, $Port)
$listener.Start()
Write-Host "Server laeuft: http://localhost:$Port/  (Ordner: $Wurzel)"
if ($Netz) {
  Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" -and $_.PrefixOrigin -ne "WellKnown" } |
    ForEach-Object { Write-Host "Im WLAN am Handy oeffnen: http://$($_.IPAddress):$Port/" }
}

function Antwort($strom, [int]$status, [string]$typ, [byte[]]$inhalt) {
  $text = if ($status -eq 200) { "OK" } else { "Not Found" }
  $kopf = "HTTP/1.1 $status $text`r`nContent-Type: $typ`r`nContent-Length: $($inhalt.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
  $k = [Text.Encoding]::ASCII.GetBytes($kopf)
  $strom.Write($k, 0, $k.Length)
  if ($inhalt.Length) { $strom.Write($inhalt, 0, $inhalt.Length) }
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $client.ReceiveTimeout = 5000
    $strom = $client.GetStream()
    $leser = New-Object IO.StreamReader($strom, [Text.Encoding]::ASCII, $false, 1024, $true)
    $zeile = $leser.ReadLine()
    while ($true) { $z = $leser.ReadLine(); if ([string]::IsNullOrEmpty($z)) { break } }
    if (-not $zeile) { continue }

    $pfad = ($zeile -split " ")[1] -replace "\?.*$", ""
    $pfad = [Uri]::UnescapeDataString($pfad).TrimStart("/")
    $datei = Join-Path $Wurzel $pfad
    if (Test-Path $datei -PathType Container) { $datei = Join-Path $datei "index.html" }
    $voll = [IO.Path]::GetFullPath($datei)

    if ($voll.StartsWith($Wurzel) -and (Test-Path $voll -PathType Leaf)) {
      $ext = [IO.Path]::GetExtension($voll).ToLower()
      $typ = if ($typen[$ext]) { $typen[$ext] } else { "application/octet-stream" }
      Antwort $strom 200 $typ ([IO.File]::ReadAllBytes($voll))
    } else {
      Antwort $strom 404 "text/plain; charset=utf-8" ([Text.Encoding]::UTF8.GetBytes("Nicht gefunden"))
    }
  } catch {
  } finally {
    $client.Close()
  }
}
