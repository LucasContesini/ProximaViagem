import { useRef } from 'react';
import { Destination } from '../types';
import '../styles/ShareCard.css';

interface ShareCardProps {
  destination: Destination;
}

export const ShareCard: React.FC<ShareCardProps> = ({ destination }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      // Usar html2canvas se disponível, senão abrir em nova janela
      const card = cardRef.current;
      const dataUrl = card.outerHTML;
      
      // Criar blob e download
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 20px; background: #f0f0f0; font-family: Arial, sans-serif; }
            .share-card-preview { margin: 0 auto; }
          </style>
        </head>
        <body>${dataUrl}</body>
        </html>
      `], { type: 'text/html' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${destination.name.replace(/\s/g, '_')}_ProximaViagem.html`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar card:', error);
      alert('Tire um screenshot do card abaixo para compartilhar!');
    }
  };

  return (
    <div className="share-card-container">
      <button onClick={downloadCard} className="download-card-btn">
        📸 Baixar Card para Compartilhar
      </button>
      
      <div ref={cardRef} className="share-card-preview">
        <div className="share-card-header">
          <h2>🌍 Próxima Viagem</h2>
          <p>Seu destino diário</p>
        </div>
        
        <div className="share-card-image">
          <img src={destination.imageUrl} alt={destination.name} />
        </div>
        
        <div className="share-card-content">
          <h3>{destination.name}</h3>
          <p className="share-card-country">📍 {destination.country}</p>
          <p className="share-card-description">
            {destination.description.substring(0, 150)}...
          </p>
          
          <div className="share-card-footer">
            <span>✈️ {destination.bestTime.substring(0, 30)}...</span>
            <span className="share-card-url">proximaviagem.app</span>
          </div>
        </div>
      </div>
      
      <p className="share-card-hint">💡 Dica: Tire um screenshot do card acima!</p>
    </div>
  );
};
