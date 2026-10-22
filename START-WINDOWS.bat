@echo off
cd /d "%~dp0"
echo CRA Readiness Studio at http://127.0.0.1:8765
py -3 -m http.server 8765 --bind 127.0.0.1
if errorlevel 1 python -m http.server 8765 --bind 127.0.0.1
