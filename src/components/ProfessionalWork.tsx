import React from 'react';
import ProjectCard from './ProjectCard';
import { professionalProjects } from '../data/projects';

const ProfessionalWork: React.FC = () => {
  return (
    <section id="professional-work" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Professional Work</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Here are some of the key projects and experiences that showcase my technical skills and leadership abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {professionalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalWork; 