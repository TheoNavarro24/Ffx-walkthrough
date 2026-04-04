# Spira Guide - FFX HD Remaster Walkthrough

## Project Overview

An interactive web-based walkthrough for Final Fantasy X HD Remaster, built with React + Vite. The app guides players chapter-by-chapter through the game while providing reference databases for bosses, items, collectibles, and game systems.

## Repository Structure

```
Ffx-walkthrough/
├── CLAUDE.md              # This file - project conventions and context
├── docs/                  # Research documentation (read-only reference)
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
- **Linting**: ESLint 9 (flat config) with React Hooks + React Refresh plugins
- **Styling**: Plain CSS (index.css for globals, App.css for components)
- **State**: React built-in (useState/useReducer/useContext) - no external state library yet

## Coding Conventions

- **Language**: JavaScript with JSX (`.jsx` files), not TypeScript
- **Components**: Functional components with hooks only (no class components)
- **File naming**: Components use PascalCase (`BossCard.jsx`), utilities use camelCase (`formatHp.js`)
- **CSS**: One CSS file per component when needed, using standard CSS classes (no CSS-in-JS)
- **Exports**: Named exports preferred; default export for page-level components
- **Data imports**: Import JSON from `docs/source-data/` using relative paths or Vite aliases

## Key Data Notes

- Boss HP data in `monsters.json` is game-mined and authoritative (from andreasSchauer/ffx-lookup-tool)
- The `walkthrough-index.json` defines 27 chapters from Zanarkand through Inside Sin
- Research docs in `docs/research-*.md` contain corrections to common guide errors - consult these when writing walkthrough content
- Missable items are documented in `research-collectibles.md` (4 Al Bhed Primers at Home/Bevelle, Wantz encounter, etc.)

## Image Asset Paths

Images are in `spira-guide/public/img/` and referenced as `/img/...` in the app:

- Boss: `/img/bosses/{name}.png`
- Fiend: `/img/fiends/{name}.png`
- Character: `/img/party/characters/{name}.png`
- Region map: `/img/maps/regions/{region}/{area}.png`
- Cloister map: `/img/maps/cloisters/{name}.png`
- World map: `/img/maps/Spira.png`
