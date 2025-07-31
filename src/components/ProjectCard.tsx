import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card group">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-dark-border">
        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-white opacity-60">
            {project.title.split(' ').map(word => word[0]).join('')}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-400">
          {project.date}
        </p>
        
        <p className="text-gray-300 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-border text-xs text-gray-300 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              Demo <FaExternalLinkAlt size={12} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm"
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