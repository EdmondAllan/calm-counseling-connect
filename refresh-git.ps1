# Refresh PATH to include Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "✅ Git PATH refreshed!" -ForegroundColor Green
Write-Host ""
git --version
Write-Host ""
Write-Host "Git is now available in this terminal session." -ForegroundColor Cyan
Write-Host "You can now use git commands normally." -ForegroundColor Cyan
