import { Destination } from '../types';

// Função para converter dados antigos para o novo formato
const convertLegacyCuisine = (cuisine: any): string[] => {
  if (!cuisine || !Array.isArray(cuisine)) {
    return [];
  }
  
  return cuisine.map((item: any) => {
    if (typeof item === 'string') {
      return item;
    }
    if (typeof item === 'object' && item.name) {
      return item.name;
    }
    return String(item);
  });
};

// URL do backend - sempre usar Netlify proxy em produção
const API_URL = '';

// Dados de fallback estáticos - múltiplos destinos
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
  },
  {
    id: "dest-fallback-fernando-noronha",
    name: "Fernando de Noronha",
    country: "Brasil",
    description: "Arquipélago paradisíaco com praias de águas cristalinas e vida marinha exuberante.",
    detailedInfo: "Fernando de Noronha é um arquipélago brasileiro no Oceano Atlântico, conhecido por suas praias paradisíacas, águas cristalinas e rica vida marinha. É um destino de ecoturismo e mergulho de classe mundial.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ],
    tips: [
      "Reserve com muita antecedência (até 6 meses)",
      "Leve protetor solar biodegradável",
      "Faça mergulho com cilindro ou snorkel",
      "Respeite as regras ambientais",
      "Leve dinheiro em espécie",
      "Contrate passeios com guias credenciados"
    ],
    attractions: [
      {
        name: "Baía do Sancho",
        description: "Uma das praias mais bonitas do mundo",
        duration: "Meio dia",
        price: "Grátis"
      },
      {
        name: "Projeto Tamar",
        description: "Centro de preservação de tartarugas marinhas",
        duration: "1-2 horas",
        price: "R$ 20-30"
      },
      {
        name: "Mergulho na Baía dos Porcos",
        description: "Mergulho com vida marinha incrível",
        duration: "2-3 horas",
        price: "R$ 150-250"
      },
      {
        name: "Mirante do Boldró",
        description: "Vista panorâmica do arquipélago",
        duration: "1 hora",
        price: "Grátis"
      }
    ],
    bestTime: "Abril a setembro (período seco)",
    budget: {
      low: "R$ 400-600 por dia",
      medium: "R$ 800-1200 por dia",
      high: "R$ 1500+ por dia"
    },
    transportation: "Voo de Recife ou Natal. Na ilha, use buggy ou bicicleta.",
    accommodation: "Pousadas na Vila dos Remédios ou Sueste.",
    localCuisine: [
      "Frutos do mar frescos",
      "Tapioca com coco",
      "Açaí na tigela",
      "Peixe grelhado",
      "Camarão na moranga"
    ],
    date: new Date().toISOString()
  },
  {
    id: "dest-fallback-bonito",
    name: "Bonito",
    country: "Brasil",
    description: "Capital do ecoturismo brasileiro com águas cristalinas, grutas e cachoeiras deslumbrantes.",
    detailedInfo: "Bonito é um município do Mato Grosso do Sul famoso por suas águas cristalinas, grutas calcárias e cachoeiras. É considerado um dos melhores destinos de ecoturismo do mundo.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
    ],
    tips: [
      "Reserve passeios com antecedência",
      "Use protetor solar biodegradável",
      "Leve roupa de banho e toalha",
      "Respeite o meio ambiente",
      "Contrate guias credenciados",
      "Leve câmera à prova d'água"
    ],
    attractions: [
      {
        name: "Gruta do Lago Azul",
        description: "Gruta com lago subterrâneo de águas cristalinas",
        duration: "2-3 horas",
        price: "R$ 80-120"
      },
      {
        name: "Rio da Prata",
        description: "Flutuação em águas cristalinas",
        duration: "4-5 horas",
        price: "R$ 200-300"
      },
      {
        name: "Buraco das Araras",
        description: "Dolina com centenas de araras",
        duration: "1-2 horas",
        price: "R$ 60-80"
      },
      {
        name: "Aquário Natural",
        description: "Flutuação com peixes coloridos",
        duration: "3-4 horas",
        price: "R$ 150-200"
      }
    ],
    bestTime: "Maio a setembro (período seco)",
    budget: {
      low: "R$ 300-500 por dia",
      medium: "R$ 600-900 por dia",
      high: "R$ 1200+ por dia"
    },
    transportation: "Voo para Campo Grande + transfer (4h) ou carro alugado.",
    accommodation: "Pousadas no centro ou fazendas ecológicas.",
    localCuisine: [
      "Peixe pantaneiro",
      "Carne de jacaré",
      "Pintado na telha",
      "Pacu assado",
      "Doce de leite artesanal"
    ],
    date: new Date().toISOString()
  }
];

// Função auxiliar para fazer fetch com timeout
const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number = 10000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchDailyDestination = async (): Promise<Destination> => {
  // Obter idioma do localStorage
  const language = localStorage.getItem('language') || 'pt';
  const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

  const headers = {
    'Accept-Language': acceptLanguage
  };

  // NÍVEL 1: Tentar endpoint principal (IA) - 10 segundos timeout
  try {
    console.log('🚀 Tentando API principal (IA)...');
    const response = await fetchWithTimeout(`${API_URL}/api/destination`, {
      headers
    }, 10000);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        // Converter dados antigos para novo formato
        if (data.localCuisine) {
          data.localCuisine = convertLegacyCuisine(data.localCuisine);
        }
        console.log('✅ Backend online - dados da IA');
        return data;
      } else {
        console.log('⚠️ API principal retornou HTML em vez de JSON, tentando fallback...');
      }
    }
    
    console.log(`⚠️ API principal retornou ${response.status}, tentando fallback...`);
  } catch (error) {
    console.log(`⚠️ API principal falhou (timeout/erro): ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }

  // NÍVEL 2: Tentar endpoint de fallback - 10 segundos timeout
  try {
    console.log('🔄 Tentando endpoint de fallback...');
    const fallbackResponse = await fetchWithTimeout(`${API_URL}/api/destination/fallback`, {
      headers
    }, 10000);
    
    if (fallbackResponse.ok) {
      const contentType = fallbackResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await fallbackResponse.json();
        // Converter dados antigos para novo formato
        if (data.localCuisine) {
          data.localCuisine = convertLegacyCuisine(data.localCuisine);
        }
        console.log('✅ Fallback do backend funcionando');
        return data;
      } else {
        console.log('⚠️ Fallback retornou HTML em vez de JSON, usando dados estáticos...');
      }
    }
    
    console.log(`⚠️ Fallback retornou ${fallbackResponse.status}, usando dados estáticos...`);
  } catch (error) {
    console.log(`⚠️ Fallback falhou (timeout/erro): ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }

  // NÍVEL 3: Usar dados estáticos do frontend
  console.log('🎲 Usando dados estáticos de fallback do frontend');
  const randomIndex = Math.floor(Math.random() * FALLBACK_DESTINATIONS.length);
  const fallback = { ...FALLBACK_DESTINATIONS[randomIndex] };
  fallback.id = `dest-static-${Date.now()}`;
  fallback.date = new Date().toISOString();
  
  console.log(`📍 Destino estático selecionado: ${fallback.name}`);
  return fallback;
};