#!/bin/bash

echo "🚀 Iniciando Frontend..."

cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend

if [ ! -d "node_modules" ]; then
    echo "❌ Dependências não instaladas!"
    echo "Execute primeiro: ./setup-frontend.sh"
    exit 1
fi

npm run dev
