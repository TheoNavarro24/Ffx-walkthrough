# Wave 3 QA Report C — kilika + ss-liki Boss Cards

**QA date:** 2026-04-06
**Chapters checked:** kilika, ss-liki
**Source files:**
- `spira-guide/src/data/chapters/kilika.json`
- `spira-guide/src/data/chapters/ss-liki.json`
- `docs/fixes/wave0/kilika-reference.md`
- `docs/fixes/wave0/ss-liki-reference.md`
- `docs/source-data/monsters.json`

---

## [Chapter: kilika / Boss: sinspawn-geneaux]

**FAIL**

### HP Check
- monsters.json `sinspawn geneaux (first phase)`: HP 3,000 / Overkill 900
- monsters.json `sinspawn geneaux (tentacles)`: HP 450 / Overkill 500
- JSON strategy states: "3,000 HP / Overkill 900" for body and "450 HP / Overkill 500 each" for tentacles
- **Result: PASS** — HP values are accurate.

### Shell Absorbs Magic (Required Check)
- JSON strategy: "The shell absorbs magic — do NOT cast spells on the body. The tentacles (450 HP / Overkill 500 each) also absorb magic."
- EPUB reference: "Tentacles absorb magic, so do NOT cast Fire at the start (tentacles will absorb it)."
- **Result: PASS** — The absorb mechanic is correctly stated for both body and tentacles. The warning "do NOT cast spells on the body" is technically stronger than what the EPUB states (which focuses on tentacles absorbing magic), but does not contradict it and is a safe player instruction.

### Kimahri's Lancet as Tool for the Shell (Required Check)
- JSON strategy: "use Kimahri's Lancet (piercing physical) to chip away at the shell body"
- EPUB reference: "only Kimahri's piercing weapons can damage the body directly" (Phase 1)
- **Result: PARTIAL FAIL — INACCURACY FOUND**

  The JSON strategy reads: "once they [tentacles] are gone, use Kimahri's Lancet (piercing physical) to chip away at the shell body, **or continue with physical attacks from Tidus and Wakka**."

  This is incorrect. The EPUB reference is explicit that in Phase 1 (shell curled), only Kimahri's piercing weapons can damage the body directly. Tidus and Wakka cannot deal damage to the shell body in Phase 1. Presenting their physical attacks as a valid alternative is fabricated strategy that would mislead the player into wasting turns.

  **Required fix:** Remove "or continue with physical attacks from Tidus and Wakka" from Phase 1 guidance. The correct instruction is that Kimahri's Lancet (or any piercing weapon) is the only way to damage the shell body before Phase 2. Tidus and Wakka should focus on wiping out any remaining Sinscales or simply pass/defend while Kimahri works the body.

### Fabricated Mechanics Check
- "Venom attack which can poison the whole party" — The EPUB reference does not mention Venom by name. The reference does note Yuna for Esuna and poison management. "Venom" is a named attack used by Sinspawn Geneaux in the game; this is not fabricated, but the EPUB reference does not cite it explicitly. No other fabricated mechanics detected beyond the Tidus/Wakka physical attack error noted above.

### Word Count
- Strategy: 114 words
- **Result: PASS** (50–200 word range)

### JSON Validity
- JSON is valid and well-formed; no structural errors.

---

## [Chapter: kilika / Boss: lord-ochu]

**PASS**

### HP Check
- monsters.json `lord ochu`: HP 4,649 / Overkill 800
- JSON strategy states: "4,649 HP / Overkill 800"
- **Result: PASS** — HP values match exactly.

### Sub-2000 HP Threshold Behavior (Required Check)
- JSON strategy: "Below 2,000 HP, Lord Ochu switches to Earthquake — summon Valefor at this point, as Valefor is completely immune to Earthquake."
- EPUB reference: "Below 2,000 HP: he shifts tactics and begins casting Earthquake — summon Valefor at this point (Valefor is completely immune to Earthquake)."
- **Result: PASS** — Threshold and behavior accurately described, consistent with EPUB reference.

### Valefor's Advantage (Required Check)
- JSON strategy explicitly calls out summoning Valefor and its immunity to Earthquake.
- **Result: PASS**

### Fabricated Mechanics Check
- Sleep/HP regen mechanic: JSON states "Lord Ochu also falls asleep periodically to begin regenerating HP; wake him immediately with normal physical attacks (not spells) the moment Z's appear above his head." EPUB reference confirms this exact mechanic.
- Poison threat: JSON mentions Poison as a main threat with Antidote/Esuna response. EPUB confirms Lord Ochu poisons party members.
- Haste on Lulu: JSON recommends "cast Haste on Lulu if Tidus has learned it." EPUB reference tip confirms this.
- NulBlaze Shield reward note: JSON mentions it is only awarded if Ochu is already dead when speaking to the Crusaders sentry — EPUB reference confirms this is conditional.
- **Result: PASS** — No fabricated mechanics detected.

### Word Count
- Strategy: 130 words
- **Result: PASS** (50–200 word range)

### JSON Validity
- JSON is valid and well-formed; no structural errors.

---

## [Chapter: ss-liki / Boss: sin-fin]

**PASS**

### HP Check
- monsters.json `sin (fin)` (location: s.s. liki): HP 2,000 / Overkill 1,000
- JSON strategy states: "Sin's Fin HP: 2,000 (Overkill: 1,000). Sinscale HP: 200."
- monsters.json `sinscale (s.s. liki, boat)`: HP 200 / Overkill 400
- **Result: PASS** — Both HP values are accurate.

### Auron Cannot Hit the Fin (Required Check)
- JSON strategy: "Due to ship positioning, Auron cannot reach the Fin — only Wakka's ranged blitzball, Lulu's spells, and Yuna's aeon can hit it."
- EPUB reference: "Sin's fin is the real target. It can only be damaged by Wakka's blitzball, Lulu's spells, or Yuna's aeon."
- **Result: PASS** — The JSON goes further than the EPUB by explicitly calling out Auron by name as unable to reach the Fin, which is accurate and helpful. The EPUB implies this by listing only three attackers.

### Yuna Summoning Aeon as Primary Damage Dealer (Required Check)
- JSON strategy: "Summon Valefor or Ifrit for the best results: the aeon deals melee damage directly to the Fin and also absorbs hits for the party."
- EPUB reference: lists Yuna's aeon as one of the three damage sources for the Fin.
- **Result: PASS** — Aeon is mentioned. The JSON promotes it as the primary recommendation ("best results"), which is a reasonable tactical emphasis beyond what the EPUB states. Not fabricated; aeons do deal melee hits to the Fin and do take damage for the party.

  Minor note: The EPUB mentions Ifrit is not yet available at this point in the game (Ifrit is obtained at Kilika Temple, which comes after the S.S. Liki chapter). The JSON lists "Valefor or Ifrit" as options — but Ifrit is obtained at the end of the Kilika chapter, not the S.S. Liki chapter. At the time of the S.S. Liki fight, only Valefor is available. This is a continuity error in the strategy, though not a major mechanical fabrication. Recommend removing "or Ifrit" from the ss-liki sin-fin strategy.

### Leave One Sinscale Alive (Required Check)
- JSON strategy: "Sinscales continuously respawn whenever the last one is killed — leave one Sinscale alive to break this loop and cap incoming damage"
- EPUB reference: "Leaving one Sinscale alive prevents Sin from producing more, capping incoming damage — useful to let you go all-in on the fin."
- **Result: PASS** — Mechanic accurately described and matches EPUB reference exactly.

### Fabricated Mechanics Check
- No fabricated mechanics detected. All strategic points (aeon damage, Sinscale respawn loop, Auron positioning limitation) are confirmed by the EPUB reference.

### Word Count
- Strategy: 112 words
- **Result: PASS** (50–200 word range)

### JSON Validity
- JSON is valid and well-formed; no structural errors.

---

## Summary

| Chapter | Boss | Verdict | Notes |
|---|---|---|---|
| kilika | sinspawn-geneaux | **FAIL** | Phase 1 body strategy inaccurate: claims Tidus/Wakka physicals can hit the shell; only Kimahri's piercing can. Must fix. |
| kilika | lord-ochu | **PASS** | All HP, mechanics, and threshold behavior accurate. |
| ss-liki | sin-fin | **PASS** | All required checks met. Minor continuity note: Ifrit is not yet available during ss-liki; recommend removing "or Ifrit" from strategy. |

### Required Fixes

1. **kilika / sinspawn-geneaux** (FAIL — must fix before ship):
   Remove the clause "or continue with physical attacks from Tidus and Wakka" from Phase 1 guidance. Replace with correct guidance that only Kimahri can deal damage to the shell body during Phase 1; Tidus and Wakka should focus Sinscales or defend.

2. **ss-liki / sin-fin** (advisory — minor continuity error):
   Remove "or Ifrit" from the strategy. Only Valefor is available during the S.S. Liki chapter; Ifrit is obtained at Kilika Temple, which is the subsequent chapter.
