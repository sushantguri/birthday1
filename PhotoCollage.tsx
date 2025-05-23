import React, { useState, useEffect } from 'react';
import { getPlaceholderPhotos } from '../utils/photos';

interface Photo {
  id: number;
  url: string;
  rotation: number;
  scale: number;
  delay: number;
  position: {
    x: number;
    y: number;
  };
}

const PhotoCollage: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const placeholderPhotos = getPlaceholderPhotos();
    
    const photoObjects = placeholderPhotos.map((url, index) => {
      const cols = Math.ceil(Math.sqrt(placeholderPhotos.length));
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const randomOffsetX = (Math.random() - 0.5) * 5;
      const randomOffsetY = (Math.random() - 0.5) * 5;
      
      return {
        id: index,
        url,
        rotation: (Math.random() - 0.5) * 15,
        scale: 0.8 + Math.random() * 0.4,
        delay: 0.1 + index * 0.15,
        position: {
          x: (col / (cols - 1 || 1)) * 80 + 10 + randomOffsetX,
          y: (row / (Math.ceil(placeholderPhotos.length / cols) - 1 || 1)) * 70 + 15 + randomOffsetY,
        },
      };
    });
    
    setPhotos(photoObjects);
  }, []);

  return (
    <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative w-full h-full bg-gradient-to-br from-pink-50 to-purple-100">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="absolute shadow-lg rounded-lg overflow-hidden transition-all duration-1000 transform-gpu"
            style={{
              left: `${photo.position.x}%`,
              top: `${photo.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${visible ? photo.scale : 0})`,
              transitionDelay: `${photo.delay}s`,
              width: '200px',
              height: '200px',
              maxWidth: '30vw',
              maxHeight: '30vh',
              zIndex: 10 - photo.id % 10,
            }}
          >
            <img
              src={photo.url}
              alt={`Photo ${photo.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCollage;