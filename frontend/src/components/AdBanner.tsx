import React, { useEffect } from 'react';
import '../styles/AdBanner.css';

interface AdBannerProps {
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  useEffect(() => {
    try {
      // Inicializar o anúncio do Google AdSense
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense initialization error:', error);
    }
  }, []);

  return (
    <div className={`ad-banner-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1841551118944574"
        data-ad-slot="5339200668"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};