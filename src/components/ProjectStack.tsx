import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Project } from '../data/projects';

interface ProjectStackProps {
  projects: Project[];
}

const ProjectStack: React.FC<ProjectStackProps> = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpanded = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {projects.map((project) => {
          const isExpanded = expandedProject === project.id;
          
          return (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-border/50 to-dark-border/30 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-accent-blue/50 hover:shadow-2xl hover:shadow-accent-blue/20"
              style={{
                transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                zIndex: isExpanded ? 10 : 1,
              }}
            >
              {/* Project Preview */}
              <div 
                className="relative cursor-pointer"
                onClick={() => toggleExpanded(project.id)}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white opacity-60">
                        {project.title.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-3">
                          {project.date}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs text-white rounded-full border border-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs text-white rounded-full border border-white/30">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Expand Button */}
                      <div className="ml-4 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-accent-blue/30 group-hover:border-accent-blue/50">
                          {isExpanded ? (
                            <FaChevronUp className="text-white text-lg" />
                          ) : (
                            <FaChevronDown className="text-white text-lg" />
                          )}
                        </div>
                        <span className="text-xs text-gray-300">
                          {isExpanded ? 'Less' : 'More'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 bg-gradient-to-br from-dark-bg/90 to-dark-border/50 backdrop-blur-sm">
                  {/* Full Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">About This Project</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Full Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 text-sm text-white rounded-lg border border-accent-blue/30 hover:border-accent-blue/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-blue-600 text-white rounded-lg font-medium hover:from-accent-blue/80 hover:to-blue-600/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/30"
                      >
                        <FaExternalLinkAlt size={14} />
                        View Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <FaGithub size={14} />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectStack;
