import React from 'react';
import BirthdayCard from './components/BirthdayCard';

function App() {
  
  const sisterName = " to the most amazing sister anyone could ask for 💖";

  return (
    <div className="min-h-screen w-full">
      <BirthdayCard name={sisterName} />
    </div>
  );
}

export default App;