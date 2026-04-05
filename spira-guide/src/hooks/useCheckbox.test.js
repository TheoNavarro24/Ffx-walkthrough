import { renderHook, act } from '@testing-library/react'
import { useCheckbox } from './useCheckbox'

beforeEach(() => localStorage.clear())

describe('useCheckbox', () => {
  it('isChecked returns false for unknown id', () => {
    const { result } = renderHook(() => useCheckbox())
    expect(result.current.isChecked('item-1')).toBe(false)
  })

  it('toggle marks an item as checked', () => {
    const { result } = renderHook(() => useCheckbox())
    act(() => result.current.toggle('item-1'))
    expect(result.current.isChecked('item-1')).toBe(true)
  })

  it('toggle again unchecks the item', () => {
    const { result } = renderHook(() => useCheckbox())
    act(() => result.current.toggle('item-1'))
    act(() => result.current.toggle('item-1'))
    expect(result.current.isChecked('item-1')).toBe(false)
  })

  it('checkedCount returns count of checked ids from an array', () => {
    const { result } = renderHook(() => useCheckbox())
    act(() => result.current.toggle('a'))
    act(() => result.current.toggle('b'))
    expect(result.current.checkedCount(['a', 'b', 'c'])).toBe(2)
  })

  it('persists checked state across hook remounts', () => {
    const { result, unmount } = renderHook(() => useCheckbox())
    act(() => result.current.toggle('item-persist'))
    unmount()
    const { result: result2 } = renderHook(() => useCheckbox())
    expect(result2.current.isChecked('item-persist')).toBe(true)
  })
})
