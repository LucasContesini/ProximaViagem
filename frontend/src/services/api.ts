import { Destination } from '../types';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://proximaviagem.fly.dev' : 'http://localhost:8080');

export const fetchDailyDestination = async (): Promise<Destination> => {
  try {
    const response = await fetch(`${API_URL}/api/destination`);
    
    if (!response.ok) {
      // Se der erro (rate limit, etc), tenta o endpoint de teste
      console.log('API principal falhou, usando destino de teste');
      const testResponse = await fetch(`${API_URL}/api/destination/test`);
      if (testResponse.ok) {
        return testResponse.json();
      }
      throw new Error('Failed to fetch destination');
    }
    
    return response.json();
  } catch (error) {
    // Fallback para endpoint de teste
    console.error('Erro na API, tentando endpoint de teste:', error);
    const testResponse = await fetch(`${API_URL}/api/destination/test`);
    if (testResponse.ok) {
      return testResponse.json();
    }
    throw error;
  }
};