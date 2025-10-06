import React from 'react';
import '../styles/Error.css';

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Ops! Algo deu errado</h2>
      <p>{message}</p>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Tentar Novamente
      </button>
    </div>
  );
};

