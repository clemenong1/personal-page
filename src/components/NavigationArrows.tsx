import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const NavigationArrows: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [canGoUp, setCanGoUp] = useState(false);
  const [canGoDown, setCanGoDown] = useState(true);

  const sections = [
    '.hero-section',
    '.professional-work-section', 
    '.skills-section',
    '.personal-projects-section',
    '.education-section',
    '.contact-section'
  ];

  useEffect(() => {
    const updateNavigation = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentIndex = 0;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]) as HTMLElement;
        if (section && section.offsetTop <= scrollPosition) {
          currentIndex = i;
          break;
        }
      }
      
      setCurrentSection(currentIndex);
      setCanGoUp(currentIndex > 0);
      setCanGoDown(currentIndex < sections.length - 1);
    };

    window.addEventListener('scroll', updateNavigation);
    updateNavigation(); // Initial call

    return () => window.removeEventListener('scroll', updateNavigation);
  }, []);

  const navigateToSection = (direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? currentSection - 1 : currentSection + 1;
    const targetSection = document.querySelector(sections[targetIndex]) as HTMLElement;
    
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      <button
        onClick={() => navigateToSection('up')}
        disabled={!canGoUp}
        className={`
          w-10 h-10 rounded-full border border-gray-600 
          flex items-center justify-center transition-all duration-300
          hover:border-accent-blue hover:bg-accent-blue/10
          ${canGoUp 
            ? 'text-gray-300 hover:text-white cursor-pointer' 
            : 'text-gray-600 cursor-not-allowed opacity-50'
          }
        `}
        aria-label="Navigate to previous section"
      >
        <FaChevronUp size={14} />
      </button>
      
      <button
        onClick={() => navigateToSection('down')}
        disabled={!canGoDown}
        className={`
          w-10 h-10 rounded-full border border-gray-600 
          flex items-center justify-center transition-all duration-300
          hover:border-accent-blue hover:bg-accent-blue/10
          ${canGoDown 
            ? 'text-gray-300 hover:text-white cursor-pointer' 
            : 'text-gray-600 cursor-not-allowed opacity-50'
          }
        `}
        aria-label="Navigate to next section"
      >
        <FaChevronDown size={14} />
      </button>
    </div>
  );
};

export default NavigationArrows; 