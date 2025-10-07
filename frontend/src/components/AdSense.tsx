import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({ 
  adSlot, 
  adFormat = 'auto', 
  adStyle = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={adStyle}
      data-ad-client="ca-pub-SEU_ID_AQUI" // Substitua pelo seu ID do AdSense
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

// Componentes pré-configurados para diferentes tipos de anúncios
export const AdBanner: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567890" // Substitua pelo seu slot ID
    adFormat="auto"
    adStyle={{ display: 'block' }}
    className={className}
  />
);

export const AdRectangle: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567890" // Substitua pelo seu slot ID
    adFormat="rectangle"
    adStyle={{ display: 'block', width: '300px', height: '250px' }}
    className={className}
  />
);

export const AdVertical: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567890" // Substitua pelo seu slot ID
    adFormat="vertical"
    adStyle={{ display: 'block', width: '160px', height: '600px' }}
    className={className}
  />
);
