# Wave 2 QA Report — Airship (Optional Endgame)

**QA Agent**: Wave 2 independent verifier
**File under review**: `spira-guide/src/data/chapters/airship.json`
**Sources consulted**:
- EPUB reference: `docs/fixes/wave0/airship-reference.md`
- Wave 2 audit: `docs/audit/wave2/2i-airship-optional-endgame.md`
- Consolidated gap report: `docs/audit/wave3/3a-consolidated-gap-report.md`
- Game data: `docs/source-data/monsters.json`
- Filesystem: `spira-guide/public/img/guide/`

---

## Check 1: JSON Validity

**Result: PASS**

`python3 -c "import json; json.load(open('spira-guide/src/data/chapters/airship.json'))"` exits cleanly with no errors. The file is well-formed JSON.

---

## Check 2: New Sublocations — "Hidden Locations (Secret Coordinates)"

**Result: PASS**

The sublocation `"Hidden Locations (Secret Coordinates)"` is present in `subLocations` (index 1). All four coordinate-only locations are documented as items:

| Item | Coordinates |
|---|---|
| Ascalon (Tidus — Double AP) | Sanubia Desert, X:12–16 Y:41–45 |
| Dragoon Lance (Kimahri) | Besaid Falls, X:29–32 Y:73–76 |
| Sonar (Rikku) | Mi'ihen Ruins, X:33–36 Y:55–60 |
| Phantom Bangle (Lulu — absorbs 3 elemental types) | Battle Site, X:39–43 Y:56–60 |

Coordinates match the EPUB reference table exactly. The sublocation `notes` field correctly acknowledges that Baaj (X:11–16, Y:57–63) and Omega Ruins (X:69–75, Y:33–38) are coordinate areas covered under their own sections.

This addresses audit findings **#1** and consolidated gap report finding **#50**.

---

## Check 3: New Sublocations — "Airship Passwords"

**Result: PASS**

The sublocation `"Airship Passwords"` is present in `subLocations` (index 2). All three passwords are present with correct names, rewards, and case-sensitivity notes:

| Password | Reward |
|---|---|
| GODHAND | Rikku's Celestial Weapon, the Godhand |
| VICTORIOUS | Rikku's Victorious armor (nullifies 3 elemental types) |
| MURASAME | Auron's Murasame (One MP Cost ability) |

All passwords match the EPUB reference (p.76) exactly. The `notes` field correctly specifies these are case-sensitive and entered via the `Input` command (not the Search/coordinates system).

This addresses audit findings **#2** and consolidated gap report finding **#51**.

---

## Check 4: New Bosses — Presence and HP

**Result: PASS (with one minor gap: Evrae still missing HP)**

All four required boss cards are present in the `bosses` array. HP values verified against `monsters.json`:

| Boss slug | JSON HP | monsters.json HP | Match? |
|---|---|---|---|
| geosgaeno | 32,767 | 32,767 | PASS |
| yojimbo | 33,000 | 33,000 | PASS |
| ultima-weapon | 70,000 | 70,000 | PASS |
| omega-weapon | 999,999 | 999,999 | PASS |
| evrae | MISSING | 32,000 | FAIL (pre-existing gap, not introduced by wave 1) |

Omega Weapon HP of 999,999 is confirmed correct by both game data and EPUB source.

**Note on Evrae**: The audit finding **#28** (Evrae missing HP) was flagged as LOW priority and was pre-existing before wave 1 fixes. The wave 1 fix batch did not add this. This is a known gap, not a regression.

Boss strategies for all four new cards address the core mechanics:
- **Geosgaeno**: Correctly identifies all-element weakness (fixing the "weak to Ice" inaccuracy from audit finding **#13**), Stone Punch/KO Punch, Stoneproof/Deathproof armor, Hastega/Protect, Struggle Trigger Command. Strategy is 114 words and complete.
- **Yojimbo**: Two-phase approach (fight then negotiate), low magic defense strategy, negotiation guidance with 190,000–250,000 Gil range. Addresses audit finding **#11**.
- **Ultima Weapon**: Status protection, steal advice (10 Doors to Tomorrow), bribe option (99 Pendulums / ~1.4M Gil), drops. Matches EPUB p79. Addresses audit finding **#10**.
- **Omega Weapon**: Physical-only offense mandatory, all-element absorption confirmed, Shell/Protect for survival, Kimahri Lancet for Nova, steal 30 Gambler's Spirits. 999,999 HP confirmed. Addresses audit finding **#10**.

This addresses audit findings **#9**, **#10**, **#11**, and consolidated gap report finding **#52**.

---

## Check 5: optionalAreas — No "Master Sphere" Anywhere

**Result: PASS**

Full-text search of the JSON confirms the string "Master Sphere" does not appear anywhere in `airship.json`. The fabricated "Master Sphere x2" that was previously listed in Omega Ruins items has been removed.

This addresses audit finding **#15** and consolidated gap report finding **#94**.

---

## Check 6: optionalAreas — Remiem Temple

**Result: PASS**

Remiem Temple is present with 12 items covering:
- Cloudy Mirror (Chocobo Race)
- Al Bhed Primer Vol. XXIV
- All 8 Belgemine aeon prizes: Lightning Gem x4, X-Potion x30, Chocobo Feather x10, Mega-Potion x60, Flower Sceptre, Shadow Gem x8, Stamina Spring x60, Shining Gem x40
- Magus Sisters (Aeon — with prerequisites noted)
- Moon Sigil (Yuna — requires defeating all 8 of Belgemine's aeons and sending her)

All 8 Belgemine prizes match the EPUB reference (p.77) table exactly. The Magus Sisters recruitment path (Flower Sceptre + Blossom Crown) is explained in both the item entry and the prose. Moon Sigil is present.

Prose (approximately 120 words) now covers the access method, Chocobo Race, all Belgemine duel progression, Magus Sisters recruitment, and Moon Sigil reward.

This addresses audit findings **#5**, **#6**, **#7** and consolidated gap report findings **#88**, **#91**.

---

## Check 7: optionalAreas — Cavern of the Stolen Fayth (Primer Vol. XXV)

**Result: PASS**

Al Bhed Primer Vol. XXV is present as the first item in the Cavern of the Stolen Fayth items list (`id: airship-cavern-primer-xxv`).

The full item list now covers 10 items:
- Al Bhed Primer Vol. XXV
- Megalixir
- Mega-Potion x2
- Flexible Arm (teleport pad chamber)
- MP Sphere (teleport pad chamber)
- Fortune Sphere
- Lv. 2 Key Sphere
- X-Potion x2 (teleport pad chamber)
- Rusty Sword (eastern cliff outside cavern — for Auron's Masamune)
- Yojimbo (Aeon)

This matches the complete EPUB p.78 item list. The prose also covers Magic Urn mechanic, Great Malboro warning, and detailed Yojimbo negotiation.

This addresses audit findings **#8** and consolidated gap report finding **#92**.

---

## Check 8: optionalAreas — Omega Ruins (Primer Vol. XXVI)

**Result: PASS**

Al Bhed Primer Vol. XXVI is present as the first item in Omega Ruins items (`id: airship-omega-primer-xxvi`).

The full item list covers 6 items:
- Al Bhed Primer Vol. XXVI
- Teleport Sphere (bridge chest — activate both glyphs first)
- Friend Sphere (second area — go left from entrance)
- Magic Sphere (behind Omega Weapon's arena — walk back after victory)
- Doors to Tomorrow x10 (stolen from Ultima Weapon)
- Gambler's Spirit x30 (stolen from Omega Weapon — steal twice)

This matches the EPUB pp.79–80. No fabricated items remain.

This addresses audit finding **#15** and consolidated gap report finding **#94**.

---

## Check 9: optionalAreas — Baaj Temple Entry

**Result: PASS**

Baaj Temple (Revisit) is present as an optionalArea with coordinates X:11–16, Y:57–63, 4 items (Mega Phoenix x4, Megalixir, Onion Knight, Anima), and prose correcting the "weak to Ice" error. Prose now reads: "Note: Geosgaeno is weak to all elements equally, not just Ice."

This addresses audit findings **#12**, **#13** and consolidated gap report findings **#86**, **#93**.

---

## Check 10: Remaining Audit Findings — Addressed vs. Open

### Fully Addressed

| Audit Finding | Status | Evidence |
|---|---|---|
| #1 — Hidden Locations sublocation missing | ADDRESSED | Sublocation present with all 4 items |
| #2 — Airship Passwords sublocation missing | ADDRESSED | Sublocation present with all 3 passwords |
| #3 — Celestial Weapons reference missing | ADDRESSED | New "Celestial Weapons" optionalArea with 17 items covering all 7 characters |
| #4 — No Encounters gear guide missing | ADDRESSED | Text "No Encounters" appears in Monster Arena prose: "the material needed to customize No Encounters onto armor" and in Geosgaeno strategy ("equipment drop (weapon with No Encounters)") |
| #5 — Remiem prose incomplete | ADDRESSED | Now ~120 words covering Magus Sisters and Belgemine duel progression |
| #6 — Belgemine prizes not listed | ADDRESSED | All 8 prizes present as items |
| #7 — Magus Sisters not listed | ADDRESSED | Present as item with prerequisite note |
| #8 — Cavern items missing | ADDRESSED | 10 items now listed including all teleport pad chamber loot |
| #9 — Geosgaeno boss card missing | ADDRESSED | Full boss card with correct HP (32,767) |
| #10 — Ultima/Omega boss cards missing | ADDRESSED | Both boss cards present with correct HP |
| #11 — Yojimbo boss card missing | ADDRESSED | Boss card present with HP (33,000) |
| #12 — Baaj Temple items missing | ADDRESSED | Mega Phoenix x4 and Megalixir now listed |
| #13 — Baaj prose thin/inaccurate | ADDRESSED | All-element weakness corrected; prose expanded |
| #14 — Omega Ruins prose extremely thin | ADDRESSED | Prose expanded to ~200 words with glyph mechanic, phantom chests, navigation |
| #15 — Master Sphere fabricated; real Omega items missing | ADDRESSED | Master Sphere removed; Teleport Sphere, Magic Sphere, Doors to Tomorrow, Gambler's Spirit all added |
| #16 — Cactuar prose missing detail | ADDRESSED | Prize tier table (1–2 Potion, 3–6 Elixir, 7–8 Megalixir, 9–10 Friend Sphere) and Sphere del Perdedor mechanic now in prose |
| #17 — Cactuar Megalixir missing | ADDRESSED | Megalixir item present in Cactuar Village items |
| #18 — Monster Arena prose shallow | ADDRESSED | Now covers Area Conquest, Species Conquest, Original Creation tier, Nemesis, No Encounters synergy |
| #19 — Mars Sigil requirement inaccurate | ADDRESSED | Monster Arena item reads "complete 10 Area and/or Species Conquests" (not "capture 1 fiend from each area") |
| #22 — Blitzball for Wakka's Jupiter Sigil not mentioned | ADDRESSED | World Champion, Jupiter Crest, Jupiter Sigil all in Celestial Weapons section with blitzball context |
| #23 — Cloudy Mirror upgrade path not explained | ADDRESSED | Celestial Weapons prose explains Cloudy Mirror → Celestial Mirror upgrade |
| #24 — Monster Arena No Encounters source | ADDRESSED | Monster Arena prose: "Capturing four of every Dragon-type enemy yields 99 Purifying Salts — the material needed to customize No Encounters onto armor" |
| #30 — Great Malboro ambush warning missing | ADDRESSED | Omega Ruins prose now warns about Great Malboro Bad Breath and First Strike remedy |
| #31 — Kimahri Nova Lancet opportunity missing | ADDRESSED | Omega Ruins prose: "Have Kimahri use Lancet on Omega Weapon to learn Nova, his most powerful Ronso Rage" |

### Partially Addressed

| Audit Finding | Status | Evidence |
|---|---|---|
| #3 — Celestial Weapons: Mercury Sigil missing from section | PARTIAL | Mercury Sigil is listed in the Cactuar Village section (correct location) but is NOT duplicated in the Celestial Weapons section. The Celestial Weapons section has Mercury Crest but not Mercury Sigil. Similarly, Moon Sigil appears in Remiem but not in Celestial Weapons. This is arguably correct UX (items tracked at their actual location) but creates an incomplete reference in the Celestial Weapons section. |
| #26 — Seven EPUB images not extracted | PARTIAL | The two remaining missing images that are now referenced in the JSON but not on filesystem: `image_0081_00.jpeg` (Celestial weapons guide, p.81) and `image_0077_00.jpeg` (Cactuar Village, p.77). Both files do not exist in `spira-guide/public/img/guide/`. These images were referenced in the updated JSON but the extraction step was not completed. |

### Not Addressed (Open Gaps)

| Audit Finding | Status | Reason |
|---|---|---|
| #20 — Jecht Sphere locations not cross-referenced | OPEN | No mention of Jecht Spheres anywhere in airship.json. The EPUB dedicates pages 82–83 to Jecht Sphere locations. No cross-reference or note exists. |
| #21 — Al Bhed Primer completion reward missing | OPEN | No mention of the 99 Underdog's Secret reward from Rin after collecting all 26 Primers. Not in prose or items anywhere. |
| #25 — No missable warning for Dark Valefor blocking Besaid | OPEN | `missables` array remains empty `[]`. The HD Remaster-specific warning that Dark Valefor blocks return to Besaid (affecting Jecht Sphere 2) is absent. |
| #27 — Wrong-origin images | PARTIAL-OPEN | `image_0073_00.jpeg` (Omega Ruins) is from EPUB p.73 which covers the Sin approach sequence, not Omega Ruins. Still referenced. `image_0062_00.jpeg` (Cavern) is from p.62 which is Monster Arena / Omega Ruins approach, not strictly Cavern — borderline acceptable. Baaj's use of `image_0025_00.jpeg` (original Baaj visit) is legitimate reuse. |
| #28 — Evrae missing HP | OPEN | Evrae boss card has no `hp` field. Game data shows HP: 32,000. Low priority but still unresolved. |
| #29 — Fahrenheit Deck prose conflates timeline | OPEN | Prose still describes both the Evrae approach (before Bevelle) and the post-Bevelle free airship access in one paragraph. The two events are separated by an entire story chapter. The conflation was not corrected. |

---

## Check 11: Specific Prose Quality Assessment

### Previously Rated 2/5 — Improvement Check

**Baaj Temple** (was 2/5): Now approximately 130 words with coordinates, swimmer restriction, Geosgaeno approach, Struggle Trigger Command, corrected elemental weakness, Onion Knight location, fayth chamber chests, and Destruction Sphere statue mechanic. **Upgraded to 4/5.**

**Omega Ruins** (was 2/5 at 40 words): Now approximately 200 words covering coordinates, Great Malboro warning, phantom chest mechanic, two-area structure, glyph activation, Primer location, Ultima Weapon steal target, Omega Weapon absorption, Kimahri Lancet, and Magic Sphere retrieval. **Upgraded to 4/5.**

**Fahrenheit Deck** (was 2/5): Prose unchanged — still conflates the Evrae fight (Bevelle approach) with post-Bevelle free airship access. Still approximately 60 words. **Remains 2/5.**

---

## Check 12: Guide Image Filesystem Status

| Image | Referenced In | Exists on Disk | Notes |
|---|---|---|---|
| image_0056_00.jpeg | Fahrenheit Deck | YES | EPUB p.56 — Evrae fight |
| image_0072_00.jpeg | Remiem Temple | YES | EPUB p.72 — side quest overview |
| image_0062_00.jpeg | Cavern of Stolen Fayth | YES | EPUB p.62 — Monster Arena/area; borderline acceptable |
| image_0025_00.jpeg | Baaj Temple | YES | EPUB p.25 — original Baaj visit; legitimate reuse |
| image_0073_00.jpeg | Omega Ruins | YES | EPUB p.73 — Sin approach; wrong-origin image |
| image_0081_00.jpeg | Celestial Weapons | **NO** | EPUB p.81 — Celestial weapons guide; file not extracted |
| image_0077_00.jpeg | Cactuar Village | **NO** | EPUB p.77 — Cactuar Village; file not extracted |
| image_0062_01.jpeg | Monster Arena | YES | EPUB p.62 — Monster Arena image |
| image_0089_00.jpeg | Dark Aeons | YES | EPUB p.89 — Dark Aeons reference |

**Two images are referenced in the JSON but missing from the filesystem**: `image_0081_00.jpeg` and `image_0077_00.jpeg`. These will produce broken image elements in the UI if not extracted from the EPUB source.

---

## Summary

### Overall Assessment: SUBSTANTIAL IMPROVEMENT — MOST ISSUES RESOLVED

The wave 1 fix pass addressed the majority of HIGH and MEDIUM priority findings from the wave 2 audit. The chapter has been transformed from a minimal stub into a comprehensive optional-endgame reference.

### PASS Count by Category

| Category | PASS | PARTIAL | FAIL/OPEN |
|---|---|---|---|
| Sublocations (Hidden Locations, Passwords) | 2 | 0 | 0 |
| Coordinate locations (4 items) | 4 | 0 | 0 |
| Passwords (3 items) | 3 | 0 | 0 |
| Boss cards (4 new) | 4 | 0 | 0 |
| Boss HP accuracy | 4/4 new correct | — | Evrae HP still missing |
| No Master Sphere | 1 | 0 | 0 |
| Remiem Temple items (Belgemine prizes, Moon Sigil) | PASS | — | — |
| Cavern Primer XXV | PASS | — | — |
| Omega Ruins Primer XXVI | PASS | — | — |
| Baaj Temple entry and items | PASS | — | — |
| JSON validity | PASS | — | — |

### Remaining Action Items (Prioritized)

**HIGH — Must Fix Before Shipping**
1. Extract `image_0081_00.jpeg` and `image_0077_00.jpeg` from the EPUB source — both are referenced in the JSON but missing from disk. Will produce broken images in the UI.

**MEDIUM — Should Fix**
2. Add Jecht Sphere cross-reference or link in the airship chapter prose (finding #20).
3. Add Al Bhed Primer completion reward (99 Underdog's Secret from Rin) to either a note or item (finding #21).
4. Add Mercury Sigil to the Celestial Weapons reference section (currently only in Cactuar Village).
5. Add Moon Sigil to the Celestial Weapons reference section (currently only in Remiem Temple).
6. Replace `image_0073_00.jpeg` in Omega Ruins with a correct Omega Ruins image if one is available (finding #27).

**LOW — Nice to Have**
7. Add Evrae HP (32,000) to the Evrae boss card (finding #28).
8. Rewrite Fahrenheit Deck prose to separate the Evrae approach (pre-Bevelle) from the post-Bevelle free airship access (finding #29).
9. Add Dark Valefor missable warning to the `missables` array for HD Remaster players (finding #25).
