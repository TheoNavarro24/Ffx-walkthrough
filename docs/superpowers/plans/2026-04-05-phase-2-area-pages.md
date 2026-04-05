# Phase 2: Area Page Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 15 area page components and hooks so every chapter route renders a complete, interactive walkthrough page using real data from existing JSON files, with checkboxes persisted to localStorage.

**Architecture:** Outside-in — ChapterPage shell first, then sections top-to-bottom as defined in the spec. One stub data file (Besaid) drives all component development; other chapters fall back gracefully. A thin `useCheckbox` hook persists all checkbox state to localStorage now, ready for Phase 4's named-slot upgrade.

**Tech Stack:** React 19 + JSX, Vite, Vitest + @testing-library/react, Tailwind CSS + FFX theme CSS (`ffx-panel`, `ffx-header`, `ffx-button`), React Router `useParams`

---

## File Map

**Create:**
- `spira-guide/src/data/chapters/besaid.json` — stub chapter data file
- `spira-guide/src/data/cloisters/besaid.json` — stub cloister data file
- `spira-guide/src/data/chapterData.js` — registry mapping slugs to chapter JSON; returns empty structure for missing chapters
- `spira-guide/src/data/bossBySlug.js` — resolves boss slug → full boss object from monsters.json
- `spira-guide/src/hooks/useLocalStorage.js` — general localStorage persistence hook
- `spira-guide/src/hooks/useLocalStorage.test.js` — tests
- `spira-guide/src/hooks/useCheckbox.js` — checkbox state hook (flat id→boolean map)
- `spira-guide/src/hooks/useCheckbox.test.js` — tests
- `spira-guide/src/hooks/useScrollSpy.js` — IntersectionObserver hook returning active section id
- `spira-guide/src/hooks/useScrollSpy.test.js` — tests
- `spira-guide/src/hooks/useChapterProgress.js` — returns { checked, total } for a chapter slug
- `spira-guide/src/hooks/useChapterProgress.test.js` — tests
- `spira-guide/src/components/MissableAlert.jsx` — red banner listing missable items
- `spira-guide/src/components/MissableAlert.test.jsx` — tests
- `spira-guide/src/components/SubLocation.jsx` — collapsible sub-area group
- `spira-guide/src/components/SubLocation.test.jsx` — tests
- `spira-guide/src/components/ItemList.jsx` — checkable item rows with SD icons and unchecked filter
- `spira-guide/src/components/ItemList.test.jsx` — tests
- `spira-guide/src/components/BossCard.jsx` — compact/expanded boss card with checkbox
- `spira-guide/src/components/BossCard.test.jsx` — tests
- `spira-guide/src/components/ChapterHeader.jsx` — map image, chapter name, act, party indicator
- `spira-guide/src/components/ChapterHeader.test.jsx` — tests
- `spira-guide/src/components/PartyIndicator.jsx` — character portrait row
- `spira-guide/src/components/PartyIndicator.test.jsx` — tests
- `spira-guide/src/components/OakaReminder.jsx` — donation tier card
- `spira-guide/src/components/OakaReminder.test.jsx` — tests
- `spira-guide/src/components/SphereGridTip.jsx` — inline SG milestone tip
- `spira-guide/src/components/SphereGridTip.test.jsx` — tests
- `spira-guide/src/components/CloisterSection.jsx` — cloister map + step list
- `spira-guide/src/components/CloisterSection.test.jsx` — tests
- `spira-guide/src/components/ChapterNav.jsx` — prev/next chapter cards with progress bars
- `spira-guide/src/components/ChapterNav.test.jsx` — tests

**Modify:**
- `spira-guide/src/pages/ChapterPage.jsx` — replace stub with full assembly component
- `spira-guide/src/components/Layout/TableOfContents.jsx` — wire up useScrollSpy, render real section links

---

## Task 1: Stub data files + chapterData registry

**Files:**
- Create: `spira-guide/src/data/chapters/besaid.json`
- Create: `spira-guide/src/data/cloisters/besaid.json`
- Create: `spira-guide/src/data/chapterData.js`

- [ ] **Step 1: Create the Besaid chapter stub**

```json
{
  "slug": "besaid",
  "missables": ["Rod of Wisdom — Destruction Sphere, Besaid Temple. Dark Valefor blocks return in HD."],
  "party": ["Tidus", "Wakka", "Lulu", "Yuna"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 },
  "sgTip": "Yuna joins here. Prioritise NulBlaze and NulShock — they trivialise the next two Sinspawn fights.",
  "subLocations": [
    {
      "name": "Beach",
      "prose": "Head east along the beach before entering the village. The Moon Crest chest is in the eastern alcove — missable once you leave Besaid.",
      "items": [
        { "id": "besaid-moon-crest", "name": "Moon Crest", "icon": "moon-crest", "missable": true },
        { "id": "besaid-antidote", "name": "Antidote", "icon": "antidote", "missable": false },
        { "id": "besaid-200gil", "name": "200 Gil", "icon": "gil", "missable": false }
      ]
    },
    {
      "name": "Besaid Village",
      "prose": "Talk to NPCs and check chests around the huts.",
      "items": [
        { "id": "besaid-phoenix-down", "name": "Phoenix Down", "icon": "phoenix-down", "missable": false },
        { "id": "besaid-2potions", "name": "Potion ×2", "icon": "potion", "missable": false },
        { "id": "besaid-hi-potion", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "besaid-400gil", "name": "400 Gil", "icon": "gil", "missable": false },
        { "id": "besaid-primer-ii", "name": "Al Bhed Primer Vol. II", "icon": "primer", "missable": false }
      ]
    },
    {
      "name": "Besaid Temple",
      "prose": "Complete the Cloister of Trials. Get the Destruction Sphere chest before leaving — unavailable after Valefor fight.",
      "items": [
        { "id": "besaid-rod-of-wisdom", "name": "Rod of Wisdom", "icon": "rod-of-wisdom", "missable": true }
      ]
    }
  ],
  "bosses": ["valefor"],
  "cloister": "besaid",
  "optionalAreas": []
}
```

- [ ] **Step 2: Create the Besaid cloister stub**

```json
{
  "slug": "besaid",
  "name": "Besaid Cloister of Trials",
  "mapImage": "/img/maps/cloisters/besaid.png",
  "destructionSphere": "Rod of Wisdom",
  "missable": true,
  "steps": [
    "Take the Besaid Sphere from the recess on the left wall.",
    "Insert it into the slot beside the door — the door opens.",
    "Take the Glyph Sphere from the pedestal ahead.",
    "Insert the Glyph Sphere into the recess in the wall to reveal a hidden door.",
    "Go through the hidden door and take the Destruction Sphere.",
    "Insert the Destruction Sphere into the recess inside — chest appears with Rod of Wisdom.",
    "Return the Besaid Sphere to its original recess to unlock the path forward."
  ]
}
```

- [ ] **Step 3: Create the chapterData registry**

```js
// spira-guide/src/data/chapterData.js
import besaidData from './chapters/besaid.json'

const chapters = {
  besaid: besaidData,
}

const EMPTY_CHAPTER = {
  missables: [],
  party: [],
  oaka: null,
  sgTip: null,
  subLocations: [],
  bosses: [],
  cloister: null,
  optionalAreas: [],
}

export function getChapterData(slug) {
  return chapters[slug] ?? { ...EMPTY_CHAPTER, slug }
}
```

- [ ] **Step 4: Verify JSON files parse and registry returns data**

```
cd spira-guide
node -e "import('./src/data/chapterData.js').then(m => console.log(m.getChapterData('besaid').slug))"
```
Expected output: `besaid`

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/data/chapters/besaid.json spira-guide/src/data/cloisters/besaid.json spira-guide/src/data/chapterData.js
git commit -m "feat: add besaid stub data and chapterData registry"
```

---

## Task 2: ChapterPage shell

**Files:**
- Modify: `spira-guide/src/pages/ChapterPage.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// spira-guide/src/pages/ChapterPage.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ChapterPage from './ChapterPage'

function renderChapter(slug = 'besaid') {
  return render(
    <MemoryRouter initialEntries={[`/chapter/${slug}`]}>
      <Routes>
        <Route path="/chapter/:slug" element={<ChapterPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ChapterPage', () => {
  it('renders the chapter name as a heading', () => {
    renderChapter('besaid')
    expect(screen.getByRole('heading', { name: /besaid/i })).toBeInTheDocument()
  })

  it('renders section anchors for TOC', () => {
    renderChapter('besaid')
    expect(document.getElementById('section-walkthrough')).toBeInTheDocument()
    expect(document.getElementById('section-bosses')).toBeInTheDocument()
  })

  it('renders gracefully for an unknown chapter slug', () => {
    renderChapter('unknown-slug')
    expect(document.getElementById('section-walkthrough')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- ChapterPage --run
```
Expected: FAIL — headings and section anchors not present

- [ ] **Step 3: Implement ChapterPage shell**

```jsx
// spira-guide/src/pages/ChapterPage.jsx
import { useParams } from 'react-router-dom'
import { getChapterBySlug } from '../data/chapterIndex'
import { getChapterData } from '../data/chapterData'

export default function ChapterPage() {
  const { slug } = useParams()
  const chapter = getChapterBySlug(slug)
  const data = getChapterData(slug)

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4">
      <h1 className="ffx-header text-2xl">{chapter?.name ?? slug}</h1>

      <section id="section-walkthrough" aria-label="Walkthrough and Items">
        <h2 className="ffx-header text-base mb-2">Walkthrough &amp; Items</h2>
        {data.subLocations.map((loc) => (
          <div key={loc.name}>{loc.name}</div>
        ))}
      </section>

      <section id="section-bosses" aria-label="Boss Encounters">
        <h2 className="ffx-header text-base mb-2">Boss Encounters</h2>
      </section>

      <section id="section-collectibles" aria-label="Collectibles">
        <h2 className="ffx-header text-base mb-2">Collectibles</h2>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- ChapterPage --run
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/pages/ChapterPage.jsx spira-guide/src/pages/ChapterPage.test.jsx
git commit -m "feat: build ChapterPage shell with section anchors"
```

---

## Task 3: useLocalStorage hook

**Files:**
- Create: `spira-guide/src/hooks/useLocalStorage.js`
- Create: `spira-guide/src/hooks/useLocalStorage.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// spira-guide/src/hooks/useLocalStorage.test.js
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
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- useLocalStorage --run
```
Expected: FAIL

- [ ] **Step 3: Implement**

```js
// spira-guide/src/hooks/useLocalStorage.js
import { useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  function set(newValue) {
    setValue(newValue)
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch {
      // storage full or unavailable — state still updates in memory
    }
  }

  return [value, set]
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- useLocalStorage --run
```
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/hooks/useLocalStorage.js spira-guide/src/hooks/useLocalStorage.test.js
git commit -m "feat: add useLocalStorage hook"
```

---

## Task 4: useScrollSpy hook + TableOfContents wiring

**Files:**
- Create: `spira-guide/src/hooks/useScrollSpy.js`
- Create: `spira-guide/src/hooks/useScrollSpy.test.js`
- Modify: `spira-guide/src/components/Layout/TableOfContents.jsx`

- [ ] **Step 1: Write the failing test for useScrollSpy**

```js
// spira-guide/src/hooks/useScrollSpy.test.js
import { renderHook } from '@testing-library/react'
import { useScrollSpy } from './useScrollSpy'

// IntersectionObserver is not available in jsdom — provide a minimal mock
const observeMock = vi.fn()
const disconnectMock = vi.fn()
vi.stubGlobal('IntersectionObserver', vi.fn((callback) => ({
  observe: observeMock,
  disconnect: disconnectMock,
})))

describe('useScrollSpy', () => {
  it('returns null when no sections are provided', () => {
    const { result } = renderHook(() => useScrollSpy([]))
    expect(result.current).toBeNull()
  })

  it('calls observe for each section id', () => {
    const div1 = document.createElement('div')
    div1.id = 'section-walkthrough'
    const div2 = document.createElement('div')
    div2.id = 'section-bosses'
    document.body.append(div1, div2)

    renderHook(() => useScrollSpy(['section-walkthrough', 'section-bosses']))

    expect(observeMock).toHaveBeenCalledTimes(2)
    div1.remove()
    div2.remove()
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(['section-walkthrough']))
    unmount()
    expect(disconnectMock).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- useScrollSpy --run
```
Expected: FAIL

- [ ] **Step 3: Implement useScrollSpy**

```js
// spira-guide/src/hooks/useScrollSpy.js
import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds.join(',')])

  return sectionIds.length === 0 ? null : activeId
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- useScrollSpy --run
```
Expected: PASS (3 tests)

- [ ] **Step 5: Wire TableOfContents to useScrollSpy**

Update `TableOfContents.jsx` to accept `sections` and `activeId` props (passed down from AppShell/ChapterPage):

```jsx
// spira-guide/src/components/Layout/TableOfContents.jsx
export default function TableOfContents({ isOpen, onToggle, sections = [], activeId = null }) {
  return (
    <div
      data-testid="toc-panel"
      className={`transition-all ${isOpen ? 'toc-expanded w-40' : 'w-6'}`}
    >
      <button
        className="ffx-button w-full text-xs"
        onClick={onToggle}
        aria-label="Contents"
      >
        {isOpen ? '›' : '‹'}
      </button>
      {isOpen && (
        <nav className="p-2 text-sm" aria-label="Page contents">
          <p className="ffx-header text-xs mb-2">Contents</p>
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block text-xs px-2 py-1 border-l-2 transition-colors ${
                    activeId === s.id
                      ? 'border-[var(--color-border)] text-[var(--color-border)]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Wire useScrollSpy into ChapterPage**

ChapterPage must call `useScrollSpy` and pass the result down through AppShell to `TableOfContents`. The simplest approach for Phase 2: pass `sections` and `activeId` via React context so ChapterPage can set them without prop-drilling through AppShell.

Create `spira-guide/src/context/TocContext.js`:

```js
import { createContext, useContext, useState } from 'react'

const TocContext = createContext({ sections: [], activeId: null, setSections: () => {} })

export function TocProvider({ children }) {
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState(null)
  return (
    <TocContext.Provider value={{ sections, activeId, setSections, setActiveId }}>
      {children}
    </TocContext.Provider>
  )
}

export function useToc() {
  return useContext(TocContext)
}
```

Wrap the router in `TocProvider` in `main.jsx`. In `AppShell.jsx`, read `sections` and `activeId` from `useToc()` and pass them to `TableOfContents`. In `ChapterPage.jsx`, call `useScrollSpy` and write results to context via `setActiveId`:

```jsx
// In ChapterPage.jsx
import { useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useToc } from '../context/TocContext'

const SECTION_IDS = ['section-walkthrough', 'section-bosses', 'section-collectibles']
const SECTION_LABELS = [
  { id: 'section-walkthrough', label: 'Walkthrough' },
  { id: 'section-bosses', label: 'Bosses' },
  { id: 'section-collectibles', label: 'Collectibles' },
]

export default function ChapterPage() {
  // ... existing code ...
  const activeId = useScrollSpy(SECTION_IDS)
  const { setSections, setActiveId } = useToc()

  useEffect(() => {
    setSections(SECTION_LABELS)
    return () => setSections([]) // clear on unmount
  }, [])

  useEffect(() => {
    setActiveId(activeId)
  }, [activeId])

  // ... rest of component unchanged
}
```

- [ ] **Step 7: Update AppShell.test.jsx to pass sections prop**

The existing AppShell tests render `<AppShell />` without sections — they should still pass since `sections` defaults to `[]`. Run to verify:

```
cd spira-guide && npm run test -- AppShell --run
```
Expected: PASS (5 tests, unchanged)

- [ ] **Step 8: Commit**

```bash
git add spira-guide/src/hooks/useScrollSpy.js spira-guide/src/hooks/useScrollSpy.test.js spira-guide/src/components/Layout/TableOfContents.jsx spira-guide/src/context/TocContext.js spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add useScrollSpy hook, wire TableOfContents via TocContext"
```

---

## Task 5: SubLocation component

**Files:**
- Create: `spira-guide/src/components/SubLocation.jsx`
- Create: `spira-guide/src/components/SubLocation.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/SubLocation.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import SubLocation from './SubLocation'

const items = [
  { id: 'item-1', name: 'Moon Crest', icon: 'moon-crest', missable: true },
  { id: 'item-2', name: 'Antidote', icon: 'antidote', missable: false },
]

// Stub useLocalStorage — test collapse without real localStorage
beforeEach(() => localStorage.clear())

describe('SubLocation', () => {
  it('renders the location name', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByText('Beach')).toBeInTheDocument()
  })

  it('renders items when expanded', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByText('Moon Crest')).toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('collapses and hides items on toggle', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    fireEvent.click(screen.getByRole('button', { name: /beach/i }))
    expect(screen.queryByText('Moon Crest')).not.toBeInTheDocument()
  })

  it('shows MISSABLE tag for missable items', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByText(/missable/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- SubLocation --run
```
Expected: FAIL

- [ ] **Step 3: Implement SubLocation**

```jsx
// spira-guide/src/components/SubLocation.jsx
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function SubLocation({ slug, name, prose, items = [], children }) {
  const storageKey = `subloc-${slug}-${name}`
  const [open, setOpen] = useLocalStorage(storageKey, true)

  return (
    <div className="border-b border-[#0d2137] last:border-0">
      <button
        className="w-full text-left px-4 py-2 text-sm text-[var(--color-border-alt)] bg-[rgba(79,195,247,0.05)] hover:bg-[rgba(79,195,247,0.08)] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={name}
      >
        {open ? '▼' : '▶'} {name}
        {!open && items.length > 0 && (
          <span className="ml-3 text-xs text-gray-600">
            {items.filter((i) => i.missable).length > 0
              ? `${items.filter((i) => i.missable).length} missable`
              : `${items.length} items`}
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 py-3 flex flex-col gap-2">
          {prose && <p className="text-xs text-gray-400 italic mb-1">{prose}</p>}
          {children}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- SubLocation --run
```
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/components/SubLocation.jsx spira-guide/src/components/SubLocation.test.jsx
git commit -m "feat: add SubLocation collapsible component"
```

---

## Task 6: useCheckbox hook

**Files:**
- Create: `spira-guide/src/hooks/useCheckbox.js`
- Create: `spira-guide/src/hooks/useCheckbox.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// spira-guide/src/hooks/useCheckbox.test.js
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
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- useCheckbox --run
```
Expected: FAIL

- [ ] **Step 3: Implement useCheckbox**

```js
// spira-guide/src/hooks/useCheckbox.js
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
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- useCheckbox --run
```
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/hooks/useCheckbox.js spira-guide/src/hooks/useCheckbox.test.js
git commit -m "feat: add useCheckbox hook with localStorage persistence"
```

---

## Task 7: ItemList component (with checkboxes + unchecked filter)

**Files:**
- Create: `spira-guide/src/components/ItemList.jsx`
- Create: `spira-guide/src/components/ItemList.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/ItemList.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import ItemList from './ItemList'

beforeEach(() => localStorage.clear())

const items = [
  { id: 'item-1', name: 'Moon Crest', icon: 'moon-crest', missable: true },
  { id: 'item-2', name: 'Antidote', icon: 'antidote', missable: false },
]

describe('ItemList', () => {
  it('renders all items', () => {
    render(<ItemList items={items} />)
    expect(screen.getByText('Moon Crest')).toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders checkboxes for each item', () => {
    render(<ItemList items={items} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })

  it('checking an item marks it visually as done', () => {
    render(<ItemList items={items} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('hides checked items when showUncheckedOnly is true', () => {
    render(<ItemList items={items} showUncheckedOnly />)
    // check item-1 first
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.queryByText('Moon Crest')).not.toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders missable tag for missable items', () => {
    render(<ItemList items={items} />)
    expect(screen.getByText(/missable/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- ItemList --run
```
Expected: FAIL

- [ ] **Step 3: Implement ItemList**

```jsx
// spira-guide/src/components/ItemList.jsx
import { useCheckbox } from '../hooks/useCheckbox'

export default function ItemList({ items = [], showUncheckedOnly = false }) {
  const { isChecked, toggle } = useCheckbox()

  const visible = showUncheckedOnly
    ? items.filter((item) => !isChecked(item.id))
    : items

  if (visible.length === 0 && showUncheckedOnly) {
    return <p className="text-xs text-gray-500 italic py-1">All items collected.</p>
  }

  return (
    <ul className="flex flex-col gap-1">
      {visible.map((item) => {
        const checked = isChecked(item.id)
        return (
          <li
            key={item.id}
            className={`flex items-center gap-2 text-sm transition-opacity ${checked ? 'opacity-40 line-through' : ''}`}
          >
            <input
              type="checkbox"
              id={item.id}
              checked={checked}
              onChange={() => toggle(item.id)}
              className="w-3.5 h-3.5 accent-[var(--color-border)] cursor-pointer"
            />
            <img
              src={`/img/items/sd/${item.icon}.png`}
              alt=""
              width={16}
              height={16}
              className="flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <label htmlFor={item.id} className="cursor-pointer flex-1">
              {item.name}
              {item.missable && (
                <span className="ml-2 text-[10px] text-red-400 font-bold uppercase tracking-wide">
                  Missable
                </span>
              )}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- ItemList --run
```
Expected: PASS (5 tests)

- [ ] **Step 5: Wire SubLocation → ItemList + add unchecked toggle to ChapterPage**

Update `ChapterPage.jsx` to use SubLocation and ItemList, and add a showUncheckedOnly toggle button:

```jsx
// spira-guide/src/pages/ChapterPage.jsx
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getChapterBySlug } from '../data/chapterIndex'
import { getChapterData } from '../data/chapterData'
import SubLocation from '../components/SubLocation'
import ItemList from '../components/ItemList'

export default function ChapterPage() {
  const { slug } = useParams()
  const chapter = getChapterBySlug(slug)
  const data = getChapterData(slug)
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false)

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4">
      <h1 className="ffx-header text-2xl">{chapter?.name ?? slug}</h1>

      <div className="flex justify-end">
        <button
          className="ffx-button text-xs"
          onClick={() => setShowUncheckedOnly((v) => !v)}
        >
          {showUncheckedOnly ? 'Show All' : 'Unchecked Only'}
        </button>
      </div>

      <section id="section-walkthrough" aria-label="Walkthrough and Items">
        <h2 className="ffx-header text-base mb-2">Walkthrough &amp; Items</h2>
        <div className="ffx-panel">
          {data.subLocations.map((loc) => (
            <SubLocation
              key={loc.name}
              slug={slug}
              name={loc.name}
              prose={loc.prose}
              items={loc.items}
            >
              <ItemList items={loc.items} showUncheckedOnly={showUncheckedOnly} />
            </SubLocation>
          ))}
        </div>
      </section>

      <section id="section-bosses" aria-label="Boss Encounters">
        <h2 className="ffx-header text-base mb-2">Boss Encounters</h2>
      </section>

      <section id="section-collectibles" aria-label="Collectibles">
        <h2 className="ffx-header text-base mb-2">Collectibles</h2>
      </section>
    </div>
  )
}
```

- [ ] **Step 6: Run all tests**

```
cd spira-guide && npm run test --run
```
Expected: all passing

- [ ] **Step 7: Commit**

```bash
git add spira-guide/src/components/ItemList.jsx spira-guide/src/components/ItemList.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add ItemList with checkboxes and unchecked-only filter"
```

---

## Task 8: MissableAlert component

**Files:**
- Create: `spira-guide/src/components/MissableAlert.jsx`
- Create: `spira-guide/src/components/MissableAlert.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/MissableAlert.test.jsx
import { render, screen } from '@testing-library/react'
import MissableAlert from './MissableAlert'

describe('MissableAlert', () => {
  it('renders nothing when missables array is empty', () => {
    const { container } = render(<MissableAlert missables={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a banner when missables are present', () => {
    render(<MissableAlert missables={['Rod of Wisdom — Besaid Temple']} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('lists each missable item', () => {
    render(<MissableAlert missables={['Item A', 'Item B']} />)
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Item B')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- MissableAlert --run
```
Expected: FAIL

- [ ] **Step 3: Implement MissableAlert**

```jsx
// spira-guide/src/components/MissableAlert.jsx
export default function MissableAlert({ missables = [] }) {
  if (missables.length === 0) return null

  return (
    <div
      role="alert"
      className="rounded-md border border-red-500 bg-red-900/20 px-4 py-3"
    >
      <p className="text-[10px] uppercase tracking-widest text-red-300 mb-2 font-bold">
        ⚠ Missable in this chapter
      </p>
      <ul className="flex flex-col gap-1">
        {missables.map((m, i) => (
          <li key={i} className="text-sm text-red-200">{m}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- MissableAlert --run
```
Expected: PASS (3 tests)

- [ ] **Step 5: Add MissableAlert to ChapterPage above the heading**

In `ChapterPage.jsx`, import and place `<MissableAlert missables={data.missables} />` as the first element in the return, before the `<h1>`.

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/components/MissableAlert.jsx spira-guide/src/components/MissableAlert.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add MissableAlert red banner"
```

---

## Task 9: bossBySlug utility + BossCard component

**Files:**
- Create: `spira-guide/src/data/bossBySlug.js`
- Create: `spira-guide/src/components/BossCard.jsx`
- Create: `spira-guide/src/components/BossCard.test.jsx`

- [ ] **Step 1: Inspect monsters.json to find boss slug field**

Open `docs/source-data/monsters.json` and find a known boss (e.g. Valefor). Note the exact field names used for: slug/id, name, hp, weaknesses, steals, drops. The file is large (~6 MB) so search for `"Valefor"` rather than reading the whole thing:

```
cd "/Users/theonavarro/FFX walkthrough" && grep -i '"valefor"' docs/source-data/monsters.json | head -5
```

Use these field names in Step 2 below.

- [ ] **Step 2: Create bossBySlug utility**

```js
// spira-guide/src/data/bossBySlug.js
import monsters from '@data/monsters.json'

// Build lookup map keyed by the monster's name lowercased with spaces→hyphens
// Adjust the slug derivation below if monsters.json uses a different id field
const bossMap = {}
for (const m of monsters) {
  if (!m.name) continue
  const slug = m.slug ?? m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  bossMap[slug] = m
}

export function getBoss(slug) {
  return bossMap[slug] ?? null
}
```

> **Note:** After running Step 1, update the slug derivation above to match the actual field names in monsters.json. If monsters have an explicit `slug` or `id` field, use it directly instead of deriving from name.

- [ ] **Step 3: Write the failing BossCard tests**

```jsx
// spira-guide/src/components/BossCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import BossCard from './BossCard'

beforeEach(() => localStorage.clear())

const boss = {
  name: 'Valefor',
  hp: 4000,
  weaknesses: ['Thunder'],
  steals: ['Ability Sphere'],
  drops: ['Ability Sphere'],
  strategy: 'Use Thunder magic. Valefor uses Sonic Wings to reduce turns.',
}

describe('BossCard', () => {
  it('renders the boss name', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.getByText('Valefor')).toBeInTheDocument()
  })

  it('renders HP and weakness in compact view', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.getByText(/4,000/)).toBeInTheDocument()
    expect(screen.getByText(/Thunder/)).toBeInTheDocument()
  })

  it('expands to show strategy on click', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.queryByText(/Sonic Wings/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /valefor/i }))
    expect(screen.getByText(/Sonic Wings/)).toBeInTheDocument()
  })

  it('renders a checkbox for marking the boss as defeated when expanded', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    // checkbox is inside the expanded panel — expand first
    fireEvent.click(screen.getByRole('button', { name: /valefor/i }))
    expect(screen.getByRole('checkbox', { name: /defeated/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

```
cd spira-guide && npm run test -- BossCard --run
```
Expected: FAIL

- [ ] **Step 5: Implement BossCard**

```jsx
// spira-guide/src/components/BossCard.jsx
import { useState } from 'react'
import { useCheckbox } from '../hooks/useCheckbox'

export default function BossCard({ chapterSlug, bossSlug, boss }) {
  const [expanded, setExpanded] = useState(false)
  const { isChecked, toggle } = useCheckbox()
  const checkId = `${chapterSlug}-boss-${bossSlug}`
  const defeated = isChecked(checkId)

  if (!boss) return null

  return (
    <div className={`ffx-panel p-0 overflow-hidden transition-opacity ${defeated ? 'opacity-50' : ''}`}>
      <button
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/5 transition-colors"
        onClick={() => setExpanded((e) => !e)}
        aria-label={boss.name}
        aria-expanded={expanded}
      >
        <img
          src={`/img/bosses/${bossSlug}.png`}
          alt={boss.name}
          width={52}
          height={52}
          className="rounded flex-shrink-0 object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="flex-1 min-w-0">
          <p className="ffx-header text-sm">{boss.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            HP: {boss.hp?.toLocaleString() ?? '???'} · Weak: {boss.weaknesses?.join(', ') ?? '—'}
          </p>
        </div>
        <span className="text-gray-600 text-xs">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#1e3a5f]">
          {boss.strategy && (
            <p className="text-sm text-gray-300 mt-3">{boss.strategy}</p>
          )}
          {boss.steals?.length > 0 && (
            <p className="text-xs text-gray-400">
              <span className="text-[var(--color-border)]">Steal:</span> {boss.steals.join(', ')}
            </p>
          )}
          {boss.drops?.length > 0 && (
            <p className="text-xs text-gray-400">
              <span className="text-[var(--color-border)]">Drops:</span> {boss.drops.join(', ')}
            </p>
          )}
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer mt-1">
            <input
              type="checkbox"
              aria-label="Defeated"
              checked={defeated}
              onChange={() => toggle(checkId)}
              className="accent-[var(--color-border)]"
            />
            Mark as defeated
          </label>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

```
cd spira-guide && npm run test -- BossCard --run
```
Expected: PASS (4 tests)

- [ ] **Step 7: Add Boss section to ChapterPage**

In `ChapterPage.jsx`, import `BossCard` and `getBoss`, and populate the bosses section:

```jsx
import BossCard from '../components/BossCard'
import { getBoss } from '../data/bossBySlug'

// Inside the bosses section:
<section id="section-bosses" aria-label="Boss Encounters">
  <h2 className="ffx-header text-base mb-2">Boss Encounters</h2>
  <div className="flex flex-col gap-3">
    {data.bosses.map((bossSlug) => (
      <BossCard
        key={bossSlug}
        chapterSlug={slug}
        bossSlug={bossSlug}
        boss={getBoss(bossSlug)}
      />
    ))}
  </div>
</section>
```

- [ ] **Step 8: Run all tests**

```
cd spira-guide && npm run test --run
```
Expected: all passing

- [ ] **Step 9: Commit**

```bash
git add spira-guide/src/data/bossBySlug.js spira-guide/src/components/BossCard.jsx spira-guide/src/components/BossCard.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add bossBySlug utility and BossCard component"
```

---

## Task 10: ChapterHeader + PartyIndicator

**Files:**
- Create: `spira-guide/src/components/PartyIndicator.jsx`
- Create: `spira-guide/src/components/PartyIndicator.test.jsx`
- Create: `spira-guide/src/components/ChapterHeader.jsx`
- Create: `spira-guide/src/components/ChapterHeader.test.jsx`

- [ ] **Step 1: Write the failing tests for PartyIndicator**

```jsx
// spira-guide/src/components/PartyIndicator.test.jsx
import { render, screen } from '@testing-library/react'
import PartyIndicator from './PartyIndicator'

describe('PartyIndicator', () => {
  it('renders portrait image for each party member', () => {
    render(<PartyIndicator party={['Tidus', 'Yuna', 'Wakka']} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('uses character name as alt text', () => {
    render(<PartyIndicator party={['Tidus']} />)
    expect(screen.getByAltText('Tidus')).toBeInTheDocument()
  })

  it('renders nothing for empty party array', () => {
    const { container } = render(<PartyIndicator party={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- PartyIndicator --run
```
Expected: FAIL

- [ ] **Step 3: Implement PartyIndicator**

```jsx
// spira-guide/src/components/PartyIndicator.jsx
export default function PartyIndicator({ party = [] }) {
  if (party.length === 0) return null

  return (
    <div className="flex items-center gap-1.5">
      {party.map((name) => (
        <img
          key={name}
          src={`/img/party/characters/${name.toLowerCase()}.png`}
          alt={name}
          title={name}
          width={28}
          height={28}
          className="rounded-full object-cover border border-[var(--color-border)]"
          onError={(e) => {
            e.target.outerHTML = `<span class="text-xs text-gray-500 px-1" title="${name}">${name[0]}</span>`
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Write the failing tests for ChapterHeader**

```jsx
// spira-guide/src/components/ChapterHeader.test.jsx
import { render, screen } from '@testing-library/react'
import ChapterHeader from './ChapterHeader'

describe('ChapterHeader', () => {
  it('renders the chapter name', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={['Tidus']} />)
    expect(screen.getByText('Besaid')).toBeInTheDocument()
  })

  it('renders the act label', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={[]} />)
    expect(screen.getByText(/act 1/i)).toBeInTheDocument()
  })

  it('renders a region map image', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={[]} mapImage="/img/maps/regions/besaid/besaid.png" />)
    expect(screen.getByRole('img', { name: /besaid map/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Run test to verify it fails**

```
cd spira-guide && npm run test -- ChapterHeader --run
```
Expected: FAIL

- [ ] **Step 6: Implement ChapterHeader**

```jsx
// spira-guide/src/components/ChapterHeader.jsx
import PartyIndicator from './PartyIndicator'

export default function ChapterHeader({ name, act, slug, mapImage, party = [] }) {
  return (
    <div className="ffx-panel p-3 flex gap-4 items-center">
      {mapImage && (
        <img
          src={mapImage}
          alt={`${name} map`}
          className="w-28 h-20 object-cover rounded border border-[#1e3a5f] flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}
      <div className="flex flex-col gap-1.5">
        <h1 className="ffx-header text-xl">{name}</h1>
        <p className="text-xs text-[var(--color-border-alt)]">Act {act}</p>
        <PartyIndicator party={party} />
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Run all new tests**

```
cd spira-guide && npm run test -- "PartyIndicator|ChapterHeader" --run
```
Expected: PASS (6 tests)

- [ ] **Step 8: Add ChapterHeader to ChapterPage**

In `ChapterPage.jsx`, replace the `<h1>` with `<ChapterHeader>`:

```jsx
import ChapterHeader from '../components/ChapterHeader'

// Replace the standalone <h1> with:
<ChapterHeader
  name={chapter?.name ?? slug}
  act={chapter?.act ?? 1}
  slug={slug}
  mapImage={chapter?.mapImage}
  party={data.party}
/>
```

Remove the redundant `<h1>` and `showUncheckedOnly` button — move the button below the header. Update the ChapterPage test to match: the heading is now inside ChapterHeader.

- [ ] **Step 9: Run all tests**

```
cd spira-guide && npm run test --run
```
Expected: all passing

- [ ] **Step 10: Commit**

```bash
git add spira-guide/src/components/PartyIndicator.jsx spira-guide/src/components/PartyIndicator.test.jsx spira-guide/src/components/ChapterHeader.jsx spira-guide/src/components/ChapterHeader.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add ChapterHeader and PartyIndicator"
```

---

## Task 11: OakaReminder component

**Files:**
- Create: `spira-guide/src/components/OakaReminder.jsx`
- Create: `spira-guide/src/components/OakaReminder.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/OakaReminder.test.jsx
import { render, screen } from '@testing-library/react'
import OakaReminder from './OakaReminder'

describe('OakaReminder', () => {
  it('renders nothing when oaka is null', () => {
    const { container } = render(<OakaReminder oaka={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a donation reminder when oaka is present', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/o'aka/i)).toBeInTheDocument()
  })

  it('shows the target donation amount', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/1,001/)).toBeInTheDocument()
  })

  it('describes the pricing tier unlocked', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/standard/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- OakaReminder --run
```
Expected: FAIL

- [ ] **Step 3: Implement OakaReminder**

```jsx
// spira-guide/src/components/OakaReminder.jsx
const TIERS = [
  { threshold: 10001, label: 'Discount (80%)', description: 'Best prices — donate at least 10,001 gil total' },
  { threshold: 1001,  label: 'Standard (100%)', description: 'Standard prices — donate at least 1,001 gil total' },
  { threshold: 101,   label: 'Slight surcharge (110%)', description: 'Small surcharge — donate at least 101 gil total' },
  { threshold: 0,     label: 'Surcharge (130%)', description: 'High surcharge — donate nothing' },
]

function getTierForTarget(target) {
  return TIERS.find((t) => target >= t.threshold) ?? TIERS[TIERS.length - 1]
}

export default function OakaReminder({ oaka }) {
  if (!oaka) return null

  const tier = getTierForTarget(oaka.cumulativeTarget)

  return (
    <div className="ffx-panel px-4 py-3 border-[var(--color-gold)] flex flex-col gap-1">
      <p className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-wide">
        💰 O'aka Encounter
      </p>
      <p className="text-sm text-gray-300">
        Donate to reach <span className="text-white font-medium">{oaka.cumulativeTarget.toLocaleString()} gil</span> cumulative total.
      </p>
      <p className="text-xs text-gray-400">
        Unlocks: <span className="text-gray-200">{tier.label}</span>
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- OakaReminder --run
```
Expected: PASS (4 tests)

- [ ] **Step 5: Add OakaReminder to ChapterPage (below walkthrough section)**

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/components/OakaReminder.jsx spira-guide/src/components/OakaReminder.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add OakaReminder donation tier card"
```

---

## Task 12: SphereGridTip component

**Files:**
- Create: `spira-guide/src/components/SphereGridTip.jsx`
- Create: `spira-guide/src/components/SphereGridTip.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/SphereGridTip.test.jsx
import { render, screen } from '@testing-library/react'
import SphereGridTip from './SphereGridTip'

describe('SphereGridTip', () => {
  it('renders nothing when tip is null', () => {
    const { container } = render(<SphereGridTip tip={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the tip text', () => {
    render(<SphereGridTip tip="Unlock NulBlaze before leaving." />)
    expect(screen.getByText(/NulBlaze/)).toBeInTheDocument()
  })

  it('has a sphere grid label', () => {
    render(<SphereGridTip tip="Unlock NulBlaze before leaving." />)
    expect(screen.getByText(/sphere grid/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- SphereGridTip --run
```
Expected: FAIL

- [ ] **Step 3: Implement SphereGridTip**

```jsx
// spira-guide/src/components/SphereGridTip.jsx
export default function SphereGridTip({ tip }) {
  if (!tip) return null

  return (
    <div className="rounded-md border border-blue-800 bg-blue-950/40 px-4 py-3 text-sm">
      <span className="font-bold text-[var(--color-border)]">⬡ Sphere Grid — </span>
      <span className="text-gray-300">{tip}</span>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- SphereGridTip --run
```
Expected: PASS (3 tests)

- [ ] **Step 5: Add SphereGridTip to ChapterPage (between walkthrough and boss sections)**

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/components/SphereGridTip.jsx spira-guide/src/components/SphereGridTip.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add SphereGridTip inline component"
```

---

## Task 13: CloisterSection component

**Files:**
- Create: `spira-guide/src/components/CloisterSection.jsx`
- Create: `spira-guide/src/components/CloisterSection.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/CloisterSection.test.jsx
import { render, screen } from '@testing-library/react'
import CloisterSection from './CloisterSection'

const cloister = {
  slug: 'besaid',
  name: 'Besaid Cloister of Trials',
  mapImage: '/img/maps/cloisters/besaid.png',
  destructionSphere: 'Rod of Wisdom',
  missable: true,
  steps: ['Take the Besaid Sphere.', 'Insert it into the slot.'],
}

describe('CloisterSection', () => {
  it('renders nothing when cloister is null', () => {
    const { container } = render(<CloisterSection cloister={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the cloister name', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText('Besaid Cloister of Trials')).toBeInTheDocument()
  })

  it('renders all steps', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText('Take the Besaid Sphere.')).toBeInTheDocument()
    expect(screen.getByText('Insert it into the slot.')).toBeInTheDocument()
  })

  it('shows missable destruction sphere label', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText(/rod of wisdom/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- CloisterSection --run
```
Expected: FAIL

- [ ] **Step 3: Implement CloisterSection**

```jsx
// spira-guide/src/components/CloisterSection.jsx
export default function CloisterSection({ cloister }) {
  if (!cloister) return null

  return (
    <div className="ffx-panel p-4 flex flex-col gap-3">
      <h3 className="ffx-header text-sm">{cloister.name}</h3>

      {cloister.mapImage && (
        <img
          src={cloister.mapImage}
          alt={`${cloister.name} map`}
          className="rounded border border-[#1e3a5f] max-w-xs"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {cloister.missable && cloister.destructionSphere && (
        <p className="text-xs text-red-300 border border-red-800 bg-red-900/20 rounded px-3 py-2">
          ⚠ Destruction Sphere reward: <strong>{cloister.destructionSphere}</strong> — get it before leaving.
        </p>
      )}

      <ol className="flex flex-col gap-1.5 list-decimal list-inside">
        {cloister.steps.map((step, i) => (
          <li key={i} className="text-sm text-gray-300">{step}</li>
        ))}
      </ol>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- CloisterSection --run
```
Expected: PASS (4 tests)

- [ ] **Step 5: Wire CloisterSection into ChapterPage**

Add a cloister data import and render CloisterSection when `data.cloister` is set:

```jsx
import CloisterSection from '../components/CloisterSection'
import besaidCloister from '../data/cloisters/besaid.json'

const CLOISTER_DATA = { besaid: besaidCloister }

// In JSX, in the collectibles section:
<section id="section-collectibles" aria-label="Collectibles">
  <h2 className="ffx-header text-base mb-2">Collectibles</h2>
  {data.cloister && (
    <CloisterSection cloister={CLOISTER_DATA[data.cloister] ?? null} />
  )}
</section>
```

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/components/CloisterSection.jsx spira-guide/src/components/CloisterSection.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add CloisterSection with map and step-by-step solution"
```

---

## Task 14: useChapterProgress + ChapterNav

**Files:**
- Create: `spira-guide/src/hooks/useChapterProgress.js`
- Create: `spira-guide/src/hooks/useChapterProgress.test.js`
- Create: `spira-guide/src/components/ChapterNav.jsx`
- Create: `spira-guide/src/components/ChapterNav.test.jsx`

- [ ] **Step 1: Write the failing tests for useChapterProgress**

```js
// spira-guide/src/hooks/useChapterProgress.test.js
import { renderHook, act } from '@testing-library/react'
import { useChapterProgress } from './useChapterProgress'

beforeEach(() => localStorage.clear())

describe('useChapterProgress', () => {
  it('returns total 0 for unknown slug (no data file)', () => {
    const { result } = renderHook(() => useChapterProgress('unknown-slug'))
    expect(result.current.total).toBe(0)
    expect(result.current.checked).toBe(0)
  })

  it('returns correct total for besaid chapter', () => {
    const { result } = renderHook(() => useChapterProgress('besaid'))
    // besaid has 9 items + 1 boss = 10 checkable items
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('returns checked count reflecting localStorage state', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'besaid-antidote': true }))
    const { result } = renderHook(() => useChapterProgress('besaid'))
    expect(result.current.checked).toBe(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```
cd spira-guide && npm run test -- useChapterProgress --run
```
Expected: FAIL

- [ ] **Step 3: Implement useChapterProgress**

```js
// spira-guide/src/hooks/useChapterProgress.js
import { getChapterData } from '../data/chapterData'
import { useCheckbox } from './useCheckbox'

function getAllCheckableIds(data) {
  const itemIds = data.subLocations.flatMap((loc) => loc.items.map((i) => i.id))
  const bossIds = data.bosses.map((slug) => `${data.slug}-boss-${slug}`)
  const optionalIds = (data.optionalAreas ?? []).flatMap((area) =>
    area.items.map((i) => i.id)
  )
  return [...itemIds, ...bossIds, ...optionalIds]
}

export function useChapterProgress(slug) {
  const data = getChapterData(slug)
  const { checkedCount } = useCheckbox()
  const ids = getAllCheckableIds(data)
  return { checked: checkedCount(ids), total: ids.length }
}
```

- [ ] **Step 4: Run test to verify it passes**

```
cd spira-guide && npm run test -- useChapterProgress --run
```
Expected: PASS (3 tests)

- [ ] **Step 5: Write the failing ChapterNav tests**

```jsx
// spira-guide/src/components/ChapterNav.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ChapterNav from './ChapterNav'

beforeEach(() => localStorage.clear())

function renderNav(slug) {
  return render(
    <MemoryRouter>
      <ChapterNav currentSlug={slug} />
    </MemoryRouter>
  )
}

describe('ChapterNav', () => {
  it('renders previous chapter link for non-first chapter', () => {
    renderNav('besaid') // second chapter (after baaj-temple)
    expect(screen.getByText(/baaj temple/i)).toBeInTheDocument()
  })

  it('renders next chapter link', () => {
    renderNav('besaid')
    expect(screen.getByText(/s\.s\. liki/i)).toBeInTheDocument()
  })

  it('does not render a prev link for the first chapter', () => {
    renderNav('zanarkand')
    expect(screen.queryByText(/previous/i)).not.toBeInTheDocument()
  })

  it('does not render a next link for the last chapter', () => {
    renderNav('inside-sin')
    expect(screen.queryByText(/next/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```
cd spira-guide && npm run test -- ChapterNav --run
```
Expected: FAIL

- [ ] **Step 7: Implement ChapterNav**

```jsx
// spira-guide/src/components/ChapterNav.jsx
import { Link } from 'react-router-dom'
import { chapters } from '../data/chapterIndex'
import { useChapterProgress } from '../hooks/useChapterProgress'

function NavCard({ chapter, direction }) {
  const { checked, total } = useChapterProgress(chapter.slug)
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0

  return (
    <Link
      to={`/chapter/${chapter.slug}`}
      className={`flex-1 ffx-panel px-4 py-3 flex flex-col gap-2 hover:border-[var(--color-border-alt)] transition-colors ${direction === 'next' ? 'text-right items-end' : 'items-start'}`}
    >
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </p>
      <p className="text-sm text-[var(--color-border-alt)]">{chapter.name}</p>
      <div className="w-full h-1 bg-[#0d2137] rounded">
        <div
          className="h-full bg-[var(--color-border)] rounded transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  )
}

export default function ChapterNav({ currentSlug }) {
  const idx = chapters.findIndex((c) => c.slug === currentSlug)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  if (!prev && !next) return null

  return (
    <nav className="flex gap-3 mt-2" aria-label="Chapter navigation">
      {prev && <NavCard chapter={prev} direction="prev" />}
      {next && <NavCard chapter={next} direction="next" />}
    </nav>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```
cd spira-guide && npm run test -- ChapterNav --run
```
Expected: PASS (4 tests)

- [ ] **Step 9: Add ChapterNav to ChapterPage at the bottom**

```jsx
import ChapterNav from '../components/ChapterNav'

// At the end of the returned JSX:
<ChapterNav currentSlug={slug} />
```

- [ ] **Step 10: Run all tests**

```
cd spira-guide && npm run test --run
```
Expected: all passing

- [ ] **Step 11: Commit**

```bash
git add spira-guide/src/hooks/useChapterProgress.js spira-guide/src/hooks/useChapterProgress.test.js spira-guide/src/components/ChapterNav.jsx spira-guide/src/components/ChapterNav.test.jsx spira-guide/src/pages/ChapterPage.jsx
git commit -m "feat: add ChapterNav with progress bars and useChapterProgress hook"
```

---

## Task 15: Optional areas (Airship chapter)

**Files:**
- Modify: `spira-guide/src/data/chapters/besaid.json` → not needed; add airship stub instead
- Create: `spira-guide/src/data/chapters/airship.json`
- Modify: `spira-guide/src/data/chapterData.js`
- Modify: `spira-guide/src/pages/ChapterPage.jsx`

- [ ] **Step 1: Create airship chapter stub with optional areas**

```json
{
  "slug": "airship",
  "missables": [],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Airship Deck",
      "prose": "The airship becomes your base of operations. Use the destination menu to access optional areas.",
      "items": []
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": [
    {
      "name": "Remiem Temple",
      "prose": "Accessible via chocobo from the Calm Lands. Home of the Magus Sisters aeon and celestial weapon rewards.",
      "items": [
        { "id": "airship-remiem-cloudy-mirror", "name": "Cloudy Mirror", "icon": "cloudy-mirror", "missable": false }
      ]
    },
    {
      "name": "Baaj Temple (Revisit)",
      "prose": "Return to Baaj via airship coordinates. Anima awaits if all other aeons are obtained.",
      "items": [
        { "id": "airship-baaj-anima", "name": "Anima (Aeon)", "icon": "anima", "missable": false }
      ]
    },
    {
      "name": "Omega Ruins",
      "prose": "High-level optional dungeon. Enter via airship coordinates. Omega Weapon is the final optional boss.",
      "items": [
        { "id": "airship-omega-master-sphere", "name": "Master Sphere ×2", "icon": "master-sphere", "missable": false }
      ]
    }
  ]
}
```

- [ ] **Step 2: Register airship in chapterData.js**

```js
import airshipData from './chapters/airship.json'

const chapters = {
  besaid: besaidData,
  airship: airshipData,
}
```

- [ ] **Step 3: Write a test for optional areas rendering**

```jsx
// Add to ChapterPage.test.jsx:
it('renders optional area sub-sections for airship chapter', () => {
  renderChapter('airship')
  expect(screen.getByText('Remiem Temple')).toBeInTheDocument()
  expect(screen.getByText('Baaj Temple (Revisit)')).toBeInTheDocument()
})
```

- [ ] **Step 4: Run test to verify it fails**

```
cd spira-guide && npm run test -- ChapterPage --run
```
Expected: new test FAILS

- [ ] **Step 5: Add optional areas rendering to ChapterPage**

After the Collectibles section, add:

```jsx
{data.optionalAreas?.length > 0 && (
  <section id="section-optional" aria-label="Optional Areas">
    <h2 className="ffx-header text-base mb-2">Optional Areas</h2>
    <div className="ffx-panel">
      {data.optionalAreas.map((area) => (
        <SubLocation
          key={area.name}
          slug={slug}
          name={area.name}
          prose={area.prose}
          items={area.items}
        >
          <ItemList items={area.items} showUncheckedOnly={showUncheckedOnly} />
        </SubLocation>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 6: Run all tests**

```
cd spira-guide && npm run test --run
```
Expected: all passing

- [ ] **Step 7: Lint check**

```
cd spira-guide && npm run lint
```
Expected: no errors

- [ ] **Step 8: Build check**

```
cd spira-guide && npm run build
```
Expected: successful build with no errors

- [ ] **Step 9: Final commit**

```bash
git add spira-guide/src/data/chapters/airship.json spira-guide/src/data/chapterData.js spira-guide/src/pages/ChapterPage.jsx spira-guide/src/pages/ChapterPage.test.jsx
git commit -m "feat: add optional areas rendering under Airship chapter"
```
