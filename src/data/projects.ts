export interface Project {
  id: string
  title: string
  description: string
  role: string
  technologies: string[]
  features?: string[]
  image: string
  mobileImage?: string
  demoUrl?: string
  githubUrl?: string
  privateSource?: boolean
  backendUrl?: string
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
    id: 'basketball-manager',
    title: 'Basketball Manager',
    description:
      'A basketball management game centred on starting a basketball coaching career. Built with Expo and TypeScript, with local, on-device persistence using AsyncStorage.',
    role: 'I helped a startup get up and running with its basketball management app, using Expo and TypeScript to build the coaching-career experience and local persistence with AsyncStorage.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
    features: [
      'Basketball coaching-career experience in development',
      'Local, on-device persistence with AsyncStorage',
    ],
    image: '/basketball-manager.jpg',
    demoUrl: 'https://basketballmanager.se',
    privateSource: true,
    alert:
      'Currently in development. Uses AsyncStorage for local persistence; no SQL database currently.',
    featured: true,
  },
  {
    id: 'basketball-manager-unity',
    title: 'Basketball Manager — Unity',
    description:
      'A separate basketball management game built with Unity, C# and a native C++ engine, covering coaching careers, team management and match simulation.',
    role: 'I develop the native game engine and its integration with the Unity client, connecting basketball simulation with the player experience.',
    technologies: ['Unity', 'C#', 'C++'],
    features: [
      'Basketball match simulation',
      'Team and roster management',
      'Coaching-career progression',
    ],
    image: '/Basketball Playbook BM Icon.png',
    privateSource: true,
    alert: 'In development. Source code is private; no public demo is currently available.',
  },
  {
    id: 'localis-ai',
    title: 'LocalisAI',
    description:
      'A local-first AI assistant in development, bringing together local language models, opt-in personal memory and Swedish and English voice interaction.',
    role: 'I develop the assistant, its local API and dashboard, with a focus on privacy, explicit memory controls and offline operation.',
    technologies: ['AI', 'Python', 'FastAPI', 'React', 'TypeScript', 'Ollama', 'SQLite'],
    features: [
      'Local language-model inference',
      'Opt-in personal memory',
      'Swedish and English voice interaction',
    ],
    image: '/localis-ai.svg',
    privateSource: true,
    alert: 'In development. Source code is private; project details can be discussed on request.',
  },
  {
    id: 'guardian-ai',
    title: 'Guardian — AI Action Safeguards',
    description:
      'The action-safety project within LocalisAI, independently evaluating AI-proposed actions in a simulated smart home before they can run.',
    role: 'I build the policy evaluation, owner-approval flow and audit records that make proposed AI actions inspectable.',
    technologies: ['AI', 'Python', 'FastAPI', 'SQLite'],
    features: [
      'Independent action evaluation',
      'Owner approval for sensitive actions',
      'Simulated household devices and audit records',
    ],
    image: '/guardian-ai.svg',
    privateSource: true,
    alert:
      'A LocalisAI component in development, tested with simulated devices. Source code is private.',
  },
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
      'C#',
      '.NET 8',
      'Entity Framework Core',
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
    demoUrl: 'https://buddy-bets-battle-main.vercel.app/',
    privateSource: true,
    backendUrl: 'https://github.com/RomanDivkovic/BetBuddysProject',
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
    id: 'travel-agency',
    title: 'Travel Agency',
    description:
      'A Swedish- and English-language travel planning platform for an independent travel agent, with guided enquiries, customer accounts and an administration portal.',
    role: 'I developed the React and TypeScript frontend and ASP.NET Core backend, with PostgreSQL persistence and automated frontend and backend tests.',
    technologies: ['React', 'TypeScript', 'Vite', 'SCSS', 'C#', 'ASP.NET Core', 'PostgreSQL'],
    features: [
      'Swedish and English interfaces',
      'Guided travel enquiry wizard',
      'Customer accounts and secure portal',
      'Administrative enquiry and quotation management',
    ],
    image: '/travel-agency.png',
    demoUrl: 'https://travel-agency-nine-beta.vercel.app/',
    githubUrl: 'https://github.com/RomanDivkovic/travel-agency',
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
    image: '/famcalymobile.png',
    mobileImage: '/famcalymobile.png',
    demoUrl: 'https://github.com/RomanDivkovic/famcal-app',
  },
  {
    id: 'calender-system-v2',
    title: 'Booking Calendar System',
    description:
      'A redesigned calendar app with enhanced features, modern UI, and improved performance. Built for scalability and future growth. Also done to compare a react calender to the Vue version that was built.',
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
