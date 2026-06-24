import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}))

jest.mock('canvas-confetti', () => () => {})

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('App offline behavior', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/contact')
    window.scrollTo = jest.fn()
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    })
  })

  it('keeps the active route mounted when the browser goes offline', async () => {
    render(<App />)

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i)
    const messageInput = screen.getByPlaceholderText(/your message here/i)

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'This message should stay typed.' } })

    fireEvent(window, new Event('offline'))

    expect(await screen.findByText('Offline Mode')).toBeInTheDocument()
    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@example.com')
    expect(messageInput).toHaveValue('This message should stay typed.')
  })
})
