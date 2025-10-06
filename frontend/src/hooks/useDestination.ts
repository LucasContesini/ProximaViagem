import { useState, useEffect } from 'react';
import { Destination } from '../types';
import { fetchDailyDestination } from '../services/api';

export const useDestination = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        const data = await fetchDailyDestination();
        setDestination(data);
        setError(null);
        
        // Salvar no histórico
        saveToHistory(data);
      } catch (err) {
        setError('Erro ao carregar destino. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, []);

  const saveToHistory = (dest: Destination) => {
    try {
      const history = localStorage.getItem('destination-history');
      let historyArray: Destination[] = history ? JSON.parse(history) : [];
      
      // Evitar duplicatas (mesmo ID)
      historyArray = historyArray.filter(item => item.id !== dest.id);
      
      // Adicionar no início
      historyArray.unshift(dest);
      
      // Manter apenas os últimos 7
      historyArray = historyArray.slice(0, 7);
      
      localStorage.setItem('destination-history', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  };

  const updateDestination = (newDestination: Destination) => {
    setDestination(newDestination);
  };

  return { destination, loading, error, updateDestination };
};

