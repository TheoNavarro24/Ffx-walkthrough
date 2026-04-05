import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

beforeEach(() => localStorage.clear())

describe('useLocalStorage', () => {
  it('returns the default value when key is absent', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('returns persisted value on re-render', () => {
    localStorage.setItem('test-key', JSON.stringify('saved'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('saved')
  })

  it('persists updated value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    act(() => result.current[1]('updated'))
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('works with object values', () => {
    const { result } = renderHook(() => useLocalStorage('obj-key', {}))
    act(() => result.current[1]({ open: true }))
    expect(result.current[0]).toEqual({ open: true })
  })
})
