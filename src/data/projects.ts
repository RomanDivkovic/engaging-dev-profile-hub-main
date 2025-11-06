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
    id: 'vue-calendar',
    title: 'Vue Calendar',
    description:
      'A web calendar built with Vue.js, designed for intuitive event and schedule management. Focuses on simplicity and user experience for desktop users.',
    role: '',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    image: '/bookingsystem.png',
    demoUrl: 'https://vue-famcal.vercel.app/',
  },
  {
    id: 'famcal-mobile',
    title: 'Family Calendar Mobile App',
    description:
      'A mobile-first calendar app for organizing tasks and appointments on the go. Optimized for touch devices and quick interactions.',
    role: '',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    image: '/bookingsystem.png',
    demoUrl: 'https://github.com/RomanDivkovic/famcal-app',
  },
  {
    id: 'calender-system-v2',
    title: 'Booking Calendar System (V2)',
    description:
      'A redesigned calendar app with enhanced features, modern UI, and improved performance. Built for scalability and future growth.',
    role: '',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase'],
    image: '/bookingsystemv2.png',
    demoUrl: 'https://booking-client-nu.vercel.app/',
  },
]
