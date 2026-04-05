# Phase 5 Design: Landing Page, Global Search, Quick Reference Panel, Pyrefly Transitions

**Date:** 2026-04-05
**Status:** Approved

## Overview

Phase 5 completes the four remaining features from the original spec: a polished landing page, functional global search, a quick reference panel, and pyrefly page transition animations. No new routes or context providers are needed. All new state is local to `AppShell`.

---

## Architecture

Four files are modified, eight new files are added:

**Modified:**
- `spira-guide/src/pages/LandingPage.jsx` — full rework with hero background and corner card UI
- `spira-guide/src/components/Layout/Header.jsx` — search input enabled + QRP toggle button
- `spira-guide/src/components/Layout/AppShell.jsx` — `isQRPOpen` state + renders `QuickRefPanel` and `PyreflyTransition`
- `spira-guide/src/pages/ChapterPage.jsx` — calls `setLastVisited(slug)` on mount

**New:**
- `spira-guide/src/data/searchIndex.js` — flat search index built at import time
- `spira-guide/src/hooks/useSearch.js` — substring filter over search index
- `spira-guide/src/components/Search/SearchDropdown.jsx` — search input + results dropdown
- `spira-guide/src/components/QuickRef/QuickRefPanel.jsx` — slide-in right panel with 3 tabs
- `spira-guide/src/components/QuickRef/ElementalChart.jsx` — elemental weakness grid
- `spira-guide/src/components/QuickRef/StatusEffects.jsx` — status effect reference table
- `spira-guide/src/components/QuickRef/KeyItems.jsx` — key item uses list
- `spira-guide/src/components/PyreflyTransition.jsx` — canvas overlay for page transitions
- `spira-guide/public/img/guide/image_0000_00.jpeg` — guide cover art (copy from epub)

---

## Section 1: Landing Page

### Layout
- Full-screen background: guide cover art (`image_0000_00.jpeg`), `object-fit: cover`, with a semi-transparent dark overlay (`rgba(10,8,32,0.55)`)
- **Corner card** positioned top-left: frosted dark panel (`rgba(10,8,32,0.82)` + `backdrop-filter: blur(8px)`), FFX panel border
- Card contents (top to bottom):
  - "FINAL FANTASY X" logo text (Highwind font, ≥24px)
  - "HD Remaster Guide" subtitle
  - Story progress line (e.g. "Story 42% · 18/26 Primers") via `ProgressDashboard`
  - Buttons stacked vertically: **Continue** (gold, primary), **Next Incomplete**, **Collectibles Hub**, **Settings**

### Navigation Hooks
- `useLastVisited` already exists — `ChapterPage` must call `setLastVisited(slug)` on mount so Continue always reflects the last chapter visited
- `useNextIncomplete` already exists and is wired correctly

### Cover Art
- Source: `EPUB/image_0000_00.jpeg` inside the epub (unzip at build/setup time, copy to `spira-guide/public/img/guide/`)
- Reference via `assetUrl('img/guide/image_0000_00.jpeg')`

---

## Section 2: Global Search

### Index
`src/data/searchIndex.js` builds a flat array at module load from existing imported JSON:

```js
// Record shape
{ type, title, subtitle, chapterId, anchor }
// type: 'chapter' | 'boss' | 'item' | 'primer' | 'jecht-sphere' | 'celestial'
```

Sources:
- `walkthrough-index.json` → chapter records
- `monsters.json` (bosses only) → boss records, `chapterId` from monster's chapter field
- `items.json` → item records, grouped by chapter where available
- `primers.json` → primer records with chapter location
- `jechtSpheresData.js` → Jecht Sphere records
- `celestials.json` → celestial weapon component records

### Search Hook
`useSearch(query)`:
- Returns empty array if `query.length < 2`
- Filters on `title.toLowerCase().includes(query.toLowerCase())`
- Also checks `subtitle` field
- Returns top 12 results, sorted: exact title match first, then by type priority (chapter > boss > item > primer > collectible)
- No external dependencies (no Fuse.js)

### SearchDropdown Component
Replaces the disabled `<input>` in `Header.jsx`:
- Controlled input with `value` + `onChange`
- Results float below in a `position: absolute` panel, `z-index: 200`, styled with `ffx-panel`
- Results grouped by type with a small label (`BOSS`, `ITEM`, etc.)
- Each result is a `<Link to={/chapter/${chapterId}${anchor ? '#'+anchor : ''}}>` — closes dropdown on navigate
- Closes on: Escape key, click outside (mousedown listener on document), navigation
- No results state: shows "No results" message if query ≥ 2 chars with 0 matches

---

## Section 3: Quick Reference Panel

### Integration
- `isQRPOpen` + `setIsQRPOpen` state in `AppShell`
- Toggle button added to `Header` — book/scroll icon, right of the settings gear, same style as the hamburger button
- `QuickRefPanel` rendered inside `AppShell`, fixed right, slides in via `transform: translateX`

### Layout
- Fixed right panel, same width as chapter drawer (~280px), full height
- `ffx-panel` background, `ffx-header` title "Quick Reference"
- Close button (×) top-right
- 3 tabs: **Elements**, **Status**, **Key Items**
- Tab bar uses same `TabBar` pattern as `CollectiblesHub`

### Tab Content

**Elements tab** (`ElementalChart.jsx`):
- Compact grid: rows = common enemy types (Fiend, Aerial, Aquatic, Machine, Undead, Dragon, Plant, Fungus, Humanoid), columns = 8 elements (Fire, Ice, Thunder, Water, Wind, Earth, Holy, Dark)
- Cell values: Weak (▲ gold), Resists (▼ blue), Absorbs (★ green), Immune (— grey), Neutral (empty)
- Data derived from aggregating `monsters.json` element flags — representative weaknesses per enemy category

**Status tab** (`StatusEffects.jsx`):
- Two-column table: status name + effect description
- Statuses: Poison, Silence, Sleep, Darkness, Slow, Petrify, Zombie, Berserk, Confuse, Doom, Threaten, Provoke, Sensor, Full Break
- Effect descriptions are hardcoded (game mechanic text — not available in source JSON)
- Items that inflict/cure each status pulled from `items.json` shown as small tags

**Key Items tab** (`KeyItems.jsx`):
- Items filtered from `items.json` by `category: 'key'` or equivalent flag
- Each entry: item name + use description
- Includes: Distiller items, Aeon items, Al Bhed Potions, Mega-items, Overdrives triggers

---

## Section 4: Pyrefly Page Transitions

### Component
`PyreflyTransition.jsx` — canvas element, `position: fixed; inset: 0; pointer-events: none; z-index: 50`, always mounted in `AppShell`.

### Animation Style
Thin rainbow ribbon wisps with glowing heads (confirmed in preview v4):
- Trail width: `1–3.5px` (thin)
- Glow bloom: `7–16px` radius
- Colors cycle through: sky blue → aqua → green → yellow → pink → lavender → white
- Organic wave motion (sinusoidal x-offset)
- Trail length: 20–28 segments
- Ambient background bloom patches: `30–80px` radius, very low opacity

### Trigger & Timing
- `useLocation()` detects route changes
- **Idle**: canvas runs continuously at `globalAlpha: 0.2` (ambient, subtle)
- **Transition**: on location change → canvas fades to `globalAlpha: 1.0` over 150ms → holds for 100ms → fades back to `0.2` over 200ms (total ~450ms)
- The page DOM swap happens at the React Router level during the hold phase — the canvas briefly covers the transition
- Respects `usePyrefly` toggle: if off, canvas `display: none` entirely

### Implementation Notes
- Wisp count: 30, staggered start offsets
- 8 ambient bloom patches
- `requestAnimationFrame` loop, cleaned up on unmount
- Canvas dimensions set to `window.innerWidth × window.innerHeight`, resizes on `resize` event

---

## Data Notes

- `monsters.json` boss records have a `chapter` or `area` field — verify exact key during implementation
- `items.json` key item category filter — verify exact `category` value during implementation
- Cover art image (`image_0000_00.jpeg`) is 2MB — confirm it's the front cover before committing to `public/`; if it's a back cover or interior page, check `image_0001_00.jpeg` instead

---

## Out of Scope

- Fuzzy/typo-tolerant search (deferred; substring is sufficient for ~500 records)
- Search keyboard navigation (arrow keys through results) — deferred
- QRP checkboxes or tracking (reference only, no interaction)
- Blitzball reference data in QRP
