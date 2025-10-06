# ✈️ Próxima Viagem

> Descubra um destino turístico brasileiro incrível todos os dias!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://golang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)

Uma aplicação web moderna que sugere um destino turístico brasileiro diferente todos os dias, usando inteligência artificial para gerar descrições, dicas e atrações turísticas.

## 🌟 Funcionalidades

- **Destino Diário**: Receba uma nova sugestão de viagem todos os dias
- **Cache Inteligente**: A mesma sugestão é mantida durante todo o dia
- **IA Gratuita**: Usa Groq AI (gratuita) ou OpenAI
- **Design Moderno**: Interface responsiva com tema de viagem
- **Google Ads**: Preparado para monetização com Google AdSense e Analytics

## 🏗️ Arquitetura

### Backend (Go)
- **Framework**: Gorilla Mux para roteamento
- **Cache**: Sistema de cache em memória com renovação diária
- **IA**: Integração com Groq AI (gratuita) ou OpenAI
- **CORS**: Configurado para aceitar requisições do frontend

### Frontend (React + TypeScript)
- **Framework**: React 18 com TypeScript
- **Build**: Vite para desenvolvimento rápido
- **Estilo**: CSS moderno com animações
- **Ads**: Google AdSense e Google Analytics integrados

## 🚀 Como Executar

### Pré-requisitos
- Go 1.21+
- Node.js 18+
- Chave de API do Groq (gratuita) ou OpenAI

### Backend

1. Entre no diretório do backend:
```bash
cd backend
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` e adicione sua chave de API:
```env
PORT=8080
USE_FREE_AI=true
FREE_AI_URL=https://api.groq.com/openai/v1/chat/completions
FREE_AI_KEY=sua_chave_groq_aqui
```

4. Instale as dependências:
```bash
go mod download
```

5. Execute o servidor:
```bash
go run cmd/server/main.go
```

O backend estará rodando em `http://localhost:8080`

### Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🔑 Obtendo Chave de API Gratuita (Groq)

1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta gratuita
3. Vá em "API Keys"
4. Crie uma nova chave
5. Copie e cole no arquivo `.env` do backend

## 📱 Google Ads - Configuração

### 1. Google AdSense

1. **Criar conta no AdSense**:
   - Acesse [google.com/adsense](https://www.google.com/adsense)
   - Crie uma conta e aguarde aprovação

2. **Obter código do cliente**:
   - No painel do AdSense, copie seu código de cliente (ca-pub-XXXXXXXXXXXXXXXX)

3. **Configurar no projeto**:
   - Abra `frontend/index.html`
   - Substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu código
   - Abra `frontend/src/components/AdBanner.tsx`
   - Substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu código

4. **Criar unidades de anúncio**:
   - No AdSense, crie unidades de anúncio display
   - Copie os códigos de slot (data-ad-slot)
   - Substitua em `AdBanner.tsx` os valores "1234567890" e "0987654321"

### 2. Google Analytics / Google Ads

1. **Criar propriedade no Google Analytics**:
   - Acesse [analytics.google.com](https://analytics.google.com)
   - Crie uma nova propriedade
   - Copie o ID de medição (G-XXXXXXXXXX)

2. **Configurar no projeto**:
   - Abra `frontend/index.html`
   - Substitua `G-XXXXXXXXXX` pelo seu ID de medição

3. **Para Google Ads** (opcional):
   - Crie uma campanha no Google Ads
   - Copie o ID de conversão (AW-XXXXXXXXXX)
   - Adicione em `frontend/index.html`:
   ```javascript
   gtag('config', 'AW-XXXXXXXXXX');
   ```

### 3. Políticas do Google AdSense

Para ser aprovado no AdSense, certifique-se de:
- ✅ Ter conteúdo original e de qualidade
- ✅ Ter páginas de Política de Privacidade e Termos de Uso
- ✅ Ter navegação clara e funcional
- ✅ Ter tráfego orgânico (não comprado)
- ✅ Seguir as políticas do Google

## 📊 Estrutura do Projeto

```
proxima-viagem/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── ai/
│   │   │   └── client.go
│   │   ├── api/
│   │   │   └── handler.go
│   │   ├── cache/
│   │   │   └── cache.go
│   │   └── models/
│   │       └── destination.go
│   ├── .env
│   ├── .env.example
│   └── go.mod
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdBanner.tsx
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── Error.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Loading.tsx
│   │   ├── hooks/
│   │   │   └── useDestination.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   ├── AdBanner.css
│   │   │   ├── App.css
│   │   │   ├── DestinationCard.css
│   │   │   ├── Error.css
│   │   │   ├── Header.css
│   │   │   ├── Loading.css
│   │   │   └── index.css
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## 🎨 Características do Design

- **Gradiente Moderno**: Cores vibrantes de roxo e azul
- **Animações Suaves**: Transições e efeitos hover
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **Tema de Viagem**: Ícones e elementos visuais relacionados a viagens
- **UX Otimizada**: Loading states e tratamento de erros

## 🔄 Como Funciona o Cache

1. Primeira requisição do dia: Backend chama a IA e armazena o resultado
2. Requisições subsequentes: Backend retorna o resultado em cache
3. Novo dia: Cache é invalidado automaticamente e uma nova chamada é feita

## 🌐 Deploy

### Backend
- Pode ser deployado em: Heroku, Railway, Render, Google Cloud Run
- Certifique-se de configurar as variáveis de ambiente

### Frontend
- Pode ser deployado em: Vercel, Netlify, GitHub Pages
- Configure a variável `VITE_API_URL` para apontar para seu backend em produção

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para amantes de viagens**

