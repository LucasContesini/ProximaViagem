import React from 'react';
import '../styles/BackendStatus.css';

interface BackendStatusProps {
  isOnline: boolean;
  lastUpdate: Date | null;
  onRefresh?: () => void;
}

export const BackendStatus: React.FC<BackendStatusProps> = ({ 
  isOnline, 
  lastUpdate, 
  onRefresh 
}) => {
  const formatLastUpdate = (date: Date | null): string => {
    if (!date) return 'Nunca';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes} min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`backend-status ${isOnline ? 'online' : 'offline'}`}>
      <div className="status-indicator">
        <div className="status-dot"></div>
        <span className="status-text">
          {isOnline ? '🟢 Backend Online' : '🟡 Usando Cache'}
        </span>
      </div>
      
      <div className="status-details">
        <span className="last-update">
          Última atualização: {formatLastUpdate(lastUpdate)}
        </span>
        
        {!isOnline && (
          <div className="offline-info">
            <span className="offline-text">
              🔄 Tentando reconectar automaticamente...
            </span>
          </div>
        )}
        
        {onRefresh && (
          <button 
            className="refresh-button"
            onClick={onRefresh}
            title="Forçar atualização"
          >
            🔄 Atualizar
          </button>
        )}
      </div>
    </div>
  );
};
