import React from 'react';
import SkillBadge from './SkillBadge';
import { skills } from '../data/skills';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to create innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default Skills; 