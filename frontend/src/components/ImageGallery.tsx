import { useState } from 'react';
import '../styles/ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, name }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const next = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <>
      <div className="image-gallery-grid">
        {images.slice(0, 4).map((img, idx) => (
          <div key={idx} className="gallery-item" onClick={() => openLightbox(idx)}>
            <img src={img} alt={`${name} ${idx + 1}`} />
            {idx === 3 && images.length > 4 && (
              <div className="more-overlay">+{images.length - 4}</div>
            )}
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <img src={images[currentIndex]} alt={name} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
          <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
};
