import { renderHook } from '@testing-library/react'
import { useStoryProgress } from './useStoryProgress'
import { SaveContextProvider } from '../context/SaveContext'
import { CheckboxProvider } from '../context/CheckboxContext'

beforeEach(() => localStorage.clear())

function wrapper({ children }) {
  return (
    <SaveContextProvider>
      <CheckboxProvider>{children}</CheckboxProvider>
    </SaveContextProvider>
  )
}

describe('useStoryProgress', () => {
  it('returns 0 checked and positive total when nothing is checked', () => {
    const { result } = renderHook(() => useStoryProgress(), { wrapper })
    expect(result.current.checked).toBe(0)
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('checked increases when an item is pre-checked in localStorage', () => {
    localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'besaid-moon-crest': true }))
    const { result } = renderHook(() => useStoryProgress(), { wrapper })
    expect(result.current.checked).toBe(1)
  })

  it('percent is 0 when nothing checked', () => {
    const { result } = renderHook(() => useStoryProgress(), { wrapper })
    expect(result.current.percent).toBe(0)
  })
})
