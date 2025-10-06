import { Destination } from '../types';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? window.location.origin : 'http://localhost:8080');

export const fetchDailyDestination = async (): Promise<Destination> => {
  const response = await fetch(`${API_URL}/api/destination`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch destination');
  }
  
  return response.json();
};