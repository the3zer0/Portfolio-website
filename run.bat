@echo off
title JMR React Setup & Run

echo.
echo ========================================
echo   JMR React - Auto Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Navigate to react-version folder
cd /d "%~dp0"

echo Installing dependencies...
echo.
call npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully
echo.
echo Starting development server...
echo.
echo The website will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
