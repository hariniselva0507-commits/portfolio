#!/usr/bin/env pwsh
# start.ps1 — One-command launcher for the Portfolio full-stack app
# Usage: .\start.ps1          — start both servers
#        .\start.ps1 -Seed    — seed database then start both servers
#        .\start.ps1 -Stop    — kill servers running on ports 5000 and 5173

param(
  [switch]$Seed,
  [switch]$Stop
)

$NodePath = "C:\Users\student\tools\nodejs"
$GitPath  = "C:\Users\student\AppData\Local\Programs\Git\cmd"
$env:Path = "$NodePath;$GitPath;" + $env:Path

$Root   = $PSScriptRoot
$Server = Join-Path $Root "server"
$Client = Join-Path $Root "client"

function Kill-Port($port) {
  $proc = netstat -ano | Select-String ":$port " | ForEach-Object {
    ($_ -split '\s+')[-1]
  } | Select-Object -First 1
  if ($proc) {
    Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
    Write-Host "Killed process on port $port (PID $proc)"
  }
}

if ($Stop) {
  Write-Host "Stopping servers..."
  Kill-Port 5000
  Kill-Port 5173
  Write-Host "Done."
  exit 0
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Full-Stack App — Launcher    " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Verify Node.js
try {
  $ver = & node --version 2>&1
  Write-Host "Node.js: $ver" -ForegroundColor Green
} catch {
  Write-Host "ERROR: Node.js not found at $NodePath" -ForegroundColor Red
  exit 1
}

# Optional seed
if ($Seed) {
  Write-Host ""
  Write-Host "[1/3] Seeding database..." -ForegroundColor Yellow
  Push-Location $Server
  & npm run seed
  Pop-Location
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Seed failed. Continuing anyway..." -ForegroundColor Yellow
  } else {
    Write-Host "Database seeded successfully." -ForegroundColor Green
  }
}

Write-Host ""
Write-Host "[2/3] Starting backend  → http://localhost:5000" -ForegroundColor Yellow
$serverJob = Start-Process powershell -ArgumentList "-NoProfile -Command `"
  `$env:Path = '$NodePath;$GitPath;' + `$env:Path;
  Set-Location '$Server';
  npm run dev
`"" -PassThru -WindowStyle Normal

Start-Sleep 8

Write-Host "[3/3] Starting frontend → http://localhost:5173" -ForegroundColor Yellow
$clientJob = Start-Process powershell -ArgumentList "-NoProfile -Command `"
  `$env:Path = '$NodePath;$GitPath;' + `$env:Path;
  Set-Location '$Client';
  npm run dev
`"" -PassThru -WindowStyle Normal

Start-Sleep 4

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "  Both servers are starting up!          " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Portfolio Site : http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Admin Dashboard: http://localhost:5173/admin/login" -ForegroundColor Cyan
Write-Host "  REST API       : http://localhost:5000/api" -ForegroundColor Cyan
Write-Host "  Health Check   : http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Admin Email    : admin@portfolio.dev" -ForegroundColor White
Write-Host "  Admin Password : Admin@12345" -ForegroundColor White
Write-Host ""
Write-Host "Close the server windows or run .\start.ps1 -Stop to stop." -ForegroundColor DarkGray
Write-Host ""
