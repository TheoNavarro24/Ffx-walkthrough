# Wave 2 Audit — Zanarkand, Baaj Temple, Besaid
Agent 2a. EPUB pages ~23-28. Chapters: zanarkand, baaj-temple, besaid.

---

## Zanarkand (slug: zanarkand)
**EPUB Pages**: 23
**Overall Health**: NEEDS WORK

### Findings

1. **[HIGH] A. Sublocation Completeness** — The EPUB describes four distinct sections: "Race to the Stadium", "Survive Sin's Assault", "Cut Through Sinscales", and "Seek a New Reality". The app collapses all of this into a single sublocation called "Dream Zanarkand" with just 65 words of prose. While combining these into one sublocation is reasonable for a short chapter, the single prose block omits the Sinscale waves and the post-fight Tanker section entirely. The "Seek a New Reality" section (swimming toward the blurry figure) is also absent. Severity: HIGH — there are meaningful gameplay moments skipped, though nothing is permanently missable.

2. **[HIGH] B. Prose Quality — Dream Zanarkand: 2/5** — The app prose is 65 words and extremely thin. It says "The match itself is scripted: enjoy it, then follow Auron when Sin hits. The Sinspawn Ammes fight at the stadium is your first real combat — Auron's Overdrive fires automatically, then you finish it off." This is vague and partly wrong — Auron's Overdrive does NOT fire automatically; the player must select it. The EPUB says: *"When it's Auron's turn to attack, press the left directional button to access the Overdrive menu. Select his Overdrive, called Bushido, and execute his Dragon Fang attack."* The app also omits the wandering woman with Potions, the Sinscale waves, and the Tanker bridge scripted event.

3. **[MEDIUM] C. Missing Items** — The EPUB mentions **2 Potions** (from the woman on the bridge who gives them if you promise a ticket) and a **Longsword** (given by Auron). The app JSON has zero items. The Longsword is a story weapon, so its omission is less critical, but the 2 Potions from the woman are a genuine pickup that the EPUB specifically details ("Tell her you can get her a ticket, and she thanks you with two Potions!"). Severity: MEDIUM — these are consumable Potions, not permanently missable, but the chapter being flagged as "Zero items" by Agent 1b is a direct consequence.

4. **[MEDIUM] D. Boss Strategy — Sinspawn Ammes: 3/5** — The app strategy (70 words) correctly explains that Demi can never kill you and covers both Overdrives. However, it does not mention the Overdrive execution mechanics (the timed button presses) which the EPUB describes in detail: *"Quickly enter the commands displayed on-screen to execute the attack at maximum power"* and *"Press the button when the marker is directly in the center of the meter."* For a first-time boss tutorial, these instructions are important. Also missing: the HP value. The game-data reference says HP is 2,400 — the app strategy does not mention HP at all.

5. **[MEDIUM] E. Missing Tips** — Two tips from the EPUB are absent from the app:
   - **Sinscale wave 2 tactic**: *"attack only the enemies in front of you; the ones behind are immediately replaced with reinforcements"* — this is a genuine tactical instruction.
   - **Sinscale wave 3 (Tanker)**: *"watch carefully for enemies whose wings start to flicker. Eliminate those enemies next, or they perform the damaging Spines attack"* and *"Focus all of your attacks on the Tanker until it falls and explodes"* — the Tanker is a mini-objective the app ignores entirely.
   - **Save Sphere restores HP**: EPUB notes *"Touching the Save Sphere restores your characters to full health."* This is a tutorial-level tip worth including for the first chapter.

6. **[LOW] F. Missable Warnings** — No missable items exist in this chapter per the EPUB and game data. The app correctly has an empty missables array. No issues here, but for completeness: the EPUB does not flag anything as missable in Zanarkand, and the game data confirms no missables. Properly handled.

7. **[LOW] G. Image Assessment** — Per the 1d image audit, zanarkand has 1 image (image_0023_00.jpeg) from EPUB page 23, correctly assigned. No duplicates, no mismatches. However, with only 1 image for the entire chapter, coverage is thin — the EPUB page 23 is dense with content. No errors though.

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | 4 sections collapsed to 1 | 1 (EPUB sections merged; post-fight areas omitted) |
| B. Prose Quality | 2/5 | 1 (thin, partially incorrect) |
| C. Missing Items | — | 2 (Potion x2, Longsword) |
| D. Boss Strategy | 3/5 | 1 (no HP value, missing Overdrive mechanics) |
| E. Missing Tips | — | 3 (Sinscale tactics, Tanker objective, Save Sphere tip) |
| F. Missable Warnings | — | 0 |
| G. Image Assessment | — | 0 (1 image, correctly assigned) |

---

## Baaj Temple (slug: baaj-temple)
**EPUB Pages**: 24-26 (partial; page 26 straddles baaj-temple and besaid)
**Overall Health**: ACCEPTABLE

### Findings

1. **[LOW] A. Sublocation Completeness** — The EPUB has the following sections for baaj-temple: "Explore the Submerged Ruins" (p24), "Gather Fuel for the Fire" (p25), "Awaken on the Al Bhed Ship" (p25), "Join the Salvage Operation" (p25), and "Regroup on the Ship" (p26). The app has two sublocations: "Submerged Ruins" and "Salvage Ship". This mapping is reasonable — "Submerged Ruins" covers the initial pool area + fire-building + underwater salvage (all in the same temple ruins), while "Salvage Ship" covers the Al Bhed ship deck. The "Regroup on the Ship" section (which describes the Tros fight's conclusion and transition) is incorporated into "Salvage Ship" prose. No major areas missing.

2. **[MEDIUM] B. Prose Quality — Submerged Ruins: 3/5** — At 90 words, this covers the key chests and boss trigger warnings, but conflates Geosgaeno and Klikk areas in a confusing way. The prose mentions "collect all the chests before triggering any boss" but doesn't explain the fire-building detour (Flint + Withered Bouquet) at all. The EPUB dedicates significant space to the fire-building: *"Go through the doors near the Save Sphere to the south, search the open drawer for the Flint, and return to the main chamber. Head to the north part of the map, then enter the doorway marked on the on-screen map with a green square. Ascend the stairs and examine the dried flowers to obtain the Withered Bouquet."* This entire gameplay section (fire puzzle) is missing from the app prose.

3. **[LOW] B. Prose Quality — Salvage Ship: 4/5** — At 92 words, this covers the key points: soldier gives 3 Potions, Primer location, Sphere Grid tutorial, and the salvage operation. Minor omission: doesn't mention you can Steal Grenades from Piranhas during the underwater salvage (EPUB: *"Have your companion steal as many Grenades as possible"*), but overall this is solid.

4. **[HIGH] C. Missing Items** — Two items from EPUB are missing from the app JSON:
   - **Flint** — Event item required to build the fire in the submerged ruins. EPUB p24-25 both mention it. Not in app items. Severity: MEDIUM (event item, not inventory-permanent, but part of the area's puzzle).
   - **Withered Bouquet** — Event item, also needed for the fire. EPUB p24-25. Not in app items. Severity: MEDIUM (same as Flint).
   - **Grenades** (stolen from Piranhas during salvage) — EPUB emphasizes stealing these: *"use these opportunities to steal Grenades"* and *"she can steal more Grenades from the Klikk!"*. Not listed as app items, though steals are borderline. Severity: LOW.
   - The EPUB item header on p24 lists: "POTION (X5), 200 GIL, AL BHED PRIMER VOL I, HI-POTION (X2), ETHER, X-POTION, FLINT, WITHERED BOUQUET". The app's Submerged Ruins has: Potion x2, 200 Gil, Hi-Potion, X-Potion, Ether, Hi-Potion. That accounts for Potion x2 + Hi-Potion x2 + X-Potion + Ether + 200 Gil = 7 items. But the EPUB lists Potion x5 total (2 from chests in the ruins + 3 from the soldier on the Al Bhed ship). The Salvage Ship sublocation has Potion x3, so that accounts for all 5 Potions. However, the app lists Potion x2 in Salvage Ship which should be on the Submerged Ruins side — the items are split differently than the EPUB but the total is close. The **200 Gil** in Salvage Ship does not appear in the EPUB's ship deck items — the EPUB only lists the 200 Gil in the Submerged Ruins.

5. **[MEDIUM] D. Boss Strategy — Geosgaeno: MISSING** — The EPUB explicitly describes the Geosgaeno encounter (HP: 32,767, 90 to escape, AP: 0) as a boss: *"Attack the Geosgaeno three times, and the fight moves to its conclusion."* The game-data reference (1c) lists Geosgaeno as a boss for baaj-temple with HP 32,767 and steals (Water Gem). The app JSON has NO Geosgaeno boss entry. This is a missing boss. Severity: MEDIUM — it's an unwinnable scripted fight, but it appears in the game data and the EPUB treats it as a boss encounter.

6. **[MEDIUM] D. Boss Strategy — Klikk: 3/5** — The app strategy (84 words) correctly states HP 1,500 and that Tidus starts alone. However, it contains an error: *"she uses Al Bhed Potions to heal the whole party"* — the EPUB says Rikku uses Grenades, not Al Bhed Potions. The EPUB is specific: *"When it's the girl's turn, scroll down to the Special command, then select the Use command to throw a Grenade."* Also missing: the EPUB notes Rikku can steal more Grenades from Klikk when she runs out (*"When she runs out, she can steal more Grenades from the Klikk!"*). The steal data from 1c confirms: Steal (common) grenade x1, Steal (rare) grenade x2.

7. **[MEDIUM] D. Boss Strategy — Tros: 3/5** — The app strategy (39 words) is quite thin and contains an error: *"Focus the body; arms regenerate HP if ignored but are a low priority."* Tros has no arms — this appears to be confusion with a different boss. The EPUB describes a completely different mechanic: *"Tros swims to the chamber's other side"* and the key tactic is the Pincer Attack Trigger Command: *"If you check Tidus's Trigger Commands this time around, there is an option to perform a Pincer attack. This attack causes your characters to surround the boss, preventing its Nautilus Charge attack."* The app mentions Trigger Command but says "Retreat position (corner prompt) to dodge it" — the actual mechanic is "Stand By" to heal 50 HP each, then Pincer Attack to surround. The EPUB also recommends using the Cheer ability and Grenades.

8. **[MEDIUM] E. Missing Tips** — Several tips from the EPUB are absent:
   - **Sphere Grid / Cheer ability**: EPUB p25 says *"Tidus should have gained a Sphere Level after the last fight, so use the Sphere Grid to acquire the Cheer ability."* This is important tutorial guidance missing from the app.
   - **Stand By Trigger Command**: During Tros fight, EPUB explains: *"press left to enter the Trigger Command menu and choose 'Stand By.' This action passes your turn to restore 50 HP to each character."* The app doesn't mention Stand By.
   - **Al Bhed Compilation Sphere**: EPUB p24 mentions the blue globe for importing dictionaries from prior playthroughs. Minor but relevant for NG+ players.
   - **Stealing from Piranhas**: As noted above.

9. **[LOW] F. Missable Warnings** — No missable items in this chapter per EPUB or game data. The app correctly has empty missables. No issues.

10. **[LOW] G. Image Assessment** — Per 1d audit, baaj-temple has 4 images: image_0024_00, image_0024_01, image_0025_00, image_0026_00. All correctly assigned to EPUB pages 24-26. image_0025_00 is legitimately reused for the airship chapter's Baaj Temple revisit. image_0026_00 is shared with ss-liki (legitimate boundary page). No errors.

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | Good (5 EPUB sections -> 2 sublocations, reasonable) | 0 |
| B. Prose Quality | 3.5/5 avg (3 + 4) | 1 (Submerged Ruins misses fire puzzle) |
| C. Missing Items | — | 2 (Flint, Withered Bouquet; plus steal-only Grenades) |
| D. Boss Strategy | 2.3/5 avg (missing Geosgaeno + Klikk 3 + Tros 3) | 3 (Geosgaeno missing entirely; Klikk has "Al Bhed Potions" error; Tros has "arms" error and wrong dodge mechanic) |
| E. Missing Tips | — | 4 (Cheer ability, Stand By command, Compilation Sphere, Piranha steals) |
| F. Missable Warnings | — | 0 |
| G. Image Assessment | — | 0 (4 images, all correctly assigned) |

---

## Besaid (slug: besaid)
**EPUB Pages**: 26 (partial, ISLE OF BESAID header), 27, 28, 29 (partial, "Embark at the Besaid Docks")
**Overall Health**: NEEDS WORK

### Findings

1. **[MEDIUM] A. Sublocation Completeness** — The EPUB has the following sections for Besaid: "Meet the Besaid Aurochs" (beach, p27), "Visit Wakka's Village" (p27), "Pay Your Respects at the Temple" (p27), "Unlock the Cloister of Trials" (p28), "Prepare for Yuna's Pilgrimage" (p28), "Take the First Steps of Your Journey" (p28), and "Embark at the Besaid Docks" (p29). The app has 3 sublocations: Beach, Besaid Village, Besaid Temple. This is a reasonable consolidation, EXCEPT the app completely omits:
   - **"Take the First Steps of Your Journey"** — This covers the tutorial battles ascending the mountain (Lulu teaches magic, Wakka teaches Switch, etc.), the Kimahri boss fight at the ancient ruins, and the Besaid dock departure. These are not trivial — the Kimahri fight is a real boss encounter.
   - **"Embark at the Besaid Docks"** — Dock departure with well-wisher gifts (Ether, Phoenix Down x3, Seeker's Ring, 400 Gil, Remedy). Multiple items are obtained from NPCs here.
   - **"Prepare for Yuna's Pilgrimage"** — Brotherhood acquisition, Yuna joining, Rod of Wisdom equip reminder, Valefor's second Overdrive from the dog. These are important events.

   Severity: MEDIUM (the dock items are significant; Kimahri fight is a real boss encounter).

2. **[MEDIUM] B. Prose Quality — Beach: 3/5** — At 55 words, this covers the Moon Crest (correctly flagged missable) and the lagoon chests. However, it says "two Antidotes and 200 Gil" for the sunken chests, while the EPUB mentions "three sunken treasure chests along the southeast wall" — the EPUB p27 also lists collecting "Potions, a Hi-Potion, and 200 gil, by repeatedly talking to the members of Wakka's team." The app has the beach items as Moon Crest, Antidote, and 200 Gil — but the EPUB also mentions items from talking to Aurochs members on the beach (these are in the item header on p26: Hi-Potion, Potion). Also, the app says the Moon Crest is "missable once you sail away" which is somewhat inaccurate for the HD Remaster — you CAN return to Besaid, but Dark Valefor blocks the temple, not the beach. The Moon Crest on the beach is actually still obtainable later.

3. **[LOW] B. Prose Quality — Besaid Village: 4/5** — At 74 words, this hits the key points: chests near tents, Crusaders Lodge, Brotherhood, Al Bhed Primer Vol. II. Minor omissions: doesn't mention the item shop (where you can buy Potions/Phoenix Downs/Antidotes), and omits the hidden passage behind the tall grass north of the first tent (EPUB: *"North of that tent, tall grass hides a passage to the west that leads to three chests, containing a Hi-Potion, 400 gil, and two Potions"*). The chest descriptions in the prose could be more specific about locations.

4. **[LOW] B. Prose Quality — Besaid Temple: 4/5** — At 76 words, this covers the Destruction Sphere puzzle and correctly warns about the Dark Valefor HD missable. The Cloister solution is summarized rather than step-by-step, but the app has a dedicated cloister field. Minor omission: doesn't mention examining the glyphs on the wall that the EPUB describes in detail for puzzle-solving.

5. **[HIGH] C. Missing Items** — Several items from the EPUB are missing from the app JSON:
   - **Brotherhood** (weapon) — Given by Wakka before departure. EPUB p28: *"Wakka gives Tidus Brotherhood, a beautiful blue sword."* Also listed in p26 item header. Not in app items (story weapon, but significant). Severity: MEDIUM.
   - **Seeker's Ring** (accessory) — Given by well-wishers at the dock. EPUB p29: *"talk to the assembled well-wishers to receive some gifts, including an Ether, three tufts of Phoenix Down, a Seeker's Ring, and 400 gil."* Listed in p26 item header. Not in app at all. Severity: HIGH — this is a real equipment drop.
   - **Ether** — From dock well-wishers. EPUB p29. Not in app. Severity: MEDIUM.
   - **Phoenix Down x3** — From dock well-wishers (note: p26 header lists Phoenix Down x5 total for Besaid; the app only has 1 Phoenix Down). EPUB p29 specifically says "three tufts of Phoenix Down" at the dock. Severity: MEDIUM.
   - **400 Gil** (dock) — From dock well-wishers. EPUB p29. Not in app (the app has one 400 Gil in the village, not a second at the dock). Severity: LOW.
   - **Remedy** — From the boy on the plank at the dock. EPUB p29: *"Talk to the little boy on the plank to obtain a Remedy."* Listed in p26 header. Not in app. Severity: MEDIUM.
   - **Valefor's second Overdrive** — EPUB p28: *"Speak to the item shop owner, who tells you about a strange discovery made by her dog... Talk to the dog, and it gives you the item it found. This unlocks Valefor's second and more powerful Overdrive attack!"* Not mentioned in app. Severity: HIGH — this is a unique, easily-missed power-up.
   - **Metal Shield, Bright Bangle, Variable Mog** — Equipment drops from tutorial battles on the mountain path. EPUB p29: *"keep an eye out for equipment drops like Tidus's Metal Shield, and Lulu's Bright Bangle and Variable Mog."* Not in app. Severity: LOW (random drops, not chests).

   Total missing: 8 items/events.

6. **[CRITICAL] D. Boss Strategy — Kimahri: MISSING** — The EPUB explicitly describes the Kimahri boss fight (HP: 750, AP: 3/4) with strategy: *"Use the Cheer ability to receive less damage from Kimahri's attacks. Keep attacking Kimahri and avoid consuming any healing items unless it's absolutely necessary... Kimahri alternates between physical attacks and his powerful Jump attack."* The game-data reference (1c) confirms Kimahri as a boss for besaid with HP 750. The app has NO Kimahri boss entry at all. Instead, the app lists "valefor" as a boss with the note "Valefor is obtained here, not fought as an enemy" — which is not a real boss. The actual boss (Kimahri) is completely absent.

7. **[LOW] D. Boss Strategy — Valefor: N/A** — The app lists Valefor as a boss for tracking purposes, noting it's "obtained here, not fought." This is unconventional but not harmful. However, the 19-word strategy was flagged by Agent 1b as a red flag. Since Valefor truly isn't fought here, this is acceptable.

8. **[HIGH] E. Missing Tips** — Multiple significant tips from the EPUB are absent:
   - **Tutorial battle guidance** — EPUB p28: *"Simply follow the advice of the other characters to learn how to use each party member's special skills in battle."* The entire mountain path tutorial section (Lulu magic, Wakka switch, Yuna summon) is missing from the app.
   - **Equip Rod of Wisdom** — EPUB p28: *"you must manually equip Yuna with the Rod of Wisdom you found in the temple."* Important practical tip.
   - **Valefor's second Overdrive from dog** — EPUB p28 describes the whole dog sidequest. Not mentioned.
   - **O'aka investment guidance** — The app has `oaka.meeting: true` and `cumulativeTarget: 1001` but no prose about this. The EPUB p29 has extensive O'aka advice: *"if you loan him 10,000 or more gil, you are able to buy items at 30% off their usual prices"* and *"don't feel obligated to give him much."* (Note: O'aka first appears on S.S. Liki in the EPUB, not in Besaid itself — the app may be placing this meeting in the wrong chapter. EPUB p29 puts the O'aka encounter on S.S. Liki deck.)
   - **Pray at mountain top** — EPUB p28: *"have Tidus pray with the others if you wish."* Minor flavor.
   - **Summoning tutorial** — EPUB p29: *"switch out Tidus for Yuna. Summon Valefor and have it cast magic spells."* Important for first-time summoning.

9. **[MEDIUM] F. Missable Warnings** — The app correctly flags the Rod of Wisdom as missable with the warning: "Rod of Wisdom -- Destruction Sphere, Besaid Temple. Dark Valefor blocks return in HD." This is accurate and well-documented. However, the app also marks the Moon Crest as missable (`"missable": true`), which may be debatable — in the HD Remaster, the beach is technically still accessible even after Dark Valefor blocks the temple entrance. The beach cove is outside the temple area. The EPUB does NOT mark the Moon Crest as missable. Severity: LOW — being overcautious about missables is not harmful, but could be misleading.

10. **[HIGH] G. Image Assessment** — Per 1d audit, besaid has 3 image assignments using only 2 unique images: image_0027_00.jpeg and image_0029_00.jpeg (used twice). Key issues:
    - **image_0029_00.jpeg is from EPUB page 29 (S.S. Liki content)**, not besaid content. It's assigned to both "Besaid Village" and "Besaid Temple" sublocations. This is an error — the image depicts S.S. Liki/dock content, not the village or temple.
    - **Same wrong image used for two different sublocations** — Both Besaid Village and Besaid Temple use image_0029_00, which compounds the error.
    - **Missing coverage for pages 27-28** — EPUB page 28 has no images in the EPUB source (confirmed by 1a), so there's nothing to extract. But the besaid chapter only has one legitimate image (image_0027_00 for the Beach), leaving Village and Temple with no correct guide screenshots.

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | 7 EPUB sections -> 3 sublocations, missing dock + mountain path | 2 (dock departure area, mountain tutorial path) |
| B. Prose Quality | 3.7/5 avg (3 + 4 + 4) | 1 (Beach is thin) |
| C. Missing Items | — | 8 (Brotherhood, Seeker's Ring, Ether, Phoenix Down x3, 400 Gil, Remedy, Valefor 2nd Overdrive, equipment drops) |
| D. Boss Strategy | 1/5 avg (Kimahri missing = 0, Valefor N/A) | 1 CRITICAL (Kimahri boss completely absent) |
| E. Missing Tips | — | 6 (tutorial battles, equip Rod of Wisdom, dog/Valefor OD, O'aka guidance, prayer, summoning tutorial) |
| F. Missable Warnings | — | 1 (Moon Crest marked missable — debatable accuracy) |
| G. Image Assessment | — | 2 (image_0029_00 is wrong chapter origin; duplicate wrong image across 2 sublocations) |

---

## Cross-Chapter Observations

### Content Coverage Gap: Besaid Dock Departure
The EPUB's "Embark at the Besaid Docks" section (p29) falls at the boundary between besaid and ss-liki chapters. The app's besaid chapter ends at the temple without covering the dock. The app's ss-liki chapter (not in scope for this audit) should be checked to see if the dock items (Ether, Phoenix Down x3, Seeker's Ring, 400 Gil, Remedy) are captured there instead. Based on Agent 1b's inventory, ss-liki starts at "S.S. Liki" sublocation — meaning these dock items may fall through the cracks between chapters.

### Geosgaeno as a Boss
The game-data reference lists Geosgaeno under baaj-temple with HP 32,767 and steals (Water Gem). The EPUB describes the encounter with a full stat block. Yet the app JSON has no Geosgaeno entry. Since it's a scripted loss/escape, it could be argued either way — but the EPUB treats it as a boss encounter, and the game data includes it with steal opportunities that a veteran player would want to know about (Water Gem x1/x2).

### Tros Strategy Errors
The Tros strategy in the app has factual errors (mentions "arms" that don't exist, describes a "Retreat position" instead of the actual "Stand By" and "Pincer Attack" Trigger Commands). This is one of the earliest boss fights and a key tutorial — accuracy matters here.

### Kimahri Boss Omission
The complete absence of Kimahri as a boss in the besaid chapter is the most critical single finding. He is a real, fightable boss with HP 750 and a distinct strategy. The app instead lists Valefor (obtained, not fought) as the chapter's boss, which is misleading.

---

## Priority Fix List (all chapters combined)

| Priority | Chapter | Issue | Description |
|----------|---------|-------|-------------|
| CRITICAL | besaid | Missing Boss | Kimahri (HP 750) not in bosses array; only real boss in chapter |
| HIGH | besaid | Missing Items | 8 items from dock/mountain sections not in JSON |
| HIGH | besaid | Missing Sublocation | Dock departure + mountain path sections absent |
| HIGH | besaid | Image Error | image_0029_00 is S.S. Liki content, wrongly used for Village + Temple |
| HIGH | baaj-temple | Missing Boss | Geosgaeno (HP 32,767) not in bosses array |
| HIGH | baaj-temple | Boss Error | Tros strategy has "arms" that don't exist; wrong dodge mechanic name |
| HIGH | baaj-temple | Boss Error | Klikk strategy says "Al Bhed Potions" — should be "Grenades" |
| HIGH | zanarkand | Thin Prose | Dream Zanarkand is 65 words; misses Sinscale waves, Tanker, swim section |
| MEDIUM | zanarkand | Missing Items | 2 Potions from bridge woman not listed |
| MEDIUM | baaj-temple | Missing Items | Flint + Withered Bouquet (event items for fire puzzle) |
| MEDIUM | baaj-temple | Missing Tips | Cheer ability, Stand By command, Piranha steal advice |
| MEDIUM | besaid | Missing Tips | Dog/Valefor OD, equip Rod of Wisdom, tutorial battles, O'aka |
| LOW | besaid | Missable Flag | Moon Crest marked missable — beach is accessible in HD even after Dark Valefor |
