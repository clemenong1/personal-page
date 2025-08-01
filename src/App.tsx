import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfessionalWork from './components/ProfessionalWork';
import Skills from './components/Skills';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollSnap from './components/ScrollSnap';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <ScrollSnap>
        <main>
          <div className="hero-section">
            <Hero />
          </div>
          <div className="professional-work-section">
            <ProfessionalWork />
          </div>
          <div className="scroll-snap-section">
            <Skills />
          </div>
          <div className="scroll-snap-section">
            <PersonalProjects />
          </div>
          <div className="scroll-snap-section">
            <Education />
          </div>
          <div className="scroll-snap-section">
            <Contact />
          </div>
        </main>
      </ScrollSnap>
      <Footer />
    </div>
  );
};

export default App; 