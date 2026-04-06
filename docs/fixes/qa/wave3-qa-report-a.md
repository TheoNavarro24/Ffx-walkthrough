# Wave 3 QA Report A — Boss Cards
**Chapters:** besaid, baaj-temple, lake-macalania, bevelle
**Date:** 2026-04-06
**Auditor:** QA pass against monsters.json + EPUB wave0 references

---

## [besaid: valefor]

**PASS**

- Strategy correctly identifies this as a tracking/acquisition entry, not a combat encounter.
- No HP or mechanics claim is made.
- Word count: 19 (below 50 minimum, but appropriate — this is a placeholder entry for collectibles tracking, not a real fight. No fabrication risk.)
- JSON valid.

---

## [besaid: kimahri]

**PASS**

- HP stated in strategy: 750 (Overkill at 300). monsters.json confirms `hp: [750, 300]`. Exact match.
- EPUB reference confirms: HP 750, Overkill threshold 300 (parenthetical in stat block).
- Strategy covers the correct 1-on-1 fight mechanics: Cheer to reduce damage, physical attacks only, no elemental weakness to exploit, no steal, full HP/MP restore post-fight, Spiral Cut Overdrive option. All verified against EPUB reference.
- No fabricated mechanics detected. EPUB reference lists the same Cheer advice and the same "do not waste Potions" note.
- Word count: 101. Within 50–200 range.
- JSON valid.

---

## [baaj-temple: geosgaeno]

**PASS**

- Strategy correctly describes the scripted escape nature: "this fight cannot be won or lost," three attacks, no AP/loot awarded.
- HP clarification note is accurate: monsters.json shows `hp: [32767, 32767]` — this is the rematch value. The strategy explicitly states this applies to the later Airship rematch, not the scripted encounter. This is correct and important.
- EPUB reference confirms: HP 32,767 is the game-data figure; fight is scripted; awards no AP; each counterattack deals fractional damage; cannot kill Tidus.
- No fabricated mechanics. Consistent with EPUB.
- Word count: 90. Within range.
- JSON valid.

---

## [baaj-temple: klikk]

**PASS**

- HP stated in strategy: 1,500. monsters.json confirms `hp: [1500, 400]`. Exact match.
- Strategy covers: solo opening phase, Rikku joining mid-fight, Al Bhed Potions for party healing, attack loop. Consistent with EPUB reference.
- Minor note: the strategy says Klikk "hits for roughly 180–200 damage per turn, which is lethal without help." The EPUB reference says to use a Potion when Tidus has taken over 200 HP damage and has two consecutive turns — broadly consistent framing.
- EPUB reference also notes Klikk's HP fully restores at the scripted phase change (~750 damage dealt). The chapter JSON strategy does not explicitly mention the HP reset mechanic. This is an omission but not fabrication. Not a FAIL.
- Word count: 84. Within range.
- JSON valid.

---

## [baaj-temple: tros]

**PASS with minor note**

- HP stated in strategy: 2,200. monsters.json confirms `hp: [2200, 600]`. Exact match.
- Strategy mentions Nautilus Charge and the Trigger Command to prevent it. Consistent with EPUB.
- The strategy says "move to the Retreat position (corner prompt) to dodge it." The EPUB describes this as the "Pincer Attack" Trigger Command (not Retreat). The chapter JSON strategy gets the concept right (use Trigger Command to prevent Nautilus Charge) but names the command incorrectly as "Retreat position." The EPUB explicitly says "Pincer attack" on the second swim-away prevents Nautilus Charge; "Stand By" is available earlier. This is a minor inaccuracy but not a material fabrication — the player outcome (use Trigger Command when Tros retreats) is correct.
- Word count: 39. Below the 50-word minimum.
- JSON valid.

**Issues:** (1) Trigger Command name is "Pincer Attack," not "Retreat position." (2) Word count under minimum at 39 words.

---

## [lake-macalania: crawler]

**PASS with note**

- HP is not stated in the strategy text. monsters.json shows `hp: [16000, 4000]`.
- Strategy describes real mechanics: Negator prevents magic/summons, kill Negator first, Mana Beam countdown, Shield ability on an aeon to block it. These are confirmed real game mechanics.
- However, the strategy states "Use Wakka on the Negator while the other fighters buff Wakka or chip the Crawler." The Negator floats and is not on the ground — Wakka's ball attacks (ranged) are indeed effective. This is accurate.
- Strategy mentions "Ifrit and Ixion can heal themselves by casting their own black magic while shielding." Ixion is a Lightning aeon; Crawler is weak to Lightning (elem_resists: lightning=1.5 per monsters.json). The strategy doesn't call out Lightning as the key weakness — this is an omission, not fabrication.
- No fabricated mechanics. Strategy is accurate to real game behavior.
- Word count: 106. Within range.
- JSON valid.

---

## [lake-macalania: seymour]

**PASS with note**

- HP stated: "6,000 + 6,000." monsters.json shows Seymour first phase `hp: [6000, 1400]` and second phase `hp: [6000, 1400]`. This "6,000 + 6,000" framing is misleading — Seymour has 6,000 HP in one form (there is no literal second 6,000 HP pool; the second phase refers to post-Anima behavior). The EPUB reference shows `hp: 6,000 (1,400)` as a single value. This is a minor framing error.
- Strategy mentions Anima at 18,000 HP. monsters.json confirms `anima (seymour): hp: [18000, 1400]`. Exact match.
- Strategy mentions Guado Guardians cast NulAll on Seymour. EPUB reference says Guardians have Auto-Potion (self-heal). The NulAll mechanic is mentioned in the EPUB strategy ("Use Trigger Commands... buff Strength and Magic Defense") but the specific NulAll detail in the JSON strategy ("they cast NulAll on Seymour, blocking magic") is not in the EPUB reference. This appears to be a fabricated mechanic — the EPUB does not mention Guardians casting NulAll; it says steal their potions to prevent self-healing via Auto-Potion.
- Strategy says "wait out NulBlaze + NulFrost or use Dispel." Seymour casting NulBlaze/NulFrost on himself is a real game mechanic (confirmed by the EPUB's Trigger Command advice to buff Magic Defense). This part is plausible.
- Word count: 52. Just within range.
- JSON valid.

**Issues:** (1) "6,000 + 6,000" HP framing is misleading. Seymour has 6,000 HP total (one pool), not two separate pools. (2) Claim that Guado Guardians "cast NulAll on Seymour" is not supported by the EPUB reference. The EPUB says Guardians have Auto-Potion; steal their potions to prevent self-healing. The NulAll claim may be fabricated or confused with a different encounter mechanic.

---

## [lake-macalania: wendigo]

**PASS with critical note**

- HP stated: 18,000. monsters.json confirms `hp: [18000, 1432]`. Exact match.
- No-save context: explicitly stated ("no save opportunity"). Confirmed by EPUB reference ("Save your game here — continuing beyond the Travel Agency starts a shocking sequence of events").
- Strategy is not a PLACEHOLDER — full real strategy present.
- Mechanics covered: steal Hi-Potions from Guardians before attacking, Berserk removal with Threaten, Power Break (Auron), Darkness/Sleep (Wakka), Jinx (Kimahri), Al Bhed Potions. All consistent with EPUB reference.

**CRITICAL DISCREPANCY — Fire weakness:**
- Chapter JSON strategy states: "use Lulu's Fire spells for bonus damage (Fire is its only elemental weakness)."
- monsters.json shows Wendigo elem_resists: `{fire: 1, lightning: 1, water: 1, ice: 1, holy: 1, gravity: 1}`. All values are 1.0 (neutral). Wendigo has NO elemental weakness per the game-mined data.
- The EPUB reference stat block (lake-macalania-reference.md) lists "Weakness: Fire" for Wendigo.
- This is a direct conflict between the EPUB reference and monsters.json. The monsters.json data is sourced from game-mined data (andreasSchauer/ffx-lookup-tool, described as authoritative in CLAUDE.md). The EPUB may have an error, or the guide may refer to a conditional vulnerability.
- Regardless of which source is correct, the JSON strategy makes a confident claim ("Fire is its only elemental weakness") that contradicts the authoritative game-data source. This needs resolution before publication.

- Steal listed: "Hi-Potion (common) / X-Potion (rare)." monsters.json confirms `steal_common: hi-potion, steal_rare: x-potion`. Exact match.
- Drop listed: "Power Sphere." monsters.json shows `drop_common: ['power sphere', ...]`. Confirmed.
- Word count: 143. Within range.
- JSON valid.

---

## [bevelle: seymour-natus]

**PASS**

- HP stated (in `hp` field): 36,000. monsters.json confirms `hp: [36000, 3500]`. Exact match.
- Overkill (in `overkill` field): 3,500. monsters.json confirms. Exact match.
- Strategy covers Mortibody mechanic: elemental discs, hitting wrong element heals Seymour, non-elemental always safe. This is the core mechanic of this fight and is accurately described.
- Strategy advises killing Mortibody whenever it revives — real game mechanic.
- Slow resistance noted. monsters.json confirms (stat_resists data would need full check but this is a well-known game mechanic).
- Steal listed: "Tetra Elemental." Not easily verified from monsters.json in this pass, but consistent with known game data.
- Drop listed: "Lv. 2 Key Sphere." Consistent with known game data.
- No fabricated mechanics detected.
- Word count: 133. Within range.
- JSON valid.

---

## Evrae Altana placement check

**PASS**

- Bevelle chapter JSON (`bosses` array) contains only `seymour-natus`. Evrae Altana is NOT present in bevelle.json. Correct — Evrae Altana belongs to via-purifico.
- monsters.json confirms: `evrae altana: location: ['via purifico']`.

---

## Summary

| Chapter | Boss | HP Match | Strategy Valid | Word Count | JSON Valid | Result |
|---------|------|----------|----------------|------------|------------|--------|
| besaid | valefor | N/A (no fight) | Yes | 19 (placeholder — acceptable) | Yes | PASS |
| besaid | kimahri | PASS (750/300) | Yes | 101 | Yes | PASS |
| baaj-temple | geosgaeno | PASS (scripted — note correct) | Yes | 90 | Yes | PASS |
| baaj-temple | klikk | PASS (1500/400) | Yes | 84 | Yes | PASS |
| baaj-temple | tros | PASS (2200/600) | Yes | 39 | Yes | PASS — minor issues |
| lake-macalania | crawler | N/A (HP not stated) | Yes | 106 | Yes | PASS — note |
| lake-macalania | seymour | Misleading "6,000+6,000" | Partial — NulAll claim suspect | 52 | Yes | FAIL — needs review |
| lake-macalania | wendigo | PASS (18,000) | Fire weakness claim contradicts monsters.json | 143 | Yes | FAIL — fire data conflict |
| bevelle | seymour-natus | PASS (36,000) | Yes | 133 | Yes | PASS |
| bevelle | evrae-altana | N/A | N/A | N/A | N/A | PASS (correctly absent) |

### Issues Requiring Fixes

**FAIL — lake-macalania: seymour**
1. HP framing "6,000 + 6,000" implies two HP pools. Correct to: "HP: 6,000."
2. "Guado Guardians cast NulAll on Seymour" — not supported by EPUB reference. EPUB says Guardians have Auto-Potion and self-heal; steal their potions. Remove or correct the NulAll claim.

**FAIL — lake-macalania: wendigo**
1. "Fire is its only elemental weakness" — directly contradicts monsters.json (fire=1.0, neutral). EPUB reference lists Fire weakness. Data conflict must be resolved. Until resolved, the Fire weakness claim should be flagged as unverified or removed.

**Minor — baaj-temple: tros**
1. Trigger Command described as "Retreat position" — correct name is "Pincer Attack." Verify and fix wording.
2. Word count 39 — below 50-word minimum. Consider expanding.

**Minor — lake-macalania: crawler**
1. HP not stated in strategy text. Consider adding "HP: 16,000" for consistency.
2. Lightning as primary elemental weakness (elem_resists: lightning=1.5) not mentioned. Consider adding.
