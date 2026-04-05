import { renderHook } from '@testing-library/react'
import { useStoryProgress } from './useStoryProgress'

beforeEach(() => localStorage.clear())

describe('useStoryProgress', () => {
  it('returns 0 checked and positive total when nothing is checked', () => {
    const { result } = renderHook(() => useStoryProgress())
    expect(result.current.checked).toBe(0)
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('checked increases when an item is pre-checked in localStorage', () => {
    localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'besaid-moon-crest': true }))
    const { result } = renderHook(() => useStoryProgress())
    expect(result.current.checked).toBe(1)
  })

  it('percent is 0 when nothing checked', () => {
    const { result } = renderHook(() => useStoryProgress())
    expect(result.current.percent).toBe(0)
  })
})
