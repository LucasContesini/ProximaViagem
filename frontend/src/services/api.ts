import { Destination } from '../types';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://proximaviagem.fly.dev' : 'http://localhost:8080');

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  // Usar sempre o endpoint de teste por enquanto (tem internacionalização e funciona)
  console.log('Usando endpoint de teste com internacionalização');
  const testResponse = await fetch(`${API_URL}/api/destination/test`, {
    headers: {
      'Accept-Language': acceptLanguage
    }
  });
  
  if (testResponse.ok) {
    return testResponse.json();
  }
  
  throw new Error('Failed to fetch test destination');
};