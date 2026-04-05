import '@testing-library/jest-dom'

// IntersectionObserver is not available in jsdom — provide a global no-op stub
if (typeof IntersectionObserver === 'undefined') {
  global.IntersectionObserver = vi.fn(function () {
    this.observe = vi.fn()
    this.disconnect = vi.fn()
    this.unobserve = vi.fn()
  })
}
