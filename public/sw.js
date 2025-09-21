// Service Worker for offline functionality
const CACHE_NAME = 'roman-portfolio-v1'
const STATIC_CACHE = 'roman-static-v1'
const DYNAMIC_CACHE = 'roman-dynamic-v1'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/robots.txt',
  // Images
  '/roman.png',
  '/betbuddys.png',
  '/bookingsystem.png',
  '/placeholder.svg',
  // Files
  '/files/cv.pdf',
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('Service Worker: Caching static files')
      return cache.addAll(STATIC_FILES)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached version or offline page
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            return caches.match('/offline.html')
          })
        })
    )
    return
  }

  // Handle other requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Cache the response
          const responseToCache = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Return offline fallback for certain content types
          if (event.request.destination === 'document') {
            return caches.match('/offline.html')
          }
        })
    })
  )
})

// Handle background sync for messages
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncPendingMessages())
  }
})

async function syncPendingMessages() {
  console.log('Service Worker: Syncing pending messages...')
  // This would be implemented to sync local messages with the server
  // For now, just log that sync is happening
}
