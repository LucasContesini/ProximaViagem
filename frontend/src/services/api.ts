import { Destination } from '../types';

// URL do backend - Netlify proxy em produção, localhost em desenvolvimento
const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8080';

// Dados de fallback estáticos
const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "dest-fallback-gramado",
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
  }
];

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  try {
    // Tentar primeiro o endpoint principal (Render API)
    const response = await fetch(`${API_URL}/api/destination`, {
      headers: {
        'Accept-Language': acceptLanguage
      },
      signal: AbortSignal.timeout(10000) // 10 segundos timeout
    });
    
    if (response.ok) {
      console.log('✅ Backend online - dados da IA');
      return response.json();
    }
    
    // Se der erro, tenta o endpoint de fallback
    console.log('⚠️ API principal falhou, tentando fallback');
    const fallbackResponse = await fetch(`${API_URL}/api/destination/fallback`, {
      headers: {
        'Accept-Language': acceptLanguage
      },
      signal: AbortSignal.timeout(10000)
    });
    
    if (fallbackResponse.ok) {
      console.log('✅ Fallback do backend funcionando');
      return fallbackResponse.json();
    }
    
    throw new Error(`Backend offline: ${response.status}`);
    
  } catch (error) {
    // Se tudo falhar, usar dados estáticos
    console.log('🎲 Usando dados estáticos de fallback');
    const randomIndex = Math.floor(Math.random() * FALLBACK_DESTINATIONS.length);
    const fallback = { ...FALLBACK_DESTINATIONS[randomIndex] };
    fallback.id = `dest-static-${Date.now()}`;
    fallback.date = new Date().toISOString();
    return fallback;
  }
};