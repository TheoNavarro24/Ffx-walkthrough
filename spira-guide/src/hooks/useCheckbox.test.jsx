import { renderHook, act } from '@testing-library/react'
import { useCheckbox } from './useCheckbox'
import { SaveContextProvider, useSaveSlot } from '../context/SaveContext'
import { CheckboxProvider } from '../context/CheckboxContext'

function wrapper({ children }) {
  return (
    <SaveContextProvider>
      <CheckboxProvider>{children}</CheckboxProvider>
    </SaveContextProvider>
  )
}

beforeEach(() => localStorage.clear())

describe('useCheckbox', () => {
  it('isChecked returns false for unknown id', () => {
    const { result } = renderHook(() => useCheckbox(), { wrapper })
    expect(result.current.isChecked('item-1')).toBe(false)
  })

  it('toggle marks an item as checked', () => {
    const { result } = renderHook(() => useCheckbox(), { wrapper })
    act(() => result.current.toggle('item-1'))
    expect(result.current.isChecked('item-1')).toBe(true)
  })

  it('toggle again unchecks the item', () => {
    const { result } = renderHook(() => useCheckbox(), { wrapper })
    act(() => result.current.toggle('item-1'))
    act(() => result.current.toggle('item-1'))
    expect(result.current.isChecked('item-1')).toBe(false)
  })

  it('checkedCount returns count of checked ids from an array', () => {
    const { result } = renderHook(() => useCheckbox(), { wrapper })
    act(() => result.current.toggle('a'))
    act(() => result.current.toggle('b'))
    expect(result.current.checkedCount(['a', 'b', 'c'])).toBe(2)
  })

  it('persists checked state across hook remounts', () => {
    const { result, unmount } = renderHook(() => useCheckbox(), { wrapper })
    act(() => result.current.toggle('item-persist'))
    unmount()
    const { result: result2 } = renderHook(() => useCheckbox(), { wrapper })
    expect(result2.current.isChecked('item-persist')).toBe(true)
  })

  it('scopes checks to active slot — checks in slot A do not appear in slot B', () => {
    // Render a hook that combines both useSaveSlot and useCheckbox
    const { result } = renderHook(
      () => ({ save: useSaveSlot(), check: useCheckbox() }),
      { wrapper }
    )

    act(() => result.current.check.toggle('isolated-item'))
    expect(result.current.check.isChecked('isolated-item')).toBe(true)

    act(() => result.current.save.createSlot('Slot B'))
    expect(result.current.check.isChecked('isolated-item')).toBe(false)
  })
})
