export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL']
  },
  {
    name: 'Frontend Technologies',
    skills: ['React Native', 'React', 'HTML', 'CSS', 'Figma']
  },
  {
    name: 'Backend Technologies',
    skills: ['Firebase', 'Next.js']
  },
  {
    name: 'AI & Data Science',
    skills: ['Machine Learning', 'TensorFlow', 'Scikit-Learn', 'numPy', 'pandasAi']
  },
  {
    name: 'Tools & Others',
    skills: ['MATLAB', 'Microsoft Excel', 'RStudio', 'Git']
  }
]; 