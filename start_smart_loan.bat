@echo off
echo ==============================================
echo   Starting Smart Loan Management System
echo ==============================================

echo [1/3] Cleaning up any old node processes...
powershell -Command "Stop-Process -Name node -Force -ErrorAction SilentlyContinue"

echo [2/3] Starting Backend Server (Express + MongoDB)...
start cmd /k "cd backend && npx nodemon server.js"

echo [3/3] Starting Frontend Server (Vite + React)...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in new windows!
echo Once they are ready, open http://localhost:5174/ in your browser.
pause
