#!/bin/bash
echo "Parando backend antigo..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
sleep 2
echo "Iniciando backend atualizado..."
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/backend
go run cmd/server/main.go
