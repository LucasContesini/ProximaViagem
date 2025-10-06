import { useLanguage } from '../contexts/LanguageContext';
import '../styles/LanguageToggle.css';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
      >
        🇧🇷 PT
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        🇺🇸 EN
      </button>
      <button
        className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        🇪🇸 ES
      </button>
    </div>
  );
};
