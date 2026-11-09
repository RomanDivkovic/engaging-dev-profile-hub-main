/* eslint-env jest */
import { TextDecoder, TextEncoder } from 'node:util'
import '@testing-library/jest-dom'

Object.assign(global, { TextDecoder, TextEncoder })

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
  Analytics: () => null,
}))

jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}))

// Polyfill for IntersectionObserver for all tests
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})
