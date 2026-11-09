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
    expect(add).toHaveBeenCalledWith('/files/cv.pdf')
    expect(add).toHaveBeenCalledWith('/basketball-manager.jpg')
    expect(cachesMock.open).toHaveBeenCalledWith('roman-static-v2')
    expect(addAll).not.toHaveBeenCalled()
    expect(consoleMock.warn).toHaveBeenCalledWith(
      'Service Worker: Failed to cache static file:',
      '/favicon.ico',
      expect.any(Error)
    )
    expect(selfMock.skipWaiting).toHaveBeenCalled()
  })

  it('removes old caches containing the previous CV when activated', async () => {
    const cachesMock = {
      keys: jest.fn(() =>
        Promise.resolve([
          'roman-static-v1',
          'roman-dynamic-v1',
          'roman-static-v2',
          'roman-dynamic-v2',
        ])
      ),
      delete: jest.fn(() => Promise.resolve(true)),
    }
    const { listeners } = loadServiceWorker(cachesMock)
    let activationPromise: Promise<unknown> | undefined

    listeners.activate[0]({
      waitUntil: (promise: Promise<unknown>) => {
        activationPromise = promise
      },
    })

    await activationPromise
    expect(cachesMock.delete).toHaveBeenCalledWith('roman-static-v1')
    expect(cachesMock.delete).toHaveBeenCalledWith('roman-dynamic-v1')
    expect(cachesMock.delete).not.toHaveBeenCalledWith('roman-static-v2')
    expect(cachesMock.delete).not.toHaveBeenCalledWith('roman-dynamic-v2')
  })
})
