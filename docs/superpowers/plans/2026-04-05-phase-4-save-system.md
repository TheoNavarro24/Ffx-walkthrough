# Phase 4: Save System & Settings — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat `spira-checks` localStorage key with a slot-aware save system, add named slot management, export/import, and build out the Settings page.

**Architecture:** A new `SaveContextProvider` (in `src/context/SaveContext.jsx`) runs `migrateLegacyChecks()` synchronously at init, then provides `useSaveSlot()` to the tree. `useCheckbox` reads `activeSlot.id` from that context to scope its key to `spira-checks:{slotId}`. Everything else (Settings page, export/import, pyrefly toggle) builds on top of these two primitives.

**Tech Stack:** React 19 JSX, Vitest + `@testing-library/react` (`renderHook`, `act`, `render`), localStorage, FileReader API.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/context/SaveContext.jsx` | **Create** | `migrateLegacyChecks()`, `SaveContextProvider`, `useSaveSlot()` |
| `src/context/SaveContext.test.jsx` | **Create** | Unit tests for migration + all slot CRUD |
| `src/hooks/useCheckbox.js` | **Edit** | Scope localStorage key to active slot |
| `src/hooks/useCheckbox.test.js` | **Edit** | Add `SaveContextProvider` wrapper to all tests |
| `src/hooks/usePyrefly.js` | **Create** | Read/write `spira-pyrefly` boolean |
| `src/hooks/usePyrefly.test.js` | **Create** | Unit tests for pyrefly toggle |
| `src/hooks/usePyreflyBurst.js` | **Edit** | Guard `triggerPyreflyBurst` behind `spira-pyrefly` check |
| `src/main.jsx` | **Edit** | Wrap `RouterProvider` with `SaveContextProvider` |
| `src/pages/SettingsPage.jsx` | **Rewrite** | Three-panel settings UI |

---

## Task 1: `migrateLegacyChecks()` + tests

**Files:**
- Create: `src/context/SaveContext.jsx`
- Create: `src/context/SaveContext.test.jsx`

This task is pure logic — no React, no rendering. `migrateLegacyChecks()` reads/writes `localStorage` directly. Get it tested and locked before building anything else.

- [ ] **Step 1.1: Write failing tests for migration**

Create `src/context/SaveContext.test.jsx`:

```jsx
import { migrateLegacyChecks } from './SaveContext'

beforeEach(() => localStorage.clear())

describe('migrateLegacyChecks', () => {
  it('creates a default slot when nothing exists', () => {
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots).toHaveLength(1)
    expect(data.slots[0].id).toBe('slot-default')
    expect(data.slots[0].name).toBe('Main Run')
    expect(data.activeSlotId).toBe('slot-default')
  })

  it('migrates existing spira-checks into slot-default', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'item-1': true }))
    migrateLegacyChecks()
    expect(localStorage.getItem('spira-checks')).toBeNull()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({ 'item-1': true })
  })

  it('does not overwrite existing slot-default checks during migration', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'old': true }))
    localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'existing': true }))
    migrateLegacyChecks()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({ 'existing': true })
    expect(localStorage.getItem('spira-checks')).toBeNull()
  })

  it('is idempotent when spira-slots already exists', () => {
    const existing = { slots: [{ id: 'slot-abc', name: 'My Run', createdAt: '2026-01-01' }], activeSlotId: 'slot-abc' }
    localStorage.setItem('spira-slots', JSON.stringify(existing))
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots[0].id).toBe('slot-abc')
  })

  it('re-initializes when spira-slots is malformed', () => {
    localStorage.setItem('spira-slots', 'NOT_JSON')
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots[0].id).toBe('slot-default')
  })

  it('treats malformed spira-checks as empty object', () => {
    localStorage.setItem('spira-checks', 'GARBAGE')
    migrateLegacyChecks()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({})
  })
})
```

- [ ] **Step 1.2: Run tests — confirm all fail**

```bash
cd spira-guide && npx vitest run src/context/SaveContext.test.jsx
```
Expected: all tests fail with "migrateLegacyChecks is not a function" or module not found.

- [ ] **Step 1.3: Implement `migrateLegacyChecks()`**

Create `src/context/SaveContext.jsx` with just the migration function for now:

```jsx
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

// ─── Context (stub — completed in Task 2) ───────────────────────────────────

const SaveContext = createContext(null)
export function useSaveSlot() { return useContext(SaveContext) }
export function SaveContextProvider({ children }) { return children }
```

- [ ] **Step 1.4: Run tests — confirm all pass**

```bash
cd spira-guide && npx vitest run src/context/SaveContext.test.jsx
```
Expected: 6 passing.

- [ ] **Step 1.5: Commit**

```bash
cd spira-guide && git add src/context/SaveContext.jsx src/context/SaveContext.test.jsx
git commit -m "feat: add migrateLegacyChecks with full edge-case coverage"
```

---

## Task 2: `SaveContextProvider` + `useSaveSlot`

**Files:**
- Modify: `src/context/SaveContext.jsx`
- Modify: `src/context/SaveContext.test.jsx`

- [ ] **Step 2.1: Add slot CRUD tests**

Append to `src/context/SaveContext.test.jsx`:

```jsx
import { render, act, screen } from '@testing-library/react'
import { SaveContextProvider, useSaveSlot } from './SaveContext'

// Helper: render a component that exposes useSaveSlot for testing
function TestConsumer({ fn }) {
  const ctx = useSaveSlot()
  fn(ctx)
  return null
}

function renderWithSave(fn) {
  let captured
  render(
    <SaveContextProvider>
      <TestConsumer fn={(ctx) => { captured = ctx }} />
    </SaveContextProvider>
  )
  return () => captured
}

describe('useSaveSlot', () => {
  beforeEach(() => localStorage.clear())

  it('initialises with a default slot after migration', () => {
    const getCtx = renderWithSave(() => {})
    expect(getCtx().slots).toHaveLength(1)
    expect(getCtx().activeSlot.name).toBe('Main Run')
  })

  it('createSlot adds a slot and switches to it', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('100% Run'))
    expect(getCtx().slots).toHaveLength(2)
    expect(getCtx().activeSlot.name).toBe('100% Run')
  })

  it('deleteSlot removes non-active slot without changing active', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Extra'))
    const extraId = getCtx().slots.find(s => s.name === 'Extra').id
    const activeId = getCtx().activeSlot.id
    act(() => getCtx().deleteSlot(extraId))
    expect(getCtx().slots).toHaveLength(1)
    expect(getCtx().activeSlot.id).toBe(activeId)
  })

  it('deleteSlot on active slot switches to first remaining', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Other'))
    const otherId = getCtx().slots.find(s => s.name === 'Other').id
    act(() => getCtx().switchSlot(otherId))
    act(() => getCtx().deleteSlot(otherId))
    expect(getCtx().activeSlot.name).toBe('Main Run')
  })

  it('deleteSlot does nothing when only one slot exists', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().deleteSlot(id))
    expect(getCtx().slots).toHaveLength(1)
  })

  it('deleteSlot removes the corresponding spira-checks key', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Temp'))
    const tempId = getCtx().slots.find(s => s.name === 'Temp').id
    localStorage.setItem(`spira-checks:${tempId}`, JSON.stringify({ x: true }))
    act(() => getCtx().deleteSlot(tempId))
    expect(localStorage.getItem(`spira-checks:${tempId}`)).toBeNull()
  })

  it('renameSlot updates the slot name', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().renameSlot(id, 'Renamed'))
    expect(getCtx().activeSlot.name).toBe('Renamed')
  })

  it('renameSlot ignores empty string', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    const originalName = getCtx().activeSlot.name
    act(() => getCtx().renameSlot(id, ''))
    expect(getCtx().activeSlot.name).toBe(originalName)
  })

  it('renameSlot truncates names over 40 characters', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().renameSlot(id, 'A'.repeat(50)))
    expect(getCtx().activeSlot.name.length).toBe(40)
  })

  it('switchSlot changes the active slot', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Other'))
    const otherId = getCtx().slots.find(s => s.name === 'Other').id
    act(() => getCtx().switchSlot(otherId))
    expect(getCtx().activeSlot.name).toBe('Other')
  })

  it('persists slot state to localStorage', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Saved'))
    const stored = JSON.parse(localStorage.getItem('spira-slots'))
    expect(stored.slots).toHaveLength(2)
  })
})
```

- [ ] **Step 2.2: Run tests — confirm new ones fail**

```bash
cd spira-guide && npx vitest run src/context/SaveContext.test.jsx
```
Expected: migration tests still pass, slot CRUD tests fail.

- [ ] **Step 2.3: Implement `SaveContextProvider` and `useSaveSlot`**

Replace the stub section in `src/context/SaveContext.jsx` (keep `migrateLegacyChecks` unchanged):

```jsx
// ─── Context ─────────────────────────────────────────────────────────────────

const SaveContext = createContext(null)

export function useSaveSlot() {
  return useContext(SaveContext)
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
```

- [ ] **Step 2.4: Run all SaveContext tests — confirm all pass**

```bash
cd spira-guide && npx vitest run src/context/SaveContext.test.jsx
```
Expected: all 17+ tests passing.

- [ ] **Step 2.5: Commit**

```bash
git add src/context/SaveContext.jsx src/context/SaveContext.test.jsx
git commit -m "feat: SaveContextProvider with full slot CRUD and migration"
```

---

## Task 3: Wire `SaveContextProvider` into the app

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 3.1: Add `SaveContextProvider` to `main.jsx`**

In `src/main.jsx`, import and wrap `RouterProvider`:

```jsx
import { SaveContextProvider } from './context/SaveContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TocProvider>
      <SaveContextProvider>
        <RouterProvider router={router} />
      </SaveContextProvider>
    </TocProvider>
  </StrictMode>
)
```

- [ ] **Step 3.2: Start dev server and verify no console errors**

```bash
cd spira-guide && npm run dev
```
Open the app, check browser console — no errors. Navigate to a chapter page and verify checkboxes still work.

- [ ] **Step 3.3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: wire SaveContextProvider into app root"
```

---

## Task 4: Refactor `useCheckbox` to be slot-aware

**Files:**
- Modify: `src/hooks/useCheckbox.js`
- Modify: `src/hooks/useCheckbox.test.js`

`useCheckbox` now scopes its localStorage key to the active slot. The public API (`isChecked`, `toggle`, `checkedCount`) does not change. Existing callers (chapter pages, CollectiblesHub) need no changes.

- [ ] **Step 4.1: Update `useCheckbox.test.js` to wrap with `SaveContextProvider`**

Add a wrapper to every `renderHook` call. Replace the entire file:

```js
import { renderHook, act } from '@testing-library/react'
import { useCheckbox } from './useCheckbox'
import { SaveContextProvider, useSaveSlot } from '../context/SaveContext'

function wrapper({ children }) {
  return <SaveContextProvider>{children}</SaveContextProvider>
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
```

- [ ] **Step 4.2: Run tests — confirm they fail (missing context)**

```bash
cd spira-guide && npx vitest run src/hooks/useCheckbox.test.js
```
Expected: 5 existing tests fail because `useCheckbox` calls `useSaveSlot()` which returns `null`.

- [ ] **Step 4.3: Refactor `useCheckbox.js`**

Replace the entire file:

```js
import { useLocalStorage } from './useLocalStorage'
import { useSaveSlot } from '../context/SaveContext'

export function useCheckbox() {
  const { activeSlot } = useSaveSlot()
  const [checks, setChecks] = useLocalStorage(`spira-checks:${activeSlot.id}`, {})

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
```

- [ ] **Step 4.4: Run all tests — confirm they pass**

```bash
cd spira-guide && npx vitest run src/hooks/useCheckbox.test.js
```
Expected: all 6 tests passing.

- [ ] **Step 4.5: Run the full test suite — confirm no regressions**

```bash
cd spira-guide && npm run test:run
```
Expected: all tests passing.

- [ ] **Step 4.6: Commit**

```bash
git add src/hooks/useCheckbox.js src/hooks/useCheckbox.test.js
git commit -m "refactor: scope useCheckbox to active save slot"
```

---

## Task 5: `usePyrefly` hook + update `triggerPyreflyBurst`

**Files:**
- Create: `src/hooks/usePyrefly.js`
- Create: `src/hooks/usePyrefly.test.js`
- Modify: `src/hooks/usePyreflyBurst.js`

`usePyrefly` is a thin wrapper around `useLocalStorage`. `triggerPyreflyBurst` reads `spira-pyrefly` directly from localStorage (it's a DOM side-effect function, not a React hook, so it reads storage directly rather than through context).

- [ ] **Step 5.1: Write failing tests for `usePyrefly`**

Create `src/hooks/usePyrefly.test.js`:

```js
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
```

- [ ] **Step 5.2: Run tests — confirm all fail**

```bash
cd spira-guide && npx vitest run src/hooks/usePyrefly.test.js
```
Expected: fail with module not found.

- [ ] **Step 5.3: Implement `usePyrefly`**

Create `src/hooks/usePyrefly.js`:

```js
import { useLocalStorage } from './useLocalStorage'

export function usePyrefly() {
  const [pyreflyEnabled, setPyreflyEnabled] = useLocalStorage('spira-pyrefly', true)

  function togglePyrefly() {
    setPyreflyEnabled(!pyreflyEnabled)
  }

  return { pyreflyEnabled, togglePyrefly }
}
```

- [ ] **Step 5.4: Run tests — confirm all pass**

```bash
cd spira-guide && npx vitest run src/hooks/usePyrefly.test.js
```
Expected: 4 passing.

- [ ] **Step 5.5: Update `triggerPyreflyBurst` to read pyrefly preference**

Replace `src/hooks/usePyreflyBurst.js`:

```js
export function triggerPyreflyBurst(x, y, count = 8) {
  // Check user preference directly — this is a DOM side-effect, not a hook
  try {
    const stored = localStorage.getItem('spira-pyrefly')
    if (stored !== null && JSON.parse(stored) === false) return
  } catch { /* proceed */ }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.className = 'pyrefly-particle'
    const angle = (i / count) * Math.PI * 2
    const dist = 40 + Math.random() * 40
    el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
    el.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`)
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove(), { once: true })
  }
}
```

- [ ] **Step 5.6: Run the full test suite — no regressions**

```bash
cd spira-guide && npm run test:run
```
Expected: all tests passing.

- [ ] **Step 5.7: Commit**

```bash
git add src/hooks/usePyrefly.js src/hooks/usePyrefly.test.js src/hooks/usePyreflyBurst.js
git commit -m "feat: usePyrefly hook + guard triggerPyreflyBurst behind pyrefly preference"
```

---

## Task 6: Settings Page — Save Slots panel

**Files:**
- Modify: `src/pages/SettingsPage.jsx`

The page already has a route and is linked from `LandingPage`. Replace the stub with the full three-panel layout, starting with Save Slots.

CSS uses the existing FFX panel classes (`ffx-panel`, `ffx-header`, `ffx-button`, etc.) from `src/styles/`. Gold color is `#FFC10F`, panel border is `#8888c0`.

- [ ] **Step 6.1: Replace stub with Save Slots panel**

Replace `src/pages/SettingsPage.jsx`:

```jsx
import { useState } from 'react'
import { useSaveSlot } from '../context/SaveContext'

function SlotRow({ slot, isActive, onSwitch, onRename, onDelete, canDelete }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(slot.name)

  function startEdit() {
    setEditValue(slot.name)
    setEditing(true)
  }

  function commitEdit() {
    if (editValue.trim()) {
      onRename(slot.id, editValue.trim())
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditValue(slot.name)
      setEditing(false)
    }
  }

  const createdDate = new Date(slot.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div
      className="flex items-center gap-3 p-3 rounded"
      style={{
        background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        border: isActive ? '1px solid #FFC10F' : '1px solid #8888c0',
        cursor: isActive ? 'default' : 'pointer',
      }}
      onClick={!isActive ? () => onSwitch(slot.id) : undefined}
    >
      {/* Active indicator */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
        background: isActive ? '#FFC10F' : 'transparent',
        border: isActive ? 'none' : '1px solid #8888c0',
      }} />

      {/* Name */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            className="w-full bg-transparent border-b border-white text-white text-sm outline-none"
            value={editValue}
            maxLength={40}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-sm font-semibold truncate block">{slot.name}</span>
        )}
      </div>

      {/* Date */}
      <span className="text-xs opacity-50 flex-shrink-0">{createdDate}</span>

      {/* Actions */}
      <button
        className="text-xs px-2 py-1 rounded"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid #8888c0', color: '#fff' }}
        onClick={(e) => { e.stopPropagation(); startEdit() }}
      >
        Rename
      </button>
      <button
        className="text-xs px-2 py-1 rounded"
        style={{
          background: 'rgba(255,80,80,0.15)',
          border: '1px solid #c08080',
          color: canDelete ? '#ffaaaa' : 'rgba(255,170,170,0.3)',
          cursor: canDelete ? 'pointer' : 'not-allowed',
        }}
        disabled={!canDelete}
        onClick={(e) => {
          e.stopPropagation()
          if (!canDelete) return
          if (window.confirm(`Delete slot "${slot.name}"? This cannot be undone.`)) {
            onDelete(slot.id)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { slots, activeSlot, createSlot, deleteSlot, renameSlot, switchSlot } = useSaveSlot()

  function handleNewSlot() {
    const name = window.prompt('Name for new slot:')
    if (name && name.trim()) createSlot(name.trim())
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
      <h1 className="ffx-header text-3xl">Settings</h1>

      {/* ── Save Slots ── */}
      <div className="ffx-panel p-5">
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
          Save Slots
        </div>
        <div className="flex flex-col gap-2">
          {slots.map((slot) => (
            <SlotRow
              key={slot.id}
              slot={slot}
              isActive={slot.id === activeSlot.id}
              canDelete={slots.length > 1}
              onSwitch={switchSlot}
              onRename={renameSlot}
              onDelete={deleteSlot}
            />
          ))}
        </div>
        <button
          className="w-full mt-3 py-2 text-sm rounded"
          style={{ background: 'transparent', border: '1px dashed #8888c0', color: '#9898c8' }}
          onClick={handleNewSlot}
        >
          + New Slot
        </button>
      </div>

      {/* Data and Display panels — added in Tasks 7 & 8 */}
    </div>
  )
}
```

- [ ] **Step 6.2: Open dev server and verify Save Slots panel**

```bash
cd spira-guide && npm run dev
```
Navigate to Settings (`/#/settings`). Verify:
- Default "Main Run" slot appears with gold border
- "New Slot" button opens a prompt; entering a name creates a second slot
- Clicking a non-active slot switches to it (gold border moves)
- Rename button makes the name inline-editable; Enter/blur confirms; Escape cancels
- Delete button is disabled on the last remaining slot; confirms before deleting

- [ ] **Step 6.3: Run tests — no regressions**

```bash
cd spira-guide && npm run test:run
```

- [ ] **Step 6.4: Commit**

```bash
git add src/pages/SettingsPage.jsx
git commit -m "feat: Settings page — Save Slots panel"
```

---

## Task 7: Settings Page — Data panel (export / import)

**Files:**
- Modify: `src/pages/SettingsPage.jsx`

- [ ] **Step 7.1: Add export/import helpers and Data panel**

Add the following above `export default function SettingsPage`:

```jsx
function exportSave(activeSlot) {
  const checksRaw = localStorage.getItem(`spira-checks:${activeSlot.id}`)
  let checks = {}
  try { checks = JSON.parse(checksRaw) ?? {} } catch { /* empty */ }

  const payload = {
    version: 1,
    slotName: activeSlot.name,
    exportedAt: new Date().toISOString(),
    checks,
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const safeName = activeSlot.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  a.href = url
  a.download = `spira-save-${safeName}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importSave(activeSlot, onSuccess, onError) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = () => {
    const file = input.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (typeof data !== 'object' || typeof data.checks !== 'object' || typeof data.version !== 'number') {
          onError('Invalid save file — missing required fields.')
          return
        }
        const confirmed = window.confirm(
          `Replace all checks in "${activeSlot.name}" with imported data? This cannot be undone.`
        )
        if (!confirmed) return
        const coerced = Object.fromEntries(
          Object.entries(data.checks).map(([k, v]) => [k, Boolean(v)])
        )
        localStorage.setItem(`spira-checks:${activeSlot.id}`, JSON.stringify(coerced))
        // Reload so useLocalStorage re-reads the new data.
        // Intentional: no success message shown — the reload itself confirms the import worked.
        window.location.reload()
      } catch {
        onError('Could not parse the save file.')
      }
    }
    reader.onerror = () => onError('Failed to read the file.')
    reader.readAsText(file)
  }
  input.click()
}
```

Then add the Data panel JSX inside `SettingsPage`, after the Save Slots panel closing `</div>`:

```jsx
{/* ── Data ── */}
<DataPanel activeSlot={activeSlot} />
```

Add the `DataPanel` component above `SettingsPage`:

```jsx
function DataPanel({ activeSlot }) {
  const [importError, setImportError] = useState(null)

  return (
    <div className="ffx-panel p-5">
      <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
        Data
      </div>
      <div className="flex gap-3">
        <button
          className="ffx-button px-4 py-2 text-sm"
          onClick={() => exportSave(activeSlot)}
        >
          ↓ Export Save
        </button>
        <button
          className="ffx-button px-4 py-2 text-sm"
          onClick={() => importSave(activeSlot, () => setImportError(null), setImportError)}
        >
          ↑ Import Save
        </button>
      </div>
      <p className="text-xs opacity-50 mt-2">Active slot: {activeSlot.name}</p>
      {importError && (
        <p className="text-xs mt-2" style={{ color: '#ff8888' }}>{importError}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 7.2: Verify export/import in dev server**

```bash
cd spira-guide && npm run dev
```
- Check a few items on a chapter page, go to Settings, click Export — a `.json` file should download with correct content.
- Import that same file back — confirm dialog appears, page reloads, checkboxes are still checked.
- Try importing a malformed file (e.g. `{}`) — verify inline error message appears.

- [ ] **Step 7.3: Run tests — no regressions**

```bash
cd spira-guide && npm run test:run
```

- [ ] **Step 7.4: Commit**

```bash
git add src/pages/SettingsPage.jsx
git commit -m "feat: Settings page — Data panel with export and import"
```

---

## Task 8: Settings Page — Display panel (pyrefly toggle) + final cleanup

**Files:**
- Modify: `src/pages/SettingsPage.jsx`

- [ ] **Step 8.1: Add pyrefly import and Display panel**

Add to the import at the top of `SettingsPage.jsx`:

```jsx
import { usePyrefly } from '../hooks/usePyrefly'
```

Add `DisplayPanel` component above `SettingsPage`:

```jsx
function DisplayPanel() {
  const { pyreflyEnabled, togglePyrefly } = usePyrefly()

  return (
    <div className="ffx-panel p-5">
      <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
        Display
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm">Pyrefly effects</div>
          <div className="text-xs opacity-50 mt-1">Page transition and completion animations</div>
        </div>
        {/* Pill toggle */}
        <button
          role="switch"
          aria-checked={pyreflyEnabled}
          onClick={togglePyrefly}
          style={{
            width: 44, height: 24, borderRadius: 12, flexShrink: 0,
            background: pyreflyEnabled ? '#FFC10F' : '#444080',
            border: 'none', cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s',
          }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff', position: 'absolute', top: 2,
            left: pyreflyEnabled ? 22 : 2,
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }} />
        </button>
      </div>
    </div>
  )
}
```

Add `<DisplayPanel />` inside `SettingsPage` after the Data panel.

- [ ] **Step 8.2: Verify display panel in dev server**

```bash
cd spira-guide && npm run dev
```
- Toggle pyrefly off in Settings, navigate to a chapter page and check an item — no burst animation should fire.
- Toggle back on — burst animation should fire again on checkbox.

- [ ] **Step 8.3: Run the full test suite one final time**

```bash
cd spira-guide && npm run test:run
```
Expected: all tests passing.

- [ ] **Step 8.4: Final commit**

```bash
git add src/pages/SettingsPage.jsx
git commit -m "feat: Settings page — Display panel with pyrefly toggle (Phase 4 complete)"
```

---

## Appendix: Running tests

```bash
# All tests
cd spira-guide && npm run test:run

# Single file
cd spira-guide && npx vitest run src/context/SaveContext.test.jsx

# Watch mode (dev)
cd spira-guide && npm run test
```

## Appendix: Key patterns in this codebase

- **Hooks use `useLocalStorage`** (`src/hooks/useLocalStorage.js`) — pass a key and default value; returns `[value, setter]` like `useState`. Setter persists to localStorage automatically.
- **Context pattern**: see `src/context/TocContext.jsx` for a minimal example of the provider + `useContext` hook pattern used here.
- **Page routing**: `createHashRouter` in `main.jsx` — hash-based, so URLs look like `/#/settings`. No server config needed.
- **Styles**: Use `className="ffx-panel"`, `"ffx-button"`, `"ffx-header"` for themed components. Tailwind utilities for spacing/layout. Never use bare `/img/...` paths for images — use `assetUrl()` from `src/utils/assetUrl.js`.
