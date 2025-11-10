# Add Git to System PATH Permanently
# Run this script once to fix Git PATH issue

Write-Host "🔧 Adding Git to System PATH..." -ForegroundColor Cyan

# Get current User PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)

# Git installation paths to check
$gitPaths = @(
    "C:\Program Files\Git\cmd",
    "C:\Program Files\Git\bin"
)

$pathsAdded = @()

foreach ($gitPath in $gitPaths) {
    if (Test-Path $gitPath) {
        # Check if path is already in PATH
        if ($currentPath -notlike "*$gitPath*") {
            Write-Host "Adding: $gitPath" -ForegroundColor Yellow
            $currentPath = $currentPath + ";" + $gitPath
            $pathsAdded += $gitPath
        } else {
            Write-Host "Already exists: $gitPath" -ForegroundColor Green
        }
    }
}

if ($pathsAdded.Count -gt 0) {
    # Set the new PATH
    [Environment]::SetEnvironmentVariable("Path", $currentPath, [EnvironmentVariableTarget]::User)
    Write-Host ""
    Write-Host "✅ Git has been added to your PATH!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: You need to:" -ForegroundColor Yellow
    Write-Host "   1. Close Kiro IDE completely" -ForegroundColor Yellow
    Write-Host "   2. Reopen Kiro IDE" -ForegroundColor Yellow
    Write-Host "   3. Then 'git' command will work automatically!" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "✅ Git is already in your PATH!" -ForegroundColor Green
    Write-Host ""
    Write-Host "If 'git' still doesn't work:" -ForegroundColor Yellow
    Write-Host "   1. Close Kiro IDE completely" -ForegroundColor Yellow
    Write-Host "   2. Reopen Kiro IDE" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Testing Git..." -ForegroundColor Cyan

# Refresh current session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

try {
    $gitVersion = git --version
    Write-Host "✅ $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Git not found in current session. Please restart Kiro IDE." -ForegroundColor Yellow
}
