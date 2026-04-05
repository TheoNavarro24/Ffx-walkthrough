import { createContext, useContext, useState } from 'react'

// ─── Migration ──────────────────────────────────────────────────────────────

export function migrateLegacyChecks() {
  // 1. Check if spira-slots already exists and is valid
  const raw = localStorage.getItem('spira-slots')
  if (raw !== null) {
    try {
      JSON.parse(raw)
      return // already migrated and valid — do nothing
    } catch {
      // malformed — fall through to re-initialize
    }
  }

  // 2. Attempt to migrate legacy spira-checks
  const legacyRaw = localStorage.getItem('spira-checks')
  let legacyChecks = {}
  if (legacyRaw !== null) {
    try { legacyChecks = JSON.parse(legacyRaw) } catch { /* treat as empty */ }
    if (typeof legacyChecks !== 'object' || legacyChecks === null) legacyChecks = {}
  }

  // 3. Copy into slot-default only if slot-default doesn't already exist
  if (localStorage.getItem('spira-checks:slot-default') === null) {
    localStorage.setItem('spira-checks:slot-default', JSON.stringify(legacyChecks))
  }

  // 4. Delete the old key (always, if it existed)
  localStorage.removeItem('spira-checks')

  // 5. Write spira-slots
  const slotsMeta = {
    slots: [{ id: 'slot-default', name: 'Main Run', createdAt: new Date().toISOString() }],
    activeSlotId: 'slot-default',
  }
  localStorage.setItem('spira-slots', JSON.stringify(slotsMeta))
}

// ─── Context ─────────────────────────────────────────────────────────────────

const SaveContext = createContext(null)

const DEFAULT_SLOT = { id: 'slot-default', name: 'Main Run', createdAt: new Date().toISOString() }
const FALLBACK_CTX = {
  slots: [DEFAULT_SLOT],
  activeSlot: DEFAULT_SLOT,
  createSlot: () => {},
  deleteSlot: () => {},
  renameSlot: () => {},
  switchSlot: () => {},
}

export function useSaveSlot() {
  return useContext(SaveContext) ?? FALLBACK_CTX
}

function loadSlots() {
  migrateLegacyChecks()
  const raw = localStorage.getItem('spira-slots')
  try {
    return JSON.parse(raw)
  } catch {
    return { slots: [{ id: 'slot-default', name: 'Main Run', createdAt: new Date().toISOString() }], activeSlotId: 'slot-default' }
  }
}

export function SaveContextProvider({ children }) {
  const initial = loadSlots()
  const [slots, setSlots] = useState(initial.slots)
  const [activeSlotId, setActiveSlotId] = useState(initial.activeSlotId)

  const activeSlot = slots.find(s => s.id === activeSlotId) ?? slots[0]

  function persist(nextSlots, nextActiveId) {
    setSlots(nextSlots)
    setActiveSlotId(nextActiveId)
    localStorage.setItem('spira-slots', JSON.stringify({ slots: nextSlots, activeSlotId: nextActiveId }))
  }

  function createSlot(name) {
    const trimmed = name.trim().slice(0, 40)
    if (!trimmed) return
    const id = `slot-${Date.now()}`
    const slot = { id, name: trimmed, createdAt: new Date().toISOString() }
    persist([...slots, slot], id)
  }

  function deleteSlot(id) {
    if (slots.length <= 1) return
    localStorage.removeItem(`spira-checks:${id}`)
    const remaining = slots.filter(s => s.id !== id)
    const nextActiveId = id === activeSlotId ? remaining[0].id : activeSlotId
    persist(remaining, nextActiveId)
  }

  function renameSlot(id, name) {
    const trimmed = name.trim().slice(0, 40)
    if (!trimmed) return
    const nextSlots = slots.map(s => s.id === id ? { ...s, name: trimmed } : s)
    persist(nextSlots, activeSlotId)
  }

  function switchSlot(id) {
    if (!slots.find(s => s.id === id)) return
    persist(slots, id)
  }

  return (
    <SaveContext.Provider value={{ slots, activeSlot, createSlot, deleteSlot, renameSlot, switchSlot }}>
      {children}
    </SaveContext.Provider>
  )
}
