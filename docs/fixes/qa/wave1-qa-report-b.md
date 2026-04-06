# Wave 1 QA Report — Agent B

**Chapters:** lake-macalania, bikanel-desert, ss-winno, djose
**Date:** 2026-04-06
**QA agent:** Wave 1 QA (Agent B)

---

## lake-macalania

### 1. Primer is "Al Bhed Primer Vol. XVI" with id "lake-macalania-primer-xvi"

**PASS.**
`subLocations[0].items` contains exactly one primer entry:
- `"id": "lake-macalania-primer-xvi"`
- `"name": "Al Bhed Primer Vol. XVI"`
- `"icon": "primer"`

Both the id and display name match the required values. The item is in the "Lake Macalania" subLocation (Travel Agency area), consistent with the chapter boundary note in the reference doc (EPUB page 49 partial, Travel Agency/Clasko encounter belongs to this chapter). Agent A's macalania-woods QA report corroborates this placement: "Vol. XVI as the Travel Agency/Clasko item belonging to the Lake Macalania area."

Note on reference doc discrepancy: The `lake-macalania-reference.md` has a trailing "Al Bhed Primers" section that says "None in the lake-macalania chapter itself" — this contradicts the fix spec but the fix spec takes precedence. The item has been correctly placed here per wave-1 requirements.

### 2. `image_0053_00.jpeg` does not appear anywhere

**PASS.**
Full raw text search of `lake-macalania.json` confirms zero occurrences of `image_0053_00`. The `guideImages` arrays across both subLocations are:
- "Lake Macalania": `[]`
- "Macalania Temple": `["image_0051_00.jpeg", "image_0051_01.jpeg"]`

These two images (EPUB page 51) are correct for this chapter per the reference doc's "Guide Images" section and the image audit (Section A, both flagged OK).

### 3. `bosses` array contains a "wendigo" entry

**PASS.**
`bosses` array contains three entries with slugs: `["crawler", "seymour", "wendigo"]`.
The wendigo entry is present with a strategy string that notes HP (18,000), Fire weakness, and a PLACEHOLDER tag pending Wave 3 full strategy — all consistent with the fix spec.

### 4. JSON parses without errors

**PASS.** `json.load()` on the file raised no exceptions.

### 5. No unintended changes

**PASS.** Structure is as expected: two subLocations ("Lake Macalania", "Macalania Temple"), three bosses (crawler, seymour, wendigo), `cloister: "macalania"`, `optionalAreas: []`, `oaka: null`, `sgTip: null`, full seven-member party. No extra fields added or removed.

---

## bikanel-desert

### 1. No primer named "Vol. XVI" remains

**PASS.**
All primer items in the file:
- `"id": "bikanel-desert-primer-xvii"`, `"name": "Al Bhed Primer Vol. XVII"`
- `"id": "bikanel-desert-primer-xviii"`, `"name": "Al Bhed Primer Vol. XVIII"`

No entry with "XVI" or "16" appears anywhere in the file. The erroneous Vol. XVI has been removed.

### 2. Two primers exist: Vol. XVII (id: bikanel-desert-primer-xvii) and Vol. XVIII (id: bikanel-desert-primer-xviii)

**PASS.**
Exactly two primer items are present:
- Sanubia Desert West: `"id": "bikanel-desert-primer-xvii"`, `"name": "Al Bhed Primer Vol. XVII"` — matches reference doc (inside a building to the north, west fork area).
- Sanubia Desert East: `"id": "bikanel-desert-primer-xviii"`, `"name": "Al Bhed Primer Vol. XVIII"` — matches reference doc (east fork).

Both ids and names match the required values exactly.

### 3. `image_0052_00.jpeg` and `image_0053_00.jpeg` are still present

**PASS.**
- `subLocations[0].guideImages` ("Sanubia Desert West"): `["image_0052_00.jpeg"]` — present.
- `subLocations[1].guideImages` ("Sanubia Desert East"): `["image_0053_00.jpeg"]` — present.

Both images are legitimately assigned here per the image audit (Section A: both flag EPUB pages 52 and 53 as Bikanel Desert content).

### 4. JSON parses without errors

**PASS.** `json.load()` on the file raised no exceptions.

### 5. No unintended changes

**PASS.** Structure is two subLocations with correct items (Vol. XVII, Mercury Crest in West; Vol. XVIII in East), `bosses: []`, `cloister: null`, `optionalAreas: []`, three-member party `["Tidus", "Wakka", "Rikku"]`, `oaka: null`.

---

## ss-winno

### 1. No "Jecht Sphere" items in items array

**PASS.**
All items across subLocations:
- `"id": "winno-hi-potion-1"`, `"name": "Hi-Potion"`
- `"id": "winno-primer-v"`, `"name": "Al Bhed Primer Vol. V"`

No entry with "Jecht" in name, id, or icon field. Zero Jecht Sphere items exist in the file.

### 2. "Auron" is NOT in the party array

**PASS.**
`"party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"]` — five members, no "Auron". Correct: Auron is not a playable party member at this point in the story (he is not available until after Luca).

### 3. party is ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"]

**PASS.**
Party array matches exactly: `["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri"]`.

### 4. `image_0034_00.jpeg` and `image_0035_00.jpeg` are absent

**PASS.**
Full raw text search of `ss-winno.json` confirms zero occurrences of either `image_0034_00` or `image_0035_00`. The only `guideImages` array in the file is `[]` (empty) — the erroneous Luca-origin images (EPUB pages 34-35) have been removed. This is correct: per the image audit (Section B), both images are EPUB page 34-35 Luca content incorrectly assigned as placeholders to ss-winno. The S.S. Winno has no dedicated guide screenshots.

### 5. No fabricated content about Bushido Dragon Fang or passing drills in prose

**PASS.**
The single prose field (S.S. Winno subLocation) contains no occurrence of "Bushido", "Dragon Fang", or "passing drills". The prose correctly describes the Hi-Potion, Primer Vol. V, O'aka donation, and the Jecht Shot mini-game. Content matches the reference doc.

### 6. JSON parses without errors

**PASS.** `json.load()` on the file raised no exceptions.

### 7. No unintended changes

**PASS.** Structure is one subLocation ("S.S. Winno") with two items, `bosses: []`, `cloister: null`, `optionalAreas: []`, correct five-member party, `oaka: { "meeting": true, "cumulativeTarget": 1001 }`, `sgTip: null`.

---

## djose

### 1. `image_0044_00.jpeg` does not appear anywhere

**PASS.**
Full raw text search of `djose.json` confirms zero occurrences of `image_0044_00`. The `guideImages` arrays across both subLocations are:
- "Djose Highroad": `["image_0042_00.jpeg"]`
- "Djose Temple": `[]`

`image_0042_00.jpeg` (EPUB page 42) is the correct image for this chapter per the image audit (Section A, flagged OK). The removal of `image_0044_00.jpeg` is correct: per the image audit (Section A), this image is flagged MISMATCH for djose because EPUB page 44 has Moonflow content — it has been correctly reassigned to moonflow (confirmed by Agent A's moonflow QA: `guideImages: ["image_0044_00.jpeg"]`).

### 2. JSON parses without errors

**PASS.** `json.load()` on the file raised no exceptions.

### 3. No unintended changes

**PASS.** Structure is two subLocations ("Djose Highroad", "Djose Temple") with correct items (7 highroad items + Magistral Rod), `bosses: []`, `cloister: "djose"`, `optionalAreas: []`, full seven-member party, `oaka: { "meeting": true, "cumulativeTarget": 10001 }`, `sgTip` intact.

---

## Summary

| Chapter | Check | Result |
|---|---|---|
| lake-macalania | Primer id = "lake-macalania-primer-xvi" | PASS |
| lake-macalania | Primer name = "Al Bhed Primer Vol. XVI" | PASS |
| lake-macalania | image_0053_00.jpeg absent | PASS |
| lake-macalania | "wendigo" boss entry present | PASS |
| lake-macalania | JSON valid | PASS |
| lake-macalania | No unintended changes | PASS |
| bikanel-desert | No Vol. XVI primer remains | PASS |
| bikanel-desert | Vol. XVII present (id: bikanel-desert-primer-xvii) | PASS |
| bikanel-desert | Vol. XVIII present (id: bikanel-desert-primer-xviii) | PASS |
| bikanel-desert | image_0052_00.jpeg still present | PASS |
| bikanel-desert | image_0053_00.jpeg still present | PASS |
| bikanel-desert | JSON valid | PASS |
| bikanel-desert | No unintended changes | PASS |
| ss-winno | No Jecht Sphere items | PASS |
| ss-winno | Auron not in party | PASS |
| ss-winno | party = [Tidus, Wakka, Yuna, Lulu, Kimahri] | PASS |
| ss-winno | image_0034_00.jpeg absent | PASS |
| ss-winno | image_0035_00.jpeg absent | PASS |
| ss-winno | No Bushido/Dragon Fang/passing drills prose | PASS |
| ss-winno | JSON valid | PASS |
| ss-winno | No unintended changes | PASS |
| djose | image_0044_00.jpeg absent | PASS |
| djose | JSON valid | PASS |
| djose | No unintended changes | PASS |

**All checks passed. No failures detected.**
