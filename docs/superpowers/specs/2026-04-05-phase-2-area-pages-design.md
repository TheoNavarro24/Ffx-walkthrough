# Phase 2: Area Page Components — Design Spec

**Date:** 2026-04-05
**Scope:** Build steps 14–28 (component work only; content authored in Phase 2.5)
**Approach:** Outside-in — ChapterPage shell first, then sections top-to-bottom

---

## Layout Constraints

- **Top bar:** Fixed 48px header (AppShell, already built) — logo, search bar, hamburger
- **Left drawer:** Fixed-width chapter navigation (AppShell, already built) — max ~15% of screen width
- **Right TOC:** Fixed-width sticky section navigator — max ~10% of screen width
- **Content column:** Takes all remaining space; must always occupy **≥ 70% of total screen width**
- Target device: iPad Pro 11" M1 landscape (1194px wide)

---

## Component Architecture

`ChapterPage` is the assembly component. It loads the chapter's data file and renders sections in order:

```
ChapterPage
├── MissableAlert          — red banner; only renders when chapter has missables
├── ChapterHeader          — region map thumbnail, chapter name, act label, PartyIndicator
├── [Walkthrough section]
│   └── SubLocation ×N    — collapsible by sub-area; each contains prose + ItemList
├── SphereGridTip          — inline tip; only renders when chapter has SG data
├── OakaReminder           — donation card; only renders when O'aka is present
├── [Boss section]
│   └── BossCard ×N       — compact (name, HP, weakness) → expanded (strategy, steals/drops, image)
├── [Cloister section]
│   └── CloisterSection   — map image + step list; only renders at temple chapters
└── ChapterNav             — prev/next chapter cards with thumbnail and progress bar
```

`TableOfContents` lives in the AppShell's sticky right slot (stub already exists). `useScrollSpy` watches section anchor elements and highlights the active TOC item as the user scrolls.

---

## Data Layer

### Per-chapter JSON files

Location: `spira-guide/src/data/chapters/{slug}.json` (27 files total, created in Phase 2.5)

Schema:

```json
{
  "slug": "besaid",
  "missables": ["Rod of Wisdom — Destruction Sphere, Besaid Temple"],
  "party": ["Tidus", "Wakka", "Lulu", "Yuna"],
  "oaka": {
    "meeting": true,
    "cumulativeTarget": 1001
  },
  "sgTip": "Unlock NulBlaze/NulShock before leaving.",
  "subLocations": [
    {
      "name": "Beach",
      "prose": "Head east — Moon Crest is in the alcove. Dark Valefor blocks return.",
      "items": [
        { "id": "besaid-moon-crest", "name": "Moon Crest", "icon": "moon-crest", "missable": true },
        { "id": "besaid-antidote", "name": "Antidote", "icon": "antidote", "missable": false }
      ]
    }
  ],
  "bosses": ["valefor"],
  "cloister": null,
  "optionalAreas": []
}
```

Field notes:

- `bosses` — array of slug strings; full stats and strategy text resolved from `monsters.json` via `bossBySlug.js`. Boss checkbox ids are derived as `"{chapterSlug}-boss-{bossSlug}"` (e.g. `"besaid-boss-valefor"`). `BossCard` uses `useCheckbox` with this id so defeated bosses can be checked off.
- `cloister` — slug string pointing to a cloister data file (see below), or `null`
- `oaka` — `null` if O'aka doesn't appear in this chapter. `cumulativeTarget` is the running total of gil donated across all O'aka meetings so far; `OakaReminder` uses it to show how much to donate at this meeting to cross the next pricing tier
- `sgTip` — `null` if no tip for this chapter
- `optionalAreas` — array of sub-section objects (same shape as `subLocations`) for post-game optional content; empty array if none. Used by the Airship chapter to house Remiem, Baaj revisit, Omega Ruins, etc.

### O'aka donation tiers

O'aka's shop pricing is determined by total cumulative gil donated across all meetings:

| Cumulative gil donated | Shop prices |
|---|---|
| 0 – 100 | 130% (surcharge) |
| 101 – 1,000 | 110% |
| 1,001 – 10,000 | 100% (standard) |
| 10,001+ | 80% (discount) |

`OakaReminder` shows the user their running total and how much more to donate to reach the next tier.

### Cloister data files

Location: `spira-guide/src/data/cloisters/{slug}.json`

Schema:

```json
{
  "slug": "besaid",
  "name": "Besaid Cloister of Trials",
  "mapImage": "/img/maps/cloisters/besaid.png",
  "destructionSphere": "Rod of Wisdom",
  "missable": true,
  "steps": [
    "Take the Besaid Sphere from the recess in the wall.",
    "Insert it into the slot next to the door — door opens.",
    "Take the Glyph Sphere from the pedestal.",
    "Insert the Glyph Sphere into the recess to reveal a hidden door.",
    "Take the Destruction Sphere — opens the treasure chest with Rod of Wisdom."
  ]
}
```

Cloister files are authored in Phase 2.5 (step 36). During Phase 2 development, a stub file for Besaid is created alongside the chapter stub.

### Chapter progress utility

File: `spira-guide/src/hooks/useChapterProgress.js`

Returns `{ checked, total }` for any chapter slug by loading that chapter's JSON and counting all checkable item and boss ids, then cross-referencing with `useCheckbox`. Used by `ChapterNav` to render progress bars on adjacent chapters.

- If a chapter's JSON file does not exist yet (pre-Phase 2.5), `total` returns 0 and `checked` returns 0 — ChapterNav shows an empty progress bar rather than erroring.

### chapterIndex.js shape

File: `spira-guide/src/data/chapterIndex.js` (built in Phase 1)

Exports:

- `chapters` — array of `{ slug, name, act, mapImage }` objects for all 27 chapters in story order
- `getChapterBySlug(slug)` — returns a single chapter object by slug
- `getChaptersByAct(act)` — returns all chapters for a given act number (1–4)
- `ACT_NAMES` — map of `{ 1: "Act 1: ...", 2: ..., 3: ..., 4: ... }` display strings

`ChapterPage` uses `getChapterBySlug` to resolve route params. `ChapterNav` uses `chapters` to find the previous and next entries by index.

### Boss resolver utility

File: `spira-guide/src/data/bossBySlug.js`

A simple lookup that imports `monsters.json` and exports a function `getBoss(slug)` returning the matching boss object. Built in Phase 2 alongside BossCard so components never import the full monsters list directly.

### Existing data sources

- Boss stats: `docs/source-data/monsters.json` (authoritative, game-mined)
- Item descriptions: `docs/source-data/items.json`
- Primers: `docs/source-data/primers.json`
- Chapter index: `spira-guide/src/data/chapterIndex.js`

### Development stub

A single real data file for Besaid (`besaid.json`) plus a Besaid cloister stub are created at the start of Phase 2 and used across all component development. All other chapters fall back gracefully until Phase 2.5 populates them.

---

## State Management

### useCheckbox hook

File: `spira-guide/src/hooks/useCheckbox.js`

Persists checkbox state to localStorage:

- Each checkable item has a globally unique `id` string (e.g. `"besaid-moon-crest"`)
- The hook maintains a flat map `{ [id]: boolean }` in localStorage under the key `"spira-checks"`
- Exposes `isChecked(id)`, `toggle(id)`, and `checkedCount(ids)` (accepts a string array, returns count of checked items)
- Phase 4 upgrades the hook internals to support named save slots; no component changes required

### useLocalStorage hook

File: `spira-guide/src/hooks/useLocalStorage.js`

A general-purpose hook used for any persistent UI state that is not checkbox data (e.g. SubLocation collapse state). Wraps `useState` with lazy init from `localStorage` and debounced writes.

- SubLocation collapse state is keyed to `"subloc-{slug}-{name}"`
- Used by other phases for drawer state, settings, etc.

---

## Component Inventory

| Component | File | Notes |
|---|---|---|
| `ChapterPage` | `src/pages/ChapterPage.jsx` | Stub exists; replace with full implementation |
| `useScrollSpy` | `src/hooks/useScrollSpy.js` | New |
| `useCheckbox` | `src/hooks/useCheckbox.js` | New |
| `useLocalStorage` | `src/hooks/useLocalStorage.js` | New |
| `TableOfContents` | `src/components/Layout/TableOfContents.jsx` | Stub exists; wire up with useScrollSpy |
| `ChapterHeader` | `src/components/ChapterHeader.jsx` | New |
| `SubLocation` | `src/components/SubLocation.jsx` | New |
| `ItemList` | `src/components/ItemList.jsx` | New |
| `MissableAlert` | `src/components/MissableAlert.jsx` | New |
| `BossCard` | `src/components/BossCard.jsx` | New |
| `PartyIndicator` | `src/components/PartyIndicator.jsx` | New |
| `OakaReminder` | `src/components/OakaReminder.jsx` | New |
| `SphereGridTip` | `src/components/SphereGridTip.jsx` | New |
| `CloisterSection` | `src/components/CloisterSection.jsx` | New |
| `ChapterNav` | `src/components/ChapterNav.jsx` | New |
| `bossBySlug` | `src/data/bossBySlug.js` | New utility |
| `useChapterProgress` | `src/hooks/useChapterProgress.js` | New |

---

## Build Order

Outside-in: get a working page visible on device as early as possible, then layer in sections.

1. **Schema + stub data** — define JSON schema, create `besaid.json` and `cloisters/besaid.json` dev stubs
2. **ChapterPage shell** — layout skeleton with section anchors, loads chapter data
3. **useScrollSpy + TableOfContents** — sticky right sidebar wired to scroll position
4. **useLocalStorage hook** — general persistence utility used by SubLocation and others
5. **SubLocation + ItemList** — collapsible groups with item rows and SD icon placeholders
6. **useCheckbox hook** — localStorage persistence; wire into ItemList
7. **"Show unchecked only" toggle** — filter within ItemList
8. **MissableAlert** — red banner at page top
9. **bossBySlug utility** — boss slug resolver; imports monsters.json
10. **BossCard** — compact → expanded; pulls from bossBySlug
11. **ChapterHeader + PartyIndicator** — map thumbnail, chapter name, act, party portraits
12. **OakaReminder** — donation tier card using cumulativeTarget from chapter data
13. **SphereGridTip** — inline milestone text
14. **CloisterSection** — map image + step list from cloister data file
15. **ChapterNav + useChapterProgress** — prev/next cards with thumbnail; progress bars use useChapterProgress to show checked/total for adjacent chapters
16. **Optional areas** — render optionalAreas array as additional SubLocation groups under Airship chapter

---

## Out of Scope for Phase 2

- Walkthrough prose (Phase 2.5)
- Populating all 27 chapter JSON files (Phase 2.5)
- Cloister solutions for all 6 temples (Phase 2.5)
- Named save slots (Phase 4)
- Checkbox sync with Collectibles Hub (Phase 3)
- Search index integration (Phase 5)
- Pyrefly animations (Phase 6)
