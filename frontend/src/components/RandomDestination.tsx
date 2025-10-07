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
      // Tentar primeiro o backend atual
      const response = await fetch('/api/destination/random');
      if (response.ok) {
        const destination = await response.json();
        onRandomSelect(destination);
        return;
      }
    } catch (error) {
      console.log('Backend offline, usando destino aleatório do cache');
    }

    // Se backend offline, gerar destino aleatório local
    try {
      const fallbackDestinations = [
        {
          id: `dest-random-${Date.now()}`,
          name: "Fernando de Noronha",
          country: "Brasil",
          description: "Arquipélago paradisíaco com praias de águas cristalinas e vida marinha exuberante.",
          imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
          images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"],
          tips: ["Reserve com antecedência", "Leve protetor solar", "Faça mergulho"],
          attractions: [{ name: "Baía do Sancho", description: "Uma das praias mais bonitas do mundo", duration: "Meio dia", price: "Grátis" }],
          bestTime: "Abril a setembro",
          budget: { low: "R$ 400-600/dia", medium: "R$ 800-1200/dia", high: "R$ 1500+/dia" },
          transportation: "Voo de Recife ou Natal",
          accommodation: "Pousadas e hotéis na Vila dos Remédios",
          localCuisine: ["Frutos do mar", "Tapioca", "Açaí"],
          date: new Date().toISOString()
        }
      ];
      
      const randomIndex = Math.floor(Math.random() * fallbackDestinations.length);
      onRandomSelect(fallbackDestinations[randomIndex]);
    } catch (error) {
      console.error('Erro ao gerar destino aleatório:', error);
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
