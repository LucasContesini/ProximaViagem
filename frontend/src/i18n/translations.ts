export const translations = {
  pt: {
    header: {
      title: 'Próxima Viagem',
      subtitle: 'Um destino novo te espera todos os dias! ✈️'
    },
    buttons: {
      favorites: 'Favoritos',
      history: 'Histórico',
      share: 'Compartilhar',
      favorite: 'Favoritar',
      favorited: 'Favoritado',
      viewMap: 'Ver no Google Maps',
      install: 'Instalar',
      search: 'Buscar',
      close: 'Fechar',
      copyLink: 'Copiar Link',
      addFavorite: 'Adicionar aos favoritos',
      removeFavorite: 'Remover dos favoritos'
    },
    sections: {
      about: 'Sobre o Destino',
      attractions: 'Principais Atrações',
      tips: 'Dicas de Viagem',
      budget: 'Orçamento Estimado',
      transport: 'Como Chegar e Se Locomover',
      accommodation: 'Onde Se Hospedar',
      cuisine: 'Gastronomia Local',
      bestTime: 'Melhor Época',
      myFavorites: 'Meus Favoritos',
      previousDestinations: 'Destinos Anteriores'
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
      noHistory: 'Nenhum histórico',
      addFavorites: 'Comece a favoritar destinos que você quer visitar!',
      shareDestination: 'Compartilhe este destino',
      dailyDestination: 'Destino do dia',
      discoverMore: 'Descubra mais em',
      copied: 'Copiado!'
    }
  },
  en: {
    header: {
      title: 'Next Trip',
      subtitle: 'A new destination awaits you every day! ✈️'
    },
    buttons: {
      favorites: 'Favorites',
      history: 'History',
      share: 'Share',
      favorite: 'Favorite',
      favorited: 'Favorited',
      viewMap: 'View on Google Maps',
      install: 'Install',
      search: 'Search',
      close: 'Close',
      copyLink: 'Copy Link',
      addFavorite: 'Add to favorites',
      removeFavorite: 'Remove from favorites'
    },
    sections: {
      about: 'About the Destination',
      attractions: 'Top Attractions',
      tips: 'Travel Tips',
      budget: 'Estimated Budget',
      transport: 'How to Get Around',
      accommodation: 'Where to Stay',
      cuisine: 'Local Cuisine',
      bestTime: 'Best Time to Visit',
      myFavorites: 'My Favorites',
      previousDestinations: 'Previous Destinations'
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
      noHistory: 'No history',
      addFavorites: 'Start favoriting destinations you want to visit!',
      shareDestination: 'Share this destination',
      dailyDestination: 'Daily destination',
      discoverMore: 'Discover more at',
      copied: 'Copied!'
    }
  },
  es: {
    header: {
      title: 'Próximo Viaje',
      subtitle: '¡Un nuevo destino te espera cada día! ✈️'
    },
    buttons: {
      favorites: 'Favoritos',
      history: 'Historial',
      share: 'Compartir',
      favorite: 'Favorito',
      favorited: 'Favoritado',
      viewMap: 'Ver en Google Maps',
      install: 'Instalar',
      search: 'Buscar',
      close: 'Cerrar',
      copyLink: 'Copiar Enlace',
      addFavorite: 'Agregar a favoritos',
      removeFavorite: 'Quitar de favoritos'
    },
    sections: {
      about: 'Sobre el Destino',
      attractions: 'Principales Atracciones',
      tips: 'Consejos de Viaje',
      budget: 'Presupuesto Estimado',
      transport: 'Cómo Llegar y Moverse',
      accommodation: 'Dónde Alojarse',
      cuisine: 'Gastronomía Local',
      bestTime: 'Mejor Época',
      myFavorites: 'Mis Favoritos',
      previousDestinations: 'Destinos Anteriores'
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
      noHistory: 'Sin historial',
      addFavorites: '¡Comienza a marcar como favoritos los destinos que quieres visitar!',
      shareDestination: 'Comparte este destino',
      dailyDestination: 'Destino del día',
      discoverMore: 'Descubre más en',
      copied: '¡Copiado!'
    }
  }
};

export type Language = 'pt' | 'en' | 'es';
export type Translations = typeof translations.pt;
