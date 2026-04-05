# Phase 1: Foundation — Design Spec

**Date:** 2026-04-05
**Project:** Spira Guide (FFX HD Remaster Walkthrough)
**Scope:** Replace Vite template with a working FFX-styled app shell, ready for Phase 2 content work.

---

## Goal

By the end of Phase 1 the app should:
- Look like an FFX in-game menu (dark blue, teal borders, gold accents, Tuffy font)
- Have all 4 pages set up (Home, Chapter, Collectibles Hub, Settings) — empty but navigable
- Have the chapter drawer working (27 chapters grouped by 4 acts, slide-in/out)
- Have a collapsible TOC strip on the right
- Deploy automatically to GitHub Pages on every push to `main`
- Be installable as a PWA on iPad

---

## Build Sequence

Infrastructure first, then UI. Each step must compile before moving to the next.

1. Install dependencies
2. Configure Vite
3. Set up styling (font, theme CSS, Tailwind)
4. Set up routing
5. Build AppShell (shared outer frame)
6. Build ChapterDrawer
7. Build Landing page
8. Build progress dashboard (stub)
9. Create chapter index data
10. GitHub Actions deploy workflow + PWA

---

## 1. Dependencies

Install into `spira-guide/`:

```
react-router-dom
tailwindcss @tailwindcss/vite
vite-plugin-pwa
```

---

## 2. Vite Config (`spira-guide/vite.config.js`)

- **Plugins:** `@vitejs/plugin-react`, `@tailwindcss/vite`, `VitePWA`
- **Base path:** `/Ffx-walkthrough/` (required for GitHub Pages)
- **Path alias:** `@data` → `../docs/source-data/`
- **`server.fs.allow: ['..']`** — permits Vite dev server to read files outside `spira-guide/`
- **PWA config** (see Section 10)

---

## 3. Styling

### Font
Load Tuffy from Google Fonts via `<link>` in `spira-guide/index.html`:
- Weights: 400, 700
- Styles: normal, italic

### FFX Theme CSS (`src/styles/ffx-theme.css`)
CSS custom properties and reusable classes that make components look like FFX in-game menus.

**Color variables:**
```
--color-bg-deep:    #0a0e27   (page background)
--color-bg-panel:   #1a2444   (panel/card background)
--color-border:     #4fc3f7   (teal border)
--color-border-alt: #81d4fa   (lighter teal)
--color-gold:       #ffd54f   (headings, accents)
--color-text:       #ffffff
```

**Reusable classes:**
- `.ffx-panel` — translucent dark-blue gradient background, teal border, rounded corners
- `.ffx-header` — gold text, uppercase, letter-spaced
- `.ffx-button` — teal border, dark background, hover glow effect

### Animations (`src/styles/animations.css`)
Stub file with named keyframes for pyrefly effects — empty in Phase 1, filled in Phase 6:
- `@keyframes pyrefly-dissolve`
- `@keyframes pyrefly-burst`

### Global CSS (`src/index.css`)
- `@import "tailwindcss"`
- Imports `ffx-theme.css` and `animations.css`
- Global reset
- `font-family: 'Tuffy', sans-serif` on body
- Background: `--color-bg-deep`

---

## 4. Routing (`src/main.jsx`)

Using `createHashRouter` (required for GitHub Pages — no server-side routing).

**Routes:**
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `LandingPage` | Home screen |
| `/chapter/:slug` | `ChapterPage` | 27 area pages |
| `/collectibles` | `CollectiblesHub` | Tracking hub |
| `/settings` | `SettingsPage` | Save slots, prefs |

All routes render inside `AppShell`.

---

## 5. AppShell (`src/components/Layout/AppShell.jsx`)

The shared outer frame present on every page.

**Structure:**
```
┌─────────────────────────────────────────────────┐
│  Header (always visible)                        │
│  [☰] Spira Guide          [search bar]  [⚙]    │
├────────┬────────────────────────────────┬────────┤
│ Drawer │   Main content area (scroll)   │  TOC  │
│ (left, │                                │(right,│
│  slide)│                                │ slim) │
└────────┴────────────────────────────────┴────────┘
```

**Header:**
- Hamburger button (☰) — toggles chapter drawer
- "Spira Guide" branding
- Search bar (stub in Phase 1, wired in Phase 5)
- Settings icon linking to `/settings`

**Chapter Drawer:**
- Hidden by default
- Slides in from the left on hamburger tap
- Tap hamburger again (or outside the drawer) to close
- See Section 6 for drawer internals

**TOC strip:**
- Narrow right column (~160px when expanded)
- Collapsible — collapses to a small tab/icon when not needed
- Stub in Phase 1 (no content yet); wired in Phase 2 with `useScrollSpy`

**Main content:**
- Full-width scrollable area between drawer and TOC
- Renders the current route's page component

---

## 6. Chapter Drawer (`src/components/Layout/ChapterDrawer.jsx`)

Slide-out panel showing all 27 chapters grouped by act.

**Structure:**
- **Dashboard header** — stub in Phase 1: "Story: 0%, Primers: 0/26, Celestials: 0/7"
- **4 collapsible act groups:**
  - Act 1: Zanarkand → Luca (6 chapters)
  - Act 2: Mi'ihen → Macalania (8 chapters)
  - Act 3: Bikanel → Zanarkand Ruins (7 chapters)
  - Act 4: Airship → Inside Sin (6 chapters, including optional areas)
- Each chapter row: name + progress bar (stub: 0%)
- Clicking a chapter navigates to `/chapter/:slug` and closes the drawer

---

## 7. Landing Page (`src/pages/LandingPage.jsx`)

Simple home screen.

**Elements:**
- "Spira Guide" title + subtitle
- **Continue** button — navigates to last viewed chapter (stub: goes to `/chapter/zanarkand`)
- **Next Incomplete** button — navigates to first chapter with incomplete items (stub: same as above)
- Links to Collectibles Hub and Settings

Styled with `.ffx-panel` and `.ffx-header`.

---

## 8. Progress Dashboard (stub)

A small summary component used in the drawer header and on the landing page.

Phase 1 version shows hardcoded zeros:
```
Story: 0%   Primers: 0/26   Celestials: 0/7
```

Wired to real data in Phase 2 when the save system and checkboxes exist.

---

## 9. Chapter Index (`src/data/chapterIndex.js`)

A static JS file listing all 27 chapters. Powers the drawer, routing, and progress bars.

**Shape of each entry:**
```js
{
  slug: 'besaid',
  name: 'Besaid',
  act: 1,
  mapImage: '/img/maps/regions/besaid/besaid.png'
}
```

**27 chapters in order:**
Zanarkand, Baaj Temple, Salvage Ship, Besaid, Kilika, S.S. Winno, Luca, Mi'ihen Highroad, Mushroom Rock Road, Djose Highroad, Djose Temple, Moonflow, Guadosalam, Thunder Plains, Macalania Woods, Lake Macalania, Macalania Temple, Bikanel Desert, Home, Bevelle, Via Purifico, Calm Lands, Gagazet, Zanarkand Ruins, Inside Sin, Airship (+ optional areas)

---

## 10. GitHub Actions + PWA

### GitHub Actions (`.github/workflows/deploy.yml`)
- Trigger: push to `main`
- Steps: checkout → setup Node → `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages
- Uses `actions/deploy-pages`

### PWA (`vite.config.js` VitePWA options)
```js
{
  registerType: 'autoUpdate',
  manifest: {
    name: 'Spira Guide',
    short_name: 'Spira Guide',
    description: 'FFX HD Remaster companion app',
    theme_color: '#0a0e27',
    background_color: '#0a0e27',
    display: 'standalone',
    orientation: 'landscape',
    icons: [/* 192x192, 512x512 */]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
  }
}
```

PWA icons: generate from `public/favicon.svg` at 192×192 and 512×512.

---

## Files Created/Modified in Phase 1

```
spira-guide/
├── index.html                          # Add Google Fonts <link>, update title
├── vite.config.js                      # Full config (aliases, base, PWA, Tailwind)
├── package.json                        # Add new dependencies
├── public/
│   └── icons/
│       ├── icon-192.png                # PWA icon
│       └── icon-512.png                # PWA icon
└── src/
    ├── main.jsx                        # Replace with createHashRouter setup
    ├── App.jsx                         # Replace with RouterProvider
    ├── App.css                         # Delete (replaced by theme CSS)
    ├── index.css                       # Global styles entry point
    ├── styles/
    │   ├── ffx-theme.css               # FFX color vars + reusable classes
    │   └── animations.css              # Pyrefly keyframe stubs
    ├── data/
    │   └── chapterIndex.js             # 27 chapters with slugs, acts, map paths
    ├── components/
    │   └── Layout/
    │       ├── AppShell.jsx            # Outer frame (header + drawer + content + TOC)
    │       ├── Header.jsx              # Branding, hamburger, search stub, settings link
    │       ├── ChapterDrawer.jsx       # Slide-out chapter list with act groups
    │       └── TableOfContents.jsx     # Collapsible right strip (stub content)
    └── pages/
        ├── LandingPage.jsx             # Home screen
        ├── ChapterPage.jsx             # Stub (Phase 2 fills this)
        ├── CollectiblesHub.jsx         # Stub (Phase 3 fills this)
        └── SettingsPage.jsx            # Stub (Phase 4 fills this)

.github/
└── workflows/
    └── deploy.yml                      # Auto-deploy to GitHub Pages on push to main
```

---

## Out of Scope for Phase 1

- Real walkthrough content (Phase 2)
- Working checkboxes / save system (Phase 2/4)
- Search functionality (Phase 5)
- Pyrefly animations (Phase 6)
- Responsive testing beyond iPad landscape (Phase 6)
