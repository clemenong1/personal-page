import React from 'react';
import SkillBadge from './SkillBadge';
import LogoLoop from './LogoLoop';
import { skills } from '../data/skills';
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

const AboutSection: React.FC = () => {
  return (
    <div className="container">
      <div className="about-content">
        <h2>About Me</h2>
        <p className="about-description">
          I'm a passionate software engineer with a love for building impactful technology. 
          My journey spans across mobile development, machine learning, and full-stack applications. 
          I enjoy solving complex problems and creating solutions that make a real difference.
        </p>
        
        <div className="skills-section">
          <h3>Skills & Technologies</h3>
          <div className="skills-grid">
            {skills.map((category) => (
              <div key={category.name} className="skill-category">
                <h4>{category.name}</h4>
                <div className="skill-badges">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-logos-section">
          <h3>Technologies I Work With</h3>
          <div className="tech-logos-container">
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
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
