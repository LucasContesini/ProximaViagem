#!/bin/bash

set -e

echo "🔧 Corrigindo e iniciando frontend..."
echo ""

cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend

# Matar processos npm travados
echo "🧹 Limpando processos npm..."
pkill -9 npm 2>/dev/null || true
pkill -9 node 2>/dev/null || true

# Limpar cache e node_modules
echo "🗑️  Removendo node_modules e cache..."
rm -rf node_modules package-lock.json
npm cache clean --force 2>/dev/null || true

# Criar .env se não existir
if [ ! -f ".env" ]; then
    echo "⚙️  Criando .env..."
    echo "VITE_API_URL=http://localhost:8080" > .env
fi

echo ""
echo "📦 Instalando dependências (pode demorar 2-3 minutos)..."
echo "   Aguarde, não cancele!"
echo ""

# Tentar com npm primeiro
if npm install --no-audit --no-fund --loglevel=error; then
    echo ""
    echo "✅ Instalação concluída com npm!"
    echo ""
    echo "🚀 Iniciando frontend..."
    npm run dev
else
    echo ""
    echo "⚠️  npm falhou, tentando com yarn..."
    if command -v yarn &> /dev/null; then
        yarn install
        echo ""
        echo "✅ Instalação concluída com yarn!"
        echo ""
        echo "🚀 Iniciando frontend..."
        yarn dev
    else
        echo ""
        echo "❌ Erro na instalação!"
        echo ""
        echo "Tente manualmente:"
        echo "  cd frontend"
        echo "  npm install"
        echo "  npm run dev"
        exit 1
    fi
fi
