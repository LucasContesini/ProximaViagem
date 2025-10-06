import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './styles/index.css'
import { registerServiceWorker, setupInstallPrompt } from './registerSW'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)

// Register service worker for PWA
registerServiceWorker()
setupInstallPrompt()

