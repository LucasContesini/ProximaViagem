# 📄 Páginas Legais Obrigatórias

Para aprovação no Google AdSense, você precisa criar estas páginas no seu site.

## 📋 Páginas Necessárias

1. Política de Privacidade
2. Termos de Uso
3. Sobre
4. Contato

---

## 🔒 Política de Privacidade

Crie uma página em `frontend/public/privacy.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidade - Próxima Viagem</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { color: #667eea; }
        h2 { color: #764ba2; margin-top: 30px; }
    </style>
</head>
<body>
    <h1>Política de Privacidade</h1>
    <p><strong>Última atualização:</strong> [DATA]</p>

    <h2>1. Informações que Coletamos</h2>
    <p>O Próxima Viagem coleta as seguintes informações:</p>
    <ul>
        <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
        <li><strong>Cookies:</strong> Usamos cookies para melhorar sua experiência</li>
        <li><strong>Google Analytics:</strong> Coletamos dados anônimos de uso do site</li>
    </ul>

    <h2>2. Como Usamos suas Informações</h2>
    <p>Usamos suas informações para:</p>
    <ul>
        <li>Melhorar a experiência do usuário</li>
        <li>Analisar o tráfego do site</li>
        <li>Exibir anúncios relevantes via Google AdSense</li>
    </ul>

    <h2>3. Google AdSense</h2>
    <p>Este site usa Google AdSense para exibir anúncios. O Google pode usar cookies para exibir anúncios baseados em suas visitas anteriores a este e outros sites.</p>
    <p>Você pode desativar anúncios personalizados visitando <a href="https://www.google.com/settings/ads">Configurações de Anúncios</a>.</p>

    <h2>4. Cookies</h2>
    <p>Usamos cookies para:</p>
    <ul>
        <li>Lembrar suas preferências</li>
        <li>Entender como você usa nosso site</li>
        <li>Exibir anúncios relevantes</li>
    </ul>
    <p>Você pode desativar cookies nas configurações do seu navegador.</p>

    <h2>5. Compartilhamento de Dados</h2>
    <p>Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto:</p>
    <ul>
        <li>Google Analytics e AdSense (conforme suas políticas)</li>
        <li>Quando exigido por lei</li>
    </ul>

    <h2>6. Segurança</h2>
    <p>Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método de transmissão pela internet é 100% seguro.</p>

    <h2>7. Links Externos</h2>
    <p>Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade desses sites.</p>

    <h2>8. Alterações nesta Política</h2>
    <p>Podemos atualizar esta política periodicamente. Recomendamos revisar esta página regularmente.</p>

    <h2>9. Contato</h2>
    <p>Se você tiver dúvidas sobre esta política, entre em contato:</p>
    <p>Email: [SEU_EMAIL]</p>

    <p><a href="/">← Voltar para o site</a></p>
</body>
</html>
```

---

## 📜 Termos de Uso

Crie uma página em `frontend/public/terms.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termos de Uso - Próxima Viagem</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { color: #667eea; }
        h2 { color: #764ba2; margin-top: 30px; }
    </style>
</head>
<body>
    <h1>Termos de Uso</h1>
    <p><strong>Última atualização:</strong> [DATA]</p>

    <h2>1. Aceitação dos Termos</h2>
    <p>Ao acessar e usar o Próxima Viagem, você concorda com estes termos de uso.</p>

    <h2>2. Descrição do Serviço</h2>
    <p>O Próxima Viagem é um site que fornece sugestões diárias de destinos de viagem geradas por inteligência artificial.</p>

    <h2>3. Uso do Serviço</h2>
    <p>Você concorda em:</p>
    <ul>
        <li>Usar o serviço apenas para fins legais</li>
        <li>Não tentar hackear ou comprometer a segurança do site</li>
        <li>Não usar o serviço de forma que possa prejudicar outros usuários</li>
    </ul>

    <h2>4. Conteúdo</h2>
    <p>O conteúdo fornecido é gerado por IA e tem fins informativos. Não garantimos:</p>
    <ul>
        <li>Precisão das informações</li>
        <li>Adequação para qualquer propósito específico</li>
        <li>Disponibilidade ininterrupta do serviço</li>
    </ul>

    <h2>5. Responsabilidades</h2>
    <p>Você é responsável por:</p>
    <ul>
        <li>Verificar informações antes de viajar</li>
        <li>Tomar suas próprias decisões de viagem</li>
        <li>Sua segurança durante viagens</li>
    </ul>

    <h2>6. Isenção de Responsabilidade</h2>
    <p>O serviço é fornecido "como está". Não nos responsabilizamos por:</p>
    <ul>
        <li>Decisões tomadas com base nas informações fornecidas</li>
        <li>Problemas durante viagens</li>
        <li>Perda de dados ou interrupções no serviço</li>
    </ul>

    <h2>7. Propriedade Intelectual</h2>
    <p>O design e código do site são propriedade do Próxima Viagem. As imagens podem ser de terceiros (Unsplash) e seguem suas respectivas licenças.</p>

    <h2>8. Anúncios</h2>
    <p>Este site exibe anúncios via Google AdSense. Não controlamos o conteúdo dos anúncios exibidos.</p>

    <h2>9. Modificações</h2>
    <p>Reservamos o direito de modificar estes termos a qualquer momento. Alterações entram em vigor imediatamente após publicação.</p>

    <h2>10. Lei Aplicável</h2>
    <p>Estes termos são regidos pelas leis do Brasil.</p>

    <h2>11. Contato</h2>
    <p>Para questões sobre estes termos:</p>
    <p>Email: [SEU_EMAIL]</p>

    <p><a href="/">← Voltar para o site</a></p>
</body>
</html>
```

---

## ℹ️ Sobre

Crie uma página em `frontend/public/about.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre - Próxima Viagem</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { color: #667eea; }
        h2 { color: #764ba2; margin-top: 30px; }
        .emoji { font-size: 2em; }
    </style>
</head>
<body>
    <h1>✈️ Sobre o Próxima Viagem</h1>

    <h2>Nossa Missão</h2>
    <p>Inspirar pessoas a explorar o mundo, um destino por dia.</p>

    <h2>O Que Fazemos</h2>
    <p>O Próxima Viagem é uma plataforma que usa inteligência artificial para sugerir destinos incríveis ao redor do mundo. Todos os dias, apresentamos um novo lugar para você descobrir, completo com:</p>
    <ul>
        <li>🌍 Descrição detalhada do destino</li>
        <li>🎯 Principais atrações turísticas</li>
        <li>💡 Dicas práticas de viagem</li>
        <li>🌤️ Melhor época para visitar</li>
    </ul>

    <h2>Como Funciona</h2>
    <p>Nossa tecnologia usa inteligência artificial avançada para pesquisar e compilar informações sobre destinos ao redor do mundo. Cada sugestão é única e renovada diariamente.</p>

    <h2>Por Que Criamos Isso</h2>
    <p>Acreditamos que todos merecem inspiração para viajar. Seja você um viajante experiente ou alguém planejando sua primeira aventura, queremos ajudar você a descobrir seu próximo destino.</p>

    <h2>Tecnologia</h2>
    <p>Desenvolvido com:</p>
    <ul>
        <li>Backend em Go (Golang)</li>
        <li>Frontend em React + TypeScript</li>
        <li>IA: Groq / OpenAI</li>
    </ul>

    <h2>Contato</h2>
    <p>Tem sugestões ou feedback? Adoraríamos ouvir você!</p>
    <p>Email: [SEU_EMAIL]</p>

    <p><a href="/">← Voltar para o site</a></p>
</body>
</html>
```

---

## 📧 Contato

Crie uma página em `frontend/public/contact.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato - Próxima Viagem</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { color: #667eea; }
        h2 { color: #764ba2; margin-top: 30px; }
        .contact-box {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>📧 Entre em Contato</h1>

    <p>Tem dúvidas, sugestões ou feedback? Adoraríamos ouvir você!</p>

    <div class="contact-box">
        <h2>Email</h2>
        <p><strong>[SEU_EMAIL]</strong></p>
        <p>Respondemos geralmente em até 24-48 horas.</p>
    </div>

    <h2>Perguntas Frequentes</h2>
    
    <h3>Como funciona o Próxima Viagem?</h3>
    <p>Usamos inteligência artificial para gerar uma sugestão de destino diferente todos os dias.</p>

    <h3>As informações são precisas?</h3>
    <p>Fazemos o melhor para fornecer informações precisas, mas recomendamos sempre verificar detalhes antes de viajar.</p>

    <h3>Posso sugerir um destino?</h3>
    <p>Sim! Envie sua sugestão por email e consideraremos para futuras atualizações.</p>

    <h3>O serviço é gratuito?</h3>
    <p>Sim, o Próxima Viagem é totalmente gratuito. Nos sustentamos através de anúncios.</p>

    <h2>Redes Sociais</h2>
    <p>Siga-nos para mais inspiração de viagem:</p>
    <ul>
        <li>Instagram: @proximaviagem</li>
        <li>Twitter: @proximaviagem</li>
        <li>Facebook: /proximaviagem</li>
    </ul>

    <p><a href="/">← Voltar para o site</a></p>
</body>
</html>
```

---

## 🔗 Adicionar Links no Footer

Atualize o componente Footer em `frontend/src/App.tsx`:

```tsx
<footer className="footer">
  <p>🌍 Próxima Viagem - Inspiração diária para suas aventuras</p>
  <p className="footer-note">Volte amanhã para descobrir um novo destino!</p>
  <div className="footer-links">
    <a href="/privacy.html">Política de Privacidade</a> | 
    <a href="/terms.html">Termos de Uso</a> | 
    <a href="/about.html">Sobre</a> | 
    <a href="/contact.html">Contato</a>
  </div>
</footer>
```

E adicione o CSS em `frontend/src/styles/App.css`:

```css
.footer-links {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.footer-links a {
  color: var(--primary-color);
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-links a:hover {
  text-decoration: underline;
}
```

---

## ✅ Checklist

Antes de aplicar para o AdSense:

- [ ] Criar arquivo `privacy.html`
- [ ] Criar arquivo `terms.html`
- [ ] Criar arquivo `about.html`
- [ ] Criar arquivo `contact.html`
- [ ] Adicionar links no footer
- [ ] Substituir `[DATA]` pela data atual
- [ ] Substituir `[SEU_EMAIL]` pelo seu email
- [ ] Testar todos os links
- [ ] Fazer deploy das páginas

---

## 📝 Notas Importantes

1. **Personalize**: Substitua `[DATA]` e `[SEU_EMAIL]` com suas informações reais
2. **Mantenha atualizado**: Revise estas páginas periodicamente
3. **Seja transparente**: Seja claro sobre como usa dados dos usuários
4. **Conformidade**: Estas páginas ajudam na conformidade com LGPD/GDPR

---

**Páginas legais são essenciais para aprovação no AdSense! 📄**

