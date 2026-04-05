# Phase 2.5: Content Population Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate all 26 chapter JSON files with walkthrough prose, items, boss strategies, missable flags, party data, O'aka data, and Sphere Grid tips — making every chapter page renderable with real content.

**Architecture:** Each chapter is a self-contained JSON in `spira-guide/src/data/chapters/`. Boss strategies live inline in each chapter's `bosses` array. **Walkthrough prose is sourced from the BradyGames Official Strategy Guide**, extracted from `docs/official-guide/brady-guide.xml` (DAISY XML format). Two files already exist (`besaid.json`, `airship.json`) and need schema updates; 24 new files need creating.

**Tech Stack:** JSON (Vite static imports), React dev server (`npm run dev` in `spira-guide/`) for visual verification.

---

## Prerequisites

Phase 2 components (ChapterPage, SubLocation, ItemList, BossCard) should be substantially built before running dev-server verification steps. If Phase 2 is incomplete, you can still create and validate all JSON files — skip dev-server checks and come back to them.

---

## Schema Reference

All chapter files follow this shape (note: `bosses` is an **object array**, not a string array):

```json
{
  "slug": "chapter-slug",
  "missables": ["Human-readable description of each missable item"],
  "party": ["Character1", "Character2"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 },
  "sgTip": "Sphere Grid tip string, or null",
  "subLocations": [
    {
      "name": "Sub-area Name",
      "prose": "1-2 sentence narrative.",
      "guideImages": ["image_NNNN_NN.jpeg"],
      "items": [
        { "id": "unique-id", "name": "Item Name", "icon": "icon-name", "missable": false }
      ]
    }
  ],
  "bosses": [
    { "slug": "boss-slug", "strategy": "Strategy text for veteran player." }
  ],
  "cloister": "slug-or-null",
  "optionalAreas": [
    {
      "name": "Optional Area Name",
      "prose": "How to reach it and what's here.",
      "guideImages": ["image_NNNN_NN.jpeg"],
      "items": []
    }
  ]
}
```

> **Note:** `guideImages` is optional on both `subLocations` and `optionalAreas` objects. Omit the field entirely on sub-locations that have no paired screenshots. The component renders text → images → items in vertical order.

---

## File Structure

**Modify** (existing files):
- `spira-guide/src/data/chapters/besaid.json` — upgrade bosses from string array to object array
- `spira-guide/src/data/chapters/airship.json` — add Evrae boss, expand optionalAreas

**Create** (24 new files):
- `spira-guide/src/data/chapters/zanarkand.json`
- `spira-guide/src/data/chapters/baaj-temple.json`
- `spira-guide/src/data/chapters/ss-liki.json`
- `spira-guide/src/data/chapters/kilika.json`
- `spira-guide/src/data/chapters/ss-winno.json`
- `spira-guide/src/data/chapters/luca.json`
- `spira-guide/src/data/chapters/miihen-highroad.json`
- `spira-guide/src/data/chapters/mushroom-rock-road.json`
- `spira-guide/src/data/chapters/djose.json`
- `spira-guide/src/data/chapters/moonflow.json`
- `spira-guide/src/data/chapters/guadosalam.json`
- `spira-guide/src/data/chapters/thunder-plains.json`
- `spira-guide/src/data/chapters/macalania-woods.json`
- `spira-guide/src/data/chapters/lake-macalania.json`
- `spira-guide/src/data/chapters/bikanel-desert.json`
- `spira-guide/src/data/chapters/home.json`
- `spira-guide/src/data/chapters/bevelle.json`
- `spira-guide/src/data/chapters/via-purifico.json`
- `spira-guide/src/data/chapters/highbridge.json`
- `spira-guide/src/data/chapters/calm-lands.json`
- `spira-guide/src/data/chapters/mt-gagazet.json`
- `spira-guide/src/data/chapters/zanarkand-dome.json`
- `spira-guide/src/data/chapters/airship-sin.json`
- `spira-guide/src/data/chapters/inside-sin.json`

---

## Task 0.5: Extract EPUB Guide Images

Extract BradyGames walkthrough screenshots from the EPUB into `public/img/guide/` so the app can display them inline with chapter content.

**Files:**
- Create: `spira-guide/public/img/guide/` (directory + JPEG files)

**Context:** The EPUB at `Official Strategy Guide/Final Fantasy X-X2 HD Remaster Official Strategy Guide (BradyGames).epub` contains pre-extracted JPEGs named `image_NNNN_NN.jpeg` (where NNNN = guide page number). FFX walkthrough images span pages 23–74. Not all pages have images; only pages with in-game screenshots are included.

- [x] **Step 1: Create the destination directory**

```bash
mkdir -p spira-guide/public/img/guide
```

- [x] **Step 2: Extract FFX walkthrough images from the EPUB**

```bash
cd "/Users/theonavarro/FFX walkthrough/Official Strategy Guide"
unzip -j "Final Fantasy X-X2 HD Remaster Official Strategy Guide (BradyGames).epub" \
  "EPUB/image_0023_00.jpeg" \
  "EPUB/image_0024_00.jpeg" "EPUB/image_0024_01.jpeg" \
  "EPUB/image_0025_00.jpeg" \
  "EPUB/image_0026_00.jpeg" \
  "EPUB/image_0027_00.jpeg" \
  "EPUB/image_0029_00.jpeg" \
  "EPUB/image_0031_00.jpeg" \
  "EPUB/image_0032_00.jpeg" "EPUB/image_0032_01.jpeg" \
  "EPUB/image_0034_00.jpeg" "EPUB/image_0034_01.jpeg" \
  "EPUB/image_0035_00.jpeg" \
  "EPUB/image_0036_00.jpeg" "EPUB/image_0036_01.jpeg" \
  "EPUB/image_0037_00.jpeg" "EPUB/image_0037_01.jpeg" \
  "EPUB/image_0039_00.jpeg" \
  "EPUB/image_0040_00.jpeg" \
  "EPUB/image_0041_00.jpeg" \
  "EPUB/image_0042_00.jpeg" \
  "EPUB/image_0044_00.jpeg" \
  "EPUB/image_0046_00.jpeg" \
  "EPUB/image_0047_00.jpeg" \
  "EPUB/image_0048_00.jpeg" "EPUB/image_0048_01.jpeg" \
  "EPUB/image_0049_00.jpeg" \
  "EPUB/image_0051_00.jpeg" "EPUB/image_0051_01.jpeg" \
  "EPUB/image_0052_00.jpeg" \
  "EPUB/image_0053_00.jpeg" \
  "EPUB/image_0054_00.jpeg" "EPUB/image_0054_01.jpeg" \
  "EPUB/image_0056_00.jpeg" \
  "EPUB/image_0058_00.jpeg" \
  "EPUB/image_0059_00.jpeg" \
  "EPUB/image_0060_00.jpeg" "EPUB/image_0060_01.jpeg" \
  "EPUB/image_0061_00.jpeg" \
  "EPUB/image_0062_00.jpeg" "EPUB/image_0062_01.jpeg" \
  "EPUB/image_0064_00.jpeg" \
  "EPUB/image_0065_00.jpeg" "EPUB/image_0065_01.jpeg" \
  "EPUB/image_0066_00.jpeg" \
  "EPUB/image_0067_00.jpeg" \
  "EPUB/image_0068_00.jpeg" "EPUB/image_0068_01.jpeg" "EPUB/image_0068_02.jpeg" "EPUB/image_0068_03.jpeg" \
  "EPUB/image_0069_00.jpeg" \
  "EPUB/image_0071_00.jpeg" "EPUB/image_0071_01.jpeg" \
  "EPUB/image_0072_00.jpeg" \
  "EPUB/image_0073_00.jpeg" \
  "EPUB/image_0074_00.jpeg" \
  -d "../spira-guide/public/img/guide"
```

Expected: ~55 JPEG files extracted to `spira-guide/public/img/guide/`

- [x] **Step 3: Verify extraction**

```bash
ls spira-guide/public/img/guide/ | wc -l
```

Expected: `55` (approximately — exact count depends on which pages have images)

- [x] **Step 4: Commit**

```bash
git add spira-guide/public/img/guide/
git commit -m "feat(assets): extract BradyGames guide screenshots for inline display"
```

---

## Task 0: Update besaid.json — Upgrade Bosses Schema

The existing `besaid.json` uses `"bosses": ["valefor"]` (string array). All chapter files must use object arrays for consistency with ChapterPage/BossCard components.

**Files:**
- Modify: `spira-guide/src/data/chapters/besaid.json`

- [x] **Step 1: Open the file and replace the bosses field**

Replace:
```json
"bosses": ["valefor"],
```
With:
```json
"bosses": [
  {
    "slug": "valefor",
    "strategy": "Valefor is obtained here, not fought as an enemy. No strategy needed — this entry exists for tracking purposes."
  }
],
```

- [x] **Step 2: Also add guideImages to the "Beach" sub-location** (inside the subLocations array, after `"prose"`)

In the `besaid.json` file, find the "Beach" sub-location and add:
```json
"guideImages": ["image_0027_00.jpeg"],
```
between the `"prose"` and `"items"` fields.

- [x] **Step 3: Validate JSON is still valid**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/besaid.json','utf8')); console.log('valid')"
```
Expected: `valid`

- [x] **Step 4: Commit**

```bash
git add spira-guide/src/data/chapters/besaid.json
git commit -m "refactor: upgrade besaid.json bosses to object array schema, add guideImages"
```

---

## Task 1: zanarkand.json

**Files:**
- Create: `spira-guide/src/data/chapters/zanarkand.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "zanarkand",
  "missables": [],
  "party": ["Tidus"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Dream Zanarkand",
      "prose": "Tutorial section — watch cutscenes and follow Auron. The blitzball match vs the Goers is scripted. After Sin attacks, Sinspawn Ammes ambushes the stadium.",
      "guideImages": ["image_0023_00.jpeg"],
      "items": []
    }
  ],
  "bosses": [
    {
      "slug": "sinspawn-ammes",
      "strategy": "Tutorial fight. Attack with Tidus; Auron finishes it with a scripted Overdrive. No strategy needed."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/zanarkand.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/zanarkand.json
git commit -m "feat(content): add zanarkand chapter data"
```

---

## Task 2: baaj-temple.json

Covers the Submerged Ruins (Klikk fight) and Salvage Ship (Tros fight, Primer I).

**Files:**
- Create: `spira-guide/src/data/chapters/baaj-temple.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "baaj-temple",
  "missables": [],
  "party": ["Tidus"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Submerged Ruins",
      "prose": "Swim through the flooded corridors collecting chests before each boss. Klikk ambushes from the water — Rikku appears as AI support. Tros is tougher; stay mobile and use Spiral Cut when available.",
      "guideImages": ["image_0024_00.jpeg", "image_0024_01.jpeg", "image_0025_00.jpeg"],
      "items": [
        { "id": "baaj-2-potions", "name": "Potion ×2", "icon": "potion", "missable": false },
        { "id": "baaj-200-gil", "name": "200 Gil", "icon": "gil", "missable": false },
        { "id": "baaj-hi-potion-1", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "baaj-x-potion", "name": "X-Potion", "icon": "x-potion", "missable": false },
        { "id": "baaj-ether", "name": "Ether", "icon": "ether", "missable": false },
        { "id": "baaj-hi-potion-2", "name": "Hi-Potion", "icon": "hi-potion", "missable": false }
      ]
    },
    {
      "name": "Salvage Ship",
      "prose": "After Tros, the Al Bhed crew rescues you. Grab the Primer off the ship's deck — it's sitting on the ground at the back.",
      "items": [
        { "id": "baaj-ship-200-gil", "name": "200 Gil", "icon": "gil", "missable": false },
        { "id": "baaj-ship-potion-2", "name": "Potion ×2", "icon": "potion", "missable": false },
        { "id": "baaj-ship-3-potions", "name": "Potion ×3", "icon": "potion", "missable": false },
        { "id": "baaj-primer-i", "name": "Al Bhed Primer Vol. I", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "klikk",
      "strategy": "Rikku joins mid-fight as AI. Just attack with Tidus — Klikk has 1,500 HP and dies fast. No special mechanics."
    },
    {
      "slug": "tros",
      "strategy": "Watch for Nautilus Charge: Tros retreats, then rushes — move to the Retreat position (corner prompt) to dodge it. Use Spiral Cut when available. Focus the body; arms regenerate HP if ignored but are a low priority. HP: 2,200."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/baaj-temple.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/baaj-temple.json
git commit -m "feat(content): add baaj-temple chapter data (Klikk, Tros)"
```

---

## Task 3: ss-liki.json

**Files:**
- Create: `spira-guide/src/data/chapters/ss-liki.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "ss-liki",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 },
  "sgTip": "Prioritize NulBlaze and NulShock for Yuna — they trivialise the upcoming Sinspawn fights.",
  "subLocations": [
    {
      "name": "S.S. Liki",
      "prose": "Meet O'aka and donate toward the 1,001 Gil cumulative target for mid-tier discounts. The Potion suitcase on the main deck can be kicked multiple times for up to 20 Potions — worth doing. Primer III is in the Power Room at the back.",
      "guideImages": ["image_0026_00.jpeg", "image_0029_00.jpeg"],
      "items": [
        { "id": "liki-remedy", "name": "Remedy", "icon": "remedy", "missable": false },
        { "id": "liki-potions-20", "name": "Potion (up to ×20, kick suitcase repeatedly)", "icon": "potion", "missable": false },
        { "id": "liki-primer-iii", "name": "Al Bhed Primer Vol. III", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "sin-fin",
      "strategy": "Sin's Fin appears on deck first. Focus attacks on it — no special mechanics. HP: 2,000."
    },
    {
      "slug": "sinspawn-echuilles",
      "strategy": "Drain Touch is nasty — keep HP above 200. Have Yuna heal each round. Sin's Fin may return; deal with Echuilles first to end the fight. NulBlaze/NulShock from Yuna blocks the elemental damage. HP: 2,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/ss-liki.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/ss-liki.json
git commit -m "feat(content): add ss-liki chapter data"
```

---

## Task 4: kilika.json

Contains two permanently missable Destruction Sphere items.

**Files:**
- Create: `spira-guide/src/data/chapters/kilika.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "kilika",
  "missables": [
    "Red Armlet — Destruction Sphere chest, Kilika Temple. Cannot return to Kilika Temple after leaving — this is permanently missable."
  ],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 },
  "sgTip": null,
  "subLocations": [
    {
      "name": "Kilika Port",
      "prose": "Help the NPCs after the Sin attack. The Ether is only available if you rescue the child from the crumbling hut. Rest at the inn to restore HP/MP.",
      "guideImages": ["image_0031_00.jpeg"],
      "items": [
        { "id": "kilika-ether", "name": "Ether", "icon": "ether", "missable": false },
        { "id": "kilika-primer-iv", "name": "Al Bhed Primer Vol. IV", "icon": "primer", "missable": false },
        { "id": "kilika-3-potions", "name": "Potion ×3", "icon": "potion", "missable": false }
      ]
    },
    {
      "name": "Kilika Woods",
      "prose": "Linear path with side branches. Lord Ochu is an optional east-side fight — very tough at this stage (4,649 HP) but Luzzu gives an Elixir if you win. The Scout blitzball item is on a hidden side path west of the main road.",
      "items": [
        { "id": "kilika-2-mana-spheres", "name": "Mana Sphere ×2", "icon": "mana-sphere", "missable": false },
        { "id": "kilika-scout", "name": "Scout (Wakka's blitzball)", "icon": "scout", "missable": false },
        { "id": "kilika-remedy", "name": "Remedy", "icon": "remedy", "missable": false },
        { "id": "kilika-luck-sphere", "name": "Luck Sphere", "icon": "luck-sphere", "missable": false },
        { "id": "kilika-hi-potion", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "kilika-elixir", "name": "Elixir (from Luzzu after Lord Ochu — optional)", "icon": "elixir", "missable": false }
      ]
    },
    {
      "name": "Kilika Temple",
      "prose": "Complete the Cloister of Trials. Before leaving, activate the Destruction Sphere to open the hidden chest containing the Red Armlet. You cannot return once you exit — this is permanently missable.",
      "guideImages": ["image_0032_00.jpeg", "image_0032_01.jpeg"],
      "items": [
        { "id": "kilika-red-armlet", "name": "Red Armlet (Destruction Sphere — MISSABLE)", "icon": "red-armlet", "missable": true }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "lord-ochu",
      "strategy": "Optional fight in Kilika Woods. Very difficult at this stage — 4,649 HP, can inflict Sleep. Fire spells from Lulu are effective. Reward: Elixir from Luzzu. Skip if underleveled."
    },
    {
      "slug": "sinspawn-geneaux",
      "strategy": "Phase 1 (shell form, 3,000 HP): Only magic penetrates the shell body. Kill both tentacles first (450 HP each) — they heal Geneaux every turn. Lulu's Fury with Thunder is ideal. Phase 2 (exposed): Physical attacks work. Yuna heals, Wakka and Tidus attack. Stay above 300 HP to survive Venom."
    }
  ],
  "cloister": "kilika",
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/kilika.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/kilika.json
git commit -m "feat(content): add kilika chapter data with missable Red Armlet warning"
```

---

## Task 5: ss-winno.json

**Files:**
- Create: `spira-guide/src/data/chapters/ss-winno.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "ss-winno",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 },
  "sgTip": null,
  "subLocations": [
    {
      "name": "S.S. Winno",
      "prose": "Short chapter — mostly story. Grab the two Hi-Potions and the Primer on deck. The Jecht Shot mini-game is on the deck: match the timing prompts to learn Jecht Shot. You can save before and reload if you miss it — worth learning.",
      "items": [
        { "id": "winno-hi-potion-1", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "winno-hi-potion-2", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "winno-primer-v", "name": "Al Bhed Primer Vol. V", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/ss-winno.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/ss-winno.json
git commit -m "feat(content): add ss-winno chapter data"
```

---

## Task 6: luca.json

**Files:**
- Create: `spira-guide/src/data/chapters/luca.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "luca",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Dock Area",
      "prose": "Explore before the blitzball tournament. Dock 5 has a hidden squeeze through crates — gives Magic Sphere + HP Sphere. The Tidal Spear is a good upgrade for Kimahri.",
      "guideImages": ["image_0034_00.jpeg", "image_0034_01.jpeg", "image_0035_00.jpeg"],
      "items": [
        { "id": "luca-600-gil", "name": "600 Gil", "icon": "gil", "missable": false },
        { "id": "luca-tidal-spear", "name": "Tidal Spear (Kimahri)", "icon": "tidal-spear", "missable": false },
        { "id": "luca-phoenix-down-2", "name": "Phoenix Down ×2", "icon": "phoenix-down", "missable": false },
        { "id": "luca-magic-sphere", "name": "Magic Sphere", "icon": "magic-sphere", "missable": false },
        { "id": "luca-hp-sphere", "name": "HP Sphere", "icon": "hp-sphere", "missable": false }
      ]
    },
    {
      "name": "Luca Stadium",
      "prose": "Two Primers in the stadium. Oblitzerator is fought mid-tournament with only Tidus and Lulu — use the crane 3 times. After the tournament, Auron permanently joins.",
      "guideImages": ["image_0036_00.jpeg", "image_0036_01.jpeg"],
      "items": [
        { "id": "luca-primer-vi", "name": "Al Bhed Primer Vol. VI", "icon": "primer", "missable": false },
        { "id": "luca-2-hi-potions", "name": "Hi-Potion ×2", "icon": "hi-potion", "missable": false },
        { "id": "luca-primer-vii", "name": "Al Bhed Primer Vol. VII", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "oblitzerator",
      "strategy": "Use the crane interact prompt 3 times while Lulu casts Thunder after each one. After 3 hits, finish it off. Lulu's Fury (Thunder) is ideal if you have it charged. HP: 6,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/luca.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/luca.json
git commit -m "feat(content): add luca chapter data (Oblitzerator, Auron joins)"
```

---

## Task 7: miihen-highroad.json

**Files:**
- Create: `spira-guide/src/data/chapters/miihen-highroad.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "miihen-highroad",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"],
  "oaka": { "meeting": true, "cumulativeTarget": 10001 },
  "sgTip": "Auron is now permanent. Prioritize Power Break and Armor Break on his grid — they're invaluable from here through the endgame.",
  "subLocations": [
    {
      "name": "Mi'ihen Highroad South",
      "prose": "Talk to every NPC — most give items freely. The Ice Brand is behind the ruined building on the left. Give the kid 3 Softs only if you DON'T kick the blitzball. The Red Ring (Silence Ward) goes to Yuna.",
      "guideImages": ["image_0037_00.jpeg", "image_0037_01.jpeg"],
      "items": [
        { "id": "miihen-remedy", "name": "Remedy", "icon": "remedy", "missable": false },
        { "id": "miihen-red-ring", "name": "Red Ring (Yuna)", "icon": "red-ring", "missable": false },
        { "id": "miihen-3-softs", "name": "Soft ×3", "icon": "soft", "missable": false },
        { "id": "miihen-2-antidotes", "name": "Antidote ×2", "icon": "antidote", "missable": false },
        { "id": "miihen-hunters-spear", "name": "Hunter's Spear (Kimahri)", "icon": "hunters-spear", "missable": false },
        { "id": "miihen-ice-brand", "name": "Ice Brand (Tidus)", "icon": "ice-brand", "missable": false },
        { "id": "miihen-lv1-key-sphere", "name": "Lv. 1 Key Sphere", "icon": "lv1-key-sphere", "missable": false },
        { "id": "miihen-2000-gil", "name": "2,000 Gil", "icon": "gil", "missable": false },
        { "id": "miihen-4-antidotes", "name": "Antidote ×4", "icon": "antidote", "missable": false },
        { "id": "miihen-600-gil", "name": "600 Gil", "icon": "gil", "missable": false }
      ]
    },
    {
      "name": "Rin's Agency / Newroad",
      "prose": "Rin gives Primer VIII for free when you speak to him. Primer IX is on the north cliff side of the Newroad. The Mars Crest (Auron's Masamune prerequisite) is on Oldroad South — accessible now or by airship later.",
      "guideImages": ["image_0039_00.jpeg"],
      "items": [
        { "id": "miihen-primer-viii", "name": "Al Bhed Primer Vol. VIII (free from Rin)", "icon": "primer", "missable": false },
        { "id": "miihen-2-mega-potions", "name": "Mega-Potion ×2", "icon": "mega-potion", "missable": false },
        { "id": "miihen-primer-ix", "name": "Al Bhed Primer Vol. IX", "icon": "primer", "missable": false },
        { "id": "miihen-mars-crest", "name": "Mars Crest (Auron's Masamune)", "icon": "mars-crest", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "chocobo-eater",
      "strategy": "Weak to Fire — Lulu's Fire deals reliable damage. Knock it off the cliff for the best reward (Lv. 2 Key Sphere): attack from the sides to push it backward. Use Wakka for ranged hits on its head. Power Break from Auron reduces physical damage. HP: 10,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/miihen-highroad.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/miihen-highroad.json
git commit -m "feat(content): add miihen-highroad chapter data"
```

---

## Task 8: mushroom-rock-road.json

**Files:**
- Create: `spira-guide/src/data/chapters/mushroom-rock-road.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "mushroom-rock-road",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"],
  "oaka": { "meeting": true, "cumulativeTarget": 10001 },
  "sgTip": "Auron's Power Break is essential for Gui's arms — they deal heavy damage and heal Gui if left alive.",
  "subLocations": [
    {
      "name": "Mushroom Rock Road",
      "prose": "Path to Operation Mi'ihen. Grab items along the route. The Primer X is at the Precipice — follow the winding path to the very end. Sinspawn Gui is fought twice at the ridge.",
      "guideImages": ["image_0040_00.jpeg", "image_0041_00.jpeg"],
      "items": [
        { "id": "mmr-remedy", "name": "Remedy", "icon": "remedy", "missable": false },
        { "id": "mmr-hi-potion", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "mmr-serene-armlet", "name": "Serene Armlet", "icon": "serene-armlet", "missable": false },
        { "id": "mmr-mega-potion", "name": "Mega-Potion", "icon": "mega-potion", "missable": false },
        { "id": "mmr-serene-bracer", "name": "Serene Bracer", "icon": "serene-bracer", "missable": false },
        { "id": "mmr-primer-x", "name": "Al Bhed Primer Vol. X", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "sinspawn-gui",
      "strategy": "Round 1 (12,000 HP body / 4,000 HP head / 800 HP arms ×2): Destroy both arms first — Power Break helps, they deal heavy damage and heal Gui. Then target the head with Wakka (ranged). Valefor can damage the body when physical attacks can't. Round 2 (6,000 HP): Much weaker — same approach: arms → head → body. Overkill for bonus AP."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/mushroom-rock-road.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/mushroom-rock-road.json
git commit -m "feat(content): add mushroom-rock-road chapter data"
```

---

## Task 9: djose.json

Rikku joins. Djose Cloister Destruction Sphere is NOT missable (can revisit).

**Files:**
- Create: `spira-guide/src/data/chapters/djose.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "djose",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": { "meeting": true, "cumulativeTarget": 10001 },
  "sgTip": "Rikku joins here — put her in the active party for her Steal and Use commands. Al Bhed Potions (which she can Use) are very effective for group healing.",
  "subLocations": [
    {
      "name": "Djose Highroad",
      "prose": "Rikku officially joins the party. NPCs hand out items generously. The Serene Armlet is on a western branch. The four Ability Spheres are clustered near the northeast corner of the temple exterior.",
      "guideImages": ["image_0042_00.jpeg"],
      "items": [
        { "id": "djose-1000-gil", "name": "1,000 Gil", "icon": "gil", "missable": false },
        { "id": "djose-10-potions", "name": "Potion ×10", "icon": "potion", "missable": false },
        { "id": "djose-remedy", "name": "Remedy", "icon": "remedy", "missable": false },
        { "id": "djose-x-potion", "name": "X-Potion", "icon": "x-potion", "missable": false },
        { "id": "djose-serene-armlet", "name": "Serene Armlet", "icon": "serene-armlet", "missable": false },
        { "id": "djose-4-ability-spheres", "name": "Ability Sphere ×4", "icon": "ability-sphere", "missable": false },
        { "id": "djose-4000-gil", "name": "4,000 Gil", "icon": "gil", "missable": false }
      ]
    },
    {
      "name": "Djose Temple",
      "prose": "The Magistral Rod (Destruction Sphere reward) is NOT missable — you can return to Djose Temple later via the Highroad. Complete the Cloister at your own pace.",
      "guideImages": ["image_0044_00.jpeg"],
      "items": [
        { "id": "djose-magistral-rod", "name": "Magistral Rod (Destruction Sphere — not missable)", "icon": "magistral-rod", "missable": false }
      ]
    }
  ],
  "bosses": [],
  "cloister": "djose",
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/djose.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/djose.json
git commit -m "feat(content): add djose chapter data (Rikku joins)"
```

---

## Task 10: moonflow.json

**Files:**
- Create: `spira-guide/src/data/chapters/moonflow.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "moonflow",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": { "meeting": true, "cumulativeTarget": 10001 },
  "sgTip": null,
  "subLocations": [
    {
      "name": "Moonflow South Bank",
      "prose": "Multiple NPCs hand out items. The Bright Bangle is in a hidden chest off the main road — look for a small alcove on the right. Primer XI is at the top of the ramp near the Shoopuf dock.",
      "items": [
        { "id": "moonflow-soft-ring", "name": "Soft Ring", "icon": "soft-ring", "missable": false },
        { "id": "moonflow-ether", "name": "Ether", "icon": "ether", "missable": false },
        { "id": "moonflow-hi-potion", "name": "Hi-Potion", "icon": "hi-potion", "missable": false },
        { "id": "moonflow-mega-potion", "name": "Mega-Potion", "icon": "mega-potion", "missable": false },
        { "id": "moonflow-variable-steel", "name": "Variable Steel", "icon": "variable-steel", "missable": false },
        { "id": "moonflow-bright-bangle", "name": "Bright Bangle", "icon": "bright-bangle", "missable": false },
        { "id": "moonflow-primer-xi", "name": "Al Bhed Primer Vol. XI", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "extractor",
      "strategy": "Underwater fight with only Tidus and Wakka. Dark Attack reduces its accuracy — use it early. Spiral Cut deals high damage. When the shoulder panels open, it's charging a powerful attack — interrupt it with any hit. Wakka's elemental balls inflict status if you have them. HP: 4,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/moonflow.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/moonflow.json
git commit -m "feat(content): add moonflow chapter data"
```

---

## Task 11: guadosalam.json

**Files:**
- Create: `spira-guide/src/data/chapters/guadosalam.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "guadosalam",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Guadosalam",
      "prose": "Story chapter — meet Seymour, visit the Farplane. Primer XII is in the small house to the left of Seymour's manor. While in the Farplane, grab the Venus Crest from the chest — it's needed for Lulu's Onion Knight celestial weapon.",
      "guideImages": ["image_0046_00.jpeg"],
      "items": [
        { "id": "guadosalam-primer-xii", "name": "Al Bhed Primer Vol. XII", "icon": "primer", "missable": false },
        { "id": "guadosalam-3000-gil", "name": "3,000 Gil", "icon": "gil", "missable": false },
        { "id": "guadosalam-venus-crest", "name": "Venus Crest (Lulu's Onion Knight)", "icon": "venus-crest", "missable": false }
      ]
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/guadosalam.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/guadosalam.json
git commit -m "feat(content): add guadosalam chapter data"
```

---

## Task 12: thunder-plains.json

**Files:**
- Create: `spira-guide/src/data/chapters/thunder-plains.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "thunder-plains",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": null,
  "sgTip": "Equip the Yellow Shield on Tidus immediately — Lightningproof stops random strike damage. Kimahri's Spirit Lance requires praying at 3 Qactuar stones (press Square near each).",
  "subLocations": [
    {
      "name": "Thunder Plains South",
      "prose": "Buy or find the Yellow Shield outside the Agency right away — equip it on Tidus to stop random lightning damage. Hunt the three Qactuar stones for the Spirit Lance: two are in the south section, one in the north.",
      "guideImages": ["image_0047_00.jpeg"],
      "items": [
        { "id": "thunder-phoenix-down-2", "name": "Phoenix Down ×2", "icon": "phoenix-down", "missable": false },
        { "id": "thunder-hi-potion-2", "name": "Hi-Potion ×2", "icon": "hi-potion", "missable": false },
        { "id": "thunder-5000-gil", "name": "5,000 Gil", "icon": "gil", "missable": false },
        { "id": "thunder-water-ball", "name": "Water Ball", "icon": "water-ball", "missable": false },
        { "id": "thunder-lightningproof-shield", "name": "Yellow Shield (Lightningproof, for Tidus)", "icon": "yellow-shield", "missable": false },
        { "id": "thunder-x-potion", "name": "X-Potion", "icon": "x-potion", "missable": false }
      ]
    },
    {
      "name": "Thunder Plains North",
      "prose": "Talk to Rikku first, then speak to Rin and answer 'Okay' when he asks about Al Bhed studies — this unlocks Primer XIII. The Spirit Lance Qactuar stone #3 is in this section.",
      "items": [
        { "id": "thunder-ether", "name": "Ether", "icon": "ether", "missable": false },
        { "id": "thunder-2000-gil", "name": "2,000 Gil", "icon": "gil", "missable": false },
        { "id": "thunder-primer-xiii", "name": "Al Bhed Primer Vol. XIII (say 'Okay' to Rin after talking to Rikku)", "icon": "primer", "missable": false },
        { "id": "thunder-spirit-lance", "name": "Spirit Lance (Kimahri's Celestial Weapon — pray at 3 stones)", "icon": "spirit-lance", "missable": false }
      ]
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/thunder-plains.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/thunder-plains.json
git commit -m "feat(content): add thunder-plains chapter data (Spirit Lance)"
```

---

## Task 13: macalania-woods.json

**Files:**
- Create: `spira-guide/src/data/chapters/macalania-woods.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "macalania-woods",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": { "meeting": true, "cumulativeTarget": 10001 },
  "sgTip": "Get Haste on Tidus before the Crawler fight in Lake Macalania — it transforms the fight. Use Lv. 1 Key Spheres to unlock the node if needed.",
  "subLocations": [
    {
      "name": "Macalania Woods",
      "prose": "Multiple branching paths. O'aka is on the Lake Road path. Primer XIV is on the right-side path near O'aka — easy to walk past.",
      "guideImages": ["image_0048_00.jpeg", "image_0048_01.jpeg", "image_0049_00.jpeg"],
      "items": [
        { "id": "mac-woods-primer-xiv", "name": "Al Bhed Primer Vol. XIV", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "spherimorph",
      "strategy": "Spherimorph's weakness cycles based on the last element cast. Pattern: Fire → weak to Ice, Ice → weak to Thunder, Thunder → weak to Water, Water → weak to Fire. Use Lulu to exploit the cycle. Auron's Shooting Star works regardless of element. HP: 12,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/macalania-woods.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/macalania-woods.json
git commit -m "feat(content): add macalania-woods chapter data"
```

---

## Task 14: lake-macalania.json

**Files:**
- Create: `spira-guide/src/data/chapters/lake-macalania.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "lake-macalania",
  "missables": [],
  "party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron", "Rikku"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Lake Macalania",
      "prose": "Primer XV is outside the Travel Agency, to the left of the door. The Crawler and Seymour fights follow in sequence — no chance to shop between them.",
      "items": [
        { "id": "lake-mac-primer-xv", "name": "Al Bhed Primer Vol. XV", "icon": "primer", "missable": false }
      ]
    },
    {
      "name": "Macalania Temple",
      "prose": "Complete the Cloister, then the Seymour confrontation. After the fight you're on the run — no opportunity to return to the temple.",
      "guideImages": ["image_0051_00.jpeg", "image_0051_01.jpeg"],
      "items": []
    }
  ],
  "bosses": [
    {
      "slug": "crawler",
      "strategy": "Destroy the Negator first (1,000 HP) — it nullifies all magic. Once it's down, Haste your party and cast Blizzard/Ice on Crawler. Power Break reduces its physical damage. When it charges the cannon, hit it to interrupt. HP: 16,000 + Negator 1,000."
    },
    {
      "slug": "seymour",
      "strategy": "Two phases. Phase 1: Kill the Guado Guardians first — they cast NulAll on Seymour, blocking magic. Seymour uses NulBlaze + NulFrost; wait them out or use Dispel. Phase 2: Anima appears (18,000 HP) — use your own Aeons or Thunder. Seymour's HP: 6,000 + 6,000. Have Yuna ready to heal throughout."
    }
  ],
  "cloister": "macalania",
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/lake-macalania.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/lake-macalania.json
git commit -m "feat(content): add lake-macalania chapter data (Crawler, Seymour)"
```

---

## Task 15: bikanel-desert.json

**Files:**
- Create: `spira-guide/src/data/chapters/bikanel-desert.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "bikanel-desert",
  "missables": [],
  "party": ["Tidus", "Wakka", "Rikku"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Sanubia Desert West",
      "prose": "Split from the main group. The Mercury Crest is in a shifting sand pit in the west — look for the swirling ground texture. Primer XVI is under ruins nearby.",
      "guideImages": ["image_0052_00.jpeg"],
      "items": [
        { "id": "bikanel-primer-xvi", "name": "Al Bhed Primer Vol. XVI", "icon": "primer", "missable": false },
        { "id": "bikanel-mercury-crest", "name": "Mercury Crest (Rikku's Godhand)", "icon": "mercury-crest", "missable": false }
      ]
    },
    {
      "name": "Sanubia Desert East",
      "prose": "Primer XVII is near the signpost. Several chests contain Al Bhed Potions and equipment throughout both desert sections.",
      "guideImages": ["image_0053_00.jpeg"],
      "items": [
        { "id": "bikanel-primer-xvii", "name": "Al Bhed Primer Vol. XVII", "icon": "primer", "missable": false }
      ]
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/bikanel-desert.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/bikanel-desert.json
git commit -m "feat(content): add bikanel-desert chapter data (Mercury Crest)"
```

---

## Task 16: home.json

Contains three permanently missable Al Bhed Primers. This is the highest-stakes content in the game for collectors.

**Files:**
- Create: `spira-guide/src/data/chapters/home.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "home",
  "missables": [
    "Al Bhed Primer Vol. XVIII — outside the main entrance. Missable if you rush past.",
    "Al Bhed Primer Vol. XIX — inside, room with forced fight, on a bed at the back. PERMANENTLY MISSABLE — Home is destroyed after this chapter.",
    "Al Bhed Primer Vol. XX — three-way fork, RIGHT hallway, at the end. PERMANENTLY MISSABLE.",
    "Al Bhed Primer Vol. XXI — three-way fork, straight/left path. PERMANENTLY MISSABLE."
  ],
  "party": ["Tidus", "Wakka", "Rikku"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Home Exterior",
      "prose": "Primer XVIII is on the ground just outside the main entrance — pick it up before going in. Home is destroyed at the end of this chapter.",
      "guideImages": ["image_0054_00.jpeg"],
      "items": [
        { "id": "home-primer-xviii", "name": "Al Bhed Primer Vol. XVIII", "icon": "primer", "missable": true }
      ]
    },
    {
      "name": "Home Interior",
      "prose": "THREE permanently missable Primers are inside. At the three-way fork: go RIGHT for XX, then go LEFT/STRAIGHT for XXI. XIX is in the room where the forced fight happens — check the bed at the back before engaging. Do not rush.",
      "guideImages": ["image_0054_01.jpeg"],
      "items": [
        { "id": "home-primer-xix", "name": "Al Bhed Primer Vol. XIX (room with forced fight, on a bed)", "icon": "primer", "missable": true },
        { "id": "home-primer-xx", "name": "Al Bhed Primer Vol. XX (three-way fork, right hallway)", "icon": "primer", "missable": true },
        { "id": "home-primer-xxi", "name": "Al Bhed Primer Vol. XXI (three-way fork, straight/left path)", "icon": "primer", "missable": true },
        { "id": "home-6-al-bhed-potions", "name": "Al Bhed Potion ×6", "icon": "al-bhed-potion", "missable": false },
        { "id": "home-lv4-key-sphere", "name": "Lv. 4 Key Sphere", "icon": "lv4-key-sphere", "missable": false },
        { "id": "home-lv2-key-sphere", "name": "Lv. 2 Key Sphere", "icon": "lv2-key-sphere", "missable": false },
        { "id": "home-10000-gil", "name": "10,000 Gil", "icon": "gil", "missable": false },
        { "id": "home-friend-sphere", "name": "Friend Sphere", "icon": "friend-sphere", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "wendigo",
      "strategy": "Wendigo (18,000 HP) + 2 Guado Guardians (1,200 HP each). Kill both Guardians first — if Wendigo falls while they're alive, they revive it. Rikku's Use with Al Bhed Potions heals the whole party. Wendigo is weak to Fire. HP: 18,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/home.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/home.json
git commit -m "feat(content): add home chapter data (3 permanently missable Primers)"
```

---

## Task 17: Update airship.json

Add Evrae boss (fought approaching Bevelle), add sgTip, and fully expand optionalAreas with real content.

> **Why Evrae lives here:** The `airship` chapter covers both (a) the initial Fahrenheit arrival where Evrae is fought en route to Bevelle, and (b) all optional areas accessible from the airship later. This is by design per CLAUDE.md: post-airship optional areas are sub-sections of the Airship chapter. The `bosses` array handles the story fight; `optionalAreas` handles the late-game content.

**Files:**
- Modify: `spira-guide/src/data/chapters/airship.json`

- [x] **Step 1: Replace the entire file**

```json
{
  "slug": "airship",
  "missables": [],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Haste + Slow are your best tools for Evrae. Slow him, Haste your party — the fight becomes trivial.",
  "subLocations": [
    {
      "name": "Fahrenheit Deck (Evrae Approach)",
      "prose": "The party escapes Home on the Fahrenheit. Evrae blocks the approach to Bevelle — fought on the airship deck. After Bevelle, the Fahrenheit becomes your permanent base of operations.",
      "guideImages": ["image_0056_00.jpeg"],
      "items": []
    }
  ],
  "bosses": [
    {
      "slug": "evrae",
      "strategy": "Evrae alternates between ranged and melee. At range: use the Harpoon lever to pull it in for physical attacks. Cast Slow on Evrae and Haste on your party — this alone can win the fight. Watch for Photon Spray (party damage) and Stone Gaze (Petrify — equip Stoneproof or have Soft ready). Auron's Power/Armor Break accelerate the kill. HP: 32,000."
    }
  ],
  "cloister": null,
  "optionalAreas": [
    {
      "name": "Remiem Temple",
      "prose": "Reach via Chocobo from the Calm Lands (hidden eastern cliff path). Belgemine challenges you to Aeon duels — defeating all 8 earns the Moon Sigil for Yuna's Nirvana. The Chocobo Race wins the Cloudy Mirror, which is required to unlock ALL Celestial Weapons. Primer XXIV is on the ground outside the entrance.",
      "guideImages": ["image_0072_00.jpeg"],
      "items": [
        { "id": "airship-remiem-cloudy-mirror", "name": "Cloudy Mirror (Chocobo Race — required for all Celestial Weapons)", "icon": "cloudy-mirror", "missable": false },
        { "id": "airship-remiem-primer-xxiv", "name": "Al Bhed Primer Vol. XXIV", "icon": "primer", "missable": false },
        { "id": "airship-remiem-moon-sigil", "name": "Moon Sigil (Yuna — defeat all 8 of Belgemine's Aeons)", "icon": "moon-sigil", "missable": false }
      ]
    },
    {
      "name": "Cavern of the Stolen Fayth",
      "prose": "Accessible from Calm Lands northeast. To recruit Yojimbo: when asked 'What do you need Yojimbo for?', say 'To defeat the most powerful enemies'. Divide his first price counter by 2, add 1, and offer that. Pay ~190,001 Gil total. Yojimbo's Zanmato ignores HP — useful for any boss.",
      "items": [
        { "id": "airship-yojimbo-aeon", "name": "Yojimbo (Aeon)", "icon": "yojimbo", "missable": false }
      ]
    },
    {
      "name": "Baaj Temple (Revisit)",
      "prose": "Airship coordinates: X:11-16, Y:57-63. Fight Geosgaeno first (32,000 HP, weak to Ice). Dive between the southern pillars to find Lulu's Onion Knight on the seafloor. Once you have all other 7 Aeons, Anima becomes available here.",
      "items": [
        { "id": "airship-baaj-onion-knight", "name": "Onion Knight (Lulu's Celestial Weapon)", "icon": "onion-knight", "missable": false },
        { "id": "airship-baaj-anima", "name": "Anima (Aeon — requires all 7 other Aeons' Cloisters complete)", "icon": "anima", "missable": false }
      ]
    },
    {
      "name": "Omega Ruins",
      "prose": "Airship coordinates: X:69-75, Y:33-38. The hardest optional dungeon — fiends are endgame-level. Ultima Weapon (99,999 HP) and Omega Weapon (999,999 HP) await. Primer XXVI is inside the ruins.",
      "items": [
        { "id": "airship-omega-primer-xxvi", "name": "Al Bhed Primer Vol. XXVI", "icon": "primer", "missable": false },
        { "id": "airship-omega-master-sphere-2", "name": "Master Sphere ×2", "icon": "master-sphere", "missable": false }
      ]
    },
    {
      "name": "Cactuar Village (Bikanel Desert Revisit)",
      "prose": "10 Cactuars are hidden across Bikanel Desert. Speak to Marnela at the giant stone to begin. Finding all 10 earns the Mercury Sigil for Rikku's Godhand.",
      "items": [
        { "id": "airship-cactuar-mercury-sigil", "name": "Mercury Sigil (Rikku — find all 10 Cactuars)", "icon": "mercury-sigil", "missable": false }
      ]
    },
    {
      "name": "Monster Arena (Calm Lands)",
      "prose": "Capture fiends from all 10 areas (buy Capture weapons from the owner). Completing the capture list unlocks arena-only creations with powerful drop rewards. Mars Sigil (Auron's Masamune) requires capturing at least 1 of every fiend type in 10 different areas.",
      "items": [
        { "id": "airship-arena-mars-sigil", "name": "Mars Sigil (Auron — capture 1 fiend from each of 10 areas)", "icon": "mars-sigil", "missable": false }
      ]
    }
  ]
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/airship.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/airship.json
git commit -m "feat(content): expand airship.json with Evrae boss and full optional areas"
```

---

## Task 18: bevelle.json

Contains one permanently missable Primer.

**Files:**
- Create: `spira-guide/src/data/chapters/bevelle.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "bevelle",
  "missables": [
    "Al Bhed Primer Vol. XXII — Priests' Passage, on the floor before the Cloister save sphere. PERMANENTLY MISSABLE — walk past this and it's gone forever."
  ],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Steal Lv. 1–2 Key Spheres from enemies in Bevelle to unlock path nodes for everyone.",
  "subLocations": [
    {
      "name": "Priests' Passage",
      "prose": "The Primer XXII is on the floor of the passage before reaching the Cloister save sphere — it's easy to miss because the game pulls you forward. Slow down and look for the glowing item on the ground.",
      "items": [
        { "id": "bevelle-primer-xxii", "name": "Al Bhed Primer Vol. XXII (floor before Cloister save sphere)", "icon": "primer", "missable": true }
      ]
    },
    {
      "name": "Bevelle Cloister of Trials",
      "prose": "The most mechanically complex Cloister — uses a moving platform with glyph spheres. The Destruction Sphere chest (Knight Lance) counts toward Anima acquisition. Complete it fully before leaving.",
      "guideImages": ["image_0058_00.jpeg"],
      "items": [
        { "id": "bevelle-hp-sphere", "name": "HP Sphere", "icon": "hp-sphere", "missable": false },
        { "id": "bevelle-knight-lance", "name": "Knight Lance (Kimahri, Destruction Sphere — needed for Anima)", "icon": "knight-lance", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "seymour-natus",
      "strategy": "Seymour Natus (36,000 HP) + Mortibody (4,000 HP). Mortibody uses Seymour's turns to cast the opposite of the last element you used — Dispel it before attacking with magic. Seymour charges Total Annihilation as HP drops; burst him down or use Auron's Shooting Star. Haste your party and Slow Seymour. Protect reduces damage significantly."
    }
  ],
  "cloister": "bevelle",
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/bevelle.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/bevelle.json
git commit -m "feat(content): add bevelle chapter data (missable Primer XXII, Seymour Natus)"
```

---

## Task 19: via-purifico.json

**Files:**
- Create: `spira-guide/src/data/chapters/via-purifico.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "via-purifico",
  "missables": [],
  "party": ["Yuna", "Kimahri", "Lulu", "Tidus", "Auron", "Wakka"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Via Purifico (Yuna's Path)",
      "prose": "Yuna solo at first, then Kimahri and Lulu join. The sphere and ring chests are spread through the rooms; the Gil and Lucid Ring are in a locked area requiring keys.",
      "guideImages": ["image_0059_00.jpeg"],
      "items": [
        { "id": "via-mega-potion", "name": "Mega-Potion", "icon": "mega-potion", "missable": false },
        { "id": "via-wht-magic-sphere", "name": "Wht Magic Sphere", "icon": "wht-magic-sphere", "missable": false },
        { "id": "via-elixir", "name": "Elixir", "icon": "elixir", "missable": false },
        { "id": "via-blk-magic-sphere", "name": "Blk Magic Sphere", "icon": "blk-magic-sphere", "missable": false },
        { "id": "via-skill-sphere", "name": "Skill Sphere", "icon": "skill-sphere", "missable": false },
        { "id": "via-lucid-ring", "name": "Lucid Ring", "icon": "lucid-ring", "missable": false },
        { "id": "via-10000-gil", "name": "10,000 Gil", "icon": "gil", "missable": false }
      ]
    },
    {
      "name": "Via Purifico (Tidus's Sewers)",
      "prose": "Tidus, Auron, and Wakka in the underground sewers. Two chests here — grab the Evade & Counter armguard for Wakka.",
      "guideImages": ["image_0060_00.jpeg", "image_0060_01.jpeg"],
      "items": [
        { "id": "via-evade-counter", "name": "Evade & Counter Armguard (Wakka)", "icon": "armguard", "missable": false },
        { "id": "via-avenger", "name": "Avenger", "icon": "avenger", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "isaaru-aeons",
      "strategy": "Yuna vs Isaaru's 3 Aeons: Grothia (Ifrit), Pterya (Valefor), Spathi (Bahamut). Summon your own version of each — your Aeons are stronger. Charge Overdrives before entering if possible. Yuna's Bahamut vs Spathi is the key fight."
    },
    {
      "slug": "evrae-altana",
      "strategy": "Evrae Altana is undead — throw Phoenix Downs for ~9,999 damage each. Two Phoenix Downs kill it outright. Holy Water also works. Do NOT heal it with cure magic or Al Bhed Potions."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/via-purifico.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/via-purifico.json
git commit -m "feat(content): add via-purifico chapter data"
```

---

## Task 20: highbridge.json

**Files:**
- Create: `spira-guide/src/data/chapters/highbridge.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "highbridge",
  "missables": [],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Highbridge",
      "prose": "Short story chapter — Kinoc is revealed, another Seymour confrontation. No items to collect here. Proceed to the Calm Lands.",
      "items": []
    }
  ],
  "bosses": [],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/highbridge.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/highbridge.json
git commit -m "feat(content): add highbridge chapter data"
```

---

## Task 21: calm-lands.json

**Files:**
- Create: `spira-guide/src/data/chapters/calm-lands.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "calm-lands",
  "missables": [
    "Magic Counter Shield — sold by the hover vendor on FIRST VISIT only. The only source of Magic Counter on armor in the game.",
    "Duren (Blitzball player) — recruitable at the bottom of Calm Lands Gorge before reaching Zanarkand. Disappears after."
  ],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Buy the Caladbolg (Tidus's Celestial Weapon) after beating the Chocobo Trainer — the NW area chest becomes accessible. Start capturing fiends with Capture weapons from the Monster Arena owner.",
  "subLocations": [
    {
      "name": "Calm Lands",
      "prose": "Buy the Magic Counter Shield from the Hover Vendor immediately — it's only available on your first visit. Buy Capture weapons from the Monster Arena owner and start filling the arena. Beat the Chocobo Trainer to unlock the Caladbolg chest in the northwest.",
      "guideImages": ["image_0061_00.jpeg", "image_0062_00.jpeg", "image_0062_01.jpeg"],
      "items": [
        { "id": "calmlands-primer-xxiii", "name": "Al Bhed Primer Vol. XXIII", "icon": "primer", "missable": false },
        { "id": "calmlands-magic-counter-shield", "name": "Magic Counter Shield (Hover Vendor — FIRST VISIT ONLY)", "icon": "shield", "missable": true },
        { "id": "calmlands-caladbolg", "name": "Caladbolg (Tidus's Celestial Weapon)", "icon": "caladbolg", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "defender-x",
      "strategy": "Uses Taunt to force all attacks onto one character. Use Lancet with Kimahri to learn Mighty Guard (extremely useful). Provoke with Tidus to keep squishier characters safe. Armor Break + physical attacks. Very high HP but no threatening mechanics. HP: 64,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/calm-lands.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/calm-lands.json
git commit -m "feat(content): add calm-lands chapter data (missable Magic Counter Shield)"
```

---

## Task 22: mt-gagazet.json

**Files:**
- Create: `spira-guide/src/data/chapters/mt-gagazet.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "mt-gagazet",
  "missables": [
    "Wantz — speak to him on the Mountain Trail during this visit. If missed, he will NOT set up his shop later (exclusive 4-slot equipment)."
  ],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Steal Lv. 3 Key Spheres from Biran and Yenke (4–5 if possible) — they're rare. Kimahri should also learn Mighty Guard and Bad Breath from fiends on this mountain.",
  "subLocations": [
    {
      "name": "Mountain Trail",
      "prose": "Talk to Wantz near the start of the trail — he enables his shop later at Macalania with exclusive 4-slot equipment. Primer XXV is behind a rock pillar on the right side of the trail.",
      "guideImages": ["image_0064_00.jpeg", "image_0065_00.jpeg", "image_0065_01.jpeg"],
      "items": [
        { "id": "gagazet-primer-xxv", "name": "Al Bhed Primer Vol. XXV", "icon": "primer", "missable": false },
        { "id": "gagazet-lv1-key-sphere", "name": "Lv. 1 Key Sphere", "icon": "lv1-key-sphere", "missable": false },
        { "id": "gagazet-pep-talk-armor", "name": "Pep Talk Armor (Wakka)", "icon": "pep-talk-armor", "missable": false }
      ]
    },
    {
      "name": "Mountain Trial / Prominence",
      "prose": "The underwater trial gives a Fortune Sphere. The Saturn Crest for Kimahri's Spirit Lance is behind a pillar on the right side of the Prominence area — walk behind the rock.",
      "guideImages": ["image_0066_00.jpeg", "image_0067_00.jpeg"],
      "items": [
        { "id": "gagazet-fortune-sphere", "name": "Fortune Sphere", "icon": "fortune-sphere", "missable": false },
        { "id": "gagazet-return-sphere", "name": "Return Sphere", "icon": "return-sphere", "missable": false },
        { "id": "gagazet-recovery-ring", "name": "Recovery Ring", "icon": "recovery-ring", "missable": false },
        { "id": "gagazet-saturn-crest", "name": "Saturn Crest (Kimahri's Spirit Lance)", "icon": "saturn-crest", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "biran-ronso",
      "strategy": "Kimahri solo vs Biran and Yenke — their stats scale with Kimahri's level. Steal Lv. 3 Key Spheres from each (4–5 total if lucky). Use Lancet on both to learn their Blue Magic (Mighty Guard is endgame-useful). Focus Yenke first, then Biran. Use whatever Overdrives Kimahri has."
    },
    {
      "slug": "seymour-flux",
      "strategy": "Seymour Flux (70,000 HP) + Mortiorchis. Lance of Atrophy + Full Life combo from Mortiorchis can revive and re-kill a character in one turn — keep HP high and have Phoenix Downs ready. Seymour uses Flare on whoever acts next; Haste your party and hit hard. Auron's Shooting Star bypasses defense. Dispel any buffs Seymour gains."
    },
    {
      "slug": "sanctuary-keeper",
      "strategy": "Uses Mana Breath (large MP drain) and Photon Spray (party damage). Use Megalixir to restore MP if drained. Haste + physical attacks. HP: 40,000."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/mt-gagazet.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/mt-gagazet.json
git commit -m "feat(content): add mt-gagazet chapter data (Wantz warning, Seymour Flux)"
```

---

## Task 23: zanarkand-dome.json

Contains a missable Sun Crest (Tidus's Celestial Weapon upgrade).

**Files:**
- Create: `spira-guide/src/data/chapters/zanarkand-dome.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "zanarkand-dome",
  "missables": [
    "Sun Crest — on the floor after the Yunalesca fight. Do NOT leave without picking it up — it's Tidus's Caladbolg upgrade prerequisite."
  ],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Yunalesca removes all positive statuses at the start of each phase. Don't pre-buff — wait until after her opener. Zombie protection (Zombie Ward or Deathproof armor) is critical for Phase 3.",
  "subLocations": [
    {
      "name": "Zanarkand Dome Approach",
      "prose": "Grab everything on the path before committing to the Dome. The Friend Sphere and Fortune Sphere are in the NE branch off the main path.",
      "guideImages": ["image_0068_00.jpeg", "image_0068_01.jpeg", "image_0068_02.jpeg", "image_0068_03.jpeg", "image_0069_00.jpeg"],
      "items": [
        { "id": "zanarkand-dome-fortune-sphere", "name": "Fortune Sphere", "icon": "fortune-sphere", "missable": false },
        { "id": "zanarkand-dome-spiritual-targe", "name": "Spiritual Targe (Rikku)", "icon": "spiritual-targe", "missable": false },
        { "id": "zanarkand-dome-10000-gil", "name": "10,000 Gil", "icon": "gil", "missable": false },
        { "id": "zanarkand-dome-luck-sphere", "name": "Luck Sphere", "icon": "luck-sphere", "missable": false },
        { "id": "zanarkand-dome-friend-sphere", "name": "Friend Sphere", "icon": "friend-sphere", "missable": false }
      ]
    },
    {
      "name": "Zanarkand Dome Interior",
      "prose": "Braska's pilgrimage memory unfolds. After defeating Yunalesca, walk back and pick up the Sun Crest from the floor — it's easy to forget in the post-fight excitement.",
      "guideImages": ["image_0071_00.jpeg", "image_0071_01.jpeg"],
      "items": [
        { "id": "zanarkand-dome-sun-crest", "name": "Sun Crest (Tidus's Caladbolg — pick up AFTER Yunalesca)", "icon": "sun-crest", "missable": true }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "spectral-keeper",
      "strategy": "Uses Berserk + Glyph Mines. Remove Berserk with Esuna immediately — Berserk characters walk into mines. Don't move berserked characters onto glyphs. Wakka and Auron attack from range/power. Protect on the party. HP: 52,000."
    },
    {
      "slug": "yunalesca",
      "strategy": "Three phases — 24k / 48k / 60k HP. Phase 1: Mega Death can hit the party; equip Deathproof or tank with an Aeon. Phase 2: Adds Holy and zombifies a character — Zombie can actually be useful in Phase 3. Phase 3: Hellbiter zombifies the whole party — equip Zombie Ward armor on everyone beforehand OR embrace being undead (don't use healing magic on Zombie chars, they absorb it). Dispel her buffs. Overkill each phase for AP."
    }
  ],
  "cloister": "zanarkand-dome",
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/zanarkand-dome.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/zanarkand-dome.json
git commit -m "feat(content): add zanarkand-dome chapter data (Yunalesca, missable Sun Crest)"
```

---

## Task 24: airship-sin.json

**Files:**
- Create: `spira-guide/src/data/chapters/airship-sin.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "airship-sin",
  "missables": [],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": "Final preparations — ensure everyone has their Celestial Weapons if you have the crests/sigils. Stock Megalixirs, Elixirs, and Phoenix Downs. You can return to the airship between Sin exterior fights.",
  "subLocations": [
    {
      "name": "Airship En Route to Sin",
      "prose": "Goodbyes and last preparations. The four Sin exterior battles follow in sequence: Left Fin, Right Fin, Head, Core. You can return to the airship between fights to heal.",
      "guideImages": ["image_0073_00.jpeg"],
      "items": []
    }
  ],
  "bosses": [
    {
      "slug": "sin-left-fin",
      "strategy": "HP: 65,000. No special mechanics — full assault with Overdrives and Celestial Weapons."
    },
    {
      "slug": "sin-right-fin",
      "strategy": "HP: 65,000. Same as Left Fin. Return to airship between fights if needed."
    },
    {
      "slug": "sin-head",
      "strategy": "HP: 140,000. Watch for Gravija (reduces all HP by 75% — follow with Mega-Potions for flat recovery). Dispel any buffs. Standard damage doesn't work with Gravity-based spells but everything else does. Sustained Overdrives and Hastega."
    },
    {
      "slug": "sin-core",
      "strategy": "HP: 36,000. After the head, you enter Sin. The core is weaker — Overdrives and strong physicals finish it quickly."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/airship-sin.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/airship-sin.json
git commit -m "feat(content): add airship-sin chapter data (Sin exterior battles)"
```

---

## Task 25: inside-sin.json

**Files:**
- Create: `spira-guide/src/data/chapters/inside-sin.json`

- [x] **Step 1: Create the file**

```json
{
  "slug": "inside-sin",
  "missables": [],
  "party": ["Tidus", "Yuna", "Wakka", "Lulu", "Auron", "Rikku", "Kimahri"],
  "oaka": null,
  "sgTip": null,
  "subLocations": [
    {
      "name": "Inside Sin",
      "prose": "The final dungeon. Strong fiends throughout — use your best party configurations and save before every boss. Jecht Sphere #10 is here for Auron's final Overdrive. The passage chests contain powerful endgame equipment.",
      "guideImages": ["image_0074_00.jpeg"],
      "items": [
        { "id": "inside-sin-jecht-sphere-10", "name": "Jecht Sphere #10 (Auron's Tornado Overdrive)", "icon": "jecht-sphere", "missable": false }
      ]
    }
  ],
  "bosses": [
    {
      "slug": "sinspawn-genais",
      "strategy": "HP: 20,000. Two components — the Sinspawn body and a Sin cell. Kill the Sinspawn body first; the cell can revive it once. Finish both quickly. Magic and Aeons are effective."
    },
    {
      "slug": "seymour-omnis",
      "strategy": "HP: 80,000. Mortiphasms surround him (1 HP each) — they grant Seymour elemental absorption. Destroy them before using any element. Multi-Spell can hit multiple times in a row; Protect + high HP is essential. Dispel buffs. Strong physicals and Overdrives throughout."
    },
    {
      "slug": "braska-final-aeon",
      "strategy": "Phase 1 (60,000 HP): Jecht Beam can Petrify — have Stoneproof on key characters or Soft ready. Phase 2 (120,000 HP — he pulls out his sword): HP doubles. Triumphant Grasp combo (Petrify + Shatter) is the kill move; Stoneproof is non-negotiable. Hastega + full Overdrives. Auron has unique scripted dialogue. This is the true final fight."
    },
    {
      "slug": "yu-yevon",
      "strategy": "Unkillable conventionally — Yu Yevon has permanent Auto-Life. The game ends the fight automatically after Braska's Final Aeon. Watch the ending."
    }
  ],
  "cloister": null,
  "optionalAreas": []
}
```

- [x] **Step 2: Validate JSON**

```bash
cd spira-guide && node -e "JSON.parse(require('fs').readFileSync('src/data/chapters/inside-sin.json','utf8')); console.log('valid')"
```

- [x] **Step 3: Commit**

```bash
git add spira-guide/src/data/chapters/inside-sin.json
git commit -m "feat(content): add inside-sin chapter data (final bosses)"
```

---

## Task 26: Item Icon Filename Audit

Every chapter JSON references icon names that map to `/img/items/sd/{icon}.png`. This task finds mismatches before they become broken images in the UI.

**Files:**
- Read: `spira-guide/public/img/items/sd/` (list of actual files)
- Read: All chapter JSONs (to extract icon values)

- [x] **Step 1: List all actual SD item icons**

```bash
ls spira-guide/public/img/items/sd/ | sed 's/\.png$//' | sort > /tmp/actual-icons.txt
wc -l /tmp/actual-icons.txt
```

- [x] **Step 2: Extract all icon values referenced in chapter JSONs**

```bash
grep -rh '"icon":' spira-guide/src/data/chapters/ | sed 's/.*"icon": *"\([^"]*\)".*/\1/' | sort -u > /tmp/referenced-icons.txt
wc -l /tmp/referenced-icons.txt
```

- [x] **Step 3: Find referenced icons that don't exist**

```bash
comm -23 /tmp/referenced-icons.txt /tmp/actual-icons.txt
```
Expected: ideally empty. Any output = missing image file.

- [x] **Step 4: For each missing icon, either:**
  - Find the correct filename in `/img/items/sd/` and update the JSON, OR
  - Note the missing asset in a comment at the top of the relevant JSON file

- [x] **Step 5: Commit any icon name fixes**

```bash
git add spira-guide/src/data/chapters/
git commit -m "fix(content): correct icon filenames to match actual assets"
```

---

## Task 27: Accuracy QA Pass

Cross-reference all content against the three authoritative research docs.

**Files:**
- Read: `docs/research-boss-data-FINAL.md` — authoritative HP values (game-mined)
- Read: `docs/research-collectibles.md` — primer locations, missable flags, celestial data
- Read: `docs/research-walkthrough-items.md` — item locations per chapter

- [x] **Step 1: Verify boss HP values**

For each boss slug in all chapter JSONs, confirm the `strategy` text mentions the correct HP (tutorial bosses like Sinspawn Ammes intentionally omit HP — skip those). Cross-check against `docs/research-boss-data-FINAL.md`.

Key values to check:
- Sinspawn Ammes: 2,400 HP
- Tros: 2,200 HP
- Sinspawn Echuilles: 2,000 HP
- Sinspawn Geneaux: 3,000 HP (+ tentacles 450 each)
- Chocobo Eater: 10,000 HP
- Sinspawn Gui Round 1: 12,000 body + 4,000 head
- Extractor: 4,000 HP
- Spherimorph: 12,000 HP
- Crawler: 16,000 HP + Negator 1,000 HP
- Seymour: 6,000 HP (Phase 1) + 6,000 HP (Phase 2)
- Wendigo: 18,000 HP
- Evrae: 32,000 HP
- Seymour Natus: 36,000 HP + Mortibody 4,000 HP
- Defender X: 64,000 HP
- Seymour Flux: 70,000 HP + Mortiorchis
- Sanctuary Keeper: 40,000 HP
- Spectral Keeper: 52,000 HP
- Yunalesca: 24,000 / 48,000 / 60,000 HP (phases)
- Braska's Final Aeon: 60,000 / 120,000 HP (phases)

- [x] **Step 2: Verify permanently missable Primers**

Cross-check against `docs/research-collectibles.md`:
- Vol. XIX: Home interior, room with forced fight, on a bed ✓
- Vol. XX: Home interior, three-way fork, right hallway ✓
- Vol. XXI: Home interior, three-way fork, straight/left ✓
- Vol. XXII: Bevelle Priests' Passage, before Cloister save sphere ✓

Confirm all four have `"missable": true` in their respective JSONs.

- [x] **Step 3: Verify Destruction Sphere missables**

- Besaid: Rod of Wisdom — missable (Dark Valefor blocks return in HD) ✓
- Kilika: Red Armlet — missable (can't return) ✓
- Djose: Magistral Rod — NOT missable (can revisit) ✓
- Macalania: Destruction Sphere counted toward Anima — NOT missable via Temple access
- Bevelle: Destruction Sphere — needed for Anima, accessible in single visit ✓
- Zanarkand Dome: Destruction Sphere — needed for Anima ✓

- [x] **Step 4: Verify Sun Crest is marked missable in zanarkand-dome.json**

```bash
grep -A2 "sun-crest" spira-guide/src/data/chapters/zanarkand-dome.json
```
Expected: `"missable": true`

- [x] **Step 5: Verify Magic Counter Shield is marked missable in calm-lands.json**

```bash
grep -A2 "magic-counter" spira-guide/src/data/chapters/calm-lands.json
```
Expected: `"missable": true`

- [x] **Step 6: Validate all JSON files parse correctly**

```bash
for f in spira-guide/src/data/chapters/*.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo "OK: $f" || echo "FAIL: $f"
done
```
Expected: All `OK`.

- [x] **Step 7: Commit any corrections**

```bash
git add spira-guide/src/data/chapters/
git commit -m "fix(content): QA pass — correct boss HPs, missable flags, and primer locations"
```

---

## Completion Checklist

After all tasks:

- [x] 26 chapter JSON files exist in `spira-guide/src/data/chapters/`
- [x] All JSONs parse without errors
- [x] All permanently missable items have `"missable": true`
- [x] All bosses use object format `{ "slug": "...", "strategy": "..." }`
- [x] No broken icon references (Task 26 audit clean)
- [x] Boss HPs verified against `research-boss-data-FINAL.md`
- [x] Primer locations verified against `research-collectibles.md`
- [x] Guide images extracted to `spira-guide/public/img/guide/` (~55 files)
- [x] All chapters with guide coverage have `guideImages` populated

---

## Data Sources

| Content | Source File |
|---------|-------------|
| Boss HP values | `docs/research-boss-data-FINAL.md` (game-mined, authoritative) |
| Item locations | `docs/research-walkthrough-items.md` |
| Missables (primers, celestials) | `docs/research-collectibles.md` |
| Chapter slugs / act groupings | `spira-guide/src/data/chapterIndex.js` |
| Existing schema example | `spira-guide/src/data/chapters/besaid.json` |
| Walkthrough prose + screenshots | `docs/official-guide/brady-guide.xml` (text) + EPUB `image_NNNN_NN.jpeg` (images) |
