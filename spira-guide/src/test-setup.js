import '@testing-library/jest-dom'

// IntersectionObserver is not available in jsdom — provide a global no-op stub
if (typeof IntersectionObserver === 'undefined') {
  global.IntersectionObserver = vi.fn(function () {
    this.observe = vi.fn()
    this.disconnect = vi.fn()
    this.unobserve = vi.fn()
  })
}

// window.matchMedia is not available in jsdom — provide a stub
if (typeof window.matchMedia === 'undefined') {
  window.matchMedia = vi.fn((query) => ({
    matches: false,
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}
