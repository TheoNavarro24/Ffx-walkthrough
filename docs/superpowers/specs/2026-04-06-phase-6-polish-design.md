# Phase 6: Remaining Polish — Design Spec

## Overview

Phase 6 completes the Spira Guide with three remaining items: a new Superbosses page, native image lazy loading across all components, and responsive layout fixes for three target devices.

---

## 1. Superbosses Page

### Route & Navigation

- **Route**: `/superbosses`
- **Chapter Drawer**: Listed below Act 4 as its own entry (like Collectibles Hub), with a progress bar showing defeated count
- **Airship chapter**: Optional areas text links to the Superbosses page
- **Landing page**: If all 27 story chapters are complete, show a link to Superbosses alongside the existing navigation buttons

### Page Structure

One scrollable page with four sections, following the same layout patterns as `ChapterPage`. Includes sticky right TOC with scroll-spy for sections (Preparation, Dark Aeons, Penance, Nemesis).

#### Section 1: Preparation Guide

Sourced from Brady Guide pages 85-86 ("Preparing to Face the Dark Aeons"). Written as walkthrough prose with bullet lists, covering:

- **Team Selection** — Rikku (utility/Mix), Wakka/Tidus (multi-hit Overdrives), Yuna (aeon shields). Auron/Lulu viable but less optimal.
- **Omega Ruins Grinding** — AP farming, Mimic chest strategy (Rikku Steal + Gillionaire)
- **Monster Arena Farming** — Capture targets for Species Conquests, material farming
- **Armor Crafting** — Break HP Limit (30 Wings to Discovery), Auto-Phoenix (20 Mega Phoenixes), Auto-Haste (80 Chocobo Wings), Stoneproof/Ribbon
- **Sphere Grid Upgrading** — Using stat spheres + Clear Spheres to push toward 99,999 HP / 255 stats
- **Masterful Mixes** — Rikku's key recipes: Final Elixir, Final Phoenix, Hyper Mighty G, Ultra NulAll

Also include the Monster Arena tables from Brady Guide pages 85-86 (`image_0085_00.jpeg`, `image_0086_00.jpeg`) as reference images.

#### Section 2: Dark Aeons

12 BossCard entries (10 unique aeons across 12 cards) in recommended fight order. Each entry includes:

1. **Location & How to Find** — Paragraph from Brady Guide describing where to go and what triggers the fight
2. **Region map** — Existing unannotated map image for orientation (e.g. `besaid village.png` for Dark Valefor)
3. **Dark Aeon portrait** — To be sourced during implementation
4. **Full BossCard** — Reuses existing `BossCard` component with stats from `monsters.json`, strategy text from Brady Guide, steals/drops, defeat checkbox

Fight order (with `monsters.json` slugs and `bossBySlug` keys):

| # | Name | Slug (`bossBySlug` key) | Location | HP |
|---|------|------------------------|----------|----|
| 1 | Dark Valefor | `dark-valefor` | Besaid Village entrance | 800,000 |
| 2 | Dark Ifrit | `dark-ifrit` | Sanubia Sands, near Home | 1,400,000 |
| 3 | Dark Ixion (First) | `dark-ixion-first-fight` | Thunder Plains | 1,200,000 |
| 4 | Dark Ixion (Second) | `dark-ixion-second-fight` | Thunder Plains, during lightning | 1,200,000 |
| 5 | Dark Shiva | `dark-shiva` | Macalania Temple approach | 1,100,000 |
| 6 | Dark Bahamut | `dark-bahamut` | Zanarkand Dome (Yunalesca's chamber) | 4,000,000 |
| 7 | Dark Yojimbo (x5) | `dark-yojimbo` | Cavern of the Stolen Fayth | 1,600,000 each |
| 8 | Dark Anima | `dark-anima` | Mt. Gagazet entrance | 8,000,000 |
| 9 | Dark Cindy | `dark-cindy` | Mushroom Rock Road entrance | 3,000,000 |
| 10 | Dark Sandy | `dark-sandy` | Mushroom Rock Road entrance | 2,700,000 |
| 11 | Dark Mindy | `dark-mindy` | Mushroom Rock Road entrance | 2,000,000 |
Dark Magus Sisters get 3 separate BossCards (one per sister) since they have distinct stats, HP, and can be fought individually. Dark Yojimbo is 1 BossCard with a note that the fight repeats 5 times.

General strategy note at top of section (from Brady Guide): all Dark Aeons immune to ailments/breaks, physical attacks > magic, Quick Hit as primary attack, summon aeons to absorb Overdrives.

#### Section 3: Penance

- Note/alert (using `MissableAlert` style): "Requires defeating all Dark Aeons. Penance then appears in the Airship destination list."
- **Two BossCards**: one for Penance body (`penance`, 12,000,000 HP), one for Penance arms (`penance-arms`, 500,000 HP each). Both get defeat checkboxes.
- Strategy from Brady Guide: arm priority (right arm if no Ribbon, left arm if Ribbon), Judgment Day prevention, phase change at 3M damage (Obliteration → Immolation + self-Haste), Dispel tips
- **Zanmato tip card** at bottom — Brady Guide's "There's Always Zanmato..." note about Yojimbo as a last resort

#### Section 4: Nemesis (Minimal)

- Stats-only BossCard (`nemesis`, 10,000,000 HP) — no strategy writeup
- Brief note: unlocked by capturing every monster 10 times and defeating all other Arena creations
- Defeat checkbox for tracking

### Data Architecture

- **`src/data/superbosses.json`** — Maps boss slugs to strategy text, location descriptions, region map paths, and fight order. Strategy text sourced from Brady Guide. Content structured similarly to chapter walkthrough JSON.
- **Stats** — Come from existing `monsters.json` via `bossBySlug` helper. Entries already exist for all Dark Aeons, Penance, Penance (Arms), and Nemesis.
- **`BossCard` integration** — Pass `chapterSlug="superbosses"` to all `BossCard` instances on this page. Checkbox IDs will be `superbosses-boss-{slug}` (e.g. `superbosses-boss-dark-valefor`), keeping them collision-free with story boss checkboxes.
- **No new components** — Reuses `BossCard`, page layout patterns from `ChapterPage`, and `useCheckbox` for tracking.

### Search Integration

Add superboss entries to `searchIndex.js` so Dark Aeons and Penance appear in global search results. New search type: `superboss`. Each entry navigates to `/superbosses` and programmatically scrolls to the boss section (using the same scroll-to-element approach as chapter pages — the app uses `createHashRouter`, so native anchor fragments won't work).

### Image Assets Needed

- **Dark Aeon portraits**: Dark Valefor, Dark Ifrit, Dark Ixion, Dark Shiva, Dark Bahamut, Dark Yojimbo, Dark Anima, Dark Cindy, Dark Sandy, Dark Mindy — to be sourced during implementation
- **Penance portrait**: Already exists at `img/bosses/penance.png`
- **Nemesis portrait**: Already exists at `img/bosses/arena/Nemesis.png`
- **Guide screenshots**: `image_0085_00.jpeg` and `image_0086_00.jpeg` already extracted (Monster Arena tables)
- **Region maps**: All exist — `besaid village.png`, `Sanubia Desert.png`, `Thunder Plains.png`, `Macalania Temple.png`, `Zanarkand Ruins.png`, `Cavern of the Stolen Fayth.png`, `Gagazet Outside.png`, `MRR.png`

### Tracking

- Defeat checkbox on each boss via `useCheckbox`, scoped to active save slot
- Total trackable entries: 14 (11 Dark Aeon cards + Penance body + Penance arms + Nemesis)
- Progress shown in drawer entry (e.g. "3/14 defeated")
- Superbosses are independent of the 27-chapter story progress — they don't affect the main story completion percentage
- If Dark Aeon portraits cannot be sourced, `BossCard`'s existing `onError` handler hides the image gracefully — the card still works without a portrait

---

## 2. Image Lazy Loading

### Approach

Add `loading="lazy"` attribute to all `<img>` tags across the app.

### Exception

The landing page hero background image loads eagerly (above the fold, first thing visible).

### Components to Update

Every component that renders `<img>` tags, including but not limited to:
- `BossCard` (boss portraits)
- `GuideImages` (guide screenshots/thumbnails)
- `SubLocation` (region maps)
- `ChapterHeader` (chapter images)
- `ChapterNav` (thumbnail previews)
- `CelestialTracker`, `AeonTracker`, `PrimerList` (collectible images)
- `LandingPage` (except hero image)
- New Superbosses page images

### What This Is NOT

- No `IntersectionObserver` wrapper component
- No placeholder/skeleton UI
- No fade-in transitions
- No JavaScript — purely the native HTML attribute

---

## 3. Responsive Testing & Fixes

### Target Viewports

| Device | Viewport | Orientation | Priority |
|--------|----------|-------------|----------|
| iPad Pro 11" M1 | 1194 x 834 | Landscape | Primary |
| MacBook Pro 14" | ~1512 x 982 | Landscape | Secondary |
| iPhone 15 | 393 x 852 | Portrait | Tertiary |

### iPad Pro 11" (Primary — Verification)

Already built for this viewport. Systematic verification sweep across all pages:
- Landing page
- Chapter pages (test a few: early, mid, late game)
- Collectibles Hub
- Settings
- Superbosses page (new)

Check: drawer open/close, TOC scroll-spy, BossCard expand/collapse, search dropdown, QRP slide-in, pyrefly overlay, checkbox interactions, touch targets.

### MacBook Pro 14" (Secondary — Minor Fixes)

Wider viewport, mostly expected to work. Likely fixes:
- Add `max-w` constraints if content stretches too wide
- Verify drawer and TOC spacing doesn't look too loose
- Ensure search dropdown and QRP don't float awkwardly with extra space

### iPhone 15 (Tertiary — Usable, Not Pixel-Perfect)

Smallest viewport, most fixes needed. Goal is "usable and not broken", not a polished mobile experience:
- **TOC sidebar**: Hide by default (no room alongside content)
- **Chapter drawer**: Full-screen overlay instead of side-by-side
- **Header search**: May need to collapse behind a search icon
- **BossCards & item lists**: Stack vertically
- **Collectible trackers**: Adapt grid layouts to single column
- **Landing page**: Reposition corner card for narrow viewport
- **Highwind font**: May need size scaling for narrow screens (maintain minimum 24px readability rule)

### CSS Approach

Use Tailwind responsive prefixes for breakpoints:
- `sm:` (640px) — iPhone threshold
- `md:` (768px) — iPad/tablet threshold
- `lg:` (1024px) — Desktop threshold

### Testing Approach

Systematic page-by-page testing at each viewport using browser dev tools or preview. Fix layout-breaking issues as they're found. iPad is the bar for "polished", MacBook and iPhone are the bar for "functional".

### Route Registration

Add `/superbosses` route to `main.jsx` alongside the existing 4 routes (landing, chapter, collectibles, settings).
