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
      } catch (err) {
        setError('Erro ao carregar destino. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, []);

  return { destination, loading, error };
};

