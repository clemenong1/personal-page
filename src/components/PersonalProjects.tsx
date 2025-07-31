import React from 'react';
import ProjectCard from './ProjectCard';
import { personalProjects } from '../data/projects';

const PersonalProjects: React.FC = () => {
  return (
    <section id="personal-projects" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Personal Projects</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Here are some of my personal projects that demonstrate my passion for coding and problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects; 