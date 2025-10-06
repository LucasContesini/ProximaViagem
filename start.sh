#!/bin/bash

echo "🚀 Iniciando Próxima Viagem..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se .env existe no backend
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  Arquivo backend/.env não encontrado!${NC}"
    echo "Copiando .env.example para .env..."
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}⚠️  Configure suas chaves de API em backend/.env antes de continuar!${NC}"
    exit 1
fi

# Verificar se .env existe no frontend
if [ ! -f frontend/.env ]; then
    echo "Copiando frontend/.env.example para .env..."
    cp frontend/.env.example frontend/.env
fi

# Verificar se node_modules existe
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${BLUE}📦 Instalando dependências do frontend...${NC}"
    cd frontend
    npm install
    cd ..
    echo ""
fi

echo -e "${GREEN}✅ Iniciando servidores...${NC}"
echo ""

# Iniciar backend em background
echo -e "${BLUE}🔧 Backend rodando em http://localhost:8080${NC}"
cd backend
go run cmd/server/main.go &
BACKEND_PID=$!
cd ..

# Aguardar backend iniciar
sleep 2

# Iniciar frontend em background
echo -e "${BLUE}🎨 Frontend rodando em http://localhost:3000${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✨ Aplicação iniciada com sucesso!${NC}"
echo ""
echo "📱 Acesse: http://localhost:3000"
echo ""
echo "Para parar os servidores, pressione Ctrl+C"
echo ""

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando servidores..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Manter script rodando
wait

