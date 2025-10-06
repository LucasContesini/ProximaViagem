import { Destination } from '../types';
import '../styles/MapButton.css';

interface MapButtonProps {
  destination: Destination;
}

export const MapButton: React.FC<MapButtonProps> = ({ destination }) => {
  const openInGoogleMaps = () => {
    const query = encodeURIComponent(`${destination.name}, ${destination.country}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      className="map-button"
      onClick={openInGoogleMaps}
      aria-label="Ver no Google Maps"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      Ver no Google Maps
    </button>
  );
};
