# Phase 3: Collectibles Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Collectibles Hub page with 6 tabs (Celestials, Primers, Cloisters, Aeons, Jecht Spheres, Blitzball), a live progress dashboard, airship auto-unlock logic, and chapter-page navigation links — plus a visual theme overhaul correcting colours and fonts app-wide.

**Architecture:** `CollectiblesHub` page holds active tab in `useState`. All tracker components read from inline data constants and the existing `useCheckbox` hook — same IDs as area pages, so sync is automatic. Theme changes land first so all subsequent components render correctly. Data files land before components that use them.

**Tech Stack:** React 19 + JSX, Vite, Vitest + @testing-library/react, Tailwind CSS + `ffx-theme.css` (`ffx-panel`, `ffx-header`, `ffx-button`), React Router `<Link>`, `assetUrl()` from `src/utils/assetUrl.js`

**Run tests:** `cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run`
**Dev server:** `cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run dev`

---

## File Map

**Create:**
- `spira-guide/src/data/collectibles/airshipTriggers.js` — `AIRSHIP_UNLOCK_TRIGGERS` constant
- `spira-guide/src/data/collectibles/celestialsData.js` — 7-character celestial weapon lookup
- `spira-guide/src/data/collectibles/primersData.js` — 26 Al Bhed Primers with flags
- `spira-guide/src/data/collectibles/cloistersData.js` — 6 temple entries with flags
- `spira-guide/src/data/collectibles/aeonsData.js` — 8 aeon entries with flags
- `spira-guide/src/data/collectibles/jechtSpheresData.js` — 10 Jecht Sphere entries with flags
- `spira-guide/src/hooks/useStoryProgress.js` — overall story % hook
- `spira-guide/src/hooks/useStoryProgress.test.js` — tests
- `spira-guide/src/components/Collectibles/HubDashboard.jsx` — progress summary pill row
- `spira-guide/src/components/Collectibles/HubDashboard.test.jsx` — tests
- `spira-guide/src/components/Collectibles/TabBar.jsx` — 6-tab switcher
- `spira-guide/src/components/Collectibles/TabBar.test.jsx` — tests
- `spira-guide/src/components/Collectibles/CollectibleCard.jsx` — shared locked-overlay wrapper
- `spira-guide/src/components/Collectibles/CollectibleCard.test.jsx` — tests
- `spira-guide/src/components/Collectibles/CelestialTracker.jsx`
- `spira-guide/src/components/Collectibles/CelestialTracker.test.jsx`
- `spira-guide/src/components/Collectibles/PrimerList.jsx`
- `spira-guide/src/components/Collectibles/PrimerList.test.jsx`
- `spira-guide/src/components/Collectibles/CloisterChecklist.jsx`
- `spira-guide/src/components/Collectibles/CloisterChecklist.test.jsx`
- `spira-guide/src/components/Collectibles/AeonTracker.jsx`
- `spira-guide/src/components/Collectibles/AeonTracker.test.jsx`
- `spira-guide/src/components/Collectibles/JechtSpheres.jsx`
- `spira-guide/src/components/Collectibles/JechtSpheres.test.jsx`
- `spira-guide/src/components/Collectibles/BlitzballNote.jsx`

**Modify:**
- `spira-guide/src/styles/ffx-theme.css` — correct colour tokens + `.ffx-panel` gradient
- `spira-guide/src/styles/index.css` — white background, dark body text
- `spira-guide/src/components/MissableAlert.jsx` — red → orange Tailwind classes
- `spira-guide/src/hooks/useChapterProgress.js` — export `getAllCheckableIds`
- `spira-guide/src/components/Layout/ProgressDashboard.jsx` — wire `useStoryProgress`, update celestials count
- `spira-guide/src/pages/CollectiblesHub.jsx` — replace stub with full tab layout

---

## Task 1: Visual Theme Overhaul

**Files:**
- Modify: `spira-guide/src/styles/ffx-theme.css`
- Modify: `spira-guide/src/styles/index.css`
- Modify: `spira-guide/src/components/MissableAlert.jsx`

No tests for pure CSS changes — verify visually with dev server.

- [ ] **Step 1: Update colour tokens in `ffx-theme.css`**

Replace the entire `:root` block with:

```css
:root {
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Tuffy', sans-serif;
  --color-bg-deep: #ffffff;
  --color-bg-panel: #1a2040;
  --color-bg-panel-dark: #252858;
  --color-border: #8898cc;
  --color-border-alt: #6070a0;
  --color-gold: #FFC10F;
  --color-accent-blue: #3878b8;
  --color-accent-orange: #e08030;
  --color-accent-peach: #f0d8b8;
  --color-text: #ffffff;
  --color-text-dark: #222222;
}
```

- [ ] **Step 2: Fix the hardcoded `.ffx-panel` gradient**

Find this line in `.ffx-panel`:
```css
background: linear-gradient(135deg, rgba(55, 67, 123, 0.92), rgba(46, 40, 93, 0.95));
```

Replace with:
```css
background: linear-gradient(135deg, rgba(26, 32, 64, 0.92), rgba(37, 40, 88, 0.95));
color: var(--color-text);
```

- [ ] **Step 3: Update `index.css` body rule**

Change:
```css
body {
  font-family: 'Tuffy', sans-serif;
  background-color: var(--color-bg-deep);
  color: var(--color-text);
```

To:
```css
body {
  font-family: var(--font-body);
  background-color: var(--color-bg-deep);
  color: var(--color-text-dark);
```

- [ ] **Step 4: Fix `MissableAlert.jsx` — red → orange**

Replace all four hardcoded Tailwind classes:

| Old | New |
|---|---|
| `border-red-500` | `border-orange-500` |
| `bg-red-900/20` | `bg-orange-900/20` |
| `text-red-300` | `text-orange-300` |
| `text-red-200` | `text-orange-200` |

Also change `text-red-400` on the inline missable badge in `ItemList.jsx` to `text-orange-400`.

- [ ] **Step 5: Start dev server and verify**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run dev
```

Open the app. Confirm: white background, dark navy panels, orange missable alerts. The Besaid chapter page is a good test — it has MissableAlert and BossCard panels.

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/styles/ spira-guide/src/components/MissableAlert.jsx spira-guide/src/components/ItemList.jsx
git commit -m "feat: apply correct FFX/guide visual theme — white bg, navy panels, orange alerts"
```

---

## Task 2: Export `getAllCheckableIds` + `useStoryProgress` hook

**Files:**
- Modify: `spira-guide/src/hooks/useChapterProgress.js`
- Create: `spira-guide/src/hooks/useStoryProgress.js`
- Create: `spira-guide/src/hooks/useStoryProgress.test.js`

- [ ] **Step 1: Export `getAllCheckableIds` from `useChapterProgress.js`**

Change `function getAllCheckableIds(data)` to `export function getAllCheckableIds(data)`. No other changes.

- [ ] **Step 2: Write the failing test**

Create `spira-guide/src/hooks/useStoryProgress.test.js`:

```js
import { renderHook, act } from '@testing-library/react'
import { useStoryProgress } from './useStoryProgress'
import { useCheckbox } from './useCheckbox'

beforeEach(() => localStorage.clear())

describe('useStoryProgress', () => {
  it('returns 0 checked and positive total when nothing is checked', () => {
    const { result } = renderHook(() => useStoryProgress())
    expect(result.current.checked).toBe(0)
    expect(result.current.total).toBeGreaterThan(0)
  })

  it('checked increases when an item is toggled', () => {
    const { result: checkbox } = renderHook(() => useCheckbox())
    const { result: progress } = renderHook(() => useStoryProgress())

    act(() => checkbox.current.toggle('besaid-moon-crest'))
    expect(progress.current.checked).toBe(1)
  })

  it('percent is 0 when nothing checked', () => {
    const { result } = renderHook(() => useStoryProgress())
    expect(result.current.percent).toBe(0)
  })
})
```

- [ ] **Step 3: Run test to confirm it fails**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/hooks/useStoryProgress.test.js
```

Expected: FAIL — `useStoryProgress` not found.

- [ ] **Step 4: Implement `useStoryProgress.js`**

Create `spira-guide/src/hooks/useStoryProgress.js`:

```js
import { useCheckbox } from './useCheckbox'
import { getChapterData } from '../data/chapterData'
import { getAllCheckableIds } from './useChapterProgress'

const CHAPTER_SLUGS = [
  'zanarkand', 'baaj-temple', 'besaid', 'ss-liki', 'kilika', 'ss-winno',
  'luca', 'miihen-highroad', 'mushroom-rock-road', 'djose', 'moonflow',
  'guadosalam', 'thunder-plains', 'macalania-woods', 'lake-macalania',
  'bikanel-desert', 'home', 'airship', 'bevelle', 'via-purifico',
  'highbridge', 'calm-lands', 'mt-gagazet', 'zanarkand-dome',
  'airship-sin', 'inside-sin',
]

export function useStoryProgress() {
  const { checkedCount } = useCheckbox()
  const allIds = CHAPTER_SLUGS.flatMap((slug) =>
    getAllCheckableIds(getChapterData(slug))
  )
  const checked = checkedCount(allIds)
  const total = allIds.length
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100)
  return { checked, total, percent }
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/hooks/useStoryProgress.test.js
```

Expected: 3 PASS.

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/hooks/
git commit -m "feat: export getAllCheckableIds, add useStoryProgress hook"
```

---

## Task 3: Data Files

**Files:**
- Create: `spira-guide/src/data/collectibles/airshipTriggers.js`
- Create: `spira-guide/src/data/collectibles/primersData.js`
- Create: `spira-guide/src/data/collectibles/cloistersData.js`
- Create: `spira-guide/src/data/collectibles/aeonsData.js`
- Create: `spira-guide/src/data/collectibles/jechtSpheresData.js`
- Create: `spira-guide/src/data/collectibles/celestialsData.js`

These are pure data constants — no tests needed. IDs must match chapter JSON files exactly. Before writing each file, grep the relevant chapter JSONs to verify IDs.

**Verify IDs first:**
```bash
grep -r '"id"' spira-guide/src/data/chapters/ | grep -i "primer\|cloister\|aeon\|jecht\|sphere\|celestial\|yojimbo\|anima\|magus" | sort
```

- [ ] **Step 1: Create `airshipTriggers.js`**

```js
// IDs match airship.json optionalAreas exactly
export const AIRSHIP_UNLOCK_TRIGGERS = [
  'airship-remiem-cloudy-mirror',
  'airship-yojimbo-aeon',
  'airship-baaj-onion-knight',
  'airship-baaj-anima',
  'airship-remiem-primer-xxiv',
  'airship-omega-primer-xxvi',
]
```

- [ ] **Step 2: Create `primersData.js`**

Grep primer IDs from chapter JSONs before writing:
```bash
grep -r '"id"' spira-guide/src/data/chapters/ | grep primer | sort
```

```js
// IDs sourced from chapter JSON files — do NOT invent IDs
export const PRIMERS = [
  { num: 'I',     translation: 'A → E', location: 'Baaj Temple — Salvage Ship Deck',         chapterSlug: 'baaj-temple',      anchor: 'primer-i',                    missable: false, airshipRequired: false },
  { num: 'II',    translation: 'B → P', location: 'Besaid — Crusaders Lodge',                chapterSlug: 'besaid',           anchor: 'primer-ii',                   missable: false, airshipRequired: false },
  { num: 'III',   translation: 'C → S', location: 'S.S. Liki — Power Room',                  chapterSlug: 'ss-liki',          anchor: 'primer-iii',                  missable: false, airshipRequired: false },
  { num: 'IV',    translation: 'D → T', location: 'Kilika — Tavern',                          chapterSlug: 'kilika',           anchor: 'primer-iv',                   missable: false, airshipRequired: false },
  { num: 'V',     translation: 'E → I', location: 'S.S. Winno — Bridge',                     chapterSlug: 'ss-winno',         anchor: 'primer-v',                    missable: false, airshipRequired: false },
  { num: 'VI',    translation: 'F → W', location: 'Luca — Basement B',                       chapterSlug: 'luca',             anchor: 'primer-vi',                   missable: false, airshipRequired: false },
  { num: 'VII',   translation: 'G → K', location: 'Luca — Theatre Main Hall',                chapterSlug: 'luca',             anchor: 'primer-vii',                  missable: false, airshipRequired: false },
  { num: 'VIII',  translation: 'H → N', location: "Mi'ihen Highroad — Agency",               chapterSlug: 'miihen-highroad',  anchor: 'primer-viii',                 missable: false, airshipRequired: false },
  { num: 'IX',    translation: 'I → U', location: "Mi'ihen Highroad — Newroad North",        chapterSlug: 'miihen-highroad',  anchor: 'primer-ix',                   missable: false, airshipRequired: false },
  { num: 'X',     translation: 'J → V', location: 'Mushroom Rock Road — Precipice',          chapterSlug: 'mushroom-rock-road', anchor: 'primer-x',                  missable: false, airshipRequired: false },
  { num: 'XI',    translation: 'K → G', location: 'Djose Highroad',                          chapterSlug: 'djose',            anchor: 'primer-xi',                   missable: false, airshipRequired: false },
  { num: 'XII',   translation: 'L → C', location: 'Moonflow — North Wharf',                  chapterSlug: 'moonflow',         anchor: 'primer-xii',                  missable: false, airshipRequired: false },
  { num: 'XIII',  translation: 'M → L', location: 'Guadosalam — House West',                 chapterSlug: 'guadosalam',       anchor: 'primer-xiii',                 missable: false, airshipRequired: false },
  { num: 'XIV',   translation: 'N → R', location: 'Thunder Plains — Agency',                 chapterSlug: 'thunder-plains',   anchor: 'primer-xiv',                  missable: false, airshipRequired: false },
  { num: 'XV',    translation: 'O → Y', location: 'Macalania Woods — Lake Road',             chapterSlug: 'macalania-woods',  anchor: 'primer-xv',                   missable: false, airshipRequired: false },
  { num: 'XVI',   translation: 'P → B', location: 'Macalania Lake — Agency Road',            chapterSlug: 'lake-macalania',   anchor: 'primer-xvi',                  missable: false, airshipRequired: false },
  { num: 'XVII',  translation: 'Q → X', location: 'Bikanel — West',                          chapterSlug: 'bikanel-desert',   anchor: 'primer-xvii',                 missable: false, airshipRequired: false },
  { num: 'XVIII', translation: 'R → H', location: 'Bikanel — West',                          chapterSlug: 'bikanel-desert',   anchor: 'primer-xviii',                missable: false, airshipRequired: false },
  { num: 'XIX',   translation: 'S → M', location: 'Home — First Screen (North-West)',        chapterSlug: 'home',             anchor: 'primer-xix',                  missable: true,  airshipRequired: false },
  { num: 'XX',    translation: 'T → D', location: 'Home — Living Quarters (South)',          chapterSlug: 'home',             anchor: 'primer-xx',                   missable: true,  airshipRequired: false },
  { num: 'XXI',   translation: 'U → O', location: 'Home — Main Corridor',                   chapterSlug: 'home',             anchor: 'primer-xxi',                  missable: true,  airshipRequired: false },
  { num: 'XXII',  translation: 'V → F', location: 'Bevelle Temple — before Trials',         chapterSlug: 'bevelle',          anchor: 'primer-xxii',                 missable: true,  airshipRequired: false },
  { num: 'XXIII', translation: 'W → Z', location: 'Calm Lands — Central West',              chapterSlug: 'calm-lands',       anchor: 'primer-xxiii',                missable: false, airshipRequired: false },
  { num: 'XXIV',  translation: 'X → Q', location: 'Remiem Temple — Outside Left',           chapterSlug: 'airship',          anchor: 'airship-remiem-primer-xxiv',  missable: false, airshipRequired: true,
    id: 'airship-remiem-primer-xxiv' },
  { num: 'XXV',   translation: 'Y → A', location: 'Cavern of the Stolen Fayth — North East', chapterSlug: 'calm-lands',      anchor: 'primer-xxv',                  missable: false, airshipRequired: false },
  { num: 'XXVI',  translation: 'Z → J', location: 'Omega Ruins — Lower Area North',         chapterSlug: 'airship',          anchor: 'airship-omega-primer-xxvi',   missable: false, airshipRequired: true,
    id: 'airship-omega-primer-xxvi' },
]

// IDs for checkbox tracking — most primers use the chapter anchor as ID
// For airship-phase primers the ID is explicit above; for all others derive from anchor
export function getPrimerId(primer) {
  return primer.id ?? primer.anchor
}
```

- [ ] **Step 3: Create `cloistersData.js`**

```js
export const CLOISTERS = [
  {
    id: 'cloister-besaid',   name: 'Besaid',    chapterSlug: 'besaid',
    mapImage: 'img/maps/cloisters/Besaid Cloister.png',
    guideImage: 'image_0026_00.jpeg',
    reward: 'Rod of Wisdom',
    missable: true, missableReason: 'Dark Valefor blocks return to Besaid in HD Remaster',
  },
  {
    id: 'cloister-kilika',   name: 'Kilika',    chapterSlug: 'kilika',
    mapImage: 'img/maps/cloisters/Kilika Cloister.png',
    guideImage: 'image_0029_00.jpeg',
    reward: 'Red Armlet',
    missable: true, missableReason: "Can't return to Kilika Temple after leaving",
  },
  {
    id: 'cloister-djose',    name: 'Djose',     chapterSlug: 'djose',
    mapImage: 'img/maps/cloisters/Djose Cloister.png',
    guideImage: null,
    reward: 'Magistral Rod',
    missable: false,
  },
  {
    id: 'cloister-macalania', name: 'Macalania', chapterSlug: 'lake-macalania',
    mapImage: 'img/maps/cloisters/Macalania Cloister.png',
    guideImage: null,
    reward: 'White Magic Sphere',
    missable: false,
  },
  {
    id: 'cloister-bevelle',  name: 'Bevelle',   chapterSlug: 'bevelle',
    mapImage: null, // No cloister map exists — falls back to guide screenshot only
    guideImage: null,
    reward: 'Knight Lance',
    missable: false,
  },
  {
    id: 'cloister-zanarkand', name: 'Zanarkand', chapterSlug: 'zanarkand-dome',
    mapImage: 'img/maps/cloisters/Zanarkand Cloister.png',
    guideImage: null,
    reward: 'Magistral Rod',
    missable: false,
  },
]
```

- [ ] **Step 4: Create `aeonsData.js`**

```js
export const AEONS = [
  { id: 'aeon-valefor',      name: 'Valefor',       portrait: 'img/party/aeons/valefor.png',      chapterSlug: 'besaid',      anchor: 'aeon-valefor',      acquisition: 'Besaid Temple — story aeon',                              airshipRequired: false },
  { id: 'aeon-ifrit',        name: 'Ifrit',         portrait: 'img/party/aeons/ifrit.png',        chapterSlug: 'kilika',      anchor: 'aeon-ifrit',        acquisition: 'Kilika Temple — story aeon',                              airshipRequired: false },
  { id: 'aeon-ixion',        name: 'Ixion',         portrait: 'img/party/aeons/ixion.png',        chapterSlug: 'djose',       anchor: 'aeon-ixion',        acquisition: 'Djose Temple — story aeon',                               airshipRequired: false },
  { id: 'aeon-shiva',        name: 'Shiva',         portrait: 'img/party/aeons/shiva.png',        chapterSlug: 'lake-macalania', anchor: 'aeon-shiva',     acquisition: 'Macalania Temple — story aeon',                           airshipRequired: false },
  { id: 'aeon-bahamut',      name: 'Bahamut',       portrait: 'img/party/aeons/bahamut.png',      chapterSlug: 'zanarkand-dome', anchor: 'aeon-bahamut',   acquisition: 'Zanarkand Temple — story aeon',                           airshipRequired: false },
  { id: 'airship-yojimbo-aeon', name: 'Yojimbo',   portrait: 'img/party/aeons/yojimbo.png',      chapterSlug: 'calm-lands',  anchor: 'yojimbo',           acquisition: 'Cavern of the Stolen Fayth — negotiate with 200,000+ Gil', airshipRequired: false },
  { id: 'airship-baaj-anima', name: 'Anima',        portrait: 'img/party/aeons/anima.png',        chapterSlug: 'airship',     anchor: 'airship-baaj-anima', acquisition: 'Baaj Temple — requires all 7 aeons + all 6 Cloisters',   airshipRequired: true },
  { id: 'aeon-magus-sisters', name: 'Magus Sisters', portrait: 'img/party/aeons/magus-sisters.png', chapterSlug: 'airship',  anchor: 'aeon-magus-sisters', acquisition: 'Remiem Temple — requires Yojimbo, Anima, and Belgemine defeats', airshipRequired: true },
]
```

- [ ] **Step 5: Create `jechtSpheresData.js`**

Grep for Jecht Sphere IDs in chapter data:
```bash
grep -r '"id"' spira-guide/src/data/chapters/ | grep -i jecht | sort
```

```js
export const JECHT_SPHERES = [
  { id: 'jecht-sphere-1',  location: 'Zanarkand Ruins — right side of the area',    chapterSlug: 'zanarkand',         anchor: 'jecht-sphere-1',  airshipRequired: false },
  { id: 'jecht-sphere-2',  location: 'S.S. Liki — Captain\'s Cabin',               chapterSlug: 'ss-liki',           anchor: 'jecht-sphere-2',  airshipRequired: false },
  { id: 'jecht-sphere-3',  location: 'Kilika — Tavern (Pub)',                       chapterSlug: 'kilika',            anchor: 'jecht-sphere-3',  airshipRequired: false },
  { id: 'jecht-sphere-4',  location: 'Mi\'ihen Highroad — Newroad South',          chapterSlug: 'miihen-highroad',   anchor: 'jecht-sphere-4',  airshipRequired: false },
  { id: 'jecht-sphere-5',  location: 'Mushroom Rock Road — Junction',              chapterSlug: 'mushroom-rock-road', anchor: 'jecht-sphere-5', airshipRequired: false },
  { id: 'jecht-sphere-6',  location: 'Djose Highroad',                             chapterSlug: 'djose',             anchor: 'jecht-sphere-6',  airshipRequired: false },
  { id: 'jecht-sphere-7',  location: 'Moonflow — South Wharf',                    chapterSlug: 'moonflow',          anchor: 'jecht-sphere-7',  airshipRequired: false },
  { id: 'jecht-sphere-8',  location: 'Thunder Plains — South',                    chapterSlug: 'thunder-plains',    anchor: 'jecht-sphere-8',  airshipRequired: false },
  { id: 'jecht-sphere-9',  location: 'Macalania Woods — South',                   chapterSlug: 'macalania-woods',   anchor: 'jecht-sphere-9',  airshipRequired: false },
  { id: 'jecht-sphere-10', location: 'Mt. Gagazet — Mountain Gate',               chapterSlug: 'mt-gagazet',        anchor: 'jecht-sphere-10', airshipRequired: false },
]

export const JECHT_MILESTONES = [
  { count: 1,  overdrive: 'Shooting Star' },
  { count: 3,  overdrive: 'Banishing Blade' },
  { count: 10, overdrive: 'Tornado' },
]
```

> **Important:** After creating this file, verify the IDs match chapter JSONs exactly. Run the grep above and compare. If IDs differ, update them to match.

- [ ] **Step 6: Create `celestialsData.js`**

```js
// Cloudy Mirror and Celestial Mirror are excluded — they are regular chapter items, not weapon components
export const CELESTIALS_BY_CHARACTER = {
  tidus: {
    name: 'Tidus', weapon: 'Caladbolg', missable: false,
    portrait: 'img/party/characters/tidus.png',
    items: [
      { type: 'weapon', id: 'celestial-tidus-weapon', name: 'Caladbolg',  location: 'Calm Lands NW — beat Chocobo Trainer first',    chapterSlug: 'calm-lands',       anchor: 'caladbolg',                airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-tidus-crest',  name: 'Sun Crest',  location: 'Zanarkand Dome — chest after Yunalesca',        chapterSlug: 'zanarkand-dome',   anchor: 'sun-crest',                airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-tidus-sigil',  name: 'Sun Sigil',  location: 'Calm Lands — Catcher Chocobo Race (0:00.0)',    chapterSlug: 'calm-lands',       anchor: 'sun-sigil',                airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  yuna: {
    name: 'Yuna', weapon: 'Nirvana', missable: true,
    portrait: 'img/party/characters/yuna.png',
    missedExplanation: 'Dark Valefor now blocks return to Besaid Beach.',
    items: [
      { type: 'weapon', id: 'celestial-yuna-weapon', name: 'Nirvana',    location: 'Monster Arena — capture all Calm Lands fiends', chapterSlug: 'airship',          anchor: 'monster-arena',            airshipRequired: true,  postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-yuna-crest',  name: 'Moon Crest', location: 'Besaid Beach — east alcove (swim)',             chapterSlug: 'besaid',           anchor: 'moon-crest',               airshipRequired: false, postgameRequired: false, missable: true  },
      { type: 'sigil',  id: 'celestial-yuna-sigil',  name: 'Moon Sigil', location: 'Remiem Temple — defeat all 8 Belgemine Aeons', chapterSlug: 'airship',          anchor: 'airship-remiem-moon-sigil', airshipRequired: true, postgameRequired: false, missable: false },
    ],
  },
  wakka: {
    name: 'Wakka', weapon: 'World Champion', missable: false,
    portrait: 'img/party/characters/wakka.png',
    items: [
      { type: 'weapon', id: 'celestial-wakka-weapon', name: 'World Champion', location: 'Luca Café — bartender after placing 3rd+ in Blitzball', chapterSlug: 'luca', anchor: 'world-champion', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-wakka-crest',  name: 'Jupiter Crest',  location: 'Luca — Aurochs locker room (after story tournament)',   chapterSlug: 'luca', anchor: 'jupiter-crest',  airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-wakka-sigil',  name: 'Jupiter Sigil',  location: 'Blitzball League prize (win after all 3 overdrives)',   chapterSlug: 'luca', anchor: 'jupiter-sigil',  airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  lulu: {
    name: 'Lulu', weapon: 'Onion Knight', missable: false,
    portrait: 'img/party/characters/lulu.png',
    items: [
      { type: 'weapon', id: 'celestial-lulu-weapon', name: 'Onion Knight', location: 'Baaj Temple — seafloor south pillars (defeat Geosgaeno first)', chapterSlug: 'airship', anchor: 'airship-baaj-onion-knight', airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-lulu-crest',  name: 'Venus Crest', location: 'Guadosalam — Farplane chest (return after Yunalesca)',          chapterSlug: 'guadosalam', anchor: 'venus-crest', airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-lulu-sigil',  name: 'Venus Sigil', location: 'Thunder Plains — dodge 200 consecutive lightning strikes',      chapterSlug: 'thunder-plains', anchor: 'venus-sigil', airshipRequired: false, postgameRequired: false, missable: false },
    ],
  },
  kimahri: {
    name: 'Kimahri', weapon: 'Spirit Lance', missable: false,
    portrait: 'img/party/characters/kimahri.png',
    items: [
      { type: 'weapon', id: 'celestial-kimahri-weapon', name: 'Spirit Lance', location: 'Thunder Plains — pray at 3 Qactuar stones then follow ghost', chapterSlug: 'thunder-plains', anchor: 'spirit-lance', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-kimahri-crest',  name: 'Saturn Crest', location: 'Mt. Gagazet — Prominence (behind pillar)',                    chapterSlug: 'mt-gagazet',     anchor: 'saturn-crest', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-kimahri-sigil',  name: 'Saturn Sigil', location: 'Macalania Woods — Butterfly Hunt (both post-game hunts)',      chapterSlug: 'macalania-woods', anchor: 'saturn-sigil', airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  auron: {
    name: 'Auron', weapon: 'Masamune', missable: false,
    portrait: 'img/party/characters/auron.png',
    items: [
      { type: 'weapon', id: 'celestial-auron-weapon', name: 'Masamune',   location: 'Mushroom Rock — Rusty Sword + Lord Mi\'ihen statue',    chapterSlug: 'mushroom-rock-road', anchor: 'masamune',   airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-auron-crest',  name: 'Mars Crest', location: "Mi'ihen Highroad — Oldroad South",                      chapterSlug: 'miihen-highroad',    anchor: 'mars-crest', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-auron-sigil',  name: 'Mars Sigil', location: 'Monster Arena — capture 1 fiend from each of 10 areas', chapterSlug: 'airship',            anchor: 'mars-sigil', airshipRequired: true,  postgameRequired: true,  missable: false },
    ],
  },
  rikku: {
    name: 'Rikku', weapon: 'Godhand', missable: false,
    portrait: 'img/party/characters/rikku.png',
    items: [
      { type: 'weapon', id: 'celestial-rikku-weapon', name: 'Godhand',        location: 'Airship — enter password GODHAND and visit Mushroom Rock (Valley)', chapterSlug: 'airship', anchor: 'godhand',        airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-rikku-crest',  name: 'Mercury Crest', location: 'Bikanel Desert — shifting sand pit, western area',                   chapterSlug: 'bikanel-desert', anchor: 'mercury-crest', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-rikku-sigil',  name: 'Mercury Sigil', location: 'Bikanel — Cactuar Village, find all 10 Cactuars',                    chapterSlug: 'airship', anchor: 'mercury-sigil', airshipRequired: true, postgameRequired: false, missable: false },
    ],
  },
}
```

- [ ] **Step 7: Verify all IDs against chapter JSONs**

```bash
# Check celestial IDs exist in chapter files
for id in celestial-tidus-weapon celestial-yuna-crest besaid-moon-crest; do
  grep -r "\"$id\"" spira-guide/src/data/chapters/ && echo "FOUND: $id" || echo "MISSING: $id"
done
```

If any ID is missing from chapter data, the item is not yet tracked inline on area pages. That's OK — the hub will still work, the checkbox just won't sync until Phase 2.5 content adds the ID. Note any mismatches for future reconciliation.

- [ ] **Step 8: Commit**

```bash
git add spira-guide/src/data/collectibles/
git commit -m "feat: add collectibles data files — celestials, primers, cloisters, aeons, jecht spheres"
```

---

## Task 4: `CollectibleCard` — Shared Locked Overlay Wrapper

**Files:**
- Create: `spira-guide/src/components/Collectibles/CollectibleCard.jsx`
- Create: `spira-guide/src/components/Collectibles/CollectibleCard.test.jsx`

This component wraps any collectible row/card and handles the three lock states. Used by all tracker tabs.

- [ ] **Step 1: Write failing tests**

```jsx
// CollectibleCard.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CollectibleCard from './CollectibleCard'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders children when not locked', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="moon-crest"><span>Moon Crest</span></CollectibleCard>)
  expect(screen.getByText('Moon Crest')).toBeInTheDocument()
})

it('shows airship overlay when airshipRequired and not unlocked', () => {
  wrap(<CollectibleCard chapterSlug="airship" anchor="x" airshipRequired airshipUnlocked={false} airshipReason="Requires airship">child</CollectibleCard>)
  expect(screen.getByText(/Airship required/i)).toBeInTheDocument()
})

it('hides airship overlay when airshipUnlocked is true', () => {
  wrap(<CollectibleCard chapterSlug="airship" anchor="x" airshipRequired airshipUnlocked={true}>child</CollectibleCard>)
  expect(screen.queryByText(/Airship required/i)).not.toBeInTheDocument()
})

it('links to /chapter/airship when locked airship item is clicked', () => {
  wrap(<CollectibleCard chapterSlug="some-chapter" anchor="item" airshipRequired airshipUnlocked={false}>child</CollectibleCard>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/chapter/airship')
})

it('links to chapter when unlocked', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="moon-crest">child</CollectibleCard>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/chapter/besaid#moon-crest')
})

it('shows missed overlay when missed prop is true', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="x" missed missedExplanation="Dark Valefor blocks return.">child</CollectibleCard>)
  expect(screen.getByText(/permanently missed/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/CollectibleCard.test.jsx
```

- [ ] **Step 3: Implement `CollectibleCard.jsx`**

```jsx
import { Link } from 'react-router-dom'

// Shared wrapper for all collectible rows/cards.
// Handles three lock states: airship-locked, postgame-locked, permanently missed.
export default function CollectibleCard({
  children,
  chapterSlug,
  anchor,
  airshipRequired = false,
  airshipUnlocked = false,
  airshipReason = '',
  postgameRequired = false,
  postgameReason = '',
  missed = false,
  missedExplanation = '',
}) {
  const isAirshipLocked = airshipRequired && !airshipUnlocked
  const href = isAirshipLocked
    ? '/chapter/airship'
    : `/chapter/${chapterSlug}${anchor ? `#${anchor}` : ''}`

  return (
    <div className="relative">
      {children}
      {missed && (
        <div className="absolute inset-0 bg-red-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-red-300 text-xs font-bold uppercase tracking-wide">Permanently missed</p>
          {missedExplanation && <p className="text-red-200 text-xs">{missedExplanation}</p>}
        </div>
      )}
      {!missed && isAirshipLocked && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Airship required</p>
          {airshipReason && <p className="text-amber-200 text-xs">{airshipReason}</p>}
          <Link to={href} className="text-amber-400 text-xs underline mt-1">→ Find the airship</Link>
        </div>
      )}
      {!missed && !isAirshipLocked && postgameRequired && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Requires postgame</p>
          {postgameReason && <p className="text-amber-200 text-xs">{postgameReason}</p>}
          <Link to={href} className="text-amber-400 text-xs underline mt-1">→ View in guide</Link>
        </div>
      )}
      {!missed && !isAirshipLocked && (
        <Link
          to={href}
          className="absolute top-2 right-2 text-[var(--color-border)] hover:text-[var(--color-gold)] text-xs"
          aria-label="View in guide"
        >→</Link>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/CollectibleCard.test.jsx
```

Expected: 6 PASS.

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/components/Collectibles/
git commit -m "feat: add CollectibleCard locked-overlay wrapper"
```

---

## Task 5: `HubDashboard` + `TabBar` + `CollectiblesHub` Shell

**Files:**
- Create: `spira-guide/src/components/Collectibles/HubDashboard.jsx`
- Create: `spira-guide/src/components/Collectibles/HubDashboard.test.jsx`
- Create: `spira-guide/src/components/Collectibles/TabBar.jsx`
- Create: `spira-guide/src/components/Collectibles/TabBar.test.jsx`
- Modify: `spira-guide/src/pages/CollectiblesHub.jsx`
- Modify: `spira-guide/src/components/Layout/ProgressDashboard.jsx`

- [ ] **Step 1: Write failing tests for HubDashboard**

```jsx
// HubDashboard.test.jsx
import { render, screen } from '@testing-library/react'
import HubDashboard from './HubDashboard'

beforeEach(() => localStorage.clear())

it('renders Story pill', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Story/i)).toBeInTheDocument()
})

it('renders Collectibles pill', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Collectibles/i)).toBeInTheDocument()
})

it('renders all section counts', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Primers/i)).toBeInTheDocument()
  expect(screen.getByText(/Cloisters/i)).toBeInTheDocument()
  expect(screen.getByText(/Aeons/i)).toBeInTheDocument()
  expect(screen.getByText(/Jecht/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to confirm they fail**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/HubDashboard.test.jsx
```

- [ ] **Step 3: Implement `HubDashboard.jsx`**

```jsx
import { useCheckbox } from '../../hooks/useCheckbox'
import { useStoryProgress } from '../../hooks/useStoryProgress'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'
import { CLOISTERS } from '../../data/collectibles/cloistersData'
import { AEONS } from '../../data/collectibles/aeonsData'
import { JECHT_SPHERES } from '../../data/collectibles/jechtSpheresData'

const celestialIds = Object.values(CELESTIALS_BY_CHARACTER).flatMap((c) => c.items.map((i) => i.id))
const primerIds = PRIMERS.map(getPrimerId)
const cloisterIds = CLOISTERS.map((c) => c.id)
const aeonIds = AEONS.map((a) => a.id)
const jechtIds = JECHT_SPHERES.map((j) => j.id)
const allCollectibleIds = [...celestialIds, ...primerIds, ...cloisterIds, ...aeonIds, ...jechtIds]

function Pill({ label, checked, total, isPercent }) {
  const display = isPercent ? `${checked}%` : `${checked}/${total}`
  return (
    <span className="text-xs">
      <span style={{ color: 'var(--color-border-alt)' }}>{label}: </span>
      <strong style={{ color: 'var(--color-gold)' }}>{display}</strong>
    </span>
  )
}

export default function HubDashboard() {
  const { checkedCount } = useCheckbox()
  const { percent: storyPercent } = useStoryProgress()
  const collectiblesChecked = checkedCount(allCollectibleIds)
  const collectiblesPercent = Math.round((collectiblesChecked / allCollectibleIds.length) * 100)

  return (
    <div className="ffx-panel px-4 py-2 flex flex-wrap gap-x-4 gap-y-1 mb-4">
      <Pill label="Story" checked={storyPercent} total={100} isPercent />
      <Pill label="Collectibles" checked={collectiblesPercent} total={100} isPercent />
      <Pill label="Celestials" checked={checkedCount(celestialIds)} total={celestialIds.length} />
      <Pill label="Primers" checked={checkedCount(primerIds)} total={26} />
      <Pill label="Cloisters" checked={checkedCount(cloisterIds)} total={6} />
      <Pill label="Aeons" checked={checkedCount(aeonIds)} total={8} />
      <Pill label="Jecht" checked={checkedCount(jechtIds)} total={10} />
    </div>
  )
}
```

- [ ] **Step 4: Write failing TabBar tests**

```jsx
// TabBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import TabBar from './TabBar'

const TABS = ['Celestials', 'Primers', 'Cloisters', 'Aeons', 'Jecht Spheres', 'Blitzball']

it('renders all 6 tab buttons', () => {
  render(<TabBar tabs={TABS} active="Celestials" onSelect={() => {}} />)
  TABS.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument())
})

it('calls onSelect with tab name when clicked', () => {
  const onSelect = vi.fn()
  render(<TabBar tabs={TABS} active="Celestials" onSelect={onSelect} />)
  fireEvent.click(screen.getByText('Primers'))
  expect(onSelect).toHaveBeenCalledWith('Primers')
})

it('marks active tab with aria-selected', () => {
  render(<TabBar tabs={TABS} active="Primers" onSelect={() => {}} />)
  expect(screen.getByText('Primers').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true')
})
```

- [ ] **Step 5: Implement `TabBar.jsx`**

```jsx
export default function TabBar({ tabs, active, onSelect }) {
  return (
    <div role="tablist" className="flex gap-1 mb-6 border-b border-[var(--color-border)]">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2 text-sm font-bold transition-colors rounded-t
            ${active === tab
              ? 'bg-[var(--color-bg-panel)] text-[var(--color-gold)] border border-b-0 border-[var(--color-border)]'
              : 'text-[var(--color-text-dark)] hover:text-[var(--color-accent-blue)]'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Run all tests so far**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/
```

Expected: all pass.

- [ ] **Step 7: Replace `CollectiblesHub.jsx` stub**

```jsx
import { useState } from 'react'
import HubDashboard from '../components/Collectibles/HubDashboard'
import TabBar from '../components/Collectibles/TabBar'
import CelestialTracker from '../components/Collectibles/CelestialTracker'
import PrimerList from '../components/Collectibles/PrimerList'
import CloisterChecklist from '../components/Collectibles/CloisterChecklist'
import AeonTracker from '../components/Collectibles/AeonTracker'
import JechtSpheres from '../components/Collectibles/JechtSpheres'
import BlitzballNote from '../components/Collectibles/BlitzballNote'

const TABS = ['Celestials', 'Primers', 'Cloisters', 'Aeons', 'Jecht Spheres', 'Blitzball']

const TAB_COMPONENTS = {
  Celestials: CelestialTracker,
  Primers: PrimerList,
  Cloisters: CloisterChecklist,
  Aeons: AeonTracker,
  'Jecht Spheres': JechtSpheres,
  Blitzball: BlitzballNote,
}

export default function CollectiblesHub() {
  const [activeTab, setActiveTab] = useState('Celestials')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>
        COLLECTIBLES
      </h1>
      <HubDashboard />
      <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
      <ActiveComponent />
    </div>
  )
}
```

- [ ] **Step 8: Update `ProgressDashboard.jsx`**

```jsx
import { useStoryProgress } from '../../hooks/useStoryProgress'
import { useCheckbox } from '../../hooks/useCheckbox'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'

const celestialIds = Object.values(CELESTIALS_BY_CHARACTER).flatMap((c) => c.items.map((i) => i.id))
const primerIds = PRIMERS.map(getPrimerId)

export default function ProgressDashboard() {
  const { percent: storyPercent } = useStoryProgress()
  const { checkedCount } = useCheckbox()

  return (
    <div className="ffx-panel p-3 text-sm flex gap-4">
      <span>Story: <strong className="ffx-header">{storyPercent}%</strong></span>
      <span>Primers: <strong className="ffx-header">{checkedCount(primerIds)}/26</strong></span>
      <span>Celestials: <strong className="ffx-header">{checkedCount(celestialIds)}/21</strong></span>
    </div>
  )
}
```

- [ ] **Step 9: Run all tests**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run
```

Expected: all pass.

- [ ] **Step 10: Commit**

```bash
git add spira-guide/src/components/Collectibles/ spira-guide/src/pages/CollectiblesHub.jsx spira-guide/src/components/Layout/ProgressDashboard.jsx
git commit -m "feat: CollectiblesHub shell, HubDashboard, TabBar, ProgressDashboard wired up"
```

---

## Task 6: CelestialTracker

**Files:**
- Create: `spira-guide/src/components/Collectibles/CelestialTracker.jsx`
- Create: `spira-guide/src/components/Collectibles/CelestialTracker.test.jsx`

- [ ] **Step 1: Write failing tests**

```jsx
// CelestialTracker.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CelestialTracker from './CelestialTracker'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders all 7 character names', () => {
  wrap(<CelestialTracker />)
  ;['Tidus', 'Yuna', 'Wakka', 'Lulu', 'Kimahri', 'Auron', 'Rikku'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 21 checkboxes total', () => {
  wrap(<CelestialTracker />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(21)
})

it('shows Mark as missed button only on Yuna card', () => {
  wrap(<CelestialTracker />)
  expect(screen.getAllByText(/mark as missed/i)).toHaveLength(1)
})

it('shows missed overlay when Yuna is marked missed', () => {
  wrap(<CelestialTracker />)
  fireEvent.click(screen.getByText(/mark as missed/i))
  expect(screen.getByText(/permanently missed/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to confirm fail**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/CelestialTracker.test.jsx
```

- [ ] **Step 3: Implement `CelestialTracker.jsx`**

```jsx
import { useState } from 'react'
import { useCheckbox } from '../../hooks/useCheckbox'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'
import { assetUrl } from '../../utils/assetUrl'

const TYPE_LABEL = { weapon: 'Weapon', crest: 'Crest', sigil: 'Sigil' }

function CharacterCard({ char, airshipUnlocked }) {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const [missed, setMissed] = useLocalStorage(`celestial-missed-${char.name.toLowerCase()}`, false)

  const allChecked = char.items.every((item) => isChecked(item.id))
  const allLockedAirship = !missed && char.items.every((item) => !isChecked(item.id) && (item.airshipRequired || item.postgameRequired))

  return (
    <div className={`ffx-panel p-3 flex flex-col gap-2 relative ${allChecked ? 'ring-1 ring-[var(--color-gold)]' : ''}`}>
      <img
        src={assetUrl(char.portrait)}
        alt={char.name}
        className="w-12 h-12 object-cover rounded mx-auto"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <p className="text-center text-xs font-bold" style={{ color: 'var(--color-gold)' }}>{char.name}</p>
      <p className="text-center text-[10px]" style={{ color: 'var(--color-border-alt)' }}>{char.weapon}</p>

      <ul className="flex flex-col gap-1 mt-1">
        {char.items.map((item) => {
          const checked = isChecked(item.id)
          return (
            <li key={item.id} className={`text-xs flex items-center gap-1 ${checked ? 'opacity-40 line-through' : ''}`}>
              <input type="checkbox" id={item.id} checked={checked} onChange={() => toggle(item.id)}
                className="w-3 h-3 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
              <label htmlFor={item.id} className="cursor-pointer flex-1">
                <span style={{ color: 'var(--color-border-alt)' }}>{TYPE_LABEL[item.type]}: </span>
                {item.name}
              </label>
            </li>
          )
        })}
      </ul>

      {char.missable && !missed && (
        <button
          onClick={() => setMissed(true)}
          className="text-[10px] text-red-400 underline mt-1 text-left"
        >
          Mark as missed
        </button>
      )}

      {/* Overlays */}
      {missed && (
        <div className="absolute inset-0 bg-red-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-xl">🔒</span>
          <p className="text-red-300 text-xs font-bold uppercase">{char.weapon} locked</p>
          <p className="text-red-200 text-xs">{char.missedExplanation}</p>
          <button onClick={() => setMissed(false)} className="text-red-400 text-[10px] underline mt-1">Undo</button>
        </div>
      )}
      {!missed && allLockedAirship && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-xl">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase">{char.weapon} locked</p>
          <p className="text-amber-200 text-xs">Requires airship or postgame content</p>
        </div>
      )}
    </div>
  )
}

export default function CelestialTracker() {
  const { checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div>
      <div className="grid grid-cols-7 gap-3">
        {Object.values(CELESTIALS_BY_CHARACTER).map((char) => (
          <CharacterCard key={char.name} char={char} airshipUnlocked={airshipUnlocked} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to pass**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/CelestialTracker.test.jsx
```

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/components/Collectibles/CelestialTracker.jsx spira-guide/src/components/Collectibles/CelestialTracker.test.jsx
git commit -m "feat: CelestialTracker — 7 character cards with lock states"
```

---

## Task 7: PrimerList

**Files:**
- Create: `spira-guide/src/components/Collectibles/PrimerList.jsx`
- Create: `spira-guide/src/components/Collectibles/PrimerList.test.jsx`

- [ ] **Step 1: Write failing tests**

```jsx
// PrimerList.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PrimerList from './PrimerList'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 26 primer rows', () => {
  wrap(<PrimerList />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(26)
})

it('shows missable badge on primers XIX, XX, XXI, XXII', () => {
  wrap(<PrimerList />)
  expect(screen.getAllByText(/missable/i).length).toBeGreaterThanOrEqual(4)
})

it('shows airship overlay on Primer XXIV', () => {
  wrap(<PrimerList />)
  // XXIV is airship-required and airship not unlocked
  expect(screen.getAllByText(/Airship required/i).length).toBeGreaterThanOrEqual(1)
})
```

- [ ] **Step 2: Run to confirm fail, then implement**

```jsx
// PrimerList.jsx
import { useCheckbox } from '../../hooks/useCheckbox'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'
import { assetUrl } from '../../utils/assetUrl'

export default function PrimerList() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div>
      <img
        src={assetUrl('img/guide/image_0023_00.jpeg')}
        alt="Al Bhed alphabet chart"
        className="w-full max-w-lg mb-6 rounded border border-[var(--color-border)]"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <ul className="flex flex-col gap-2">
        {PRIMERS.map((primer) => {
          const id = getPrimerId(primer)
          const checked = isChecked(id)
          return (
            <li key={id}>
              <CollectibleCard
                chapterSlug={primer.chapterSlug}
                anchor={primer.anchor}
                airshipRequired={primer.airshipRequired}
                airshipUnlocked={airshipUnlocked}
                airshipReason={primer.airshipRequired ? 'Accessible after boarding the airship' : ''}
              >
                <div className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-opacity
                  ${checked ? 'opacity-40 line-through' : ''}
                  ${primer.missable ? 'bg-orange-950/20 border border-orange-800/30' : 'bg-[var(--color-accent-peach)]/10'}`}
                >
                  <input type="checkbox" id={id} checked={checked} onChange={() => toggle(id)}
                    className="w-4 h-4 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
                  <label htmlFor={id} className="cursor-pointer flex-1 flex gap-3">
                    <span className="font-bold w-14 flex-shrink-0" style={{ color: 'var(--color-gold)' }}>
                      Vol. {primer.num}
                    </span>
                    <span style={{ color: 'var(--color-border-alt)' }}>{primer.translation}</span>
                    <span className="flex-1">{primer.location}</span>
                  </label>
                  {primer.missable && (
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wide flex-shrink-0">
                      Missable
                    </span>
                  )}
                </div>
              </CollectibleCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

- [ ] **Step 3: Run all tests**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/PrimerList.test.jsx
```

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/components/Collectibles/PrimerList.jsx spira-guide/src/components/Collectibles/PrimerList.test.jsx
git commit -m "feat: PrimerList — 26 primers with missable flags and airship lock"
```

---

## Task 8: CloisterChecklist

**Files:**
- Create: `spira-guide/src/components/Collectibles/CloisterChecklist.jsx`
- Create: `spira-guide/src/components/Collectibles/CloisterChecklist.test.jsx`

- [ ] **Step 1: Write failing tests**

```jsx
// CloisterChecklist.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CloisterChecklist from './CloisterChecklist'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 6 temple cards', () => {
  wrap(<CloisterChecklist />)
  ;['Besaid', 'Kilika', 'Djose', 'Macalania', 'Bevelle', 'Zanarkand'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 6 checkboxes', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(6)
})

it('shows Anima progress counter', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getByText(/Anima/i)).toBeInTheDocument()
})

it('shows missable badge on Besaid and Kilika', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getAllByText(/missable/i).length).toBeGreaterThanOrEqual(2)
})
```

- [ ] **Step 2: Run to confirm fail, then implement**

```jsx
// CloisterChecklist.jsx
import { useCheckbox } from '../../hooks/useCheckbox'
import { CLOISTERS } from '../../data/collectibles/cloistersData'
import { assetUrl } from '../../utils/assetUrl'
import { Link } from 'react-router-dom'

export default function CloisterChecklist() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const cloisterIds = CLOISTERS.map((c) => c.id)
  const completedCount = checkedCount(cloisterIds)

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-dark)' }}>
        <strong>{completedCount}/6</strong> Destruction Spheres collected —
        {completedCount === 6
          ? ' ✅ Anima can now be unlocked at Baaj Temple.'
          : ` all 6 required to unlock Anima at Baaj Temple.`}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {CLOISTERS.map((cloister) => {
          const checked = isChecked(cloister.id)
          return (
            <Link
              key={cloister.id}
              to={`/chapter/${cloister.chapterSlug}`}
              className={`ffx-panel p-3 flex flex-col gap-2 transition-opacity no-underline
                ${checked ? 'opacity-50' : ''}
                ${cloister.missable ? 'border-orange-500' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text)' }}>
                  {cloister.name}
                </h3>
                {cloister.missable && (
                  <span className="text-[10px] text-orange-400 font-bold uppercase">Missable</span>
                )}
              </div>
              {cloister.mapImage ? (
                <img src={assetUrl(cloister.mapImage)} alt={`${cloister.name} cloister map`}
                  className="w-full rounded" onError={(e) => { e.target.style.display = 'none' }} />
              ) : (
                <p className="text-xs italic" style={{ color: 'var(--color-border-alt)' }}>No cloister map available</p>
              )}
              {cloister.missable && (
                <p className="text-xs text-orange-300">{cloister.missableReason}</p>
              )}
              <label className="flex items-center gap-2 text-sm cursor-pointer mt-auto" onClick={(e) => e.preventDefault()}>
                <input type="checkbox" checked={checked}
                  onChange={(e) => { e.stopPropagation(); toggle(cloister.id) }}
                  className="w-4 h-4 accent-[var(--color-gold)]" />
                <span style={{ color: 'var(--color-text)' }}>Destruction Sphere: <strong>{cloister.reward}</strong></span>
              </label>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run tests to pass, then commit**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/CloisterChecklist.test.jsx
git add spira-guide/src/components/Collectibles/CloisterChecklist.jsx spira-guide/src/components/Collectibles/CloisterChecklist.test.jsx
git commit -m "feat: CloisterChecklist — 6 temples with Anima progress counter"
```

---

## Task 9: AeonTracker

**Files:**
- Create: `spira-guide/src/components/Collectibles/AeonTracker.jsx`
- Create: `spira-guide/src/components/Collectibles/AeonTracker.test.jsx`

- [ ] **Step 1: Write failing tests**

```jsx
// AeonTracker.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AeonTracker from './AeonTracker'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 8 aeon cards', () => {
  wrap(<AeonTracker />)
  ;['Valefor', 'Ifrit', 'Ixion', 'Shiva', 'Bahamut', 'Yojimbo', 'Anima', 'Magus Sisters'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 8 checkboxes', () => {
  wrap(<AeonTracker />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(8)
})

it('shows airship overlay on Anima and Magus Sisters when not unlocked', () => {
  wrap(<AeonTracker />)
  expect(screen.getAllByText(/Airship required/i).length).toBe(2)
})

it('Yojimbo has no airship overlay', () => {
  wrap(<AeonTracker />)
  const yojimboCard = screen.getByText('Yojimbo').closest('[data-testid="aeon-card"]')
  expect(yojimboCard).not.toHaveTextContent(/Airship required/i)
})
```

- [ ] **Step 2: Run to confirm fail, then implement**

```jsx
// AeonTracker.jsx
import { useCheckbox } from '../../hooks/useCheckbox'
import { AEONS } from '../../data/collectibles/aeonsData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'
import { assetUrl } from '../../utils/assetUrl'

export default function AeonTracker() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div className="grid grid-cols-4 gap-4">
      {AEONS.map((aeon) => {
        const checked = isChecked(aeon.id)
        return (
          <CollectibleCard
            key={aeon.id}
            chapterSlug={aeon.chapterSlug}
            anchor={aeon.anchor}
            airshipRequired={aeon.airshipRequired}
            airshipUnlocked={airshipUnlocked}
            airshipReason="Accessible after boarding the airship"
          >
            <div data-testid="aeon-card" className={`ffx-panel p-3 flex flex-col gap-2 ${checked ? 'opacity-50' : ''}`}>
              <img src={assetUrl(aeon.portrait)} alt={aeon.name}
                className="w-16 h-16 object-contain mx-auto"
                onError={(e) => { e.target.style.display = 'none' }} />
              <p className="text-center font-bold text-sm" style={{ color: 'var(--color-gold)' }}>{aeon.name}</p>
              <p className="text-xs text-center" style={{ color: 'var(--color-border-alt)' }}>{aeon.acquisition}</p>
              <label className="flex items-center gap-2 text-xs cursor-pointer mt-auto justify-center">
                <input type="checkbox" checked={checked} onChange={() => toggle(aeon.id)}
                  className="w-3 h-3 accent-[var(--color-gold)]" />
                Obtained
              </label>
            </div>
          </CollectibleCard>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Run tests, commit**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/AeonTracker.test.jsx
git add spira-guide/src/components/Collectibles/AeonTracker.jsx spira-guide/src/components/Collectibles/AeonTracker.test.jsx
git commit -m "feat: AeonTracker — 8 aeons with airship lock on Anima and Magus Sisters"
```

---

## Task 10: JechtSpheres

**Files:**
- Create: `spira-guide/src/components/Collectibles/JechtSpheres.jsx`
- Create: `spira-guide/src/components/Collectibles/JechtSpheres.test.jsx`

- [ ] **Step 1: Write failing tests**

```jsx
// JechtSpheres.test.jsx
import { render, screen, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import JechtSpheres from './JechtSpheres'
import { useCheckbox } from '../../hooks/useCheckbox'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 10 sphere checkboxes', () => {
  wrap(<JechtSpheres />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(10)
})

it('shows overdrive milestone list', () => {
  wrap(<JechtSpheres />)
  expect(screen.getByText(/Shooting Star/i)).toBeInTheDocument()
  expect(screen.getByText(/Banishing Blade/i)).toBeInTheDocument()
  expect(screen.getByText(/Tornado/i)).toBeInTheDocument()
})

it('highlights reached milestone when spheres are checked', () => {
  const { result } = renderHook(() => useCheckbox())
  act(() => result.current.toggle('jecht-sphere-1'))
  wrap(<JechtSpheres />)
  // Shooting Star milestone should be marked reached (1 sphere checked)
  expect(screen.getByText(/Shooting Star/i).closest('li')).toHaveClass('text-[var(--color-gold)]')
})
```

- [ ] **Step 2: Run to confirm fail, then implement**

```jsx
// JechtSpheres.jsx
import { useCheckbox } from '../../hooks/useCheckbox'
import { JECHT_SPHERES, JECHT_MILESTONES } from '../../data/collectibles/jechtSpheresData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'

export default function JechtSpheres() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0
  const jechtIds = JECHT_SPHERES.map((j) => j.id)
  const collected = checkedCount(jechtIds)

  return (
    <div className="flex gap-8">
      <ul className="flex-1 flex flex-col gap-2">
        {JECHT_SPHERES.map((sphere, i) => {
          const checked = isChecked(sphere.id)
          return (
            <li key={sphere.id}>
              <CollectibleCard
                chapterSlug={sphere.chapterSlug}
                anchor={sphere.anchor}
                airshipRequired={sphere.airshipRequired}
                airshipUnlocked={airshipUnlocked}
              >
                <div className={`flex items-center gap-3 px-3 py-2 rounded text-sm bg-[var(--color-accent-peach)]/10 ${checked ? 'opacity-40 line-through' : ''}`}>
                  <input type="checkbox" id={sphere.id} checked={checked} onChange={() => toggle(sphere.id)}
                    className="w-4 h-4 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
                  <label htmlFor={sphere.id} className="cursor-pointer flex-1">
                    <span className="font-bold mr-2" style={{ color: 'var(--color-border-alt)' }}>#{i + 1}</span>
                    {sphere.location}
                  </label>
                </div>
              </CollectibleCard>
            </li>
          )
        })}
      </ul>

      <div className="w-48 flex-shrink-0">
        <p className="text-xs font-bold uppercase mb-3" style={{ color: 'var(--color-border-alt)' }}>
          Wakka Overdrives
        </p>
        <ul className="flex flex-col gap-3">
          {JECHT_MILESTONES.map((m) => {
            const reached = collected >= m.count
            return (
              <li key={m.overdrive} className={`text-sm ${reached ? 'text-[var(--color-gold)]' : 'opacity-50'}`}>
                <span className="font-bold">{reached ? '✓' : `${m.count}`}</span> sphere{m.count > 1 ? 's' : ''} →{' '}
                <span className="font-bold">{m.overdrive}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run tests, commit**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run src/components/Collectibles/JechtSpheres.test.jsx
git add spira-guide/src/components/Collectibles/JechtSpheres.jsx spira-guide/src/components/Collectibles/JechtSpheres.test.jsx
git commit -m "feat: JechtSpheres — 10 spheres with overdrive milestone tracker"
```

---

## Task 11: BlitzballNote

**Files:**
- Create: `spira-guide/src/components/Collectibles/BlitzballNote.jsx`

No tests — static content only.

- [ ] **Step 1: Implement `BlitzballNote.jsx`**

```jsx
import { assetUrl } from '../../utils/assetUrl'

export default function BlitzballNote() {
  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex gap-6 items-start">
        <img
          src={assetUrl('img/party/characters/wakka.png')}
          alt="Wakka"
          className="w-20 h-20 object-cover rounded flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div>
          <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>
            WAKKA'S OVERDRIVES
          </h2>
          <p className="text-sm italic" style={{ color: 'var(--color-border-alt)' }}>
            This is the only reason to engage with Blitzball — no full game database here.
          </p>
        </div>
      </div>

      <div className="ffx-panel p-4 flex flex-col gap-3">
        <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-gold)' }}>
          Overdrive Unlocks (Jecht Spheres)
        </h3>
        <ul className="flex flex-col gap-2 text-sm">
          <li><strong style={{ color: 'var(--color-gold)' }}>1 sphere</strong> — Shooting Star</li>
          <li><strong style={{ color: 'var(--color-gold)' }}>3 spheres</strong> — Banishing Blade</li>
          <li><strong style={{ color: 'var(--color-gold)' }}>10 spheres</strong> — Tornado</li>
        </ul>
      </div>

      <div className="ffx-panel p-4 flex flex-col gap-2">
        <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-gold)' }}>
          Jupiter Sigil (World Champion)
        </h3>
        <p className="text-sm">
          Win the Blitzball League <strong>after</strong> obtaining all 3 of Wakka's overdrives.
          The sigil has a ~50% drop rate and may require multiple league wins.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add spira-guide/src/components/Collectibles/BlitzballNote.jsx
git commit -m "feat: BlitzballNote — static Wakka overdrive and Jupiter Sigil reference"
```

---

## Task 12: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm test -- --run
```

Expected: all tests pass, no failures.

- [ ] **Step 2: Start dev server and verify all 6 tabs**

```bash
cd spira-guide && /Users/theonavarro/.nvm/versions/node/v24.14.0/bin/npm run dev
```

Navigate to `/collectibles`. Check each tab:
- [ ] HubDashboard shows all 7 pills (Story, Collectibles, Celestials, Primers, Cloisters, Aeons, Jecht)
- [ ] Celestials: 7 character cards, 21 checkboxes, Yuna has "Mark as missed"
- [ ] Primers: 26 rows, XXIV/XXVI show amber airship overlay, XIX–XXII show orange missable badge
- [ ] Cloisters: 6 cards, Anima counter, Besaid/Kilika show orange missable badge, Bevelle has no map image
- [ ] Aeons: 8 cards, Anima/Magus Sisters show amber overlay
- [ ] Jecht Spheres: 10 rows, milestone sidebar
- [ ] Blitzball: static content with Wakka portrait

- [ ] **Step 3: Test cross-page sync**

Check a primer on the Besaid chapter page. Navigate to Collectibles Hub → Primers tab. Confirm it shows as checked.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Phase 3 complete — Collectibles Hub with 6 tabs, theme overhaul, airship auto-unlock"
```
