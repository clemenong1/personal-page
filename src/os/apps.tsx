import { Mail, MapPin, Rocket, Sparkles, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  SiCss3,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPython,
  SiReact,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import ContactForm from '../components/ContactForm';
import LogoLoop from '../components/LogoLoop';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import type { AppId } from '../data/intros';
import { profile } from '../data/profile';
import { personalProjects, professionalProjects } from '../data/projects';
import { skills } from '../data/skills';

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const APPS: AppDefinition[] = [
  { id: 'about', label: 'About me', icon: User, color: '#ffc857' },
  { id: 'work', label: 'My work', icon: Rocket, color: '#7ee06a' },
  { id: 'skills', label: 'Skills', icon: Sparkles, color: '#6aa8ff' },
  { id: 'contact', label: 'Contact', icon: Mail, color: '#ff7a6b' },
];

const allProjects = [...professionalProjects, ...personalProjects];

const techLogos = [
  { node: <SiReact className="text-sky-400" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs className="text-white" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript className="text-blue-400" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss className="text-cyan-300" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiPython className="text-yellow-300" />, title: 'Python' },
  { node: <SiOpenjdk className="text-orange-300" />, title: 'Java' },
  { node: <SiJavascript className="text-yellow-400" />, title: 'JavaScript' },
  { node: <SiFigma className="text-pink-400" />, title: 'Figma' },
  { node: <SiStreamlit className="text-red-400" />, title: 'Streamlit' },
  { node: <SiHtml5 className="text-orange-500" />, title: 'HTML5' },
  { node: <SiCss3 className="text-blue-400" />, title: 'CSS3' },
  { node: <SiMysql className="text-sky-300" />, title: 'SQL' },
  { node: <SiFirebase className="text-yellow-400" />, title: 'Firebase' },
  { node: <SiTensorflow className="text-orange-400" />, title: 'TensorFlow' },
  { node: <SiNumpy className="text-sky-300" />, title: 'NumPy' },
  { node: <SiPandas className="text-indigo-300" />, title: 'Pandas' },
  { node: <SiGithub className="text-white" />, title: 'GitHub' },
];

function AboutApp() {
  return (
    <div className="grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-center">
      <div>
        <p className="app-eyebrow">
          <MapPin size={14} /> {profile.location}
        </p>
        <h2 className="app-title">Hi, I'm Clemen.</h2>
        <p className="app-lead">{profile.about}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.highlights.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          {profile.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <social.icon size={15} /> {social.name}
            </a>
          ))}
        </div>
      </div>
      <div className="about-photo">
        <img src="/images/profile-bg.jpg" alt="Clemen Ong" />
      </div>
    </div>
  );
}

function WorkApp() {
  return (
    <div>
      <h2 className="app-title">My work</h2>
      <p className="app-lead">Projects and hackathon builds, newest first.</p>
      <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function SkillsApp() {
  return (
    <div>
      <h2 className="app-title">Skills & technologies</h2>
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        {skills.map((category) => (
          <div key={category.name} className="card">
            <h3 className="mb-4 text-lg font-semibold text-white">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-8 h-[96px] overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={40}
          gap={44}
          pauseOnHover
          scaleOnHover
          ariaLabel="Technologies I work with"
        />
      </div>
    </div>
  );
}

function ContactApp() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="app-title">Let's connect!</h2>
      <p className="app-lead">Send a note with the form, or reach me directly.</p>
      <div className="mt-7">
        <ContactForm />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="card block">
          <span className="app-eyebrow">
            <Mail size={14} /> Email
          </span>
          <span className="mt-1 block break-all text-white">{profile.email}</span>
        </a>
        <div className="card">
          <span className="app-eyebrow">
            <MapPin size={14} /> Location
          </span>
          <span className="mt-1 block text-white">{profile.location}</span>
        </div>
      </div>
    </div>
  );
}

export function AppContent({ id }: { id: AppId }) {
  switch (id) {
    case 'about':
      return <AboutApp />;
    case 'work':
      return <WorkApp />;
    case 'skills':
      return <SkillsApp />;
    case 'contact':
      return <ContactApp />;
  }
}
