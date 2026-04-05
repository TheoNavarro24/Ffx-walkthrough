import { useLocalStorage } from './useLocalStorage'

export function usePyrefly() {
  const [pyreflyEnabled, setPyreflyEnabled] = useLocalStorage('spira-pyrefly', true)

  function togglePyrefly() {
    setPyreflyEnabled(!pyreflyEnabled)
  }

  return { pyreflyEnabled, togglePyrefly }
}
