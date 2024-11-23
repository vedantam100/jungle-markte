@echo off
Set-ExecutionPolicy Bypass -Scope Process
json-server --watch ./src/app/data.json --port 8080
