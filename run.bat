start cmd /c "node server/server.js"
TIMEOUT /T 2 /NOBREAK  >nul
start http://127.0.0.1:3000
