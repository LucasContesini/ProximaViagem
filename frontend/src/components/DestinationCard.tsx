import React from 'react';
import { Destination } from '../types';
import '../styles/DestinationCard.css';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="destination-card">
      <div className="card-image-container">
        <img 
          src={destination.imageUrl} 
          alt={destination.name}
          className="card-image"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
          }}
        />
        <div className="card-overlay">
          <h2 className="destination-name">{destination.name}</h2>
          <p className="destination-country">📍 {destination.country}</p>
        </div>
      </div>
      
      <div className="card-content">
        <div className="section">
          <p className="description">{destination.description}</p>
        </div>

        <div className="section">
          <h3 className="section-title">🎯 Principais Atrações</h3>
          <ul className="list">
            {destination.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3 className="section-title">💡 Dicas de Viagem</h3>
          <ul className="list">
            {destination.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="best-time">
          <span className="best-time-icon">🌤️</span>
          <div>
            <strong>Melhor Época:</strong>
            <p>{destination.bestTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

