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
    id: 'calender-system-v2',
    title: 'Booking Calendar System (V2)',
    description:
      'An improved version of the booking calendar application with enhanced features and user experience, allowing users to manage bookings more efficiently.',
    role: 'I redesigned the application architecture, improved the user interface, and added new features based on user feedback, ensuring a seamless booking experience while trying out supabase.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase', 'PostgreSQL', 'Jest'],
    features: [
      'Enhanced user interface with better navigation',
      'Improved booking management features',
      'User authentication and profile management',
      'Real-time notifications for bookings',
      'Advanced filtering and search options',
    ],
    image: '/bookingsystemv2.png',
    demoUrl: 'https://booking-client-nu.vercel.app/',
    githubUrl: 'https://github.com/RomanDivkovic/Booking-client',
  },
  {
    id: 'calender-system-v3',
    title: 'Family Calendar System (V3)',
    description:
      'A Vue.js-based family calendar application built to compare Vue and React frameworks. Features authentication, real-time updates, and booking management for shared household resources.',
    role: 'I developed this application to gain hands-on experience with Vue.js and compare it with React. Implemented the complete stack using Vue 3, TypeScript, Firebase Authentication, Firestore, and Firebase Functions.',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Firebase Auth',
      'Firestore',
      'Firebase Functions',
      'Tailwind CSS',
    ],
    features: [
      'Vue 3 Composition API implementation',
      'Firebase Authentication integration',
      'Real-time booking synchronization with Firestore',
      'Serverless backend with Firebase Functions',
      'Framework comparison study (Vue vs React)',
    ],
    image: '/bookingsystem.png',
    demoUrl: 'https://vue-famcal.vercel.app/',
    githubUrl: 'https://github.com/RomanDivkovic/vue-famcal',
  },
  {
    id: 'famcal-mobile',
    title: 'Family Calendar Mobile App',
    description:
      'A React Native mobile application for family calendar management, built to sync bookings with the web versions. Features phone calendar integration and cross-platform compatibility for iOS and Android.',
    role: 'I developed this mobile app to extend the calendar system to mobile devices, implementing React Native components and working on phone calendar synchronization features. The app provides the same core functionality as V2 with mobile-specific enhancements.',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Native Calendar API',
      'Cross-platform mobile development',
    ],
    features: [
      'Cross-platform mobile app (iOS/Android)',
      "Sync with phone's native calendar",
      'Same core features as web V2',
      'Real-time booking notifications',
      'Mobile-optimized user interface',
      'Work in progress - calendar sync development',
    ],
    image: '/bookingsystem.png',
    githubUrl: 'https://github.com/RomanDivkovic/famcal-app',
    alert:
      'Mobile app is in development. Core functionality works but calendar sync with phone is still being implemented.',
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
]
