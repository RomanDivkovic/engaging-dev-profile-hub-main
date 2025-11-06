import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavLinkItemProps {
  to: string
  children: React.ReactNode
  className?: string
  testId?: string
}

export const NavLinkItem = ({ to, children, className, testId }: NavLinkItemProps) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative px-3 py-2 transition-colors duration-500',
      'hover:text-secondary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5',
      'after:origin-center after:scale-x-0 after:bg-secondary after:transition-transform after:duration-500',
      'hover:after:scale-x-100',
      isActive ? 'text-secondary font-medium after:scale-x-100' : 'text-foreground',
      className
    )

  return (
    <NavLink to={to} className={getNavLinkClass} data-testid={testId}>
      {children}
    </NavLink>
  )
}
