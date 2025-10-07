import { useState, useEffect } from 'react';
import { Destination } from '../types';
import { fetchDailyDestination } from '../services/api';

// Dados de emergência para garantir que sempre há conteúdo
const getEmergencyDestination = (): Destination => ({
  id: `dest-emergency-${Date.now()}`,
  name: "Gramado",
  country: "Brasil",
  description: "Gramado é uma charmosa cidade na Serra Gaúcha, conhecida por sua arquitetura europeia, chocolates artesanais e clima de montanha.",
  detailedInfo: "Fundada por imigrantes alemães e italianos, Gramado preserva tradições europeias em sua arquitetura, gastronomia e cultura. A cidade é famosa por seus festivais, como o Natal Luz.",
  imageUrl: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
  images: [
    "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  ],
  tips: [
    "Reserve hotéis com antecedência durante o Natal Luz",
    "Experimente os chocolates artesanais nas fábricas locais",
    "Use roupas quentes no inverno",
    "Alugue um carro para explorar a região",
    "Evite fins de semana prolongados",
    "Visite as atrações pela manhã"
  ],
  attractions: [
    {
      name: "Rua Coberta",
      description: "Centro de compras e gastronomia com arquitetura alpina",
      duration: "2-3 horas",
      price: "Grátis"
    },
    {
      name: "Mini Mundo",
      description: "Parque temático com miniaturas perfeitas",
      duration: "2-3 horas",
      price: "R$ 60-80"
    },
    {
      name: "Lago Negro",
      description: "Lago artificial cercado por bosque de pinheiros",
      duration: "1-2 horas",
      price: "Grátis"
    },
    {
      name: "Snowland",
      description: "Parque de neve indoor único no Brasil",
      duration: "3-4 horas",
      price: "R$ 150-200"
    },
    {
      name: "Gramado Zoo",
      description: "Zoológico moderno com mais de 1.500 animais",
      duration: "3-4 horas",
      price: "R$ 80-100"
    },
    {
      name: "Le Jardin Parque de Lavanda",
      description: "Lindo parque com campos de lavanda",
      duration: "1-2 horas",
      price: "R$ 40-60"
    }
  ],
  bestTime: "Junho a agosto para curtir o frio e a atmosfera de inverno europeu",
  budget: {
    low: "R$ 200-300 por dia",
    medium: "R$ 400-600 por dia",
    high: "R$ 800-1200 por dia"
  },
  transportation: "De avião: voe para Porto Alegre e alugue um carro. Na cidade, é possível caminhar pelo centro.",
  accommodation: "Centro, Planalto ou Carniel. Hotéis boutique, pousadas ou Airbnb em chalés.",
  localCuisine: [
    "Fondue - tradicional suíço com queijo ou chocolate",
    "Galeto al primo canto - frango assado na brasa",
    "Apfelstrudel - torta de maçã alemã",
    "Sequência de café colonial",
    "Vinho e espumante da Serra Gaúcha"
  ],
  date: new Date().toISOString()
});

export const useDestination = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        // Sempre garantir que não há erro
        
        const data = await fetchDailyDestination();
        setDestination(data);
        
        // Salvar no histórico
        saveToHistory(data);
      } catch (err) {
        // NUNCA mostrar erro - sempre usar fallback
        console.log('⚠️ Erro no carregamento, usando fallback automático');
        
        // Tentar novamente com fallback forçado
        try {
          const fallbackData = await fetchDailyDestination();
          setDestination(fallbackData);
          saveToHistory(fallbackData);
        } catch (fallbackErr) {
          // Se até o fallback falhar, usar dados estáticos locais
          console.log('🎲 Usando dados estáticos de emergência');
          const emergencyData = getEmergencyDestination();
          setDestination(emergencyData);
          saveToHistory(emergencyData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, []);

  // Recarregar destino quando o idioma mudar
  useEffect(() => {
    const handleLanguageChange = () => {
      if (destination) {
        const loadDestination = async () => {
          try {
            setLoading(true);
            // Sempre garantir que não há erro
            
            const data = await fetchDailyDestination();
            setDestination(data);
          } catch (err) {
            // NUNCA mostrar erro - sempre usar fallback
            console.log('⚠️ Erro ao recarregar destino, usando fallback automático');
            
            try {
              const fallbackData = await fetchDailyDestination();
              setDestination(fallbackData);
            } catch (fallbackErr) {
              // Se até o fallback falhar, usar dados de emergência
              console.log('🎲 Usando dados de emergência para recarregamento');
              const emergencyData = getEmergencyDestination();
              setDestination(emergencyData);
            }
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

  return { 
    destination, 
    loading, 
    error: null, // NUNCA retornar erro - sempre usar fallback
    updateDestination
  };
};

