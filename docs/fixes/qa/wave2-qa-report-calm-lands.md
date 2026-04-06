# Wave 2 QA Report — calm-lands

**QA Agent**: Wave 2 independent verifier
**Date**: 2026-04-06
**JSON file**: `spira-guide/src/data/chapters/calm-lands.json`
**EPUB reference**: `docs/fixes/wave0/calm-lands-reference.md` (pages 61–64)
**Audit source**: `docs/audit/wave2/2g-via-purifico-highbridge-calm-lands-gagazet.md` §Calm Lands
**Consolidated findings**: `docs/audit/wave3/3a-consolidated-gap-report.md` §calm-lands
**EPUB page map**: `docs/audit/wave1/1a-epub-page-chapter-map.md` — confirms calm-lands = pages 61–64

---

## 1. JSON Validity

**PASS**

`python3 -c "import json; json.load(open('calm-lands.json'))"` exits cleanly.
Top-level keys confirmed: `slug`, `missables`, `party`, `oaka`, `sgTip`, `subLocations`, `bosses`, `cloister`, `optionalAreas`.

---

## 2. EPUB Page Confirmation

**PASS**

`1a-epub-page-chapter-map.md` line 718 confirms: `| 21 | calm-lands | 61, 62, 63, 64 |`
The wave0 reference header states "Source: EPUB pages 61–64" and notes the chapter map confirmation. The JSON covers content from all four pages.

---

## 3. Sublocation Prose vs. EPUB Reference

### 3a. "Calm Lands (Plateau)" sublocation

**PASS (with minor omissions noted)**

The EPUB reference documents the following must-hit points for the main plateau:
- Rin's Travel Agency on arrival — JSON prose mentions this. PASS
- Monster Arena registration before exploring — JSON prose covers this. PASS
- Magic Counter Shield from hovering vendor — JSON prose explicitly covers, correctly marked missable. PASS
- Al Bhed Primer Vol. XXIII at northwest cliff edge — JSON prose covers this. PASS
- Two SE corner treasure chests (5,000 Gil, 10,000 Gil) — EPUB confirms both. JSON prose does not name these but the items are listed below. PASS
- Caladbolg chest (NW corner, requires Catcher Chocobo win) — JSON prose mentions "Caladbolg chest is also in the northwest corner but is sealed until you win the chocobo trainer rematch." PASS

Minor omission not addressed: the EPUB's "Strike Camp and Head West" section describes collecting the Lucid Ring from a partially hidden campsite chest and the Jecht's Sphere at the Macalania Woods crossroads. These belong to the Macalania-side introduction of this chapter; the JSON has no sublocation covering this campsite section and neither item is listed. This was flagged CRITICAL in wave2 audit finding C as part of 20+ missing items. Still unresolved in this JSON.

Additional omission: Belgemine's Shiva encounter in the central Calm Lands (Power Sphere x30 reward, Aeon's Soul reward) is not mentioned in prose and not in the sublocation items. Still unresolved.

### 3b. "Monster Arena" sublocation

**PASS (accurate, well-aligned with EPUB)**

The EPUB reference §Monster Arena confirms:
- Agree to help owner → sells Capture weapons — MATCH
- Skip Capture gear for Yuna and Lulu — MATCH (JSON calls them "non-physical attackers")
- Auron + Wakka recommended pair — MATCH
- Customize Auron with Piercing, Wakka with ailment ability — MATCH
- Nine Calm Lands species to capture — MATCH (Nebiros, Ogre, Skoll, Defender, Coeurl, Magic Urn, Thorn, Valaha, Mech Hunter — all nine listed in EPUB §Enemies and MATCH the JSON prose)
- Nirvana chest (requires Celestial Mirror) + Farplane Wind x60 as rewards — MATCH
- Ongoing fiend capture from all Spira regions feeds Arena Creations — MATCH

No fabricated content detected in this sublocation.

### 3c. "The Gorge" sublocation

**PARTIAL — directional error in prose**

The EPUB reference §Cavern of the Stolen Fayth states: "go to the bridge's right side and descend the steep path into the gorge." After descent:
- East along gorge floor → Rusty Sword. EPUB: "East of gorge bottom: Rusty Sword." MATCH
- West along gorge floor → Cavern of Stolen Fayth entrance. EPUB: "West of gorge bottom: entrance to Cavern of Stolen Fayth." MATCH

However, the JSON Gorge sublocation prose says: "descend the steep path on the bridge's right side into the gorge below." This is consistent with the EPUB. The prose then says "head east along the gorge floor to find the Rusty Sword" and "head west from the gorge bottom to reach the entrance to the Cavern of the Stolen Fayth." These cardinal directions MATCH the EPUB reference.

Issue: The Gorge sublocation and the optional area "Cavern of the Stolen Fayth" both list `calm-lands-rusty-sword` and `calm-lands-primer-xxv` with the **same item IDs**. This creates duplicate IDs within the JSON:
- `calm-lands-rusty-sword` appears in both "The Gorge" items array (line 108) and "Cavern of the Stolen Fayth" optional area items (line 224)
- `calm-lands-primer-xxv` appears in both "The Gorge" items array (line 115) and "Cavern of the Stolen Fayth" optional area items (line 229)

**FAIL** — duplicate item IDs across subLocations and optionalAreas. These items are listed twice, which will produce duplicate checkbox entries in the app.

---

## 4. Item Verification Against EPUB Reference

### Items present in JSON and confirmed in EPUB

| JSON item | EPUB confirmation | Status |
|---|---|---|
| 5,000 Gil (SE corner chest) | EPUB §Items: "5,000 Gil — southeast corner of Calm Lands central plain (treasure chest)" | PASS |
| 10,000 Gil (SE corner second chest) | EPUB §Items: "10,000 Gil — southeast corner of Calm Lands central plain (second treasure chest)" | PASS |
| Lv. 2 Key Sphere (behind Al Bhed outpost) | EPUB §Items: "Lv. 2 Key Sphere — treasure chest behind the Al Bhed trading outpost" | PASS |
| Fortune Sphere | EPUB §Items: "Fortune Sphere — Calm Lands" | PASS |
| Flexible Arm | EPUB §Items: "Flexible Arm — Calm Lands" | PASS |
| MP Sphere | EPUB §Items: "MP Sphere — Calm Lands" | PASS |
| Magic Counter Shield (missable, hovering vendor) | EPUB §Missable Warnings and Tips confirm vendor/missable status | PASS |
| Al Bhed Primer Vol. XXIII (NW cliff edge) | EPUB §Al Bhed Primers: "northwest corner of the Calm Lands, near the cliff's edge" | PASS |
| Caladbolg | Not explicitly listed as a chest item in the EPUB item table but confirmed as a Celestial Weapon obtained from NW corner chest after Catcher Chocobo win. EPUB walkthrough §Chocobo Training confirms the Catcher Chocobo course prerequisite. | PASS |
| Nirvana (Monster Arena chest) | EPUB §Items: "Nirvana (Yuna's ultimate weapon) — chest at Monster Arena after capturing all nine Calm Lands species; requires Celestial Mirror to open" | PASS |
| Farplane Wind x60 (Monster Arena reward) | EPUB §Items: "Farplane Wind (x60) — reward for capturing all nine monster species in the Calm Lands (Monster Arena)" | PASS |
| Rusty Sword (gorge floor east) | EPUB §Items: "Rusty Sword — gorge below the bridge to Mt. Gagazet, to the east" | PASS |
| Al Bhed Primer Vol. XXV (Cavern of Stolen Fayth) | EPUB §Al Bhed Primers: "inside the Cavern of the Stolen Fayth" | PASS |
| Duren (Blitzball Recruit, missable) | EPUB §Missable Warnings: not explicitly named in the EPUB reference, but the missable framing is game-accurate. The wave0 reference does not list Duren; this item's sourcing cannot be fully verified from the EPUB reference. | PARTIAL — game-accurate but not in EPUB reference text |
| Al Bhed Primer Vol. XXIV (west of Remiem Temple) | EPUB §Al Bhed Primers: "outside Remiem Temple, just west of the temple" | PASS |
| Cloudy Mirror (first chocobo race prize) | EPUB §Remiem Temple: "Winning earns the Cloudy Mirror" | PASS |
| Elixir (1 chest, 0 poles) | EPUB §Remiem race table: "1 chest = Elixir" | PASS |
| Megalixir (2 chests, 0 poles) | EPUB §Remiem race table: "2 chests = Megalixir" | PASS |
| Wings to Discovery x30 (3 chests, 0 poles) | EPUB §Remiem race table: "3 chests = Wings to Discovery (x30)" | PASS |
| Pendulum x30 (4 chests, 0 poles) | EPUB §Remiem race table: "4 chests = Pendulum (x30)" | PASS |
| Three Stars x60 (5 chests, 0 poles) | EPUB §Remiem race table: "5 chests = Three Stars (x60)" | PASS |
| Moon Sigil (defeat all 8 Belgemine aeons) | EPUB §Belgemine's Full Aeon Gauntlet: "Key reward: Defeating all aeons grants the Moon Sigil" | PASS |
| Celestial Mirror (Macalania Woods flower) | EPUB §Activating the Celestial Mirror: confirmed. | PASS |
| Yojimbo (Aeon, negotiation) | EPUB §Yojimbo: confirmed, 200,000 gil minimum. | PASS |

### Items in EPUB reference NOT in the JSON

**FAIL — multiple items from EPUB are absent**

The following EPUB-documented items are absent from the JSON:

| Missing item | EPUB location | Severity |
|---|---|---|
| Lucid Ring | Macalania campsite, partially hidden chest — start of chapter | HIGH — physical pickup missing entirely |
| Jecht's Sphere | SW of Macalania Woods crossroads, past Bevelle sentry | HIGH — the wave2 audit flagged this; it is a missable collectible |
| Power Sphere x30 | Belgemine reward for winning Shiva fight | MEDIUM |
| Aeon's Soul | Belgemine reward (win or lose Shiva fight) | HIGH — key item that unlocks aeon attribute upgrades |
| Lv. 2 Key Sphere (second one) | EPUB lists two Lv. 2 Key Spheres in the Calm Lands | LOW |
| 10,000 Gil (second listing) | EPUB §Items has a second "10,000 Gil — Calm Lands" (separate from SE corner) | LOW |
| Chocobo Feather | On ground near southern cliff; needed to access Remiem | MEDIUM |
| Chocobo training prizes | Elixir, Lv. 1-3 Key Spheres, X-Potion x2, Mega-Potion x2, Ether, Turbo Ether | MEDIUM |
| Megalixir (EPUB item list) | Appears in general items list separate from race prize table | LOW (may be same item listed twice in EPUB) |

The wave2 audit identified 20+ missing items total. The updated JSON resolves many of these (the Remiem Temple section accounts for the race prizes, Cloudy Mirror, Moon Sigil; the Celestial Mirror section accounts for the mirror; the Cavern section accounts for Yojimbo and Primer XXV). However, at minimum 8 items from the EPUB are still absent: Lucid Ring, Jecht's Sphere, Aeon's Soul, Power Sphere x30, Chocobo Feather, and all chocobo training course prizes.

---

## 5. Boss Verification

### 5a. Defender X — HP Check

**PASS**

`monsters.json` entry "defender x" → `"hp": [64000, 4060]`
JSON strategy states: "Defender X (64,000 HP)" — MATCHES authoritative source.

### 5b. Defender X — Mighty Guard / Lancet Claim

**PASS — the critical Wave 2 audit finding IS addressed**

Wave 2 audit finding D identified a **critical factual error**: the original JSON claimed "Use Lancet on Defender X to learn Mighty Guard." The audit confirmed Defender X does NOT teach Mighty Guard via Lancet; it is learned from Biran Ronso at Mt. Gagazet.

The updated JSON strategy reads:
> "Note: Mighty Guard is NOT learned via Lancet here — pick it up from Biran Ronso at Mt. Gagazet instead."

This explicitly corrects the error. The EPUB reference §Defender X confirms Mighty Guard is Defender X's own ability (it casts it on itself), not a Lancet-learnable ability. PASS.

### 5c. Defender X — Strategy Accuracy vs. EPUB

**PARTIAL**

The EPUB reference §Defender X describes a specific party composition and tactic sequence:
- Party: Yuna, Tidus, Auron — JSON mentions "Auron or Kimahri" for Provoke but does not state a recommended party. Minor gap.
- Tidus: Haste/Hastega — JSON says "Open with Haste/Hastega on the party." MATCH
- Yuna: Protect spells — JSON says "Heal with Yuna as needed" but does NOT mention Protect. PARTIAL
- Auron: Armor Break (not immune) — JSON says "Armor Break (not immune)." MATCH
- Mental Break — JSON does not mention Mental Break. Gap.
- Provoke on Auron or Kimahri — JSON says "Use Provoke on Auron or Kimahri." MATCH
- Demi ineffective — JSON says "immune to Demi." MATCH
- Late battle: Mighty Guard nullifies elemental damage — JSON now correctly says "Stop using elemental attacks" via the Mighty Guard note. MATCH (addressed)
- Steal: Lunar Curtain x4 (per monsters.json steal_common and steal_rare) — NOT mentioned in JSON strategy. Minor gap.

### 5d. Defender X — No fabricated mechanics

**PASS**

No fabricated abilities, incorrect damage claims, or invented mechanics detected. The "raw damage only" framing is consistent with the EPUB's elemental resistance table (all elements = 1 = normal, gravity = 0 = immune). The strategy does not invent resistances or vulnerabilities.

---

## 6. Audit Finding Verification

### Finding 1 (wave2 audit §A): Single sublocation for 7+ EPUB sections

**PARTIAL**

The original JSON had a single 75-word sublocation. The updated JSON now has:
- 3 `subLocations`: "Calm Lands (Plateau)", "Monster Arena", "The Gorge"
- 3 `optionalAreas`: "Remiem Temple", "Celestial Mirror Activation (Macalania Woods)", "Cavern of the Stolen Fayth"

This is a major structural improvement — 6 sections vs the original 1. The EPUB's 11 section headings across 4 pages are now covered by the 6 JSON sections. The "Strike Camp and Head West" opening section (Macalania campsite, Jecht's Sphere) remains uncovered by any sublocation.

Assessment: Largely addressed. The campsite/Jecht's Sphere gap is the remaining structural hole.

### Finding 2 (wave2 audit §B): 75 words of prose vs ~1,800 EPUB words

**PASS — substantially addressed**

The JSON now has prose in all 6 sections:
- Calm Lands (Plateau): ~130 words
- Monster Arena: ~110 words
- The Gorge: ~95 words
- Remiem Temple (optional): ~200 words
- Celestial Mirror (optional): ~180 words
- Cavern of Stolen Fayth (optional): ~200 words

Total prose: ~915 words. A 10x improvement over the original 75-word single block. Belgemine's Shiva fight description and chocobo training course details remain thin.

### Finding 3 (wave2 audit §C): 20+ items missing

**PARTIAL — significantly addressed, 8+ still absent**

The wave2 audit listed 20+ missing items. The updated JSON has recovered many of them through the new sublocations and optionalAreas (race prizes, Cloudy Mirror, Moon Sigil, Yojimbo, Rusty Sword, Nirvana, Farplane Wind, Primer XXIV, Primer XXV, and the main plateau items). Items still absent: Lucid Ring, Jecht's Sphere, Aeon's Soul, Power Sphere x30, Chocobo Feather, chocobo training prizes.

### Finding 4 (wave3 consolidated #67): Defender X Lancet/Mighty Guard factual error

**PASS — explicitly corrected**

The JSON now states: "Note: Mighty Guard is NOT learned via Lancet here — pick it up from Biran Ronso at Mt. Gagazet instead." This directly and clearly corrects the error that was the highest-priority factual issue for this chapter.

### Finding 5 (wave3 consolidated #68): Caladbolg requires Catcher Chocobo win — not noted

**PASS — addressed**

The JSON prose states: "The Caladbolg chest is also in the northwest corner but is sealed until you win the chocobo trainer rematch." This correctly communicates the prerequisite. The Caladbolg item entry also notes: "requires winning the Catcher Chocobo rematch to unlock."

### Finding 6 (wave2 audit §F): Chocobo training unlocks / Remiem time-gating notes

**PASS — addressed**

The Remiem Temple optionalArea `notes` array includes: "Each chocobo race prize (except the base Potion for 0 chests) can only be claimed once — do not leave mid-run." and "Defeat Belgemine's Bahamut here before the Airship to unlock the Magus Sisters recruitment." The wave2 audit's concern about time-gating is addressed.

---

## 7. Structural Issues Found in Updated JSON

### 7a. Duplicate item IDs

**FAIL**

The following IDs appear in BOTH `subLocations[2].items` ("The Gorge") AND `optionalAreas[2].items` ("Cavern of the Stolen Fayth"):
- `calm-lands-rusty-sword` (JSON lines 108 and 224)
- `calm-lands-primer-xxv` (JSON lines 115 and 229)

Duplicate IDs will cause checkbox state collisions in the app — checking one will check the other. The Gorge sublocation should be merged into or replaced by the Cavern of the Stolen Fayth optionalArea, or these items should be removed from The Gorge (since the Gorge is a brief transit section and the Cavern is the full coverage). Alternatively, the Gorge items should use distinct IDs (e.g., `calm-lands-gorge-rusty-sword`).

### 7b. "The Gorge" sublocation vs. "Cavern of the Stolen Fayth" optional area overlap

**FAIL — redundant content**

"The Gorge" subLocation and the "Cavern of the Stolen Fayth" optionalArea describe the same physical location with overlapping prose. The Gorge prose says: "At the bottom, head east along the gorge floor to find the Rusty Sword." The Cavern prose says: "At the bottom, head east along the gorge floor to find the Rusty Sword embedded in the ground."

Both sections describe the post-Defender X descent, both list the Rusty Sword, both list Primer Vol. XXV. The user will see this content twice. The Gorge section should either be removed (its content is fully covered by the Cavern optionalArea) or consolidated into a brief transition paragraph without duplicating items.

### 7c. Belgemine's Shiva encounter not represented

**FAIL — EPUB content gap persists**

The EPUB §Battle Belgemine in the Central Calm Lands (pg 62) describes:
- Encounter with Father Zuke (retired summoner) — narrative moment
- Belgemine using Shiva; player should summon Ifrit and use Fire spells
- Win reward: Power Sphere x30
- Win or lose: Aeon's Soul (key item enabling aeon stat upgrades)

None of this appears in any JSON sublocation. The Power Sphere x30 and Aeon's Soul are missing items. No prose covers the Belgemine/Shiva mechanic. This is a HIGH severity gap from the wave2 audit that remains unresolved.

### 7d. Lucid Ring and Jecht's Sphere absent

**FAIL — EPUB items not in JSON**

The EPUB §Strike Camp and Head West (pg 61) describes finding the Lucid Ring at the Macalania campsite and Jecht's Sphere southwest of the crossroads. These are documented in the EPUB reference file. Neither appears in any JSON section.

---

## 8. Summary Table

| Check | Status | Evidence |
|---|---|---|
| JSON validity | PASS | python3 parse succeeds |
| EPUB page confirmation (61–64) | PASS | 1a-epub-page-chapter-map.md line 718 |
| Sublocation coverage of EPUB sections | PARTIAL | 6 sections now vs original 1; campsite/Belgemine gaps remain |
| Plateau prose vs. EPUB | PASS | All major plateau points covered |
| Monster Arena prose vs. EPUB | PASS | Accurate and complete |
| Gorge/Cavern prose vs. EPUB | PARTIAL | Directionally correct but duplicated across two JSON sections |
| Items confirmed in EPUB | PASS | 23 of 31+ items verified against EPUB reference |
| Items missing from EPUB (still absent) | FAIL | Lucid Ring, Jecht's Sphere, Aeon's Soul, Power Sphere x30, Chocobo Feather, training prizes |
| Fabricated items detected | PASS (none found) | All listed items confirmed in EPUB or monsters.json |
| Defender X HP (64,000) | PASS | monsters.json "hp": [64000, 4060] |
| Defender X Lancet/Mighty Guard error | PASS | Explicitly corrected: "NOT learned via Lancet here" |
| Defender X strategy accuracy | PARTIAL | Missing Protect and Mental Break tactics; steal not mentioned |
| No fabricated boss mechanics | PASS | No invented abilities or resistances found |
| Wave2 finding A (sublocation coverage) | PARTIAL | Substantially improved, campsite section still missing |
| Wave2 finding B (prose volume) | PASS | ~915 words vs original 75; adequate |
| Wave2 finding C (20+ missing items) | PARTIAL | ~12 items still absent |
| Wave2 finding D (Lancet error) | PASS | Corrected |
| Wave2 finding F (time-gating notes) | PASS | Remiem notes array covers this |
| Duplicate item IDs | FAIL | calm-lands-rusty-sword and calm-lands-primer-xxv appear twice |
| Gorge/Cavern redundancy | FAIL | Same content duplicated in subLocation and optionalArea |
| Belgemine Shiva encounter | FAIL | Not present in any JSON section |

---

## 9. Required Fixes Before This Chapter Can Pass QA

1. **Remove "The Gorge" subLocation** or strip its items — content is fully duplicated in the "Cavern of the Stolen Fayth" optionalArea. Keeping both creates duplicate IDs (`calm-lands-rusty-sword`, `calm-lands-primer-xxv`) and duplicate UI checkboxes.

2. **Add a "Belgemine — Shiva Challenge" section** (either as a subLocation within Calm Lands Plateau or a separate subLocation) covering: Father Zuke encounter, Ifrit vs Shiva strategy, Power Sphere x30 win reward, Aeon's Soul awarded regardless of outcome.

3. **Add Lucid Ring** — EPUB §Strike Camp and Head West. Campsite chest at Macalania side, start of chapter. Recommend either adding to the Calm Lands (Plateau) sublocation with a note about the campsite, or adding a brief "Macalania Campsite (Chapter Start)" sublocation.

4. **Add Jecht's Sphere** — SW of Macalania Woods crossroads, past Bevelle sentry. Documented in EPUB reference. Same recommended sublocation as above.

5. **Add Chocobo Feather** — required to trigger the jump to Remiem Temple area. EPUB §Remiem Temple confirms this.

6. **Add chocobo training course prizes** — EPUB §Chocobo Training Course Prizes table: Elixir, Lv. 1 Key Sphere, Lv. 2 Key Sphere, Lv. 3 Key Sphere (first prizes) plus X-Potion, Mega-Potion, Ether, Turbo Ether (repeat prizes). Consider adding to Remiem Temple optionalArea or a dedicated Chocobo Training optionalArea.

7. **Minor**: Add Lunar Curtain steal note to Defender X strategy (confirmed in monsters.json steal_common and steal_rare).

---

## 10. Confirmed Passing Items

- The critical factual error (Lancet teaches Mighty Guard from Defender X) is **fully corrected**. This was the top priority from the wave2 audit.
- Defender X HP (64,000) is correct per monsters.json.
- The Monster Arena sublocation is accurate and well-sourced.
- The Remiem Temple optionalArea correctly captures the race mechanics, prize table, and Belgemine full gauntlet structure.
- The Celestial Mirror optionalArea gives a complete and accurate step-by-step for the Macalania Woods sequence.
- The Cavern of the Stolen Fayth optionalArea correctly describes Yojimbo negotiation and 200,000 gil budget.
- All three Al Bhed Primers (XXIII, XXIV, XXV) are present, correctly located, and correctly attributed per EPUB reference.
- Missable warnings for Magic Counter Shield and Duren are accurate.
- Caladbolg's Catcher Chocobo prerequisite is now correctly documented.
- No fabricated items, boss mechanics, or game data detected in the updated JSON.
