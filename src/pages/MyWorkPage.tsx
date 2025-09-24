import React from 'react';
import PageContent from '../components/PageContent';
import ProjectCard from '../components/ProjectCard';
import ScrollAnimations from '../components/ScrollAnimations';
import { professionalProjects, personalProjects } from '../data/projects';

// Combine all projects
const allProjects = [...professionalProjects, ...personalProjects];

const MyWorkPage: React.FC = () => {
  return (
    <ScrollAnimations>
      <div className="portfolio-container">
        {/* Header Section */}
        <div className="header-section">
          <div className="text-center pt-8 md:pt-10 pb-12 md:pb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-5 scroll-animate">
              My Work
            </h1>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="py-8">
          <PageContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {allProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`scroll-animate animate-stagger-${index + 1}`}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </PageContent>
        </div>
      </div>
    </ScrollAnimations>
  );
};

export default MyWorkPage;
