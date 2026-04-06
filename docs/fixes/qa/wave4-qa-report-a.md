# Wave 4 QA Report A
Chapters: macalania-woods, lake-macalania, bikanel-desert, moonflow
Date: 2026-04-06

---

## Chapter: macalania-woods

### JSON Validity
PASS — `python3 -c "import json; json.load(open(...))"` returns no error.

### ID Convention
FAIL — One item uses a non-scoped ID: `jecht-sphere-9` (in the Spherimorph Boss Drop sublocation). This ID does not begin with the chapter slug `macalania-woods-`. All other 9 IDs follow the `{slug}-{item-kebab}` convention correctly.

### Duplicate IDs
PASS — No duplicate IDs within the chapter (10 items, 0 duplicates).

### Missable Flags
PASS (with note) — Al Bhed Primer Vol. XV has `missable: false` in the item object, which is technically correct (the area is revisitable). The chapter-level `missables` array still warns about it being "easy to walk past." This is consistent with the EPUB reference ("not permanently missable, but easy to walk past"). No discrepancy.

### Specific Checks
- Jecht Sphere #5 present: FAIL — The item is present but uses ID `jecht-sphere-9`, not `macalania-woods-jecht-sphere` as the slug convention requires. The item itself ("Jecht's Sphere (Macalania Woods)") is correctly placed in the Spherimorph Boss Drop sublocation with accurate drop note. This is an ID naming violation, not a missing item.
- Butterfly mini-game rewards present: PASS — MP Sphere (`macalania-woods-mp-sphere`) for Area 1 and Ether (`macalania-woods-ether`) for Area 2 are both present in the "Butterfly Mini-Game" sublocation with correct notes.

### Spot-Check vs EPUB Reference (pages 48–49)
- Al Bhed Primer Vol. XV: PASS — Present, correct location note ("ground across from O'aka").
- Butterfly rewards (MP Sphere, Ether): PASS — Both match the reference table exactly.
- Jecht's Sphere / Spherimorph drop: PASS — Item present with correct Overdrive note. ID convention violation noted above.
- Primer XVI / 4,000 Gil (Agency Front): PASS (content) / NOTE — Both items appear in this chapter AND in lake-macalania. The EPUB reference places them on the page 49 boundary. Duplication across chapters is an authoring decision (items sit at the geographic boundary); IDs are different in each chapter so no cross-chapter duplicate key issue. Acceptable if intentional.
- Missing from reference header: Remedy x3, 400 Gil, Elixir, Mega-Potion, Hi-Potion x2, Lv. 1 Key Sphere, Lv. 2 Key Sphere listed in the EPUB header block are not in the macalania-woods JSON. Several of these appear in lake-macalania (400 Gil, Remedy x2, Hi-Potion x2, Elixir, etc.), confirming they were intentionally distributed between chapters. The chapter header in the EPUB aggregates items across both areas.

### Issues Found
1. ID `jecht-sphere-9` does not follow `macalania-woods-{kebab}` convention — should be `macalania-woods-jecht-sphere` or `macalania-woods-jecht-sphere-9`.

---

## Chapter: lake-macalania

### JSON Validity
PASS — Parses without error.

### ID Convention
PASS — All 16 item IDs use `lake-macalania-{kebab}` format with no underscores, spaces, or uppercase characters.

### Duplicate IDs
PASS — No duplicate IDs (16 items, 0 duplicates).

### Missable Flags
PASS — All three flags verified:
- `lake-macalania-luck-sphere`: `missable: true` — PASS
- `lake-macalania-lv1-key-sphere`: `missable: true` — PASS
- `lake-macalania-lv2-key-sphere`: `missable: true` — PASS
- `lake-macalania-avenger`: `missable: true` — PASS

### Specific Checks
- "Under the Ice" sublocation exists: PASS — Third sublocation is named "Under the Ice".
- Avenger weapon present in "Under the Ice": PASS — `lake-macalania-avenger` is in the "Under the Ice" sublocation with correct note ("chest to the left of Auron in the regroup area beneath the ice").
- Luck Sphere in Cloister has `missable: true`: PASS — `lake-macalania-luck-sphere` is in the "Macalania Temple" sublocation with `missable: true` and a detailed note about Destruction Sphere placement.

### Spot-Check vs EPUB Reference (pages 49–51)
- Mega-Potion (temple entrance right): PASS — Present as `lake-macalania-mega-potion` with correct location note.
- Shell Targe from Tromell: PASS — Present as `lake-macalania-shell-targe` with "Given by Tromell inside the temple entrance."
- Luck Sphere (Cloister Destruction Sphere): PASS — Present with correct step reference (step 17) and missable flag.
- Avenger ("beside Auron"): PASS — Matches reference exactly.
- Lv. 1 Key Sphere (rocky trail): PASS — Correct location note about right side of chasm.

### Issues Found
None.

---

## Chapter: bikanel-desert

### JSON Validity
PASS — Parses without error.

### ID Convention
PASS — All 23 item IDs use `bikanel-desert-{kebab}` or `bikanel-{kebab}` format with no underscores, spaces, or uppercase characters. Note: two items use the shorter prefix `bikanel-` (e.g., `bikanel-mercury-crest`) while the majority use `bikanel-desert-`. This is inconsistent but not a hard convention violation given `bikanel` is the start of the slug.

### Duplicate IDs
PASS — No duplicate IDs (23 items, 0 duplicates).

### Missable Flags
PASS:
- `bikanel-desert-primer-xvii`: `missable: true` — PASS
- `bikanel-desert-primer-xviii`: `missable: true` — PASS
- `bikanel-mercury-crest`: `missable: true` — PASS

### Specific Checks
- 4 sublocations (Oasis, East, Central, West): PASS — Exactly 4 sublocations: "Oasis", "Sanubia Desert — East", "Sanubia Desert — Central", "Sanubia Desert — West".
- Primers XVII/XVIII have `missable: true`: PASS — Both confirmed with `missable: true`.
- No Vol. XVI: PASS — Confirmed absent. (Initial regex false positive in checking was due to "xvi" substring matching "xviii"; exact check confirms no `primer-xvi` ID present.)

### Spot-Check vs EPUB Reference (pages 52–53)
- Remedy x4 (oasis submerged chest): PASS — Present as `bikanel-desert-oasis-remedy` with correct note.
- Mercury Crest (western branch sinkhole): PASS — Present with `missable: true` and correct location detail.
- Primer XVII inside building (west fork): PASS — Present with `missable: true` and correct note.
- Primer XVIII near northeast exit sign: PASS — Present with `missable: true` and correct note.
- Lv. 2 Key Sphere + 10,000 Gil (nearest building at fork): PASS — Both present in West sublocation.
- MISSING: Ether x2 — The EPUB reference lists "Ether x2" from a chest at Rikku's shanty (walkthrough prose: "Chest at shanty: 2 Ethers"). This item is absent from the JSON entirely. No Ether item appears in any bikanel-desert sublocation.

### Issues Found
1. Ether x2 (Rikku's shanty chest, Sanubia Desert — East) is missing from the JSON. Listed in the EPUB reference walkthrough prose ("Chest at shanty: 2 Ethers") but not included in the item list.
2. Minor: `bikanel-mercury-crest` uses prefix `bikanel-` rather than `bikanel-desert-`; inconsistent with other IDs in the same file but functional.

---

## Chapter: moonflow

### JSON Validity
PASS — Parses without error.

### ID Convention
PASS — All 15 item IDs use `moonflow-{kebab}` format with no underscores, spaces, or uppercase characters.

### Duplicate IDs
PASS — No duplicate IDs (15 items, 0 duplicates).

### Missable Flags
PASS — Al Bhed Primer Vol. XII (`moonflow-primer-xii`) has `missable: true` with note "MISSABLE, cannot return." All other items correctly have `missable: false`.

### Specific Checks
- North Wharf sublocation exists: PASS — Third sublocation is named "North Wharf" with appropriate prose about collecting the Primer before leaving.
- Dragon Scales present: PASS — `moonflow-dragon-scales` is present in "Moonflow South Bank" sublocation as "Dragon Scales ×2" with note "Belgemine reward (win only) — teaches aeon Watera." Correctly marked `missable: false` (Belgemine offers this reward but the item is not permanently locked to this chapter).

### Spot-Check vs EPUB Reference (pages 44–45)
- Lv. 1 Key Sphere ×3 (thin trail east of Shelinda): PASS — `moonflow-lv1-key-sphere-a` matches reference.
- Lv. 1 Key Sphere ×3 (northeast alcove): PASS — `moonflow-lv1-key-sphere-b` matches reference.
- Magic Def Sphere: PASS — Present with correct note about narrow west detour.
- Al Bhed Primer Vol. XII (North Wharf platform): PASS — Present with `missable: true`.
- Phoenix Down x2 / 5,000 Gil (South Wharf): PASS — Both present in "South Wharf" sublocation.
- Antidote x4 / Mega-Potion (North Bank Road): PASS — Both present in "North Bank Road" sublocation.
- Dragon Scales (Belgemine win reward): PASS — Present with correct note.
- UNVERIFIED against reference: Soft Ring, Variable Steel, Bright Bangle, Hi-Potion — Four items in the "Moonflow South Bank" sublocation are not listed in the EPUB reference markdown (pages 44–45). These items lack location notes and may be equipment drops, chests not captured in the guide, or additions from another source. They are not wrong items for the Moonflow area, but their source is unverified against the EPUB.

### Issues Found
1. Soft Ring (`moonflow-soft-ring`), Variable Steel (`moonflow-variable-steel`), Bright Bangle (`moonflow-bright-bangle`), and Hi-Potion (`moonflow-hi-potion`) in "Moonflow South Bank" have no `note` field and no corresponding entries in the EPUB reference. Source is unverified — possible equipment drops not captured in the BradyGames guide. Not necessarily wrong, but unverifiable from the assigned reference.

---

## Summary

| Chapter | JSON Valid | ID Convention | No Duplicates | Missable Flags | Specific Checks | Spot-Check |
|---|---|---|---|---|---|---|
| macalania-woods | PASS | FAIL (1 item) | PASS | PASS | PARTIAL (ID issue) | PASS |
| lake-macalania | PASS | PASS | PASS | PASS | PASS | PASS |
| bikanel-desert | PASS | PASS | PASS | PASS | PASS | FAIL (1 missing item) |
| moonflow | PASS | PASS | PASS | PASS | PASS | PARTIAL (4 unverified) |

### Issues Requiring Fixes

**P1 — ID convention violation:**
- `macalania-woods.json`: Item `jecht-sphere-9` must be renamed to `macalania-woods-jecht-sphere` (or `macalania-woods-jecht-sphere-9`) to comply with `{slug}-{item-kebab}` convention.

**P2 — Missing item:**
- `bikanel-desert.json`: Ether x2 (chest at Rikku's shanty in Sanubia Desert — East) is absent from the JSON. Reference (page 53 walkthrough prose) confirms "Chest at shanty: 2 Ethers." Should be added to the "Sanubia Desert — East" sublocation.

**P3 — Minor ID inconsistency (informational):**
- `bikanel-desert.json`: `bikanel-mercury-crest` uses a shorter prefix than the rest of the file (`bikanel-desert-mercury-crest` would be consistent). Non-blocking.

**P4 — Unverified items (informational):**
- `moonflow.json`: Soft Ring, Variable Steel, Bright Bangle, Hi-Potion in South Bank sublocation have no source notes and are absent from the EPUB reference. These should be confirmed against the game or another source before the chapter ships.

**P5 — Boundary duplication (informational, not a bug):**
- Primer XVI and 4,000 Gil appear in both `macalania-woods` and `lake-macalania` with different IDs. This is an authoring decision for a geographically ambiguous item. Not a bug, but should be flagged so the renderer does not double-count them in the Collectibles Hub primer tracker. Primer XVI ID in `macalania-woods` (`macalania-woods-primer-xvi`) may conflict with the authoritative ID in `lake-macalania` (`lake-macalania-primer-xvi`) if the Collectibles primer tracker uses a canonical ID.
