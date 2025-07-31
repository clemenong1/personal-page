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
    title: 'Mobile Sports Facility App',
    date: 'May 2025 - Present',
    description: 'Co-developed a mobile app to optimize usage of over 370 free public sports facilities in Singapore integrating geolocation and geofencing to monitor facility occupancy in real-time. Built using React Native and Firebase.',
    tech: ['React Native', 'Firebase', 'Geolocation', 'Geofencing'],
    image: '/images/nus-orbital.jpg',
    category: 'professional'
  },
  {
    id: 'nus-lifehack',
    title: 'Real-time Health Monitoring System',
    date: 'May 2025 - Jun 2025',
    description: 'Led a team of 4 to finals and won "Most Impressive Usage of Data" out of 300 participants. Developed a real-time mobile health monitoring system integrating geographic mapping to enhance public health response.',
    tech: ['Firebase', 'Geographic Mapping', 'Mobile Development'],
    image: '/images/nus-lifehack.jpg',
    category: 'professional'
  },
  {
    id: 'maritime-hackathon',
    title: 'Ship Repair Classification ML Model',
    date: 'Jan 2025',
    description: 'Led a team of 4 to develop a model with >90% accuracy for classifying ship repair needs using 10,000+ data entries. Built Python algorithm for SME annotation consolidation.',
    tech: ['Python', 'Machine Learning', 'Data Analysis'],
    image: '/images/maritime-hackathon.jpg',
    category: 'professional'
  },
  {
    id: 'dsta-brainhack',
    title: 'Anti-Misinformation Mobile App',
    date: 'May 2025 - Jun 2025',
    description: 'Led a team of 5 to finals in mobile application design that enhances awareness and defense against misinformation and cyber threats. Designed with Figma, built with React Native and Firebase.',
    tech: ['React Native', 'Firebase', 'Figma', 'Cybersecurity'],
    image: '/images/dsta-brainhack.jpg',
    category: 'professional'
  }
];

export const personalProjects: Project[] = [
  {
    id: 'smart-campus',
    title: 'Smart Campus Navigation App',
    date: 'Dec 2024 - Present',
    description: 'A comprehensive navigation system for NUS campus with real-time facility status, optimal routing, and accessibility features. Integrates with campus APIs for live data.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
    image: '/images/smart-campus.jpg',
    demoUrl: 'https://smart-campus-demo.vercel.app',
    githubUrl: 'https://github.com/clemenong1/smart-campus',
    category: 'personal'
  },
  {
    id: 'ml-fitness',
    title: 'ML-Powered Fitness Tracker',
    date: 'Nov 2024 - Jan 2025',
    description: 'Advanced fitness tracking application using machine learning to analyze workout patterns, predict performance, and provide personalized training recommendations.',
    tech: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    image: '/images/ml-fitness.jpg',
    demoUrl: 'https://ml-fitness-demo.vercel.app',
    githubUrl: 'https://github.com/clemenong1/ml-fitness-tracker',
    category: 'personal'
  },
  {
    id: 'cybersecurity-platform',
    title: 'Cybersecurity Awareness Platform',
    date: 'Oct 2024 - Dec 2024',
    description: 'Interactive platform for cybersecurity education featuring gamified learning modules, threat simulations, and real-time security assessments.',
    tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    image: '/images/cybersecurity-platform.jpg',
    demoUrl: 'https://cyber-awareness-demo.vercel.app',
    githubUrl: 'https://github.com/clemenong1/cybersecurity-platform',
    category: 'personal'
  }
]; 