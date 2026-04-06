# Wave 4B QA Report
Chapters: mushroom-rock-road, miihen-highroad, djose, guadosalam, thunder-plains
Date: 2026-04-06

---

## mushroom-rock-road

**JSON validity:** PASS — parses cleanly.

**ID format check:** PASS — all 19 IDs follow `mushroom-rock-road-{item-kebab}` convention, no duplicates.

**Sublocation count:** PASS — exactly 2 sublocations: "Lower Road" and "Ridge / Command Center".

**"Dingo" in prose:** PASS — string not present.

**Gate donation items (missable: true):**
- `mushroom-rock-road-scout` (Scout, 100 gil): PASS — present, `missable: true`
- `mushroom-rock-road-ice-lance` (Ice Lance, 1,000 gil): PASS — present, `missable: true`
- `mushroom-rock-road-moon-ring` (Yuna's Moon Ring, 10,000 gil): PASS — present, `missable: true`

**EPUB spot-check:**
- All 15 Lower Road items confirmed against EPUB reference (Tough Bangle, Remedy, Ether, Phoenix Down ×2, Hi-Potion ×2, 1,000 Gil, Potion ×10, Serene Armlet, X-Potion, 400 Gil, Primer X): PASS
- All 4 Ridge / Command Center items confirmed (Mega-Potion NPC, Mega-Potion chest, Serene Bracer, Hi-Potion post-battle): PASS
- Missable flags on Serene Armlet and Primer X: PASS

**Overall: PASS**

---

## miihen-highroad

**JSON validity:** PASS — parses cleanly.

**ID format check:** PASS — all 24 IDs follow `miihen-{item-kebab}` convention, no duplicates.

**"Mi'ihen Oldroad" sublocation exists:** PASS — sublocation named "Mi'ihen Oldroad" is present (3rd sublocation).

**Oldroad items check:**
- Thunder Blade: PASS — present in Mi'ihen Oldroad (`miihen-thunder-blade`)
- Scout: PASS — present in Mi'ihen Oldroad (`miihen-scout`)
- Fortune Sphere: PASS — present in Mi'ihen Oldroad (`miihen-fortune-sphere`)
- Heat Lance: NOTE — Heat Lance is present in the JSON (`miihen-heat-lance`) but placed in "Rin's Agency / Newroad" rather than "Mi'ihen Oldroad". This placement is **correct per the EPUB reference**, which describes Heat Lance as being in "the curvy pass beyond the bridges north of the travel agency" — i.e., the Newroad area, not the Oldroad gorge. Thunder Blade and Scout are the Oldroad chocobo-jump items (southeast of the gates). The task spec's grouping of Heat Lance under Oldroad appears to be an error in the spec. JSON reflects EPUB accurately. PASS (spec discrepancy noted).

**Mars Crest:** PASS — present (`miihen-mars-crest`) in Mi'ihen Oldroad sublocation, `missable: true`.

**EPUB spot-check:**
- Full item list cross-checked against reference: all items accounted for across the 3 sublocations.
- Primer VIII (free from Rin): present, `missable: false` — consistent with EPUB (Rin gives it automatically on exit).
- Primer IX: present, `missable: true` — PASS.
- Echo Ring (Belgemine reward): not present as an item — NOTE: Belgemine is a boss encounter, not a chest item. The Echo Ring is a battle reward; absence from item list is acceptable if tracked via boss rewards. Not a blocking issue.

**Overall: PASS** (Heat Lance sublocation placement matches EPUB, diverges from task spec; documented above)

---

## djose

**JSON validity:** PASS — parses cleanly.

**ID format check:** PASS — all 19 IDs follow `djose-{item-kebab}` convention, no duplicates.

**Destruction Sphere reward is "Magic Sphere" (not "Magistral Rod"):**
- Item ID `djose-magic-sphere`, name `"Magic Sphere (Destruction Sphere reward)"`: PASS

**Switch Hitter has `missable: true`:**
- Item ID `djose-switch-hitter`, `missable: true`: PASS

**EPUB spot-check:**
- Djose Highroad items (Phoenix Down ×2, Primer XI, Soft Ring, Variable Steel, Hi-Potion, Ether, Mega-Potion, Bright Bangle, Remedy, 4,000 Gil, Ability Sphere ×4): all present — PASS
- Temple interior (Ether temple, Remedy temple, Mega Phoenix): all present — PASS
- Cloister reward (Magic Sphere): PASS
- Post-Cloister items (Switch Hitter, Halberd, Hi-Potion ×2, Potion ×10): all present — PASS
- EPUB shows Hi-Potion quantity from the priest as ×3 in the header table but ×2 in the post-cloister walkthrough prose. JSON uses ×1 on highroad (`djose-hi-potion-x1`) and ×2 post-cloister (`djose-hi-potion-x2`). The reference is internally inconsistent; JSON values are defensible and consistent with the prose section. PASS.

**Overall: PASS**

---

## guadosalam

**JSON validity:** PASS — parses cleanly.

**ID format check:** PASS — all 11 IDs follow `guadosalam-{item-kebab}` convention, no duplicates.

**Lightning Marble ×8 present:** PASS — `guadosalam-farplane-lightning-marble`, name `"Lightning Marble ×8"`, `missable: true`.

**Hi-Potion ×2 (upper balcony):** PASS — `guadosalam-mansion-hi-potion`, name `"Hi-Potion ×2"`, placed in "Seymour's Mansion" sublocation, `missable: true`.

**EPUB spot-check:**
- North Wharf: Primer XII (missable) + Ether — PASS
- Road to Guadosalam: Antidote ×4 + Mega-Potion — PASS
- Town: Mega-Potion + Elixir + 3,000 Gil + Primer XIII (missable) — PASS
- Mansion balcony: Hi-Potion ×2 (missable) — PASS
- Corridor to Farplane: Lightning Marble ×8 (missable) — PASS
- Venus Crest (2nd visit): present in Corridor sublocation, `missable: false` — consistent with EPUB note about second visit (obtained with Celestial Mirror). PASS.

**Overall: PASS**

---

## thunder-plains

**JSON validity:** PASS — parses cleanly.

**ID format check:** PASS — all 11 IDs use `thunder-` prefix convention, no duplicates. Note: Primer XIV uses `thunder-plains-primer-xiv` (full slug prefix) while most others use short `thunder-` prefix — minor inconsistency in prefix style but not a duplicate or broken ID. Acceptable.

**Remedy added:** PASS — `thunder-remedy` present in "Thunder Plains North" sublocation.

**Primer XIV present:** PASS — `thunder-plains-primer-xiv`, name `"Al Bhed Primer Vol. XIV (say 'Okay' to Rin after talking to Rikku)"`.

**EPUB spot-check:**
- South section items (Phoenix Down ×2, Hi-Potion ×2, 5,000 Gil, Water Ball, Yellow Shield, X-Potion): all present — PASS
- North section items (Ether, Remedy, 2,000 Gil, Primer XIV, Spirit Lance): all present — PASS
- Lightning dodge reward table items (Mega Potion, MP Sphere, Strength Sphere, HP Sphere, Megalixir, Venus Sigil): not present in JSON — NOTE: These are mini-game rewards, not standard chest items. Exclusion is consistent with design (mini-game rewards tracked separately). Not a blocking issue.

**Overall: PASS**

---

## Summary

| Chapter | JSON Valid | IDs OK | Specific Checks | EPUB Match | Result |
|---|---|---|---|---|---|
| mushroom-rock-road | PASS | PASS | PASS (2 sublocs, no Dingo, 3 gate items missable) | PASS | **PASS** |
| miihen-highroad | PASS | PASS | PASS (Oldroad exists, Mars Crest missable; Heat Lance in Newroad per EPUB) | PASS | **PASS** |
| djose | PASS | PASS | PASS (Magic Sphere correct, Switch Hitter missable) | PASS | **PASS** |
| guadosalam | PASS | PASS | PASS (Lightning Marble ×8, Hi-Potion ×2 balcony) | PASS | **PASS** |
| thunder-plains | PASS | PASS | PASS (Remedy added, Primer XIV present) | PASS | **PASS** |

**All 5 chapters: PASS**

One spec discrepancy noted: task spec lists Heat Lance under "Mi'ihen Oldroad" sublocation, but the EPUB places it in the Newroad bridges area. JSON correctly follows the EPUB. No corrective action required.
