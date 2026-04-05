import { renderHook, act } from '@testing-library/react'
import { usePyrefly } from './usePyrefly'

beforeEach(() => localStorage.clear())

describe('usePyrefly', () => {
  it('defaults to true when key is absent', () => {
    const { result } = renderHook(() => usePyrefly())
    expect(result.current.pyreflyEnabled).toBe(true)
  })

  it('togglePyrefly flips the value', () => {
    const { result } = renderHook(() => usePyrefly())
    act(() => result.current.togglePyrefly())
    expect(result.current.pyreflyEnabled).toBe(false)
  })

  it('persists to localStorage', () => {
    const { result } = renderHook(() => usePyrefly())
    act(() => result.current.togglePyrefly())
    expect(localStorage.getItem('spira-pyrefly')).toBe('false')
  })

  it('reads persisted false value on mount', () => {
    localStorage.setItem('spira-pyrefly', 'false')
    const { result } = renderHook(() => usePyrefly())
    expect(result.current.pyreflyEnabled).toBe(false)
  })
})
