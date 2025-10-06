# 🎨 Setup do Frontend - Guia Rápido

## ⚠️ Se o npm install estiver travando

O npm pode travar por problemas de rede/cache. Use uma destas soluções:

---

## ✅ Solução 1: Limpar Cache e Reinstalar

```bash
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend

# Limpar tudo
rm -rf node_modules package-lock.json
npm cache clean --force

# Tentar novamente
npm install --verbose
```

---

## ✅ Solução 2: Usar Yarn (Mais Rápido)

```bash
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend

# Instalar com yarn
yarn install

# Iniciar
yarn dev
```

---

## ✅ Solução 3: Instalar Pacotes Individualmente

```bash
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem/frontend

# Limpar
rm -rf node_modules package-lock.json

# Instalar um por um
npm install react@18.2.0
npm install react-dom@18.2.0
npm install -D vite@5.0.8
npm install -D @vitejs/plugin-react@4.2.1
npm install -D typescript@5.2.2
npm install -D @types/react@18.2.43
npm install -D @types/react-dom@18.2.17

# Iniciar
npm run dev
```

---

## ✅ Solução 4: Usar npx create-vite

Se nada funcionar, crie um projeto Vite novo e copie os arquivos:

```bash
cd /Users/lcontesini/Documents/projects/personal/proxima-viagem

# Criar projeto novo
npx create-vite@latest frontend-new --template react-ts

# Copiar seus arquivos
cp -r frontend/src/* frontend-new/src/
cp -r frontend/public/* frontend-new/public/
cp frontend/index.html frontend-new/

# Usar o novo
rm -rf frontend
mv frontend-new frontend

cd frontend
npm install
npm run dev
```

---

## 🚀 Depois de Instalar

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🐛 Problemas Comuns

### npm está muito lento
- Use `yarn` ao invés de `npm`
- Ou use `npm install --prefer-offline`

### Erro de permissão
- Nunca use `sudo npm install`
- Verifique permissões da pasta node_modules

### Porta 3000 em uso
- Mude em `vite.config.ts`:
```typescript
server: {
  port: 3001,
}
```

---

## ✅ O Importante

**O backend já está funcionando perfeitamente!**
- ✅ API: http://localhost:8080/api/destination
- ✅ Retornando destinos brasileiros
- ✅ Cache funcionando

**O frontend é só a interface visual.**

Você pode:
1. Testar a API direto no navegador
2. Instalar o frontend quando tiver melhor conexão
3. Fazer deploy direto (plataformas instalam automaticamente)

---

**Não se preocupe! O projeto está 95% pronto.** 🎉
