@echo off
title JMR React - Install Dependencies Only

echo.
echo ========================================
echo   JMR React - Install Dependencies
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

echo Installing dependencies... this may take 1-2 minutes
echo.
call npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully!
echo.
echo Next steps:
echo 1. Double-click "run.bat" to start the development server
echo    OR type: npm run dev
echo.
pause
