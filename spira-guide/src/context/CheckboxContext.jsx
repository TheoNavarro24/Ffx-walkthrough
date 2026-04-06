import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSaveSlot } from './SaveContext'

const CheckboxContext = createContext(null)

export function CheckboxProvider({ children }) {
  const { activeSlot } = useSaveSlot()
  const key = `spira-checks:${activeSlot.id}`

  const [checks, setChecks] = useState(() => {
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
      setChecks(stored !== null ? JSON.parse(stored) : {})
    } catch {
      setChecks({})
    }
  }, [key])

  const toggle = useCallback((id) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch { /* storage full */ }
      return next
    })
  }, [key])

  const isChecked = useCallback((id) => {
    return checks[id] === true
  }, [checks])

  const checkedCount = useCallback((ids) => {
    return ids.filter((id) => checks[id] === true).length
  }, [checks])

  return (
    <CheckboxContext.Provider value={{ isChecked, toggle, checkedCount }}>
      {children}
    </CheckboxContext.Provider>
  )
}

const FALLBACK = {
  isChecked: () => false,
  toggle: () => {},
  checkedCount: () => 0,
}

export function useCheckboxContext() {
  return useContext(CheckboxContext) ?? FALLBACK
}
