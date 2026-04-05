# Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite template with a working FFX-styled app shell — dark blue menus, Tuffy font, chapter drawer, all 4 routes navigable, auto-deploying to GitHub Pages as a PWA.

**Architecture:** `createHashRouter` handles all routing (required for GitHub Pages). `AppShell` is the shared layout wrapper rendered by every route — it owns `drawerOpen` and `tocOpen` state and passes handlers down to `Header`, `ChapterDrawer`, and `TableOfContents`. All styling flows from `src/styles/ffx-theme.css` CSS variables; Tailwind handles spacing and layout utilities.

**Tech Stack:** React 19, Vite 8, React Router DOM, Tailwind CSS v4 (`@tailwindcss/vite`), vite-plugin-pwa, Vitest + @testing-library/react for tests.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `spira-guide/index.html` | Modify | Add Google Fonts link, update `<title>` |
| `spira-guide/vite.config.js` | Modify | Plugins, base path, path alias, PWA, fs.allow |
| `spira-guide/package.json` | Modify | Add new dependencies |
| `spira-guide/src/main.jsx` | Rewrite | Create hash router, render RouterProvider |
| `spira-guide/src/App.jsx` | Delete | Replaced by AppShell + pages |
| `spira-guide/src/App.css` | Delete | Replaced by ffx-theme.css |
| `spira-guide/src/styles/index.css` | Create | Global entry: Tailwind + theme + animations imports |
| `spira-guide/src/styles/ffx-theme.css` | Create | FFX color vars + reusable classes |
| `spira-guide/src/styles/animations.css` | Create | Pyrefly keyframe stubs |
| `spira-guide/src/data/chapterIndex.js` | Create | 26 chapters with slugs, acts, map image paths |
| `spira-guide/src/components/Layout/AppShell.jsx` | Create | Outer frame: header, drawer, content, TOC |
| `spira-guide/src/components/Layout/Header.jsx` | Create | Branding, hamburger, search stub, settings link |
| `spira-guide/src/components/Layout/ChapterDrawer.jsx` | Create | Slide-out chapter list with act groups + backdrop |
| `spira-guide/src/components/Layout/TableOfContents.jsx` | Create | Collapsible right strip (stub) |
| `spira-guide/src/components/Layout/ProgressDashboard.jsx` | Create | Stub summary: story %, primers, celestials |
| `spira-guide/src/pages/LandingPage.jsx` | Create | Home screen with Continue + Next Incomplete |
| `spira-guide/src/pages/ChapterPage.jsx` | Create | Stub page showing chapter name from slug |
| `spira-guide/src/pages/CollectiblesHub.jsx` | Create | Stub page |
| `spira-guide/src/pages/SettingsPage.jsx` | Create | Stub page |
| `spira-guide/public/icons/icon-192.png` | Create | PWA icon (manually generated) |
| `spira-guide/public/icons/icon-512.png` | Create | PWA icon (manually generated) |
| `.github/workflows/deploy.yml` | Create | Auto-deploy to GitHub Pages on push to main |

---

## Task 1: Install dependencies and set up test runner

**Files:**
- Modify: `spira-guide/package.json`

- [ ] **Step 1: Install production dependencies**

```bash
cd spira-guide
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite vite-plugin-pwa
```

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Add test script to package.json**

In `spira-guide/package.json`, add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 4: Verify dependencies installed**

```bash
npm list react-router-dom tailwindcss vite-plugin-pwa vitest
```
Expected: all four listed without errors.

---

## Task 2: Configure Vite

**Files:**
- Modify: `spira-guide/vite.config.js`

- [ ] **Step 1: Rewrite vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  base: '/Ffx-walkthrough/',
  plugins: [
    react(),
    tailwindcss(),
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
          {
            src: '/Ffx-walkthrough/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/Ffx-walkthrough/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@data': resolve(__dirname, '../docs/source-data'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    globals: true,
  },
})
```

- [ ] **Step 2: Create test setup file**

Create `spira-guide/src/test-setup.js`:
```js
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Verify Vite starts**

```bash
npm run dev
```
Expected: dev server starts at `http://localhost:5173` (or similar) with no errors.

- [ ] **Step 4: Commit**

```bash
cd ..
git add spira-guide/package.json spira-guide/package-lock.json spira-guide/vite.config.js spira-guide/src/test-setup.js
git commit -m "feat: install deps and configure vite for phase 1"
```

---

## Task 3: Set up styling

**Files:**
- Modify: `spira-guide/index.html`
- Create: `spira-guide/src/styles/ffx-theme.css`
- Create: `spira-guide/src/styles/animations.css`
- Create: `spira-guide/src/styles/index.css`
- Delete: `spira-guide/src/App.css`

- [ ] **Step 1: Add Google Fonts to index.html**

In `spira-guide/index.html`, replace the `<title>` and add the font link in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tuffy:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
<title>Spira Guide</title>
```

- [ ] **Step 2: Create ffx-theme.css**

Create `spira-guide/src/styles/ffx-theme.css`:
```css
:root {
  --color-bg-deep: #0a0e27;
  --color-bg-panel: #1a2444;
  --color-border: #4fc3f7;
  --color-border-alt: #81d4fa;
  --color-gold: #ffd54f;
  --color-text: #ffffff;
}

.ffx-panel {
  background: linear-gradient(135deg, rgba(26, 36, 68, 0.92), rgba(10, 14, 39, 0.95));
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
}

.ffx-header {
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.ffx-button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: box-shadow 0.2s;
}

.ffx-button:hover {
  box-shadow: 0 0 8px var(--color-border);
}
```

- [ ] **Step 3: Create animations.css**

Create `spira-guide/src/styles/animations.css`:
```css
/* Phase 6: fill in these keyframes */
@keyframes pyrefly-dissolve {}
@keyframes pyrefly-burst {}
```

- [ ] **Step 4: Create index.css**

Create `spira-guide/src/styles/index.css`:
```css
@import "tailwindcss";
@import "./ffx-theme.css";
@import "./animations.css";

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Tuffy', sans-serif;
  background-color: var(--color-bg-deep);
  color: var(--color-text);
  min-height: 100vh;
}
```

- [ ] **Step 5: Delete App.css**

```bash
rm spira-guide/src/App.css
```

- [ ] **Step 6: Verify styles load**

```bash
cd spira-guide && npm run dev
```
Open the browser — page should now have a dark blue background and Tuffy font. No console errors.

- [ ] **Step 7: Commit**

```bash
cd ..
git add spira-guide/index.html spira-guide/src/styles/ && git rm spira-guide/src/App.css
git commit -m "feat: add FFX theme CSS, Tuffy font, and Tailwind setup"
```

---

## Task 4: Create chapter index data

**Files:**
- Create: `spira-guide/src/data/chapterIndex.js`
- Create: `spira-guide/src/data/chapterIndex.test.js`

- [ ] **Step 1: Write the failing test**

Create `spira-guide/src/data/chapterIndex.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { chapters, getChapterBySlug } from './chapterIndex'

describe('chapterIndex', () => {
  it('has exactly 26 chapters', () => {
    expect(chapters).toHaveLength(26)
  })

  it('every chapter has required fields', () => {
    chapters.forEach((ch) => {
      expect(ch).toHaveProperty('slug')
      expect(ch).toHaveProperty('name')
      expect(ch).toHaveProperty('act')
      expect(ch).toHaveProperty('mapImage')
      expect(typeof ch.slug).toBe('string')
      expect(typeof ch.name).toBe('string')
      expect([1, 2, 3, 4]).toContain(ch.act)
      expect(typeof ch.mapImage).toBe('string')
    })
  })

  it('all slugs are unique', () => {
    const slugs = chapters.map((ch) => ch.slug)
    expect(new Set(slugs).size).toBe(26)
  })

  it('getChapterBySlug returns the correct chapter', () => {
    const ch = getChapterBySlug('besaid')
    expect(ch.name).toBe('Besaid')
    expect(ch.act).toBe(1)
  })

  it('getChapterBySlug returns undefined for unknown slug', () => {
    expect(getChapterBySlug('not-a-place')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd spira-guide && npm run test:run -- src/data/chapterIndex.test.js
```
Expected: FAIL — "Cannot find module './chapterIndex'"

- [ ] **Step 3: Create chapterIndex.js**

Create `spira-guide/src/data/chapterIndex.js`:
```js
export const chapters = [
  { slug: 'zanarkand',          name: 'Zanarkand',                    act: 1, mapImage: '/img/maps/regions/zanarkand/zanarkand.png' },
  { slug: 'baaj-temple',        name: 'Baaj Temple',                  act: 1, mapImage: '/img/maps/regions/baaj-temple/baaj-temple.png' },
  { slug: 'besaid',             name: 'Besaid',                       act: 1, mapImage: '/img/maps/regions/besaid/besaid.png' },
  { slug: 'ss-liki',            name: 'S.S. Liki',                    act: 1, mapImage: '/img/maps/regions/ss-liki/ss-liki.png' },
  { slug: 'kilika',             name: 'Kilika',                       act: 1, mapImage: '/img/maps/regions/kilika/kilika.png' },
  { slug: 'ss-winno',           name: 'S.S. Winno',                   act: 1, mapImage: '/img/maps/regions/ss-winno/ss-winno.png' },
  { slug: 'luca',               name: 'Luca',                         act: 1, mapImage: '/img/maps/regions/luca/luca.png' },
  { slug: 'miihen-highroad',    name: "Mi'ihen Highroad",             act: 2, mapImage: '/img/maps/regions/miihen-highroad/miihen-highroad.png' },
  { slug: 'mushroom-rock-road', name: 'Mushroom Rock Road',           act: 2, mapImage: '/img/maps/regions/mushroom-rock-road/mushroom-rock-road.png' },
  { slug: 'djose',              name: 'Djose',                        act: 2, mapImage: '/img/maps/regions/djose/djose.png' },
  { slug: 'moonflow',           name: 'Moonflow',                     act: 2, mapImage: '/img/maps/regions/moonflow/moonflow.png' },
  { slug: 'guadosalam',         name: 'Guadosalam',                   act: 2, mapImage: '/img/maps/regions/guadosalam/guadosalam.png' },
  { slug: 'thunder-plains',     name: 'Thunder Plains',               act: 2, mapImage: '/img/maps/regions/thunder-plains/thunder-plains.png' },
  { slug: 'macalania-woods',    name: 'Macalania Woods',              act: 2, mapImage: '/img/maps/regions/macalania-woods/macalania-woods.png' },
  { slug: 'lake-macalania',     name: 'Lake Macalania',               act: 2, mapImage: '/img/maps/regions/lake-macalania/lake-macalania.png' },
  { slug: 'bikanel-desert',     name: 'Bikanel Desert',               act: 2, mapImage: '/img/maps/regions/bikanel-desert/bikanel-desert.png' },
  { slug: 'home',               name: 'Home',                         act: 3, mapImage: '/img/maps/regions/home/home.png' },
  { slug: 'airship',            name: 'Airship',                      act: 3, mapImage: '/img/maps/regions/airship/airship.png' },
  { slug: 'bevelle',            name: 'Bevelle',                      act: 3, mapImage: '/img/maps/regions/bevelle/bevelle.png' },
  { slug: 'via-purifico',       name: 'Via Purifico',                 act: 3, mapImage: '/img/maps/regions/via-purifico/via-purifico.png' },
  { slug: 'highbridge',         name: 'Highbridge',                   act: 4, mapImage: '/img/maps/regions/highbridge/highbridge.png' },
  { slug: 'calm-lands',         name: 'Calm Lands',                   act: 4, mapImage: '/img/maps/regions/calm-lands/calm-lands.png' },
  { slug: 'mt-gagazet',         name: 'Mt. Gagazet',                  act: 4, mapImage: '/img/maps/regions/mt-gagazet/mt-gagazet.png' },
  { slug: 'zanarkand-dome',     name: 'Zanarkand Dome',               act: 4, mapImage: '/img/maps/regions/zanarkand-dome/zanarkand-dome.png' },
  { slug: 'airship-sin',        name: 'Airship (En Route to Sin)',     act: 4, mapImage: '/img/maps/regions/airship-sin/airship-sin.png' },
  { slug: 'inside-sin',         name: 'Inside Sin',                   act: 4, mapImage: '/img/maps/regions/inside-sin/inside-sin.png' },
]

export function getChapterBySlug(slug) {
  return chapters.find((ch) => ch.slug === slug)
}

export const ACT_NAMES = {
  1: 'Act 1: Zanarkand → Luca',
  2: "Act 2: Mi'ihen → Bikanel Desert",
  3: 'Act 3: Home → Via Purifico',
  4: 'Act 4: Highbridge → Inside Sin',
}

export function getChaptersByAct(act) {
  return chapters.filter((ch) => ch.act === act)
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run -- src/data/chapterIndex.test.js
```
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
cd ..
git add spira-guide/src/data/
git commit -m "feat: add chapter index data with 26 chapters"
```

---

## Task 5: Set up routing and delete App.jsx

**Files:**
- Rewrite: `spira-guide/src/main.jsx`
- Delete: `spira-guide/src/App.jsx`
- Create: `spira-guide/src/pages/LandingPage.jsx` (stub)
- Create: `spira-guide/src/pages/ChapterPage.jsx` (stub)
- Create: `spira-guide/src/pages/CollectiblesHub.jsx` (stub)
- Create: `spira-guide/src/pages/SettingsPage.jsx` (stub)
- Create: `spira-guide/src/components/Layout/AppShell.jsx` (stub — real content in Task 6)

- [ ] **Step 1: Create stub AppShell**

Create `spira-guide/src/components/Layout/AppShell.jsx`:
```jsx
import { Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div style={{ padding: '1rem' }}>
      <Outlet />
    </div>
  )
}
```

- [ ] **Step 2: Create stub page components**

Create `spira-guide/src/pages/LandingPage.jsx`:
```jsx
export default function LandingPage() {
  return <h1 className="ffx-header">Spira Guide</h1>
}
```

Create `spira-guide/src/pages/ChapterPage.jsx`:
```jsx
import { useParams } from 'react-router-dom'

export default function ChapterPage() {
  const { slug } = useParams()
  return <h1 className="ffx-header">{slug}</h1>
}
```

Create `spira-guide/src/pages/CollectiblesHub.jsx`:
```jsx
export default function CollectiblesHub() {
  return <h1 className="ffx-header">Collectibles Hub</h1>
}
```

Create `spira-guide/src/pages/SettingsPage.jsx`:
```jsx
export default function SettingsPage() {
  return <h1 className="ffx-header">Settings</h1>
}
```

- [ ] **Step 3: Rewrite main.jsx**

Rewrite `spira-guide/src/main.jsx`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import AppShell from './components/Layout/AppShell'
import LandingPage from './pages/LandingPage'
import ChapterPage from './pages/ChapterPage'
import CollectiblesHub from './pages/CollectiblesHub'
import SettingsPage from './pages/SettingsPage'

const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'chapter/:slug', element: <ChapterPage /> },
      { path: 'collectibles', element: <CollectiblesHub /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

- [ ] **Step 4: Delete App.jsx**

```bash
rm spira-guide/src/App.jsx
```

- [ ] **Step 5: Verify routing works**

```bash
cd spira-guide && npm run dev
```
- Open `http://localhost:5173` — should show "Spira Guide" heading on dark background
- Navigate to `http://localhost:5173/#/chapter/besaid` — should show "besaid"
- Navigate to `http://localhost:5173/#/collectibles` — should show "Collectibles Hub"
- Navigate to `http://localhost:5173/#/settings` — should show "Settings"

- [ ] **Step 6: Commit**

```bash
cd ..
git rm spira-guide/src/App.jsx
git add spira-guide/src/main.jsx spira-guide/src/pages/ spira-guide/src/components/
git commit -m "feat: set up hash router with 4 routes and stub pages"
```

---

## Task 6: Build AppShell with Header

**Files:**
- Rewrite: `spira-guide/src/components/Layout/AppShell.jsx`
- Create: `spira-guide/src/components/Layout/Header.jsx`
- Create: `spira-guide/src/components/Layout/AppShell.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `spira-guide/src/components/Layout/AppShell.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppShell from './AppShell'

function renderAppShell() {
  return render(
    <MemoryRouter>
      <AppShell />
    </MemoryRouter>
  )
}

describe('AppShell', () => {
  it('renders the header', () => {
    renderAppShell()
    expect(screen.getByText('Spira Guide')).toBeInTheDocument()
  })

  it('chapter drawer is hidden by default', () => {
    renderAppShell()
    expect(screen.queryByRole('navigation', { name: /chapters/i })).not.toBeVisible()
  })

  it('hamburger button opens the chapter drawer', () => {
    renderAppShell()
    fireEvent.click(screen.getByRole('button', { name: /open chapter list/i }))
    expect(screen.getByRole('navigation', { name: /chapters/i })).toBeVisible()
  })

  it('clicking the backdrop closes the chapter drawer', () => {
    renderAppShell()
    fireEvent.click(screen.getByRole('button', { name: /open chapter list/i }))
    fireEvent.click(screen.getByTestId('drawer-backdrop'))
    expect(screen.queryByRole('navigation', { name: /chapters/i })).not.toBeVisible()
  })

  it('TOC is collapsed by default and can be expanded', () => {
    renderAppShell()
    const tocToggle = screen.getByRole('button', { name: /contents/i })
    expect(screen.getByTestId('toc-panel')).not.toHaveClass('toc-expanded')
    fireEvent.click(tocToggle)
    expect(screen.getByTestId('toc-panel')).toHaveClass('toc-expanded')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd spira-guide && npm run test:run -- src/components/Layout/AppShell.test.jsx
```
Expected: FAIL — AppShell stub doesn't have drawer or TOC yet.

- [ ] **Step 3: Create Header.jsx**

Create `spira-guide/src/components/Layout/Header.jsx`:
```jsx
import { Link } from 'react-router-dom'

export default function Header({ onHamburgerClick, isDrawerOpen }) {
  return (
    <header className="ffx-panel flex items-center gap-4 px-4 py-3">
      <button
        className="ffx-button text-xl w-10 h-10 flex items-center justify-center"
        onClick={onHamburgerClick}
        aria-label={isDrawerOpen ? 'Close chapter list' : 'Open chapter list'}
        aria-expanded={isDrawerOpen}
      >
        ☰
      </button>
      <span className="ffx-header text-lg flex-1">Spira Guide</span>
      <input
        className="ffx-button px-3 py-1 w-48"
        type="search"
        placeholder="Search…"
        aria-label="Search"
        disabled
      />
      <Link to="/settings" className="ffx-button w-10 h-10 flex items-center justify-center" aria-label="Settings">
        ⚙
      </Link>
    </header>
  )
}
```

- [ ] **Step 4: Create ChapterDrawer stub**

Create `spira-guide/src/components/Layout/ChapterDrawer.jsx` (stub — full content in Task 7):
```jsx
export default function ChapterDrawer({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          data-testid="drawer-backdrop"
          className="fixed inset-0 bg-black/50 z-10"
          onClick={onClose}
        />
      )}
      <nav
        aria-label="Chapters"
        role="navigation"
        aria-hidden={!isOpen}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        className="fixed top-0 left-0 h-full w-72 ffx-panel z-20 p-4"
      >
        <p>Chapter list coming in Task 7</p>
      </nav>
    </>
  )
}
```

- [ ] **Step 5: Create TableOfContents stub**

Create `spira-guide/src/components/Layout/TableOfContents.jsx`:
```jsx
export default function TableOfContents({ isOpen, onToggle }) {
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
        <div className="p-2 text-sm">
          <p className="ffx-header text-xs">Contents</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Rewrite AppShell.jsx with real state**

Rewrite `spira-guide/src/components/Layout/AppShell.jsx`:
```jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ChapterDrawer from './ChapterDrawer'
import TableOfContents from './TableOfContents'

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onHamburgerClick={() => setDrawerOpen((o) => !o)}
        isDrawerOpen={drawerOpen}
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
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Layout/AppShell.test.jsx
```
Expected: PASS — 5 tests passing.

- [ ] **Step 8: Verify in browser**

```bash
npm run dev
```
- Dark background, Tuffy font, header visible
- Hamburger opens drawer; backdrop click closes it
- TOC tab on right toggles open/closed

- [ ] **Step 9: Commit**

```bash
cd ..
git add spira-guide/src/components/Layout/
git commit -m "feat: build AppShell with header, drawer stub, and collapsible TOC"
```

---

## Task 7: Build ChapterDrawer with act groups

**Files:**
- Rewrite: `spira-guide/src/components/Layout/ChapterDrawer.jsx`
- Create: `spira-guide/src/components/Layout/ChapterDrawer.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `spira-guide/src/components/Layout/ChapterDrawer.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ChapterDrawer from './ChapterDrawer'

function renderDrawer(isOpen = true) {
  return render(
    <MemoryRouter>
      <ChapterDrawer isOpen={isOpen} onClose={vi.fn()} />
    </MemoryRouter>
  )
}

describe('ChapterDrawer', () => {
  it('renders all 4 act group headings', () => {
    renderDrawer()
    expect(screen.getByText(/Act 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 3/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 4/i)).toBeInTheDocument()
  })

  it('renders Besaid in act 1', () => {
    renderDrawer()
    expect(screen.getByText('Besaid')).toBeInTheDocument()
  })

  it('renders Inside Sin in act 4', () => {
    renderDrawer()
    expect(screen.getByText('Inside Sin')).toBeInTheDocument()
  })

  it('act groups are collapsible', () => {
    renderDrawer()
    const act1Toggle = screen.getByRole('button', { name: /Act 1/i })
    fireEvent.click(act1Toggle)
    expect(screen.queryByText('Besaid')).not.toBeVisible()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <MemoryRouter>
        <ChapterDrawer isOpen={true} onClose={onClose} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByTestId('drawer-backdrop'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd spira-guide && npm run test:run -- src/components/Layout/ChapterDrawer.test.jsx
```
Expected: FAIL — current stub doesn't have act groups.

- [ ] **Step 3: Rewrite ChapterDrawer.jsx**

Rewrite `spira-guide/src/components/Layout/ChapterDrawer.jsx`:
```jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { chapters, ACT_NAMES, getChaptersByAct } from '../../data/chapterIndex'
import ProgressDashboard from './ProgressDashboard'

function ActGroup({ actNumber, children }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="mb-2">
      <button
        className="ffx-button w-full text-left text-sm"
        aria-label={ACT_NAMES[actNumber]}
        onClick={() => setExpanded((e) => !e)}
      >
        {ACT_NAMES[actNumber]} {expanded ? '▾' : '▸'}
      </button>
      <ul aria-hidden={!expanded} style={{ visibility: expanded ? 'visible' : 'hidden' }}>
        {children}
      </ul>
    </div>
  )
}

export default function ChapterDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()

  function handleChapterClick(slug) {
    navigate(`/chapter/${slug}`)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          data-testid="drawer-backdrop"
          className="fixed inset-0 bg-black/50 z-10"
          onClick={onClose}
        />
      )}
      <nav
        aria-label="Chapters"
        aria-hidden={!isOpen}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        className="fixed top-0 left-0 h-full w-72 ffx-panel z-20 overflow-y-auto p-4 flex flex-col gap-3"
      >
        <ProgressDashboard />
        {[1, 2, 3, 4].map((act) => (
          <ActGroup key={act} actNumber={act}>
            {getChaptersByAct(act).map((ch) => (
              <li key={ch.slug}>
                <button
                  className="w-full text-left px-3 py-1 text-sm hover:text-[var(--color-gold)]"
                  onClick={() => handleChapterClick(ch.slug)}
                >
                  {ch.name}
                </button>
              </li>
            ))}
          </ActGroup>
        ))}
      </nav>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Layout/ChapterDrawer.test.jsx
```
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
cd ..
git add spira-guide/src/components/Layout/ChapterDrawer.jsx spira-guide/src/components/Layout/ChapterDrawer.test.jsx
git commit -m "feat: build chapter drawer with 4 act groups"
```

---

## Task 8: Build ProgressDashboard and Landing page

**Files:**
- Create: `spira-guide/src/components/Layout/ProgressDashboard.jsx`
- Rewrite: `spira-guide/src/pages/LandingPage.jsx`

- [ ] **Step 1: Create ProgressDashboard.jsx**

Create `spira-guide/src/components/Layout/ProgressDashboard.jsx`:
```jsx
export default function ProgressDashboard() {
  return (
    <div className="ffx-panel p-3 text-sm flex gap-4">
      <span>Story: <strong className="ffx-header">0%</strong></span>
      <span>Primers: <strong className="ffx-header">0/26</strong></span>
      <span>Celestials: <strong className="ffx-header">0/7</strong></span>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite LandingPage.jsx**

Rewrite `spira-guide/src/pages/LandingPage.jsx`:
```jsx
import { Link } from 'react-router-dom'
import ProgressDashboard from '../components/Layout/ProgressDashboard'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="ffx-panel p-8 text-center">
        <h1 className="ffx-header text-3xl mb-2">Spira Guide</h1>
        <p className="text-sm opacity-75">FFX HD Remaster Companion</p>
      </div>

      <ProgressDashboard />

      <div className="flex gap-4">
        <Link to="/chapter/zanarkand" className="ffx-button px-6 py-3">
          Continue
        </Link>
        <Link to="/chapter/zanarkand" className="ffx-button px-6 py-3">
          Next Incomplete
        </Link>
      </div>

      <div className="flex gap-4">
        <Link to="/collectibles" className="ffx-button px-4 py-2 text-sm">
          Collectibles Hub
        </Link>
        <Link to="/settings" className="ffx-button px-4 py-2 text-sm">
          Settings
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
cd spira-guide && npm run dev
```
- Landing page shows title, progress stub, Continue/Next Incomplete buttons, hub/settings links
- All links navigate correctly

- [ ] **Step 4: Commit**

```bash
cd ..
git add spira-guide/src/components/Layout/ProgressDashboard.jsx spira-guide/src/pages/LandingPage.jsx
git commit -m "feat: build landing page and progress dashboard stub"
```

---

## Task 9: Generate PWA icons and add GitHub Actions workflow

**Files:**
- Create: `spira-guide/public/icons/icon-192.png`
- Create: `spira-guide/public/icons/icon-512.png`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Generate PWA icons**

Using any image editor or CLI tool, convert `spira-guide/public/favicon.svg` to two PNG files:
- `spira-guide/public/icons/icon-192.png` at 192×192
- `spira-guide/public/icons/icon-512.png` at 512×512

Quick CLI option (if `rsvg-convert` is available via Homebrew: `brew install librsvg`):
```bash
mkdir -p spira-guide/public/icons
rsvg-convert -w 192 -h 192 spira-guide/public/favicon.svg -o spira-guide/public/icons/icon-192.png
rsvg-convert -w 512 -h 512 spira-guide/public/favicon.svg -o spira-guide/public/icons/icon-512.png
```

Alternative: use an online SVG-to-PNG converter and place the files manually.

- [ ] **Step 2: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: spira-guide/package-lock.json

      - name: Install dependencies
        working-directory: spira-guide
        run: npm ci

      - name: Build
        working-directory: spira-guide
        run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: spira-guide/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Verify build passes locally**

```bash
cd spira-guide && npm run build
```
Expected: `dist/` folder created with no errors. Check `dist/` contains `index.html` and asset files.

- [ ] **Step 4: Commit**

```bash
cd ..
git add spira-guide/public/icons/ .github/workflows/deploy.yml
git commit -m "feat: add PWA icons and GitHub Actions deploy workflow"
```

- [ ] **Step 5: Push to main**

```bash
git push origin main
```

- [ ] **Step 6: Enable GitHub Pages in repo settings**

Go to `https://github.com/TheoNavarro24/Ffx-walkthrough/settings/pages`:
- Source: **GitHub Actions** (not a branch)
- Save

- [ ] **Step 7: Verify deploy**

Once the Actions workflow completes (check at `https://github.com/TheoNavarro24/Ffx-walkthrough/actions`), open:
`https://theonavarro24.github.io/Ffx-walkthrough/`

Verification checklist:
- [ ] App loads with dark background and Tuffy font
- [ ] Hamburger opens the chapter drawer
- [ ] Clicking a chapter navigates to that chapter page
- [ ] TOC toggle works
- [ ] Navigating to `https://theonavarro24.github.io/Ffx-walkthrough/#/collectibles` works directly
- [ ] On iPad Safari: "Add to Home Screen" option is available

---

## Task 10: Run all tests and clean up

- [ ] **Step 1: Run full test suite**

```bash
cd spira-guide && npm run test:run
```
Expected: all tests pass.

- [ ] **Step 2: Run linter**

```bash
npm run lint
```
Fix any lint errors before committing.

- [ ] **Step 3: Final commit**

```bash
cd ..
git add -A
git commit -m "chore: phase 1 complete — all tests passing, linter clean"
git push origin main
```

Phase 1 is complete. All 4 routes are navigable, the app looks like an FFX menu, the chapter drawer shows all 26 chapters in 4 acts, and auto-deploy is live on GitHub Pages.
