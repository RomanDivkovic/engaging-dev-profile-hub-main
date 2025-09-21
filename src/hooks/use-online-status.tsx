import { useState, useEffect } from 'react'

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
      // Show back online message
      import('sonner')
        .then(({ toast }) => {
          toast.success('You are back online! 🌐', {
            duration: 3000,
          })
        })
        .catch(() => {
          // Fallback if toast not available
          console.log('Back online!')
        })
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
      // Show offline message
      import('sonner')
        .then(({ toast }) => {
          toast.error('You are offline. Some features may be limited. 📴', {
            duration: 5000,
          })
        })
        .catch(() => {
          // Fallback if toast not available
          console.log('You are offline')
        })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, showOfflineMessage }
}
