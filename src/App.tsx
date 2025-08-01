import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfessionalWork from './components/ProfessionalWork';
import Skills from './components/Skills';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NavigationArrows from './components/NavigationArrows';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <NavigationArrows />
      <main>
        <div className="hero-section">
          <Hero />
        </div>
        <div className="professional-work-section">
          <ProfessionalWork />
        </div>
        <div className="skills-section">
          <Skills />
        </div>
        <div className="personal-projects-section">
          <PersonalProjects />
        </div>
        <div className="education-section">
          <Education />
        </div>
        <div className="contact-section">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App; 