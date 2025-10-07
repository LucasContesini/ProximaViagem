import { Destination } from '../types';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:8080');

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  try {
    // Usar endpoint de teste que não depende de API externa
    const response = await fetch(`${API_URL}/api/destination/test`, {
      headers: {
        'Accept-Language': acceptLanguage
      }
    });
    
    if (response.ok) {
      return response.json();
    }
    
    throw new Error(`Failed to fetch destination: ${response.status}`);
    
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};