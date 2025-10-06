import React, { useState } from 'react';
import { Destination } from '../types';
import { ShareButtons } from './ShareButtons';
import { FavoriteButton } from './FavoriteButton';
import { MapButton } from './MapButton';
import '../styles/DestinationCard.css';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    : [destination.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="destination-card">
      <div className="card-image-container">
        <img 
          src={images[currentImageIndex]} 
          alt={`${destination.name} - ${currentImageIndex + 1}`}
          className="card-image"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
          }}
        />
        {images.length > 1 && (
          <>
            <button className="image-nav prev" onClick={prevImage} aria-label="Imagem anterior">
              ‹
            </button>
            <button className="image-nav next" onClick={nextImage} aria-label="Próxima imagem">
              ›
            </button>
            <div className="image-indicators">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
        <div className="card-overlay">
          <h2 className="destination-name">{destination.name}</h2>
          <p className="destination-country">📍 {destination.country}</p>
        </div>
      </div>
      
      <div className="card-content">
        <div className="section">
          <p className="description">{destination.description}</p>
        </div>

        {destination.detailedInfo && (
          <div className="section detailed-info">
            <h3 className="section-title">📖 Sobre o Destino</h3>
            <p className="detailed-text">{destination.detailedInfo}</p>
          </div>
        )}

        <div className="section">
          <h3 className="section-title">🎯 Principais Atrações</h3>
          <div className="attractions-grid">
            {destination.attractions.map((attraction, index) => (
              <div key={index} className="attraction-card">
                <h4 className="attraction-name">{attraction.name}</h4>
                <p className="attraction-description">{attraction.description}</p>
                <div className="attraction-details">
                  <span className="attraction-detail">
                    ⏱️ {attraction.duration}
                  </span>
                  <span className="attraction-detail">
                    💰 {attraction.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">💡 Dicas de Viagem</h3>
          <ul className="list tips-list">
            {destination.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {destination.budget && (
          <div className="section budget-section">
            <h3 className="section-title">💵 Orçamento Estimado</h3>
            <div className="budget-grid">
              <div className="budget-item">
                <span className="budget-label">💚 Econômico</span>
                <p className="budget-text">{destination.budget.low}</p>
              </div>
              <div className="budget-item">
                <span className="budget-label">💛 Médio</span>
                <p className="budget-text">{destination.budget.medium}</p>
              </div>
              <div className="budget-item">
                <span className="budget-label">💙 Confortável</span>
                <p className="budget-text">{destination.budget.high}</p>
              </div>
            </div>
          </div>
        )}

        {destination.transportation && (
          <div className="section">
            <h3 className="section-title">🚗 Como Chegar e Se Locomover</h3>
            <p className="info-text">{destination.transportation}</p>
          </div>
        )}

        {destination.accommodation && (
          <div className="section">
            <h3 className="section-title">🏨 Onde Se Hospedar</h3>
            <p className="info-text">{destination.accommodation}</p>
          </div>
        )}

        {destination.localCuisine && destination.localCuisine.length > 0 && (
          <div className="section">
            <h3 className="section-title">🍽️ Gastronomia Local</h3>
            <ul className="list cuisine-list">
              {destination.localCuisine.map((dish, index) => (
                <li key={index}>{dish}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="best-time">
          <span className="best-time-icon">🌤️</span>
          <div>
            <strong>Melhor Época:</strong>
            <p>{destination.bestTime}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          <FavoriteButton destination={destination} />
          <MapButton destination={destination} />
        </div>

        <ShareButtons destination={destination} />
      </div>
    </div>
  );
};

