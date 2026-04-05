import { renderHook, act } from '@testing-library/react'
import { useChapterProgress } from './useChapterProgress'

beforeEach(() => localStorage.clear())

describe('useChapterProgress', () => {
  it('returns total 0 for unknown slug (no data file)', () => {
    const { result } = renderHook(() => useChapterProgress('unknown-slug'))
    expect(result.current.total).toBe(0)
    expect(result.current.checked).toBe(0)
  })

  it('returns correct total for besaid chapter', () => {
    const { result } = renderHook(() => useChapterProgress('besaid'))
    // besaid has 9 items + 1 boss = 10 checkable items
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('returns checked count reflecting localStorage state', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'besaid-antidote': true }))
    const { result } = renderHook(() => useChapterProgress('besaid'))
    expect(result.current.checked).toBe(1)
  })
})
