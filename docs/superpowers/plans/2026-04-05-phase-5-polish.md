# Phase 5: Landing Page, Global Search, Quick Reference Panel, Pyrefly Transitions

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the four remaining features from the original spec: a polished hero landing page, functional global search, a slide-in quick reference panel, and pyrefly page transition animations.

**Architecture:** Four independent features built in dependency order — cover art extraction first, then search index (pure data, no UI), then each UI feature in isolation (landing page, QRP, pyrefly), then wire them together in AppShell/Header last. Each task is self-contained and testable before the next begins.

**Tech Stack:** React 19 + JSX, Vite, Vitest + @testing-library/react, Tailwind CSS + `ffx-theme.css`, React Router v6 (`useLocation`, `Link`), HTML Canvas API, `assetUrl()` from `src/utils/assetUrl.js`

**Run tests:** `cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run`
**Dev server:** `cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run dev`

---

## File Map

**Create:**
- `spira-guide/public/img/guide/image_0000_00.jpeg` — guide cover art (unzip from epub)
- `spira-guide/src/data/searchIndex.js` — flat array of all searchable records, built at import time
- `spira-guide/src/hooks/useSearch.js` — substring filter + sort over searchIndex
- `spira-guide/src/hooks/useSearch.test.js` — tests for useSearch
- `spira-guide/src/components/Search/SearchDropdown.jsx` — controlled input + floating results panel
- `spira-guide/src/components/Search/SearchDropdown.test.jsx` — tests
- `spira-guide/src/components/QuickRef/QuickRefPanel.jsx` — slide-in right panel, 3-tab shell
- `spira-guide/src/components/QuickRef/ElementalChart.jsx` — hardcoded 9×6 element weakness grid
- `spira-guide/src/components/QuickRef/StatusEffects.jsx` — hardcoded status effect table
- `spira-guide/src/components/QuickRef/KeyItems.jsx` — hardcoded key item list
- `spira-guide/src/components/QuickRef/QuickRefPanel.test.jsx` — tests
- `spira-guide/src/components/PyreflyTransition.jsx` — canvas overlay for page transitions

**Modify:**
- `spira-guide/src/pages/LandingPage.jsx` — full rework: hero bg + corner card
- `spira-guide/src/components/Layout/Header.jsx` — enable search, add QRP toggle button (new props: `onQRPClick`, `isQRPOpen`)
- `spira-guide/src/components/Layout/AppShell.jsx` — add `isQRPOpen` state, render `QuickRefPanel` + `PyreflyTransition`

---

## Task 1: Extract Cover Art

**Files:**
- Create: `spira-guide/public/img/guide/image_0000_00.jpeg`

- [ ] **Step 1: Extract the image from the epub**

```bash
cd "/Users/theonavarro/FFX walkthrough"
unzip -p "Official Strategy Guide/Final Fantasy X-X2 HD Remaster Official Strategy Guide (BradyGames).epub" \
  EPUB/image_0000_00.jpeg > spira-guide/public/img/guide/image_0000_00.jpeg
```

- [ ] **Step 2: Verify the file is the front cover**

Open `spira-guide/public/img/guide/image_0000_00.jpeg` in Preview. It should show the FFX character art splash (Tidus, Yuna, etc.). If it's a back cover or blank page, extract `image_0001_00.jpeg` instead and rename it to `image_0000_00.jpeg`.

- [ ] **Step 3: Commit**

```bash
cd "/Users/theonavarro/FFX walkthrough"
git add spira-guide/public/img/guide/image_0000_00.jpeg
git commit -m "feat: add guide cover art for landing page hero"
```

---

## Task 2: Search Index

**Files:**
- Create: `spira-guide/src/data/searchIndex.js`

No test for this file — it's a pure data module with no logic to test (the logic is in `useSearch`). Correctness is verified via `useSearch` tests.

- [ ] **Step 1: Create `searchIndex.js`**

```js
// spira-guide/src/data/searchIndex.js
import { chapters } from './chapterIndex'
import { getChapterData } from './chapterData'
import { PRIMERS } from './collectibles/primersData'
import { JECHT_SPHERES } from './collectibles/jechtSpheresData'
import { CELESTIALS_BY_CHARACTER } from './collectibles/celestialsData'

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

const records = []

// Chapters
for (const ch of chapters) {
  records.push({ type: 'chapter', title: ch.name, subtitle: null, chapterId: ch.slug, anchor: null })
}

// Bosses — drive loop from chapterIndex, fetch boss list via getChapterData
for (const ch of chapters) {
  const data = getChapterData(ch.slug)
  for (const boss of (data.bosses ?? [])) {
    records.push({
      type: 'boss',
      title: toTitleCase(boss.slug.replace(/-/g, ' ')),
      subtitle: ch.name,
      chapterId: ch.slug,
      anchor: null,
    })
  }
}

// Primers
for (const p of PRIMERS) {
  records.push({
    type: 'primer',
    title: `Al Bhed Primer ${p.num}`,
    subtitle: p.location,
    chapterId: p.chapterSlug,
    anchor: p.anchor ?? null,
  })
}

// Jecht Spheres
for (const s of JECHT_SPHERES) {
  records.push({
    type: 'jecht-sphere',
    title: `Jecht Sphere ${s.id.replace('jecht-sphere-', '')}`,
    subtitle: s.location,
    chapterId: s.chapterSlug,
    anchor: s.anchor ?? null,
  })
}

// Celestials
for (const [characterKey, character] of Object.entries(CELESTIALS_BY_CHARACTER)) {
  for (const item of character.items) {
    records.push({
      type: 'celestial',
      title: item.name,
      subtitle: characterKey,
      chapterId: item.chapterSlug,
      anchor: item.anchor ?? null,
    })
  }
}

export const searchIndex = records
```

- [ ] **Step 2: Verify it imports without error**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run build 2>&1 | grep -E "error|Error" | head -20
```

Expected: no errors. If there are import errors, check the export names in the data files.

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/data/searchIndex.js
git commit -m "feat: build flat search index from chapter, boss, primer, jecht sphere, celestial data"
```

---

## Task 3: useSearch Hook

**Files:**
- Create: `spira-guide/src/hooks/useSearch.js`
- Create: `spira-guide/src/hooks/useSearch.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// spira-guide/src/hooks/useSearch.test.js
import { renderHook } from '@testing-library/react'
import { useSearch } from './useSearch'

describe('useSearch', () => {
  it('returns empty array for query shorter than 2 chars', () => {
    const { result } = renderHook(() => useSearch(''))
    expect(result.current).toEqual([])
    const { result: r2 } = renderHook(() => useSearch('a'))
    expect(r2.current).toEqual([])
  })

  it('returns results matching title substring (case-insensitive)', () => {
    const { result } = renderHook(() => useSearch('besaid'))
    expect(result.current.length).toBeGreaterThan(0)
    expect(result.current[0].type).toBe('chapter')
    expect(result.current[0].title).toMatch(/Besaid/i)
  })

  it('returns results matching subtitle', () => {
    // Jecht Sphere 2 subtitle contains "Liki"
    const { result } = renderHook(() => useSearch('Liki'))
    const jechtResult = result.current.find((r) => r.type === 'jecht-sphere')
    expect(jechtResult).toBeDefined()
  })

  it('caps results at 12', () => {
    // 'a' would match many — but query < 2 returns empty
    // Use 'i' which should match primers + others
    const { result } = renderHook(() => useSearch('al bhed'))
    expect(result.current.length).toBeLessThanOrEqual(12)
  })

  it('sorts exact title match first', () => {
    const { result } = renderHook(() => useSearch('Zanarkand'))
    // The chapter "Zanarkand" is an exact match
    expect(result.current[0].title.toLowerCase()).toBe('zanarkand')
  })

  it('sorts chapters above bosses for non-exact matches', () => {
    const { result } = renderHook(() => useSearch('yuna'))
    const types = result.current.map((r) => r.type)
    const firstBossIndex = types.indexOf('boss')
    const firstCelestialIndex = types.indexOf('celestial')
    if (firstBossIndex !== -1 && firstCelestialIndex !== -1) {
      expect(firstCelestialIndex).toBeGreaterThan(firstBossIndex)
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/hooks/useSearch.test.js
```

Expected: FAIL — "Cannot find module './useSearch'"

- [ ] **Step 3: Implement `useSearch.js`**

```js
// spira-guide/src/hooks/useSearch.js
import { useMemo } from 'react'
import { searchIndex } from '../data/searchIndex'

const TYPE_PRIORITY = { chapter: 0, boss: 1, primer: 2, 'jecht-sphere': 3, celestial: 4 }

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.length < 2) return []

    const q = query.toLowerCase()

    const matches = searchIndex.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.subtitle && r.subtitle.toLowerCase().includes(q))
    )

    matches.sort((a, b) => {
      const aExact = a.title.toLowerCase() === q ? 0 : 1
      const bExact = b.title.toLowerCase() === q ? 0 : 1
      if (aExact !== bExact) return aExact - bExact
      const ap = TYPE_PRIORITY[a.type] ?? 99
      const bp = TYPE_PRIORITY[b.type] ?? 99
      return ap - bp
      // tiebreak by original index order is preserved since Array.sort is stable
    })

    return matches.slice(0, 12)
  }, [query])
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/hooks/useSearch.test.js
```

Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/hooks/useSearch.js spira-guide/src/hooks/useSearch.test.js
git commit -m "feat: useSearch hook — substring filter with type-priority sorting"
```

---

## Task 4: SearchDropdown Component

**Files:**
- Create: `spira-guide/src/components/Search/SearchDropdown.jsx`
- Create: `spira-guide/src/components/Search/SearchDropdown.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/Search/SearchDropdown.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchDropdown from './SearchDropdown'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('SearchDropdown', () => {
  it('renders a search input', () => {
    wrap(<SearchDropdown />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows no dropdown when query is empty', () => {
    wrap(<SearchDropdown />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows results after typing 2+ characters', () => {
    wrap(<SearchDropdown />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'be' } })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows "No results" when query matches nothing', () => {
    wrap(<SearchDropdown />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzzzz' } })
    expect(screen.getByText(/no results/i)).toBeInTheDocument()
  })

  it('clears results on Escape key', () => {
    wrap(<SearchDropdown />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'besaid' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Search/SearchDropdown.test.jsx
```

Expected: FAIL — component not found

- [ ] **Step 3: Implement `SearchDropdown.jsx`**

```jsx
// spira-guide/src/components/Search/SearchDropdown.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'

const TYPE_LABELS = {
  chapter: 'CHAPTER',
  boss: 'BOSS',
  primer: 'PRIMER',
  'jecht-sphere': 'JECHT',
  celestial: 'CELESTIAL',
}

export default function SearchDropdown() {
  const [query, setQuery] = useState('')
  const results = useSearch(query)
  const wrapRef = useRef(null)
  const navigate = useNavigate()

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Escape') setQuery('')
  }

  const showDropdown = query.length >= 2

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="search"
        role="searchbox"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-black/5 border border-black/20 rounded px-3 py-1 w-32 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-black/40 transition-colors"
        placeholder="Search…"
      />

      {showDropdown && (
        <div
          role="listbox"
          className="ffx-panel absolute top-full right-0 mt-1 w-72 max-h-80 overflow-y-auto shadow-xl"
          style={{ zIndex: 200 }}
        >
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm opacity-60">No results</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                to={`/chapter/${r.chapterId}${r.anchor ? '#' + r.anchor : ''}`}
                onClick={() => setQuery('')}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors border-b border-[var(--color-border)] last:border-0"
              >
                <span className="text-[9px] font-bold tracking-wider opacity-50 w-16 flex-shrink-0">
                  {TYPE_LABELS[r.type] ?? r.type.toUpperCase()}
                </span>
                <span className="text-sm flex-1 min-w-0">
                  <span className="block truncate">{r.title}</span>
                  {r.subtitle && (
                    <span className="block text-[10px] opacity-60 truncate">{r.subtitle}</span>
                  )}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Search/SearchDropdown.test.jsx
```

Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/components/Search/
git commit -m "feat: SearchDropdown — instant results with type labels and escape-to-close"
```

---

## Task 5: Wire Search into Header

**Files:**
- Modify: `spira-guide/src/components/Layout/Header.jsx`

- [ ] **Step 1: Update Header to import and render SearchDropdown, and add QRP toggle**

Replace the disabled `<input>` with `<SearchDropdown />` and add `onQRPClick` + `isQRPOpen` props.

Open `spira-guide/src/components/Layout/Header.jsx` and replace the entire file:

```jsx
// spira-guide/src/components/Layout/Header.jsx
import { Link } from 'react-router-dom'
import { assetUrl } from '../../utils/assetUrl'
import SearchDropdown from '../Search/SearchDropdown'

export default function Header({ onHamburgerClick, isDrawerOpen, onQRPClick, isQRPOpen }) {
  return (
    <header
      className="rounded-none border-b border-[var(--color-border)] flex items-center gap-3 px-3"
      style={{
        background: 'linear-gradient(to right, #ffffff 0%, #d6eef8 20%, #f8dde8 45%, #fad4bc 70%, #fdecc8 100%)',
        height: '52px',
      }}
    >
      <button
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors cursor-pointer flex-shrink-0"
        onClick={onHamburgerClick}
        aria-label={isDrawerOpen ? 'Close chapter list' : 'Open chapter list'}
        aria-expanded={isDrawerOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>

      <img
        src={assetUrl('img/ffx-logo.webp')}
        alt="Final Fantasy X"
        className="flex-shrink-0"
        style={{ height: '48px', width: 'auto' }}
      />

      <span className="flex-1" />

      <SearchDropdown />

      <Link
        to="/settings"
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors flex-shrink-0"
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </Link>

      <button
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors flex-shrink-0"
        onClick={onQRPClick}
        aria-label={isQRPOpen ? 'Close quick reference' : 'Open quick reference'}
        aria-expanded={isQRPOpen}
      >
        {/* Book/scroll icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      </button>
    </header>
  )
}
```

- [ ] **Step 2: Run existing tests to confirm nothing broke**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run
```

Expected: same pass/fail count as before (the 5 pre-existing failures in AppShell/ChapterDrawer/chapterIndex are unrelated — do not fix them here).

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/components/Layout/Header.jsx
git commit -m "feat: wire SearchDropdown into Header, add QRP toggle button"
```

---

## Task 6: Quick Reference Panel — Shell + Tabs

**Files:**
- Create: `spira-guide/src/components/QuickRef/QuickRefPanel.jsx`
- Create: `spira-guide/src/components/QuickRef/ElementalChart.jsx`
- Create: `spira-guide/src/components/QuickRef/StatusEffects.jsx`
- Create: `spira-guide/src/components/QuickRef/KeyItems.jsx`
- Create: `spira-guide/src/components/QuickRef/QuickRefPanel.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// spira-guide/src/components/QuickRef/QuickRefPanel.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import QuickRefPanel from './QuickRefPanel'

describe('QuickRefPanel', () => {
  it('is hidden when isOpen is false', () => {
    const { container } = render(<QuickRefPanel isOpen={false} onClose={() => {}} />)
    const panel = container.firstChild
    expect(panel.style.transform).toContain('translateX(100%)')
  })

  it('is visible when isOpen is true', () => {
    const { container } = render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    const panel = container.firstChild
    expect(panel.style.transform).toContain('translateX(0')
  })

  it('calls onClose when × button is clicked', () => {
    const onClose = vi.fn()
    render(<QuickRefPanel isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close quick reference'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows Elements tab by default', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('Elements')).toBeInTheDocument()
  })

  it('switches to Status tab on click', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    fireEvent.click(screen.getByText('Status'))
    expect(screen.getByText(/Poison/i)).toBeInTheDocument()
  })

  it('switches to Key Items tab on click', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    fireEvent.click(screen.getByText('Key Items'))
    expect(screen.getByText(/Al Bhed Potion/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/QuickRef/QuickRefPanel.test.jsx
```

Expected: FAIL — component not found

- [ ] **Step 3: Create `ElementalChart.jsx`**

```jsx
// spira-guide/src/components/QuickRef/ElementalChart.jsx
// Hardcoded — monsters.json has no category field; data curated from game knowledge.
// elem_resists keys in source: fire, ice, lightning, water, holy, gravity

const ELEMENTS = ['Fire', 'Ice', 'Lightning', 'Water', 'Holy', 'Gravity']

// W = Weak, R = Resists, A = Absorbs, I = Immune, '' = Neutral
const CATEGORIES = [
  { name: 'Fiend',    row: ['',  '',  '',  '',  '',  ''] },
  { name: 'Aerial',   row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Aquatic',  row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Machine',  row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Undead',   row: ['W', '',  '',  '',  'W', 'I'] },
  { name: 'Dragon',   row: ['',  '',  '',  '',  '',  ''] },
  { name: 'Plant',    row: ['W', '',  '',  '',  '',  ''] },
  { name: 'Fungus',   row: ['W', '',  '',  '',  '',  ''] },
  { name: 'Humanoid', row: ['',  '',  '',  '',  '',  ''] },
]

const CELL_STYLE = {
  W: { label: '▲', className: 'text-[var(--color-gold)] font-bold' },
  R: { label: '▼', className: 'text-blue-400 font-bold' },
  A: { label: '★', className: 'text-green-400 font-bold' },
  I: { label: '—', className: 'text-gray-400' },
  '': { label: '', className: '' },
}

export default function ElementalChart() {
  return (
    <div className="overflow-x-auto">
      <table className="text-xs w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 pr-2 opacity-60 font-normal">Enemy</th>
            {ELEMENTS.map((el) => (
              <th key={el} className="py-1 px-1 text-center text-[10px] font-bold opacity-80 whitespace-nowrap">
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map(({ name, row }) => (
            <tr key={name} className="border-t border-[var(--color-border)]">
              <td className="py-1 pr-2 opacity-80 whitespace-nowrap">{name}</td>
              {row.map((cell, i) => {
                const { label, className } = CELL_STYLE[cell]
                return (
                  <td key={i} className={`py-1 px-1 text-center ${className}`}>
                    {label}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[9px] opacity-40 mt-3">▲ Weak · ▼ Resists · ★ Absorbs · — Immune</p>
    </div>
  )
}
```

- [ ] **Step 4: Create `StatusEffects.jsx`**

```jsx
// spira-guide/src/components/QuickRef/StatusEffects.jsx
// Fully hardcoded — no status data in source JSON.

const STATUSES = [
  { name: 'Poison',    effect: 'Drains HP each turn. Cured by Antidote.' },
  { name: 'Silence',   effect: 'Cannot use magic or skills. Cured by Echo Screen.' },
  { name: 'Sleep',     effect: 'Cannot act. Wakes on taking damage. Cured by Eye Drops.' },
  { name: 'Darkness',  effect: 'Physical attacks miss often. Cured by Eye Drops.' },
  { name: 'Slow',      effect: 'CTB gauge fills slower. Cured by Remedy.' },
  { name: 'Petrify',   effect: 'Stone countdown — turns to stone then shatters. Soft cures.' },
  { name: 'Zombie',    effect: 'Healing damages; KO becomes permanent. No cure — wear off.' },
  { name: 'Berserk',   effect: 'Auto-attacks every turn; cannot be controlled.' },
  { name: 'Confuse',   effect: 'Attacks allies randomly. Hit the ally to snap out.' },
  { name: 'Doom',      effect: 'Countdown to instant KO. No cure.' },
  { name: 'Threaten',  effect: 'Target will flee on their turn.' },
  { name: 'Provoke',   effect: 'Target focuses only on the provoker.' },
  { name: 'Sensor',    effect: 'Reveals enemy HP and weaknesses.' },
  { name: 'Full Break', effect: 'All four stats halved. Dispel or wear off.' },
]

export default function StatusEffects() {
  return (
    <div className="space-y-1">
      {STATUSES.map(({ name, effect }) => (
        <div key={name} className="border-b border-[var(--color-border)] pb-1 last:border-0">
          <span className="text-xs font-bold text-[var(--color-gold)]">{name}</span>
          <p className="text-xs opacity-80 mt-0.5">{effect}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create `KeyItems.jsx`**

```jsx
// spira-guide/src/components/QuickRef/KeyItems.jsx
// Fully hardcoded — items.json is a flat dict with no category field.

const KEY_ITEMS = [
  { name: 'Al Bhed Potion',   use: 'Restores 1000 HP + cures Petrify/Silence/Darkness. Damages Undead.' },
  { name: 'Mega-Potion',      use: 'Restores 2000 HP to all party members.' },
  { name: 'Elixir',           use: 'Fully restores HP and MP of one character.' },
  { name: 'Megalixir',        use: 'Fully restores HP and MP of all party members.' },
  { name: 'Turbo Ether',      use: 'Restores 500 MP to one character.' },
  { name: 'Mega Phoenix',     use: 'Revives all KO'd party members with full HP.' },
  { name: 'Pendulum',         use: 'Teaches Overdrive → AP ability to weapons. Rare.' },
  { name: 'Friend Sphere',    use: 'Moves to a node occupied by another party member.' },
  { name: 'Master Sphere',    use: 'Activates any empty node. Obtained from Dark Aeons/Penance.' },
  { name: 'Dark Matter',      use: 'Grants Ribbon (immunity to most status). 99 needed for Penance.' },
  { name: 'Power Distiller',  use: 'Enemy drops Power Spheres instead of normal drops.' },
  { name: 'Mana Distiller',   use: 'Enemy drops Mana Spheres instead of normal drops.' },
  { name: 'Speed Distiller',  use: 'Enemy drops Speed Spheres instead of normal drops.' },
  { name: 'Ability Distiller',use: 'Enemy drops Ability Spheres instead of normal drops.' },
  { name: 'Tetra Elemental',  use: 'Grants Elemenstrike abilities to armor. Rare craft material.' },
  { name: 'Supreme Gem',      use: 'Grants Break Damage Limit to weapon. From Monster Arena.' },
  { name: 'Stamina Tonic',    use: 'Raises Max HP of one character permanently.' },
  { name: 'Door to Tomorrow', use: 'Grants Overdrive Mode abilities to weapons.' },
]

export default function KeyItems() {
  return (
    <div className="space-y-1">
      {KEY_ITEMS.map(({ name, use }) => (
        <div key={name} className="border-b border-[var(--color-border)] pb-1 last:border-0">
          <span className="text-xs font-bold text-[var(--color-gold)]">{name}</span>
          <p className="text-xs opacity-80 mt-0.5">{use}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Create `QuickRefPanel.jsx`**

```jsx
// spira-guide/src/components/QuickRef/QuickRefPanel.jsx
import { useState } from 'react'
import TabBar from '../Collectibles/TabBar'
import ElementalChart from './ElementalChart'
import StatusEffects from './StatusEffects'
import KeyItems from './KeyItems'

const TABS = ['Elements', 'Status', 'Key Items']

export default function QuickRefPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Elements')

  return (
    <div
      className="fixed top-0 right-0 h-screen w-72 ffx-panel overflow-y-auto flex flex-col"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s ease',
        zIndex: 100,
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] flex-shrink-0">
        <h2 className="ffx-header text-lg">Quick Reference</h2>
        <button
          onClick={onClose}
          aria-label="Close quick reference"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
        {activeTab === 'Elements'  && <ElementalChart />}
        {activeTab === 'Status'    && <StatusEffects />}
        {activeTab === 'Key Items' && <KeyItems />}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/QuickRef/QuickRefPanel.test.jsx
```

Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add spira-guide/src/components/QuickRef/
git commit -m "feat: QuickRefPanel with Elements, Status, Key Items tabs"
```

---

## Task 7: Pyrefly Page Transition

**Files:**
- Create: `spira-guide/src/components/PyreflyTransition.jsx`

No unit test for this — it's a canvas animation component that uses `requestAnimationFrame` and `useLocation`. Visual correctness was validated in the brainstorm preview. Confirm it works via the dev server.

- [ ] **Step 1: Create `PyreflyTransition.jsx`**

```jsx
// spira-guide/src/components/PyreflyTransition.jsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { usePyrefly } from '../hooks/usePyrefly'

const PALETTE = [
  [80, 200, 255],   // sky blue
  [120, 255, 220],  // aqua
  [160, 255, 140],  // green
  [255, 255, 120],  // yellow
  [255, 180, 80],   // amber
  [255, 120, 200],  // pink
  [200, 140, 255],  // lavender
  [255, 255, 255],  // white
]

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

class Wisp {
  constructor(W, H) { this.W = W; this.H = H; this.reset(Math.random() * 200) }
  reset(stagger = 0) {
    const W = this.W, H = this.H
    this.x = Math.random() * W
    this.y = H + 10
    this.vx = (Math.random() - 0.5) * 1.0
    this.vy = -(0.6 + Math.random() * 1.0)
    this.life = -stagger
    this.maxLife = 100 + Math.random() * 120
    const ci = Math.floor(Math.random() * PALETTE.length)
    this.colorA = PALETTE[ci]
    this.colorB = PALETTE[(ci + 1 + Math.floor(Math.random() * 2)) % PALETTE.length]
    this.width = 1 + Math.random() * 2.5
    this.glowSize = 7 + Math.random() * 9
    this.waveAmp = (Math.random() - 0.5) * 2.5
    this.waveFreq = 0.04 + Math.random() * 0.06
    this.wavePhase = Math.random() * Math.PI * 2
    this.trail = []
  }
  step() {
    this.life++
    if (this.life < 0) return
    this.x += this.vx + this.waveAmp * Math.sin(this.waveFreq * this.life + this.wavePhase)
    this.y += this.vy
    const t = Math.max(0, this.life / this.maxLife)
    const col = lerp(this.colorA, this.colorB, t)
    this.trail.push({ x: this.x, y: this.y, col })
    const maxTrail = 20 + Math.floor(this.width * 3)
    if (this.trail.length > maxTrail) this.trail.shift()
    if (this.life >= this.maxLife) this.reset()
  }
  draw(ctx) {
    if (this.life < 0 || this.trail.length < 2) return
    const t = Math.max(0, this.life / this.maxLife)
    const alpha = (t < 0.12 ? t / 0.12 : t > 0.72 ? (1 - t) / 0.28 : 1)
    for (let i = 1; i < this.trail.length; i++) {
      const p = this.trail[i], pp = this.trail[i - 1]
      const segT = i / this.trail.length
      ctx.beginPath()
      ctx.moveTo(pp.x, pp.y)
      ctx.lineTo(p.x, p.y)
      ctx.strokeStyle = `rgba(${Math.round(p.col[0])},${Math.round(p.col[1])},${Math.round(p.col[2])},${alpha * segT * 0.85})`
      ctx.lineWidth = this.width * segT
      ctx.lineCap = 'round'
      ctx.stroke()
    }
    const head = this.trail[this.trail.length - 1]
    const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, this.glowSize)
    grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`)
    grad.addColorStop(0.4, `rgba(${Math.round(head.col[0])},${Math.round(head.col[1])},${Math.round(head.col[2])},${alpha * 0.7})`)
    grad.addColorStop(1, `rgba(${Math.round(head.col[0])},${Math.round(head.col[1])},${Math.round(head.col[2])},0)`)
    ctx.beginPath()
    ctx.arc(head.x, head.y, this.glowSize, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

class Bloom {
  constructor(W, H) { this.W = W; this.H = H; this.reset(true) }
  reset(init) {
    this.x = Math.random() * this.W
    this.y = Math.random() * this.H
    this.r = 30 + Math.random() * 50
    this.life = init ? Math.random() * 200 : 0
    this.maxLife = 160 + Math.random() * 120
    this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
  }
  step() {
    this.life++
    if (this.life >= this.maxLife) this.reset(false)
  }
  draw(ctx) {
    const t = this.life / this.maxLife
    const a = (t < 0.3 ? t / 0.3 : t > 0.7 ? (1 - t) / 0.3 : 1) * 0.06
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
    const c = this.col
    grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`)
    grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

export default function PyreflyTransition() {
  const { pyreflyEnabled } = usePyrefly()
  const canvasRef = useRef(null)
  const stateRef = useRef({ globalAlpha: 0.2, boost: false, boostTimer: 0 })
  const location = useLocation()

  // Trigger boost on route change
  useEffect(() => {
    stateRef.current.boost = true
    stateRef.current.boostTimer = 0
  }, [location])

  useEffect(() => {
    if (!pyreflyEnabled) return
    const canvas = canvasRef.current
    if (!canvas) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const wisps = Array.from({ length: 30 }, () => new Wisp(W, H))
    const blooms = Array.from({ length: 8 }, () => new Bloom(W, H))
    const ctx = canvas.getContext('2d')
    let rafId

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      wisps.forEach((w) => { w.W = W; w.H = H })
      blooms.forEach((b) => { b.W = W; b.H = H })
    }
    window.addEventListener('resize', resize)

    function tick() {
      const s = stateRef.current
      // Boost sequence: ramp up 150ms, hold 100ms, ramp down 200ms (~450ms total at 60fps)
      if (s.boost) {
        s.boostTimer++
        if (s.boostTimer <= 9) {
          s.globalAlpha = 0.2 + (0.8 * s.boostTimer) / 9
        } else if (s.boostTimer <= 15) {
          s.globalAlpha = 1.0
        } else if (s.boostTimer <= 27) {
          s.globalAlpha = 1.0 - (0.8 * (s.boostTimer - 15)) / 12
        } else {
          s.globalAlpha = 0.2
          s.boost = false
        }
      }

      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.globalAlpha = s.globalAlpha
      blooms.forEach((b) => { b.step(); b.draw(ctx) })
      wisps.forEach((w) => { w.step(); w.draw(ctx) })
      ctx.restore()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [pyreflyEnabled])

  if (!pyreflyEnabled) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Verify it runs in the dev server**

Start the dev server (`npm run dev`), open the app, navigate between chapters. The wisps should be faintly visible at all times and intensify briefly during navigation. Turn pyrefly off in Settings and confirm the canvas disappears.

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/components/PyreflyTransition.jsx
git commit -m "feat: PyreflyTransition — rainbow wisp canvas overlay with route-change boost"
```

---

## Task 8: Wire QRP + Pyrefly into AppShell

**Files:**
- Modify: `spira-guide/src/components/Layout/AppShell.jsx`

- [ ] **Step 1: Update AppShell**

```jsx
// spira-guide/src/components/Layout/AppShell.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ChapterDrawer from './ChapterDrawer'
import TableOfContents from './TableOfContents'
import QuickRefPanel from '../QuickRef/QuickRefPanel'
import PyreflyTransition from '../PyreflyTransition'
import { useToc } from '../../context/TocContext'

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [qrpOpen, setQrpOpen] = useState(false)
  const { sections, activeId } = useToc()

  return (
    <div className="flex flex-col h-screen">
      <Header
        onHamburgerClick={() => setDrawerOpen((o) => !o)}
        isDrawerOpen={drawerOpen}
        onQRPClick={() => setQrpOpen((o) => !o)}
        isQRPOpen={qrpOpen}
      />
      <div className="flex flex-1 relative">
        <ChapterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
        <TableOfContents
          isOpen={tocOpen}
          onToggle={() => setTocOpen((o) => !o)}
          sections={sections}
          activeId={activeId}
        />
      </div>
      <QuickRefPanel isOpen={qrpOpen} onClose={() => setQrpOpen(false)} />
      <PyreflyTransition />
    </div>
  )
}
```

- [ ] **Step 2: Run existing tests**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run
```

Expected: same pre-existing pass/fail count. The 5 pre-existing failures in AppShell/ChapterDrawer/chapterIndex are unrelated — do not fix them here.

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/components/Layout/AppShell.jsx
git commit -m "feat: wire QuickRefPanel and PyreflyTransition into AppShell"
```

---

## Task 9: Landing Page Rework

**Files:**
- Modify: `spira-guide/src/pages/LandingPage.jsx`

No new test — the existing hooks are already tested. Verify visually via dev server.

- [ ] **Step 1: Rewrite `LandingPage.jsx`**

```jsx
// spira-guide/src/pages/LandingPage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../utils/assetUrl'
import ProgressDashboard from '../components/Layout/ProgressDashboard'
import { useLastVisited, useNextIncomplete } from '../hooks/useNavigation'

export default function LandingPage() {
  const { lastVisited } = useLastVisited()
  const nextIncomplete = useNextIncomplete()
  const [imgHidden, setImgHidden] = useState(false)

  return (
    <div
      className="relative flex flex-col h-full min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1840, #0a0820)' }}
    >
      {/* Cover art hero background */}
      {!imgHidden && (
        <img
          src={assetUrl('img/guide/image_0000_00.jpeg')}
          alt=""
          aria-hidden="true"
          onError={() => setImgHidden(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,8,32,0.55)', zIndex: 1 }}
      />

      {/* Corner card */}
      <div
        className="absolute top-4 left-4 ffx-panel flex flex-col gap-3 p-5"
        style={{
          background: 'rgba(10,8,32,0.82)',
          backdropFilter: 'blur(8px)',
          zIndex: 2,
          minWidth: '200px',
          maxWidth: '240px',
        }}
      >
        <div>
          <h1
            className="ffx-header tracking-widest"
            style={{ fontSize: '24px' }}
          >
            FINAL FANTASY X
          </h1>
          <p className="text-xs opacity-50 tracking-wider mt-0.5">HD Remaster Guide</p>
        </div>

        <ProgressDashboard />

        <div className="flex flex-col gap-2 mt-1">
          <Link
            to={`/chapter/${lastVisited ?? 'zanarkand'}`}
            className="ffx-button text-center py-2 text-sm"
            style={{ color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}
          >
            ▶ Continue
          </Link>
          <Link
            to={`/chapter/${nextIncomplete ?? 'zanarkand'}`}
            className="ffx-button text-center py-2 text-sm"
          >
            Next Incomplete
          </Link>
          <Link to="/collectibles" className="ffx-button text-center py-1.5 text-xs">
            Collectibles Hub
          </Link>
          <Link to="/settings" className="ffx-button text-center py-1.5 text-xs">
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in dev server**

Open the app at `/` (or navigate to the landing page). Check:
- Cover art fills the screen behind the card
- Gradient fallback shows if the image 404s (test by temporarily renaming the file)
- Continue and Next Incomplete buttons link to the correct chapters
- Corner card is positioned top-left without occlusion the art too much

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/pages/LandingPage.jsx
git commit -m "feat: landing page — hero cover art bg, corner card with progress + navigation"
```

---

## Task 10: Final Check

- [ ] **Step 1: Run full test suite**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run
```

Expected: all new tests pass. The 5 pre-existing failures remain unchanged (AppShell ×3, ChapterDrawer ×1, chapterIndex ×1 — do not touch them).

- [ ] **Step 2: Build check**

```bash
cd spira-guide
/Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run build
```

Expected: exits 0, no errors. The `dist/` output should include the cover art image.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: Phase 5 complete — landing page, search, quick reference panel, pyrefly transitions"
```
