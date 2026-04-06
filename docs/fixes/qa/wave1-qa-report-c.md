# Wave 1 QA Report — Agent C

**Chapters:** home, calm-lands, airship, besaid
**Date:** 2026-04-06
**Agent:** Wave 1 QA Agent C

---

## home

**JSON parses without errors:** PASS — `python3 json.load()` returned no exceptions.

**Reference doc present:** PASS — `docs/fixes/wave0/home-reference.md` exists.

**`bosses` array is `[]` (empty):**
PASS — Line 37: `"bosses": []`. No boss entries of any kind.

**No "wendigo" entry exists:**
PASS — Grep for `wendigo` (case-insensitive) returned zero matches across the entire file.

**No unintended changes observed:** PASS — File contains expected subLocations (Home Exterior, Home Interior), four missable Primers, correct items list, and an empty `optionalAreas`. No extra fields, no stray entries.

---

## calm-lands

**JSON parses without errors:** PASS — `python3 json.load()` returned no exceptions.

**Reference doc present:** PASS — `docs/fixes/wave0/calm-lands-reference.md` exists.

**Defender-X strategy does NOT mention "Lancet" teaching "Mighty Guard":**
PASS — Grep for `Lancet` and `Mighty Guard` (case-insensitive) returned zero matches. The text "Lancet" does not appear anywhere in the file.

**Strategy contains "Armor Break followed by physical attacks works well":**
PASS — Exact phrase confirmed at line 25:
`"Uses Taunt to force all attacks onto one character. Armor Break followed by physical attacks works well. Provoke with Tidus to protect weaker characters. Very high HP but no threatening mechanics. HP: 64,000."`

**Strategy contains "Provoke with Tidus to protect weaker characters":**
PASS — Exact phrase confirmed at line 25 (same strategy string as above).

**No unintended changes observed:** PASS — Single subLocation (Calm Lands), correct missables list, correct items, `cloister: null`, `optionalAreas: []`. No extra fields.

---

## airship

**JSON parses without errors:** PASS — `python3 json.load()` returned no exceptions.

**Reference doc present:** PASS — `docs/fixes/wave0/airship-reference.md` exists.

**No item named "Master Sphere" or "Master Sphere ×2" in any `optionalAreas[*].items` array:**
PASS — Grep for `Master Sphere` (case-insensitive) returned zero matches across the entire file. All seven `optionalAreas` entries were scanned; no such item key or name appears.

**No unintended changes observed:** PASS — Seven optional areas present (Remiem Temple, Cavern of the Stolen Fayth, Baaj Temple, Omega Ruins, Cactuar Village, Monster Arena, Dark Aeons & Penance), Evrae boss entry intact, subLocations correct, `cloister: null`.

---

## besaid

**JSON parses without errors:** PASS — `python3 json.load()` returned no exceptions.

**Reference doc present:** PASS — `docs/fixes/wave0/besaid-reference.md` exists.

**`image_0029_00.jpeg` does NOT appear anywhere in the file:**
PASS — Grep for `image_0029_00` returned zero matches.

**`image_0027_00.jpeg` is still present (valid Besaid image, kept):**
PASS — Confirmed at line 11: `"guideImages": ["image_0027_00.jpeg"]` in the Beach subLocation.

**No unintended changes observed:** PASS — Three subLocations (Beach, Besaid Village, Besaid Temple) intact, Valefor boss entry present, `cloister: "besaid"`, `optionalAreas: []`, missables list correct.

---

## Summary

| Chapter | JSON Valid | Reference Doc | Specific Checks | Result |
|---|---|---|---|---|
| home | PASS | PASS | bosses=[], no wendigo | ALL PASS |
| calm-lands | PASS | PASS | no Lancet/Mighty Guard; required phrases present | ALL PASS |
| airship | PASS | PASS | no Master Sphere in optionalAreas | ALL PASS |
| besaid | PASS | PASS | no image_0029_00; image_0027_00 retained | ALL PASS |

All four chapters pass all Wave 1 QA checks. No unintended changes detected.
