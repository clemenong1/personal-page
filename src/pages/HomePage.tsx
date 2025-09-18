import React from 'react';
import Hero from '../components/Hero';

const MePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="hero-section h-screen">
        <Hero />
      </div>
    </div>
  );
};

export default MePage;
