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
├── [Cloister section]     — map image + step-by-step solution; only renders at temple chapters
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
  "oaka": { "meeting": true, "donationTier": 1001 },
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
  "cloister": null
}
```

- `bosses` — array of slugs; full stats and strategy text resolved from `monsters.json`
- `cloister` — slug pointing to a cloister data file, or `null`
- `oaka` — `null` if O'aka doesn't appear in this chapter
- `sgTip` — `null` if no tip for this chapter

### Development stub

A single real data file for Besaid (`besaid.json`) is created at the start of Phase 2 and used across all component development. All other 26 chapters fall back to this file until Phase 2.5 populates them.

### Existing data sources

- Boss stats: `docs/source-data/monsters.json` (authoritative, game-mined)
- Item descriptions: `docs/source-data/items.json`
- Primers: `docs/source-data/primers.json`
- Chapter index: `spira-guide/src/data/chapterIndex.js`

---

## State Management

### useCheckbox hook

A thin hook at `spira-guide/src/hooks/useCheckbox.js` persists checkbox state to localStorage:

- Each checkable item has a globally unique `id` string (e.g. `"besaid-moon-crest"`)
- The hook maintains a flat map `{ [id]: boolean }` in localStorage under the key `"spira-checks"`
- Exposes `isChecked(id)`, `toggle(id)`, and `checkedCount(ids[])` utilities
- Phase 4 upgrades the hook internals to support named save slots; no component changes required

### SubLocation collapse state

Each SubLocation tracks its own open/closed state via `useLocalStorage` keyed to `"subloc-{slug}-{name}"`, so collapse state persists across navigation.

---

## Component Inventory

| Component | File | Notes |
|---|---|---|
| `ChapterPage` | `src/pages/ChapterPage.jsx` | Stub exists; replace with full implementation |
| `useScrollSpy` | `src/hooks/useScrollSpy.js` | New hook |
| `TableOfContents` | `src/components/Layout/TableOfContents.jsx` | Stub exists; wire up with useScrollSpy |
| `SubLocation` | `src/components/SubLocation.jsx` | New |
| `ItemList` | `src/components/ItemList.jsx` | New |
| `MissableAlert` | `src/components/MissableAlert.jsx` | New |
| `BossCard` | `src/components/BossCard.jsx` | New |
| `PartyIndicator` | `src/components/PartyIndicator.jsx` | New |
| `OakaReminder` | `src/components/OakaReminder.jsx` | New |
| `SphereGridTip` | `src/components/SphereGridTip.jsx` | New |
| `CloistersSection` | `src/components/CloisterSection.jsx` | New |
| `ChapterNav` | `src/components/ChapterNav.jsx` | New |
| `useCheckbox` | `src/hooks/useCheckbox.js` | New |

---

## Build Order

Outside-in: get a working page visible on device as early as possible, then layer in sections.

1. **Schema + stub data** — define JSON schema, create `besaid.json` dev file
2. **ChapterPage shell** — layout skeleton with section anchors, loads chapter data
3. **useScrollSpy + TableOfContents** — sticky right sidebar wired to scroll position
4. **SubLocation + ItemList** — collapsible groups with checkboxes and item icons
5. **useCheckbox hook** — localStorage persistence; wire into ItemList
6. **"Show unchecked only" toggle** — filter within ItemList
7. **MissableAlert** — red banner at page top
8. **BossCard** — compact → expanded; pulls from monsters.json
9. **Boss-to-chapter mapping** — resolves boss slugs to chapter data
10. **PartyIndicator** — character portrait icons
11. **OakaReminder** — donation tier cards
12. **SphereGridTip** — inline milestone text
13. **CloisterSection** — map image + step list
14. **ChapterNav** — prev/next cards with progress bar
15. **Optional areas** — sub-sections under Airship chapter

---

## Out of Scope for Phase 2

- Walkthrough prose (Phase 2.5)
- Populating all 27 chapter JSON files (Phase 2.5)
- Named save slots (Phase 4)
- Checkbox sync with Collectibles Hub (Phase 3)
- Search index integration (Phase 5)
- Pyrefly animations (Phase 6)
