import React from 'react';

interface SkillBadgeProps {
  skill: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <span className="inline-block px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent-blue hover:border-accent-blue hover:scale-105">
      {skill}
    </span>
  );
};

export default SkillBadge; 