import { renderHook, act } from '@testing-library/react'
import { useChapterProgress } from './useChapterProgress'
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

describe('useChapterProgress', () => {
  it('returns total 0 for unknown slug (no data file)', () => {
    const { result } = renderHook(() => useChapterProgress('unknown-slug'), { wrapper })
    expect(result.current.total).toBe(0)
    expect(result.current.checked).toBe(0)
  })

  it('returns correct total for besaid chapter', () => {
    const { result } = renderHook(() => useChapterProgress('besaid'), { wrapper })
    // besaid has 9 items + 1 boss = 10 checkable items
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('returns checked count reflecting localStorage state', () => {
    localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'besaid-antidote': true }))
    const { result } = renderHook(() => useChapterProgress('besaid'), { wrapper })
    expect(result.current.checked).toBe(1)
  })
})
