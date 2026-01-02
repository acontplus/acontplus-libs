#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Bump version for a package and update all dependencies in the workspace.

.DESCRIPTION
    This script prompts the user to select a package from the workspace,
    bumps its version using npm version (patch/minor/major), and then updates all
    dependencies across other packages in the workspace.

.PARAMETER PackageName
    The name of the package to bump. If not provided, a selection menu is shown.

.PARAMETER VersionType
    The type of version bump: patch, minor, or major. Default is 'patch'.

.EXAMPLE
    .\scripts\patch-version.ps1

.EXAMPLE
    .\scripts\patch-version.ps1 -VersionType minor

.EXAMPLE
    .\scripts\patch-version.ps1 -PackageName core -VersionType major
#>

param(
    [Parameter()]
    [string]$PackageName,

    [Parameter()]
    [ValidateSet('patch', 'minor', 'major')]
    [string]$VersionType = 'patch'
)

$ErrorActionPreference = "Stop"

# Get workspace root
$workspaceRoot = Split-Path -Parent $PSScriptRoot
Set-Location $workspaceRoot

# Function to get all packages
function Get-WorkspacePackages {
    $packagesPath = Join-Path $workspaceRoot "packages"
    $packages = @()

    if (Test-Path $packagesPath) {
        Get-ChildItem -Path $packagesPath -Directory | ForEach-Object {
            $packageJsonPath = Join-Path $_.FullName "package.json"
            if (Test-Path $packageJsonPath) {
                $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
                $packages += [PSCustomObject]@{
                    Name = $packageJson.name
                    Path = $_.FullName
                    Version = $packageJson.version
                    FolderName = $_.Name
                }
            }
        }
    }

    return $packages
}

# Function to update package.json dependencies
function Update-PackageDependencies {
    param(
        [string]$PackageName,
        [string]$NewVersion
    )

    $packagesPath = Join-Path $workspaceRoot "packages"
    $updatedCount = 0

    # Update in all package.json files
    Get-ChildItem -Path $packagesPath -Recurse -Filter "package.json" | ForEach-Object {
        $packageJsonPath = $_.FullName
        $content = Get-Content $packageJsonPath -Raw
        $packageJson = $content | ConvertFrom-Json

        $needsUpdate = $false

        # Check dependencies
        if ($packageJson.dependencies -and $packageJson.dependencies.$PackageName) {
            Write-Host "  Updating dependencies in $($_.Directory.Name)..." -ForegroundColor Yellow
            $packageJson.dependencies.$PackageName = "^$NewVersion"
            $needsUpdate = $true
        }

        # Check peerDependencies
        if ($packageJson.peerDependencies -and $packageJson.peerDependencies.$PackageName) {
            Write-Host "  Updating peerDependencies in $($_.Directory.Name)..." -ForegroundColor Yellow
            $packageJson.peerDependencies.$PackageName = "^$NewVersion"
            $needsUpdate = $true
        }

        # Check devDependencies
        if ($packageJson.devDependencies -and $packageJson.devDependencies.$PackageName) {
            Write-Host "  Updating devDependencies in $($_.Directory.Name)..." -ForegroundColor Yellow
            $packageJson.devDependencies.$PackageName = "^$NewVersion"
            $needsUpdate = $true
        }

        # Save if updated
        if ($needsUpdate) {
            $newContent = ($packageJson | ConvertTo-Json -Depth 100)
            # Fix JSON formatting to match original style
            $newContent = $newContent -replace '\\u0026', '&' -replace '\\u003c', '<' -replace '\\u003e', '>'
            Set-Content -Path $packageJsonPath -Value $newContent -NoNewline
            $updatedCount++
        }
    }

    return $updatedCount
}

# Main script
Write-Host "`n=== Package Version Bumper ($VersionType) ===" -ForegroundColor Cyan
Write-Host ""

# Get all packages
$packages = Get-WorkspacePackages

if ($packages.Count -eq 0) {
    Write-Host "No packages found in workspace!" -ForegroundColor Red
    exit 1
}

# If package name not provided, prompt user
if (-not $PackageName) {
    Write-Host "Available packages:" -ForegroundColor Green
    Write-Host ""

    for ($i = 0; $i -lt $packages.Count; $i++) {
        Write-Host "  [$($i + 1)] $($packages[$i].Name) (v$($packages[$i].Version))" -ForegroundColor White
    }

    Write-Host ""
    $selection = Read-Host "Select a package number (1-$($packages.Count))"

    $selectedIndex = [int]$selection - 1

    if ($selectedIndex -lt 0 -or $selectedIndex -ge $packages.Count) {
        Write-Host "Invalid selection!" -ForegroundColor Red
        exit 1
    }

    $selectedPackage = $packages[$selectedIndex]
} else {
    # Find package by name
    $selectedPackage = $packages | Where-Object { $_.Name -eq $PackageName -or $_.FolderName -eq $PackageName }

    if (-not $selectedPackage) {
        Write-Host "Package '$PackageName' not found!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Selected package: $($selectedPackage.Name) (v$($selectedPackage.Version))" -ForegroundColor Cyan
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Do you want to bump this package version ($VersionType)? (y/N)"
if ($confirm -notmatch '^[Yy]') {
    Write-Host "Cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Step 1: Bumping version ($VersionType)..." -ForegroundColor Green

# Run pnpm command to bump version
$filterArg = $selectedPackage.Name
try {
    Write-Host "Running: pnpm --filter $filterArg exec npm version $VersionType" -ForegroundColor Gray
    $output = pnpm --filter $filterArg exec npm version $VersionType 2>&1
    Write-Host $output

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error bumping version!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error executing pnpm command: $_" -ForegroundColor Red
    exit 1
}

# Get new version from package.json
$packageJsonPath = Join-Path $selectedPackage.Path "package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
$newVersion = $packageJson.version

Write-Host ""
Write-Host "New version: $newVersion" -ForegroundColor Green
Write-Host ""

# Update dependencies in other packages
Write-Host "Step 2: Updating dependencies in other packages..." -ForegroundColor Green
$updatedCount = Update-PackageDependencies -PackageName $selectedPackage.Name -NewVersion $newVersion

Write-Host ""
if ($updatedCount -gt 0) {
    Write-Host "Updated $updatedCount package(s) with new dependency version." -ForegroundColor Green
    Write-Host ""
    Write-Host "Step 3: Installing dependencies..." -ForegroundColor Green
    pnpm install
} else {
    Write-Host "No packages needed dependency updates." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "  Package: $($selectedPackage.Name)" -ForegroundColor White
Write-Host "  Old Version: $($selectedPackage.Version)" -ForegroundColor White
Write-Host "  New Version: $newVersion" -ForegroundColor Green
Write-Host "  Packages Updated: $updatedCount" -ForegroundColor White
Write-Host ""
