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
- `spira-guide/src/components/Layout/Header.jsx` — search input enabled + QRP toggle button; new props `onQRPClick` and `isQRPOpen`
- `spira-guide/src/components/Layout/AppShell.jsx` — `isQRPOpen` state + renders `QuickRefPanel` and `PyreflyTransition`
- ~~`spira-guide/src/pages/ChapterPage.jsx`~~ — `setLastVisited(slug)` on mount is **already implemented**; no change needed

**New:**
- `spira-guide/src/data/searchIndex.js` — flat search index built at import time
- `spira-guide/src/hooks/useSearch.js` — substring filter over search index
- `spira-guide/src/components/Search/SearchDropdown.jsx` — search input + results dropdown
- `spira-guide/src/components/QuickRef/QuickRefPanel.jsx` — slide-in right panel with 3 tabs
- `spira-guide/src/components/QuickRef/ElementalChart.jsx` — elemental weakness grid
- `spira-guide/src/components/QuickRef/StatusEffects.jsx` — status effect reference table
- `spira-guide/src/components/QuickRef/KeyItems.jsx` — key item uses list
- `spira-guide/src/components/PyreflyTransition.jsx` — canvas overlay for page transitions
- `spira-guide/public/img/guide/image_0000_00.jpeg` — guide cover art (one-time extraction step below)

---

## Section 1: Landing Page

### Cover Art Setup (one-time)

Run this once before starting implementation — the file is not in `public/` yet:

```bash
cd "FFX walkthrough"
unzip -p "Official Strategy Guide/Final Fantasy X-X2 HD Remaster Official Strategy Guide (BradyGames).epub" \
  EPUB/image_0000_00.jpeg > spira-guide/public/img/guide/image_0000_00.jpeg
```

Verify the extracted file is the front cover (character art splash). If it is the back cover or an interior page, try `EPUB/image_0001_00.jpeg` instead.

If the image is unavailable or corrupt, fall back to the deep background gradient (`linear-gradient(135deg, #1a1840, #0a0820)`) — the layout must not break if the image is absent. Implement fallback via an `onError` handler on the `<img>` that hides it (sets display to none or removes it), allowing the gradient background beneath to show through. Do not rely on a missing `src` rendering gracefully — it will show a broken image icon.

### Layout
- Full-screen background: guide cover art (`image_0000_00.jpeg`), `object-fit: cover`, referenced via `assetUrl('img/guide/image_0000_00.jpeg')`, with a semi-transparent dark overlay (`rgba(10,8,32,0.55)`)
- **Corner card** positioned top-left: frosted dark panel (`rgba(10,8,32,0.82)` + `backdrop-filter: blur(8px)`), FFX panel border
- Card contents (top to bottom):
  - "FINAL FANTASY X" logo text (Highwind font, ≥24px)
  - "HD Remaster Guide" subtitle
  - Story progress line (e.g. "Story 42% · 18/26 Primers") via `ProgressDashboard`
  - Buttons stacked vertically: **Continue** (gold, primary), **Next Incomplete**, **Collectibles Hub**, **Settings**

### Navigation Hooks
- `useLastVisited` and `useNextIncomplete` are already implemented and wired correctly in `LandingPage.jsx`
- `ChapterPage` already calls `setLastVisited(slug)` on mount — no changes needed there

---

## Section 2: Global Search

### Z-Index Budget (all Phase 5 overlays)
| Layer | z-index |
|---|---|
| PyreflyTransition canvas | 50 |
| Chapter drawer / QRP panel | 100 |
| Search dropdown | 200 |

### Index

`src/data/searchIndex.js` builds a flat array at module load. Record shape:

```js
{ type, title, subtitle, chapterId, anchor }
// type: 'chapter' | 'boss' | 'item' | 'primer' | 'jecht-sphere' | 'celestial'
```

**Sources and derivation:**

- **Chapters**: `src/data/chapterIndex.js` (`chapters` array — **not** `walkthrough-index.json`, which is a document manifest, not a chapter list). Each entry has `{ slug, name, act, navImage }`. Emit `{ type: 'chapter', title: ch.name, chapterId: ch.slug }`.

- **Bosses**: `monsters.json` is an object keyed by monster name (e.g. `"sinspawn ammes"`) — it has **no `name` field on values** and **no `chapterId`**. `chapterData.js` does not export an iterable — drive the boss loop from the same `chapters` array imported from `chapterIndex.js` above, and call `getChapterData(ch.slug)` (from `chapterData.js`) for each entry to get its `bosses: [{ slug, strategy }]` array. Convert slug to display name with `slug.replace(/-/g, ' ')` (title-cased). Emit `{ type: 'boss', title: displayName, subtitle: ch.name, chapterId: ch.slug }`. Do not read `boss.name` or `boss.location` — neither exists on the value objects.

- **Items**: omitted from the search index (no reliable chapterId linkage).

- **Primers**: `src/data/collectibles/primersData.js` (`PRIMERS` array — **not** `docs/source-data/primers.json`, which has no `chapterSlug`). Each entry has `{ num, translation, location, chapterSlug }`. Emit `{ type: 'primer', title: \`Al Bhed Primer \${primer.num}\`, subtitle: primer.location, chapterId: primer.chapterSlug }`.

- **Jecht Spheres**: `src/data/collectibles/jechtSpheresData.js` (named export: `JECHT_SPHERES`). Each entry has `{ id, location, chapterSlug, anchor, airshipRequired }` — there is no `name` or `area` field. Emit `{ type: 'jecht-sphere', title: \`Jecht Sphere \${sphere.id}\`, subtitle: sphere.location, chapterId: sphere.chapterSlug, anchor: sphere.anchor }`.

- **Celestials**: `src/data/collectibles/celestialsData.js` (`CELESTIALS_BY_CHARACTER` object, keyed by character slug). Each value has an `items: [{ type, id, name, location, chapterSlug }]` array. Iterate the outer keys for the character display name. Emit one record per item: `{ type: 'celestial', title: item.name, subtitle: characterKey, chapterId: item.chapterSlug }`.

### Search Hook
`useSearch(query)`:
- Returns empty array if `query.length < 2`
- Filters on `title.toLowerCase().includes(query.toLowerCase())` — also checks `subtitle`
- Returns top 12 results, sorted: case-insensitive exact title match first (`title.toLowerCase() === query.toLowerCase()`), then by type priority (chapter > boss > primer > jecht-sphere > celestial), tiebroken by original index order
- No external dependencies (no Fuse.js)

### SearchDropdown Component
Replaces the disabled `<input>` in `Header.jsx`:
- Controlled input with `value` + `onChange`
- Results float below in a `position: absolute` panel, `z-index: 200`, styled with `ffx-panel`
- Results grouped by type with a small label (`BOSS`, `ITEM`, etc.)
- Items with `chapterId`: link to `/chapter/${chapterId}${anchor ? '#'+anchor : ''}`
- Items with `chapterId: null` (generic items): link to `/chapter/zanarkand` is wrong — instead show the result label only (no navigation) OR omit item-type records from the index (simpler). **Decision: omit items from the search index** — the index covers chapters, bosses, primers, Jecht Spheres, and celestials only. Items are not indexed.
- Closes on: Escape key, click outside (mousedown listener on document), navigation
- No results state: shows "No results" message if query ≥ 2 chars with 0 matches

---

## Section 3: Quick Reference Panel

### Integration
- `isQRPOpen` + `setIsQRPOpen` state in `AppShell`
- `Header` receives two new props: `onQRPClick` (function) and `isQRPOpen` (boolean) — same pattern as `onHamburgerClick` / `isDrawerOpen`
- Toggle button added to `Header` — book/scroll icon, right of the settings gear, same style as the hamburger button; `aria-label="Open quick reference"` / `aria-expanded={isQRPOpen}`
- `QuickRefPanel` rendered inside `AppShell`, fixed right, slides in via `transform: translateX(100%) → translateX(0)`, `z-index: 100`

### Layout
- Fixed right panel, same width as chapter drawer (~280px), full height
- `ffx-panel` background, `ffx-header` title "Quick Reference"
- Close button (×) top-right
- 3 tabs: **Elements**, **Status**, **Key Items**
- Tab bar: reuse `src/components/Collectibles/TabBar.jsx` directly (import from that path — no move needed)

### Tab Content

**Elements tab** (`ElementalChart.jsx`):
- Compact grid: rows = common enemy categories (Fiend, Aerial, Aquatic, Machine, Undead, Dragon, Plant, Fungus, Humanoid), columns = **6 elements only**: Fire, Ice, Lightning, Water, Holy, Gravity
  - Wind, Earth, Dark are excluded — they do not exist in `monsters.json`'s `elem_resists` field
- Cell values: Weak (▲ gold), Resists (▼ blue), Absorbs (★ green), Immune (— grey), Neutral (empty)
- Data: **fully hardcoded** — `monsters.json` entries have no `category` field (Fiend, Aerial, etc.), so programmatic aggregation per category is not possible. Write the grid data inline in the component as a constant, curated from game knowledge. The `elem_resists` keys available in source data are: `fire`, `ice`, `lightning`, `water`, `holy`, `gravity` — use these as column headers.

**Status tab** (`StatusEffects.jsx`):
- Two-column table: status name + effect description
- **Fully hardcoded** — `items.json` contains no status effect data
- Statuses to include: Poison, Silence, Sleep, Darkness, Slow, Petrify, Zombie, Berserk, Confuse, Doom, Threaten, Provoke, Sensor, Full Break
- Effect descriptions written inline in the component

**Key Items tab** (`KeyItems.jsx`):
- **Fully hardcoded** — `items.json` is a flat `{ name: description }` dictionary with no category field; there is no way to filter by type programmatically
- Curate a list of ~20 key items inline in the component: Al Bhed Potions, Mega-items, Distiller items, Aeon items, Turbo Ether, Elixir, Megalixir, Pendulum, Friend Sphere, Master Sphere, Dark Matter
- Each entry: `{ name, use }` — rendered as name + one-line use description

---

## Section 4: Pyrefly Page Transitions

### Component
`PyreflyTransition.jsx` — canvas element, `position: fixed; inset: 0; pointer-events: none; z-index: 50`, always mounted in `AppShell`. If `usePyrefly()` returns false, render `null`.

### Animation Style
Thin rainbow ribbon wisps with glowing heads (validated in brainstorm preview v4):
- Trail width: `1–3.5px`
- Glow bloom: `7–16px` radius
- Colors cycle: sky blue → aqua → green → yellow → pink → lavender → white
- Organic sinusoidal wave motion on x-axis
- Trail length: 20–28 segments
- 8 ambient background bloom patches: `30–80px` radius, very low opacity

### Trigger & Timing
- `useLocation()` from React Router detects route changes
- **Intent**: purely cosmetic overlay — the canvas fades up over the page as React Router swaps the DOM (immediately), then fades back down. There is no DOM deferral; the canvas simply masks the instant swap visually
- **Idle**: canvas runs at `globalAlpha: 0.2` (subtle ambient)
- **On route change**: `globalAlpha` ramps to `1.0` over 150ms, holds for 100ms, ramps back to `0.2` over 200ms (total ~450ms)

### Implementation Notes
- Wisp count: 30, staggered start offsets
- `requestAnimationFrame` loop started on mount, cancelled on unmount via returned cleanup
- Canvas sized to `window.innerWidth × window.innerHeight`; `resize` event listener must update `canvas.width` and `canvas.height` attributes (not just CSS dimensions — setting only CSS width/height leaves the pixel buffer unchanged, causing blurry rendering)
- `useEffect` watching `location` triggers the boost sequence

---

## Out of Scope

- Fuzzy/typo-tolerant search (deferred)
- Search keyboard navigation (arrow keys through results)
- QRP interactivity (checkboxes, tracking)
- Items in the search index (no reliable chapterId linkage)
- Blitzball reference in QRP
- Wind, Earth, Dark columns in ElementalChart (not in source data)
