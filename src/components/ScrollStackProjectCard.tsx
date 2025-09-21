import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Project } from '../data/projects';

interface ScrollStackProjectCardProps {
  project: Project;
}

const ScrollStackProjectCard: React.FC<ScrollStackProjectCardProps> = ({ project }) => {
  // Define unique background gradients for each project
  const getProjectBackground = (projectId: string) => {
    switch (projectId) {
      case 'nus-orbital':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
      case 'nus-lifehack':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)';
      case 'maritime-hackathon':
        return 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ff6b6b 100%)';
      case 'dsta-brainhack':
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  // Define category tags for each project
  const getCategoryTag = (projectId: string) => {
    switch (projectId) {
      case 'nus-orbital':
        return 'Mobile Development';
      case 'nus-lifehack':
        return 'Health Tech';
      case 'maritime-hackathon':
        return 'Machine Learning';
      case 'dsta-brainhack':
        return 'Cybersecurity';
      default:
        return 'Development';
    }
  };

  const backgroundStyle = {
    background: getProjectBackground(project.id),
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{
        ...backgroundStyle,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        contain: 'layout style paint',
        isolation: 'isolate',
        transition: 'none'
      }}
    >
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-12">
        {/* Top Section */}
        <div className="flex flex-col space-y-6">
          {/* Category Tag */}
          <div className="inline-flex">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
              {getCategoryTag(project.id)}
            </span>
          </div>

          {/* Project Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {project.title}
          </h2>

          {/* Date */}
          <p className="text-white/80 text-lg font-medium">
            {project.date}
          </p>
        </div>

        {/* Middle Section - Description */}
        <div className="flex-1 flex items-center">
          <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col space-y-6">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <span>View Demo</span>
                <FaExternalLinkAlt size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <span>GitHub</span>
                <FaGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg" />
    </div>
  );
};

export default ScrollStackProjectCard;
