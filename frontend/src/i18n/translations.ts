export const translations = {
  pt: {
    header: {
      title: 'Próxima Viagem',
      subtitle: 'Seu Destino Diário'
    },
    buttons: {
      favorites: 'Favoritos',
      history: 'Histórico',
      random: 'Surpresa!',
      share: 'Compartilhar',
      favorite: 'Favoritar',
      favorited: 'Favoritado',
      viewMap: 'Ver no Google Maps',
      install: 'Instalar',
      search: 'Buscar'
    },
    sections: {
      about: 'Sobre o Destino',
      attractions: 'Principais Atrações',
      tips: 'Dicas de Viagem',
      budget: 'Orçamento Estimado',
      transport: 'Como Chegar e Se Locomover',
      accommodation: 'Onde Se Hospedar',
      cuisine: 'Gastronomia Local',
      bestTime: 'Melhor Época'
    },
    budget: {
      low: 'Econômico',
      medium: 'Médio',
      high: 'Confortável'
    },
    messages: {
      loading: 'Carregando destino...',
      error: 'Erro ao carregar destino. Tente novamente mais tarde.',
      noFavorites: 'Nenhum favorito ainda',
      noHistory: 'Nenhum histórico'
    }
  },
  en: {
    header: {
      title: 'Next Trip',
      subtitle: 'Your Daily Destination'
    },
    buttons: {
      favorites: 'Favorites',
      history: 'History',
      random: 'Surprise!',
      share: 'Share',
      favorite: 'Favorite',
      favorited: 'Favorited',
      viewMap: 'View on Google Maps',
      install: 'Install',
      search: 'Search'
    },
    sections: {
      about: 'About the Destination',
      attractions: 'Top Attractions',
      tips: 'Travel Tips',
      budget: 'Estimated Budget',
      transport: 'How to Get Around',
      accommodation: 'Where to Stay',
      cuisine: 'Local Cuisine',
      bestTime: 'Best Time to Visit'
    },
    budget: {
      low: 'Budget',
      medium: 'Mid-range',
      high: 'Luxury'
    },
    messages: {
      loading: 'Loading destination...',
      error: 'Error loading destination. Please try again later.',
      noFavorites: 'No favorites yet',
      noHistory: 'No history'
    }
  },
  es: {
    header: {
      title: 'Próximo Viaje',
      subtitle: 'Tu Destino Diario'
    },
    buttons: {
      favorites: 'Favoritos',
      history: 'Historial',
      random: '¡Sorpresa!',
      share: 'Compartir',
      favorite: 'Favorito',
      favorited: 'Favoritado',
      viewMap: 'Ver en Google Maps',
      install: 'Instalar',
      search: 'Buscar'
    },
    sections: {
      about: 'Sobre el Destino',
      attractions: 'Principales Atracciones',
      tips: 'Consejos de Viaje',
      budget: 'Presupuesto Estimado',
      transport: 'Cómo Llegar y Moverse',
      accommodation: 'Dónde Alojarse',
      cuisine: 'Gastronomía Local',
      bestTime: 'Mejor Época'
    },
    budget: {
      low: 'Económico',
      medium: 'Medio',
      high: 'Confortable'
    },
    messages: {
      loading: 'Cargando destino...',
      error: 'Error al cargar destino. Inténtalo de nuevo más tarde.',
      noFavorites: 'Aún no hay favoritos',
      noHistory: 'Sin historial'
    }
  }
};

export type Language = 'pt' | 'en' | 'es';
export type Translations = typeof translations.pt;
