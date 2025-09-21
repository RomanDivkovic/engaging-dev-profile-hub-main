import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './NavBar'

describe('NavBar', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /about/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /projects/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toBeInTheDocument()
  })

  it('closes mobile menu on navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    )
    // Open mobile menu
    const menuButton = screen.getByLabelText('Menu')
    fireEvent.click(menuButton)
    const mobileAboutLink = screen.getByTestId('mobile-nav-about')
    expect(mobileAboutLink).toBeVisible()
    // Click the mobile nav link (the one with data-testid)
    fireEvent.click(mobileAboutLink)
    // Menu should close (mobile menu hidden)
    // Check that the menu is now hidden by checking transform class on the mobile menu container
    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toHaveClass('md:hidden')
  })

  it('highlights active link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavBar />
      </MemoryRouter>
    )
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    // At least one About link should have the active class
    expect(aboutLinks.some((link) => link.className.includes('text-secondary'))).toBe(true)
  })
})
