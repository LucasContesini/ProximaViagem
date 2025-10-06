#!/bin/bash

echo "🧹 Limpando instalações anteriores..."
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend
rm -rf node_modules package-lock.json

echo "📦 Instalando pacotes essenciais..."

# Instalar React e ReactDOM
npm install react@18.2.0 react-dom@18.2.0

# Instalar Vite e plugin React
npm install -D vite@5.0.8 @vitejs/plugin-react@4.2.1

# Instalar TypeScript
npm install -D typescript@5.2.2 @types/react@18.2.43 @types/react-dom@18.2.17

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "Para iniciar o frontend:"
echo "  cd frontend"
echo "  npm run dev"
