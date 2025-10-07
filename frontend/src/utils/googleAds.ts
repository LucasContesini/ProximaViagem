// Google Analytics - Desabilitado temporariamente
// Para habilitar, configure um ID real do Google Analytics

/*
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackGoogleAdsConversion = (conversionLabel: string, value?: number, currency = 'BRL') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-SEU-ID-AQUI/${conversionLabel}`,
      'value': value || 1.0,
      'currency': currency
    });
  }
};

export const trackDestinationView = (destinationName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      'page_title': `Destino: ${destinationName}`,
      'page_location': window.location.href
    });
  }
};

export const trackFavoriteAction = (destinationName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'favorite_destination', {
      'destination_name': destinationName,
      'event_category': 'engagement',
      'event_label': 'favorite'
    });
  }
};

export const trackShareAction = (destinationName: string, platform: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      'destination_name': destinationName,
      'method': platform,
      'event_category': 'engagement',
      'event_label': 'share'
    });
  }
};

export const trackRandomDestination = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'random_destination', {
      'event_category': 'engagement',
      'event_label': 'random_button'
    });
  }
};
*/

// Funções temporárias (sem tracking)
export const trackDestinationView = (destinationName: string) => {
  console.log(`Destino visualizado: ${destinationName}`);
};

export const trackFavoriteAction = (destinationName: string) => {
  console.log(`Destino favoritado: ${destinationName}`);
};

export const trackShareAction = (destinationName: string, platform: string) => {
  console.log(`Destino compartilhado: ${destinationName} via ${platform}`);
};

export const trackRandomDestination = () => {
  console.log('Destino aleatório solicitado');
};
