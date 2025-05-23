import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  color: string;
  delay: number;
  opacity: number;
}

const colors = [
  '#FFD1DC', // Light pink
  '#FFB6C1', // Pink
  '#FFC0CB', // Pink
  '#F8C8DC', // Cotton candy
  '#FFCCFF', // Light purple
  '#E6E6FA', // Lavender
  '#D8BFD8', // Thistle
  '#CCCCFF', // Periwinkle
];

const FlowerAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationRef = useRef<number>(0);
  const completedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    const hearts: Heart[] = [];
    const heartCount = Math.max(30, Math.floor(containerWidth * containerHeight / 20000));
    
    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        id: i,
        x: (containerWidth / 2) + (Math.random() - 0.5) * containerWidth * 0.8,
        y: containerHeight + 50 + Math.random() * 300, // Start below viewport
        size: 15 + Math.random() * 25,
        rotation: Math.random() * 360,
        speed: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        opacity: 0.7 + Math.random() * 0.3,
      });
    }
    
    heartsRef.current = hearts;
    
    animateHearts();
    
    const timer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 6000);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timer);
    };
  }, [onComplete]);
  
  const animateHearts = () => {
    if (!containerRef.current) return;
    
    let allHeartsAbove = true;
    
    heartsRef.current = heartsRef.current.map(heart => {
      if (heart.delay > 0) {
        heart.delay -= 0.016;
        allHeartsAbove = false;
        return heart;
      }
      
      heart.y -= heart.speed;
      heart.x += Math.sin(heart.y / 50) * 0.5;
      heart.rotation += 0.2 * heart.speed;
      
      if (heart.y > -100) {
        allHeartsAbove = false;
      }
      
      return heart;
    });
    
    containerRef.current.innerHTML = '';
    renderHearts();
    
    if (allHeartsAbove && !completedRef.current) {
      completedRef.current = true;
      onComplete();
      return;
    }
    
    animationRef.current = requestAnimationFrame(animateHearts);
  };
  
  const renderHearts = () => {
    if (!containerRef.current) return;
    
    heartsRef.current.forEach(heart => {
      if (heart.delay > 0) return;
      
      const heartElement = document.createElement('div');
      heartElement.className = 'absolute transition-transform';
      heartElement.style.left = `${heart.x}px`;
      heartElement.style.top = `${heart.y}px`;
      heartElement.style.transform = `rotate(${heart.rotation}deg)`;
      heartElement.style.opacity = heart.opacity.toString();
      heartElement.style.color = heart.color;
      
      const heartIcon = document.createElement('div');
      heartIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${heart.size}" height="${heart.size}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      heartElement.appendChild(heartIcon);
      
      containerRef.current.appendChild(heartElement);
    });
  };

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" ref={containerRef}>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-pink-500 opacity-30">
        <Heart size={32} className="animate-pulse" />
        <Heart size={48} className="ml-8 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Heart size={40} className="ml-16 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default FlowerAnimation;