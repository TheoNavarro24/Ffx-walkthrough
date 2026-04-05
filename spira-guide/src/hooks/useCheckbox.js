import { useState, useEffect } from 'react'
import { useSaveSlot } from '../context/SaveContext'

export function useCheckbox() {
  const { activeSlot } = useSaveSlot()
  const key = `spira-checks:${activeSlot.id}`

  const [checks, setChecksState] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  // Reload from storage when slot changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      setChecksState(stored !== null ? JSON.parse(stored) : {})
    } catch {
      setChecksState({})
    }
  }, [key])

  function toggle(id) {
    const next = { ...checks, [id]: !checks[id] }
    setChecksState(next)
    try {
      localStorage.setItem(key, JSON.stringify(next))
    } catch { /* storage full */ }
  }

  function isChecked(id) {
    return checks[id] === true
  }

  function checkedCount(ids) {
    return ids.filter((id) => checks[id] === true).length
  }

  return { isChecked, toggle, checkedCount }
}
