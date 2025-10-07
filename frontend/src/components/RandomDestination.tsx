import { useState } from 'react';
import { Destination } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/RandomDestination.css';

interface RandomDestinationProps {
  onRandomSelect: (destination: Destination) => void;
}

export const RandomDestination: React.FC<RandomDestinationProps> = ({ onRandomSelect }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const getRandomDestination = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://proximaviagem.fly.dev/api/destination/random');
      if (response.ok) {
        const destination = await response.json();
        onRandomSelect(destination);
        // Track random destination action
        // Tracking removido - Google Analytics desabilitado
      }
    } catch (error) {
      console.error('Erro ao buscar destino aleatório:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="random-button"
      onClick={getRandomDestination}
      disabled={loading}
    >
      {loading ? `🎲 ${t.messages.loading}` : `🎲 ${t.buttons.random}`}
    </button>
  );
};
