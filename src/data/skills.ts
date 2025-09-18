export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript']
  },
  {
    name: 'Frontend Technologies',
    skills: ['React Native', 'React', 'HTML', 'CSS', 'Figma']
  },
  {
    name: 'Backend Technologies',
    skills: ['SQL', 'Firebase', 'Next.js']
  },
  {
    name: 'AI & Data Science',
    skills: ['Machine Learning', 'TensorFlow', 'Scikit-Learn', 'numPy', 'pandasAi', 'Data Analysis']
  },
  {
    name: 'Tools & Others',
    skills: ['MATLAB', 'Microsoft Excel', 'RStudio', 'Git']
  }
]; 