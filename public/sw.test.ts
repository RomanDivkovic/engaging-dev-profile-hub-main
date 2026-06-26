import fs from 'fs'
import path from 'path'
import vm from 'vm'

type ServiceWorkerHandler = (event: unknown) => void

const loadServiceWorker = (cachesMock: unknown) => {
  const listeners: Record<string, ServiceWorkerHandler[]> = {}
  const consoleMock = {
    log: jest.fn(),
    warn: jest.fn(),
  }
  const selfMock = {
    location: { origin: 'https://example.com' },
    clients: { claim: jest.fn() },
    skipWaiting: jest.fn(),
    addEventListener: jest.fn((eventName: string, handler: ServiceWorkerHandler) => {
      listeners[eventName] = listeners[eventName] ?? []
      listeners[eventName].push(handler)
    }),
  }

  const serviceWorkerSource = fs.readFileSync(path.join(process.cwd(), 'public/sw.js'), 'utf8')

  vm.runInNewContext(serviceWorkerSource, {
    self: selfMock,
    caches: cachesMock,
    console: consoleMock,
    Promise,
  })

  return { consoleMock, listeners, selfMock }
}

describe('service worker install', () => {
  it('continues installing when an individual static file fails to cache', async () => {
    const add = jest.fn((file: string) =>
      file === '/favicon.ico' ? Promise.reject(new Error('not found')) : Promise.resolve()
    )
    const addAll = jest.fn(() => Promise.reject(new Error('atomic failure')))
    const cachesMock = {
      open: jest.fn(() => Promise.resolve({ add, addAll })),
    }
    const { consoleMock, listeners, selfMock } = loadServiceWorker(cachesMock)
    let installPromise: Promise<unknown> | undefined

    listeners.install[0]({
      waitUntil: (promise: Promise<unknown>) => {
        installPromise = promise
      },
    })

    await expect(installPromise).resolves.toEqual(expect.any(Array))
    expect(add).toHaveBeenCalledWith('/favicon.ico')
    expect(addAll).not.toHaveBeenCalled()
    expect(consoleMock.warn).toHaveBeenCalledWith(
      'Service Worker: Failed to cache static file:',
      '/favicon.ico',
      expect.any(Error)
    )
    expect(selfMock.skipWaiting).toHaveBeenCalled()
  })
})
