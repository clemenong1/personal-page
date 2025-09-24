import React, { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import MePage from './pages/HomePage';
import MyWorkPage from './pages/MyWorkPage';
import ContactPage from './pages/ContactPage';
import PageContent from './components/PageContent';
import SkillBadge from './components/SkillBadge';
import LogoLoop from './components/LogoLoop';
import ScrollAnimations from './components/ScrollAnimations';
import { skills } from './data/skills';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiJavascript, SiFigma, SiStreamlit, SiHtml5, SiCss3, SiMysql, SiFirebase, SiTensorflow, SiNumpy, SiPandas, SiGithub} from 'react-icons/si';
import { SiOpenjdk } from 'react-icons/si';

const techLogos = [
  { node: <SiReact className="w-16 h-16 text-blue-500" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="w-16 h-16 text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython className="w-16 h-16 text-blue-600" />, title: "Python" },
  { node: <SiOpenjdk className="w-16 h-16 text-cyan-700" />, title: "Java" },
  { node: <SiJavascript className="w-16 h-16 text-yellow-400" />, title: "JavaScript" },
  { node: <SiFigma className="w-16 h-16 text-orange-500" />, title: "Figma" },
  { node: <SiStreamlit className="w-16 h-16 text-red-500" />, title: "Streamlit" },
  { node: <SiHtml5 className="w-16 h-16 text-orange-600" />, title: "HTML5" },
  { node: <SiCss3 className="w-16 h-16 text-blue-600" />, title: "CSS3" },
  { node: <SiMysql className="w-16 h-16 text-blue-700" />, title: "SQL" },
  { node: <SiFirebase className="w-16 h-16 text-yellow-400" />, title: "Firebase" },
  { node: <SiTensorflow className="w-16 h-16 text-orange-500" />, title: "TensorFlow" },
  { node: <SiNumpy className="w-16 h-16 text-blue-900" />, title: "NumPy" },
  { node: <SiPandas className="w-16 h-16 text-indigo-900" />, title: "Pandas" },
  { node: <SiGithub className="w-16 h-16 text-gray-900" />, title: "GitHub" },
];

const sections = [
  { id: 'home', label: 'Me!' },
  { id: 'my-work', label: 'My Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

const App: React.FC = () => {
  const [active, setActive] = useState('home');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeSection = 'home';
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });
        
        if (maxRatio > 0) {
          setActive(activeSection);
        }
      },
      { 
        root: null, 
        rootMargin: '-20% 0px -20% 0px', // Only trigger when section is well in view
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9] // Multiple thresholds for better detection
      }
    );

    const container = containerRef.current;
    if (!container) return;
    const sectionEls = Array.from(container.querySelectorAll('section[id]')) as HTMLElement[];
    sectionEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Floating rounded navigation (island) */}
      <div className="fixed left-1/2 -translate-x-1/2 top-4 md:top-6 z-40">
        <nav className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-dark-border rounded-full px-3 py-2 shadow-lg shadow-black/30">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === s.id ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Scroll container with snap */}
      <main ref={containerRef} className="snap-container">
        <section id="home" className="snap-section">
          <MePage />
        </section>
        <section id="my-work" className="snap-section">
          <MyWorkPage />
        </section>
        <section id="skills" className="snap-section">
          <ScrollAnimations>
            <div className="skills-section">
              <PageContent>
                <h2 className="text-3xl font-bold text-white mb-8 text-center scroll-animate">Skills & Technologies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {skills.map((category, index) => (
                    <div 
                      key={category.name} 
                      className={`card hover-lift scroll-animate animate-stagger-${index + 1}`}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">{category.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden h-[200px] scroll-animate">
                  <LogoLoop
                    logos={techLogos}
                    speed={120}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    ariaLabel="Technology partners"
                  />
                </div>
              </PageContent>
            </div>
          </ScrollAnimations>
        </section>
        <section id="contact" className="snap-section">
          <ContactPage />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default App; 