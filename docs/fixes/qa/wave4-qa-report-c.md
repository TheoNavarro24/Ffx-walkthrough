# Wave 4 QA Report C
Chapters: mt-gagazet, zanarkand-dome, via-purifico, bevelle, home
Date: 2026-04-06

---

## mt-gagazet

**JSON valid:** PASS — `python3 json.load` clean.

**ID prefix check:** MIXED — Items added in Wave 4 use `mt-gagazet-` prefix correctly. Pre-existing items from earlier waves use the shorter `gagazet-` prefix (e.g. `gagazet-primer-xxv`, `gagazet-fortune-sphere`, `gagazet-saturn-crest`). This is a pre-existing convention inconsistency, not introduced by Wave 4. No action needed unless a global ID rename is planned.

**Duplicate IDs:** PASS — None detected.

**Required items check:**
- `mt-gagazet-20000-gil` — PRESENT. Notes match EPUB: "Chest north of first ledge — climb snowy slope, travel south." PASS
- `mt-gagazet-braskas-sphere` — PRESENT. Notes correctly state "Short narrow path north around a large rock." PASS
- `mt-gagazet-defending-bracer` — PRESENT. Notes: "T-intersection — go straight (east)." PASS
- `mt-gagazet-hp-sphere` — PRESENT. Notes: "Descend slope after Wantz, look under path — first of two chests." PASS
- `mt-gagazet-lv4-key-sphere` — PRESENT. Notes: "Descend slope after Wantz, look under path — second of two chests." PASS

**Jecht Sphere #9 note (Braska's Sphere):** PASS — `mt-gagazet-braskas-sphere` notes field reads: "Short narrow path north around a large rock — counts as Jecht/Braska sphere #9 for Auron's Overdrive unlock." Correctly documents the Overdrive unlock context.

**EPUB spot-check:** All five required items verified against EPUB reference (pages 65–68). Location descriptions in `notes` field match EPUB prose. One minor discrepancy noted: EPUB reference says Biran uses White Wind near death and Yenke uses Mighty Guard; the `biran-ronso` boss strategy in the JSON has this reversed ("Use Lancet on Biran to learn Mighty Guard... Use Lancet on Yenke to learn White Wind"). The EPUB reference itself also appears inconsistent (reference file line 65 lists both from Biran, strategy section line 66 says "near death, Biran uses White Wind and Yenke uses Mighty Guard"). This is a pre-existing prose ambiguity, not a Wave 4 item addition issue. Flag for Wave 5 prose pass.

**VERDICT: PASS** (with pre-existing prefix inconsistency noted, not Wave 4 regression)

---

## zanarkand-dome

**JSON valid:** PASS — `python3 json.load` clean.

**ID prefix check:** PASS — All IDs use `zanarkand-dome-` prefix correctly.

**Duplicate IDs:** PASS — None detected.

**Required items check:**
- `zanarkand-dome-lv3-key-sphere` — PRESENT in "Zanarkand Dome Approach" sublocation. PASS
- `zanarkand-dome-magistral-rod` — PRESENT in "Zanarkand Dome Interior" sublocation, with note "(Destruction Sphere — return via airship, required for Anima)". PASS

**EPUB spot-check (pages 69–71):**
- Lv. 3 Key Sphere: EPUB says "When crossing the debris, look for a path leading down." Item is in the Approach sublocation — consistent with EPUB description of debris paths in dome approach. PASS
- Magistral Rod: EPUB confirms Destruction Sphere reward, return via airship required. `missable: false` is appropriate (not permanently missable — just requires airship return). PASS
- Sun Crest: Present with `missable: true`. PASS
- Note: EPUB lists steals from Yunalesca as Stamina Tablet / Farplane Wind; JSON `yunalesca` boss strategy does not list steals. Pre-existing omission, not Wave 4 scope.

**VERDICT: PASS**

---

## via-purifico

**JSON valid:** PASS — `python3 json.load` clean.

**ID prefix check:** ADVISORY — Item IDs use abbreviated `via-` prefix rather than full `via-purifico-` slug prefix. Exception: `via-purifico-rematch` uses the full slug. This inconsistency is pre-existing and not a Wave 4 regression.

**Duplicate IDs:** PASS — None detected.

**Required missable items check:**
- `via-avenger` — PRESENT, `missable: true`. PASS
- `via-purifico-rematch` (Rematch, Wakka's weapon) — PRESENT, `missable: true`. PASS

**Sublocation check:** "Via Purifico (Yuna's Path)" sublocation present. PASS

**EPUB spot-check (pages 58–60):**
- Avenger and Rematch missable warning: EPUB states "if you use the Trigger Command gate strategy to trap and defeat Evrae Altana in the final underwater chamber, the gates lock behind you and you lose access to the final two treasure chests." JSON `missables` array and `evrae-altana` boss strategy both document this correctly. PASS
- Yuna's path items (Mega-Potion, Wht Magic Sphere, Elixir, Blk Magic Sphere, Skill Sphere, Lucid Ring, 10,000 Gil): All present in "Via Purifico (Yuna's Path)" sublocation. PASS
- EPUB lists a Lucid Ring in Yuna's path; this item appears in via-purifico.json (`via-lucid-ring`) but is absent from bevelle.json's "Via Purifico (Yuna's Path)" sublocation. The Bevelle chapter's Via Purifico sublocation (which duplicates the same game area) is missing the Lucid Ring. Flag for cross-chapter consistency review — not a Wave 4 regression on via-purifico itself.

**VERDICT: PASS** (Lucid Ring absent from bevelle.json's VP subloc — flag for follow-up)

---

## bevelle

**JSON valid:** PASS — `python3 json.load` clean.

**ID prefix check:** PASS — All IDs use `bevelle-` prefix correctly.

**Duplicate IDs:** PASS — None detected.

**Item count:** 12 items total across 3 sublocations (1 in Priests' Passage, 5 in Cloister, 6 in Via Purifico). The QA brief states "9 items added" — the chapter has 12 items total; net additions per Wave 4 diff cannot be determined from current JSON alone, but all expected content is present.

**Via Purifico (Yuna's Path) sublocation:** PRESENT — confirmed as third sublocation with name "Via Purifico (Yuna's Path)". PASS

**Primer XXII duplication check:** PASS — `bevelle-primer-xxii` appears exactly once (in "Priests' Passage" sublocation). Not duplicated.

**EPUB spot-check (pages 55–58):**
- Al Bhed Primer Vol. XXII: Present with `missable: true`. PASS
- HP Sphere (Cloister): Present with `missable: true`, note warns to collect before stepping on floor switch. PASS
- Knight Lance (Cloister): Present with `missable: true`, note references 2 Bevelle Spheres requirement and Anima unlock. PASS
- Bevelle Sphere, Glyph Sphere, Destruction Sphere: All present as puzzle key items. PASS
- Via Purifico items (Mega-Potion, White Magic Sphere, Elixir, Blk Magic Sphere, Skill Sphere, 10,000 Gil): All present. PASS
- ADVISORY: The EPUB reference page 56 sidebar lists "Avenger" and "Rematch" as items in the Bevelle chapter area. However, these items are in the Via Purifico underwater channels (Tidus's section), not the maze (Yuna's section), and are correctly housed in via-purifico.json rather than bevelle.json. This is correct placement. The EPUB sidebar attribution is a guide layout quirk — the items appear in the chapter that continues into Via Purifico from Bevelle.
- ADVISORY: Lucid Ring is listed in the EPUB's page 58 map diagram for the Via Purifico maze area but is absent from bevelle.json's "Via Purifico (Yuna's Path)" sublocation. It is present in via-purifico.json. Since bevelle.json's VP subloc is a preview/bridge section, the omission is arguably acceptable, but creates a tracking gap if a player uses bevelle.json as their reference. Flag for follow-up.

**VERDICT: PASS** (Lucid Ring gap in VP subloc flagged; Avenger/Rematch placement confirmed correct)

---

## home

**JSON valid:** PASS — `python3 json.load` clean.

**ID prefix check:** PASS — All IDs use `home-` prefix correctly.

**Duplicate IDs:** PASS — None detected.

**Required items check:**
- `home-special-sphere` — PRESENT, `missable: true`, in "Home Interior" sublocation. Name: "Special Sphere (east living quarters — password chest)". PASS
- `home-skill-sphere` — PRESENT, `missable: true`, in "Home Interior" sublocation. Name: "Skill Sphere (east living quarters — quiz chest)". PASS

**Primer location check:**
- `home-primer-xix` — Location in JSON: "Home Exterior" sublocation, name says "near the dead body, left of entrance." EPUB reference: "Near the dead body outside Home entrance." PASS — consistent.
- `home-primer-xx` — Location in JSON: "Home Interior" sublocation, name says "south living quarters, on the bed." EPUB reference: "On the bed in the center area." Minor wording difference ("south living quarters" vs "center area") but refers to same in-game location. PASS
- `home-primer-xxi` — Location in JSON: "Home Interior" sublocation, name says "northeast corridor, on the floor." EPUB reference: "On the floor of the northeast airship corridor." PASS — consistent. Note: the EPUB reference places Primer XXI on the airship corridor section (post-evacuation), while the JSON sublocation is "Home Interior." The airship corridor sequence is technically part of the Home chapter's flow. Wording is accurate; sublocation label is acceptable.

**Missable flags summary for primers:**
- XVIII: `missable: true` — PASS
- XIX: `missable: true` — PASS
- XX: `missable: true` — PASS
- XXI: `missable: true` — PASS

**EPUB spot-check (pages 54–55):**
- Hi-Potion ×2 (dead body): Present as `home-hi-potion-x2`. PASS
- Al Bhed Potion ×4 (smoke): Present as `home-al-bhed-potion-smoke`. PASS
- Friend Sphere (vocabulary-test chest): Present as `home-friend-sphere`, `missable: false`. ADVISORY: EPUB notes this is "only accessible during this visit to Home" — arguably should be `missable: true`. Currently `false`. Flag for review; not a Wave 4 regression if this was pre-existing.
- Al Bhed Potion ×6 (north hall): Present as `home-6-al-bhed-potions`. PASS
- Lv. 4 Key Sphere (under stairs): Present as `home-lv4-key-sphere`, `missable: false`. PASS (EPUB lists it as easy to miss but not permanently missable in the same way as primers).
- Lv. 2 Key Sphere (far right, before Sanctum): Present as `home-lv2-key-sphere`, `missable: false`. ADVISORY: EPUB missable warnings list this as "Easy to overlook in the chaos" — could argue `missable: true`. Currently `false`. Pre-existing if so; not Wave 4 scope.
- 10,000 Gil (Sanctum chest): Present as `home-10000-gil`. PASS

**VERDICT: PASS** (Friend Sphere and Lv.2 Key Sphere missable flags advisory; not Wave 4 regressions)

---

## Summary

| Chapter | JSON Valid | No Duplicates | Required Items | Missable Flags | ID Prefixes | VERDICT |
|---|---|---|---|---|---|---|
| mt-gagazet | PASS | PASS | PASS (all 5) | PASS | ADVISORY (mixed prefix pre-existing) | **PASS** |
| zanarkand-dome | PASS | PASS | PASS (Lv.3 Key Sphere + Magistral Rod) | PASS | PASS | **PASS** |
| via-purifico | PASS | PASS | PASS | PASS (Avenger + Rematch missable=true) | ADVISORY (abbreviated prefix pre-existing) | **PASS** |
| bevelle | PASS | PASS | PASS (12 items, VP subloc present, XXII not duped) | PASS | PASS | **PASS** |
| home | PASS | PASS | PASS (Special Sphere + Skill Sphere missable=true) | PASS (XIX/XX/XXI correct locations) | PASS | **PASS** |

**All 5 chapters: PASS**

### Flags for Follow-up (not Wave 4 regressions)

1. **mt-gagazet** — Biran/Yenke White Wind vs Mighty Guard attribution is inconsistent in boss strategy prose vs EPUB reference. Wave 5 prose pass should reconcile.
2. **bevelle + via-purifico** — Lucid Ring is in via-purifico.json's "Via Purifico (Yuna's Path)" but absent from bevelle.json's same-named sublocation. Creates a tracking gap if user is on the Bevelle chapter. Consider adding a cross-reference note or duplicating the item with a note.
3. **home** — `home-friend-sphere` has `missable: false`; EPUB notes it is only accessible during the Home chapter visit. Consider setting `missable: true`.
4. **home** — `home-lv2-key-sphere` has `missable: false`; EPUB flags it as easy to miss in the chaos before Sanctum. Low priority.
5. **zanarkand-dome** — Yunalesca steal items (Stamina Tablet, Farplane Wind) not listed in boss strategy. Pre-existing omission.
