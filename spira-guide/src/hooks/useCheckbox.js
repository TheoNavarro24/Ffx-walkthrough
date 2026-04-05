import { useLocalStorage } from './useLocalStorage'

export function useCheckbox() {
  const [checks, setChecks] = useLocalStorage('spira-checks', {})

  function isChecked(id) {
    return checks[id] === true
  }

  function toggle(id) {
    setChecks({ ...checks, [id]: !checks[id] })
  }

  function checkedCount(ids) {
    return ids.filter((id) => checks[id] === true).length
  }

  return { isChecked, toggle, checkedCount }
}
