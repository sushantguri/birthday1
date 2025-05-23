import { AlignCenter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface BirthdayMessageProps {
  visible: boolean;
  name?: string;
}

const BirthdayMessage: React.FC<BirthdayMessageProps> = ({ visible, name = "Sister" }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  
  useEffect(() => {
    if (visible) {
      const messageTimer = setTimeout(() => {
        setShowMessage(true);
      }, 1500);
      
      const secondaryTimer = setTimeout(() => {
        setShowSecondary(true);
      }, 3000);
      
      return () => {
        clearTimeout(messageTimer);
        clearTimeout(secondaryTimer);
      };
    } else {
      setShowMessage(false);
      setShowSecondary(false);
    }
  }, [visible]);

  return (
    <div className={`fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center p-8 backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg transform transition-all duration-1000">
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-pink-600 mb-4 transition-all duration-1000 transform ${showMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          Happy Birthday, {name}!
        </h1>
        
        <div 
          className={`text-lg sm:text-xl text-purple-800 max-w-lg transition-all duration-1000 delay-300 transform ${showSecondary ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p style={{ textAlign: "center" }} className="mb-3">
          Happy Birthday to the most amazing sister anyone could ask for. You’ve been my best friend, biggest support, and constant source of love. I’m so lucky to have you. Love you always! 💖
          </p>
         
          
        </div>
      </div>
    </div>
  );
};

export default BirthdayMessage;