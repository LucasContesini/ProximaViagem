import { useState, useEffect } from 'react';
import { Destination } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/FavoritesList.css';

interface FavoritesListProps {
  onSelectDestination: (destination: Destination) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ onSelectDestination }) => {
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      loadFavorites();
    }
  }, [isOpen]);

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('favorite-destinations');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = favorites.filter(fav => fav.id !== id);
      setFavorites(updated);
      localStorage.setItem('favorite-destinations', JSON.stringify(updated));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const handleSelect = (destination: Destination) => {
    onSelectDestination(destination);
    setIsOpen(false);
    
    // Scroll para o início da página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <button 
        className="favorites-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.buttons.favorites}
      >
        ⭐ {t.buttons.favorites} {favorites.length > 0 && `(${favorites.length})`}
      </button>

      {isOpen && (
        <div className="favorites-modal" onClick={() => setIsOpen(false)}>
          <div className="favorites-content" onClick={(e) => e.stopPropagation()}>
            <div className="favorites-header">
              <h2>⭐ {t.sections.myFavorites}</h2>
              <button 
                className="favorites-close"
                onClick={() => setIsOpen(false)}
                aria-label={t.buttons.close}
              >
                ✕
              </button>
            </div>

            {favorites.length === 0 ? (
              <div className="favorites-empty">
                <div className="empty-icon">💔</div>
                <h3>{t.messages.noFavorites}</h3>
                <p>{t.messages.addFavorites}</p>
              </div>
            ) : (
              <div className="favorites-list">
                {favorites.map((dest) => (
                  <div 
                    key={dest.id}
                    className="favorites-item"
                    onClick={() => handleSelect(dest)}
                  >
                    <div className="favorites-item-image">
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400';
                        }}
                      />
                    </div>
                    <div className="favorites-item-info">
                      <h3 className="favorites-item-name">{dest.name}</h3>
                      <p className="favorites-item-country">📍 {dest.country}</p>
                      <p className="favorites-item-description">
                        {dest.description.substring(0, 80)}...
                      </p>
                    </div>
                    <button
                      className="favorites-remove"
                      onClick={(e) => removeFavorite(dest.id, e)}
                      aria-label="Remover dos favoritos"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
