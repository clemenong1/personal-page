import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfessionalWork from './components/ProfessionalWork';
import Skills from './components/Skills';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <Hero />
        <ProfessionalWork />
        <Skills />
        <PersonalProjects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App; 