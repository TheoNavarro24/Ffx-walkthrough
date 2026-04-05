# Phase 1: Foundation — Design Spec

**Date:** 2026-04-05
**Project:** Spira Guide (FFX HD Remaster Walkthrough)
**Scope:** Replace Vite template with a working FFX-styled app shell, ready for Phase 2 content work.

---

## Goal

By the end of Phase 1 the app should:
- Look like an FFX in-game menu (dark blue, teal borders, gold accents, Tuffy font)
- Have all 4 pages set up (Home, Chapter, Collectibles Hub, Settings) — empty but navigable
- Have the chapter drawer working (26 chapters grouped by 4 acts, slide-in/out)
- Have a collapsible TOC strip on the right
- Deploy automatically to GitHub Pages on every push to `main`
- Be installable as a PWA on iPad

> **PWA note:** The implementation plan defers full PWA to Phase 6, but the build-steps include `vite-plugin-pwa` in Phase 1's Vite config. We are pulling full PWA setup into Phase 1 to unblock deploy verification and avoid rework later. Phase 6 retains offline testing and iPad install UX verification.

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
11. Verify deploy

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
- **`server.fs.allow: ['..']`** — permits the Vite dev server to read files outside `spira-guide/`. Not needed at build time (Vite resolves aliases at bundle time), but required for `npm run dev`.
- **PWA config** (see Section 10)

---

## 3. Styling

### Font
Tuffy is available on Google Fonts. Load all 4 variants via `<link>` in `spira-guide/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Tuffy:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

### FFX Theme CSS (`src/styles/ffx-theme.css`)
CSS custom properties and reusable classes that make components look like FFX in-game menus.

**Color variables:**
```css
--color-bg-deep:    #0a0e27   /* page background */
--color-bg-panel:   #1a2444   /* panel/card background */
--color-border:     #4fc3f7   /* teal border */
--color-border-alt: #81d4fa   /* lighter teal */
--color-gold:       #ffd54f   /* headings, accents */
--color-text:       #ffffff
```

**Reusable classes:**
- `.ffx-panel` — translucent dark-blue gradient background, teal border, rounded corners
- `.ffx-header` — gold text, uppercase, letter-spaced
- `.ffx-button` — teal border, dark background, hover glow effect

### Animations (`src/styles/animations.css`)
Stub file with named keyframes — empty in Phase 1, filled in Phase 6:
```css
@keyframes pyrefly-dissolve {}
@keyframes pyrefly-burst {}
```

### Global CSS (`src/styles/index.css`)
- `@import "tailwindcss"`
- `@import "./ffx-theme.css"`
- `@import "./animations.css"`
- Global reset
- `font-family: 'Tuffy', sans-serif` on body
- `background-color: var(--color-bg-deep)` on body

> **Note:** Styles live at `src/styles/index.css` (not `src/index.css`). Update the import in `src/main.jsx` accordingly.

---

## 4. Routing (`src/main.jsx`)

Using `createHashRouter` (required for GitHub Pages — no server-side routing support).

`main.jsx` creates the router and renders `<RouterProvider>`. `App.jsx` is deleted — it is replaced by `AppShell` (the shared layout) and the route page components.

**Routes:**
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `LandingPage` | Home screen |
| `/chapter/:slug` | `ChapterPage` | 26 area pages |
| `/collectibles` | `CollectiblesHub` | Tracking hub |
| `/settings` | `SettingsPage` | Save slots, prefs |

All routes render inside `AppShell` as their layout wrapper.

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

**State owned by AppShell:**
- `drawerOpen` (boolean) — passed down to `Header` as `onHamburgerClick` and to `ChapterDrawer` as `isOpen`
- `tocOpen` (boolean) — controls TOC expanded/collapsed state

**Header (`src/components/Layout/Header.jsx`):**

Props received from AppShell:
- `onHamburgerClick` — toggles `drawerOpen`
- `isDrawerOpen` — used to set aria-expanded on the hamburger button

Content: hamburger button, "Spira Guide" branding, search bar stub (non-functional in Phase 1), settings icon link to `/settings`.

**Chapter Drawer:**
- Hidden by default
- Slides in from the left when `drawerOpen` is true
- A semi-transparent backdrop overlay sits behind the drawer; clicking the backdrop sets `drawerOpen` to false (close on outside tap)
- See Section 6 for drawer internals

**TOC strip (`src/components/Layout/TableOfContents.jsx`):**
- Narrow right column (~160px when expanded)
- Collapses to a small tab (~24px) when `tocOpen` is false
- Clicking the tab toggles `tocOpen`
- In Phase 1: stub content ("Contents") — wired with real section data in Phase 2

**Main content:**
- Fills remaining width between drawer and TOC
- Scrollable, renders the active route's page component via `<Outlet />`

---

## 6. Chapter Drawer (`src/components/Layout/ChapterDrawer.jsx`)

Slide-out panel showing all 26 chapters grouped by act.

**Structure:**
- **`ProgressDashboard` component** at top (see Section 8)
- **4 collapsible act groups:**
  - Act 1: Zanarkand → Luca (7 chapters)
  - Act 2: Mi'ihen Highroad → Bikanel Desert (9 chapters)
  - Act 3: Home → Via Purifico (4 chapters)
  - Act 4: Highbridge → Inside Sin (6 chapters)
- Each chapter row: name + progress bar (stub: 0%)
- Clicking a chapter navigates to `/chapter/:slug` and closes the drawer

---

## 7. Landing Page (`src/pages/LandingPage.jsx`)

Simple home screen.

**Elements:**
- "Spira Guide" title + subtitle (styled with `.ffx-header`)
- **Continue** button — navigates to last viewed chapter (stub: goes to `/chapter/zanarkand`)
- **Next Incomplete** button — navigates to first chapter with incomplete items (stub: same as Continue)
- Link to Collectibles Hub (`/collectibles`)
- Link to Settings (`/settings`)
- `ProgressDashboard` component (same as in drawer header)

---

## 8. Progress Dashboard (`src/components/Layout/ProgressDashboard.jsx`)

A small summary component used in two places: the drawer header and the landing page.

Phase 1 version shows hardcoded zeros:
```
Story: 0%   Primers: 0/26   Celestials: 0/7
```

Wired to real data in Phase 2 when the save system and checkboxes exist.

---

## 9. Chapter Index (`src/data/chapterIndex.js`)

A static JS file listing all 26 chapters. Powers the drawer, routing, and progress bars.

**Slug generation rule:** lowercase, spaces to hyphens, strip all punctuation (e.g. "S.S. Winno" → `ss-winno`, "Mt. Gagazet" → `mt-gagazet`).

**Shape of each entry:**
```js
{
  slug: 'besaid',
  name: 'Besaid',
  act: 1,
  mapImage: '/img/maps/regions/besaid/besaid.png'
}
```

**Canonical chapter list (26 chapters, in order):**

| # | Slug | Name | Act |
|---|------|------|-----|
| 1 | `zanarkand` | Zanarkand | 1 |
| 2 | `baaj-temple` | Baaj Temple | 1 |
| 3 | `besaid` | Besaid | 1 |
| 4 | `ss-liki` | S.S. Liki | 1 |
| 5 | `kilika` | Kilika | 1 |
| 6 | `ss-winno` | S.S. Winno | 1 |
| 7 | `luca` | Luca | 1 |
| 8 | `miihen-highroad` | Mi'ihen Highroad | 2 |
| 9 | `mushroom-rock-road` | Mushroom Rock Road | 2 |
| 10 | `djose` | Djose | 2 |
| 11 | `moonflow` | Moonflow | 2 |
| 12 | `guadosalam` | Guadosalam | 2 |
| 13 | `thunder-plains` | Thunder Plains | 2 |
| 14 | `macalania-woods` | Macalania Woods | 2 |
| 15 | `lake-macalania` | Lake Macalania | 2 |
| 16 | `bikanel-desert` | Bikanel Desert | 2 |
| 17 | `home` | Home | 3 |
| 18 | `airship` | Airship | 3 |
| 19 | `bevelle` | Bevelle | 3 |
| 20 | `via-purifico` | Via Purifico | 3 |
| 21 | `highbridge` | Highbridge | 4 |
| 22 | `calm-lands` | Calm Lands | 4 |
| 23 | `mt-gagazet` | Mt. Gagazet | 4 |
| 24 | `zanarkand-dome` | Zanarkand Dome | 4 |
| 25 | `airship-sin` | Airship (En Route to Sin) | 4 |
| 26 | `inside-sin` | Inside Sin | 4 |

> Source: `docs/source-data/walkthrough-index.json` (files 02–27). Optional areas are sub-sections of `airship-sin`, not separate chapters.

---

## 10. GitHub Actions + PWA

### GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger:** push to `main`
- **Steps:** checkout → setup Node → `npm ci` (working directory: `spira-guide`) → `npm run build` (working directory: `spira-guide`) → deploy `spira-guide/dist/` to GitHub Pages
- All `npm` steps must set `working-directory: spira-guide` since the app lives in a subdirectory

### PWA (`vite.config.js` — VitePWA options)

**Icon generation:** VitePWA does not auto-generate PNG icons from SVG. Manually create two PNG files from `public/favicon.svg` (the pre-existing Vite template icon) and place them at:
- `public/icons/icon-192.png` (192×192)
- `public/icons/icon-512.png` (512×512)

Any image editor or CLI tool (e.g. `rsvg-convert`, Inkscape, or an online converter) works.

**VitePWA config:**
```js
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Spira Guide',
    short_name: 'Spira Guide',
    description: 'FFX HD Remaster companion app',
    theme_color: '#0a0e27',
    background_color: '#0a0e27',
    display: 'standalone',
    orientation: 'landscape',
    icons: [
      { src: '/Ffx-walkthrough/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/Ffx-walkthrough/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
  }
})
```

---

## 11. Verification Checklist

After deploying to GitHub Pages, confirm:

- [ ] App loads at `https://theonavarro24.github.io/Ffx-walkthrough/`
- [ ] Landing page renders with FFX styling (dark background, teal borders, Tuffy font)
- [ ] Hamburger opens/closes chapter drawer; backdrop tap also closes it
- [ ] All 4 routes are reachable via the UI (home, a chapter, collectibles, settings)
- [ ] Navigating directly to a hash URL (e.g. `/#/chapter/besaid`) works — hash routing handles deep links on Pages
- [ ] TOC strip is visible and collapsible on the right
- [ ] PWA: on iPad Safari, "Add to Home Screen" option is available and app opens in standalone mode

---

## Files Created/Modified in Phase 1

```
spira-guide/
├── index.html                              # Add Google Fonts <link>, update <title>
├── vite.config.js                          # Full config: plugins, aliases, base, PWA
├── package.json                            # Add new dependencies
├── public/
│   ├── favicon.svg                         # Pre-existing; used as source for PWA icons
│   └── icons/
│       ├── icon-192.png                    # PWA icon (generated manually from favicon.svg)
│       └── icon-512.png                    # PWA icon (generated manually from favicon.svg)
└── src/
    ├── main.jsx                            # Replace with createHashRouter + RouterProvider
    ├── App.jsx                             # DELETE — replaced by AppShell + page components
    ├── App.css                             # DELETE — replaced by styles/ffx-theme.css
    ├── styles/
    │   ├── index.css                       # Global entry: imports Tailwind + theme + animations
    │   ├── ffx-theme.css                   # FFX color vars + reusable classes
    │   └── animations.css                  # Pyrefly keyframe stubs (empty)
    ├── data/
    │   └── chapterIndex.js                 # 26 chapters with slugs, acts, map image paths
    ├── components/
    │   └── Layout/
    │       ├── AppShell.jsx                # Outer frame: header, drawer, content, TOC
    │       ├── Header.jsx                  # Branding, hamburger, search stub, settings link
    │       ├── ChapterDrawer.jsx           # Slide-out chapter list with act groups + backdrop
    │       ├── TableOfContents.jsx         # Collapsible right strip (stub content)
    │       └── ProgressDashboard.jsx       # Stub summary: story %, primers, celestials
    └── pages/
        ├── LandingPage.jsx                 # Home screen with Continue + Next Incomplete
        ├── ChapterPage.jsx                 # Stub (Phase 2 fills this)
        ├── CollectiblesHub.jsx             # Stub (Phase 3 fills this)
        └── SettingsPage.jsx                # Stub (Phase 4 fills this)

.github/
└── workflows/
    └── deploy.yml                          # Auto-deploy to GitHub Pages on push to main
```

---

## Out of Scope for Phase 1

- Real walkthrough content (Phase 2)
- Working checkboxes / save system (Phase 2/4)
- Search functionality (Phase 5)
- Pyrefly animations (Phase 6)
- Offline testing and iPad PWA UX verification (Phase 6)
- Responsive testing beyond iPad landscape (Phase 6)
