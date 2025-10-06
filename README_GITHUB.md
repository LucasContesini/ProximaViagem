# 🚀 Como Subir para o GitHub

## 📋 Passo a Passo

### 1. Inicializar Git (se ainda não fez)

```bash
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: initial commit - Proxima Viagem project"
```

### 2. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `proxima-viagem`
3. Descrição: `🌍 Aplicação web que sugere destinos turísticos brasileiros diariamente usando IA`
4. **Público** ou **Privado** (sua escolha)
5. **NÃO** marque "Initialize with README" (já temos)
6. Clique em "Create repository"

### 3. Conectar e Enviar

```bash
# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/proxima-viagem.git

# Renomear branch para main (se necessário)
git branch -M main

# Enviar para GitHub
git push -u origin main
```

---

## 🔒 Segurança - IMPORTANTE!

### ⚠️ ANTES de fazer push, verifique:

```bash
# Verificar se .env está no .gitignore
cat .gitignore | grep .env

# Verificar se .env NÃO será commitado
git status | grep .env
```

**Se aparecer `.env` no git status, REMOVA:**
```bash
git rm --cached backend/.env
git rm --cached frontend/.env
```

### 🔑 Suas chaves de API:

**NUNCA commite:**
- ❌ `backend/.env` (contém chave do Groq)
- ❌ Chaves de API
- ❌ Senhas

**SEMPRE commite:**
- ✅ `.env.example` (sem valores reais)
- ✅ Código fonte
- ✅ Documentação

---

## 📝 Estrutura do Repositório

```
proxima-viagem/
├── .gitignore              ✅ Já criado
├── README.md               ✅ Documentação principal
├── backend/
│   ├── .env.example       ✅ Template
│   ├── .env               ❌ NÃO commitar
│   └── ...
├── frontend/
│   ├── .env.example       ✅ Template
│   ├── .env               ❌ NÃO commitar
│   └── ...
└── docs/                   ✅ Documentação extra
```

---

## 🎯 Alternativa: 2 Repositórios Separados

Se preferir separar:

### Backend:
```bash
cd backend
git init
git remote add origin https://github.com/SEU_USUARIO/proxima-viagem-backend.git
git add .
git commit -m "feat: initial commit - backend"
git push -u origin main
```

### Frontend:
```bash
cd frontend
git init
git remote add origin https://github.com/SEU_USUARIO/proxima-viagem-frontend.git
git add .
git commit -m "feat: initial commit - frontend"
git push -u origin main
```

### ⚠️ Desvantagens:
- Mais difícil de gerenciar
- Documentação duplicada
- Deploy mais complexo

---

## 🌟 README.md Sugerido para GitHub

Vou criar um README.md otimizado para GitHub:

```markdown
# ✈️ Próxima Viagem

> Descubra um destino turístico brasileiro incrível todos os dias!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://golang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Sobre

Próxima Viagem é uma aplicação web que usa inteligência artificial para sugerir um destino turístico brasileiro diferente todos os dias, completo com:

- 🌍 Descrição detalhada do destino
- 🎯 Principais atrações turísticas
- 💡 Dicas práticas de viagem
- 🌤️ Melhor época para visitar
- 📸 Imagens de alta qualidade

## 🚀 Tecnologias

**Backend:**
- Go 1.21+
- Groq AI (Llama 3.3 70B)
- Cache em memória

**Frontend:**
- React 18
- TypeScript
- Vite
- CSS Moderno

## 📦 Como Executar

Veja [QUICK_START.md](QUICK_START.md) para instruções detalhadas.

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.
```

---

## ✅ Checklist Final

Antes de fazer push:

- [ ] `.gitignore` configurado
- [ ] `.env` NÃO está sendo commitado
- [ ] `.env.example` está atualizado
- [ ] README.md está completo
- [ ] Código está funcionando
- [ ] Documentação está clara

---

## 🎉 Pronto!

Depois do push, seu repositório estará em:
```
https://github.com/SEU_USUARIO/proxima-viagem
```

**Recomendação: Use 1 repositório (monorepo) - é mais simples!** 📦
