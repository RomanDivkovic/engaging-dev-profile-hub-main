import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollDetection } from '@/hooks/use-scroll-detection'
import { NavLinkItem } from './NavLinkItem'
import { SocialLinks } from './SocialLinks'
import { MobileMenu } from './MobileMenu'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isScrolled = useScrollDetection()

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Helper to check if current route is profile (about)
  const isProfile = location.pathname === '/about'

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
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
              <NavLinkItem to="/">Home</NavLinkItem>
              <NavLinkItem to="/about">About</NavLinkItem>
              <NavLinkItem to="/projects">Projects</NavLinkItem>
              <NavLinkItem to="/contact">Contact</NavLinkItem>

              <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-muted">
                <SocialLinks showCodeButton={false} />
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
                className="ml-2 relative"
                aria-label="Menu"
              >
                <div className="relative w-6 h-6">
                  {/* Hamburger lines */}
                  <span
                    className={cn(
                      'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out',
                      isOpen ? 'rotate-45 top-3' : 'top-1'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out top-3',
                      isOpen ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out',
                      isOpen ? '-rotate-45 top-3' : 'top-5'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default NavBar
