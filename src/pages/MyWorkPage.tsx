import React from 'react';
import PageLayout from '../components/PageLayout';
import PageContent from '../components/PageContent';
import SkillBadge from '../components/SkillBadge';
import LogoLoop from '../components/LogoLoop';
// @ts-ignore
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import ScrollStackProjectCard from '../components/ScrollStackProjectCard';
import { professionalProjects, personalProjects } from '../data/projects';
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

// Combine all projects
const allProjects = [...professionalProjects, ...personalProjects];

const MyWorkPage: React.FC = () => {
  return (
    <PageLayout className="relative bg-dark-bg overflow-hidden">
      {/* Foreground Content */}
      <div className="relative z-10 flex-1">
        {/* Header */}
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Work
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.
          </p>
        </div>

        {/* ScrollStack Projects Section */}
        <div>
          <ScrollStack
            useWindowScroll={true}
            itemDistance={100}
            itemScale={0.03}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.85}
            rotationAmount={0}
            blurAmount={0}
          >
            {allProjects.map((project) => (
              <ScrollStackItem key={project.id}>
                <ScrollStackProjectCard project={project} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Skills Section */}
        <div className="py-20">
          <PageContent>
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
          </PageContent>
        </div>
      </div>
    </PageLayout>
  );
};


export default MyWorkPage;
