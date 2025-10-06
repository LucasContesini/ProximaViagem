# 🚀 Guia Rápido de Início

## ⚡ Início Rápido (3 passos)

### 1. Configure a chave de API

Edite o arquivo `backend/.env` e adicione sua chave de API do Groq:

```bash
# Obtenha gratuitamente em: https://console.groq.com
FREE_AI_KEY=sua_chave_aqui
```

### 2. Execute o script de inicialização

```bash
./start.sh
```

### 3. Acesse a aplicação

Abra seu navegador em: **http://localhost:3000**

---

## 🔑 Como Obter Chave de API Gratuita

### Groq AI (Recomendado - Gratuito)

1. Acesse: [console.groq.com](https://console.groq.com)
2. Crie uma conta (gratuita)
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Copie a chave gerada
6. Cole em `backend/.env` na variável `FREE_AI_KEY`

**Vantagens**:
- ✅ Totalmente gratuito
- ✅ Rápido (usa Llama 3.1)
- ✅ Sem necessidade de cartão de crédito

### OpenAI (Alternativa - Pago)

Se preferir usar OpenAI:

1. Acesse: [platform.openai.com](https://platform.openai.com)
2. Crie uma conta
3. Adicione créditos (mínimo $5)
4. Gere uma API Key
5. Edite `backend/.env`:
```bash
USE_FREE_AI=false
OPENAI_API_KEY=sua_chave_openai_aqui
```

---

## 📝 Comandos Úteis

### Iniciar Aplicação
```bash
./start.sh
```

### Iniciar Apenas Backend
```bash
cd backend
go run cmd/server/main.go
```

### Iniciar Apenas Frontend
```bash
cd frontend
npm run dev
```

### Build para Produção

**Backend**:
```bash
cd backend
go build -o proxima-viagem cmd/server/main.go
./proxima-viagem
```

**Frontend**:
```bash
cd frontend
npm run build
npm run preview
```

---

## 🐛 Problemas Comuns

### Erro: "API Key not configured"
**Solução**: Configure a chave de API em `backend/.env`

### Erro: "Port 8080 already in use"
**Solução**: Mate o processo usando a porta:
```bash
lsof -ti:8080 | xargs kill -9
```

### Erro: "Failed to fetch destination"
**Solução**: 
1. Verifique se o backend está rodando
2. Verifique se a chave de API está correta
3. Verifique sua conexão com a internet

### Frontend não carrega
**Solução**: Instale as dependências:
```bash
cd frontend
npm install
```

---

## 📊 Estrutura de Arquivos Importantes

```
proxima-viagem/
├── backend/
│   ├── .env                 ← Configure aqui suas chaves de API
│   └── cmd/server/main.go   ← Arquivo principal do backend
├── frontend/
│   ├── .env                 ← URL do backend
│   └── src/
│       └── App.tsx          ← Componente principal
├── start.sh                 ← Script de inicialização
└── README.md               ← Documentação completa
```

---

## 🎯 Próximos Passos

1. ✅ **Teste a aplicação localmente**
2. 📱 **Configure o Google Ads** (veja `GOOGLE_ADS_SETUP.md`)
3. 🚀 **Faça deploy** (Vercel, Netlify, Railway, etc.)
4. 📈 **Monitore o tráfego** com Google Analytics

---

## 💡 Dicas

- **Destino muda diariamente**: Volte amanhã para ver um novo destino
- **Cache inteligente**: Mesmo destino é mostrado durante todo o dia
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **Rápido**: Groq AI responde em segundos

---

## 📞 Precisa de Ajuda?

- 📖 Leia o `README.md` completo
- 🎯 Veja `GOOGLE_ADS_SETUP.md` para monetização
- 🐛 Abra uma issue no GitHub

---

**Divirta-se explorando o mundo! 🌍✈️**

