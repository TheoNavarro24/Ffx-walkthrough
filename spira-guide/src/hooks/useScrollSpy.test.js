import { renderHook } from '@testing-library/react'
import { useScrollSpy } from './useScrollSpy'

// IntersectionObserver is not available in jsdom — provide a minimal mock
const observeMock = vi.fn()
const disconnectMock = vi.fn()
vi.stubGlobal('IntersectionObserver', vi.fn(function (callback) {
  this.observe = observeMock
  this.disconnect = disconnectMock
}))

describe('useScrollSpy', () => {
  it('returns null when no sections are provided', () => {
    const { result } = renderHook(() => useScrollSpy([]))
    expect(result.current).toBeNull()
  })

  it('calls observe for each section id', () => {
    const div1 = document.createElement('div')
    div1.id = 'section-walkthrough'
    const div2 = document.createElement('div')
    div2.id = 'section-bosses'
    document.body.append(div1, div2)

    renderHook(() => useScrollSpy(['section-walkthrough', 'section-bosses']))

    expect(observeMock).toHaveBeenCalledTimes(2)
    div1.remove()
    div2.remove()
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(['section-walkthrough']))
    unmount()
    expect(disconnectMock).toHaveBeenCalled()
  })
})
