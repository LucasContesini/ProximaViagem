import { useState } from 'react';
import '../styles/ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, name }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const next = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Carrossel Principal */}
      <div className="image-carousel">
        <div className="carousel-main" onClick={openLightbox}>
          <img src={images[currentIndex]} alt={`${name} ${currentIndex + 1}`} />
          <div className="carousel-hint">🔍 Clique para ampliar</div>
        </div>
        
        {images.length > 1 && (
          <>
            <button className="carousel-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
              ‹
            </button>
            <button className="carousel-next" onClick={(e) => { e.stopPropagation(); next(); }}>
              ›
            </button>
            
            {/* Indicadores de slide */}
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); goToSlide(idx); }}
                  aria-label={`Ir para imagem ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox para visualização ampliada */}
      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button 
            className="lightbox-close" 
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          >
            ✕
          </button>
          
          {images.length > 1 && (
            <>
              <button 
                className="lightbox-prev" 
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                ‹
              </button>
              <button 
                className="lightbox-next" 
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                ›
              </button>
            </>
          )}
          
          <img 
            src={images[currentIndex]} 
            alt={name} 
            onClick={(e) => e.stopPropagation()} 
          />
          
          {images.length > 1 && (
            <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
          )}
        </div>
      )}
    </>
  );
};