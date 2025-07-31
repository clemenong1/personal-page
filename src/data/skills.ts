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
    skills: ['Firebase', 'Express.js', 'Node.js', 'MongoDB']
  },
  {
    name: 'AI & Data Science',
    skills: ['Machine Learning', 'TensorFlow', 'Scikit-Learn', 'Data Analysis']
  },
  {
    name: 'Tools & Others',
    skills: ['MATLAB', 'Microsoft Excel', 'RStudio', 'Git', 'Docker']
  }
]; 