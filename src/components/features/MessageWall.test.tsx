import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MessageWall } from './MessageWall'
import * as firestore from 'firebase/firestore'

// Mock Firestore and bad-words
jest.mock('@/lib/firebase', () => ({ db: {} }))
jest.mock('firebase/firestore', () => {
  const original = jest.requireActual('firebase/firestore')
  return {
    ...original,
    collection: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    onSnapshot: jest.fn((q, cb) => {
      cb({ docs: [] })
      return () => {}
    }),
    serverTimestamp: jest.fn(),
  }
})
jest.mock('bad-words', () => {
  return {
    Filter: jest
      .fn()
      .mockImplementation(() => ({ isProfane: (text: string) => text.includes('badword') })),
  }
})

describe('MessageWall', () => {
  const setOnlineStatus = (isOnline: boolean) => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: isOnline,
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    setOnlineStatus(true)
  })

  it('renders textarea and post button', () => {
    render(<MessageWall />)
    expect(screen.getByPlaceholderText(/say something nice/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument()
  })

  it('shows error if message is empty', async () => {
    render(<MessageWall />)
    fireEvent.click(screen.getByRole('button', { name: /post/i }))
    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument()
  })

  it('blocks and shows error on profanity', async () => {
    render(<MessageWall />)
    fireEvent.change(screen.getByPlaceholderText(/say something nice/i), {
      target: { value: 'badword' },
    })
    fireEvent.click(screen.getByRole('button', { name: /post/i }))
    expect(
      await screen.findByText('Inappropriate language detected. You are blocked from posting.')
    ).toBeInTheDocument()
    expect(localStorage.getItem('banned_from_messages')).toBe('1')
  })

  it('disables input and button if banned', () => {
    localStorage.setItem('banned_from_messages', '1')
    render(<MessageWall />)
    expect(screen.getByPlaceholderText(/blocked from posting/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled()
  })

  it('calls addDoc on valid post', async () => {
    ;(firestore.addDoc as jest.Mock).mockResolvedValueOnce({})
    render(<MessageWall />)
    fireEvent.change(screen.getByPlaceholderText(/say something nice/i), {
      target: { value: 'Hello world' },
    })
    fireEvent.click(screen.getByRole('button', { name: /post/i }))
    await waitFor(() => expect(firestore.addDoc).toHaveBeenCalled())
  })

  it('saves messages locally when submitted offline', async () => {
    setOnlineStatus(false)
    render(<MessageWall />)

    fireEvent.change(screen.getByPlaceholderText(/offline/i), {
      target: { value: 'Saved for later' },
    })
    fireEvent.click(screen.getByRole('button', { name: /offline - spara lokalt/i }))

    await waitFor(() =>
      expect(localStorage.getItem('pending-messages')).toBe(JSON.stringify(['Saved for later']))
    )
    expect(firestore.addDoc).not.toHaveBeenCalled()
  })
})
