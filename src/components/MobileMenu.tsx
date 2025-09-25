import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, User, Briefcase, Mail } from 'lucide-react'
import { SocialLinks } from './SocialLinks'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-lg transition-colors',
      'text-black dark:text-white hover:bg-secondary/10',
      isActive ? 'text-secondary bg-secondary/10' : 'hover:text-secondary'
    )

  const menuItems = [
    { to: '/', label: 'Home', icon: Home, testId: 'mobile-nav-home' },
    { to: '/about', label: 'About', icon: User, testId: 'mobile-nav-about' },
    { to: '/projects', label: 'Projects', icon: Briefcase, testId: 'mobile-nav-projects' },
    { to: '/contact', label: 'Contact', icon: Mail, testId: 'mobile-nav-contact' },
  ]

  return (
    <div
      data-testid="mobile-menu"
      className={cn(
        'md:hidden bg-background/98 backdrop-blur-md transition-transform duration-300 ease-in-out border-r border-border/50 z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'fixed inset-y-0 left-0 w-80 h-screen shadow-xl'
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="space-y-2 flex-1">
          {menuItems.map(({ to, label, icon: Icon, testId }) => (
            <NavLink
              key={to}
              to={to}
              data-testid={testId}
              className={mobileNavLinkClass}
              onClick={onClose}
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="border-t border-muted pt-6 mt-auto">
          <SocialLinks className="flex justify-center space-x-6" />
        </div>
      </div>
    </div>
  )
}
