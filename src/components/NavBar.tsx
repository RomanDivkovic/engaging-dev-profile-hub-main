import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { Menu, X, Github, Linkedin, FileText, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Detect scrolling for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative px-3 py-2 transition-colors duration-300',
      'hover:text-secondary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5',
      'after:origin-center after:scale-x-0 after:bg-secondary after:transition-transform',
      'hover:after:scale-x-100',
      isActive ? 'text-secondary font-medium after:scale-x-100' : 'text-foreground'
    )

  // Helper to check if current route is profile (about)
  const isProfile = location.pathname === '/about'

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm dark:bg-background/70'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="/uploads/a6e4ee57-a5ff-483a-b6e1-71809843ead5.png"
                alt="RD Logo"
                className="h-20 w-20"
              />
              <span
                className={cn(
                  'font-semibold text-lg tracking-tight transition-colors',
                  isProfile && 'text-secondary underline underline-offset-4'
                )}
              >
                Roman Divković
              </span>
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/projects" className={getNavLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>

            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-muted">
              <a
                href="https://github.com/RomanDivkovic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 hover:text-secondary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/roman-divkovic-65699a19b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 hover:text-secondary transition-colors" />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2"
              aria-label="Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        data-testid="mobile-menu"
        className={cn(
          'md:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed inset-y-0 left-0 w-full h-screen'
        )}
      >
        <div className="px-6 py-20 space-y-8 flex flex-col h-full">
          <div className="space-y-6">
            <NavLink
              to="/"
              data-testid="mobile-nav-home"
              className={({ isActive }) =>
                cn(
                  'block text-lg font-medium py-2',
                  isActive ? 'text-secondary' : 'hover:text-secondary'
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              data-testid="mobile-nav-about"
              className={({ isActive }) =>
                cn(
                  'block text-lg font-medium py-2',
                  isActive ? 'text-secondary' : 'hover:text-secondary'
                )
              }
            >
              About
            </NavLink>
            <NavLink
              to="/projects"
              data-testid="mobile-nav-projects"
              className={({ isActive }) =>
                cn(
                  'block text-lg font-medium py-2',
                  isActive ? 'text-secondary' : 'hover:text-secondary'
                )
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              data-testid="mobile-nav-contact"
              className={({ isActive }) =>
                cn(
                  'block text-lg font-medium py-2',
                  isActive ? 'text-secondary' : 'hover:text-secondary'
                )
              }
            >
              Contact
            </NavLink>
          </div>

          <div className="border-t border-muted pt-8 mt-auto">
            <div className="flex space-x-6">
              <a
                href="https://github.com/RomanDivkovic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 hover:text-secondary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/roman-divkovic-65699a19b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 hover:text-secondary transition-colors" />
              </a>
              <a href="/pdf/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV">
                <FileText className="h-6 w-6 hover:text-secondary transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Projects"
              >
                <Code className="h-6 w-6 hover:text-secondary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
