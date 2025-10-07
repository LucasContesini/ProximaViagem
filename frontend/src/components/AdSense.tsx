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
      data-ad-client="ca-pub-1841551118944574"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

// Componentes pré-configurados para diferentes tipos de anúncios
// Temporariamente desabilitados até ter slots válidos do Google AdSense
export const AdBanner: React.FC<{ className?: string }> = () => {
  // AdSense temporariamente desabilitado - aguardando slots válidos
  return null;
};

export const AdRectangle: React.FC<{ className?: string }> = () => {
  // AdSense temporariamente desabilitado - aguardando slots válidos
  return null;
};

export const AdVertical: React.FC<{ className?: string }> = () => {
  // AdSense temporariamente desabilitado - aguardando slots válidos
  return null;
};
