import { Destination } from '../types';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://proximaviagem.fly.dev' : 'http://localhost:8080');

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  try {
    // Tentar primeiro o endpoint principal (tem cache e IA)
    const response = await fetch(`${API_URL}/api/destination`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    
    if (response.ok) {
      return response.json();
    }
    
    // Se der erro, tenta o endpoint de teste (tem cache e internacionalização)
    console.log('API principal falhou, usando endpoint de teste');
    const testResponse = await fetch(`${API_URL}/api/destination/test`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    if (testResponse.ok) {
      return testResponse.json();
    }
    throw new Error('Failed to fetch destination');
    
  } catch (error) {
    // Fallback para endpoint de teste
    console.error('Erro na API, tentando endpoint de teste:', error);
    const testResponse = await fetch(`${API_URL}/api/destination/test`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    if (testResponse.ok) {
      return testResponse.json();
    }
    throw error;
  }
};