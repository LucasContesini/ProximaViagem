import React from 'react';
import '../styles/Loading.css';

export const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="plane">✈️</div>
      </div>
      <p className="loading-text">Preparando sua próxima aventura...</p>
    </div>
  );
};

