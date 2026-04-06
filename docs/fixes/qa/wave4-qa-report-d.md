# Wave 4 QA Report — D
**Chapters:** besaid, zanarkand, luca, kilika
**Date:** 2026-04-06
**Reviewer:** QA Agent

---

## Summary

All four chapters PASS. JSON is valid, item IDs follow the `{slug}-{item-kebab}` convention, no duplicate IDs were found, and all specific Wave 4 spot-checks are satisfied.

---

## Chapter: besaid

**JSON valid:** PASS
`python3 -c "import json; json.load(...)"` — no errors.

**ID convention (`besaid-{item-kebab}`):** PASS
All 14 item IDs across 4 subLocations are correctly prefixed.

**Duplicate IDs:** PASS
No duplicates across any subLocation.

**Sublocation "Besaid Port / Departure" exists:** PASS

**Items in "Besaid Port / Departure" — spot-check vs EPUB (page 29):**

| Required item | Present | ID | Name in JSON |
|---|---|---|---|
| Seeker's Ring | PASS | `besaid-seekers-ring` | Seeker's Ring |
| Ether | PASS | `besaid-ether` | Ether |
| Phoenix Down ×3 | PASS | `besaid-phoenix-down-x3` | Phoenix Down ×3 |
| Remedy | PASS | `besaid-remedy` | Remedy |
| 400 Gil | PASS | `besaid-400gil-docks` | 400 Gil |

All five required items are present with correct names and IDs. The 400 Gil item uses the disambiguating suffix `-docks` to avoid collision with the village `besaid-400gil` entry — correct.

**EPUB alignment:** PASS
Prose and items match the EPUB reference for pages 27–29. Al Bhed Primer Vol. II is in "Besaid Village" (`besaid-primer-ii`) as expected. Rod of Wisdom is in "Besaid Temple" (`besaid-rod-of-wisdom`, `missable: true`). Moon Crest is in "Beach" (`missable: true`).

**Overall: PASS**

---

## Chapter: zanarkand

**JSON valid:** PASS
`python3 -c "import json; json.load(...)"` — no errors.

**ID convention (`zanarkand-{item-kebab}`):** PASS
Single item `zanarkand-potion-x2`.

**Duplicate IDs:** PASS
No duplicates.

**Potion ×2 added — spot-check vs EPUB (page 23):**

| Required item | Present | ID | Name in JSON | missable |
|---|---|---|---|---|
| Potion ×2 | PASS | `zanarkand-potion-x2` | Potion ×2 | false |

EPUB reference confirms the two Potions are obtained by talking to the wandering woman on the bridge before the stadium (page 23). Item is correctly placed in the "Dream Zanarkand" subLocation, the only subLocation in this chapter.

**EPUB alignment:** PASS
The `missable: false` flag is acceptable — the EPUB reference notes the item is not explicitly labeled MISSABLE in the guide text. The prose correctly describes the dialogue trigger ("promising a ticket").

**Overall: PASS**

---

## Chapter: luca

**JSON valid:** PASS
`python3 -c "import json; json.load(...)"` — no errors.

**ID convention (`luca-{item-kebab}`):** PASS
All 10 item IDs correctly prefixed.

**Duplicate IDs:** PASS
No duplicates across 3 subLocations.

**1,000 Gil spot-check vs EPUB (page 35):**

| Required item | Present | ID | SubLocation | Name in JSON |
|---|---|---|---|---|
| 1,000 Gil | PASS | `luca-1000-gil` | Town Square | 1,000 Gil |

EPUB reference: "1000 gil — treasure chest at the top of the stairs on the right side of the town square." Prose matches. Correct subLocation.

**Strength Sphere spot-check vs EPUB (page 36):**

| Required item | Present | ID | SubLocation | Name in JSON |
|---|---|---|---|---|
| Strength Sphere | PASS | `luca-strength-sphere` | Luca Stadium | Strength Sphere (blitzball win reward) |

EPUB reference: "Strength Sphere — awarded only for winning the match vs. the Luca Goers." Correct.

**Oblitzerator crane wording:**

> "have Lulu cast Thunder on the crane (not the boss) **three times** to charge it. After the third Thunder hit, Tidus's Trigger Command becomes available"

Wording is "three times" — PASS. The phrase "each hit" does not appear anywhere in the strategy — PASS.

**EPUB alignment:** PASS
Dock items (600 Gil, Tidal Spear, Phoenix Down ×2, Magic Sphere, HP Sphere) all present. Both Al Bhed Primers (Vol. VI, Vol. VII) present. The reference marks both Primers as MISSABLE; the JSON sets both `missable: false` — this is a pre-existing condition outside Wave 4 scope and is noted here as an **observation** rather than a Wave 4 failure.

**Overall: PASS**

---

## Chapter: kilika

**JSON valid:** PASS
`python3 -c "import json; json.load(...)"` — no errors.

**ID convention (`kilika-{item-kebab}`):** PASS
All 11 item IDs correctly prefixed.

**Duplicate IDs:** PASS
No duplicates across 3 subLocations (11 unique IDs total).

**NulBlaze Shield spot-check vs EPUB (pages 30–33):**

| Required item | Present | ID | missable |
|---|---|---|---|
| NulBlaze Shield | PASS | `kilika-nulblaze-shield` | `true` |

Item is in the "Kilika Woods" subLocation with name "NulBlaze Shield (Crusaders sentry — only if Lord Ochu already defeated)" and `missable: true`. EPUB reference confirms: "NulBlaze Shield — Same blue-clad Crusaders sentry — only given if Lord Ochu has already been defeated — Conditional." The `missable: true` flag is appropriate; it is also listed in the chapter-level `missables` array.

**All Kilika IDs unique across all subLocations:** PASS
Checked across Kilika Port, Kilika Woods, and Kilika Temple — no ID collisions.

**EPUB alignment:** PASS
Port items (Ether, Al Bhed Primer Vol. IV, Potion ×3) match. Woods items (Mana Sphere ×2, Scout, Remedy, NulBlaze Shield, Luck Sphere, Hi-Potion, Elixir) all present. Temple item (Red Armlet, `missable: true`) present. Chapter-level `missables` array correctly lists both Red Armlet and NulBlaze Shield.

**Overall: PASS**

---

## Final Summary

| Chapter | JSON Valid | IDs Correct | No Duplicates | Specific Checks | EPUB Alignment | Result |
|---|---|---|---|---|---|---|
| besaid | PASS | PASS | PASS | PASS (all 5 port items) | PASS | **PASS** |
| zanarkand | PASS | PASS | PASS | PASS (Potion ×2 added) | PASS | **PASS** |
| luca | PASS | PASS | PASS | PASS (1,000 Gil, Strength Sphere, crane wording) | PASS | **PASS** |
| kilika | PASS | PASS | PASS | PASS (NulBlaze Shield, missable=true, no dupes) | PASS | **PASS** |

**Observation (out of scope for Wave 4):** In `luca.json`, Al Bhed Primers Vol. VI and Vol. VII have `missable: false` but the EPUB reference marks both as MISSABLE. This was not introduced by Wave 4 and should be addressed in a future wave.

No failures found. All Wave 4 requirements for these four chapters are satisfied.
