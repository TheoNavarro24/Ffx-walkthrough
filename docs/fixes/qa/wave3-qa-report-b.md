# Wave 3 QA Report B — Boss Cards
**Chapters**: airship-sin, mt-gagazet, via-purifico, zanarkand-dome
**Sources**: Chapter JSONs vs. `docs/source-data/monsters.json` + `docs/fixes/wave0/{slug}-reference.md`
**Date**: 2026-04-06

---

## airship-sin

### [airship-sin: sin-left-fin]
**PASS**

- HP in strategy: 65,000. `monsters.json` `sin (left fin)`: HP [65000, 10000]. MATCH.
- Ship positioning mechanic (CLOSE/BACK), Negation stripping buffs, Sinscale management, Gravija — all consistent with EPUB reference (pages 72–73) which describes the same Cid move close/back mechanic and Negation ability.
- Word count: 139. Within 50–200 range.

---

### [airship-sin: sin-right-fin]
**PASS**

- HP in strategy: 65,000. `monsters.json` `sin (right fin)`: HP [65000, 10000]. MATCH.
- Described as identical to Left Fin fight — consistent with EPUB reference, which states "two fights are essentially identical."
- Word count: 74. Within range.

---

### [airship-sin: sinspawn-genais]
**PASS WITH NOTE**

- HP in strategy: 20,000. `monsters.json` `sinspawn genais`: HP [20000, 2000]. MATCH.
- Key mechanic "absorbs any magic cast at Sin — kill Genais first" present. PASS.
- "Apply Slow to Genais" — `monsters.json` shows `slow: 0` (Genais susceptible). PASS.
- Strategy states "Silence it immediately to shut off the healing (Genais is immune to Reflect)." The EPUB reference (page 73 notes) also states "Silence Genais to shut off Cura (Genais is immune to Reflect)." However, `monsters.json` shows `silence: [100]` (fully immune). The JSON strategy is consistent with its EPUB source, but contradicts game data. The EPUB guide itself may be inaccurate on this point. **No fix needed to the JSON since it faithfully reflects the EPUB reference, but this discrepancy should be noted for a future data reconciliation pass.**
- Word count: 134. Within range.

---

### [airship-sin: sin-core]
**PASS**

- HP in strategy: 36,000. `monsters.json` `sin (core)`: HP [36000, 3000]. MATCH.
- Strategy correctly defers to sinspawn-genais entry for fight context (simultaneous fight). Concise and accurate.
- Word count: 54. Within range.

---

### [airship-sin: sin-head]
**PASS**

- HP in strategy: 140,000. `monsters.json` `sin (head)`: HP [140000, 10000]. MATCH.
- Giga-Graviton countdown mechanic present: "Sin opens its mouth gradually and fires on approximately its 16th turn; this cannot be survived or avoided. The entire fight is a DPS race against that countdown." Confirmed by EPUB reference which states "fires Giga-Graviton — an instant game over that cannot be avoided or survived" at ~16th turn. PASS.
- Aeon tanking tip ("aeons absorb Giga-Graviton hits") present.
- Word count: 135. Within range.

**Boss order check**: sin-left-fin → sin-right-fin → sinspawn-genais → sin-core → sin-head. EPUB reference lists: 1. Left Fin, 2. Right Fin, 3. Sin & Sinspawn Genais, 4. Overdrive Sin. JSON order matches. PASS.

---

## mt-gagazet

### [mt-gagazet: biran-ronso]
**PASS**

- HP: `monsters.json` `biran ronso`: HP "Varies" (scaling with Kimahri's stats). Strategy correctly states "HP: scales" and explains the scaling mechanic. MATCH.
- Specific check: strategy states "Use Lancet on Biran to learn Mighty Guard (he uses it near death) — this is the correct chapter for that, not Defender X in the Calm Lands." `monsters.json` `biran ronso` `ronso_rage`: includes `mighty guard`. PASS. Correctly attributes Mighty Guard to Biran (not Defender X).
- Strategy states "Use Lancet on Yenke to learn White Wind." `monsters.json` `yenke ronso` `ronso_rage`: includes `white wind`. PASS.
- "When one falls the survivor goes berserk" — confirmed by EPUB reference. PASS.
- Word count: 145. Within range.

---

### [mt-gagazet: seymour-flux]
**FAIL — FABRICATED MECHANIC**

- HP: 70,000 in strategy. `monsters.json` `seymour flux`: HP [70000, 3500]. MATCH.
- Mortiorchis HP: 4,000 in strategy. `monsters.json` `seymour flux (mortiorchis)`: HP [4000, '-']. MATCH.
- Total Annihilation interrupt mechanic present: "Mortiorchis charges Total Annihilation over two to three turns (telegraphed by the 'Auto-attack Mode' message), which hits the full party for massive damage. Kill Mortiorchis immediately to interrupt the charge before it fires." EPUB reference (mt-gagazet-reference.md) confirms this mechanic: "Mortiorchis Total Annihilation: Charges over two to three turns." **PASS for Total Annihilation.**
- Lance of Atrophy → Zombie → Full-Life mechanic: PASS (confirmed by EPUB reference).
- **FAIL — Zombie strategy fabricated**: Strategy includes "Zombie strategy: inflict Zombie on Seymour, then heal him with a Potion or Full-Life to deal heavy damage." `monsters.json` `seymour flux` `stat_resists.zombie: 100` — Seymour Flux is **fully immune to Zombie**. This strategy cannot work and should be removed. The EPUB reference does not mention inflicting Zombie on Seymour Flux either. This is fabricated content.
- Word count: 130. Within range.

**Fix required**: Remove the Zombie strategy sentence from seymour-flux. Replace with: remove the two sentences beginning "Zombie strategy: inflict Zombie on Seymour…"

---

### [mt-gagazet: sanctuary-keeper]
**FAIL — INCORRECT MECHANIC**

- HP: 40,000 in strategy. `monsters.json` `sanctuary keeper`: HP [40000, 6400]. MATCH.
- "Mana Breath drains MP" — correct mechanic. PASS.
- "Photon Spray hits the whole party for moderate damage" — EPUB reference calls this "Photon Wings" (inflicts sleep, silence, darkness, confusion), not a generic AoE. The JSON describes it as dealing "moderate damage" but the actual mechanic is the status infliction. **MINOR DISCREPANCY** — attack name and mechanic description differ from EPUB.
- **FAIL — Self-heal mechanic wrong**: Strategy states "when near death Sanctuary Keeper uses Esuna to cure its own Poison, making poison an unreliable finisher." EPUB reference states "When below half HP, may heal itself with **Curaga** — cast Reflect on it to redirect the Curaga back at it." The JSON attributes the self-heal to Esuna (curing Poison) while the EPUB reference (and actual game mechanic) is Curaga. Additionally, `monsters.json` shows `silence: 100` for Sanctuary Keeper (immune), but the JSON strategy correctly does not recommend Silencing it.
- Word count: 101. Within range.

**Fix required**: Replace "when near death Sanctuary Keeper uses Esuna to cure its own Poison, making poison an unreliable finisher — burst it down instead" with the correct mechanic: below half HP SK uses Curaga on itself — cast Reflect on it to redirect the Curaga back. Also correct "Photon Spray" to "Photon Wings" and note its status infliction effects (sleep, silence, darkness, confusion).

---

## via-purifico

### [via-purifico: isaaru-aeons]
**FAIL — FIGHT ORDER WRONG**

- All three aeon fights present (Pterya/Valefor, Grothia/Ifrit, Spathi/Bahamut). PASS for coverage.
- HP values in JSON: Pterya 12,000; Grothia 8,000; Spathi 20,000. `monsters.json` confirms: Pterya HP [12000], Grothia HP [8000], Spathi HP [20000]. Individual HP values are CORRECT.
- **FAIL — Fight order inverted for Fights 1 and 2**: JSON lists: Fight 1 = Pterya (Valefor, HP 12,000), Fight 2 = Grothia (Ifrit, HP 8,000). EPUB reference (via-purifico-reference.md) lists: Fight 1 = **Grothia** (Ifrit, HP 8,000), Fight 2 = **Pterya** (Valefor, HP 12,000). The actual in-game encounter order is Grothia → Pterya → Spathi. The JSON has the first two fights swapped.
- Grothia elemental weakness: JSON says "Weak to Ice." `monsters.json` `grothia` `elem_resists.fire: -1` (absorbs fire), `ice: 1` (neutral). **MINOR NOTE**: Grothia is Isaaru's Ifrit — it absorbs fire. It is NOT weak to Ice (ice resistance is 1, neutral). The EPUB reference says "Weakness: Ice" for Grothia, which appears to be a guide error. The strategy advice (use Shiva/Blizzara) is practical and results in neutral not resisted damage, so will still work, but "Weak to Ice" is technically inaccurate per `monsters.json`.
- Spathi countdown mechanic (use Shield when countdown hits zero): PASS. Confirmed by EPUB reference.
- Word count: 199. Within range.

**Fix required**: Swap Fight 1 and Fight 2 labels. Correct order: Fight 1 = Grothia (Ifrit, HP 8,000) → Fight 2 = Pterya (Valefor, HP 12,000) → Fight 3 = Spathi (Bahamut, HP 20,000). Optionally note Grothia absorbs fire (not weak to ice) though using ice is still safe.

---

### [via-purifico: evrae-altana]
**PASS**

- HP: strategy does not state HP explicitly but describes the two Phoenix Downs mechanic. EPUB reference gives HP 16,384 (not mentioned in strategy — acceptable since strategy focuses on tactics).
- Phoenix Down insta-kill mechanic: PASS. `monsters.json` `evrae altana` `stat_resists.zombie: "auto"` (has auto-Zombie), and holy weakness (`holy: 1.5`). Phoenix Downs kill undead/zombie enemies. PASS.
- Gate strategy trade-off (locking behind gates forfeits Avenger and Rematch chests): PASS. Confirmed by EPUB reference.
- Word count: 87. Within range.

---

## zanarkand-dome

### [zanarkand-dome: spectral-keeper]
**PASS**

- HP in strategy: 52,000. `monsters.json` `spectral keeper`: HP [52000, 8000]. MATCH.
- Steals listed: Ether, Turbo Ether. `monsters.json` steal_common: ether, steal_rare: turbo ether. MATCH.
- Six-platform grid mechanic explained: "fight takes place on six platforms arranged in a circle around the boss." PASS.
- Tera-Gravitation detonation mechanic: "Spectral Keeper's Tera-Gravitation places a detonation marker on the platform of the targeted character — that platform explodes at the end of the turn." EPUB reference confirms: "six platforms surrounding the boss; counterattacks hit the three platforms centered on the character who attacked." The JSON adds accurate detail about moving marked characters. PASS.
- Glyph Mines mechanic present: "Glyph Mines appear on random platforms and also explode after one turn." EPUB reference confirms. PASS.
- Berserk from tail attack: PASS. EPUB reference confirms Berserk from tail attack.
- Mental Break tip: JSON recommends Mental Break to "amplify Lulu's magic damage." `monsters.json` `stat_resists.mental_break: 0` (susceptible). PASS.
- Word count: 158. Within range.

---

### [zanarkand-dome: yunalesca]
**PASS**

- HP per form in strategy: "24k HP → 48k HP → 60k HP." EPUB reference: 1st form 24,000; 2nd form 48,000; 3rd form 60,000. MATCH. (`monsters.json` shows 132,000 total combined HP, consistent with 24k+48k+60k.)
- Phase 1 counter mechanic: "counters physical attacks with Darkness, spells with Silence, and special techniques with Sleep." EPUB reference confirms identical mechanic. PASS.
- Phase 2 Hellbiter/Zombie: PASS. EPUB reference confirms.
- Phase 3 Mega-Death: "Mega-Death instantly kills every non-Zombie character." EPUB reference confirms. PASS.
- Regen note: "cure any active Regen with Dispel (Regen will heal a Zombie character to death)." Correct game mechanic. PASS.
- Strategy recommends "bring in your strongest aeons and unload Overdrives" for Phase 3. EPUB reference confirms. PASS.
- Word count: 139. Within range.

---

## Summary

| Chapter | Boss | HP Match | Mechanics Accurate | Word Count | Result |
|---|---|---|---|---|---|
| airship-sin | sin-left-fin | PASS (65,000) | PASS | 139 — OK | PASS |
| airship-sin | sin-right-fin | PASS (65,000) | PASS | 74 — OK | PASS |
| airship-sin | sinspawn-genais | PASS (20,000) | PASS (note: Silence discrepancy vs game data) | 134 — OK | PASS WITH NOTE |
| airship-sin | sin-core | PASS (36,000) | PASS | 54 — OK | PASS |
| airship-sin | sin-head | PASS (140,000) | PASS — Giga-Graviton present | 135 — OK | PASS |
| mt-gagazet | biran-ronso | PASS (Varies) | PASS — Lancet/Mighty Guard correct | 145 — OK | PASS |
| mt-gagazet | seymour-flux | PASS (70,000) | FAIL — Zombie strategy fabricated (immune) | 130 — OK | FAIL |
| mt-gagazet | sanctuary-keeper | PASS (40,000) | FAIL — Esuna wrong (should be Curaga) | 101 — OK | FAIL |
| via-purifico | isaaru-aeons | PASS (all 3) | FAIL — Fight 1/2 order swapped | 199 — OK | FAIL |
| via-purifico | evrae-altana | N/A (not stated) | PASS | 87 — OK | PASS |
| zanarkand-dome | spectral-keeper | PASS (52,000) | PASS — 6-platform + Tera-Gravitation present | 158 — OK | PASS |
| zanarkand-dome | yunalesca | PASS (all 3 forms) | PASS | 139 — OK | PASS |

**Boss order check (airship-sin)**: PASS — JSON order matches EPUB sequence.

---

## Fixes Required (3 items)

### Fix 1 — `mt-gagazet`: seymour-flux — Remove fabricated Zombie strategy
**File**: `spira-guide/src/data/chapters/mt-gagazet.json`
Remove the sentence: "Zombie strategy: inflict Zombie on Seymour, then heal him with a Potion or Full-Life to deal heavy damage."
**Reason**: `monsters.json` `seymour flux` has `zombie: 100` (fully immune). Not in EPUB reference.

### Fix 2 — `mt-gagazet`: sanctuary-keeper — Correct self-heal mechanic from Esuna to Curaga
**File**: `spira-guide/src/data/chapters/mt-gagazet.json`
Replace: "when near death Sanctuary Keeper uses Esuna to cure its own Poison, making poison an unreliable finisher — burst it down instead"
With: "when below half HP Sanctuary Keeper uses Curaga on itself — cast Reflect on it to redirect the heal back as damage. It may also cast Reflect on itself; Dispel immediately if it does."
Also correct attack name "Photon Spray" → "Photon Wings" and note it inflicts sleep, silence, darkness, and confusion (not just "moderate damage").

### Fix 3 — `via-purifico`: isaaru-aeons — Correct fight order (swap Fight 1 and Fight 2)
**File**: `spira-guide/src/data/chapters/via-purifico.json`
The correct in-game order is: Fight 1 = Grothia (Ifrit, HP 8,000) → Fight 2 = Pterya (Valefor, HP 12,000) → Fight 3 = Spathi (Bahamut, HP 20,000). The JSON currently has Fight 1 and Fight 2 swapped.

---

## Notes for Future Passes

- **Sinspawn Genais / Silence**: The EPUB reference (BradyGames guide) and the JSON strategy both recommend Silencing Genais. However, `monsters.json` shows `silence: [100]` (immune). This conflict should be resolved in a future data reconciliation pass — either the game data source has an error, or the BradyGames guide was wrong. No JSON change recommended until confirmed.
- **Grothia / Ice weakness**: Both the EPUB reference and JSON strategy say Grothia is weak to Ice. `monsters.json` shows ice resistance of 1 (neutral) — Grothia absorbs fire but has no ice weakness. The Shiva/Blizzara tactic is still safe (neutral damage). Low priority to fix since the practical advice is correct.
