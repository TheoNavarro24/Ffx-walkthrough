# Spira Guide — Technical Research

Research findings for building the FFX-styled web app.

---

## FFX Menu Font: Tuffy

The FFX HD Remaster uses a font file called `tuffy.fgen.phyre`. The underlying font is **Tuffy** by Thatcher Ulrich.

- **License**: Public Domain / GPL / OFL — free for all use including web
- **Styles**: Regular, Italic, Bold, Bold Italic
- **Download**: https://www.fontsquirrel.com/fonts/tuffy or https://www.dafont.com/tuffy.font
- **Character**: Clean sans-serif, simple and readable — matches the HD Remaster's clean modern look
- **Usage**: Download TTF files, place in `src/styles/fonts/`, use `@font-face` in CSS

```css
@font-face {
  font-family: 'Tuffy';
  src: url('./fonts/Tuffy-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Tuffy';
  src: url('./fonts/Tuffy-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
```

---

## FFX Menu Box CSS

### Color References (from CodePen FF recreations)

The FFX menu style is a **dark translucent blue gradient panel** with a **light border**.

**FFVII-style (closest reference):**
- Background gradient: `linear-gradient(to bottom, #04009d 0%, #06004d 100%)`
- With transparency: `linear-gradient(to bottom, rgba(4, 0, 157, 0.8), rgba(6, 0, 77, 0.8))`

**JRPG Menu Window (CodePen by bizzle-dapp):**
- Background: `linear-gradient(-140deg, #1a44da, #311765)`
- Ridge border style

### FFX-Specific Color Palette (derived from game screenshots)

FFX's HD Remaster menu uses a subtler, more teal-leaning palette than FFVII:

| Element | Color | Hex |
|---------|-------|-----|
| Panel background (dark) | Deep navy | #0a0e27 |
| Panel background (lighter) | Dark blue | #1a2444 |
| Panel gradient top | Midnight blue | #0f1b3d |
| Panel gradient bottom | Deep navy | #080c20 |
| Border color | Teal/cyan | #4fc3f7 |
| Border highlight | Light teal | #81d4fa |
| Gold accent (titles, key items) | Gold | #ffd54f |
| Gold darker | Amber | #ffab00 |
| Text primary | White | #ffffff |
| Text secondary | Light gray | #b0bec5 |
| Text muted/checked | Dimmed gray | #607080 |
| HP bar green | | #4caf50 |
| HP bar yellow (low) | | #ffeb3b |
| HP bar red (critical) | | #f44336 |
| Missable alert bg | Dark red | #3d0000 |
| Missable alert border | Red | #ef5350 |

### FFX Menu Box CSS

```css
.ffx-box {
  background: linear-gradient(
    180deg,
    rgba(15, 27, 61, 0.92) 0%,
    rgba(8, 12, 32, 0.95) 100%
  );
  border: 2px solid #4fc3f7;
  border-radius: 8px;
  box-shadow:
    inset 0 1px 0 rgba(129, 212, 250, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.5);
  padding: 16px;
  color: #ffffff;
}

.ffx-box-header {
  color: #ffd54f;
  font-family: 'Tuffy', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(79, 195, 247, 0.3);
  padding-bottom: 8px;
  margin-bottom: 12px;
}
```

### CodePen References
- JRPG Menu Window: https://codepen.io/bizzle-dapp/pen/rNVzrmM
- FF7 UI: https://codepen.io/Kaizzo/pen/aGWwMM
- FF7 Menu: https://codepen.io/XaelGa/pen/rqYZNP
- Final-Fantasy-CSS (GitHub): https://github.com/cafeTechne/Final-Fantasy-CSS

---

## Tailwind CSS v4 + Vite Setup

Tailwind v4 has a dedicated Vite plugin. No `tailwind.config.js` needed.

### Install
```bash
npm install tailwindcss @tailwindcss/vite
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### CSS (index.css)
```css
@import "tailwindcss";
```

That's it. No PostCSS config, no tailwind.config.js.

---

## React Router v7 Setup

In v7, import everything from `react-router`. No separate `react-router-dom` package needed.

### Install
```bash
npm install react-router
```

### main.jsx
```javascript
import { createBrowserRouter, RouterProvider } from 'react-router'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/chapter/:slug', element: <ChapterPage /> },
  { path: '/collectibles', element: <CollectiblesHub /> },
  { path: '/settings', element: <SettingsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
```

---

## Pyrefly Effects

### Recommended: Sparticles (lightweight canvas particles)

- **Library**: [sparticles](https://github.com/simeydotme/sparticles)
- **Install**: `npm install sparticles`
- **Why**: Lightweight, canvas-based, configurable glow effects, good performance on iPad
- **Key options**: count, speed, color, shape, glow, direction, rotation

### Usage (React)
```javascript
import Sparticles from 'sparticles'

useEffect(() => {
  const instance = new Sparticles(containerRef.current, {
    count: 30,
    speed: 2,
    color: ['#4fc3f7', '#81d4fa', '#b3e5fc', '#ffffff'],
    shape: 'circle',
    glow: 15,
    direction: 0, // upward
    maxSize: 6,
    minSize: 2,
  })
  return () => instance.destroy()
}, [])
```

### Alternative: Pure CSS pyreflies (no library)
For simple page transitions, CSS-only approach with `@keyframes`:

```css
@keyframes pyrefly-float {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-200px) scale(0.3); opacity: 0; }
}

.pyrefly {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, #81d4fa, transparent);
  box-shadow: 0 0 12px #4fc3f7, 0 0 24px rgba(79, 195, 247, 0.5);
  animation: pyrefly-float 3s ease-in-out forwards;
}
```

**Recommendation**: Start with CSS-only for page transitions (simpler, no dependency). Use Sparticles later if needed for celebration bursts.

---

## Walkthrough Content Sources

For sourcing/adapting walkthrough prose per chapter:

1. **GameFAQs (Split Infinity)** — Gold standard. Exhaustive item lists, boss stats, missables. Dense text, easy to adapt.
2. **Jegged.com** — Good area-by-area structure matching our 27 chapters. Per-location items.
3. **Gamer Guides** — Professional editorial tone. Good balance of detail.

The game-mined data in `docs/source-data/monsters.json` supersedes any guide for boss stats. Use guides only for:
- Walkthrough prose/flow
- Item location descriptions
- Boss strategy writing

---

## GitHub Pages Deployment

### vite.config.js base path
```javascript
export default defineConfig({
  base: '/Ffx-walkthrough/',  // matches repo name
  plugins: [react(), tailwindcss()],
})
```

### GitHub Actions workflow (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd spira-guide && npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: spira-guide/dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## GitHub Pages SPA Routing (404 Fix)

GitHub Pages doesn't support SPA client-side routing natively. Navigating directly to `/chapter/besaid` returns a 404.

### Solution: Copy index.html as 404.html

GitHub Pages serves `404.html` for any URL that doesn't match a file. If `404.html` is a copy of `index.html`, React Router handles the route.

Add to build script in `package.json`:
```json
"build": "vite build && cp dist/index.html dist/404.html"
```

### Alternative: HashRouter

Use `createHashRouter` instead of `createBrowserRouter`. URLs become `/#/chapter/besaid` — uglier but zero config needed.

**Recommendation**: Use `createHashRouter` for simplicity. The 404.html copy trick works but can cause issues with SEO and initial 404 status codes (not a concern for a personal PWA).

---

## Vite Path Aliases (Importing JSON from docs/)

The game data lives in `docs/source-data/` which is outside `spira-guide/src/`. Need a Vite alias to import it cleanly.

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/Ffx-walkthrough/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, '../docs/source-data'),
    }
  }
})
```

### Usage in components
```javascript
import monsters from '@data/monsters.json'
import chapters from '@data/walkthrough-index.json'
```

### Dynamic import for large files
```javascript
// monsters.json is 549 KB — lazy load it
const loadMonsters = () => import('@data/monsters.json')

// In component:
useEffect(() => {
  loadMonsters().then(data => setMonsters(data.default))
}, [])
```

---

## PWA Setup: vite-plugin-pwa

### Install
```bash
npm install vite-plugin-pwa -D
```

### vite.config.js
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'img/**/*'],
      manifest: {
        name: 'Spira Guide — FFX Walkthrough',
        short_name: 'Spira Guide',
        description: 'Interactive FFX HD Remaster walkthrough',
        theme_color: '#0a0e27',
        background_color: '#0a0e27',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,json}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB (for large JSON/images)
      },
    }),
  ],
})
```

**Notes**:
- `registerType: 'autoUpdate'` — automatically updates the service worker when new content is deployed
- `includeAssets` — precaches the 352 game images for offline use
- `workbox.maximumFileSizeToCacheInBytes` — raised to 3 MB to accommodate monsters.json (549 KB) and large map images
- PWA only works in production builds (`npm run build` + `npm run preview`)
- Need to create icon-192.png and icon-512.png for the manifest

---

## Scroll Spy (Sticky TOC)

### Approach: IntersectionObserver with React Hook

Track which section headings are visible in the viewport to highlight the active TOC item.

### useScrollSpy hook
```javascript
import { useState, useEffect, useRef } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersecting = entries.find(e => e.isIntersecting)
        if (intersecting) {
          setActiveId(intersecting.target.id)
        }
      },
      {
        // -100px top accounts for sticky header
        // -40% bottom means headings in bottom 40% don't count
        rootMargin: '-100px 0px -40% 0px',
        threshold: 0,
        ...options,
      }
    )

    elements.forEach(el => observerRef.current.observe(el))

    return () => observerRef.current?.disconnect()
  }, [sectionIds])

  return activeId
}
```

### TOC component pattern
```jsx
function TableOfContents({ sections }) {
  const activeId = useScrollSpy(sections.map(s => s.id))

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeId === section.id ? 'text-gold border-l-2 border-gold' : 'text-gray'}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
```

---

## localStorage Save System

### useLocalStorage hook (with debounce)
```javascript
import { useState, useEffect, useCallback, useRef } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  // Debounce writes to localStorage (100ms)
  const timeoutRef = useRef(null)
  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.warn('localStorage write failed:', e)
      }
    }, 100)
    return () => clearTimeout(timeoutRef.current)
  }, [key, value])

  return [value, setValue]
}
```

### Best practices
- **Debounce writes** — localStorage is synchronous; rapid writes (checkbox spam) can cause jank
- **Try/catch everything** — storage quota can be exceeded (~5-10 MB per origin)
- **Lazy initialization** — read from localStorage only once on mount via `useState(() => ...)`
- **JSON.stringify/parse** — always wrap in try/catch for malformed data
- **Cross-tab sync** not needed (personal single-device use)

---

## Image Lazy Loading

### Native browser lazy loading (simplest)
```jsx
<img src="/img/bosses/evrae.png" alt="Evrae" loading="lazy" />
```

Works in all modern browsers including Safari on iPad. No library needed.

### For more control: IntersectionObserver
Only needed if we want fade-in effects or placeholder images. Start with native `loading="lazy"` — optimize later if needed.

---

## Summary: All Dependencies

### Production
```
react               (already installed)
react-dom            (already installed)
react-router         (routing)
```

### Dev
```
tailwindcss          (styling)
@tailwindcss/vite    (Vite integration)
vite-plugin-pwa      (PWA/offline)
```

### Optional (add later if needed)
```
sparticles           (pyrefly particle effects)
```

### Total new packages: 4 (react-router, tailwindcss, @tailwindcss/vite, vite-plugin-pwa)
