# Kleiner lokaler Webserver zum Testen, ohne Python oder Node.
# Aufruf: powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1 [-Wurzel site] [-Port 8080]
param(
  [string]$Wurzel = (Join-Path $PSScriptRoot "..\site"),
  [int]$Port = 8080
)

$Wurzel = (Resolve-Path $Wurzel).Path
$typen = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".svg" = "image/svg+xml"; ".json" = "application/json"; ".ico" = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Server läuft auf http://localhost:$Port/ (Ordner: $Wurzel)"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $pfad = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
  $datei = Join-Path $Wurzel $pfad
  if (Test-Path $datei -PathType Container) { $datei = Join-Path $datei "index.html" }
  $voll = [IO.Path]::GetFullPath($datei)
  if ($voll.StartsWith($Wurzel) -and (Test-Path $voll -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($voll)
    $ext = [IO.Path]::GetExtension($voll).ToLower()
    $ctx.Response.ContentType = $(if ($typen[$ext]) { $typen[$ext] } else { "application/octet-stream" })
    $ctx.Response.Headers.Add("Cache-Control", "no-store")
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.Close()
}
