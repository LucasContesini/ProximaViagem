import { useState } from 'react';
import { Destination } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/RandomDestination.css';

// Função para converter dados antigos para o novo formato
const convertLegacyCuisine = (cuisine: any): { name: string; description: string; }[] => {
  if (!cuisine || !Array.isArray(cuisine)) {
    return [];
  }
  
  return cuisine.map((item: any) => {
    if (typeof item === 'string') {
      return { name: item, description: `Delicioso prato típico da região` };
    }
    if (typeof item === 'object' && item.name) {
      return { 
        name: item.name, 
        description: item.description || `Delicioso prato típico da região` 
      };
    }
    return { name: String(item), description: `Delicioso prato típico da região` };
  });
};

interface RandomDestinationProps {
  onRandomSelect: (destination: Destination) => void;
}

// Dados completos de fallback para o botão surpresa
const RANDOM_FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "dest-random-gramado",
    name: "Gramado",
    country: "Brasil",
    description: "Gramado é uma charmosa cidade na Serra Gaúcha, conhecida por sua arquitetura europeia, chocolates artesanais e clima de montanha.",
    detailedInfo: "Fundada por imigrantes alemães e italianos, Gramado preserva tradições europeias em sua arquitetura, gastronomia e cultura. A cidade é famosa por seus festivais, como o Natal Luz, que atrai milhares de visitantes todos os anos.",
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
      { name: "Fondue", description: "Tradicional suíço com queijo ou chocolate, perfeito para noites frias" },
      { name: "Galeto al primo canto", description: "Frango assado na brasa, especialidade da região" },
      { name: "Apfelstrudel", description: "Torta de maçã alemã com canela, herança dos colonizadores" },
      { name: "Sequência de café colonial", description: "Variedade de pães, bolos e frios típicos" },
      { name: "Vinho e espumante", description: "Produção local da Serra Gaúcha, reconhecida mundialmente" }
    ],
    date: new Date().toISOString()
  },
  {
    id: "dest-random-fernando-noronha",
    name: "Fernando de Noronha",
    country: "Brasil",
    description: "Arquipélago paradisíaco com praias de águas cristalinas e vida marinha exuberante.",
    detailedInfo: "Fernando de Noronha é um arquipélago brasileiro no Oceano Atlântico, conhecido por suas praias paradisíacas, águas cristalinas e rica vida marinha. É um destino de ecoturismo e mergulho de classe mundial, com mais de 70% do território protegido como Parque Nacional Marinho.",
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
      },
      {
        name: "Praia do Leão",
        description: "Local de desova das tartarugas marinhas",
        duration: "2-3 horas",
        price: "Grátis"
      },
      {
        name: "Fortaleza Nossa Senhora dos Remédios",
        description: "Fortaleza histórica do século XVIII",
        duration: "1-2 horas",
        price: "R$ 10-15"
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
      { name: "Frutos do mar frescos", description: "Peixes, lagostas e camarões pescados diariamente" },
      { name: "Tapioca com coco", description: "Tradicional tapioca nordestina com coco fresco" },
      { name: "Açaí na tigela", description: "Açaí cremoso servido com frutas e granola" },
      { name: "Peixe grelhado", description: "Peixes locais grelhados com temperos regionais" },
      { name: "Camarão na moranga", description: "Camarões refogados servidos dentro de uma moranga" }
    ],
    date: new Date().toISOString()
  },
  {
    id: "dest-random-bonito",
    name: "Bonito",
    country: "Brasil",
    description: "Capital do ecoturismo brasileiro com águas cristalinas, grutas e cachoeiras deslumbrantes.",
    detailedInfo: "Bonito é um município do Mato Grosso do Sul famoso por suas águas cristalinas, grutas calcárias e cachoeiras. É considerado um dos melhores destinos de ecoturismo do mundo, com atividades sustentáveis e preservação ambiental exemplar.",
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
      },
      {
        name: "Cachoeira Boca da Onça",
        description: "Cachoeira de 156 metros de altura",
        duration: "4-5 horas",
        price: "R$ 180-250"
      },
      {
        name: "Gruta de São Miguel",
        description: "Gruta com formações calcárias impressionantes",
        duration: "2-3 horas",
        price: "R$ 100-150"
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
      { name: "Peixe pantaneiro", description: "Peixes de água doce do Pantanal preparados de forma tradicional" },
      { name: "Carne de jacaré", description: "Especialidade regional, carne macia e saborosa" },
      { name: "Pintado na telha", description: "Peixe pintado assado em telha de barro" },
      { name: "Pacu assado", description: "Peixe pacu grelhado com temperos locais" },
      { name: "Doce de leite artesanal", description: "Doce de leite caseiro produzido localmente" }
    ],
    date: new Date().toISOString()
  },
  {
    id: "dest-random-paraty",
    name: "Paraty",
    country: "Brasil",
    description: "Cidade histórica colonial com arquitetura preservada, praias paradisíacas e cachaça artesanal.",
    detailedInfo: "Paraty é uma cidade histórica do Rio de Janeiro, fundada em 1667, conhecida por sua arquitetura colonial preservada, praias paradisíacas e produção de cachaça artesanal. É Patrimônio Mundial da UNESCO e um dos destinos mais charmosos do Brasil.",
    imageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    images: [
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800"
    ],
    tips: [
      "Caminhe descalço no centro histórico",
      "Experimente a cachaça artesanal",
      "Faça passeio de barco pelas ilhas",
      "Visite as praias de Trindade",
      "Reserve restaurantes com antecedência",
      "Leve protetor solar e repelente"
    ],
    attractions: [
      {
        name: "Centro Histórico",
        description: "Arquitetura colonial preservada do século XVIII",
        duration: "2-3 horas",
        price: "Grátis"
      },
      {
               name: "Praia do Sono",
        description: "Praia paradisíaca acessível por trilha",
        duration: "Meio dia",
        price: "Grátis"
      },
      {
        name: "Ilha do Pelado",
        description: "Ilha com praia de areia branca e águas cristalinas",
        duration: "4-5 horas",
        price: "R$ 80-120"
      },
      {
        name: "Cachoeira do Tobogã",
        description: "Cachoeira natural com escorregador de pedra",
        duration: "2-3 horas",
        price: "Grátis"
      },
      {
        name: "Alambique Engenho D'Ouro",
        description: "Fábrica de cachaça artesanal com degustação",
        duration: "1-2 horas",
        price: "R$ 30-50"
      },
      {
        name: "Trilha do Ouro",
        description: "Caminhada pela antiga rota do ouro",
        duration: "3-4 horas",
        price: "R$ 60-100"
      }
    ],
    bestTime: "Abril a outubro (período seco)",
    budget: {
      low: "R$ 250-400 por dia",
      medium: "R$ 500-800 por dia",
      high: "R$ 1000+ por dia"
    },
    transportation: "Carro pela BR-101 ou ônibus do Rio de Janeiro. Na cidade, caminhe ou use bicicleta.",
    accommodation: "Pousadas no centro histórico ou hotéis na orla.",
    localCuisine: [
      { name: "Moqueca de peixe", description: "Moqueca tradicional com peixes locais e leite de coco" },
      { name: "Cachaça artesanal", description: "Cachaça produzida em alambiques tradicionais da região" },
      { name: "Açaí na tigela", description: "Açaí cremoso servido com frutas tropicais" },
      { name: "Peixe frito com pirão", description: "Peixe fresco frito servido com pirão de farinha" },
      { name: "Bolinho de aipim", description: "Bolinho frito de aipim, petisco típico da região" }
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

export const RandomDestination: React.FC<RandomDestinationProps> = ({ onRandomSelect }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const getRandomDestination = async () => {
    setLoading(true);
    
    try {
      // Obter idioma do localStorage
      const language = localStorage.getItem('language') || 'pt';
      const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';
      
      const headers = {
        'Accept-Language': acceptLanguage
      };

      // NÍVEL 1: Tentar endpoint de destino aleatório do backend - 10 segundos timeout
      try {
        console.log('🎲 Tentando API de destino aleatório...');
        const response = await fetchWithTimeout('/api/destination/random', {
          headers
        }, 10000);
        
        if (response.ok) {
          const destination = await response.json();
          // Converter dados antigos para novo formato
          if (destination.localCuisine) {
            destination.localCuisine = convertLegacyCuisine(destination.localCuisine);
          }
          console.log('✅ Destino aleatório do backend carregado');
          onRandomSelect(destination);
          return;
        }
        
        console.log(`⚠️ API aleatória retornou ${response.status}, usando fallback...`);
      } catch (error) {
        console.log(`⚠️ API aleatória falhou (timeout/erro): ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }

      // NÍVEL 2: Usar dados estáticos completos do frontend
      console.log('🎲 Usando destino aleatório estático com informações completas');
      const randomIndex = Math.floor(Math.random() * RANDOM_FALLBACK_DESTINATIONS.length);
      const fallback = { ...RANDOM_FALLBACK_DESTINATIONS[randomIndex] };
      fallback.id = `dest-random-${Date.now()}`;
      fallback.date = new Date().toISOString();
      
      console.log(`📍 Destino aleatório selecionado: ${fallback.name}`);
      onRandomSelect(fallback);
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
