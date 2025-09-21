import { useEffect } from 'react'

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update prompt
                  if (
                    window.confirm('New content is available! Reload to get the latest version?')
                  ) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          if (window.confirm('A new version is available. Reload to update?')) {
            window.location.reload()
          }
        }
      })
    }
  }, [])
}
