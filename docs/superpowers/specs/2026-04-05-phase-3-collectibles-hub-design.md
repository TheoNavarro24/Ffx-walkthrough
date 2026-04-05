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

The current `ffx-theme.css` has several inaccurate values. Phase 3 corrects them:

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

### Design System

- **App background**: White (`#ffffff`) — guide's airy page feel
- **Panels** (BossCard, stat blocks, dialog boxes): Dark navy gradient `#1a2040 → #252858`, soft periwinkle border `#8898cc`
- **Chapter/area titles**: Bebas Neue, large, near-black on white — guide masthead style
- **Sub-section header bars**: Blue gradient bar `#3878b8 → transparent`, white Tuffy text — guide's distinctive section divider style
- **Item/collectible rows**: Warm peach tint `#f0d8b8` on white background
- **Missable alerts**: Orange `#e08030` — replaces current red, matches guide accent
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

All tracker components use the existing `useCheckbox` hook — same IDs as inline collectible callouts on area pages. Checking a primer on the Besaid chapter page is already reflected in the hub, and vice versa.

No new hooks needed. No new source data files needed.

---

## HubDashboard

A single row of stat pills above the tabs, always visible regardless of active tab:

```
Story: 45%  ·  Collectibles: 59%  ·  Celestials: 3/21  ·  Primers: 12/26  ·  Cloisters: 2/6  ·  Aeons: 4/8  ·  Jecht: 3/10
```

- **Story %**: Reuses story progress calculation from `ProgressDashboard` (drawer component) — shared logic, not duplicated
- **Collectibles %**: Total checked / 71 (21 + 26 + 6 + 8 + 10)
- **Individual counts**: `checkedCount(ids)` from `useCheckbox` per section

---

## Collectible States

Every trackable item has one of three states:

| State | Trigger | Visual |
|---|---|---|
| **Unchecked** | Default | Normal, dim |
| **Checked** | User clicks checkbox | Gold checkmark, strikethrough text |
| **Locked — Airship required** | Auto: item has `airshipRequired: true` AND airship not yet unlocked | Amber overlay with lock icon, text: *"Airship required — [reason]"* |
| **Locked — Postgame required** | Auto: item has `postgameRequired: true` | Amber overlay, text: *"Requires postgame — [reason]"* |
| **Locked — Permanently missed** | User manually marks via "Mark as missed" | Red overlay with lock icon, text: *"[Item] permanently missed. [Explanation]"* |

### Airship Auto-Unlock

`AIRSHIP_UNLOCK_TRIGGERS` is a shared constant — an array of item IDs only available after boarding the airship (items from the Airship chapter, optional aeon checkboxes, Omega Ruins primer, etc.).

```js
const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0
```

When `airshipUnlocked` is true, all "Airship required" overlays disappear automatically across all tabs. No manual toggle needed.

### Navigation from Locked States

- **Airship-locked items**: Clicking navigates to `/chapter/airship#obtain-airship` — the point in the guide where the airship is first boarded
- **Once unlocked**: Link switches to that item's own chapter location
- **Postgame/missed**: Clicking still navigates to the item's chapter location

### Collectible Link Behaviour

Every row/card in every tab is a navigation link. Clicking anywhere on it navigates to `/chapter/{chapterSlug}#{anchor}`. A small arrow icon indicates it's a link.

Each collectible data entry shape:
```js
{
  id: 'primer-xix',
  chapterSlug: 'home',
  anchor: 'primer-xix',
  missable: true,
  airshipRequired: false,
  postgameRequired: false,
  // tab-specific fields follow
}
```

---

## Tab: CelestialTracker

7 character cards in a row. Each card:
- Character portrait (`img/party/characters/{name}.png`)
- 3 rows: Weapon · Crest · Sigil — each with a small weapon/item icon, location text, and checkbox
- Each row links to its `chapterSlug` + `anchor`

### Card States

Cards have two states:

**Active**: Normal — shows 3 checkboxes individually trackable.

**Locked — Permanently missed**: Full-card red overlay with lock icon. Text: *"[Weapon] locked — [item] missed. [Explanation]."* Triggered by user via "Mark as missed" button on missable cards. Only Yuna's card has this flag (`missable: true`) — Moon Crest at Besaid Beach is permanently blocked by Dark Valefor in HD Remaster.

**Locked — Airship/Postgame**: Full-card amber overlay when all remaining unchecked items on the card are `airshipRequired` or `postgameRequired`. Text: *"[Weapon] locked — requires [airship/postgame]. [Reason]."*

### Data

`celestials.json` is a flat list. A lookup constant inside `CelestialTracker` groups items by character:

```js
const CELESTIALS_BY_CHARACTER = {
  tidus: {
    name: 'Tidus', weapon: 'Caladbolg',
    items: [
      { type: 'weapon', id: 'celestial-tidus-weapon', name: 'Caladbolg', chapterSlug: 'calm-lands', anchor: 'caladbolg', airshipRequired: false, postgameRequired: false },
      { type: 'crest',  id: 'celestial-tidus-crest',  name: 'Sun Crest',  chapterSlug: 'zanarkand-ruins', anchor: 'sun-crest', airshipRequired: false, postgameRequired: false },
      { type: 'sigil',  id: 'celestial-tidus-sigil',  name: 'Sun Sigil',  chapterSlug: 'calm-lands', anchor: 'sun-sigil', postgameRequired: true },
    ]
  },
  // ... 6 more characters
}
```

---

## Tab: PrimerList

26 rows, one per primer. Each row:
- Primer number (I–XXVI) + letter translation (e.g. "A → E")
- Location text
- Chapter link arrow
- Checkbox
- Primers XIX–XXII: red missable flag + "Mark as missed" option

Primers XXIV (Remiem), XXVI (Omega Ruins): `airshipRequired: true`.

A guide screenshot of the Al Bhed alphabet/translation chart sits at the top of the tab.

---

## Tab: CloisterChecklist

6 temple cards. Each card:
- Temple name
- Cloister map image (`img/maps/cloisters/{name}.png`)
- Guide screenshot of the acquisition area
- Checkbox: "Destruction Sphere collected" — shows reward item name
- Missable flag (red border): Besaid ("Dark Valefor blocks return"), Kilika ("Can't return to temple")
- Chapter link arrow navigating to the cloister section of that chapter

Progress toward Anima shown as a counter above the cards: "X/6 Destruction Spheres — Anima unlocked when all 6 complete."

---

## Tab: AeonTracker

8 aeon cards in a grid. Each card:
- Aeon portrait (`img/party/aeons/{name}.png`)
- Guide screenshot of acquisition location
- Acquisition requirement text (e.g. "Defeat Yojimbo at the Cavern of the Stolen Fayth")
- Checkbox: "Obtained"
- Chapter link arrow

Optional aeons (Yojimbo, Anima, Magus Sisters): `airshipRequired: true` — amber overlay auto-dismissed when airship unlocked.

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
- Guide screenshot showing Blitzball overdrive unlock
- Wakka's 3 overdrives and which sphere counts unlock each
- Jupiter Sigil requirement: win the Blitzball League after obtaining all 3 overdrives
- Note: "This is the only reason to engage with Blitzball — no full game database here"

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
- `spira-guide/src/data/collectibles/celestialsData.js` — character-grouped celestial lookup
- `spira-guide/src/data/collectibles/primersData.js` — 26 primers with chapterSlug/anchor/flags
- `spira-guide/src/data/collectibles/cloistersData.js` — 6 temples with chapterSlug/anchor/flags
- `spira-guide/src/data/collectibles/aeonsData.js` — 8 aeons with chapterSlug/anchor/flags
- `spira-guide/src/data/collectibles/jechtSpheresData.js` — 10 spheres with chapterSlug/anchor/flags
- `spira-guide/src/data/collectibles/airshipTriggers.js` — AIRSHIP_UNLOCK_TRIGGERS constant

**Modify:**
- `spira-guide/src/styles/ffx-theme.css` — update colour tokens to corrected values, add new accent tokens
- `spira-guide/src/styles/index.css` — update body background to white, add dark text class
- Phase 2 components — apply corrected theme tokens (no structural changes, token swap only)

---

## Sync Guarantee

All checkbox IDs in hub data files must exactly match the IDs used in `src/data/chapters/*.json` inline collectible entries. The single `useCheckbox` hook with `spira-checks` localStorage key is the source of truth. No additional sync logic needed.
