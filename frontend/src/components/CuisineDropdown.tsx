import { useState } from 'react';
import { CuisineDish } from '../types';
import '../styles/CuisineDropdown.css';

interface CuisineDropdownProps {
  dishes: CuisineDish[] | string[];
}

export const CuisineDropdown: React.FC<CuisineDropdownProps> = ({ dishes }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Normalizar dados para suportar formato antigo (string[]) e novo (CuisineDish[])
  const normalizedDishes: CuisineDish[] = dishes.map((dish) => {
    if (typeof dish === 'string') {
      // Formato antigo: apenas string
      return {
        name: dish,
        description: 'Prato típico da região',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'
      };
    }
    // Formato novo: já é um objeto CuisineDish
    return dish;
  });

  return (
    <div className="cuisine-dropdown-container">
      {normalizedDishes.map((dish, index) => (
        <div key={index} className="cuisine-item">
          <button
            className={`cuisine-header ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleDropdown(index)}
          >
            <span className="cuisine-name">🍽️ {dish.name}</span>
            <span className="cuisine-arrow">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          
          {openIndex === index && (
            <div className="cuisine-content">
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="cuisine-image"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`;
                }}
              />
              <p className="cuisine-description">
                {dish.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
