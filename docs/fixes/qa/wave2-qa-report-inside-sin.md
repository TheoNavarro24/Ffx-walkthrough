# Wave 2 QA Report — inside-sin

**QA Agent**: Wave 2 independent verification
**Date**: 2026-04-06
**Files checked**:
- JSON: `spira-guide/src/data/chapters/inside-sin.json`
- EPUB reference: `docs/fixes/wave0/inside-sin-reference.md` (EPUB pp. 74–75)
- Audit source: `docs/audit/wave2/2h-zanarkand-dome-airship-sin-inside-sin.md` §Inside Sin
- Consolidated findings: `docs/audit/wave3/3a-consolidated-gap-report.md` §inside-sin
- EPUB page map: `docs/audit/wave1/1a-epub-page-chapter-map.md` pp. 74–75
- Boss HP authority: `docs/source-data/monsters.json`

---

## [JSON Validity]

**PASS**

File parses without error (verified via `python3 json.load`). Structure contains all expected top-level keys: `slug`, `missables`, `party`, `oaka`, `sgTip`, `subLocations`, `bosses`, `cloister`, `optionalAreas`.

---

## [Sublocation Structure]

**PASS**

The updated JSON contains exactly three sublocations matching the EPUB section headings (pp. 74–75):

| JSON name | EPUB heading | Match |
|-----------|-------------|-------|
| Sea of Sorrow | "Cross the Sea of Sorrow" (p.74) | Yes |
| City of Dying Dreams | "Explore the City of Dying Dreams" (p.75) | Yes |
| Tower of Death | "Prepare for Battle Atop the Tower of Death" (p.75) | Yes |

Wave 2 audit finding #1 (CRITICAL: three EPUB areas collapsed into one sublocation) is **resolved**. The previous single-sublocation structure has been correctly split into three.

---

## [Sublocation Prose vs. EPUB — Sea of Sorrow]

**PASS**

JSON prose (Sea of Sorrow, 136 words) matches the EPUB reference for p.74:

- Waterfall navigation mechanic (ride down, cannot climb, circuitous route): present in both JSON and EPUB.
- Behemoth King Meteor (~6,000 damage to party on death): present. JSON offers three mitigations: Protect, aeon absorb, flee — all corroborated by the EPUB reference.
- Energy Dragons vulnerable to Bio: present in JSON, corroborated by EPUB chapter header enemy notes.
- Map disorientation warning ("area map only shows your immediate surroundings, use the guide map"): present in JSON, matches EPUB p.74 prose.

No fabricated or contradicted prose found.

**Minor note (not a FAIL)**: The EPUB reference also mentions Counterattack/Catch weapons as a fourth Meteor mitigation; the JSON omits this. However, the three mitigations listed are accurate and sufficient for a veteran-audience guide.

---

## [Sublocation Prose vs. EPUB — City of Dying Dreams]

**PASS**

JSON prose (City of Dying Dreams, ~180 words) matches the EPUB reference for p.75:

- Glyph mechanic (search right-hand wall, kill 10 → more → 15 fiends, total 35 kills, reward Lv. 4 Key Sphere): present in both.
- Demonolith Breath petrification danger (instant game over): present in both. JSON correctly recommends Stoneproof armor or fighting with aeons.
- Lift platform navigation (Yevon-symbol platform, lowered bridge for Defending Bracer): present in both.
- Laevatein at bottom of spiral slide (small southern building, wall prompt to climb out): present in both.

No fabricated or contradicted prose found.

---

## [Sublocation Prose vs. EPUB — Tower of Death]

**PASS**

JSON prose (Tower of Death, ~155 words) matches the EPUB reference for p.75:

- Tower crashes to the ground as you approach from the north: present in both.
- Icicle mechanic (battle triggers if one hits you): present in both.
- Navigation tip (stand still for camera, move away from white glow): present in both.
- Crystal collectibles appear and fade — sprint to touch them: present in both.
- Collect 10 items to trigger the final encounter: present in both.
- Last Save Sphere location and point-of-no-return framing: present in both.

JSON prose also lists the crystal item names (Prism Ball, Mage's Staff, Skill Sphere, Infinity, Hrunting, Knight Lance, etc.) which aligns with the EPUB chapter header item list.

No fabricated or contradicted prose found.

---

## [Items — Sea of Sorrow]

**PARTIAL**

JSON items for Sea of Sorrow:
- 20,000 Gil — EPUB p.74 lists "20,000 gil" in the chapter header item sidebar. **PASS** (present).
- Lv. 4 Key Sphere — EPUB chapter header lists this; however the EPUB reference notes this is "confirmed in p.75" as the glyph door reward (City of Dying Dreams). The Sea of Sorrow listing of a Lv. 4 Key Sphere ("Chest at the top of the western falls") is potentially a duplicate ID with the City of Dying Dreams glyph reward. The item ID `inside-sin-lv4-key-sphere` is used in **both** Sea of Sorrow and City of Dying Dreams, which will cause checkbox deduplication errors in the app. **FAIL** (duplicate ID across sublocations).
- HP Sphere — EPUB reference notes an HP Sphere in the City of Dying Dreams item list (on a platform beside the 20,000 Gil chest). The Sea of Sorrow HP Sphere ("Chest in the northwestern alcove") is plausible given the poptracker data references 5+ Sea of Sorrow chests, but the EPUB reference for p.74 specifically says "No chests called out individually on this page." This item cannot be independently confirmed from the EPUB reference text. **PARTIAL** (plausible from poptracker context; not directly contradicted, but unverifiable from the EPUB text alone).

**Missing items from EPUB p.74**: The EPUB reference for p.74 calls out "No chests called out individually" — meaning specific chest contents for Sea of Sorrow come from the chapter header sidebar and poptracker, not explicit EPUB prose. The JSON's 3-item list is reasonable given available data.

**Key duplicate ID issue**: `inside-sin-lv4-key-sphere` appears in both Sea of Sorrow and City of Dying Dreams. These must have unique IDs (e.g., `inside-sin-sos-lv4-key-sphere` vs. `inside-sin-cod-lv4-key-sphere`). This is a technical bug that will break checkbox tracking.

---

## [Items — City of Dying Dreams]

**PASS**

All 7 items in the City of Dying Dreams item list are confirmed by the EPUB reference (p.75):

| JSON item | EPUB p.75 confirmation | Status |
|-----------|----------------------|--------|
| Lv. 4 Key Sphere (glyph door reward, 35 kills) | "Your reward for the 35 kills is a single Lv. 4 Key Sphere" | PASS |
| Four-on-One (Wakka's weapon, Yevon-symbol platform) | "Wakka's Four-on-One — stand on the Yevon-symbol platform" | PASS |
| Defending Bracer (cross from Four-on-One, push bridge) | "Defending Bracer — cross from the Four-on-One chest, push the bridge down" | PASS |
| 20,000 Gil (ramp down near bridge) | "20,000 gil — ramp down near the bridge" | PASS |
| HP Sphere (platform beside 20,000 Gil chest) | "HP Sphere — step on the platform beside the 20,000 gil chest to ride to this" | PASS |
| Defense Sphere (same platform ride) | "Defense Sphere — same platform ride (second item high above the city)" | PASS |
| Laevatein (Yuna's weapon, spiral slide, south entrance) | "Yuna's Laevatein — at the bottom of the long spiral in the small building" | PASS |

No fabricated items found. All items are EPUB-sourced.

**Note**: The `inside-sin-20000-gil` and `inside-sin-hp-sphere` IDs are also used in the Sea of Sorrow sublocation. These will cause checkbox deduplication bugs. See duplicate ID finding above.

---

## [Items — Tower of Death]

**PASS**

JSON lists 13 crystal collectibles. The EPUB chapter header (p.72 item sidebar) explicitly lists these by name. Cross-referencing:

| JSON item | EPUB p.72 chapter header | Status |
|-----------|-------------------------|--------|
| Prism Ball | Listed | PASS |
| Mage's Staff | Listed | PASS |
| Wicked Cait Sith | Listed | PASS |
| Special Sphere | Listed | PASS |
| Skill Sphere | Listed | PASS |
| Infinity | Listed | PASS |
| Hrunting | Listed | PASS |
| Elixir | Listed | PASS |
| Knight Lance | Listed | PASS |
| Wizard Lance | Listed | PASS |
| Attribute Sphere | Listed | PASS |
| Stillblade | Listed | PASS |
| Wht Magic Sphere | Listed | PASS |

All 13 items match the EPUB chapter header item list exactly. No fabricated items.

---

## [Boss: seymour-omnis — HP]

**PASS**

`monsters.json` confirms: Seymour Omnis HP = **80,000** (Overkill: 15,000). EPUB reference (p.74) states HP 80,000 (Overkill: 15,000). The JSON strategy does not explicitly state the HP figure in the strategy text, but this is consistent with the data file and matches the EPUB.

---

## [Boss: seymour-omnis — Mortiphasm Rotation Mechanic]

**PASS**

The Wave 2 audit (finding #4) identified a CRITICAL error: the prior version said "destroy all four [Mortiphasms]" when the EPUB says "rotate" them. The updated JSON strategy correctly describes the rotation mechanic:

> "To change his elemental alignment, target a Mortiphasm with attacks or spells: this forces the ring to rotate, shifting which element is active."

This is consistent with the EPUB reference:
> "you can force them to rotate by targeting them with attacks or spells"

The strategy also correctly explains: avoid casting the element he currently absorbs (heals him), exploit the weak element via Lulu, and mixing types removes clear weakness but also removes devastating Multi-Spell.

The Dispel → Ultima sequence is present:
> "Mid-fight, Seymour casts Dispel on the party — this signals his next action will be the non-elemental Ultima."

This matches the EPUB: "About halfway through the fight, Seymour casts Dispel on your team. His next action will be the deadly, non-elemental Ultima spell."

Armor Break and Mental Break (Auron) mentioned. Kimahri's Mighty Guard noted. **No contradictions with EPUB found.**

---

## [Boss: seymour-omnis — sinspawn-genais NOT present]

**PASS**

The bosses array contains exactly: `seymour-omnis`, `braska-final-aeon`, `yu-yevon`. There is no `sinspawn-genais` entry. The Wave 2 audit finding (#7, HIGH: Sinspawn Genais in wrong chapter) has been resolved — Genais is no longer listed in inside-sin.

---

## [Boss: braska-final-aeon — HP]

**PARTIAL**

`monsters.json` confirms:
- First phase: HP = **60,000** (Overkill: 20,000)
- Second phase: HP = **120,000** (Overkill: 20,000)

EPUB reference (p.75) confirms: 60,000 first form, 120,000 second form.

The JSON strategy mentions "the first 60,000 HP are depleted (total 120,000 HP across both forms)" — this is present and correct.

However, the strategy slug is `braska-final-aeon` (a single entry). The boss card does not present separate HP values for both phases as distinct data fields — the HP figure is embedded in the strategy prose rather than a structured HP field. This is not a correctness error (the numbers are right in the prose) but means the chapter data doesn't surface Phase 2 HP as a scannable stat. This is an existing structural limitation, not a Wave 2 regression.

**Verdict**: HP values are correct in the prose; data structure limitation is pre-existing and not a regression introduced by this wave.

---

## [Boss: yu-yevon — HP and Auto-Life Mechanic]

**PASS**

`monsters.json` confirms Yu Yevon HP = **99,999** (Overkill: 99,999), with `zombie: 0` (susceptible to Zombie). The EPUB reference does not provide a specific HP figure for Yu Yevon in the reference doc.

The JSON strategy correctly describes the Auto-Life mechanic:

> "Yu Yevon has permanent Auto-Life — every time you kill it, it immediately revives. The game handles this automatically: continue attacking until the Auto-Life cycles are exhausted and the fight concludes."

The strategy also notes the aeon sequence before Yu Yevon and correctly characterizes it as "functionally impossible to lose; it is scripted to end the game."

Wave 2 audit finding #6 (MEDIUM: Yu Yevon strategy misleading — said "unkillable conventionally") has been resolved. The updated strategy no longer says "unkillable" — it correctly explains the Auto-Life cycle mechanic and the scripted conclusion.

---

## [Missables — Point-of-No-Return Warning]

**PASS**

The JSON contains three missable entries plus a structured `saveSphere` object with `"pointOfNoReturn": true`. The primary point-of-no-return warning is in the Tower of Death `missableWarning`:

> "POINT OF NO RETURN — The Save Sphere at the top of the City of Dying Dreams ramp is the last chance to return to the airship for side quests. Once you enter the Tower and trigger the final sequence (10 crystal items collected), there is no going back."

The top-level `missables` array also contains:

> "Point of no return — after the final Save Sphere in Tower of Death, you cannot return to the airship. Complete all side quests first."

Wave 2 audit finding #10 (MEDIUM: No point-of-no-return warning) and consolidated finding #84 are **resolved**.

The EPUB reference confirms: "The final Save Sphere in the game is near the top of the ramp. This is your last chance to return to the airship and pursue side quests before the finale!"

---

## [sgTip]

**PASS**

`sgTip` is not null. Value:

> "Ensure your key characters have Auto-Life or a full complement of Overdrives before entering. This is the final dungeon."

Wave 2 audit finding #9 (CRITICAL: `sgTip: null`) is **resolved**.

The tip is appropriate for an endgame chapter in a veteran-audience walkthrough. It is not directly sourced from the EPUB's specific sphere grid tips section, but the EPUB reference notes "All 26 primers must be collected before reaching this point" and the endgame preparation framing is consistent with the EPUB's overall tone for this chapter.

---

## [Duplicate Item IDs — Technical Bug]

**FAIL**

Three item IDs appear in multiple sublocations:

| ID | Sea of Sorrow | City of Dying Dreams |
|----|--------------|---------------------|
| `inside-sin-lv4-key-sphere` | Yes (chest at top of western falls) | Yes (glyph door reward) |
| `inside-sin-20000-gil` | Yes (chest in Sea of Sorrow) | Yes (ramp down near bridge) |
| `inside-sin-hp-sphere` | Yes (chest in northwestern alcove) | Yes (platform beside 20,000 Gil chest) |

These are distinct items at distinct locations but share IDs. In the checkbox tracking system (`useCheckbox.js`), IDs are used as localStorage keys. Duplicate IDs mean checking one item will mark the other as checked too, and unchecking one will uncheck the other. This is a correctness bug that needs resolution before this chapter is usable.

**Required fix**: Disambiguate IDs with sublocation prefix:
- `inside-sin-sos-lv4-key-sphere` (Sea of Sorrow)
- `inside-sin-cod-lv4-key-sphere` (City of Dying Dreams)
- `inside-sin-sos-20000-gil` (Sea of Sorrow)
- `inside-sin-cod-20000-gil` (City of Dying Dreams)
- `inside-sin-sos-hp-sphere` (Sea of Sorrow)
- `inside-sin-cod-hp-sphere` (City of Dying Dreams)

---

## Summary Table

| Check | Result | Notes |
|-------|--------|-------|
| JSON validity | PASS | Parses without error |
| 3 sublocations present | PASS | Sea of Sorrow, City of Dying Dreams, Tower of Death |
| Sea of Sorrow prose vs. EPUB | PASS | All major EPUB points present |
| City of Dying Dreams prose vs. EPUB | PASS | Glyph mechanic, Demonolith, navigation all present |
| Tower of Death prose vs. EPUB | PASS | Crystal mechanic, camera tip, final save sphere all present |
| Sea of Sorrow items | PARTIAL | HP Sphere unverifiable from EPUB text alone; duplicate IDs (see below) |
| City of Dying Dreams items | PASS | All 7 items confirmed by EPUB p.75 |
| Tower of Death items | PASS | All 13 crystal items confirmed by EPUB p.72 chapter header |
| Seymour Omnis HP (80,000) | PASS | Confirmed by monsters.json and EPUB |
| Seymour Omnis Mortiphasm rotation | PASS | "rotate" mechanic correctly described; "destroy" error fixed |
| Seymour Omnis Dispel → Ultima | PASS | Present in strategy |
| sinspawn-genais NOT in bosses | PASS | Correctly absent from inside-sin bosses array |
| Braska's Final Aeon HP (60k/120k) | PARTIAL | Correct in prose; not in structured data fields |
| Yu Yevon Auto-Life mechanic | PASS | Correctly described; prior "unkillable" error fixed |
| Point-of-no-return warning | PASS | Present in missables array and Tower of Death missableWarning |
| sgTip not null | PASS | Present and appropriate |
| Duplicate item IDs | FAIL | 3 IDs shared across Sea of Sorrow and City of Dying Dreams — will break checkbox tracking |

---

## Required Fixes Before Ship

1. **[CRITICAL] Deduplicate item IDs**: `inside-sin-lv4-key-sphere`, `inside-sin-20000-gil`, and `inside-sin-hp-sphere` each appear in two sublocations. Add sublocation prefixes (e.g., `-sos-`, `-cod-`) to make all IDs unique.

## Resolved Issues (from Wave 2 audit)

The following findings from the Wave 2 audit and Wave 3 consolidated report have been successfully resolved in this update:

- CRITICAL #10 (three EPUB areas collapsed into one sublocation) — **resolved** via three sublocations
- CRITICAL #11 (only 1 item tracked; 12+ missing) — **resolved**: 23 items now tracked across three sublocations
- HIGH #49 (Mortiphasm "destroy" error) — **resolved**: correctly says "rotate"
- HIGH #49 (Dispel → Ultima sequence missing) — **resolved**: present in strategy
- HIGH "sinspawn-genais in wrong chapter" — **resolved**: removed from inside-sin bosses
- MEDIUM #80 (prose missing glyph doors, Demonolith, crystal mechanic) — **resolved**
- MEDIUM #81 (Yu Yevon strategy misleading) — **resolved**
- MEDIUM #84 (no point-of-no-return warning) — **resolved**
- CRITICAL `sgTip: null` — **resolved**

## Remaining Open Issues (not introduced by this wave)

- **Braska's Final Aeon HP not in structured stat fields** (only in prose): pre-existing structural limitation; not a regression.
- **Sea of Sorrow HP Sphere unverifiable from EPUB text**: plausible from poptracker; not fabricated, but unconfirmed from EPUB prose.
- **Missing steal data in strategies** (Seymour Omnis: Shining Gem / Supreme Gem; BFA: Turbo Ether / Elixir): noted in Wave 2 audit finding #8 as MEDIUM; not addressed in this wave update. Not blocking for ship but desirable.
- **City of Dying Dreams kill count ambiguity**: JSON says "kill 10 fiends ... second door requires more kills" but does not specify the second door's count. EPUB also says "more kills" without specifying — this ambiguity is in the source material, not fabricated.
