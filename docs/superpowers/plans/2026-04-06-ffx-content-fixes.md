# FFX Walkthrough Content Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 201 findings from the content gap audit across all 26 chapter JSONs — missing items, wrong data, fabricated content, missing boss cards, thin prose, image misassignments, and missable warnings.

**Architecture:** 6-wave pipeline with ~127 total agent invocations. Wave 0 pre-extracts clean EPUB text per chapter so all downstream agents work from curated prose rather than raw OCR'd HTML. Wave 1 handles mechanical/systemic fixes (no EPUB research needed). Wave 2 fully rewrites the 3 worst chapters using 3 parallel agents each writing JSON fragments, then 1 assembly agent per chapter. Waves 3–5 send 1 agent per chapter for boss cards, item additions, and prose/tips/missables. Every wave has dedicated QA agents doing full independent verification.

**Tech Stack:** Subagent orchestration. All changes are to JSON files in `spira-guide/src/data/chapters/`. No code changes.

---

## Context

A 3-wave audit (in `docs/audit/`) compared all 26 chapter JSONs against the BradyGames EPUB (`/tmp/epub-pages/page_22.html` through `page_85.html`), monsters.json, and locations-poptracker.json. It found 201 findings: 11 CRITICAL, 52 HIGH, 100 MEDIUM, 38 LOW.

**Key source files:**
- Chapter JSONs: `spira-guide/src/data/chapters/{slug}.json` (26 files)
- EPUB pages: `/tmp/epub-pages/page_22.html` – `page_85.html` (64 files)
- Boss data: `docs/source-data/monsters.json`
- Location data: `docs/source-data/locations-poptracker.json`
- Audit reports: `docs/audit/wave1/`, `docs/audit/wave2/`, `docs/audit/wave3/`
- EPUB page→chapter map: `docs/audit/wave1/1a-epub-page-chapter-map.md`
- Image audit: `docs/audit/wave1/1d-image-audit.md`
- Consolidated findings: `docs/audit/wave3/3a-consolidated-gap-report.md`
- QA verification: `docs/audit/wave3/3b-qa-spot-check.md`

**JSON schema for chapter files:**
```json
{
  "slug": "string",
  "missables": ["string"],
  "party": ["CharacterName"],
  "oaka": { "meeting": true, "cumulativeTarget": 1001 } | null,
  "sgTip": "string" | null,
  "subLocations": [{
    "name": "string",
    "prose": "string (50–300 words)",
    "guideImages": ["image_NNNN_NN.jpeg"],
    "items": [{ "id": "slug-item-name", "name": "string", "icon": "string", "missable": boolean }]
  }],
  "bosses": [{ "slug": "string", "strategy": "string (40–200 words)" }],
  "cloister": "temple-name" | null,
  "optionalAreas": [{ "name": "string", "prose": "string", "guideImages": [], "items": [] }]
}
```
Item IDs follow `{chapter-slug}-{item-kebab-name}` convention (e.g., `besaid-moon-crest`).

**OCR noise in EPUB pages to ignore:** page footers like "022-032 Walk 1 and 2 FFX.indd 23", timestamps like "2/26/14", lone `&` symbols. `©` = Circle button, `®` = another button.

---

## File Structure

```
docs/fixes/
├── wave0/          ← Clean EPUB reference docs, 1 per chapter
│   └── {slug}-reference.md
├── wave2/          ← JSON fragments for the 3 big rewrites
│   ├── calm-lands-sublocations.json
│   ├── calm-lands-bosses.json
│   ├── calm-lands-optional-areas.json
│   ├── inside-sin-sea-of-sorrow.json
│   ├── inside-sin-city-and-tower.json
│   ├── inside-sin-meta.json
│   ├── airship-new-sublocations.json
│   ├── airship-new-bosses.json
│   └── airship-optional-updates.json
└── qa/             ← QA reports per wave (each agent writes its own file)
    ├── wave1-qa-report-a.md        ← QA-1A (moonflow, guadosalam, thunder-plains, macalania-woods)
    ├── wave1-qa-report-b.md        ← QA-1B (lake-macalania, bikanel-desert, ss-winno, djose)
    ├── wave1-qa-report-c.md        ← QA-1C (home, calm-lands, airship)
    ├── wave2-qa-report-calm-lands.md
    ├── wave2-qa-report-inside-sin.md
    ├── wave2-qa-report-airship.md
    ├── wave3-qa-report-a.md
    ├── wave3-qa-report-b.md
    ├── wave3-qa-report-c.md
    ├── wave4-qa-report-a.md  through  wave4-qa-report-e.md
    ├── wave5-qa-report-a.md  through  wave5-qa-report-e.md
    └── final-qa-report.md
```

---

## Task 0: Setup

- [ ] **Step 1: Create fix directories**
```bash
cd "/Users/theonavarro/FFX walkthrough"
mkdir -p docs/fixes/wave0 docs/fixes/wave2 docs/fixes/qa
```

- [ ] **Step 2: Verify EPUB pages are present**
```bash
ls /tmp/epub-pages/page_*.html | wc -l
# Expected: 64
```

- [ ] **Step 3: Verify all 26 chapter JSONs exist**
```bash
ls spira-guide/src/data/chapters/*.json | wc -l
# Expected: 26
```

---

## Task 1: Wave 0 — EPUB Extraction (26 parallel agents)

One agent per chapter. Each agent reads its chapter's EPUB pages and produces a clean prose reference doc. No JSON editing. READ-ONLY.

- [ ] **Step 1: Launch all 26 extraction agents simultaneously**

Each agent receives this prompt, filled in per the parameter table below:

**Extraction agent prompt template:**
> You are extracting reference content for the FFX walkthrough content fix project. READ-ONLY — produce a reference document only, no source file changes.
>
> **Your chapter:** `{SLUG}` ({CHAPTER_NAME})
> **Your EPUB pages:** {EPUB_PAGES}
>
> Read `docs/audit/wave1/1a-epub-page-chapter-map.md` to confirm the exact pages for your chapter.
> Then read each of your EPUB pages in full from `/tmp/epub-pages/page_NN.html`.
>
> Extract and clean the following into a structured reference doc:
> 1. **Section headings** — all distinct areas/sections in this chapter
> 2. **Items** — every item mentioned with quantities and approximate location within chapter. Flag missables explicitly.
> 3. **Boss stat blocks** — name, HP, any steals/drops, any special mechanics noted
> 4. **Walkthrough prose** — key directions, strategies, tips. Clean OCR artifacts but preserve all substance.
> 5. **Al Bhed Primers** — which volume number, where exactly
> 6. **Tips** — any Sphere Grid advice, O'aka donation amounts, mini-game tips, hazard warnings
> 7. **Missable warnings** — any items/events the guide explicitly flags as missable
>
> OCR noise to ignore: page footers, timestamps, lone `&` symbols. `©` = Circle button, `®` = another button.
>
> Write output to: `/Users/theonavarro/FFX walkthrough/docs/fixes/wave0/{SLUG}-reference.md`
>
> Begin with:
> ```markdown
> # {CHAPTER_NAME} — EPUB Reference
> Source: EPUB pages {EPUB_PAGES}
> ---
> ```

**Parameter table (slug → chapter name → approximate EPUB pages):**

| Slug | Chapter Name | EPUB Pages |
|------|-------------|------------|
| zanarkand | Dream Zanarkand | 23–24 |
| baaj-temple | Baaj Temple | 25–26 |
| besaid | Besaid | 26–28 |
| ss-liki | S.S. Liki | 28–29 |
| kilika | Kilika | 29–31 |
| ss-winno | S.S. Winno | 31–33 |
| luca | Luca | 34–35 |
| miihen-highroad | Mi'ihen Highroad | 35–37 |
| mushroom-rock-road | Mushroom Rock Road | 37–39 |
| djose | Djose | 39–41 |
| moonflow | Moonflow | 41–42 |
| guadosalam | Guadosalam | 42–43 |
| thunder-plains | Thunder Plains | 44–45 |
| macalania-woods | Macalania Woods | 45–47 |
| lake-macalania | Lake Macalania | 47–49 |
| bikanel-desert | Bikanel Desert | 49–51 |
| home | Home | 51–52 |
| bevelle | Bevelle | 52–54 |
| via-purifico | Via Purifico | 54–56 |
| highbridge | Highbridge | 56–57 |
| calm-lands | Calm Lands | 57–62 |
| mt-gagazet | Mt. Gagazet | 60–62 |
| zanarkand-dome | Zanarkand Dome | 62–65 |
| airship-sin | Airship / Sin Approach | 65–68 |
| inside-sin | Inside Sin | 68–75 |
| airship | Airship (Optional) | 65–67 + 76–85 |

> **Note:** Page ranges are approximate. Always check `1a-epub-page-chapter-map.md` first for exact boundaries. Some pages span two chapters — read the full page and extract only your chapter's content.

- [ ] **Step 2: Validate all 26 reference docs exist and are non-empty**
```bash
ls docs/fixes/wave0/ | wc -l
# Expected: 26
for f in docs/fixes/wave0/*.md; do echo "$(wc -w < "$f") words — $f"; done
# Expect every file > 100 words. Re-run any agent that produced < 100 words.
```

- [ ] **Step 3: Commit Wave 0**
```bash
git add docs/fixes/wave0/
git commit -m "fixes: Wave 0 — EPUB reference docs for all 26 chapters"
```

---

## Task 2: Wave 1 — Systemic Fixes (11 parallel agents)

These are purely mechanical JSON edits. No EPUB research needed. Each agent should read the current chapter JSON, make only the listed changes, and write the file back. Do NOT add any content beyond what is listed — that comes in later waves.

- [ ] **Step 1: Launch all 12 systemic fix agents simultaneously**

---

### Agent 1-A: moonflow — Primer + images

**File:** `spira-guide/src/data/chapters/moonflow.json`

**Changes:**
1. In the items array, find `"Al Bhed Primer Vol. XI"` → rename to `"Al Bhed Primer Vol. XII"`. Update the item `id` to `moonflow-primer-xii`.
2. In `subLocations[*].guideImages`: remove `image_0046_00.jpeg`, `image_0048_00.jpeg`, `image_0049_00.jpeg`. Add `image_0044_00.jpeg` (this image was incorrectly assigned to djose).
3. No other changes.

**Verify:** JSON is valid. Primer is now Vol. XII. Only `image_0044_00.jpeg` remains in guideImages.

---

### Agent 1-B: guadosalam — Primer + O'aka

**File:** `spira-guide/src/data/chapters/guadosalam.json`

**Changes:**
1. Find `"Al Bhed Primer Vol. XII"` → rename to `"Al Bhed Primer Vol. XIII"`. Update ID to `guadosalam-primer-xiii`.
2. Read current `oaka` field. If it is `null`, set it to `{ "meeting": true, "cumulativeTarget": 10001 }` (O'aka is present in the Guadosalam inn).
3. Remove `image_0046_00.jpeg` from any `guideImages` array — this image belongs to moonflow/guadosalam boundary but the audit confirmed it is from the wrong chapter. Leave the guideImages array empty if this was the only image; correct images will be added in Wave 4.
4. No other changes.

---

### Agent 1-C: thunder-plains — Primer + image

**File:** `spira-guide/src/data/chapters/thunder-plains.json`

**Changes:**
1. Find `"Al Bhed Primer Vol. XIII (say 'Okay' to Rin after talking to Rikku)"` → rename to `"Al Bhed Primer Vol. XIV (say 'Okay' to Rin after talking to Rikku)"`. Update ID to `thunder-plains-primer-xiv`.
2. The item must keep the missable flag set to `false` (it is obtainable, just dialogue-gated, but not permanently missable in the same session — the Wave 5 agent will add the missable warning).
3. Remove `image_0052_00.jpeg` from `subLocations[*].guideImages` — this is a Bikanel Desert image incorrectly assigned here.
4. No other changes.

---

### Agent 1-D: macalania-woods — Primer

**File:** `spira-guide/src/data/chapters/macalania-woods.json`

**Changes:**
1. Find `"Al Bhed Primer Vol. XIV"` → rename to `"Al Bhed Primer Vol. XV"`. Update ID to `macalania-woods-primer-xv`.
2. No other changes.

---

### Agent 1-E: lake-macalania — Primer + image + Wendigo stub

**File:** `spira-guide/src/data/chapters/lake-macalania.json`

**Changes:**
1. Find `"Al Bhed Primer Vol. XV"` → rename to `"Al Bhed Primer Vol. XVI"`. Update ID to `lake-macalania-primer-xvi`.
2. Remove `image_0053_00.jpeg` from `subLocations[*].guideImages` — this is a Bikanel Desert image. Keep `image_0051_00.jpeg` and `image_0051_01.jpeg`.
3. Add a new boss entry to the `bosses` array:
```json
{
  "slug": "wendigo",
  "strategy": "PLACEHOLDER — full strategy added in Wave 3. HP: 18,000. Weak to Fire."
}
```
4. No other changes.

---

### Agent 1-F: bikanel-desert — Primers

**File:** `spira-guide/src/data/chapters/bikanel-desert.json`

**Changes:**
1. This chapter currently has TWO primers: `"Al Bhed Primer Vol. XVI"` and `"Al Bhed Primer Vol. XVII"`. Read `docs/fixes/wave0/bikanel-desert-reference.md` to determine which primer(s) are actually in Bikanel per the EPUB.
2. Based on EPUB: Bikanel Desert contains Vol. XVII. Remove the Vol. XVI item entirely (it is a duplicate of the error from macalania-woods). Rename Vol. XVII item if needed. Update ID to `bikanel-desert-primer-xvii`.
3. Also check: `image_0052_00.jpeg` and `image_0053_00.jpeg` are both assigned to bikanel-desert. Per the image audit, 0052 is a Bikanel image (correct) and 0053 may also be Bikanel. Keep both for now — the Wave 4 image agent will finalize this.
4. No other changes.

---

### Agent 1-G: ss-winno — Fabricated content + party

**File:** `spira-guide/src/data/chapters/ss-winno.json`

**Changes:**
1. In `subLocations[0].prose`: Remove all references to "Jecht Sphere #1", "Auron's Overdrive Bushido: Dragon Fang", and "passing drills". The Jecht Shot mini-game tip is real and should remain. Rewrite the prose to remove only the fabricated elements, keeping the Hi-Potion chest and Primer mentions. Keep it concise.
2. In `subLocations[0].items`: Remove any item with "Jecht Sphere" in the name. Verify the Hi-Potions and Primer Vol. V against `docs/fixes/wave0/ss-winno-reference.md`. **Primer V check:** if the EPUB does NOT place Primer V on S.S. Winno (it may belong to Luca), remove it here. Keep only items confirmed by the EPUB.
3. In `party`: Remove `"Auron"` — Auron does not join the party until Luca. The correct party for S.S. Winno is `["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"]`.
4. `guideImages`: Images `image_0034_00.jpeg` and `image_0035_00.jpeg` are from Luca pages. Remove them. Leave `guideImages: []` — correct images will be added in Wave 4 if available.
5. No other changes.

---

### Agent 1-H: djose — Image reassignment

**File:** `spira-guide/src/data/chapters/djose.json`

**Changes:**
1. Remove `image_0044_00.jpeg` from ALL `subLocations[*].guideImages` arrays. This image belongs to moonflow (it has been moved there in Agent 1-A).
2. Keep `image_0042_00.jpeg` — this is a valid Djose image.
3. No other changes.

---

### Agent 1-I: home — Wendigo removal + Guardian fix

**File:** `spira-guide/src/data/chapters/home.json`

**Changes:**
1. In `bosses`: Remove the `wendigo` entry entirely. Wendigo fights at Lake Macalania, not Home. (It has been added to lake-macalania in Agent 1-E.)
2. The `bosses` array in home.json should now be `[]`.
3. Read `docs/fixes/wave0/home-reference.md` — if the EPUB describes Guado Guardian fights at Home, those are scripted story triggers not tracked as boss cards. Confirm there are no real trackable bosses at Home per the EPUB.
4. No other changes.

---

### Agent 1-J: calm-lands — Defender X strategy fix

**File:** `spira-guide/src/data/chapters/calm-lands.json`

**Changes:**
1. In `bosses` where `slug: "defender-x"`, find the strategy text: `"Use Lancet with Kimahri to learn Mighty Guard (extremely useful)"` — this is **factually wrong**. Mighty Guard is learned from Biran and Yenke at Mt. Gagazet, not from Defender X.
2. Replace that sentence with: `"Armor Break followed by physical attacks works well. Provoke with Tidus to protect weaker characters."` (Lancet on Defender X teaches only Thrust Kick and HD — not Mighty Guard.)
3. Keep the rest of the strategy text intact.
4. No other changes.

---

### Agent 1-K: besaid — Image fix

**File:** `spira-guide/src/data/chapters/besaid.json`

**Changes:**
1. In ALL `subLocations[*].guideImages` arrays: remove `image_0029_00.jpeg`. This image is from S.S. Liki pages and is incorrectly assigned to both Besaid Village and Besaid Temple sublocations.
2. Leave `guideImages: []` for both sublocations — correct images will be assigned in Wave 4 if available on disk (check `spira-guide/public/img/guide/` for any image_0027_*.jpeg or image_0028_*.jpeg files that belong to Besaid).
3. The `image_0027_00.jpeg` assigned to the Beach sublocation — verify this is a Besaid image per `docs/audit/wave1/1d-image-audit.md`. If it is correct, keep it.
4. No other changes.

---

### Agent 1-L: airship — Omega Ruins fabricated item check

**File:** `spira-guide/src/data/chapters/airship.json`

**Changes:**
1. Scan all `optionalAreas[*].items` for any item named `"Master Sphere"` or `"Master Sphere ×2"` in the Omega Ruins section. If found, remove it — this was identified as fabricated content.
2. Read `docs/fixes/wave0/airship-reference.md` to confirm what items the EPUB actually lists for Omega Ruins.
3. If the Omega Ruins optional area doesn't exist yet in the JSON, skip — it will be created in Wave 2.
4. No other changes.

---

- [ ] **Step 2: Validate all 11 agents completed successfully**
  - All targeted JSON files parse as valid JSON
  - No agent touched fields it wasn't supposed to

- [ ] **Step 3: Launch Wave 1 QA agents (3 parallel)**

**QA agent prompt template:**
> You are the Wave 1 QA agent for the FFX walkthrough content fix project. Verify that ONLY the listed mechanical changes were made — nothing more, nothing less. For each chapter in your batch, independently confirm the change by reading both the updated chapter JSON and the relevant audit report.
>
> **Your chapters:** {CHAPTER_LIST}
>
> **Verification checklist for each chapter:**
> - Primer number: read the EPUB page(s) for this chapter in `/tmp/epub-pages/` to confirm the correct volume number
> - Images: cross-check against `docs/audit/wave1/1d-image-audit.md`
> - Fabricated content: confirm removed items/text are truly absent from EPUB
> - Party lists: confirm against EPUB party composition
> - JSON validity: file parses without errors
> - No unintended changes: diff the chapter JSON against what it should look like per the task spec
>
> For each finding, write: PASS / FAIL + evidence.
>
> Write your report to: `docs/fixes/qa/wave1-qa-report-{BATCH_LETTER}.md` (e.g., `wave1-qa-report-a.md` for QA-1A).
> Use section `## {slug}` per chapter.

**QA batch assignments:**
- QA-1A: moonflow, guadosalam, thunder-plains, macalania-woods
- QA-1B: lake-macalania, bikanel-desert, ss-winno, djose
- QA-1C: home, calm-lands, airship

- [ ] **Step 4: Review QA reports — fix any FAIL items by re-running the relevant agent**

- [ ] **Step 5: Commit Wave 1**
```bash
git add spira-guide/src/data/chapters/
git commit -m "fixes: Wave 1 — systemic fixes (Primers, images, fabricated content, Wendigo move)"
```

---

## Task 3: Wave 2 — Full Chapter Rewrites (9 parallel implementation agents)

The 3 most broken chapters. Each chapter gets 3 parallel implementation agents writing to separate JSON fragment files, then 1 assembly agent combines them.

**Important:** Each agent writes a fragment file only — NOT directly to the chapter JSON. The assembly agent (Task 4) does the final merge.

---

### calm-lands (3 agents)

#### Agent 2-A1: calm-lands sublocations

**Input:** `docs/fixes/wave0/calm-lands-reference.md`, `docs/audit/wave2/2g-via-purifico-highbridge-calm-lands-gagazet.md` (§Calm Lands section). Check `docs/audit/wave1/1a-epub-page-chapter-map.md` for the exact calm-lands EPUB pages before reading any raw pages.
**Output:** `docs/fixes/wave2/calm-lands-sublocations.json`

> You are rewriting the calm-lands chapter sublocations for the FFX walkthrough app. READ the EPUB reference and audit report listed above. DO NOT edit any chapter JSON directly — write your output ONLY to the fragment file.
>
> The current subLocations array has 1 entry covering 4 EPUB pages with 75 words. This needs to become 3–4 sublocations covering all distinct areas.
>
> Write a JSON array (the new `subLocations` value) covering:
> 1. **Calm Lands (Plateau)** — arrival, Magic Counter Shield hover vendor (MISSABLE), chocobo trainer, Caladbolg chest (NW corner after race), Al Bhed Primer XXIII location, capture quest start at Monster Arena
> 2. **Monster Arena** — capturing mechanics, what the owner sells, progression overview
> 3. **Gorge + Side Routes** — Gorge bottom items (Duren blitzball player, recruitable pre-Zanarkand MISSABLE), any chest items along gorge paths
>
> For each sublocation: write comprehensive prose (60–150 words), list all items with IDs/icons/missable flags, include appropriate `guideImages` from `["image_0061_00.jpeg","image_0062_00.jpeg","image_0062_01.jpeg"]`.
>
> Output format: valid JSON array, e.g. `[{"name":"...","prose":"...","guideImages":[...],"items":[...]}]`
>
> Write to: `docs/fixes/wave2/calm-lands-sublocations.json`

#### Agent 2-A2: calm-lands bosses

**Input:** `docs/fixes/wave0/calm-lands-reference.md`, `docs/source-data/monsters.json`, `docs/audit/wave2/2g-via-purifico-highbridge-calm-lands-gagazet.md`. Check `1a-epub-page-chapter-map.md` for calm-lands pages before reading raw EPUB.
**Output:** `docs/fixes/wave2/calm-lands-bosses.json`

> Rewrite the Defender X boss entry and add any other boss entries for calm-lands.
>
> From `monsters.json`, get Defender X's authoritative HP and any steal/drop data.
> From the EPUB reference, confirm what bosses appear in the Calm Lands.
>
> Defender X strategy must:
> - State the correct HP (from monsters.json)
> - NOT claim Lancet teaches Mighty Guard (it doesn't — Mighty Guard is from Biran/Yenke at Gagazet)
> - Describe Taunt mechanic, Armor Break approach, Provoke strategy
> - Mention elemental weaknesses if any
> - Be 50–120 words
>
> Output format: valid JSON array, e.g. `[{"slug":"defender-x","strategy":"..."}]`
>
> Write to: `docs/fixes/wave2/calm-lands-bosses.json`

#### Agent 2-A3: calm-lands optional areas

**Input:** `docs/fixes/wave0/calm-lands-reference.md`, `docs/fixes/wave0/airship-reference.md`, `docs/audit/wave2/2g-via-purifico-highbridge-calm-lands-gagazet.md`. Check `1a-epub-page-chapter-map.md` for exact page ranges before reading raw EPUB.
**Output:** `docs/fixes/wave2/calm-lands-optional-areas.json`

> Write optional area entries for content accessible FROM the Calm Lands hub area. These will be added to the chapter's `optionalAreas` array.
>
> Cover:
> 1. **Remiem Temple** (accessible via Chocobo from Calm Lands eastern path) — Cloudy Mirror reward, Belgemine aeon duel series, Primer XXIV, Moon Sigil
> 2. **Celestial Mirror activation** — where to activate the Cloudy Mirror to get Celestial Mirror (exact location in Macalania Woods)
> 3. **Cavern of the Stolen Fayth** (NE gorge corner) — all items from EPUB, Yojimbo recruitment, brief encounter warnings
>
> Note: Remiem and Cavern may already exist in `airship.json`'s optionalAreas. Check `spira-guide/src/data/chapters/airship.json` — if they already have entries there, write IMPROVED versions here (with more items and better prose) that will replace those entries in calm-lands.json only. The airship.json entries will be updated in Wave 2 airship agents.
>
> Output: valid JSON array for `optionalAreas`.
> Write to: `docs/fixes/wave2/calm-lands-optional-areas.json`

---

### inside-sin (3 agents)

#### Agent 2-B1: inside-sin Sea of Sorrow sublocation

**Input:** `docs/fixes/wave0/inside-sin-reference.md`, `docs/audit/wave2/2h-zanarkand-dome-airship-sin-inside-sin.md` (§Inside Sin). Check `1a-epub-page-chapter-map.md` for exact inside-sin page ranges before reading raw EPUB.
**Output:** contribution to `docs/fixes/wave2/inside-sin-sublocations.json`

> Write the "Sea of Sorrow" sublocation entry for inside-sin.
>
> Read the EPUB pages and extract all items, enemy warnings, and navigation directions for the first distinct area of Inside Sin (the Sea of Sorrow / entry zone).
>
> Produce a single sublocation JSON object:
> ```json
> {"name":"Sea of Sorrow","prose":"...","guideImages":[...],"items":[...]}
> ```
> Prose should be 80–150 words covering: navigation, notable enemies (Behemoth King Meteor warning, Energy Dragon Bio vulnerability), first set of chest items.
>
> Write to `docs/fixes/wave2/inside-sin-sea-of-sorrow.json` as a JSON array with this as the only element.

#### Agent 2-B2: inside-sin City of Dying Dreams + Tower of Death sublocations

**Input:** `docs/fixes/wave0/inside-sin-reference.md`, `docs/audit/wave2/2h-zanarkand-dome-airship-sin-inside-sin.md`. Check `1a-epub-page-chapter-map.md` for exact page ranges.
**Output:** append to `docs/fixes/wave2/inside-sin-sublocations.json`

> Write TWO sublocation entries for inside-sin: "City of Dying Dreams" and "Tower of Death".
>
> City of Dying Dreams: teleport platforms, kill-door puzzles (complete solution per EPUB), Demonolith enemies (petrification warning), items in this section.
>
> Tower of Death: crystal platforms, final chest items (Four-on-One, Laevatein, Defending Bracer — verify against EPUB), the last Save Sphere / point-of-no-return warning ("last chance to return to airship for side quests").
>
> Produce TWO sublocation JSON objects as a JSON array.
> Write to `docs/fixes/wave2/inside-sin-city-and-tower.json` (separate file from 2-B1 — the assembly agent merges all fragments).

#### Agent 2-B3: inside-sin bosses + meta

**Input:** `docs/fixes/wave0/inside-sin-reference.md`, `docs/source-data/monsters.json`, `docs/audit/wave2/2h-zanarkand-dome-airship-sin-inside-sin.md`
**Output:** `docs/fixes/wave2/inside-sin-meta.json`

> Fix and complete the inside-sin chapter metadata and bosses array.
>
> **Bosses to fix:**
>
> `sinspawn-genais`: This boss belongs in `airship-sin.json`, NOT inside-sin. The assembly agent will leave this entry out of inside-sin. Do not include it in your output.
>
> `seymour-omnis` (HP: 80,000 from monsters.json): Current strategy has a CRITICAL ERROR — it says "Destroy all four [Mortiphasms] before casting any spell each round." The EPUB says to ROTATE the Mortiphasms (the elements they absorb cycle — you rotate to find a safe element), not destroy them. Rewrite the strategy correctly: describe the Mortiphasms rotation mechanic, Multi-Spell danger, Non-elemental safety, Dispel on his buffs.
>
> `braska-final-aeon`: Verify against EPUB — keep current strategy if accurate, expand if EPUB has additional mechanics.
>
> `yu-yevon`: Keep as-is.
>
> **Meta fields:**
> - `missables`: Add a warning: "Point of no return — after the final Save Sphere in Tower of Death, you cannot return to the airship. Complete all side quests first."
> - `sgTip`: Add: "Ensure your key characters have Auto-Life or a full complement of Overdrives. This is the final dungeon."
>
> Output format:
> ```json
> {
>   "bosses": [...],
>   "missables": [...],
>   "sgTip": "..."
> }
> ```
> Write to: `docs/fixes/wave2/inside-sin-meta.json`

---

### airship optional (3 agents)

#### Agent 2-C1: airship — new sublocations

**Input:** `docs/fixes/wave0/airship-reference.md`, EPUB pages 76–77, `docs/audit/wave2/2i-airship-optional-endgame.md`
**Output:** `docs/fixes/wave2/airship-new-sublocations.json`

> Add TWO entirely missing sublocations to the airship chapter's main `subLocations` array.
>
> **1. Hidden Locations** (EPUB page 76): Four map coordinate locations accessible from the Airship menu. Each has unique equipment/items. List all 4 with their coordinates (X/Y ranges) and the items/weapons found.
>
> **2. Airship Passwords** (EPUB page 76): Three secret passwords (GODHAND, VICTORIOUS, MURASAME) that unlock three unique weapons. Describe each: the password, where to enter it on the airship, the weapon obtained and who it's for.
>
> Prose per sublocation: 60–120 words. Include items with IDs, names, icons, missable flags.
>
> Output: valid JSON array of 2 new sublocation objects.
> Write to: `docs/fixes/wave2/airship-new-sublocations.json`

#### Agent 2-C2: airship — new boss cards

**Input:** `docs/fixes/wave0/airship-reference.md`, `docs/source-data/monsters.json`, EPUB pages 76–85, `docs/audit/wave2/2i-airship-optional-endgame.md`
**Output:** `docs/fixes/wave2/airship-new-bosses.json`

> Add 4 missing boss card entries for the airship chapter.
>
> For each boss, get authoritative HP from `monsters.json`. Write strategies of 60–150 words each.
>
> **Geosgaeno** (Baaj Temple revisit): weak to Ice, hits very hard. Strategy: bring high-level party, use Lulu's Blizzaga or Rikku's Ice items. HP from monsters.json.
>
> **Yojimbo** (Cavern of the Stolen Fayth recruitment): This is a negotiation, not a standard fight. Describe: choose "to defeat the most powerful enemies" (cheapest), haggle to ~1/3 of asking price, budget at minimum 200,000 Gil. Zanmato one-shots anything.
>
> **Ultima Weapon** (Omega Ruins / or map coordinate — verify per EPUB): HP from monsters.json. Strategy: key mechanics, weaknesses.
>
> **Omega Weapon** (Omega Ruins): HP from monsters.json (likely 999,999). Strategy: Trio of 9999 or max stats required, mechanics.
>
> Output: valid JSON array of 4 boss objects: `[{"slug":"geosgaeno","strategy":"..."},...]`
> Write to: `docs/fixes/wave2/airship-new-bosses.json`

#### Agent 2-C3: airship — optional area improvements

**Input:** `docs/fixes/wave0/airship-reference.md`, EPUB pages 76–85, `docs/audit/wave2/2i-airship-optional-endgame.md`, current `spira-guide/src/data/chapters/airship.json`
**Output:** `docs/fixes/wave2/airship-optional-updates.json`

> Improve the existing optionalAreas entries in airship.json. Read the current airship.json to see what already exists, then produce an updated optionalAreas array.
>
> Fix/expand these existing optional areas (keep what's already good, add what's missing):
>
> **Remiem Temple**: Add all Belgemine fight prizes (prizes for each aeon defeated), Moon Sigil details, ensure Primer XXIV and Cloudy Mirror are listed.
>
> **Cavern of the Stolen Fayth**: Add all 8+ chest items from EPUB. Keep Yojimbo recruitment prose (boss card now handles strategy). Add Great Malboro ambush warning. Add Yojimbo aeon unlock.
>
> **Baaj Temple (Revisit)**: Verify Onion Knight and Anima are listed. Add any other items per EPUB.
>
> **Omega Ruins**: Add all treasure chest items from EPUB. Correct any fabricated "Master Sphere x2" if present (remove it). Add Great Malboro ambush warning.
>
> Also check EPUB pages 80–81 for Celestial Weapons guide content — if the EPUB has a dedicated section, add a brief optional area entry summarizing the 7 weapons and where to find crests/sigils.
>
> Output: valid JSON array for the complete updated `optionalAreas`.
> Write to: `docs/fixes/wave2/airship-optional-updates.json`

---

- [ ] **Step 2: Verify all 10 fragment files exist**
```bash
ls docs/fixes/wave2/
# Expected: 10 files (calm-lands×3, inside-sin×3 split into 3 files, airship×3)
```

---

## Task 4: Wave 2 — Assembly (3 parallel agents, one per chapter)

Each assembly agent reads the fragment files + current chapter JSON and writes the complete updated chapter JSON.

- [ ] **Step 1: Launch 3 assembly agents simultaneously**

#### Assembly Agent A: calm-lands

> Read these files:
> - Current: `spira-guide/src/data/chapters/calm-lands.json`
> - `docs/fixes/wave2/calm-lands-sublocations.json`
> - `docs/fixes/wave2/calm-lands-bosses.json`
> - `docs/fixes/wave2/calm-lands-optional-areas.json`
>
> Produce the updated `calm-lands.json` by:
> 1. Replace `subLocations` with the array from calm-lands-sublocations.json
> 2. Replace `bosses` with the array from calm-lands-bosses.json
> 3. Append the entries from calm-lands-optional-areas.json into `optionalAreas` (merging with existing entries where the name already exists)
> 4. Preserve all other fields (`slug`, `missables`, `party`, `oaka`, `sgTip`, `cloister`)
> 5. Validate the output JSON parses correctly
>
> Write to: `spira-guide/src/data/chapters/calm-lands.json`

#### Assembly Agent B: inside-sin

> Read these files:
> - Current: `spira-guide/src/data/chapters/inside-sin.json`
> - `docs/fixes/wave2/inside-sin-sea-of-sorrow.json` (1 sublocation)
> - `docs/fixes/wave2/inside-sin-city-and-tower.json` (2 sublocations)
> - `docs/fixes/wave2/inside-sin-meta.json`
>
> Produce the updated `inside-sin.json` by:
> 1. Replace `subLocations` with a merged 3-item array: Sea of Sorrow first, then City of Dying Dreams and Tower of Death from the second file
> 2. Replace `bosses` with the array from inside-sin-meta.json (do NOT include sinspawn-genais)
> 3. Update `missables` to include the point-of-no-return warning from inside-sin-meta.json (merge with existing missables, don't duplicate)
> 4. Update `sgTip` from inside-sin-meta.json
> 5. Preserve `slug`, `party`, `oaka`, `cloister`, `optionalAreas`
>
> Write to: `spira-guide/src/data/chapters/inside-sin.json`

#### Assembly Agent C: airship

> Read these files:
> - Current: `spira-guide/src/data/chapters/airship.json`
> - `docs/fixes/wave2/airship-new-sublocations.json`
> - `docs/fixes/wave2/airship-new-bosses.json`
> - `docs/fixes/wave2/airship-optional-updates.json`
>
> Produce the updated `airship.json` by:
> 1. APPEND the 2 new sublocations to `subLocations` (after existing entries)
> 2. APPEND the 4 new boss cards to `bosses` (after existing evrae entry)
> 3. REPLACE `optionalAreas` with the updated array from airship-optional-updates.json
> 4. Validate JSON
>
> Write to: `spira-guide/src/data/chapters/airship.json`

---

## Task 5: Wave 2 — QA (3 parallel agents, one per chapter)

Full independent verification for the 3 most complex chapter rewrites.

- [ ] **Step 1: Launch 3 QA agents simultaneously, one per chapter**

**QA agent prompt template for Wave 2:**
> You are the Wave 2 QA agent for {CHAPTER} ({SLUG}). Perform a full independent verification of the updated chapter JSON against the raw EPUB source.
>
> **Files to read:**
> - Updated JSON: `spira-guide/src/data/chapters/{SLUG}.json`
> - EPUB pages: {EPUB_PAGES} in `/tmp/epub-pages/`
> - Audit report: `docs/audit/wave2/{AUDIT_FILE}.md`
> - Consolidated findings: `docs/audit/wave3/3a-consolidated-gap-report.md` (§{SLUG})
>
> **For every sublocation:** confirm the EPUB contains content matching the prose. Flag any sublocation whose prose contradicts the EPUB.
>
> **For every item:** confirm it appears in the EPUB for this chapter. Flag any item that seems to be from the wrong area.
>
> **For every boss:** confirm HP matches `docs/source-data/monsters.json`. Confirm strategy describes real mechanics (not fabricated ones).
>
> **For every finding in the audit report for this chapter:** verify it was addressed or explain why it wasn't.
>
> Write report to: `docs/fixes/qa/wave2-qa-report-{SLUG}.md`
> Format: `## [finding]` sections, each with PASS / FAIL / PARTIAL + evidence.

**QA assignments:**
- QA-2A: calm-lands, check `1a-epub-page-chapter-map.md` for exact pages, audit file `2g-via-purifico-highbridge-calm-lands-gagazet.md`
- QA-2B: inside-sin, check `1a-epub-page-chapter-map.md` for exact pages, audit file `2h-zanarkand-dome-airship-sin-inside-sin.md`
- QA-2C: airship (optional), check `1a-epub-page-chapter-map.md` for exact pages, audit file `2i-airship-optional-endgame.md`

- [ ] **Step 2: Review QA reports — fix any FAIL items by re-running the relevant fragment agent and reassembling**

- [ ] **Step 3: Commit Wave 2**
```bash
git add spira-guide/src/data/chapters/calm-lands.json \
        spira-guide/src/data/chapters/inside-sin.json \
        spira-guide/src/data/chapters/airship.json \
        docs/fixes/
git commit -m "fixes: Wave 2 — full rewrites for calm-lands, inside-sin, airship"
```

---

## Task 6: Wave 3 — Boss Cards (10 parallel agents)

One agent per chapter with missing or broken boss entries. Each agent edits only the `bosses` array of their chapter JSON.

- [ ] **Step 1: Launch all 10 boss card agents simultaneously**

For every agent below, provide this base context:
> You are fixing boss entries for the FFX walkthrough app. Edit ONLY the `bosses` array of the specified chapter JSON.
> Reference `docs/source-data/monsters.json` for authoritative HP values.
> Reference `docs/fixes/wave0/{slug}-reference.md` for EPUB prose on each boss.
> Reference the relevant Wave 2 audit file for specific findings.
> Strategy should be 50–150 words. Include: HP, key mechanics, weaknesses if notable, steal/drop if worthwhile.

---

**Agent 3-1: besaid**
- Add new boss entry: `slug: "kimahri"`, HP from monsters.json, strategy describing the 1-on-1 fight mechanics, any weaknesses/stealable items. This is the first mandatory solo boss fight.
- Remove or correct the existing `valefor` entry (Valefor is obtained here, not fought — the current text is correct, leave it if accurate).

**Agent 3-2: baaj-temple**
- Add new boss entry: `slug: "geosgaeno"` for the INITIAL encounter (scripted — Tidus cannot win, the party escapes). Strategy should note it is scripted and describe the escape mechanic, HP from monsters.json.
- Note: The full post-game Geosgaeno fight is in `airship.json` (already added in Wave 2).

**Agent 3-3: lake-macalania**
- Replace the Wave 1 Wendigo placeholder (`"PLACEHOLDER — full strategy added in Wave 3"`) with a complete strategy. HP from monsters.json (18,000). Key points: appears immediately after Seymour fight with no save, weak to Fire, uses physical + status attacks. Describe Rikku or Lulu approach.

**Agent 3-4: bevelle**
- Add boss entry: `slug: "seymour-natus"`. HP from monsters.json. Strategy: Mortiphasms (same rotation mechanic as Seymour Omnis but simpler), Protect/Shell approach, Aim for weak element. Note: fought after the Bevelle Temple Cloister.
- Verify per `docs/fixes/wave0/bevelle-reference.md` whether Evrae Altana is fought here or in via-purifico. Add whichever boss entry belongs to bevelle.

**Agent 3-5: airship-sin**
- Read `spira-guide/src/data/chapters/airship-sin.json` and `docs/audit/wave2/2h-zanarkand-dome-airship-sin-inside-sin.md`.
- Fix the boss fight ORDER — the correct sequence per EPUB is: Sin's Left Fin → Sin's Right Fin → Sin's Core + Sinspawn Genais (simultaneously) → Overdrive Sin (Head). Update boss ordering/prose accordingly.
- Add `sinspawn-genais` boss entry (moved from inside-sin). HP from monsters.json.
- Fix existing strategies: add ship positioning mechanic (move close for Cid's missiles, pull back to avoid attacks), add Giga-Graviton countdown (~16 turns, instant kill) to Overdrive Sin strategy.

**Agent 3-6: mt-gagazet**
- Expand `biran-and-yenke` strategy: add that they copy Kimahri's learned abilities and grow to match party stats, that guarding on one while attacking the other is key, Lancet teaches Mighty Guard here (correct location), Biran casts Berserk, use Lancet to steal White Wind.
- Expand `seymour-flux` strategy: add Total Annihilation attack (charged over multiple turns, must kill adds to interrupt), silence vulnerability, Zombie strategy detail, safe HP threshold.

**Agent 3-7: via-purifico**
- Expand `isaaru` boss entry: this is 3 sequential aeon fights (Valefor vs Valefor, Ifrit vs Ifrit, Bahamut vs Bahamut). For each: describe which aeon Isaaru uses, how to exploit Yuna's stronger aeon stats. Brief but covers all 3 fights.

**Agent 3-8: zanarkand-dome**
- Expand `spectral-keeper` strategy: the fight takes place on a 6-platform grid — this is the entire mechanic. Platform the party stands on explodes when Spectral Keeper Tera-Gravitations (leaves a detonation marker). Must keep moving to survive. Add HP from monsters.json.

**Agent 3-9: kilika**
- Fix `sinspawn-geneaux` strategy: correct the shell mechanic — the shell ABSORBS magic, use Kimahri's Lancet (piercing) or physical attacks on the shell. Tentacles absorb magic. Describe the phased approach.
- Fix `lord-ochu` strategy: add the correct tip for the sub-2000 HP threshold (Valefor's Energy Ray at sub-2000 causes paralysis, not the sleep loop). Also add NulBlaze Shield as a conditional reward.

**Agent 3-10: ss-liki**
- Fix `sin-fin` strategy: Auron cannot hit Sin's Fin — correct attribution to Yuna summoning an aeon for max damage. Add Sinscale management tip: leave one Sinscale alive to stop the constant respawn loop.

---

- [ ] **Step 2: Launch Wave 3 QA agents (3 parallel)**

**QA batch assignments:**
- QA-3A: besaid, baaj-temple, lake-macalania, bevelle — verify boss HP vs monsters.json, verify strategies describe real mechanics
- QA-3B: airship-sin, mt-gagazet, via-purifico, zanarkand-dome — same
- QA-3C: kilika, ss-liki — same

Each QA agent writes to its own file: `docs/fixes/qa/wave3-qa-report-{batch}.md` (e.g., `wave3-qa-report-a.md`, `wave3-qa-report-b.md`, `wave3-qa-report-c.md`).

- [ ] **Step 3: Fix any FAIL items, re-run QA if needed**

- [ ] **Step 4: Commit Wave 3**
```bash
git add spira-guide/src/data/chapters/
git commit -m "fixes: Wave 3 — boss cards: 10 chapters (Kimahri, Wendigo, Seymour Natus, Geosgaeno, Spectral Keeper, and 5 strategy fixes)"
```

---

## Task 7: Wave 4 — Items + Sublocations (22 parallel agents)

One agent per chapter with item gaps. Each agent reads the Wave 0 reference doc for their chapter and fills in missing items and sublocations.

**Base context for every Wave 4 agent:**
> Edit `spira-guide/src/data/chapters/{SLUG}.json`. Add missing items and sublocations as identified in `docs/audit/wave2/{AUDIT_FILE}.md` §{slug} dimension C (Missing Items) and dimension A (Sublocation Completeness).
>
> Primary source for item content: `docs/fixes/wave0/{slug}-reference.md`
> Fallback source: the relevant EPUB pages directly at `/tmp/epub-pages/page_NN.html`
> Cross-reference: `docs/source-data/locations-poptracker.json` for item location data
>
> Rules:
> - Add items in the sublocation where they are found
> - Item IDs: `{slug}-{item-kebab}` (e.g., `kilika-nulblaze-shield`)
> - Missable flag: `true` only if the item cannot be obtained after this chapter
> - If a sublocation needs to be created (not split/rewrite), keep the name concise
> - Do NOT rewrite existing prose — only add new items and new sublocation objects
> - Verify JSON validity after editing

**Per-chapter task list (audit finding source in parentheses):**

| Agent | Chapter | Key items to add | Audit source |
|-------|---------|-----------------|--------------|
| 4-1 | macalania-woods | 12+ items: Sleepy Cait Sith, Remedy×3, 400 Gil, Elixir, 2000 Gil, Mega-Potion, Hi-Potion×2, Phoenix Down×3, Jecht's Sphere (Jecht Sphere #5), MP Sphere, Ether. Also butterfly mini-game rewards | `2e` §Macalania Woods |
| 4-2 | lake-macalania | 15+ items across Travel Agency, Temple, under-ice areas. Include all chest items. Cloister rewards. Create "Under the Ice" sublocation if needed. | `2e` §Lake Macalania |
| 4-3 | bikanel-desert | 11+ items from EPUB. Remove erroneous Vol. XVI primer if still present. Multiple sublocation areas (East, Central, West Al Bhed camps) | `2f` §Bikanel Desert |
| 4-4 | moonflow | 10+ items: 6× Lv.1 Key Sphere, Dragon Scales, Magic Def Sphere, Phoenix Down×2, 5,000 Gil. Add North Wharf sublocation with items found there. | `2d` §Moonflow |
| 4-5 | mushroom-rock-road | 9+ items including all Djose Highway chests. Split into 2 sublocations (Ridge + Lower Road). Remove erroneous Dingo enemy reference from prose. | `2c` §Mushroom Rock Road |
| 4-6 | miihen-highroad | 8+ items: Oldroad section (Heat Lance, Thunder Blade, Scout, Fortune Sphere), NPC-given items (Ether, Eye Drops, Key Spheres). Add Oldroad as a sublocation. | `2c` §Mi'ihen Highroad |
| 4-7 | djose | 8+ items including Switch Hitter, Halberd, Mega Phoenix, Magic Sphere (correct Destruction Sphere reward — NOT Magistral Rod). Fix the Destruction Sphere reward item. | `2d` §Djose |
| 4-8 | bevelle | 9 missing items from EPUB. Cloister of Trials puzzle items. Primer XXII already present — keep it. | `2f` §Bevelle |
| 4-9 | guadosalam | 5+ items: 8× Lightning Marbles, Hi-Potion×2 (balcony), any other EPUB items | `2d` §Guadosalam |
| 4-10 | thunder-plains | Add Remedy and any other EPUB chest items. Primer XIV already fixed in Wave 1. | `2e` §Thunder Plains |
| 4-11 | mt-gagazet | 8+ trail items: 20,000 Gil, Braska's Sphere, Defending Bracer, HP Sphere, Lv.4 Key Sphere, Jecht Sphere #9, any others from EPUB | `2g` §Mt. Gagazet |
| 4-12 | besaid | 6+ items from dock/departure area: Seeker's Ring, Ether, Phoenix Down×3, Remedy, 400 Gil. Add dock/departure as sublocation. | `2a` §Besaid |
| 4-13 | zanarkand | 2 Potions from opening area per EPUB. Check for any other missed items. | `2a` §Zanarkand |
| 4-14 | luca | 2 items: 1,000 Gil and Strength Sphere. Fix Oblitzerator crane description (3 charges, not "each hit"). | `2c` §Luca |
| 4-15 | kilika | Add NulBlaze Shield (reward from Crusader sentry after Lord Ochu fight — confirm with EPUB). Any other items. | `2b` §Kilika |
| 4-16 | home | Add puzzle chest items (Special Sphere, Skill Sphere — permanently missable). Verify Primer XIX/XX locations match EPUB. | `2f` §Home |
| 4-17 | zanarkand-dome | Add Lv.3 Key Sphere and Magistral Rod (items missed per audit) | `2h` §Zanarkand Dome |
| 4-18 | via-purifico | Add Wakka's Rematch weapon (underwater channels). Verify all other items present. | `2g` §Via Purifico |
| 4-19 | baaj-temple | 5+ items (audit found 5 MEDIUM item gaps). Read `docs/fixes/wave0/baaj-temple-reference.md`. | `2a` §Baaj Temple |
| 4-20 | ss-winno | Verify items against EPUB reference. The Jecht Shot mini-game note in prose is accurate. Confirm Hi-Potion count is correct per EPUB. | `2b` §S.S. Winno |
| 4-21 | airship-sin | No items expected (confirmed by Wave 2 audit) — but verify against EPUB reference. If EPUB has items, add them. | `2h` §Airship-Sin |
| 4-22 | ss-liki | Check EPUB for any items missed (audit found some LOW gaps). Add any found. | `2b` §S.S. Liki |

> **Note:** highbridge and ss-liki are listed for completeness but may need minimal changes. The agent should still read the audit findings carefully.

---

- [ ] **Step 2: Launch Wave 4 QA agents (5 parallel)**

**QA batch assignments (4–5 chapters each):**
- QA-4A: macalania-woods, lake-macalania, bikanel-desert, moonflow
- QA-4B: mushroom-rock-road, miihen-highroad, djose, bevelle
- QA-4C: guadosalam, thunder-plains, mt-gagazet, besaid
- QA-4D: zanarkand, luca, kilika, home, zanarkand-dome
- QA-4E: via-purifico, baaj-temple, ss-winno, airship-sin, ss-liki

Each QA agent:
> For each chapter in your batch: read the updated JSON, the EPUB reference doc, and the Wave 2 audit report for that chapter. Confirm every item in the `items` arrays appears in the EPUB. Confirm item IDs are unique within the chapter. Confirm missable flags are correct. Flag any item that looks like it belongs to a different chapter.
>
> Write findings to `docs/fixes/qa/wave4-qa-report-{BATCH_LETTER}.md` (e.g., `wave4-qa-report-a.md` for QA-4A). Do NOT write to a shared file — each QA agent gets its own output file.

- [ ] **Step 3: Fix any FAIL items, re-run QA if needed**

- [ ] **Step 4: Commit Wave 4**
```bash
git add spira-guide/src/data/chapters/
git commit -m "fixes: Wave 4 — item completions across 22 chapters (~150 missing items added)"
```

---

## Task 8: Wave 5 — Prose + Tips + Missables (26 parallel agents)

Every chapter gets a dedicated agent for the final quality pass. Each agent addresses remaining findings in dimensions B (prose), E (tips), and F (missables).

**Base context for every Wave 5 agent:**
> You are doing the final prose and metadata quality pass for the FFX walkthrough app. Edit `spira-guide/src/data/chapters/{SLUG}.json`.
>
> Sources:
> - `docs/fixes/wave0/{slug}-reference.md` — clean EPUB prose
> - `docs/audit/wave2/{AUDIT_FILE}.md` §{slug} dimensions B, E, F
> - `docs/audit/wave3/3a-consolidated-gap-report.md` §{slug}
>
> **Tasks:**
> 1. **Prose quality (dim B):** Find any sublocation rated ≤3 in the audit. Rewrite that sublocation's prose to be comprehensive — directions, key enemy tips, item callouts. Target 80–200 words per sublocation.
> 2. **sgTip (dim E):** If `sgTip` is null, write one: a 1–2 sentence Sphere Grid tip relevant to this chapter's party composition and boss challenges.
> 3. **Missable warnings (dim F):** Add any missable items the audit identified that aren't already in the `missables` array. Use the EPUB to verify they are truly missable.
> 4. **O'aka tracking:** If `oaka` is null but EPUB shows O'aka is present, set `oaka: { "meeting": true, "cumulativeTarget": N }` where N is the running donation total at this point.
> 5. **Party accuracy:** Verify the `party` array matches who is actually available per EPUB. Fix any errors.
>
> Do NOT add items (Wave 4 handled that). Do NOT rewrite boss strategies (Wave 3 handled that). Focus only on prose, sgTip, missables, oaka, party.

**Per-chapter audit file references:**

| Slug | Wave 2 Audit File |
|------|------------------|
| zanarkand | `2a-zanarkand-baaj-besaid.md` |
| baaj-temple | `2a-zanarkand-baaj-besaid.md` |
| besaid | `2a-zanarkand-baaj-besaid.md` |
| ss-liki | `2b-ss-liki-kilika-ss-winno.md` |
| kilika | `2b-ss-liki-kilika-ss-winno.md` |
| ss-winno | `2b-ss-liki-kilika-ss-winno.md` |
| luca | `2c-luca-miihen-mushroom-rock.md` |
| miihen-highroad | `2c-luca-miihen-mushroom-rock.md` |
| mushroom-rock-road | `2c-luca-miihen-mushroom-rock.md` |
| djose | `2d-djose-moonflow-guadosalam.md` |
| moonflow | `2d-djose-moonflow-guadosalam.md` |
| guadosalam | `2d-djose-moonflow-guadosalam.md` |
| thunder-plains | `2e-thunder-macalania-lake.md` |
| macalania-woods | `2e-thunder-macalania-lake.md` |
| lake-macalania | `2e-thunder-macalania-lake.md` |
| bikanel-desert | `2f-bikanel-home-bevelle.md` |
| home | `2f-bikanel-home-bevelle.md` |
| bevelle | `2f-bikanel-home-bevelle.md` |
| via-purifico | `2g-via-purifico-highbridge-calm-lands-gagazet.md` |
| highbridge | `2g-via-purifico-highbridge-calm-lands-gagazet.md` |
| calm-lands | `2g-via-purifico-highbridge-calm-lands-gagazet.md` |
| mt-gagazet | `2g-via-purifico-highbridge-calm-lands-gagazet.md` |
| zanarkand-dome | `2h-zanarkand-dome-airship-sin-inside-sin.md` |
| airship-sin | `2h-zanarkand-dome-airship-sin-inside-sin.md` |
| inside-sin | `2h-zanarkand-dome-airship-sin-inside-sin.md` |
| airship | `2i-airship-optional-endgame.md` |

**Specific flags per chapter (supplement the base prompt):**

- **zanarkand**: prose is only 65 words — rewrite to at least 120 words covering Sinscale waves, the tanker section, swim/dive mechanics
- **ss-winno**: prose now lacks Jecht Sphere/drills (removed in Wave 1) — rewrite to focus on Jecht Shot mini-game, O'aka donation, Lulu/Wakka backstory scene
- **thunder-plains**: add missable warning for Primer XIV (say 'Okay' to Rin — must accept before leaving the area)
- **moonflow**: rewrite North Bank/Wharf prose with items that Wave 4 added to that sublocation
- **guadosalam**: add O'aka cumulativeTarget from EPUB (running total at this point ~10,001 Gil)
- **miihen-highroad**: fix attribution of the enemy blinding tip (Wakka's Darkness, not Lulu)
- **kilika**: update Lord Ochu prose to mention NulBlaze Shield reward added in Wave 4
- **luca**: add O'aka meeting note; update Oblitzerator prose to say "charge crane 3 times" correctly
- **macalania-woods**: prose needs expansion to cover butterfly chase mini-game and Jecht Sphere
- **home**: verify Primer XIX/XX location descriptions match EPUB (may be swapped)

---

- [ ] **Step 2: Launch Wave 5 QA agents (5 parallel)**

**QA batch assignments:**
- QA-5A: zanarkand, baaj-temple, besaid, ss-liki, kilika, ss-winno
- QA-5B: luca, miihen-highroad, mushroom-rock-road, djose, moonflow
- QA-5C: guadosalam, thunder-plains, macalania-woods, lake-macalania, bikanel-desert
- QA-5D: home, bevelle, via-purifico, highbridge, calm-lands
- QA-5E: mt-gagazet, zanarkand-dome, airship-sin, inside-sin, airship

Each QA agent:
> For each chapter in your batch, verify:
> 1. `sgTip` is not null — every chapter should have a Sphere Grid tip
> 2. `missables` array is not empty for chapters with known missables — cross-check against `docs/audit/wave3/3a-consolidated-gap-report.md`
> 3. All sublocation prose is ≥ 60 words — flag any below this
> 4. Prose is accurate — read the EPUB reference doc and flag any claims that contradict the source
> 5. `party` array is accurate — check against Wave 0 reference doc
> 6. `oaka` is set correctly for chapters where O'aka appears
>
> Write findings to `docs/fixes/qa/wave5-qa-report-{BATCH_LETTER}.md` (e.g., `wave5-qa-report-a.md` for QA-5A). Each QA agent gets its own output file.

- [ ] **Step 3: Fix any FAIL items**

- [ ] **Step 4: Commit Wave 5**
```bash
git add spira-guide/src/data/chapters/
git commit -m "fixes: Wave 5 — prose rewrites, sgTips, missable warnings across all 26 chapters"
```

---

## Task 9: Final Integration QA

One agent does a comprehensive sweep of all 26 chapters against the full audit findings list.

- [ ] **Step 1: Launch final QA agent**

> You are the final integration QA agent for the FFX walkthrough content fix project. Do a complete sweep of all 26 chapter JSONs and confirm the audit findings have been addressed.
>
> **Read:**
> - All 26 chapter JSONs in `spira-guide/src/data/chapters/`
> - `docs/audit/wave3/3a-consolidated-gap-report.md` — the full findings list (201 findings)
> - `docs/audit/wave3/3b-qa-spot-check.md` — the top 20 verified findings
>
> **Check 1 — Schema validation:** Every chapter JSON must have: `slug`, `missables` (array), `party` (array), `oaka` (object or null), `sgTip` (string or null), `subLocations` (array, each with name/prose/guideImages/items), `bosses` (array), `cloister`, `optionalAreas` (array). Flag any missing required fields.
>
> **Check 2 — ID uniqueness:** Within each chapter, all item `id` values must be unique. Flag duplicates.
>
> **Check 3 — Finding coverage:** For each of the 11 CRITICAL and 52 HIGH findings in the consolidated report, confirm it is resolved. Record: RESOLVED / PARTIALLY RESOLVED / UNRESOLVED.
>
> **Check 4 — No regressions:** Confirm Wave 1 systemic fixes are still in place (Primer numbers, no fabricated content in ss-winno, etc.).
>
> **Check 5 — Content sanity:** Flag any boss strategy that still appears to describe wrong mechanics (e.g., "destroy Mortiphasms", "Mighty Guard from Defender X").
>
> Write comprehensive report to: `docs/fixes/qa/final-qa-report.md`
> Include: CRITICAL finding resolution table, HIGH finding resolution table, unresolved issues list.

- [ ] **Step 2: Fix any UNRESOLVED items from the final QA report by dispatching targeted fix agents**

- [ ] **Step 3: Commit all QA reports**
```bash
git add docs/fixes/qa/
git commit -m "fixes: QA reports — all waves verified"
```

---

## Task 10: Final Commit + Verification

- [ ] **Step 1: Verify all 26 chapter JSONs parse as valid JSON**
```bash
cd "/Users/theonavarro/FFX walkthrough"
for f in spira-guide/src/data/chapters/*.json; do
  python3 -c "import json; json.load(open('$f'))" && echo "OK: $f" || echo "FAIL: $f"
done
```

- [ ] **Step 2: Verify item count has grown substantially**
```bash
python3 -c "
import json, glob
total = sum(
  len(i.get('items',[]))
  for f in glob.glob('spira-guide/src/data/chapters/*.json')
  for s in json.load(open(f)).get('subLocations', []) + json.load(open(f)).get('optionalAreas', [])
  for i in [s]
)
print(f'Total items: {total}')
# Pre-fix baseline was 144 items. Expect 300+.
"
```

- [ ] **Step 3: Check no chapter has null sgTip**
```bash
python3 -c "
import json, glob
for f in glob.glob('spira-guide/src/data/chapters/*.json'):
  d = json.load(open(f))
  if d.get('sgTip') is None:
    print(f'NULL sgTip: {d[\"slug\"]}')
"
```

- [ ] **Step 4: Final commit**
```bash
git add spira-guide/src/data/chapters/ docs/fixes/
git commit -m "fixes: complete — all 201 audit findings addressed across 26 chapters"
```

---

## Validation Cheat Sheet

| Check | Pre-fix | Target |
|-------|---------|--------|
| Total items across all chapters | 144 | 300+ |
| Chapters with 0 bosses (excl. highbridge) | 6 | 2–3 |
| Chapters with null sgTip | ~15 | 0 |
| Chapters with empty missables (excl. known) | ~10 | ~4 |
| Fabricated content instances | 9 | 0 |
| Al Bhed Primer numbering errors | 6 | 0 |
| Wrong image assignments | 13 | 0 |

---

## Appendix: Known Tricky Edge Cases

1. **Wendigo location:** Removed from `home.json` bosses in Wave 1, moved to `lake-macalania.json`. Wave 3 writes the full strategy. Don't add Wendigo back to home.
2. **Sinspawn Genais:** Currently in `inside-sin.json` bosses. Wave 2 removes it from inside-sin; Wave 3 adds it to `airship-sin.json`.
3. **Seymour Omnis Mortiphasm mechanic:** The correct mechanic is ROTATION (find the non-absorbed element), NOT destroying them. This is verified in `docs/audit/wave3/3b-qa-spot-check.md` Finding #7.
4. **Mighty Guard source:** Learned from Biran/Yenke at Mt. Gagazet via Lancet — NOT from Defender X. Fixed in Wave 1 (calm-lands) and confirmed in Wave 3 (mt-gagazet).
5. **Gatta/Luzzu fate:** The Mushroom Rock Road dialogue choice determines which character dies. This is a story warning, not an item missable — add it to `missables` as a warning string.
6. **Al Bhed Primer Vol. V in ss-winno:** This is WRONG — Primer V is in Luca (check the EPUB). The ss-winno EPUB pages cover Primers around Vol. V area but the wave agents should confirm the correct assignment.
7. **Celestial Weapons:** The Cloudy Mirror (Remiem Temple chocobo race) and Celestial Mirror (Macalania Woods activation) are prerequisites for ALL Celestial Weapons. These should be flagged in both calm-lands (Remiem access) and macalania-woods (mirror activation site).
