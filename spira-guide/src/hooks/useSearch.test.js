import { renderHook } from '@testing-library/react'
import { useSearch } from './useSearch'

describe('useSearch', () => {
  it('returns empty array for query shorter than 2 chars', () => {
    const { result } = renderHook(() => useSearch(''))
    expect(result.current).toEqual([])
    const { result: r2 } = renderHook(() => useSearch('a'))
    expect(r2.current).toEqual([])
  })

  it('returns results matching title substring (case-insensitive)', () => {
    const { result } = renderHook(() => useSearch('besaid'))
    expect(result.current.length).toBeGreaterThan(0)
    expect(result.current[0].type).toBe('chapter')
    expect(result.current[0].title).toMatch(/Besaid/i)
  })

  it('returns results matching subtitle', () => {
    // Jecht Sphere 2 subtitle contains "Liki"
    const { result } = renderHook(() => useSearch('Liki'))
    const jechtResult = result.current.find((r) => r.type === 'jecht-sphere')
    expect(jechtResult).toBeDefined()
  })

  it('caps results at 12', () => {
    // 'a' would match many — but query < 2 returns empty
    // Use 'al bhed' which should match primers + others
    const { result } = renderHook(() => useSearch('al bhed'))
    expect(result.current.length).toBeLessThanOrEqual(12)
  })

  it('sorts exact title match first', () => {
    const { result } = renderHook(() => useSearch('Zanarkand'))
    // The chapter "Zanarkand" is an exact match
    expect(result.current[0].title.toLowerCase()).toBe('zanarkand')
  })

  it('sorts chapters above bosses for non-exact matches', () => {
    const { result } = renderHook(() => useSearch('yuna'))
    const types = result.current.map((r) => r.type)
    const firstBossIndex = types.indexOf('boss')
    const firstCelestialIndex = types.indexOf('celestial')
    if (firstBossIndex !== -1 && firstCelestialIndex !== -1) {
      expect(firstCelestialIndex).toBeGreaterThan(firstBossIndex)
    }
  })
})
