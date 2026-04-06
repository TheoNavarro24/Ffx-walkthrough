# Wave 1 QA Report — Agent A
**Chapters:** moonflow, guadosalam, thunder-plains, macalania-woods
**Date:** 2026-04-06
**QA agent:** Wave 1 QA (Agent A)

---

## moonflow

### 1. Primer volume number
**PASS.**
Reference doc (`docs/fixes/wave0/moonflow-reference.md`, Al Bhed Primers table) confirms the correct volume is **Vol. XII**, found at the platform above O'aka at the North Wharf.
JSON item: `"id": "moonflow-primer-xii"`, `"name": "Al Bhed Primer Vol. XII"`. Both id and display name match.

### 2. guideImages contents
**PASS.**
`subLocations[0].guideImages` is `["image_0044_00.jpeg"]` — exactly one image, no other entries.
Specifically absent: `image_0046_00.jpeg`, `image_0048_00.jpeg`, `image_0049_00.jpeg` (all three were flagged as errors in `1d-image-audit.md`, Section B: wrong-chapter assignments originating from EPUB pages 46/48/49).
`image_0044_00.jpeg` (EPUB page 44, Moonflow/Djose boundary) is a legitimate assignment per the image audit (audit flags it as a boundary-page case, not an error).

### 3. JSON validity
**PASS.** File parses without errors.

### 4. No unintended changes
**PASS.** Structure is a single subLocation ("Moonflow South Bank") with 7 items including the corrected primer, one boss (Extractor), no cloister, no optionalAreas. No fields appear added, removed, or altered beyond the scope of the fix.

---

## guadosalam

### 1. Primer volume number
**PASS.**
Reference doc (`docs/fixes/wave0/guadosalam-reference.md`, Al Bhed Primers table) confirms the correct volume is **Vol. XIII**, in the room west of the large red doors.
JSON item: `"id": "guadosalam-primer-xiii"`, `"name": "Al Bhed Primer Vol. XIII"`. Both match.

### 2. oaka field
**PASS.**
`"oaka": { "meeting": true, "cumulativeTarget": 10001 }` — field is present and non-null.
The reference doc notes: "If you have donated 10,001+ Gil total to O'aka across the journey, his prices are now significantly discounted." This value is correct.

### 3. image_0046_00.jpeg absent from guideImages
**PASS.**
`subLocations[0].guideImages` is `[]` (empty array). `image_0046_00.jpeg` does not appear anywhere in the file. Correct: per the image audit (Section B), this image belongs to EPUB page 46 (Guadosalam content) and its erroneous assignment was to moonflow, not guadosalam. Guadosalam having an empty guideImages array is valid — no guadosalam-specific non-duplicated image is available.

### 4. JSON validity
**PASS.** File parses without errors.

### 5. No unintended changes
**PASS.** Structure is one subLocation ("Guadosalam") with 3 items (primer-xiii, 3000-gil, venus-crest), no bosses, no cloister, no optionalAreas. No additional fields appear modified.

---

## thunder-plains

### 1. Primer volume number
**PASS.**
Reference doc (`docs/fixes/wave0/thunder-plains-reference.md`, Al Bhed Primers section) confirms the correct volume is **Vol. XIV**, obtained by speaking to Rin at the Travel Agency after first speaking to Rikku.
JSON item: `"id": "thunder-plains-primer-xiv"`, `"name": "Al Bhed Primer Vol. XIV (say 'Okay' to Rin after talking to Rikku)"`. Both id and display name confirm Vol. XIV.

### 2. image_0052_00.jpeg absent from guideImages
**PASS.**
"Thunder Plains South" has `"guideImages": ["image_0047_00.jpeg"]` — `image_0052_00.jpeg` is absent.
"Thunder Plains North" has `"guideImages": []` — `image_0052_00.jpeg` is absent.
No occurrence of `image_0052_00.jpeg` anywhere in the file. Correct: per the image audit (Section B), this image originates from EPUB page 52 (Bikanel Desert), not Thunder Plains content.

### 3. JSON validity
**PASS.** File parses without errors.

### 4. No unintended changes
**PASS.** Structure is two subLocations ("Thunder Plains South" and "Thunder Plains North") with 6 and 4 items respectively, no bosses, no cloister, no optionalAreas. Fields beyond guideImages appear unchanged from expected state.

---

## macalania-woods

### 1. Primer volume number
**PASS.**
Reference doc (`docs/fixes/wave0/macalania-woods-reference.md`, Al Bhed Primers section) confirms the correct volume for the mid-woods ground item (near O'aka) is **Vol. XV**.
JSON item: `"id": "macalania-woods-primer-xv"`, `"name": "Al Bhed Primer Vol. XV"`. Both id and display name confirm Vol. XV (corrected from the prior erroneous Vol. XIV).

Note: the prose field mentions "Primer XVI" in the context of Clasko and the Lake Macalania Travel Agency — this is a reference to the next chapter's primer (Vol. XVI), not an item in this chapter's items array. The reference is informational prose only and does not create a second primer item in macalania-woods. This is consistent with the reference doc which lists Vol. XV as the woods item and Vol. XVI as the Travel Agency/Clasko item belonging to the Lake Macalania area.

### 2. No other items added or removed
**PASS.**
`subLocations[0].items` contains exactly one entry: `"id": "macalania-woods-primer-xv"`. The items array has not grown or shrunk; only the id and name of the existing primer entry were updated.

### 3. JSON validity
**PASS.** File parses without errors.

### 4. No unintended changes
**PASS.** Structure is one subLocation ("Macalania Woods") with 1 item (the primer), two bosses (spherimorph), no cloister, no optionalAreas. `guideImages` contains `["image_0048_00.jpeg", "image_0048_01.jpeg", "image_0049_00.jpeg"]` — these are correct Macalania Woods images (EPUB pages 48-49) and were not within the scope of wave 1 fixes for this chapter.

---

## Summary

| Chapter | Primer ID | Primer Name | Images | oaka | JSON Valid | No Extra Changes |
|---|---|---|---|---|---|---|
| moonflow | PASS | PASS | PASS (only 0044) | N/A | PASS | PASS |
| guadosalam | PASS | PASS | PASS (0046 absent) | PASS | PASS | PASS |
| thunder-plains | PASS | PASS | PASS (0052 absent) | N/A | PASS | PASS |
| macalania-woods | PASS | PASS | N/A | N/A | PASS | PASS |

**All checks passed. No failures detected.**
