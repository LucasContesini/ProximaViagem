import { useState, useEffect } from 'react';
import { Language } from '../i18n/translations';
import '../styles/LanguageToggle.css';

interface LanguageToggleProps {
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [currentLang, setCurrentLang] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      setCurrentLang(saved);
      onLanguageChange(saved);
    }
  }, [onLanguageChange]);

  const changeLang = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    onLanguageChange(lang);
  };

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${currentLang === 'pt' ? 'active' : ''}`}
        onClick={() => changeLang('pt')}
      >
        🇧🇷 PT
      </button>
      <button
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => changeLang('en')}
      >
        🇺🇸 EN
      </button>
      <button
        className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`}
        onClick={() => changeLang('es')}
      >
        🇪🇸 ES
      </button>
    </div>
  );
};
