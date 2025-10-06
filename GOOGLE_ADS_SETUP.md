# 📱 Guia Completo de Configuração do Google Ads

Este guia detalha todos os passos necessários para configurar e monetizar o site Próxima Viagem com Google AdSense e Google Ads.

## 📋 Índice

1. [Google AdSense](#google-adsense)
2. [Google Analytics](#google-analytics)
3. [Google Ads](#google-ads)
4. [Políticas e Aprovação](#políticas-e-aprovação)
5. [Otimização de Receita](#otimização-de-receita)

---

## 🎯 Google AdSense

### Passo 1: Criar Conta no AdSense

1. Acesse [google.com/adsense](https://www.google.com/adsense)
2. Clique em "Começar"
3. Faça login com sua conta Google
4. Preencha as informações:
   - URL do site
   - País/região
   - Aceite os termos e condições

### Passo 2: Adicionar Código do AdSense ao Site

1. No painel do AdSense, vá em "Anúncios" → "Visão geral"
2. Copie o código do AdSense (parecido com):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

3. **Substitua no arquivo `frontend/index.html`**:
```html
<!-- Linha 10 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU_CODIGO_AQUI"
     crossorigin="anonymous"></script>
```

### Passo 3: Criar Unidades de Anúncio

1. No AdSense, vá em "Anúncios" → "Por unidade de anúncio"
2. Clique em "Criar unidade de anúncio"
3. Escolha "Anúncio display"
4. Configure:
   - Nome: "Banner Topo"
   - Tipo: Responsivo
   - Tamanho: Automático
5. Clique em "Criar"
6. Copie o código `data-ad-slot` (ex: 1234567890)

7. Repita para criar segunda unidade:
   - Nome: "Banner Rodapé"

### Passo 4: Adicionar Slots ao Código

**Edite `frontend/src/components/AdBanner.tsx`**:

```typescript
// Linha 23
data-ad-client="ca-pub-SEU_CODIGO_AQUI"
```

**Edite `frontend/src/App.tsx`**:

```typescript
// Linha 16 - Banner Topo
<AdBanner slot="SEU_SLOT_1" format="horizontal" />

// Linha 25 - Banner Rodapé
<AdBanner slot="SEU_SLOT_2" format="horizontal" />
```

### Passo 5: Verificação e Aprovação

1. Faça deploy do site
2. No AdSense, clique em "Sites" → "Adicionar site"
3. Insira a URL do seu site
4. Aguarde a verificação (pode levar até 24h)
5. Aguarde a aprovação (pode levar de 1 a 2 semanas)

---

## 📊 Google Analytics

### Passo 1: Criar Propriedade

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Clique em "Começar a medir"
3. Crie uma conta:
   - Nome da conta: "Proxima Viagem"
   - Configurações de compartilhamento: deixe padrão
4. Crie uma propriedade:
   - Nome: "Proxima Viagem Website"
   - Fuso horário: Seu fuso
   - Moeda: BRL
5. Configure os detalhes da empresa
6. Aceite os termos

### Passo 2: Configurar Coleta de Dados

1. Escolha "Web"
2. Configure o fluxo de dados:
   - URL do site: seu domínio
   - Nome do fluxo: "Proxima Viagem Web"
3. Copie o ID de medição (formato: G-XXXXXXXXXX)

### Passo 3: Adicionar ao Site

**Edite `frontend/index.html`**:

```html
<!-- Linha 14 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SEU_ID_AQUI');
</script>
```

### Passo 4: Configurar Eventos Personalizados (Opcional)

Adicione rastreamento de eventos importantes:

```typescript
// Em frontend/src/hooks/useDestination.ts
useEffect(() => {
  if (destination) {
    // @ts-ignore
    window.gtag?.('event', 'destination_loaded', {
      destination_name: destination.name,
      destination_country: destination.country,
    });
  }
}, [destination]);
```

---

## 💰 Google Ads

### Passo 1: Criar Conta no Google Ads

1. Acesse [ads.google.com](https://ads.google.com)
2. Clique em "Começar agora"
3. Escolha seu objetivo (ex: "Tráfego do site")
4. Configure sua primeira campanha (pode pausar depois)

### Passo 2: Vincular com Analytics

1. No Google Ads, vá em "Ferramentas e configurações"
2. Clique em "Vinculações"
3. Selecione "Google Analytics (UA) e Google Analytics 4"
4. Vincule sua propriedade do Analytics

### Passo 3: Configurar Conversões

1. No Google Ads, vá em "Ferramentas" → "Conversões"
2. Clique em "Nova conversão"
3. Escolha "Site"
4. Configure:
   - Categoria: Visualização de página
   - Nome: "Visualização de Destino"
5. Copie o ID de conversão (AW-XXXXXXXXXX)

### Passo 4: Adicionar Tag de Conversão

**Edite `frontend/index.html`**:

```html
<!-- Adicione após o Google Analytics -->
<script>
  gtag('config', 'AW-SEU_ID_CONVERSAO');
</script>
```

**Adicione evento de conversão em `frontend/src/hooks/useDestination.ts`**:

```typescript
useEffect(() => {
  if (destination) {
    // @ts-ignore
    window.gtag?.('event', 'conversion', {
      send_to: 'AW-XXXXXXXXXX/SEU_LABEL',
      value: 1.0,
      currency: 'BRL'
    });
  }
}, [destination]);
```

---

## ✅ Políticas e Aprovação

### Requisitos do Google AdSense

1. **Conteúdo Original**:
   - ✅ O site gera conteúdo único diariamente via IA
   - ✅ Não é conteúdo copiado

2. **Navegação Clara**:
   - ✅ Site tem estrutura simples e clara
   - ✅ Design responsivo

3. **Páginas Obrigatórias**:
   Crie estas páginas antes de aplicar:
   
   - **Política de Privacidade**
   - **Termos de Uso**
   - **Sobre**
   - **Contato**

4. **Idade do Domínio**:
   - Ideal: 6+ meses
   - Mínimo: alguns sites são aprovados com menos

5. **Tráfego**:
   - Não há mínimo oficial
   - Recomendado: 100+ visitantes/dia

### Checklist Pré-Aprovação

- [ ] Site está no ar com domínio próprio
- [ ] Conteúdo está funcionando (destinos sendo gerados)
- [ ] Página de Política de Privacidade criada
- [ ] Página de Termos de Uso criada
- [ ] Página Sobre criada
- [ ] Página de Contato criada
- [ ] Site é responsivo (funciona em mobile)
- [ ] Não há erros no console do navegador
- [ ] Código do AdSense adicionado ao site

### O Que Evitar

❌ **Não faça**:
- Clicar nos próprios anúncios
- Pedir para outros clicarem
- Usar bots ou tráfego falso
- Conteúdo adulto, violento ou ilegal
- Muitos anúncios (máximo 3 por página)
- Anúncios enganosos

---

## 📈 Otimização de Receita

### Posicionamento de Anúncios

**Locais de Melhor Performance**:
1. ✅ Acima da dobra (topo da página)
2. ✅ Entre conteúdo (meio do card)
3. ✅ Final do conteúdo (antes do footer)

**Implementado no Projeto**:
- Banner horizontal no topo (após header)
- Banner horizontal no rodapé (após card)

### Tipos de Anúncio Recomendados

1. **Display Responsivo**: Melhor para mobile
2. **In-feed**: Para listas de conteúdo
3. **In-article**: Dentro do texto

### Otimizações Adicionais

1. **Auto Ads** (Opcional):
```html
<!-- Adicione em index.html após o script do AdSense -->
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-XXXXXXXXXXXXXXXX",
    enable_page_level_ads: true
  });
</script>
```

2. **Lazy Loading de Anúncios**:
Já implementado no componente `AdBanner.tsx`

3. **A/B Testing**:
- Teste diferentes posições
- Teste diferentes tamanhos
- Monitore no AdSense qual performa melhor

### Métricas Importantes

Acompanhe no painel do AdSense:
- **RPM** (Revenue per Mille): Receita por 1000 impressões
- **CTR** (Click Through Rate): Taxa de cliques
- **CPC** (Cost Per Click): Custo por clique
- **Impressões**: Quantas vezes anúncios foram exibidos

---

## 🎯 Próximos Passos

1. **Imediato**:
   - [ ] Criar conta no AdSense
   - [ ] Adicionar código ao site
   - [ ] Criar páginas obrigatórias
   - [ ] Fazer deploy

2. **Curto Prazo** (1-2 semanas):
   - [ ] Aguardar aprovação do AdSense
   - [ ] Configurar Google Analytics
   - [ ] Monitorar tráfego

3. **Médio Prazo** (1-3 meses):
   - [ ] Otimizar posicionamento de anúncios
   - [ ] Criar campanhas no Google Ads
   - [ ] Aumentar tráfego (SEO, redes sociais)

---

## 📞 Suporte

**Recursos Oficiais**:
- [Central de Ajuda do AdSense](https://support.google.com/adsense)
- [Fórum da Comunidade](https://support.google.com/adsense/community)
- [Políticas do AdSense](https://support.google.com/adsense/answer/48182)

**Dicas**:
- Seja paciente com a aprovação
- Siga todas as políticas rigorosamente
- Foque em conteúdo de qualidade
- Monitore suas métricas regularmente

---

**Boa sorte com a monetização! 🚀**

