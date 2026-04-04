# Spira Guide — Implementation Plan

## Vision

A chapter-by-chapter interactive walkthrough for FFX HD Remaster that surfaces the right information at the right time: boss stats, item locations, missable warnings, and collectible tracking — all backed by game-mined data.

---

## Phase 1: App Shell & Navigation

**Goal**: Replace the Vite template with a working app skeleton that can navigate between chapters.

### Tasks
1. **Install React Router** (`react-router`) for client-side routing
2. **Create layout component** with:
   - Sidebar: chapter list from `walkthrough-index.json` (27 chapters)
   - Header: "Spira Guide" branding + world map of Spira
   - Main content area for chapter/page content
   - Mobile: collapsible sidebar or bottom nav
3. **Create page routes**:
   - `/` — Home/landing page (overview, how to use the guide)
   - `/walkthrough/:chapter` — Individual chapter pages
   - `/bestiary` — Monster/boss database
   - `/collectibles` — Celestial weapons, primers, Jecht spheres
   - `/tracker` — Monster Arena capture tracker
4. **Set up data loading**: Import JSON files from `docs/source-data/` via Vite's JSON import
5. **Base CSS theme**: Dark theme with FFX-inspired colors (blues, golds), responsive layout

### Decisions Needed
- [ ] Sidebar always visible on desktop, or collapsible?
- [ ] Chapter progress tracking (localStorage) — include now or later?
- [ ] Any preferred color palette or visual style?

---

## Phase 2: Walkthrough Core

**Goal**: Build the main walkthrough experience — chapter pages with items, bosses, and missable warnings.

### Tasks
1. **Chapter page component** displaying:
   - Chapter title and location name
   - Region map image (from `/img/maps/regions/`)
   - Narrative walkthrough text (needs to be authored per chapter)
2. **Item list component**: Chests and pickups per location (data from `research-walkthrough-items.md`, to be structured into JSON)
3. **Boss encounter cards**: Inline boss info with image, HP, overkill, and strategy tips
   - Pull stats from `monsters.json`
   - Boss images from `/img/bosses/`
4. **Missable alert banners**: Prominent warnings for:
   - Destruction Sphere items (Besaid, Kilika)
   - Al Bhed Primers XIX-XXII (Home, Bevelle)
   - Wantz encounter (Mt. Gagazet)
   - Magic Counter shield (Calm Lands first visit)
   - Jecht Shot (S.S. Winno)
5. **Al Bhed Primer callouts**: Inline markers when a primer is available in the current chapter
6. **O'aka donation tracker**: Reminder at each O'aka meeting with running total
7. **Previous/Next chapter navigation**

### Data Work Needed
- [ ] Convert `research-walkthrough-items.md` into structured JSON (per-chapter items, keyed by chapter slug)
- [ ] Write walkthrough prose for each of the 27 chapters
- [ ] Map boss encounters to chapter slugs using `monsters.json` location IDs

---

## Phase 3: Bestiary & Boss Database

**Goal**: Searchable reference for all monsters and bosses.

### Tasks
1. **Monster list page** with search/filter:
   - Filter by: area, boss vs fiend, capturable, element
   - Sort by: name, HP, location
2. **Monster detail cards**:
   - Image (from `/img/bosses/` or `/img/fiends/`)
   - Stats: HP, overkill, elemental weaknesses, status immunities
   - Drops and steals (from `rewards.json`)
   - Location and chapter reference
3. **Boss detail view** (expanded):
   - Multi-phase display for bosses like Yunalesca (3 phases), Braska's Final Aeon (2 phases)
   - Strategy notes from research docs
   - Party recommendations
4. **Dark Aeons section** (HD Remaster): Separate table with locations and HP values

### Data Source
- `monsters.json` (549 KB, 274 monsters + 72 bosses) — primary
- `rewards.json` — drops/steals
- Boss images: `/img/bosses/` (43 story + 28 arena)
- Fiend images: `/img/fiends/` (110 sprites)

---

## Phase 4: Collectibles Hub

**Goal**: Central reference for all collectible tracking.

### Tasks
1. **Celestial Weapons page**:
   - Table: character, weapon, crest location, sigil location (from `celestials.json`)
   - Character portraits from `/img/party/characters/`
   - Checkbox tracking (localStorage) for weapon + crest + sigil per character
2. **Al Bhed Primers page**:
   - All 26 primers with locations (from `primers.json`)
   - Missable primers highlighted (Vol. XIX-XXII)
   - Translation table
   - Checkbox tracking
3. **Jecht Spheres page**:
   - 10 spheres with locations and availability
   - Overdrive unlock milestones (1 → Shooting Star, 3 → Banishing Blade, 10 → Tornado)
4. **Cloister of Trials checklist**:
   - 6 temples, Destruction Sphere rewards, missable flags
   - Cloister maps from `/img/maps/cloisters/`
   - Required for Anima — show progress toward unlock

---

## Phase 5: Monster Arena Tracker

**Goal**: Interactive capture tracker for the Monster Arena sidequest.

### Tasks
1. **Area-based grid**: 13 areas from `arena-tracker.json`
2. **Per-fiend checkboxes**: Track which fiends have been captured in each area
3. **Progress indicators**: X/Y captured per area, overall completion percentage
4. **Unlock rewards**: Show what unlocks when an area is completed (Area Conquest creatures, key rewards like Mars Sigil)
5. **Species Conquest view**: Group fiends by type across areas
6. **Persist state** in localStorage

### Data Source
- `arena-tracker.json` — area structure and fiend lists
- `monster_arena.json` — arena creature config
- Fiend images: `/img/fiends/`

---

## Phase 6: Game Systems Reference

**Goal**: Quick-reference pages for core game mechanics.

### Tasks
1. **Sphere Grid overview**:
   - Per-character natural paths with key milestones
   - Kimahri pathing strategy
   - Key Sphere usage guide
2. **O'aka pricing guide**: Donation tiers and meeting locations
3. **Optional Aeons guide**: Yojimbo, Anima, Magus Sisters — requirements and acquisition
4. **Blitzball basics** (if scope allows): Key players, Wakka's overdrives

---

## Phase 7: Polish & Enhancements

### Tasks
1. **Chapter progress tracking**: Mark chapters complete, resume where you left off
2. **Search**: Global search across bosses, items, locations
3. **Image lazy loading**: For performance with 352 images
4. **PWA support**: Offline access for playing without internet
5. **Print-friendly view**: For those who want a physical reference
6. **Responsive polish**: Test and refine mobile layout
7. **Deployment**: GitHub Pages or Vercel (configure `vite.config.js` base path)

---

## Architecture Notes

### Data Flow
```
docs/source-data/*.json  →  import in components  →  render
                              (Vite bundles JSON at build time)
```

For large files (`monsters.json` at 549 KB, `sphere-grid-nodes.json` at 113 KB), consider dynamic `import()` so they're code-split and only loaded when needed.

### Component Structure (Proposed)
```
src/
├── main.jsx
├── App.jsx                  # Router setup, layout
├── components/
│   ├── Layout/              # Shell, Sidebar, Header
│   ├── Walkthrough/         # ChapterPage, ItemList, BossCard, MissableAlert
│   ├── Bestiary/            # MonsterList, MonsterCard, BossDetail
│   ├── Collectibles/        # CelestialTable, PrimerList, JechtSpheres
│   ├── Arena/               # AreaGrid, CaptureTracker
│   └── common/              # SearchBar, Checkbox, ProgressBar, ImageWithFallback
├── data/                    # Data loading helpers, chapter content
├── hooks/                   # useLocalStorage, useChapterProgress
└── styles/                  # Global CSS, theme variables
```

### localStorage Schema
```json
{
  "spira-guide": {
    "chapterProgress": { "zanarkand": true, "baaj_temple": false, ... },
    "celestials": { "tidus": { "weapon": true, "crest": false, "sigil": false }, ... },
    "primers": [true, true, false, ...],  // 26 booleans
    "jechtSpheres": [true, false, ...],   // 10 booleans
    "arenaCaptures": { "besaid": { "dingo": true, ... }, ... },
    "cloisters": { "besaid": true, "kilika": false, ... }
  }
}
```

---

## Priority Summary

| Phase | What | Why First |
|-------|------|-----------|
| 1 | App Shell & Nav | Foundation everything else builds on |
| 2 | Walkthrough Core | The main product — chapter-by-chapter guidance |
| 3 | Bestiary | Most data-rich feature, high reference value |
| 4 | Collectibles | Players need this to avoid missing items |
| 5 | Arena Tracker | Endgame feature, but popular with completionists |
| 6 | Systems Reference | Nice-to-have reference pages |
| 7 | Polish | Quality of life and deployment |
