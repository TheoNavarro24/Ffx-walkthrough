# Spira Guide - FFX HD Remaster Walkthrough

## Project Overview

A personal, full-featured interactive walkthrough for Final Fantasy X HD Remaster, built with React + Vite. Area-centric design: each of 27 chapters is a scrollable page with walkthrough, bosses, collectibles, and checkbox tracking — styled to match FFX's in-game menu aesthetic.

**Target device**: iPad Pro 11" M1 in landscape
**Audience**: Veteran player — general strategy, not hand-holding
**Deployment**: GitHub Pages with auto-deploy, installable as PWA

## Repository Structure

```
Ffx-walkthrough/
├── CLAUDE.md              # This file - project conventions and context
├── docs/                  # Research documentation (read-only reference)
│   ├── implementation-plan.md    # Full implementation plan with all design decisions
│   ├── research-*.md      # Game data research notes
│   └── source-data/       # Structured JSON game data (11 files, ~894 KB)
│       ├── walkthrough-index.json    # 27-chapter story progression
│       ├── monsters.json             # 274 monsters + 72 bosses with full stats
│       ├── characters.json           # 7 party members + Seymour base stats
│       ├── items.json                # 200+ item descriptions
│       ├── celestials.json           # Celestial weapon/crest/sigil locations
│       ├── primers.json              # 26 Al Bhed Primers
│       ├── arena-tracker.json        # Monster Arena capture tracking (13 areas)
│       ├── monster_arena.json        # Arena creature config
│       ├── locations-poptracker.json # Location data with items/encounters
│       ├── rewards.json              # Drop/reward tables
│       ├── sphere-grid-nodes.json    # 1000+ sphere grid nodes
│       ├── sphere-grid-abilities.json
│       └── sphere-grid-characters.json
└── spira-guide/           # React + Vite web application
    ├── public/img/        # Game image assets (352 files)
    │   ├── bosses/        # Boss images (43 story + 28 arena)
    │   ├── fiends/        # 110 capturable enemy sprites
    │   ├── maps/          # World map, 21 region folders, 5 cloister maps
    │   ├── party/         # Characters, aeons, weapons, armor
    │   ├── items/         # Item icons (hd/ and sd/)
    │   └── spheres/       # Sphere Grid icons
    └── src/               # React source (app entry point)
        ├── components/
        │   ├── Layout/
        │   │   ├── AppShell.jsx         # Root layout: header + drawer + main + QRP + pyrefly
        │   │   ├── Header.jsx           # Pastel header: hamburger, logo, search, settings, QRP toggle
        │   │   ├── ChapterDrawer.jsx    # Slide-out chapter nav with acts + progress
        │   │   ├── TableOfContents.jsx  # Sticky right TOC with scroll-spy
        │   │   └── ProgressDashboard.jsx # Story %, primers, celestials counters
        │   ├── Search/
        │   │   └── SearchDropdown.jsx   # Instant search with type-labeled results
        │   ├── QuickRef/
        │   │   ├── QuickRefPanel.jsx    # Slide-in right panel with 3 tabs
        │   │   ├── ElementalChart.jsx   # 9×6 elemental weakness grid
        │   │   ├── StatusEffects.jsx    # 14 status effect descriptions
        │   │   └── KeyItems.jsx         # 18 key item descriptions
        │   ├── Collectibles/           # Hub components (TabBar, trackers, etc.)
        │   └── PyreflyTransition.jsx    # Canvas overlay: wisps + blooms + route-change boost
        ├── context/
        │   ├── SaveContext.jsx   # SaveContextProvider, useSaveSlot(), migrateLegacyChecks()
        │   └── TocContext.jsx    # TOC scroll-spy context
        ├── data/
        │   ├── chapterIndex.js          # 26 chapters with slugs, names, acts
        │   ├── chapterData.js           # JSON imports for all chapter data
        │   ├── searchIndex.js           # Flat searchable records (chapters, bosses, collectibles)
        │   └── collectibles/            # Primers, celestials, jecht spheres, aeons, cloisters
        ├── hooks/
        │   ├── useCheckbox.js    # Slot-scoped checkbox state (key: spira-checks:{slotId})
        │   ├── usePyrefly.js     # Pyrefly toggle (key: spira-pyrefly)
        │   ├── usePyreflyBurst.js # DOM burst animation (respects pyrefly pref)
        │   ├── useSearch.js      # Substring filter + type-priority sort over searchIndex
        │   └── useNavigation.js  # useLastVisited, useNextIncomplete
        └── pages/
            ├── LandingPage.jsx   # Hero cover art bg, corner card with progress + nav
            ├── ChapterPage.jsx   # Per-chapter walkthrough page
            ├── CollectiblesPage.jsx # Collectibles Hub with tabbed trackers
            └── SettingsPage.jsx  # Save Slots + Data (export/import) + Display panels
```

## Development Commands

All commands run from `spira-guide/` directory:

```bash
cd spira-guide
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Production build to dist/
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework**: React 19 with JSX (no TypeScript)
- **Build**: Vite 8
- **Styling**: Tailwind CSS for utilities + custom FFX theme CSS for game-menu styling
- **Routing**: React Router
- **State**: React built-in (useState/useReducer/useContext) — no external state library
- **Linting**: ESLint 9 (flat config) with React Hooks + React Refresh plugins
- **Deployment**: GitHub Pages with GitHub Actions auto-deploy
- **PWA**: Service worker for offline support, installable to iPad home screen

## Design Decisions (Finalized)

### Visual Style
- **Match FFX in-game menus**: Diagonal gradient panels matching the actual in-game text box colour (top-left lighter, bottom-right darker), bright lavender border, gold accents
- **FFX-style font**: Highwind (display/headings), Tuffy (body). **Highwind must be ≥24px to be readable** — never use it below that size
- **Colors (current, finalized)**:
  - Panel background: `linear-gradient(135deg, #5450a0 0%, #444080 45%, #322e68 100%)`
  - Panel border: `#8888c0` (bright lavender, clearly visible against panel)
  - Border alt (dividers, secondary text): `#9898c8`
  - Gold: `#FFC10F`
  - Body text: `#ffffff`
  - Deep background: `#2e285d`
- **Header**: Compact (52px), FFX logo image as left wordmark (`public/img/ffx-logo.webp`), pastel left-to-right gradient (`#ffffff → #d6eef8 → #f8dde8 → #fad4bc → #fdecc8`) matching the character art colours in the logo
- **Images everywhere**: Maps, boss portraits, character icons, SD item sprites inline

### Layout
- **Collapsible drawer**: Slide-out chapter list triggered by hamburger button
- **Sticky right TOC**: Section navigation that highlights current scroll position
- **Global search**: Prominent search bar in header with instant dropdown results
- **Prev/Next cards**: Bottom chapter navigation with thumbnail, name, and progress bar

### Area Pages (Core Experience)
- Each of 27 chapters is one long scrollable page containing ALL info for that area
- Sections: Walkthrough/Items, Boss Encounters, Collectibles
- Items grouped by sub-location (collapsible, state persisted)
- Walkthrough style: Brief narration with bullet lists for items
- Boss cards: Expandable (compact stats → full strategy + steals/drops)
- Missable alerts: Summary at page top AND inline warnings (red banners)
- O'aka donation reminders with running total at meeting points
- Party composition indicators with character portrait icons
- Inline Sphere Grid milestone tips
- Cloister maps with step-by-step puzzle solutions at relevant chapters
- Post-airship optional areas (Remiem, Baaj, Omega, etc.) are sub-sections of the Airship chapter

### Tracking & Saves
- Checkboxes on everything (items, bosses, collectibles)
- Checked items: strikethrough + dimmed
- "Show unchecked only" toggle button
- Unlimited named save slots with localStorage
- Export/import save as JSON
- Checkboxes sync between area pages and Collectibles Hub (single source of truth)
- Collapse state persisted across sessions

### Chapter Drawer
- 4 collapsible story acts: Act 1 (Zanarkand–Luca), Act 2 (Mi'ihen–Macalania), Act 3 (Bikanel–Zanarkand Ruins), Act 4 (Airship–Inside Sin)
- Progress bar per chapter
- Dashboard in drawer header: overall story %, primers, celestials count

### Standalone Pages
- **Landing page**: Hero cover art background (`image_0000_00.jpeg`), corner card (top-left) with title, progress dashboard, Continue/Next Incomplete/Collectibles/Settings buttons, dark overlay for readability
- **Collectibles Hub**: Celestial weapons (visual tracker), Al Bhed Primers, Jecht Spheres, Cloister Checklist, Aeon Tracker
- **Settings**: Save slot management, effect toggles, display preferences

### Quick Reference Panel
- Slide-in panel from right edge, toggled via book icon in Header
- 3 tabs using `TabBar` component: Elements (elemental weakness grid), Status (14 status effects), Key Items (18 key consumables)
- All data hardcoded (no JSON source for these categories)
- Fixed position with `zIndex: 100`, slides via `translateX` transform

### Global Search
- `searchIndex.js` builds a flat array of records from chapters, bosses, primers, jecht spheres, celestials at import time
- `useSearch` hook: substring match on title + subtitle, sorted by exact match first then type priority (chapter > boss > primer > jecht-sphere > celestial), capped at 12 results
- `SearchDropdown` component: controlled input in Header, floating results panel with type labels, escape-to-close, click-outside-to-close

### Effects
- Pyrefly canvas overlay (`PyreflyTransition`): 30 wisps + 8 blooms, faint (alpha 0.2) at rest, boost to full alpha on route changes (~450ms ramp), respects pyrefly toggle from Settings
- Pyrefly burst on chapter/collectible completion (DOM-based, separate from canvas)
- No background particles, no audio

### Content
- Walkthrough prose sourced from BradyGames Official Strategy Guide (`docs/official-guide/brady-guide.xml`, DAISY XML) — grep by area heading for each chapter
- Guide screenshots extracted from `Official Strategy Guide/*.epub` to `spira-guide/public/img/guide/` as `image_NNNN_NN.jpeg` (NNNN = guide page number)
- Boss strategies: general level (explains mechanics), not just stat dumps
- Blitzball: minimal — only Wakka's overdrives and Jupiter Sigil
- Endgame: optional bosses listed, no farming/stat-maxing guides

## Coding Conventions

- **Language**: JavaScript with JSX (`.jsx` files), not TypeScript
- **Components**: Functional components with hooks only (no class components)
- **File naming**: Components use PascalCase (`BossCard.jsx`), utilities use camelCase (`formatHp.js`)
- **CSS**: Tailwind utilities for layout/spacing + custom CSS classes for FFX-themed components
- **Exports**: Named exports preferred; default export for page-level components
- **Data imports**: Import JSON from `docs/source-data/` using relative paths or Vite aliases

## Known Pitfalls & Lessons Learned

- **CSS reset outside `@layer` breaks all Tailwind spacing**: A `* { margin: 0; padding: 0 }` block placed outside any `@layer` directive will silently override all Tailwind padding/margin utilities (non-layered rules win over `@layer utilities`). Tailwind v4's preflight already handles this inside `@layer base` — never add a duplicate reset block.
- **Highwind font readability**: The Highwind display font becomes hard to read below ~24px. Minimum sizes: SubLocation headers `text-3xl` (30px), section headings `2rem`, chapter titles `text-3xl`. Always pair with `tracking-widest` or `letter-spacing: 0.18em+`.
- **AppShell must use `h-screen` not `min-h-screen`**: The outer flex container needs `h-screen` so the `<main>` element's `overflow-auto` contains all scrolling. With `min-h-screen`, the document itself becomes scrollable and the header scrolls off screen. Always scroll via `document.querySelector('main').scrollTop`, not `window.scrollTo`.
- **Image paths need `assetUrl()`**: Never use bare `/img/...` paths — they 404 on GitHub Pages due to the `/Ffx-walkthrough/` base path.
- **`useLocalStorage` key changes require a `useEffect`**: `useState` initialiser runs once at mount — if the key changes (e.g. slot switch), the value goes stale. `useCheckbox` handles this with `useEffect([key])` that re-reads localStorage when the active slot changes. Don't use `useLocalStorage` directly when the key is dynamic.
- **`useSaveSlot()` has a null-safe fallback**: Returns a default `slot-default` object when called outside `SaveContextProvider` (e.g. in tests that don't wrap). Production always has the provider; the fallback prevents crashes in component tests.
- **Test localStorage keys after Phase 4**: Any test that pre-populates `spira-checks` must now use `spira-checks:slot-default` (the scoped key). The old flat key no longer exists after migration.
- **SearchDropdown needs `MemoryRouter` in tests**: Since it renders `<Link>` elements, any test must wrap it in a router provider.
- **PyreflyTransition uses `useLocation`**: Cannot be rendered outside a router. AppShell already provides the router context.
- **QuickRefPanel data is hardcoded**: ElementalChart, StatusEffects, and KeyItems contain no imports from source JSON — the game data files don't have category/status fields to drive these. Update the component files directly if data changes.
- **searchIndex.js imports all chapter data at module load**: This is intentional for instant search but means the full chapter dataset is bundled. The 700KB bundle size is acceptable for a PWA that precaches everything.

## Key Data Notes

- Boss HP data in `monsters.json` is game-mined and authoritative (from andreasSchauer/ffx-lookup-tool)
- The `walkthrough-index.json` defines 27 chapters from Zanarkand through Inside Sin
- Research docs in `docs/research-*.md` contain corrections to common guide errors — consult these when writing walkthrough content
- Missable items are documented in `research-collectibles.md` (4 Al Bhed Primers at Home/Bevelle, Wantz encounter, etc.)

## Image Asset Paths

Images live in `spira-guide/public/img/`. Always reference them via `assetUrl()` from `src/utils/assetUrl.js` — never with a bare `/img/...` path, as Vite's base path (`/Ffx-walkthrough/`) means absolute paths 404 on GitHub Pages.

```js
import { assetUrl } from '../utils/assetUrl'
// assetUrl('img/bosses/valefor.png') → '/Ffx-walkthrough/img/bosses/valefor.png'
```

File locations (all filenames lowercase):
- Boss: `img/bosses/{slug}.png`
- Fiend: `img/fiends/{name}.png`
- Character: `img/party/characters/{name}.png` (lowercase, e.g. `tidus.png`)
- Region map: `img/maps/regions/{region}/{area}.png`
- Cloister map: `img/maps/cloisters/{name}.png`
- World map: `img/maps/Spira.png`
- Item icon (SD): `img/items/sd/{name}.png`
- Aeon: `img/party/aeons/{name}.png`
- Guide screenshot: `img/guide/{image_NNNN_NN.jpeg}` (BradyGames EPUB page scans, FFX walkthrough pages 23–74; `guideImages` field lives on sub-location objects, not chapter root)
