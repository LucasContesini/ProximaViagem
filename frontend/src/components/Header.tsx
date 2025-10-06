import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <h1>{t.header.title}</h1>
        </div>
        <p className="tagline">{t.header.subtitle}</p>
      </div>
      <div className="header-wave"></div>
    </header>
  );
};

