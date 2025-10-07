import { Destination } from '../types';

// URL do backend - Netlify proxy em produção, localhost em desenvolvimento
const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8080';

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  try {
    // Tentar primeiro o endpoint principal (Render API)
    const response = await fetch(`${API_URL}/api/destination`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    
    if (response.ok) {
      return response.json();
    }
    
    // Se der erro, tenta o endpoint de fallback
    console.log('API principal falhou, usando endpoint de fallback');
    const fallbackResponse = await fetch(`${API_URL}/api/destination/fallback`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    
    if (fallbackResponse.ok) {
      return fallbackResponse.json();
    }
    
    throw new Error(`Failed to fetch destination: ${response.status}`);
    
  } catch (error) {
    // Fallback para endpoint de fallback
    console.error('Erro na API, tentando endpoint de fallback:', error);
    const fallbackResponse = await fetch(`${API_URL}/api/destination/fallback`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    
    if (fallbackResponse.ok) {
      return fallbackResponse.json();
    }
    
    throw error;
  }
};