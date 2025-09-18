import React from 'react';
import PageLayout from '../components/PageLayout';
import PageContent from '../components/PageContent';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import LogoLoop from '../components/LogoLoop';
import { professionalProjects, personalProjects } from '../data/projects';
import { skills } from '../data/skills';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiJavascript, SiFigma, SiStreamlit, SiHtml5, SiCss3, SiMysql, SiFirebase, SiTensorflow, SiNumpy, SiPandas, SiGithub} from 'react-icons/si';
import { SiOpenjdk } from 'react-icons/si';
// @ts-ignore
import LiquidEther from '../components/LiquidEther';

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

// Combine all projects
const allProjects = [...professionalProjects, ...personalProjects];

const MyWorkPage: React.FC = () => {
  return (
    <PageLayout className="relative bg-dark-bg overflow-hidden">
      {/* Background Liquid Ether */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 py-20 pointer-events-none">
        <PageContent>
          <div className="text-center mb-16 pointer-events-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              My Work
            </h1>
          </div>

          {/* Projects Section */}
          <div className="mb-20 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="pointer-events-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {skills.map((category) => (
                <div key={category.name} className="card">
                  <h3 className="text-xl font-bold text-white mb-4">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden h-[200px]">
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
        </PageContent>
      </div>
    </PageLayout>
  );
};


export default MyWorkPage;
