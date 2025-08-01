export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'professional' | 'personal';
}

export const professionalProjects: Project[] = [
  {
    id: 'nus-orbital',
    title: 'SingaSport: Sports Facility App',
    date: 'May 2025 - Present',
    description: 'Co-developed a mobile app to optimize usage of over 370 free public sports facilities in Singapore integrating geolocation and geofencing to monitor facility occupancy in real-time. Built using React Native and Firebase.',
    tech: ['React Native', 'Firebase', 'Geolocation', 'Geofencing'],
    image: '/images/singasport-app.jpg',
    githubUrl: 'https://github.com/clemenong1/SingaSport',
    category: 'professional'
  }
];

export const personalProjects: Project[] = [
  {
    id: 'nus-lifehack',
    title: 'Sigmapore: Real-time Health Monitoring System',
    date: 'May 2025 - Jun 2025',
    description: 'Led a team of 4 to finals and won "Most Impressive Usage of Data" out of 300 participants. Developed a real-time mobile health monitoring system integrating geographic mapping to enhance public health response.',
    tech: ['Firebase', 'Geographic Mapping', 'Mobile Development'],
    image: '/images/sigmapore-app.jpg',
    githubUrl: 'https://github.com/clemenong1/Sigmapore',
    category: 'professional'
  },
  {
    id: 'maritime-hackathon',
    title: 'Ship Repair Classification ML Model',
    date: 'Jan 2025',
    description: 'Led a team of 4 to develop a model with >90% accuracy for classifying ship repair needs using 10,000+ data entries. Built Python algorithm for SME annotation consolidation.',
    tech: ['Python', 'Machine Learning', 'Data Analysis'],
    image: '/images/maritime.jpg',
    githubUrl: 'https://github.com/clemenong1/Maritime-Hackathon-2025',
    category: 'professional'
  },
  {
    id: 'dsta-brainhack',
    title: 'Anti-Misinformation Mobile App',
    date: 'May 2025 - Jun 2025',
    description: 'Led a team of 5 to finals in mobile application design that enhances awareness and defense against misinformation and cyber threats. Designed with Figma, built with React Native and Firebase.',
    tech: ['React Native', 'Firebase', 'Figma', 'Cybersecurity'],
    image: '/images/scamskibidi-app.jpg',
    demoUrl: 'https://www.figma.com/proto/ZVP5sGc9aEk5asOiA7vvCI/BrainHack-Touch-Some-Grass?node-id=0-1&t=G96j9lEp66Mz9Gnw-1',
    githubUrl: 'https://github.com/clemenong1/ScamSkibidi',
    category: 'professional'
  }
]; 