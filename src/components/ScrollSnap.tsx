import React, { useEffect, useRef } from 'react';

interface ScrollSnapProps {
  children: React.ReactNode;
}

const ScrollSnap: React.FC<ScrollSnapProps> = ({ children }) => {
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      
      // Small scroll threshold (adjust as needed)
      if (Math.abs(e.deltaY) > 10) {
        isScrolling.current = true;
        
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection, e.deltaY > 0);
        
        if (nextSection) {
          nextSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Reset scrolling flag after animation
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = window.setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    const getCurrentSection = (): Element | null => {
      const sections = document.querySelectorAll('.hero-section, .professional-work-section, .scroll-snap-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop <= scrollPosition) {
          return section;
        }
      }
      return sections[0];
    };

    const getNextSection = (currentSection: Element | null, scrollDown: boolean): Element | null => {
      if (!currentSection) return null;
      
      const sections = Array.from(document.querySelectorAll('.hero-section, .professional-work-section, .scroll-snap-section'));
      const currentIndex = sections.indexOf(currentSection);
      
      if (scrollDown && currentIndex < sections.length - 1) {
        return sections[currentIndex + 1];
      } else if (!scrollDown && currentIndex > 0) {
        return sections[currentIndex - 1];
      }
      
      return null;
    };

    // Add event listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollSnap; 