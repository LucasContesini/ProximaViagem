import { useState } from 'react';
import '../styles/CuisineDropdown.css';

interface CuisineDropdownProps {
  dishes: string[];
  destinationName: string;
}

export const CuisineDropdown: React.FC<CuisineDropdownProps> = ({ dishes, destinationName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Função para gerar URL de imagem do Unsplash baseada no nome do prato
  const getImageUrl = (dish: string) => {
    const searchTerm = encodeURIComponent(`${dish} food`);
    return `https://source.unsplash.com/400x300/?${searchTerm}`;
  };

  return (
    <div className="cuisine-dropdown-container">
      {dishes.map((dish, index) => (
        <div key={index} className="cuisine-item">
          <button
            className={`cuisine-header ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleDropdown(index)}
          >
            <span className="cuisine-name">🍽️ {dish}</span>
            <span className="cuisine-arrow">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          
          {openIndex === index && (
            <div className="cuisine-content">
              <img
                src={getImageUrl(dish)}
                alt={dish}
                className="cuisine-image"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`;
                }}
              />
              <p className="cuisine-description">
                Experimente este prato típico de {destinationName}!
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
