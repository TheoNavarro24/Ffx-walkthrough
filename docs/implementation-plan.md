# Spira Guide — Implementation Plan

## Vision

A personal, full-featured FFX HD Remaster companion app styled to match the game's in-game menu aesthetic. Area-centric design: each of the 27 chapters is a long scrollable page with walkthrough, bosses, collectibles, and checkboxes — all backed by game-mined data with progress tracking across unlimited save slots.

**Target device**: iPad Pro 11" M1 in landscape (~1194px width)
**Audience**: Veteran player (22+ years) — general strategy, not hand-holding
**Deployment**: GitHub Pages with auto-deploy CI/CD, installable as full PWA

---

## Design Spec

### Visual Style — FFX In-Game Menu Recreation
- **Boxes/panels**: Replicate FFX's translucent dark-blue gradient dialog boxes with the signature light-blue border and rounded corners
- **Text**: FFX-style font (find/use a web font that matches the game's menu text)
- **Color palette**: Deep blues (#0a0e27, #1a2444), teal borders (#4fc3f7, #81d4fa), gold accents (#ffd54f) for headers/important items, white text
- **Backgrounds**: Dark with subtle gradient, matching the game's menu screens
- **Icons/UI elements**: SD item icons from `/img/items/sd/` inline with item names
- **Images everywhere**: Region maps, boss portraits, character icons, item sprites — activate dual processing

### FFX-Inspired Effects
- **Page transitions**: Pyrefly dissolve/fade effect when navigating between chapters
- **Completion celebrations**: Pyrefly burst or Spira glow when completing a chapter or collectible set
- **No ambient particles or audio** — clean content areas, no sounds (game audio will be playing)

### Layout
- **Header**: "Spira Guide" branding with search bar (always visible, prominent)
- **Collapsible drawer**: Hamburger button triggers slide-out chapter navigation
- **Main content**: Full-width scrollable area page
- **Sticky right sidebar TOC**: Narrow column on the right showing current page sections, highlighting active section on scroll
- **Bottom nav**: Previous/Next chapter cards with location thumbnail and progress

### Chapter Drawer
- **Grouped by 4 story acts** (collapsible groups):
  - Act 1: Zanarkand → Luca (early game)
  - Act 2: Mi'ihen → Macalania (midgame pilgrimage)
  - Act 3: Bikanel → Zanarkand Ruins (betrayal & revelations)
  - Act 4: Airship → Inside Sin (endgame, includes optional areas as sub-sections)
- **Progress bar** per chapter showing "14/20 items" completion
- **Progress dashboard** in the drawer header: "Story: 45%, Primers: 12/26, Celestials: 2/7"

### Checked Item Styling
- Checked items: **strikethrough text + reduced opacity**
- Toggle button on area pages to show only unchecked items
- Completed sub-location groups can auto-collapse

---

## Data Architecture

### Save System
- **Unlimited named save slots** stored in localStorage
- **Export/import** as JSON file for backup
- **Single source of truth**: Checking an item on an area page syncs to the Collectibles Hub and vice versa
- **Persist collapse state** for sub-location groups across sessions

### localStorage Schema
```json
{
  "spira-guide-saves": {
    "currentSlot": "Playthrough 1",
    "slots": {
      "Playthrough 1": {
        "lastViewed": "besaid",
        "chapters": {
          "zanarkand": {
            "items": { "potion-1": true, "hi-potion-1": false },
            "bosses": { "sinspawn-ammes": true },
            "collectibles": { "primer-i": true }
          }
        },
        "celestials": { "tidus": { "weapon": false, "crest": false, "sigil": false } },
        "primers": [false, false, ...],
        "jechtSpheres": [false, false, ...],
        "cloisters": { "besaid": false, "kilika": false },
        "aeons": { "valefor": true, "ifrit": true, "yojimbo": false }
      }
    }
  },
  "spira-guide-ui": {
    "collapseState": { "besaid/beach": false, "besaid/village": true },
    "showOnlyUnchecked": false
  }
}
```

### Data Flow
```
docs/source-data/*.json  →  static import (Vite bundles at build time)
                              dynamic import() for monsters.json (549 KB) — code-split
```

---

## Component Structure
```
src/
├── main.jsx
├── App.jsx                      # Router setup, layout shell
├── components/
│   ├── Layout/
│   │   ├── AppShell.jsx         # Header + drawer + content + TOC
│   │   ├── Header.jsx           # Branding, search bar, settings icon
│   │   ├── ChapterDrawer.jsx    # Collapsible slide-out with act groups + progress
│   │   ├── TableOfContents.jsx  # Sticky right sidebar, scroll-aware
│   │   └── ChapterNav.jsx       # Previous/Next cards with thumbnails
│   ├── Walkthrough/
│   │   ├── ChapterPage.jsx      # Main area page — assembles all sections
│   │   ├── SubLocation.jsx      # Collapsible sub-area group (e.g., "Besaid Beach")
│   │   ├── ItemList.jsx         # Checkbox list of items with SD icons
│   │   ├── BossCard.jsx         # Expandable: compact stats → full strategy + loot
│   │   ├── MissableAlert.jsx    # Red warning banner for missable items
│   │   ├── OakaReminder.jsx     # Donation reminder with running total
│   │   ├── PartyIndicator.jsx   # Character portrait icons showing party composition
│   │   └── SphereGridTip.jsx    # Inline Sphere Grid milestone advice
│   ├── Collectibles/
│   │   ├── CollectiblesHub.jsx  # Hub page with all 4 tracker sections
│   │   ├── CelestialTracker.jsx # Character portraits + 3-step progress (weapon→crest→sigil)
│   │   ├── PrimerList.jsx       # 26 primers, missable flags, checkboxes
│   │   ├── JechtSpheres.jsx     # 10 spheres, overdrive unlock milestones
│   │   ├── CloisterChecklist.jsx# 6 temples + maps, Anima progress
│   │   └── AeonTracker.jsx      # Aeon cards with images, obtained tracking
│   ├── QuickRef/
│   │   ├── QuickRefPanel.jsx    # Pullout panel accessible from any page
│   │   ├── ElementalChart.jsx   # Fire/Ice/Thunder/Water weakness wheel
│   │   ├── StatusEffects.jsx    # Status effect reference
│   │   └── KeyItems.jsx         # Key item use reference
│   ├── Search/
│   │   ├── SearchBar.jsx        # Header search with instant results dropdown
│   │   └── SearchResults.jsx    # Categorized result items linking to area/section
│   ├── Settings/
│   │   ├── SettingsPage.jsx     # Full settings: saves, effects toggle, display prefs
│   │   ├── SaveManager.jsx      # Create/delete/rename save slots, export/import JSON
│   │   └── EffectsToggle.jsx    # Toggle pyrefly transitions and celebrations
│   └── common/
│       ├── Checkbox.jsx         # FFX-styled checkbox with strikethrough on check
│       ├── ProgressBar.jsx      # FFX-styled progress bar (blue/gold)
│       ├── ExpandableCard.jsx   # Compact → expanded toggle card
│       ├── ImageWithFallback.jsx# Lazy-loaded image with placeholder
│       └── PyreflyTransition.jsx# Page transition effect component
├── data/
│   ├── chapters/                # Per-chapter walkthrough content (27 JSON files)
│   │   ├── zanarkand.json
│   │   ├── baaj-temple.json
│   │   └── ...
│   ├── chapterIndex.js          # Chapter metadata, act groupings, slugs
│   └── loaders.js               # Dynamic import helpers for large JSON files
├── hooks/
│   ├── useSaveSlot.js           # Current save slot state + CRUD
│   ├── useProgress.js           # Check/uncheck items, compute completion
│   ├── useCollapseState.js      # Persisted collapse state for sub-locations
│   └── useScrollSpy.js          # Track which section is in view for TOC highlight
├── styles/
│   ├── ffx-theme.css            # FFX menu box styles, color variables, borders
│   ├── fonts/                   # FFX-style web font files
│   ├── animations.css           # Pyrefly keyframes and transition classes
│   └── index.css                # Global resets and base typography
└── sw.js                        # Service worker for PWA offline support
```

---

## Phase 1: Foundation

**Goal**: Replace Vite template with a working FFX-styled app shell.

### Tasks
1. **Install dependencies**: React Router, Tailwind CSS (for utility classes alongside FFX theme CSS)
2. **FFX theme CSS**: Recreate the game's menu box styling — translucent dark-blue panels, teal borders, gold accents
3. **FFX-style font**: Source and integrate a web font matching the game's menu typography
4. **AppShell layout**: Header with search bar + hamburger, main content area, sticky right TOC
5. **ChapterDrawer**: Slide-out drawer with 4 collapsible act groups, chapter list with progress bars
6. **Router setup**: `/` (landing), `/chapter/:slug` (27 area pages), `/collectibles` (hub), `/settings`
7. **Landing page**: Simple page with "Spira Guide" branding, "Continue" (last viewed), "Next Incomplete" (first incomplete chapter), links to Collectibles Hub and Settings
8. **Progress dashboard**: Summary stats in drawer header and on landing page
9. **Data loading**: Import JSON from `docs/source-data/`, dynamic import for monsters.json
10. **GitHub Pages config**: Set Vite `base` path, add GitHub Actions workflow for auto-deploy on push to main

---

## Phase 2: Area Pages — Walkthrough Core

**Goal**: Build the main experience — 27 scrollable area pages with items, bosses, and missable alerts.

### Tasks
1. **ChapterPage component**: Assembles all sections for an area, generates TOC anchors
2. **Region map**: Prominent map image at top of each area page
3. **Sub-location groups**: Collapsible sections (e.g., "Besaid Beach", "Besaid Village") with persist state
4. **ItemList with checkboxes**: Each item has SD icon, name, location note, checkbox. Strikethrough + dim when checked.
5. **"Show unchecked only" toggle**: Filter button to hide completed items
6. **MissableAlert banners**: Red/orange warnings at top of page AND inline where missables appear
   - Destruction Sphere items (Besaid, Kilika)
   - Al Bhed Primers XIX-XXII (Home, Bevelle)
   - Wantz (Mt. Gagazet), Magic Counter shield (Calm Lands), Jecht Shot (S.S. Winno)
7. **BossCard (expandable)**: Compact = image + name + HP + overkill. Expand = strategy, weaknesses, steals/drops, party tips. Checkbox for "defeated."
8. **Collectible callouts inline**: Al Bhed Primers, Celestial crests/sigils, Jecht Spheres — with checkboxes that sync to Collectibles Hub
9. **OakaReminder cards**: Show at each O'aka meeting with donation tier info and running total target
10. **PartyIndicator**: Small character portrait row showing who's in the active party, with "joins/leaves" notes
11. **SphereGridTip**: Inline tips at key milestones ("Tidus should have Haste soon")
12. **Previous/Next nav cards**: Bottom of page with chapter name, location thumbnail, progress bar
13. **Cloister sections**: Cloister map images with numbered step-by-step puzzle solutions at relevant chapters

### Data Work
- **Convert walkthrough research to JSON**: Structure `research-walkthrough-items.md` into per-chapter JSON files in `src/data/chapters/`
- **Source walkthrough prose**: Extract from BradyGames Official Strategy Guide (`docs/official-guide/brady-guide.xml`, DAISY XML). Guide screenshots (`img/guide/image_NNNN_NN.jpeg`) extracted from the EPUB are paired to sub-locations via `guideImages` field for dual-coding display.
- **Map bosses to chapters**: Cross-reference `monsters.json` location IDs with chapter slugs
- **Optional areas under Airship**: Remiem Temple, Baaj, Omega Ruins, Cactuar Village, etc. as sub-sections of the Airship chapter

---

## Phase 3: Collectibles Hub

**Goal**: Central synced reference for all collectible tracking.

### Tasks
1. **CelestialTracker**: Character portraits in a row, each with 3-step visual progress indicator (weapon → crest → sigil) with locations. Checkboxes sync with area pages.
2. **PrimerList**: All 26 Al Bhed Primers, locations, checkboxes. Missable primers (XIX-XXII) in red. Synced.
3. **JechtSpheres**: 10 spheres with locations and overdrive unlock milestones (1→Shooting Star, 3→Banishing Blade, 10→Tornado). Synced.
4. **CloisterChecklist**: 6 temples with cloister maps, Destruction Sphere rewards, missable flags. Progress toward Anima unlock (need all 6). Synced.
5. **AeonTracker**: Cards with aeon images showing which are obtained. Includes optional aeons (Yojimbo, Anima, Magus Sisters) with acquisition requirements.
6. **Blitzball note**: Brief section covering Wakka's 3 overdrives and Jupiter Sigil Blitzball requirements (no full Blitzball database).

---

## Phase 4: Save System & Settings

**Goal**: Robust save management and user preferences.

### Tasks
1. **Unlimited named save slots**: Create, rename, delete, switch between
2. **Export/import**: Download save as JSON, upload to restore
3. **Settings page**: Save manager, toggle pyrefly effects, display preferences
4. **"New Game" flow**: Create a new named save slot with all checkboxes cleared

---

## Phase 5: Search & Quick Reference

**Goal**: Instant access to any piece of information.

### Tasks
1. **Global search bar**: Always visible in header, dropdown results as you type
2. **Search index**: Bosses, items, primers, celestials, locations — all searchable with categorized results linking to the relevant area page section
3. **QuickRefPanel**: Pullout panel accessible from any page containing:
   - Elemental weakness chart (Fire/Ice/Thunder/Water wheel)
   - Status effects reference (what each does, cures, immunity gear)
   - Key item uses (Key Spheres, Al Bhed Potions, special items)

---

## Phase 6: Polish & Deploy

### Tasks
1. **PWA setup**: Service worker for offline caching, manifest for iPad home screen install
2. **Pyrefly page transitions**: Dissolve/fade between chapter navigations
3. **Completion celebrations**: Pyrefly burst on completing a chapter or collectible set
4. **Image lazy loading**: IntersectionObserver for 352+ images
5. **GitHub Actions CI/CD**: Auto-build and deploy to GitHub Pages on push to main
6. **Optional bosses section**: Dark Aeons and optional bosses listed under relevant area pages
7. **Responsive testing**: Verify landscape iPad Pro layout, test drawer/TOC at various widths

---

## Priority & Dependency Chain

| Phase | What | Depends On | Estimated Scope |
|-------|------|------------|-----------------|
| 1 | Foundation (shell, theme, router, drawer) | — | Core setup |
| 2 | Area Pages (walkthrough, items, bosses, missables) | Phase 1 | Largest phase — 27 pages of content |
| 3 | Collectibles Hub (celestials, primers, spheres, cloisters, aeons) | Phase 2 (synced checkboxes) | Medium |
| 4 | Save System & Settings (slots, export, preferences) | Phase 2 (needs data to save) | Medium |
| 5 | Search & Quick Reference | Phase 2 (needs content to search) | Medium |
| 6 | Polish & Deploy (PWA, effects, CI/CD) | All above | Finishing touches |
