# 📊 Como Configurar o Google Analytics

## Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Clique em "Começar a medir" ou "Criar conta"
3. Preencha os dados:
   - **Nome da conta:** Próxima Viagem
   - **Nome da propriedade:** Próxima Viagem Website
   - **Fuso horário:** Brasil (GMT-3)
   - **Moeda:** Real brasileiro (BRL)

## Passo 2: Configurar Fluxo de Dados

1. Escolha **Web**
2. Preencha:
   - **URL do site:** `https://frontend-nu-tawny-84.vercel.app`
   - **Nome do fluxo:** Próxima Viagem Production
3. Clique em "Criar fluxo"

## Passo 3: Copiar o ID de Medição

Você receberá um ID no formato: **G-XXXXXXXXXX**

Exemplo: `G-ABC123DEF4`

## Passo 4: Adicionar ao Site

Substitua no arquivo `frontend/index.html`:

**ANTES:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**DEPOIS (com seu ID real):**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123DEF4');
</script>
```

## Passo 5: Deploy

Depois de adicionar o ID:

```bash
cd frontend
npm run build
vercel --prod
```

## Passo 6: Verificar se Está Funcionando

1. Acesse seu site
2. Abra as ferramentas de desenvolvedor (F12)
3. Vá na aba "Network"
4. Procure por requisições para `google-analytics.com` ou `analytics.js`
5. No Google Analytics, vá em "Tempo real" → "Visão geral"
6. Você deve ver sua visita aparecendo!

---

## 📊 Métricas Importantes para Monitorar

### 1. Visão Geral
- Total de usuários
- Sessões
- Taxa de rejeição
- Duração média da sessão

### 2. Aquisição
- De onde vêm seus visitantes:
  - Busca orgânica (Google)
  - Redes sociais
  - Direto
  - Referência

### 3. Comportamento
- Páginas mais visitadas
- Tempo na página
- Taxa de saída

### 4. Eventos Personalizados (Futuro)
Você pode adicionar eventos como:
- Clique em compartilhar
- Visualização de destino
- Instalação do PWA

---

## 🎯 Eventos Personalizados (Opcional)

Para rastrear ações específicas, adicione no código:

```javascript
// Exemplo: Rastrear compartilhamento
gtag('event', 'share', {
  'event_category': 'Social',
  'event_label': 'WhatsApp',
  'destination': destination.name
});
```

---

## 🔒 Privacidade e LGPD

**IMPORTANTE:** Você deve:

1. Adicionar aviso de cookies no site
2. Atualizar a Política de Privacidade mencionando o Google Analytics
3. Permitir que usuários optem por não serem rastreados

Exemplo de aviso:
```
"Este site usa cookies e Google Analytics para melhorar sua experiência. 
Ao continuar navegando, você concorda com nossa Política de Privacidade."
```

---

## 📱 Google Analytics 4 (GA4) - Recursos

O GA4 oferece:
- ✅ Rastreamento cross-platform (web + app)
- ✅ Eventos automáticos
- ✅ Análise preditiva
- ✅ Integração com Google Ads
- ✅ Relatórios personalizados

---

## 🚀 Próximos Passos

Depois de configurar:

1. **Configure metas/conversões:**
   - Tempo no site > 2 minutos
   - Visualizou 3+ páginas
   - Clicou em compartilhar

2. **Crie relatórios personalizados:**
   - Destinos mais populares
   - Países mais pesquisados
   - Horários de pico

3. **Integre com Google Search Console:**
   - Veja quais termos de busca trazem visitantes
   - Otimize conteúdo baseado em dados reais

---

## 💡 Dica Pro

Use o **Google Tag Manager** para gerenciar tags sem modificar código:
- https://tagmanager.google.com/

Facilita adicionar/remover ferramentas de analytics, ads, etc.

---

**Quando tiver seu ID do Google Analytics, me avise que eu adiciono no código!** 📊
