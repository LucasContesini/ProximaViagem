// Google Ads Conversion Tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackGoogleAdsConversion = (conversionLabel: string, value?: number, currency = 'BRL') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-XXXXXXXXXX/${conversionLabel}`, // Substitua pelo seu ID do cliente
      'value': value || 1.0,
      'currency': currency
    });
  }
};

// Eventos específicos para o seu app
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
