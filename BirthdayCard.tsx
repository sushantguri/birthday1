import React, { useState, useEffect } from 'react';
import FlowerAnimation from './FlowerAnimation';
import PhotoCollage from './PhotoCollage';
import BirthdayMessage from './BirthdayMessage';
import { Music, Heart } from 'lucide-react';

interface BirthdayCardProps {
  name?: string;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ name = "Sister" }) => {
  const [showFlowers, setShowFlowers] = useState(false);
  const [showCollage, setShowCollage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const flowerTimer = setTimeout(() => {
      setShowFlowers(true);
    }, 500);
    
    return () => clearTimeout(flowerTimer);
  }, []);
  
  const handleFlowerComplete = () => {
    setShowCollage(true);
    
    setTimeout(() => {
      setShowMessage(true);
    }, 800);
  };
  
  useEffect(() => {
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/5804");
    audio.loop = true;
    audio.volume = 0.4;
    setAudioElement(audio);
    
    return () => {
      audio.pause();
    };
  }, []);
  
  const toggleMusic = () => {
    if (!audioElement) return;
    
    if (musicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(e => {
        console.log("Audio play prevented: User needs to interact with the page first");
      });
    }
    
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Background hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-pink-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Heart size={10 + Math.random() * 10} />
          </div>
        ))}
      </div>
      
      {showFlowers && <FlowerAnimation onComplete={handleFlowerComplete} />}
      
      <PhotoCollage visible={showCollage} />
      
      <BirthdayMessage visible={showMessage} name={name} />
      
      <button 
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-30 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
        aria-label={musicPlaying ? "Pause music" : "Play music"}
      >
        <Music size={24} className={`text-pink-600 ${musicPlaying ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  );
};

export default BirthdayCard;