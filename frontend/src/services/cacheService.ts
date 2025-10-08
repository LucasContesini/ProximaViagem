import { Destination } from '../types';

// Cache local com dados estáticos de fallback
const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "dest-fallback-1",
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
      { name: "Fondue", description: "Tradicional suíço com queijo ou chocolate, perfeito para noites frias" },
      { name: "Galeto al primo canto", description: "Frango assado na brasa, especialidade da região" },
      { name: "Apfelstrudel", description: "Torta de maçã alemã com canela, herança dos colonizadores" },
      { name: "Sequência de café colonial", description: "Variedade de pães, bolos e frios típicos" },
      { name: "Vinho e espumante", description: "Produção local da Serra Gaúcha, reconhecida mundialmente" }
    ],
    date: new Date().toISOString()
  },
  {
    id: "dest-fallback-2",
    name: "Búzios",
    country: "Brasil",
    description: "Búzios é um destino paradisíaco no Rio de Janeiro, famoso por suas praias deslumbrantes, vida noturna animada e charme europeu.",
    detailedInfo: "Descoberta por Brigitte Bardot nos anos 60, Búzios se tornou um dos destinos mais exclusivos do Brasil, combinando praias paradisíacas com uma atmosfera cosmopolita.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800"
    ],
    tips: [
      "Visite as praias pela manhã para evitar multidões",
      "Experimente a vida noturna na Rua das Pedras",
      "Faça um passeio de barco pelas ilhas",
      "Reserve restaurantes com antecedência",
      "Leve protetor solar e chapéu",
      "Explore as lojinhas de artesanato local"
    ],
    attractions: [
      {
        name: "Praia de Geribá",
        description: "Uma das praias mais famosas de Búzios, ideal para surf",
        duration: "Meio dia",
        price: "Grátis"
      },
      {
        name: "Rua das Pedras",
        description: "Centro da vida noturna com bares e restaurantes",
        duration: "Noite inteira",
        price: "R$ 50-150 por pessoa"
      },
      {
        name: "Passeio de Barco",
        description: "Tour pelas ilhas e praias paradisíacas",
        duration: "4-6 horas",
        price: "R$ 80-120"
      }
    ],
    bestTime: "Dezembro a março para aproveitar o verão, mas evite o Carnaval",
    budget: {
      low: "R$ 300-500 por dia",
      medium: "R$ 600-1000 por dia",
      high: "R$ 1200-2000 por dia"
    },
    transportation: "De carro: 2h30 do Rio de Janeiro. De ônibus: várias linhas diárias.",
    accommodation: "Centro, Manguinhos ou João Fernandes. Pousadas charmosas e hotéis boutique.",
    localCuisine: [
      { name: "Frutos do mar frescos", description: "Peixes, lagostas e camarões pescados diariamente" },
      { name: "Caipirinha de frutas tropicais", description: "Caipirinha preparada com frutas locais frescas" },
      { name: "Açaí na tigela", description: "Açaí cremoso servido com frutas e granola" },
      { name: "Camarão na moranga", description: "Camarões refogados servidos dentro de uma moranga" },
      { name: "Moqueca de peixe", description: "Moqueca tradicional com peixes locais e leite de coco" }
    ],
    date: new Date().toISOString()
  }
];

class CacheService {
  private static instance: CacheService;
  private currentDestination: Destination | null = null;
  private lastUpdate: Date | null = null;
  private isBackendOnline: boolean = false;
  private pollingInterval: number | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
  private readonly POLLING_INTERVAL = 30 * 1000; // 30 segundos
  private readonly BACKEND_TIMEOUT = 10 * 1000; // 10 segundos

  private constructor() {
    this.loadFromLocalStorage();
  }

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  private loadFromLocalStorage(): void {
    try {
      const cached = localStorage.getItem('destination-cache');
      if (cached) {
        const data = JSON.parse(cached);
        this.currentDestination = data.destination;
        this.lastUpdate = new Date(data.lastUpdate);
        this.isBackendOnline = data.isBackendOnline || false;
      }
    } catch (error) {
      console.error('Erro ao carregar cache:', error);
    }
  }

  private saveToLocalStorage(): void {
    try {
      const data = {
        destination: this.currentDestination,
        lastUpdate: this.lastUpdate?.toISOString(),
        isBackendOnline: this.isBackendOnline
      };
      localStorage.setItem('destination-cache', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }

  private isCacheValid(): boolean {
    if (!this.lastUpdate) return false;
    const now = new Date();
    const diff = now.getTime() - this.lastUpdate.getTime();
    return diff < this.CACHE_DURATION;
  }

  private getFallbackDestination(): Destination {
    const randomIndex = Math.floor(Math.random() * FALLBACK_DESTINATIONS.length);
    const fallback = { ...FALLBACK_DESTINATIONS[randomIndex] };
    fallback.id = `dest-fallback-${Date.now()}`;
    fallback.date = new Date().toISOString();
    return fallback;
  }

  private async tryBackendConnection(): Promise<Destination | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.BACKEND_TIMEOUT);

      const language = localStorage.getItem('language') || 'pt';
      const acceptLanguage = language === 'en' ? 'en' : language === 'es' ? 'es' : 'pt';

      const response = await fetch('/api/destination', {
        headers: {
          'Accept-Language': acceptLanguage
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const destination = await response.json();
        this.isBackendOnline = true;
        console.log('✅ Backend online - dados atualizados');
        return destination;
      }
    } catch (error) {
      console.log('⚠️ Backend offline ou timeout:', error);
      this.isBackendOnline = false;
    }
    return null;
  }

  private startPolling(): void {
    if (this.pollingInterval) return;

    console.log('🔄 Iniciando polling do backend...');
    this.pollingInterval = window.setInterval(async () => {
      if (this.isBackendOnline) {
        console.log('✅ Backend já online - parando polling');
        this.stopPolling();
        return;
      }

      const destination = await this.tryBackendConnection();
      if (destination) {
        this.currentDestination = destination;
        this.lastUpdate = new Date();
        this.saveToLocalStorage();
        this.stopPolling();
        
        // Notificar componentes sobre a atualização
        window.dispatchEvent(new CustomEvent('destinationUpdated', { 
          detail: destination 
        }));
      }
    }, this.POLLING_INTERVAL);
  }

  private stopPolling(): void {
    if (this.pollingInterval) {
      window.clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      console.log('⏹️ Polling parado');
    }
  }

  async getDestination(): Promise<Destination> {
    // Se temos cache válido e backend está online, usar cache
    if (this.isCacheValid() && this.currentDestination && this.isBackendOnline) {
      return this.currentDestination;
    }

    // Tentar conectar com o backend
    const backendDestination = await this.tryBackendConnection();
    if (backendDestination) {
      this.currentDestination = backendDestination;
      this.lastUpdate = new Date();
      this.saveToLocalStorage();
      return backendDestination;
    }

    // Se backend offline, usar cache se disponível
    if (this.currentDestination) {
      console.log('📦 Usando cache local (backend offline)');
      this.startPolling(); // Iniciar polling para quando backend voltar
      return this.currentDestination;
    }

    // Se não há cache, usar fallback
    console.log('🎲 Usando destino de fallback');
    const fallbackDestination = this.getFallbackDestination();
    this.currentDestination = fallbackDestination;
    this.lastUpdate = new Date();
    this.saveToLocalStorage();
    this.startPolling(); // Iniciar polling para quando backend voltar

    return fallbackDestination;
  }

  // Método para forçar atualização
  async refreshDestination(): Promise<Destination> {
    this.stopPolling();
    this.isBackendOnline = false;
    return this.getDestination();
  }

  // Método para verificar status do backend
  getBackendStatus(): { isOnline: boolean; lastUpdate: Date | null } {
    return {
      isOnline: this.isBackendOnline,
      lastUpdate: this.lastUpdate
    };
  }

  // Limpar cache
  clearCache(): void {
    this.currentDestination = null;
    this.lastUpdate = null;
    this.isBackendOnline = false;
    this.stopPolling();
    localStorage.removeItem('destination-cache');
  }
}

export default CacheService;
