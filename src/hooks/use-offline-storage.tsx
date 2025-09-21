import { useState, useEffect } from 'react'

export const useOfflineStorage = () => {
  const [storedMessages, setStoredMessages] = useState<string[]>([])

  // Load stored messages on mount
  useEffect(() => {
    const loadStoredMessages = () => {
      try {
        const stored = localStorage.getItem('pending-messages')
        if (stored) {
          const messages = JSON.parse(stored)
          setStoredMessages(messages)
        }
      } catch (error) {
        console.error('Failed to load stored messages:', error)
      }
    }

    loadStoredMessages()

    // Listen for storage changes (in case messages are added in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pending-messages') {
        loadStoredMessages()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const saveMessage = (message: string) => {
    try {
      const current = JSON.parse(localStorage.getItem('pending-messages') || '[]')
      const updated = [...current, message]
      localStorage.setItem('pending-messages', JSON.stringify(updated))
      setStoredMessages(updated)
    } catch (error) {
      console.error('Failed to save message:', error)
    }
  }

  const clearStoredMessages = () => {
    localStorage.removeItem('pending-messages')
    setStoredMessages([])
  }

  return {
    storedMessages,
    saveMessage,
    clearStoredMessages,
    hasStoredMessages: storedMessages.length > 0,
  }
}
