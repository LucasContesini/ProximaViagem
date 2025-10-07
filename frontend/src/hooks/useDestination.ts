import { useState, useEffect } from 'react';
import { Destination } from '../types';
import CacheService from '../services/cacheService';

export const useDestination = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{ isOnline: boolean; lastUpdate: Date | null }>({
    isOnline: false,
    lastUpdate: null
  });

  const cacheService = CacheService.getInstance();

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        const data = await cacheService.getDestination();
        setDestination(data);
        setError(null);
        setBackendStatus(cacheService.getBackendStatus());
        
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

  // Escutar atualizações do cache service
  useEffect(() => {
    const handleDestinationUpdate = (event: CustomEvent) => {
      const newDestination = event.detail;
      setDestination(newDestination);
      setBackendStatus(cacheService.getBackendStatus());
      saveToHistory(newDestination);
      console.log('🔄 Destino atualizado via polling!');
    };

    window.addEventListener('destinationUpdated', handleDestinationUpdate as EventListener);
    
    return () => {
      window.removeEventListener('destinationUpdated', handleDestinationUpdate as EventListener);
    };
  }, []);

  // Recarregar destino quando o idioma mudar
  useEffect(() => {
    const handleLanguageChange = () => {
      if (destination) {
        const loadDestination = async () => {
          try {
            setLoading(true);
            const data = await cacheService.refreshDestination();
            setDestination(data);
            setError(null);
            setBackendStatus(cacheService.getBackendStatus());
          } catch (err) {
            console.error('Erro ao recarregar destino:', err);
          } finally {
            setLoading(false);
          }
        };
        loadDestination();
      }
    };

    // Escutar mudanças no localStorage
    window.addEventListener('storage', handleLanguageChange);
    
    // Escutar mudanças no mesmo tab
    const interval = setInterval(() => {
      const currentLang = localStorage.getItem('language');
      if (currentLang && currentLang !== 'pt') {
        handleLanguageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      clearInterval(interval);
    };
  }, [destination]);

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

  const refreshDestination = async () => {
    try {
      setLoading(true);
      const data = await cacheService.refreshDestination();
      setDestination(data);
      setError(null);
      setBackendStatus(cacheService.getBackendStatus());
    } catch (err) {
      setError('Erro ao atualizar destino.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { 
    destination, 
    loading, 
    error, 
    updateDestination, 
    refreshDestination,
    backendStatus 
  };
};

