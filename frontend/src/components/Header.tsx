import React from 'react';
import '../styles/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <h1>Próxima Viagem</h1>
        </div>
        <p className="tagline">Descubra seu próximo destino todos os dias</p>
      </div>
      <div className="header-wave"></div>
    </header>
  );
};

