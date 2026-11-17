@echo off
title Antigravity Math PWA
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting Antigravity with Node.js runner...
    node server.js
    goto :end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Node.js not found. Starting with Python runner...
    python server.py
    goto :end
)

echo [ERROR] Neither Node.js nor Python was found in your PATH.
echo Please install Node.js (https://nodejs.org) or Python (https://python.org).
pause

:end
