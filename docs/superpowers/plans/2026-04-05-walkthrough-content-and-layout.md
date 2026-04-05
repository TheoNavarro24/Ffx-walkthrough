# Walkthrough Content & Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the app from an item checklist with footnote prose into a real walkthrough guide, by (1) reworking the SubLocation layout so prose is the primary content, and (2) rewriting all chapter prose from the BradyGames guide source.

**Architecture:** Two independent workstreams — rendering changes (Tasks 1–2) followed by content population (Tasks 3–6). Rendering changes are small and land first so the richer content has the right visual treatment when it arrives. Content tasks are parallelizable across acts.

**Tech Stack:** React/JSX, Tailwind CSS, JSON chapter data files, BradyGames DAISY XML at `docs/official-guide/brady-guide.xml`

---

## The Problem

The current `SubLocation` renders prose as `text-xs text-gray-400 italic` — visually it reads as a footnote. Items dominate. The app looks like a checklist with tiny annotations, not a guide.

Two things must change:
- **Layout**: Prose must be the hero content. Items are a tracker subordinate to it.
- **Content**: All 26 chapter JSONs have 1–2 sentence placeholder prose. Each sublocation needs 2–4 sentences of real guide text.

---

## Content Standard (read before writing any prose)

**What prose should cover per sublocation:**
- What the player is doing here — movement, story beats, key decisions
- Notable enemy encounters (not stats — already in BossCard — but "expect fiends that inflict Petrify here" or "two waves before you reach the temple")
- Item callouts woven into navigation ("the Moon Crest is in the small cove east of the Aurochs — missable")
- Anything non-obvious that a veteran might still miss

**What prose should NOT cover:**
- Step-by-step Cloister of Trials solutions (those live in `CloisterSection`)
- Boss HP / detailed stats (those live in `BossCard`)
- Items already explicit in the checklist below (don't list every item — mention the important or missable ones contextually)
- Hand-holding ("press X to open the chest")
- Blitzball strategy (out of scope per CLAUDE.md)

**Voice:** Direct, matter-of-fact, veteran-friendly. One sentence of story context when useful, then get to the strategy. Think: notes from a friend who's played this before, not a textbook.

**Length:** 2–4 sentences per sublocation. Multi-sentence prose uses `\n\n` for paragraph breaks — the renderer will split these into separate `<p>` tags.

**Source:** Extract and condense from `docs/official-guide/brady-guide.xml`. The guide is a flat list of ~14,500 `<p>` elements inside a single `<level1>`. Use the index below to find each area.

**Brady guide area index (child element indices in the level1 node):**

Walkthrough prose is in the **~406–1250 range**. Indices above ~1500 are appendix material (shop tables, monster stats) — not prose sources.

- Zanarkand / Prologue: ~406–486 (search "Race to the Stadium" or "Sinspawn Ammes")
- Besaid: 487–545
- S.S. Liki: 546–576
- Kilika: 577–650
- S.S. Winno / Luca: 651–722
- Mi'ihen Highroad: ~723–788
- Mushroom Rock Road: ~789–830
- Djose Highroad + Temple: 831–896
- Moonflow + Guadosalam: 897–959
- Thunder Plains: 960–992
- Macalania Woods + Lake Macalania: 993–1152
- Bevelle + Via Purifico: 1153–1250
- Home / Airship / Calm Lands / Mt. Gagazet / Zanarkand Dome / Inside Sin: search from ~1251 onward using area name keywords

**Note on Baaj Temple:** No walkthrough section exists in the Brady guide for Baaj Temple — it is a brief cutscene area. Write from game knowledge; the existing prose in `baaj-temple.json` is a reasonable starting point.

**How to read the XML:**
```python
import xml.etree.ElementTree as ET
ns = '{http://www.daisy.org/z3986/2005/dtbook/}'
tree = ET.parse('docs/official-guide/brady-guide.xml')
root = tree.getroot()
children = list(root.find(f'{ns}book').find(f'{ns}bodymatter'))[0]
# children is a list of ~14,500 elements
# Print a range:
for c in children[487:550]:
    text = ''.join(c.itertext()).strip()
    if text: print(text)
```

**OCR noise to clean:** The guide was OCR'd — expect artifacts like `J3ROTHERHOOD`, `ALBHED PRIMER VOL 11^`, `©`, `£`, `_`, `^`, `jg`, `&` used as bullet symbols. Strip these. Reconstruct truncated words from context.

---

## Task 1: SubLocation Prose Rendering

**Files:**
- Modify: `spira-guide/src/components/SubLocation.jsx`

The goal: prose reads as guide text, items read as a tracker beneath it. Three changes:
1. Prose style: `text-sm text-gray-200 leading-relaxed` (not tiny italic)
2. Multi-paragraph support: split `prose` string on `\n\n`, render each chunk as a `<p>`
3. Visual divider between prose+images and the item list

- [ ] **Step 1: Update SubLocation.jsx**

Replace the prose block and open-content div:

```jsx
{open && (
  <div className="px-4 py-3 flex flex-col gap-3">
    {prose && (
      <div className="flex flex-col gap-2">
        {prose.split('\n\n').map((para, i) => (
          <p key={i} className="text-sm text-gray-200 leading-relaxed">{para}</p>
        ))}
      </div>
    )}
    <GuideImages images={guideImages} />
    {(children || items.length > 0) && (
      <div className="flex flex-col gap-2 pt-2 border-t border-[#1e3a5f]">
        {children ?? items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-sm">
            {item.name}
            {item.missable && (
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide ml-2">Missable</span>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

Note: `ChapterPage.jsx` always passes `<ItemList>` as `children`, so the `items.map` fallback branch is never reached in practice. It is kept for completeness but `ItemList` (with checkboxes, icons, and strikethrough) is always what renders.

- [ ] **Step 2: Verify in dev server**

Open any chapter with prose (e.g. `/chapter/besaid`). Confirm:
- Prose is readable body-text size, not tiny italic
- Multi-sentence prose renders as separate paragraphs if `\n\n` present
- Items section has a thin divider line above it
- Guide images still appear between prose and items

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/components/SubLocation.jsx
git commit -m "feat: make SubLocation prose primary content — readable text, multi-paragraph support, divider above items"
```

---

## Task 2: Act 1 Content — Zanarkand → Luca (7 chapters)

**Files to modify** (all in `spira-guide/src/data/chapters/`):
- `zanarkand.json`
- `baaj-temple.json`
- `besaid.json`
- `ss-liki.json`
- `kilika.json`
- `ss-winno.json`
- `luca.json`

**Source range in Brady guide:** indices 1–830. Key landmarks:
- Zanarkand prologue (Jecht, Sinspawn Ammes, Tidus): ~1–100
- Besaid: 487–545
- S.S. Liki: 546–576
- Kilika: 577–650
- S.S. Winno + Luca: 651–830

**For each sublocation in each chapter JSON, rewrite `prose` to:**
- Cover what the player does in this sub-area
- Call out key items contextually (especially missables)
- Note any notable enemy strategies or hazards
- Use `\n\n` if two distinct paragraphs are needed (usually not — keep it tight)

**Examples of before/after:**

Besaid Beach — before:
> "Head east along the beach before entering the village. The Moon Crest chest is in the eastern alcove — missable once you leave Besaid."

Besaid Beach — after:
> "Swim into the lagoon after Wakka pushes Tidus in — three sunken chests hold Antidote ×2 and 200 Gil. Head east along the beach before going inland; the Moon Crest is in a small cove near where you meet the Besaid Aurochs. Don't leave the island without it — it's missable once you sail away."

S.S. Liki — before (stub):
> "Sinspawn Echuilles appears on the lower deck."

S.S. Liki — after:
> "Search the ship before the boss — Potion ×5, Remedy, and Al Bhed Primer Vol. III are on the lower deck and bridge. Echuilles will periodically call its tentacles (the Eyes) back; kill the Eyes quickly to stop them inflicting status effects, then focus the main body. Yuna's NulBlaze halves the fire damage from Echuilles."

- [ ] **Step 1: Read Brady guide sections for Act 1**

Use the Python snippet from the Content Standard section. Read indices 1–830, skip shop tables and stat blocks, extract walkthrough paragraphs.

- [ ] **Step 2: Rewrite prose for all 7 chapter JSONs**

Edit each file. Keep all other fields (items, bosses, missables, party, etc.) unchanged — only update `prose` fields on `subLocations`.

- [ ] **Step 3: Verify in dev server**

Navigate to each Act 1 chapter. Confirm prose is substantive and readable.

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/data/chapters/zanarkand.json \
        spira-guide/src/data/chapters/baaj-temple.json \
        spira-guide/src/data/chapters/besaid.json \
        spira-guide/src/data/chapters/ss-liki.json \
        spira-guide/src/data/chapters/kilika.json \
        spira-guide/src/data/chapters/ss-winno.json \
        spira-guide/src/data/chapters/luca.json
git commit -m "content: rewrite Act 1 sublocation prose from BradyGames guide (Zanarkand → Luca)"
```

---

## Task 3: Act 2 Content — Mi'ihen → Bikanel (9 chapters)

**Files to modify:**
- `miihen-highroad.json`
- `mushroom-rock-road.json`
- `djose.json`
- `moonflow.json`
- `guadosalam.json`
- `thunder-plains.json`
- `macalania-woods.json`
- `lake-macalania.json`
- `bikanel-desert.json`

**Source range in Brady guide:** indices 831–1152 (and scattered shop/monster entries beyond). Key landmarks:
- Mi'ihen: search "MI'IHEN" or "HIGHROAD TRAVEL"
- Mushroom Rock: 8990
- Djose: 831–896 (highroad + temple)
- Moonflow: 897–959
- Guadosalam: 8588
- Thunder Plains: 960–992 (and 10038 for revisit data)
- Macalania Woods + Lake: 993–1152

**Same process as Task 2.** Notable content priorities for Act 2:
- Mi'ihen: Operation Mi'ihen context, Chocobo Eater strat (push it off the cliff with physical attacks)
- Mushroom Rock: Sinspawn Gui fight (destroy both arms first, then head)
- Moonflow: Extractor boss on the shoopuf (underwater — Wakka and Rikku only)
- Guadosalam: Farplane visit, Seymour's invitation
- Thunder Plains: Lightning bolt dodge for Venus Sigil is optional/endgame — just note lightning rod save-sphere trick
- Macalania: Spherimorph (hit the element it's NOT using), Crawler + Negator setup, Seymour 1

- [ ] **Step 1: Read Brady guide sections for Act 2**

- [ ] **Step 2: Rewrite prose for all 9 chapter JSONs**

- [ ] **Step 3: Verify in dev server**

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/data/chapters/miihen-highroad.json \
        spira-guide/src/data/chapters/mushroom-rock-road.json \
        spira-guide/src/data/chapters/djose.json \
        spira-guide/src/data/chapters/moonflow.json \
        spira-guide/src/data/chapters/guadosalam.json \
        spira-guide/src/data/chapters/thunder-plains.json \
        spira-guide/src/data/chapters/macalania-woods.json \
        spira-guide/src/data/chapters/lake-macalania.json \
        spira-guide/src/data/chapters/bikanel-desert.json
git commit -m "content: rewrite Act 2 sublocation prose from BradyGames guide (Mi'ihen → Bikanel)"
```

---

## Task 4: Acts 3 & 4 Content — Home → Inside Sin (11 chapters)

**Files to modify:**
- `home.json`
- `bevelle.json`
- `via-purifico.json`
- `highbridge.json`
- `calm-lands.json`
- `mt-gagazet.json`
- `zanarkand-dome.json`
- `airship-sin.json`
- `inside-sin.json`
- `airship.json` (optional areas sub-sections)

**Source range in Brady guide:**
- Home: search "HOME" (around 8443, 8684 for Bikanel/Home area)
- Bevelle: 1153–1250, also 8728, 9175, 9393
- Via Purifico: follows Bevelle section
- Highbridge: search "HIGHBRIDGE" or "SEYMOUR NATUS"
- Calm Lands: 8740, 10543
- Mt. Gagazet: search "GAGAZET"
- Zanarkand Dome: search "ZANARKAND DOME" or "YUNALESCA"
- Airship / optional areas: search "AIRSHIP", "OMEGA RUINS", "REMIEM"
- Inside Sin: search "INSIDE SIN" or "BRASKA'S FINAL"

**Notable content priorities for Acts 3 & 4:**
- Home: Al Bhed rescue, 4 missable primers at Home + Bevelle — call these out explicitly in prose
- Bevelle: Path of Least Resistance is the Via Purifico entrance, marriage scene, Seymour Natus
- Via Purifico: split-party puzzle, Evrae Altana (attacks from behind, use Phoenix Down trick)
- Calm Lands: Watcher enemies, Monster Arena intro, Chocobo trainer for Sun Sigil
- Mt. Gagazet: Biran & Yenke (steal Lv. 3 Key Spheres), Sanctuary Keeper
- Zanarkand Dome: Yunalesca's three forms — do NOT use any Zombied character for her third form Megadeath
- Inside Sin: Seymour Omnis, Overdrive Sin, Jecht / Braska's Final Aeon

- [ ] **Step 1: Read Brady guide sections for Acts 3 & 4**

- [ ] **Step 2: Rewrite prose for all 11 chapter JSONs**

- [ ] **Step 3: Verify in dev server** — navigate several late-game chapters

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/data/chapters/home.json \
        spira-guide/src/data/chapters/bevelle.json \
        spira-guide/src/data/chapters/via-purifico.json \
        spira-guide/src/data/chapters/highbridge.json \
        spira-guide/src/data/chapters/calm-lands.json \
        spira-guide/src/data/chapters/mt-gagazet.json \
        spira-guide/src/data/chapters/zanarkand-dome.json \
        spira-guide/src/data/chapters/airship-sin.json \
        spira-guide/src/data/chapters/inside-sin.json \
        spira-guide/src/data/chapters/airship.json
git commit -m "content: rewrite Acts 3 & 4 sublocation prose from BradyGames guide (Home → Inside Sin)"
```

---

## Task 5: Boss Strategy Depth Pass

**Files to modify** (chapter JSONs with underdeveloped boss strategies):

The current boss strategy text ranges from good (Seymour Flux, Biran & Yenke) to near-empty (many Act 1 bosses). This pass enriches strategies for the key story bosses.

Priority bosses (check current strategy, enrich if < 2 meaningful sentences):

| Boss | Chapter | What's needed |
|------|---------|---------------|
| Sinspawn Ammes | zanarkand | Tutorial boss — still worth noting the Overdrive opportunity |
| Sinspawn Echuilles | ss-liki | Kill tentacles first, NulBlaze, Yuna healing role |
| Oblitzerator | luca | Crane mechanic — use the crane to deal 5000 damage |
| Sinspawn Gui | mushroom-rock-road | Destroy both arms first to stop Cura, then head |
| Chocobo Eater | miihen-highroad | Push it off the cliff with physical attacks for bonus items |
| Extractor | moonflow | Wakka + Rikku only, shoot with Wakka |
| Spherimorph | macalania-woods | Match its elemental weakness — it shifts after each cast |
| Crawler + Negator | lake-macalania | Destroy Negator first (disables magic), then pound Crawler |
| Evrae | airship | Haste + Slowga, pull the ship back between attacks |
| Evrae Altana | via-purifico | Phoenix Down one-shot on an undead boss |
| Seymour Natus | bevelle | Mortiorchis overdrive gauge — kill it before it fills |
| Yunalesca | zanarkand-dome | Three forms; Zombie + Curaga trick on final form |
| Braska's Final Aeon | inside-sin | Three forms, Jecht Beam zombie/confusion |

**Process per boss:**
- Read the Brady guide's strategy section for that boss
- Check `docs/source-data/monsters.json` for HP (authoritative)
- Write 2–4 sentences: mechanics explanation → recommended approach → key warning

- [ ] **Step 1: Read Brady guide boss strategies for priority list above**

- [ ] **Step 2: Update strategy fields in the relevant chapter JSONs**

Only edit the `strategy` field within `bosses[]` entries. Do not change HP or other stats — those come from `monsters.json` via `getBoss()`.

- [ ] **Step 3: Verify in dev server**

Open BossCard for each updated boss, expand it, read the strategy.

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/data/chapters/*.json
git commit -m "content: enrich boss strategy text for key story bosses"
```

---

## Notes for Parallel Execution

Tasks 2, 3, and 4 are fully independent (different JSON files). They can be dispatched as simultaneous subagents once Task 1 (rendering) is merged. Task 5 can run alongside Tasks 2–4 since it only touches strategy fields.

Task 1 (rendering) must complete first so content authors are writing for the correct visual treatment (readable prose paragraphs, not trying to cram everything into one tiny italic line).

---

## Definition of Done

- [ ] SubLocation prose renders as readable body text, not tiny italic
- [ ] Multi-paragraph prose (`\n\n`) displays as separate `<p>` tags
- [ ] All 26 chapters have substantive prose (2–4 sentences per sublocation, drawn from guide source)
- [ ] All priority boss strategies have 2–4 meaningful sentences of mechanics guidance
- [ ] No chapter feels like a bare item list — navigating the app chapter-by-chapter reads as a walkthrough
