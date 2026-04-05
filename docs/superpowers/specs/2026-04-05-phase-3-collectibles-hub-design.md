# Phase 3: Collectibles Hub — Design Spec

**Date:** 2026-04-05
**Scope:** Collectibles Hub page + Visual theme overhaul (typography, colours, backgrounds)
**Approach:** useState tabs, all data from existing source files, synced via existing useCheckbox hook

---

## Visual Theme (applies app-wide, retrofitted to Phase 2 components)

Phase 3 introduces the final visual design: a blend of the FFX HD Remaster in-game menu aesthetic and the BradyGames Official Strategy Guide.

### Fonts

| Role | Font | Source |
|---|---|---|
| Chapter/area titles | Bebas Neue | Self-hosted in `public/fonts/` — ultra-condensed bold, guide-style |
| All body text, UI, stats | Tuffy | Self-hosted in `public/fonts/` — game's menu font |

CSS variables: `--font-display: 'Bebas Neue', sans-serif` and `--font-body: 'Tuffy', sans-serif`. Both already declared in `ffx-theme.css`. Both registered as `@font-face` in `index.css` and cached by the service worker for PWA offline use.

### Colour Palette (corrected from Phase 1/2)

The current `ffx-theme.css` has inaccurate values. Phase 3 corrects them:

| Token | Old value | New value | Usage |
|---|---|---|---|
| `--color-bg-deep` | `#1a1430` | `#ffffff` | App page background (guide: white) |
| `--color-bg-panel` | `#37437B` | `#1a2040` | Dark navy panel start (game accurate) |
| `--color-bg-panel-dark` | `#2e285d` | `#252858` | Dark navy panel end |
| `--color-border` | `#707e9d` | `#8898cc` | Soft periwinkle panel border (game accurate) |
| `--color-border-alt` | `#575b88` | `#6070a0` | Secondary border |
| `--color-gold` | `#FFC10F` | `#FFC10F` | Unchanged — game selection cursor |
| `--color-accent-blue` | — | `#3878b8` | Guide medium blue — tabs, strips, arrows |
| `--color-accent-orange` | — | `#e08030` | Guide orange — missable alerts, chest callouts |
| `--color-accent-peach` | — | `#f0d8b8` | Guide peach — item/enemy row tint |
| `--color-text` | `#ffffff` | `#ffffff` | White — inside dark panels |
| `--color-text-dark` | — | `#222222` | Near-black — body text on white background |

**`--color-text-dark` usage:** Applied in `index.css` via `body { color: var(--color-text-dark) }`. Dark panels override with `color: var(--color-text)` via the `.ffx-panel` class. Components on the white background (chapter headings, prose, item rows) inherit `#222222` without needing an additional class.

### CSS Changes Required

**`ffx-theme.css` — `.ffx-panel` gradient is hardcoded and must be changed:**

Current (wrong):
```css
background: linear-gradient(135deg, rgba(55, 67, 123, 0.92), rgba(46, 40, 93, 0.95));
```

Replace with:
```css
background: linear-gradient(135deg, rgba(26, 32, 64, 0.92), rgba(37, 40, 88, 0.95));
```
These match the new `--color-bg-panel` (`#1a2040`) and `--color-bg-panel-dark` (`#252858`) values. Also update the `color` property to use `var(--color-text)` explicitly so it overrides the white-background body default.

**`MissableAlert.jsx` — hardcoded red Tailwind classes must be replaced:**

The component uses `border-red-500`, `bg-red-900/20`, `text-red-300`, `text-red-200`. These are JSX class names and cannot be changed via token update. Replace with orange/amber equivalents: `border-orange-500`, `bg-orange-900/20`, `text-orange-300`, `text-orange-200`. Add `--color-accent-orange` as a reference in the component comment.

### Design System

- **App background**: White (`#ffffff`) — guide's airy page feel
- **Panels** (BossCard, stat blocks, dialog boxes): Dark navy gradient `#1a2040 → #252858`, soft periwinkle border `#8898cc`
- **Chapter/area titles**: Bebas Neue, large, near-black on white — guide masthead style
- **Sub-section header bars**: Blue gradient bar `#3878b8 → transparent`, white Tuffy text — guide's distinctive section divider
- **Item/collectible rows**: Warm peach tint `#f0d8b8` on white background
- **Missable alerts**: Orange `#e08030` — replaces red, matches guide accent
- **Gold**: `#FFC10F` — game selection cursor, checkboxes, completion states
- **Body text** (outside panels): Tuffy, `#222222` on white
- **Body text** (inside panels): Tuffy, white

---

## Collectibles Hub

### Overall Structure

`CollectiblesHub` is the page component. It holds active tab in `useState` and renders:

```
CollectiblesHub
├── HubDashboard          — always-visible progress summary row
├── TabBar                — 6 tab buttons
└── [active tab]
    ├── CelestialTracker
    ├── PrimerList
    ├── CloisterChecklist
    ├── AeonTracker
    ├── JechtSpheres
    └── BlitzballNote
```

**Tab order:** Celestials · Primers · Cloisters · Aeons · Jecht Spheres · Blitzball

All tracker components use the existing `useCheckbox` hook — same IDs as inline collectible callouts on area pages. Checking a primer on the Besaid chapter page is reflected in the hub and vice versa.

**ID sync guarantee:** Every ID in the hub data files must exactly match the ID used in the corresponding `src/data/chapters/*.json` entry. Before writing any data file, grep the chapter JSON for the item to find the canonical ID. Example: Primer XXIV is `"airship-remiem-primer-xxiv"` in `airship.json` optionalAreas — the primer data file must use that exact string.

No new hooks needed. No new source data files needed.

---

## HubDashboard

A single row of stat pills above the tabs, always visible:

```
Story: 45%  ·  Collectibles: 59%  ·  Celestials: 3/21  ·  Primers: 12/26  ·  Cloisters: 2/6  ·  Aeons: 4/8  ·  Jecht: 3/10
```

**Story %:** Total checked items across all 27 chapters / total items across all 27 chapters. Extracted into `useStoryProgress()` in `src/hooks/useStoryProgress.js`.

Implementation: call `useCheckbox()` once to get `checkedCount`. Then iterate over all 27 chapter slugs from `chapterIndex.js` using plain (non-hook) functions to build a flat array of all checkable IDs — do NOT call `useChapterProgress` inside a loop, as that violates React Rules of Hooks. Extract a pure helper `getAllCheckableIds(chapterData)` from `useChapterProgress.js` (or re-implement the same logic inline) that takes chapter data and returns an ID array. Sum the counts using a single `checkedCount(allIds)` call. Share via `useStoryProgress` between `HubDashboard` and `ProgressDashboard`.

**Collectibles %:** Total checked / 71, where 71 = 21 (celestials) + 26 (primers) + 6 (cloisters) + 8 (aeons) + 10 (Jecht spheres). Blitzball tab has no trackable items.

**Celestials count is 21:** 7 characters × 3 items (weapon + crest + sigil). The Cloudy Mirror and Celestial Mirror are prerequisites, not weapon components — they are excluded from the 21. They appear in the Remiem Temple optional area as regular collectibles, not in the celestial tracker.

**Individual counts:** `checkedCount(ids)` from `useCheckbox` per section.

**Add to Modify list:** `ProgressDashboard.jsx` — wire up `useStoryProgress()` for real Story %, update Celestials display from `0/7` to `0/21` (individual components, not full weapons).

---

## Collectible States

Every trackable item has one of three states:

| State | Trigger | Visual |
|---|---|---|
| **Unchecked** | Default | Normal, dim |
| **Checked** | User clicks checkbox | Gold checkmark, strikethrough text |
| **Locked — Airship required** | Auto: `airshipRequired: true` AND `airshipUnlocked === false` | Amber overlay, lock icon, *"Airship required — [reason]"* |
| **Locked — Postgame required** | Auto: `postgameRequired: true` | Amber overlay, *"Requires postgame — [reason]"* |
| **Locked — Permanently missed** | User manually toggles "Mark as missed" | Red overlay, lock icon, *"[Item] permanently missed. [Explanation]."* |

### Airship Auto-Unlock

A shared constant in `src/data/collectibles/airshipTriggers.js`:

```js
export const AIRSHIP_UNLOCK_TRIGGERS = [
  'airship-remiem-cloudy-mirror',   // Cloudy Mirror — only obtainable via airship
  'airship-yojimbo-aeon',
  'airship-baaj-onion-knight',
  'airship-baaj-anima',
  'airship-remiem-primer-xxiv',
  'airship-omega-primer-xxvi',
]
```

`'airship-remiem-cloudy-mirror'` is the primary trigger — impossible to obtain before boarding the airship. All IDs match `airship.json` optionalAreas exactly.

```js
const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0
```

When `airshipUnlocked` is true, all "Airship required" overlays disappear automatically across all tabs.

### Navigation from Collectible Items

Every row/card in every tab is a navigation link. Clicking anywhere navigates to `/chapter/{chapterSlug}#{anchor}`. A small arrow icon indicates it's a link.

- **Normal items**: Navigate to `chapterSlug` + `anchor`
- **Airship-locked items**: Navigate to `/chapter/airship` (top of page — the Fahrenheit Deck sublocation is the first content). Once `airshipUnlocked`, link switches to the item's own `chapterSlug` + `anchor`
- **Postgame/missed items**: Navigate to `chapterSlug` + `anchor` regardless of lock state

Collectible data entry shape:
```js
{
  id: 'primer-xix',           // must match chapter JSON exactly
  chapterSlug: 'home',
  anchor: 'primer-xix',
  missable: true,             // enables "Mark as missed" button
  airshipRequired: false,
  postgameRequired: false,
  // tab-specific fields follow
}
```

---

## Tab: CelestialTracker

7 character cards in a row. Each card:
- Character portrait (`img/party/characters/{name}.png`)
- 3 rows: Weapon · Crest · Sigil — each with location text, chapter link arrow, and checkbox
- Checking all 3 rows completes the card (gold border glow)

### Card Lock States

**Permanently missed** (manual): Full-card red overlay, lock icon. Text: *"[Weapon] locked — [item] missed. [Explanation]."*

Only **Yuna's card** has `missable: true` (Moon Crest, Besaid Beach — Dark Valefor permanently blocks return in HD Remaster). The "Mark as missed" button appears only on missable cards.

**Airship/Postgame locked** (auto): Amber overlay when all remaining unchecked items on the card are `airshipRequired` or `postgameRequired`. Text: *"[Weapon] locked — requires [airship/postgame]. [Reason]."*

### Data

`celestials.json` is flat. A lookup constant in `src/data/collectibles/celestialsData.js` groups by character. The Cloudy Mirror and Celestial Mirror entries in `celestials.json` are **excluded** from this constant — they are tracked as regular items in the Airship chapter, not as celestial weapon components.

```js
// celestialsData.js — canonical IDs must match airship.json / chapter JSON entries
export const CELESTIALS_BY_CHARACTER = {
  tidus: {
    name: 'Tidus', weapon: 'Caladbolg', missable: false,
    portrait: 'img/party/characters/tidus.png',
    items: [
      { type: 'weapon', id: 'celestial-tidus-weapon', name: 'Caladbolg',  location: 'Calm Lands NW — beat Chocobo Trainer',         chapterSlug: 'calm-lands',      anchor: 'caladbolg',       airshipRequired: false, postgameRequired: false },
      { type: 'crest',  id: 'celestial-tidus-crest',  name: 'Sun Crest',  location: 'Zanarkand Dome — after Yunalesca',              chapterSlug: 'zanarkand-ruins', anchor: 'sun-crest',       airshipRequired: false, postgameRequired: false },
      { type: 'sigil',  id: 'celestial-tidus-sigil',  name: 'Sun Sigil',  location: 'Calm Lands — Catcher Chocobo Race (0:00.0)',    chapterSlug: 'calm-lands',      anchor: 'sun-sigil',       airshipRequired: false, postgameRequired: true  },
    ]
  },
  yuna: {
    name: 'Yuna', weapon: 'Nirvana', missable: true,
    portrait: 'img/party/characters/yuna.png',
    missedExplanation: 'Dark Valefor now blocks return to Besaid Beach.',
    items: [
      { type: 'weapon', id: 'celestial-yuna-weapon', name: 'Nirvana',    location: 'Monster Arena — capture all Calm Lands fiends', chapterSlug: 'airship',         anchor: 'monster-arena',   airshipRequired: true,  postgameRequired: false },
      { type: 'crest',  id: 'celestial-yuna-crest',  name: 'Moon Crest', location: 'Besaid Beach — east alcove',                   chapterSlug: 'besaid',          anchor: 'moon-crest',      airshipRequired: false, missable: true },
      { type: 'sigil',  id: 'celestial-yuna-sigil',  name: 'Moon Sigil', location: 'Remiem Temple — defeat all 8 Belgemine Aeons', chapterSlug: 'airship',         anchor: 'airship-remiem-moon-sigil', airshipRequired: true, postgameRequired: false },
    ]
  },
  // wakka, lulu, kimahri, auron, rikku follow same shape
}
```

---

## Tab: PrimerList

26 rows. Each row:
- Primer number (I–XXVI) + letter translation
- Location text
- Chapter link arrow
- Checkbox

**Missable primers** — two separate groups with different chapter slugs:
- **XIX, XX, XXI** (`missable: true`, `chapterSlug: 'home'`) — Home. Permanently missed if not collected before leaving.
- **XXII** (`missable: true`, `chapterSlug: 'bevelle'`) — Bevelle, before the Trials. Different chapter from the Home primers — link navigates to `/chapter/bevelle`.

**Airship-required primers:**
- **XXIV** (`airshipRequired: true`, `id: 'airship-remiem-primer-xxiv'`, `chapterSlug: 'airship'`) — Remiem Temple
- **XXVI** (`airshipRequired: true`, `id: 'airship-omega-primer-xxvi'`, `chapterSlug: 'airship'`) — Omega Ruins

A guide screenshot of the Al Bhed alphabet/translation chart sits at the top of the tab.

---

## Tab: CloisterChecklist

6 temple cards. Each card:
- Temple name
- Cloister map image (`img/maps/cloisters/{name}.png`)
- Guide screenshot of the area
- Checkbox: "Destruction Sphere collected" — shows reward item name
- Chapter link arrow

**Available cloister map images on disk:** Besaid, Kilika, Djose, Macalania, Zanarkand. **Bevelle Cloister map does not exist.** Bevelle card falls back to a guide screenshot only (no cloister map image). Use `ImageWithFallback` for all cloister map slots.

**Missable temples** (red border badge):
- Besaid: *"Dark Valefor blocks return in HD Remaster"*
- Kilika: *"Can't return to temple after leaving"*

Progress toward Anima shown above cards: *"X/6 Destruction Spheres — all 6 required to unlock Anima at Baaj Temple."*

---

## Tab: AeonTracker

8 aeon cards in a grid. **Magus Sisters are a single combined card** using `img/party/aeons/magus-sisters.png` — counted as one aeon (total = 8).

Each card:
- Aeon portrait
- Acquisition requirement text
- Guide screenshot of acquisition location
- Checkbox: "Obtained"
- Chapter link arrow

Optional aeons and their lock states:
| Aeon | Lock | Reason |
|---|---|---|
| Yojimbo | none | Cavern of the Stolen Fayth — accessible from Calm Lands gorge during main story, no airship needed |
| Anima | `airshipRequired: true` | Baaj Temple — requires airship coordinates + all 7 aeons + all 6 Cloisters |
| Magus Sisters | `airshipRequired: true` | Remiem Temple — requires Yojimbo, Anima, and Belgemine defeated |

Anima and Magus Sisters amber overlays auto-dismiss when `airshipUnlocked`. Yojimbo has no overlay — he's a regular optional card with a chapter link to the Cavern of the Stolen Fayth section in the Calm Lands chapter.

---

## Tab: JechtSpheres

10 sphere rows in order. Each row:
- Location text
- Guide screenshot or map image for that sphere's location
- Chapter link arrow
- Checkbox

Airship-gated spheres: `airshipRequired: true`.

Overdrive milestone progress indicator beneath the list:
- 1 sphere → Shooting Star
- 3 spheres → Banishing Blade
- 10 spheres → Tornado

---

## Tab: BlitzballNote

Static panel — no checkboxes or tracking. Contains:
- Wakka character portrait (`img/party/characters/wakka.png`)
- Guide screenshot showing Blitzball overdrive unlock screen
- Wakka's 3 overdrives: 1 Jecht Sphere → Shooting Star, 3 → Banishing Blade, 10 → Tornado (same milestones as JechtSpheres tab — shown here for context, not duplicated as interactive elements)
- Jupiter Sigil: win the Blitzball League after obtaining all 3 overdrives
- Note: *"This is the only reason to engage with Blitzball — no full game database here"*

---

## File Map

**Create:**
- `spira-guide/src/pages/CollectiblesHub.jsx` — replace stub with full tab layout
- `spira-guide/src/components/Collectibles/HubDashboard.jsx`
- `spira-guide/src/components/Collectibles/TabBar.jsx`
- `spira-guide/src/components/Collectibles/CelestialTracker.jsx`
- `spira-guide/src/components/Collectibles/PrimerList.jsx`
- `spira-guide/src/components/Collectibles/CloisterChecklist.jsx`
- `spira-guide/src/components/Collectibles/AeonTracker.jsx`
- `spira-guide/src/components/Collectibles/JechtSpheres.jsx`
- `spira-guide/src/components/Collectibles/BlitzballNote.jsx`
- `spira-guide/src/data/collectibles/celestialsData.js`
- `spira-guide/src/data/collectibles/primersData.js`
- `spira-guide/src/data/collectibles/cloistersData.js`
- `spira-guide/src/data/collectibles/aeonsData.js`
- `spira-guide/src/data/collectibles/jechtSpheresData.js`
- `spira-guide/src/data/collectibles/airshipTriggers.js`
- `spira-guide/src/hooks/useStoryProgress.js`

**Modify:**
- `spira-guide/src/styles/ffx-theme.css` — update colour tokens; fix hardcoded rgba in `.ffx-panel` to use new values
- `spira-guide/src/styles/index.css` — update body `background-color` to white, `color` to `var(--color-text-dark)`
- `spira-guide/src/components/MissableAlert.jsx` — replace hardcoded red Tailwind classes with orange equivalents (`border-orange-500`, `bg-orange-900/20`, `text-orange-300`, `text-orange-200`)
- `spira-guide/src/components/Layout/ProgressDashboard.jsx` — wire up `useStoryProgress()`, update Celestials display from `0/7` to `0/21`
- Phase 2 components — verify CSS variable references are correct after token rename (no structural changes)
