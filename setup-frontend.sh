#!/bin/bash

echo "🎨 Configurando Frontend..."

cd /Users/lcontesini/Documents/projects/personal/proxima-viagem

# Restaurar frontend se necessário
if [ -d "frontend-backup" ] && [ ! -d "frontend" ]; then
    echo "📁 Restaurando frontend..."
    mv frontend-backup frontend
fi

cd frontend

# Criar .env se não existir
if [ ! -f ".env" ]; then
    echo "⚙️  Criando arquivo .env..."
    echo "VITE_API_URL=http://localhost:8080" > .env
fi

echo "📦 Instalando dependências (isso pode demorar alguns minutos)..."
npm install --legacy-peer-deps

echo ""
echo "✅ Frontend configurado com sucesso!"
echo ""
echo "Para iniciar o frontend, execute:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Ou execute: ./start-frontend.sh"
