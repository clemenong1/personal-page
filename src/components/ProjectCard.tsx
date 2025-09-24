import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card group h-full flex flex-col hover-lift">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-dark-border">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${project.image ? 'hidden' : ''}`}>
          <span className="text-2xl font-bold text-white opacity-60">
            {project.title.split(' ').map(word => word[0]).join('')}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex flex-col flex-grow space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-400">
          {project.date}
        </p>
        
        <p className="text-gray-300 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-border text-xs text-gray-300 rounded-md hover-scale transition-transform duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 mt-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm hover-scale"
            >
              Demo <FaExternalLinkAlt size={12} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm hover-scale"
            >
              GitHub <FaGithub size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
