import { useState, useEffect } from 'react';
import { Destination } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { trackFavoriteAction } from '../utils/googleAds';
import '../styles/FavoriteButton.css';

interface FavoriteButtonProps {
  destination: Destination;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ destination }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    checkIfFavorite();
  }, [destination.id]);

  const checkIfFavorite = () => {
    try {
      const favorites = localStorage.getItem('favorite-destinations');
      if (favorites) {
        const favArray: Destination[] = JSON.parse(favorites);
        setIsFavorite(favArray.some(fav => fav.id === destination.id));
      }
    } catch (error) {
      console.error('Erro ao verificar favoritos:', error);
    }
  };

  const toggleFavorite = () => {
    try {
      const favorites = localStorage.getItem('favorite-destinations');
      let favArray: Destination[] = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remover dos favoritos
        favArray = favArray.filter(fav => fav.id !== destination.id);
        setIsFavorite(false);
      } else {
        // Adicionar aos favoritos
        favArray.unshift(destination);
        setIsFavorite(true);
        // Track favorite action
        trackFavoriteAction(destination.name);
      }

      localStorage.setItem('favorite-destinations', JSON.stringify(favArray));
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? t.buttons.removeFavorite : t.buttons.addFavorite}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>{isFavorite ? t.buttons.favorited : t.buttons.favorite}</span>
    </button>
  );
};
