# Wave 2 Audit: Thunder Plains, Macalania Woods, Lake Macalania

**Agent**: 2e
**Date**: 2026-04-06
**EPUB Pages**: 46 (partial), 47, 48, 49 (partial), 50, 51
**Chapters Audited**: thunder-plains, macalania-woods, lake-macalania

---

## Thunder Plains (slug: `thunder-plains`)
**EPUB Pages**: 46 (partial), 47
**Overall Health**: NEEDS WORK

### Findings

1. **HIGH [C. Missing Items]** The EPUB item map on page 46 lists a **Remedy** among the Thunder Plains treasures. The app has no Remedy in either sublocation. EPUB evidence: the page 46 item list includes `REMEDY` alongside the other Thunder Plains chest contents.

2. **HIGH [F. Missable Warnings]** Al Bhed Primer Vol. XIV is obtained by talking to Rin at the Travel Agency and choosing the affirmative response. If the player rushes through without speaking to Rin, they miss it permanently. The app's `missables` array is empty (`[]`), and the item is not flagged as `"missable": true`. The prose does describe how to get it, but there is no red-banner missable warning. The EPUB says: *"Speak to Rin and he asks how your study of Al Bhed is coming along. Choose the top option, and he hands over Al Bhed Primer vol. XIV."*

3. **HIGH [C. Missing Items]** The Primer in Thunder Plains North is mislabeled as **"Al Bhed Primer Vol. XIII"** (id: `thunder-primer-xiii`). The correct number is **Vol. XIV**, as stated in the EPUB page 47: *"he hands over Al Bhed Primer vol. XIV"*. Vol. XIII is actually found in Guadosalam.

4. **MEDIUM [B. Prose Quality]** The prose for Thunder Plains South (66 words) is adequate but thin. It incorrectly states *"Lightning strikes here can interrupt any battle"* -- the EPUB clarifies that lightning *"doesn't actually damage your party"* (page 47). The EPUB's advice is the opposite: *"While the lightning is annoying, it doesn't actually damage your party, so don't let it stop you from exploring the area."* The app's claim about interrupting battles is inaccurate.

5. **MEDIUM [E. Missing Tips]** The EPUB's lightning dodge prize table (page 47) lists prizes for 5, 10, 20, 50, 100, 150, and 200 consecutive dodges, culminating in the Venus Sigil and Lightning Dancer trophy. The app prose mentions the challenge briefly but does not include the prize table. This is useful reference content.

6. **MEDIUM [E. Missing Tips]** The EPUB describes the Qactuar Stones mini-quest in detail (page 47): *"Glowing stones engraved with Qactuars are situated throughout the Thunder Plains... After activating the third stone, a Qactuar ghost appears and leads you to a damaged lightning tower."* It warns that activating stones spawns Qactuar enemies whose *"1,000 Needles attack deals exactly 1,000 points of damage, potentially killing weaker characters outright"* and recommends *"piercing weapons or have Rikku use items like Lightning Marbles."* The app's prose mentions the stones briefly but omits the danger warning and combat advice.

7. **MEDIUM [E. Missing Tips]** The EPUB notes that Ixion is an excellent summon here because it *"absorbs lightning damage"* making it *"basically immortal against many of the area's enemies"* (page 47). The app does not mention this party/aeon tip.

8. **MEDIUM [E. Missing Tips]** The EPUB mentions that the Travel Agency employee (Rin's assistant) is a *"recruitable blitzball player"* (page 47). Not mentioned in app.

9. **MEDIUM [G. Image Assessment]** Per the 1d image audit, `image_0052_00.jpeg` assigned to Thunder Plains North is actually from **EPUB page 52 (Bikanel Desert)**. This is a confirmed wrong-chapter image. The only correctly assigned Thunder Plains image is `image_0047_00.jpeg`.

10. **LOW [A. Sublocation Completeness]** The EPUB treats Thunder Plains as three logical areas: Southern Plains, Travel Agency (mid-section), and Northern Plains. The app splits into South and North, folding the Travel Agency into North. This is an acceptable simplification, though the Travel Agency could warrant its own sublocation given the Rin conversation, Rikku scene, prize chest, Yellow Shield (found outside the Agency), and the Qactuar quest book inside.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | ACCEPTABLE | 0 critical (1 minor: Travel Agency merged into North) |
| B. Prose Quality | 3/5 | 1 (inaccurate lightning damage claim) |
| C. Missing Items | -- | 2 (Remedy missing; Primer mislabeled as XIII instead of XIV) |
| D. Boss Strategy | N/A | 0 (no bosses in this chapter) |
| E. Missing Tips | -- | 4 (dodge prizes, Qactuar danger, Ixion tip, blitzball recruit) |
| F. Missable Warnings | -- | 1 (Primer XIV not flagged as missable) |
| G. Image Assessment | -- | 1 (image_0052_00 is from Bikanel Desert, not Thunder Plains) |

---

## Macalania Woods (slug: `macalania-woods`)
**EPUB Pages**: 48, 49 (partial)
**Overall Health**: NEEDS WORK

### Findings

1. **CRITICAL [C. Missing Items]** The app has only **1 item** (Al Bhed Primer Vol. XIV -- which is also the WRONG number). The EPUB lists at least the following Macalania Woods items on page 48's map and walkthrough prose: Sleepy Cait Sith, Remedy (x3), 400 Gil, Elixir, 2000 Gil, Mega-Potion, Hi-Potion (x2), Phoenix Down (x3), Lv. 1 Key Sphere, MP Sphere (butterfly chase reward), Ether (butterfly chase reward), Jecht's Sphere (after Spherimorph), and Al Bhed Primer vol. XV. Nearly all items are missing from the app.

2. **HIGH [C. Missing Items]** The single Primer in the app is labeled **"Al Bhed Primer Vol. XIV"** (id: `mac-woods-primer-xiv`). This is **wrong** -- Primer XIV is in Thunder Plains (from Rin). The Macalania Woods Primer is **Vol. XV**, found on the ground across from O'aka. EPUB page 48: *"On the ground across from O'aka, look for the Al Bhed Primer vol. XV."*

3. **HIGH [C. Missing Items]** Al Bhed Primer Vol. XVI is mentioned in the EPUB as found with Clasko near the Travel Agency at the end of the woods section (page 49): *"The party finds Clasko and the Al Bhed Primer vol. XVI outside of another Travel Agency."* This Primer is not in the macalania-woods JSON at all. (It appears in lake-macalania's JSON as "Al Bhed Primer Vol. XV" -- also mislabeled; see lake-macalania findings.)

4. **HIGH [C. Missing Items]** Jecht's Sphere is obtained after defeating Spherimorph. EPUB page 49: *"The Spherimorph leaves behind a memento from Tidus's old man, Jecht's Sphere... Upon examining this one, Auron learns a new Overdrive, Shooting Star."* This is not listed as an item in the app.

5. **HIGH [E. Missing Tips]** The EPUB describes the butterfly chase mini-game in detail (pages 48-49), explaining that it has three tiers of difficulty with escalating prizes: first visit yields MP Sphere and Ether; after Spherimorph yields Elixirs and Megalixirs; after getting the airship yields a Teleport Sphere and the **Saturn Sigil** (celestial weapon component). The app prose mentions butterfly chases only in passing. EPUB: *"If you return after defeating the Spherimorph, the butterfly chase begins anew, with a higher level of challenge and new prizes... Return to Macalania again after getting the airship, and you can play the final and most challenging version of the butterfly chase for a Teleport Sphere and the Saturn Sigil."*

6. **MEDIUM [D. Boss Strategy]** Spherimorph strategy (109 words) is decent and captures the core mechanic well, but is missing key details:
   - **HP not mentioned**: 12,000 per 1c reference.
   - **Steal not mentioned**: Common steal is Ether, rare steal is Turbo Ether (per 1c).
   - **Drop not mentioned**: Lv. 2 Key Sphere.
   - The EPUB adds: *"Before the battle begins, equip your characters with non-elemental weapons to avoid accidental healing"* and that Lulu can *"kill time by using abilities like Focus and Reflex"* when unsure of element -- the app captures these points, so strategy content is mostly adequate.

7. **MEDIUM [E. Missing Tips]** The EPUB warns about Chimeras in the woods (page 48): *"Watch for Chimeras on the battlefield. They're powerful foes, so Auron's Power Break will come in handy. Also make sure to use Kimahri's Lancet to steal the Aqua Breath ability."* The Aqua Breath Lancet tip is a significant gameplay hint not in the app. The poptracker data in 1c also lists "Use Lancet to Learn Aqua Breath Chimera" as an item.

8. **MEDIUM [E. Missing Tips]** The EPUB notes that O'aka offers a major discount if you examine his inventory without buying and then agree his prices are too steep (page 48): *"If you examine O'aka's inventory without purchasing anything, he wonders if his prices are too steep. If you agree they are, he offers you a major discount!"* The app prose does not mention this discount trick.

9. **MEDIUM [E. Missing Tips]** The EPUB mentions that Clasko should be advised to take up chocobo breeding, and that he rewards you with a **Friend Sphere** later (page 49): *"Rightly suggest that Clasko take up chocobo breeding, and he thanks you with a Friend Sphere much later in the game."* The app mentions this in the lake-macalania prose but not in macalania-woods where the EPUB places the initial encounter.

10. **MEDIUM [B. Prose Quality]** The prose (102 words, single sublocation) incorrectly claims *"Primer XVI is found later with Clasko near the Lake Macalania Travel Agency"*. This Primer number is wrong -- XVI is indeed found there, but the prose conflates it with the macalania-woods content. The woods themselves have Primer XV (near O'aka), not XVI.

11. **LOW [A. Sublocation Completeness]** The EPUB describes at least 4 distinct areas: South Woods (initial climb), Central Woods (butterfly area 1), North Woods (butterfly area 2 + O'aka), and Lake Road (Spherimorph + Crawler + Clasko area near Travel Agency). The app has a single sublocation called "Macalania Woods" covering everything. Given the quantity of items and distinct mini-games, at least 2-3 sublocations would better match the EPUB structure.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (single sublocation for 4+ distinct areas) |
| B. Prose Quality | 2/5 | 1 (wrong Primer numbers, sparse coverage for large area) |
| C. Missing Items | -- | 12+ (nearly entire item list missing; only 1 item present, and it is mislabeled) |
| D. Boss Strategy | 3/5 | 1 (Spherimorph: adequate core mechanic description but no HP/steal/drop) |
| E. Missing Tips | -- | 3 (butterfly chase tiers, Aqua Breath Lancet, O'aka discount) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 0 (images correctly assigned per 1d audit) |

---

## Lake Macalania (slug: `lake-macalania`)
**EPUB Pages**: 49 (partial), 50, 51
**Overall Health**: NEEDS WORK

### Findings

1. **CRITICAL [C. Missing Items]** The app has only **1 item** in the Lake Macalania sublocation (labeled "Al Bhed Primer Vol. XV") and **0 items** in the Macalania Temple sublocation. The EPUB lists extensive items across pages 49-51:
   - **Travel Agency / Lake area**: 4000 Gil (chest near Clasko), Al Bhed Primer vol. XVI (near Clasko)
   - **Temple entrance**: Mega-Potion, 400 Gil
   - **Temple main hall**: Shell Targe (from Tromell), Remedy (x2), Hi-Potion (x2), X-Potion (x2), 5000 Gil, Elixir, Ether, Phoenix Down (x3)
   - **Cloister of Trials**: Luck Sphere (Destruction Sphere chest)
   - **Post-temple flight**: Lv. 1 Key Sphere (hidden chest on chasm right side)
   - **Under the ice**: Lv. 2 Key Sphere (behind Kimahri), Avenger (beside Auron)

   The app is missing virtually all of these.

2. **HIGH [C. Missing Items]** The single Primer in the app is labeled **"Al Bhed Primer Vol. XV"** (id: `lake-mac-primer-xv`). This is **wrong** -- Primer XV is in Macalania Woods (near O'aka). The Lake Macalania Primer is **Vol. XVI**, found near Clasko outside the Travel Agency. EPUB page 49: *"The party finds Clasko and the Al Bhed Primer vol. XVI outside of another Travel Agency."*

3. **HIGH [D. Boss Strategy]** The app lists a boss called `"seymour"` with a brief 52-word strategy. Several issues:
   - The slug should likely be `"seymour-macalania"` or similar to distinguish from Seymour Natus (Bevelle) and later encounters.
   - HP is stated as "6,000 + 6,000" but the fight has three phases: Seymour (6,000 HP), then Anima (18,000 HP), then Seymour again. The app omits Anima's HP entirely.
   - **Missing steal data**: Seymour: Turbo Ether, Guado Guardian: Hi-Potion, Anima: Silence Grenade (per 1c and EPUB page 50).
   - The EPUB provides detailed phase-by-phase tactics: steal Guado potions to disable Auto-Potion, summon the new unnamed aeon (Shiva), heal Shiva with Blizzara while Anima uses Pain, use Diamond Dust for massive damage, then after Anima dies use Bio to poison Seymour and Magic Break with Auron. EPUB: *"By taking a potion from a Guado, he won't have the ability to heal himself after every attack. Now unguarded, Seymour raises Anima to fight... The ice goddess Shiva comes to the young summoner's aid."*
   - The strategy quality is poor at 52 words and misses the Shiva reveal, which is a major story moment.

4. **HIGH [D. Boss Strategy]** Crawler strategy (106 words) is reasonably good but missing:
   - **HP not mentioned**: Crawler 16,000 / Negator 1,000 (per 1c).
   - **Steal not mentioned**: Crawler: Lunar Curtain, Negator: Hi-Potion.
   - **Weakness not mentioned explicitly**: Crawler is weak to Lightning (x1.5 per 1c).
   - The EPUB adds that Haste should be cast (page 45 Extractor section references this pattern) and the sgTip in macalania-woods mentions getting Haste for Tidus, but the Crawler strategy itself does not.

5. **HIGH [D. Boss Strategy]** The **Wendigo** boss fight is entirely missing from the app. The EPUB dedicates substantial space to this fight (page 51). HP: 18,000 (per 1c). The Guado Guardians cast protective spells and Berserk on Wendigo as a dying act. EPUB: *"You can remove Berserk, however, by using Threaten. The Wendigo remains a powerful foe, but there are lots of ways to keep its hits from connecting. Have Wakka inflict it with darkness or sleep, or cripple it with abilities like Auron's Power Break and Kimahri's Jinx."* Wendigo is weak to Fire. This is a significant omission -- it occurs immediately after the Seymour fight with no chance to save.

6. **MEDIUM [E. Missing Tips]** The EPUB describes the post-battle "Regroup Beneath the Ice" scene (page 51) where the party rests under the frozen lake. It mentions a **Lv. 2 Key Sphere** hidden behind Kimahri and an **Avenger** (counter-attack weapon for Tidus) beside Auron. These are easily missed items the app does not mention.

7. **MEDIUM [E. Missing Tips]** The EPUB's Cloister of Trials walkthrough is extremely detailed (page 50, continued on 51), spanning roughly 400 words of step-by-step sphere-pushing instructions. The app's `"cloister": "macalania"` flag presumably links to a separate cloister component, but the Macalania Temple sublocation prose does not mention the Destruction Sphere chest (containing a **Luck Sphere**) which is the key optional reward.

8. **MEDIUM [B. Prose Quality]** The Macalania Temple prose (102 words) references Tromell giving a Shell Targe and mentions X-Potions and 5,000 Gil, but none of these appear as trackable items. The prose also claims *"Guado Guardians chase you out, and if one catches you it triggers a battle"* which matches the EPUB, but the EPUB adds important combat advice: *"If you can't kill a Guado in a single hit, make sure to have Rikku steal its potions so it can't auto-heal"* (page 51).

9. **MEDIUM [A. Sublocation Completeness]** The app has 2 sublocations (Lake Macalania + Macalania Temple). The EPUB describes at least 4 distinct areas: Travel Agency exterior (Clasko, Primer XVI), Temple entrance & main hall, Cloister of Trials, ice tunnel escape & frozen lake bottom. The escape sequence and under-ice area are entirely absent from the app.

10. **MEDIUM [G. Image Assessment]** Per the 1d image audit, `image_0053_00.jpeg` assigned to the Lake Macalania sublocation is actually from **EPUB page 53 (Bikanel Desert)**. This is a confirmed wrong-chapter image. The correctly assigned images are `image_0051_00.jpeg` and `image_0051_01.jpeg` (Macalania Temple).

11. **LOW [F. Missable Warnings]** While there are no traditionally "permanently missable" items at Lake Macalania, the Destruction Sphere Luck Sphere in the Cloister of Trials becomes harder to obtain if missed initially (requires returning later). Not flagged, but low priority.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (escape/under-ice area missing as sublocation) |
| B. Prose Quality | 2/5 | 1 (temple prose mentions items not tracked; missing escape combat tips) |
| C. Missing Items | -- | 15+ (nearly all temple items, post-temple items, and under-ice items missing; Primer mislabeled) |
| D. Boss Strategy | 2/5 | 3 (Seymour sparse/missing Anima phase detail; Crawler missing HP/steal/weakness; Wendigo entirely absent) |
| E. Missing Tips | -- | 2 (under-ice hidden items, Destruction Sphere Luck Sphere) |
| F. Missable Warnings | -- | 0 critical (1 low: Destruction Sphere) |
| G. Image Assessment | -- | 1 (image_0053_00 is from Bikanel Desert, not Lake Macalania) |

---

## Cross-Chapter Issues

### Al Bhed Primer Numbering Chain Error

The Primer numbering is off by one across all three chapters, creating a cascading error:

| App Chapter | App Says | Correct | EPUB Source |
|-------------|----------|---------|-------------|
| thunder-plains | Vol. XIII | **Vol. XIV** | Page 47: "Al Bhed Primer vol. XIV" |
| macalania-woods | Vol. XIV | **Vol. XV** | Page 48: "Al Bhed Primer vol. XV" |
| lake-macalania | Vol. XV | **Vol. XVI** | Page 49: "Al Bhed Primer vol. XVI" |

Each Primer is mislabeled as the previous volume number. This is a systematic data entry error that likely propagates to other chapters as well.

### Image Errors Summary

| Chapter | Wrong Image | Correct Origin | Should Be |
|---------|-------------|----------------|-----------|
| thunder-plains | image_0052_00.jpeg (Bikanel Desert, pg 52) | Thunder Plains content is pg 46-47 | Remove; only image_0047_00 is valid |
| lake-macalania | image_0053_00.jpeg (Bikanel Desert, pg 53) | Lake Macalania content is pg 49-51 | Remove; images_0051_00/01 are valid |

### Missing Boss: Wendigo

The Wendigo fight (HP 18,000, weak to Fire) at the frozen lake is entirely absent from the lake-macalania chapter JSON. This is a significant omission as it occurs immediately after the Seymour fight with no save point between them.
