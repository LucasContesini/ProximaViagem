import { useState, useEffect } from 'react';
import { Destination } from '../types';
import '../styles/DestinationHistory.css';

interface DestinationHistoryProps {
  onSelectDestination: (destination: Destination) => void;
}

export const DestinationHistory: React.FC<DestinationHistoryProps> = ({ onSelectDestination }) => {
  const [history, setHistory] = useState<Destination[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('destination-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.slice(0, 7)); // Últimos 7 dias
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }
  };

  const handleSelect = (destination: Destination) => {
    onSelectDestination(destination);
    setIsOpen(false);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <>
      <button 
        className="history-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ver histórico de destinos"
      >
        📅 Histórico ({history.length})
      </button>

      {isOpen && (
        <div className="history-modal" onClick={() => setIsOpen(false)}>
          <div className="history-content" onClick={(e) => e.stopPropagation()}>
            <div className="history-header">
              <h2>📅 Destinos Anteriores</h2>
              <button 
                className="history-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="history-list">
              {history.map((dest) => (
                <div 
                  key={dest.id}
                  className="history-item"
                  onClick={() => handleSelect(dest)}
                >
                  <div className="history-item-image">
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400';
                      }}
                    />
                  </div>
                  <div className="history-item-info">
                    <div className="history-item-date">
                      {formatDate(dest.date)}
                    </div>
                    <h3 className="history-item-name">{dest.name}</h3>
                    <p className="history-item-country">📍 {dest.country}</p>
                    <p className="history-item-description">
                      {dest.description.substring(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
