export interface Project {
  id: string
  title: string
  description: string
  role: string
  technologies: string[]
  features?: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  alert?: string
  upgradePrompt?: {
    title: string
    message: string
    upgradeUrl: string
    upgradeLabel: string
    stayLabel: string
  }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'betbuddys',
    title: 'BetBuddys',
    description:
      'A webapp for creating groups and betting with friends on UFC/PPV events, featuring a comprehensive point system and league tables. Also available as a React Native mobile app (in development) for iOS and Android.',
    role: 'As the fullstack developer, I designed the entire architecture, implemented the React-based frontend and built the backend logic for real-time updates and score calculations. I also developed a companion mobile app using React Native Expo.',
    technologies: [
      'React',
      'React Native',
      'Expo',
      'Firebase',
      'Firestore',
      'Tailwind CSS',
      'Firebase Functions',
      'TypeScript',
      'Vite',
    ],
    features: [
      'Group creation and management for betting leagues',
      'Points system for accurate predictions',
      'League table with live updates',
      'Result calculation with fight outcomes',
      'Annual rankings for participants',
      'Mobile app with same functionality as web version',
    ],
    image: '/betbuddys.png',
    demoUrl: 'https://betbuddys.app/',
    alert:
      'The BetBuddys web repository is private. Mobile app code is also private repo (in development, not yet published to app stores).',
    featured: true,
  },
  {
    id: 'capio-online',
    title: 'Capio Online',
    description:
      'A health platform allowing users to connect with healthcare providers digitally, integrating booking systems, messaging, and patient profiles.',
    role: 'I focused on frontend development, building React Native components and implementing user flows that make complex healthcare interactions intuitive and accessible.',
    technologies: [
      'React Native',
      'React',
      'TypeScript',
      'Redux',
      '.NET',
      'C#',
      'Azure',
      'Figma',
      'AWS',
    ],
    features: [
      'Digital healthcare booking system',
      'Secure patient-provider messaging',
      'Comprehensive patient profiles',
      'Appointment management',
      'Health record accessibility',
    ],
    image:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    demoUrl: 'https://www.capio.se/',
    featured: true,
  },
  {
    id: 'calender-system',
    title: 'Booking Calendar System',
    description:
      '(First version) A comprehensive booking calendar application that allows users to schedule appointments, manage availability, and handle reservations with an intuitive interface under the same household (Was created for our household and to get it up and run quickly we just added that in the first release that everything went to the same db). To use in our shared washroom and avoid conflicts.',
    role: 'I developed the entire application from scratch, implementing the calendar functionality, booking logic, and user interface using modern React patterns and responsive design.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Firebase', 'Real time database'],
    features: [
      'Interactive calendar interface',
      'Appointment scheduling and management',
      'Availability tracking',
      'Responsive design for all devices',
      'Real-time booking updates',
    ],
    image: '/bookingsystem.png',
    demoUrl: 'https://bookingsystems.vercel.app/',
    githubUrl: 'https://github.com/RomanDivkovic/booking-calender',
    upgradePrompt: {
      title: 'Newer Version Available',
      message:
        'This project has been updated to V2 with improved features and user experience. Would you like to view the newer version instead?',
      upgradeUrl: 'https://bookingsystems.vercel.app/',
      upgradeLabel: 'View V2 (Recommended)',
      stayLabel: 'Stay on V1',
    },
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'A personal portfolio website showcasing projects and skills, built with React and Tailwind CSS.',
    role: 'I designed and implemented the entire website, focusing on responsive design, animations, and accessibility.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Firebase'],
    features: [
      'Responsive design for all device sizes',
      'Custom animations and transitions',
      'Dark/light mode support',
      'Contact form with email integration',
      'Project showcase with filtering',
    ],
    image: '/roman.png',
    githubUrl: 'https://github.com/RomanDivkovic/engaging-dev-profile-hub-main',
  },
  {
    id: 'vue-calendar',
    title: 'Vue Calendar',
    description:
      'A web calendar built with Vue.js, designed for intuitive event and schedule management. Focuses on simplicity and user experience for desktop users.',
    role: '',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    image: '/vuecal.png',
    demoUrl: 'https://vue-famcal.vercel.app/',
  },
  {
    id: 'famcal-mobile',
    title: 'Family Calendar Mobile App',
    description:
      'A mobile-first calendar app for organizing tasks and appointments on the go. Optimized for touch devices and quick interactions.',
    role: '',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    image: '/famcamobile.png',
    demoUrl: 'https://github.com/RomanDivkovic/famcal-app',
  },
  {
    id: 'calender-system-v2',
    title: 'Booking Calendar System',
    description:
      'A redesigned calendar app with enhanced features, modern UI, and improved performance. Built for scalability and future growth.',
    role: '',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase'],
    image: '/bookingsystemv2.png',
    demoUrl: 'https://www.famcaly.com/',
  },
  {
    id: 'our-pets',
    title: 'Our Pets',
    description:
      'A redesigned calendar app with enhanced features, modern UI, and improved performance. Built for scalability and future growth.',
    role: '',
    technologies: [
      'Expo',
      'TypeScript',
      'CSS',
      'React Native',
      'Firebase',
      'Jest',
      'React Navigation',
    ],
    image: 'https://images.pexels.com/photos/2449533/pexels-photo-2449533.jpeg',
  },
]
