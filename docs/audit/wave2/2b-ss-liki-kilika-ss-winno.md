# Wave 2 Audit — S.S. Liki, Kilika, S.S. Winno
Agent 2b. EPUB pages ~28-33. Chapters: ss-liki, kilika, ss-winno.

---

## S.S. Liki (slug: ss-liki)
**EPUB Pages**: 29-30
**Overall Health**: ACCEPTABLE

### Findings

1. **[LOW] [A. Sublocation Completeness]** The EPUB treats the deck boss fights (Sin's Fin on deck, then Sinspawn Echuilles underwater) as distinct encounters within one area. The app collapses everything into a single "S.S. Liki" sublocation, which is reasonable since there is no exploration split -- the deck and below-deck are part of one continuous sequence. No sublocation is missing.

2. **[LOW] [B. Prose Quality]** The prose (135 words) is solid. It covers O'aka donations, the Primer location hint ("corner sticking out"), the repeatable Potion kick mechanic (up to 20), and the Remedy. One minor inaccuracy: the prose says "only Wakka, Lulu, and Auron can reach it" when referring to Sin's Fin, but Auron is not in the party at this stage of the game. The EPUB correctly states: *"the real target is Sin's gigantic fin, which can only be hit by Wakka's blitzball, Lulu's spells, and Yuna's aeon."* Yuna's aeon (not Auron) is the third option. **Rating: 4/5** -- good coverage but the Auron/Yuna error is a factual mistake in the prose.

3. **[MEDIUM] [C. Missing Items]** The EPUB page 29 lists at the top: "SINSPAWN ECHUILLES, POTION (X5), REMEDY, AL BHED PRIMER VOL III". The app has Remedy, Potion (up to x20), and the Primer. The "Potion (x5)" in the EPUB header may be a separate reference to the five potions given to the party as a reward or default, or it may refer to the repeatable suitcase kicks. The app's description of the suitcase mechanic ("up to x20") is actually more accurate than the EPUB's "x5" header since you can indeed kick repeatedly. No item is truly missing.

4. **[LOW] [D. Boss Strategy — Sin's Fin]** HP stated as 2,000 in app, which matches monsters.json (HP: 2,000). The strategy (84 words) is adequate and provides good tactical advice about Overdrive gauges. However, the EPUB notes that *"Leaving one Sinscale alive stops Sin from producing more and limits the amount of damage that your party can take, allowing you to go all-in on the fin."* This tactical tip is not present in the app. Also, the app mentions "only Wakka, Lulu, and Auron" can hit the fin -- Auron is wrong; the EPUB says Wakka, Lulu, and Yuna's aeon. **Rating: 3/5** -- factual error about party composition and missing Sinscale management tip.

5. **[LOW] [D. Boss Strategy — Sinspawn Echuilles]** HP is not stated directly in the Echuilles strategy text (unlike Sin's Fin, which has it). From 1c reference: HP is 2,000. The strategy (99 words) closely mirrors the EPUB's advice about Cheer, Dark Attack, ignoring Sinscales, and watching the CTB window. Solid. **Rating: 4/5** -- good mirror of EPUB content, minor omission of explicit HP.

6. **[MEDIUM] [E. Missing Tips]** The EPUB includes the O'aka investment table showing that donating 10,001+ Gil gets items at 0.7x standard price. While the app notes the O'aka meeting and a cumulative target of 1,001 Gil, the detailed pricing tier table from the EPUB is not included. The EPUB also advises: *"You'll have more opportunities to increase your loan amount before he starts selling anything worth buying."* This strategic context is missing. Additionally, the EPUB's Sinscale management tip (leave one alive to stop respawns) is absent.

7. **[LOW] [E. Missing Tips]** The Sphere Grid tip in the app says "Prioritize NulBlaze and NulShock for Yuna." This tip does not appear in the EPUB and is app-original content -- it is good advice and not a problem, but it cannot be EPUB-verified.

8. **[LOW] [F. Missable Warnings]** The app correctly lists no missables for S.S. Liki. The EPUB does not flag anything as missable here. However, the Jecht Sphere in the S.S. Liki Captain's Room (from 1c poptracker data: "Captain's Room (Jecht's Sphere) 2nd Visit") is collectible on a return visit, so it is not missable. Correct handling.

9. **[MEDIUM] [G. Image Assessment]** Per the 1d audit, `image_0026_00.jpeg` is from EPUB page 26 which straddles baaj-temple/besaid boundary -- it is shared with baaj-temple and is a legitimate boundary-page reuse. `image_0029_00.jpeg` is from EPUB page 29 (S.S. Liki content) -- correctly assigned here, but the 1d audit flagged it as also incorrectly assigned to two besaid sublocations. The ss-liki assignment itself is correct.

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | Complete | 0 |
| B. Prose Quality | 4/5 | 1 (Auron/Yuna factual error) |
| C. Missing Items | -- | 0 |
| D. Boss Strategy | 3.5/5 avg | 1 (Sin's Fin: wrong party member, missing Sinscale tip) |
| E. Missing Tips | -- | 2 (O'aka pricing tiers, Sinscale management) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 0 direct issues (image_0029 cross-assignment to besaid is a besaid problem) |

---

## Kilika (slug: kilika)
**EPUB Pages**: 30-33
**Overall Health**: NEEDS WORK

### Findings

1. **[LOW] [A. Sublocation Completeness]** The app has three sublocations: Kilika Port, Kilika Woods, Kilika Temple. The EPUB covers the same three areas with headings "Sift Through the Ruins of Kilika" (port), "Travel Through Kilika Woods" (woods), and "Unravel the Mysteries of Kilika Temple" (temple). Complete match -- no sublocations missing.

2. **[MEDIUM] [B. Prose Quality — Kilika Port]** The app prose (79 words) says the Primer is "just west of the inn" but the EPUB says it is on *"the counter"* of *"the local bar"* (tavern), found after rescuing the crying girl. The EPUB is more specific: *"rescue the crying girl from the rubble west of the docks. You'll see her again at the local bar, where you can take an Ether out of a chest for a reward, and also pick up Al Bhed Primer vol. IV from the counter."* The app omits the cause-and-effect relationship (rescue girl -> unlocks tavern access -> Ether + Primer). The app also says to rescue the girl "from the rubble west of the docks" which matches, but the prose says the Primer is "just west of the inn" which is vague and possibly inaccurate (it's in the bar/tavern, not west of the inn). The app also doesn't mention the merchant's gear advice: the EPUB specifically warns *"don't waste money on Wakka's Scout weapon; you'll find a freebie soon."* **Rating: 3/5** -- location directions are vague/inaccurate, missing the rescue-girl trigger chain and the "don't buy Scout" advice.

3. **[MEDIUM] [B. Prose Quality — Kilika Woods]** The app prose (87 words) covers the key beats: Scout chest location, Lord Ochu being optional, Lancet on Ragora, Luck Sphere location. However, the EPUB provides significantly more detail about the two Crusader sentries: *"A thin passage to the west leads north past Lord Ochu and also hosts a chest with Wakka's Scout weapon. Along the path you encounter a blue-clad Crusaders sentry who is sending scouts between herself and a second sentry to the northeast. She gives you a Remedy. If you've defeated Lord Ochu, speak to her again for a NulBlaze Shield. The second sentry gives you a Hi-Potion."* The NulBlaze Shield reward for defeating Lord Ochu is entirely missing from the app (see finding #5). **Rating: 3/5** -- missing Crusader sentry details and the conditional NulBlaze Shield.

4. **[LOW] [B. Prose Quality — Kilika Temple]** The app prose (62 words) gives a brief summary of the Cloister puzzle and correctly highlights the Red Armlet as permanently missable. The EPUB provides a detailed step-by-step Cloister walkthrough (the full cloister is handled by the `cloister: "kilika"` reference, so the brief prose here is acceptable). The missable warning is clear and prominent. **Rating: 4/5** -- adequate given the separate cloister component.

5. **[HIGH] [C. Missing Items — NulBlaze Shield]** The EPUB clearly states that after defeating Lord Ochu, speaking to the first Crusader sentry awards a NulBlaze Shield: *"If you've defeated Lord Ochu, speak to her again for a NulBlaze Shield."* This item is completely absent from the app's Kilika Woods items list. It is a conditional reward (requires beating Lord Ochu) but is a useful piece of equipment. **Name**: NulBlaze Shield. **Location**: Kilika Woods, first Crusader sentry (conditional on Lord Ochu defeat). **Missable**: No (area is revisitable). **Severity**: HIGH -- it's a named equipment piece tied to the optional boss reward chain.

6. **[LOW] [C. Missing Items — verification]** Cross-referencing all EPUB items against the app:
   - Kilika Port: Ether (app: yes), Al Bhed Primer Vol. IV (app: yes), Potion x3 (app: yes). Complete.
   - Kilika Woods: Mana Sphere x2 (app: yes), Scout (app: yes), Remedy (app: yes), Luck Sphere (app: yes), Hi-Potion (app: yes), Elixir from Luzzu (app: yes), NulBlaze Shield (app: **MISSING**). One item missing.
   - Kilika Temple: Red Armlet (app: yes). Complete.

7. **[MEDIUM] [D. Boss Strategy — Lord Ochu]** HP is mentioned as 4,649 in the EPUB stat block. The app strategy (90 words) does not state HP explicitly -- it says "skip if underleveled" and mentions Fire weakness and Elixir reward. The 1c reference confirms HP: 4,649. The app's strategy contains a significant factual error: it claims *"if it falls asleep at partial HP it wakes up fully healed, so never let it doze off mid-fight"*. The EPUB says the opposite approach: *"Lord Ochu falls asleep to begin regenerating lost HP. Use normal attacks (not spells) to wake him as soon as you see the Z's appear over his head."* The EPUB says to wake him with attacks, not that he wakes fully healed. The app's version exaggerates the consequence. The EPUB also provides the key tactical threshold: *"summon Valefor when Ochu falls below 2,000 HP. That's the point at which his battle strategy changes and he begins casting Earthquake — a powerful spell that Valefor is completely immune to."* This 2,000 HP Valefor threshold is entirely missing from the app. The EPUB also mentions the Haste on Lulu tip. **Steal**: 1c reference shows steal is Potion x1 (common/rare) -- app doesn't mention steals. **Rating: 2/5** -- misleading sleep mechanic description, missing Valefor threshold, missing Earthquake immunity tip, no HP stated, no steal info.

8. **[MEDIUM] [D. Boss Strategy — Sinspawn Geneaux]** The app strategy (50 words) is notably thin. It says "Only magic penetrates the shell body" -- but the EPUB says *"only be pierced by Kimahri's piercing weapons"* for the shell, and *"While it is weak to fire, targeting its body at the start of the battle is futile, since its tentacles absorb the magic."* The app has the phase 1 mechanic backwards: it says only magic works on the shell, but the EPUB says magic is absorbed by tentacles and only Kimahri's piercing weapons work on the shell body. The app also says "Kill both tentacles first — they heal Geneaux every turn" but the EPUB says the tentacles "absorb the magic" (not heal). The EPUB also mentions Wakka's Silence Attack to prevent Water casting and Yuna's Esuna for poison. The app's Phase 2 advice is a single sentence. HP from 1c: 3,000 (body), 450 (tentacles) -- app matches. **Steal**: Potion x1 (common/rare) per 1c -- not mentioned. **Rating: 2/5** -- phase 1 mechanic is described incorrectly, missing Silence Attack and Esuna tips, very thin overall.

9. **[MEDIUM] [E. Missing Tips]** Several EPUB tips are absent from the app:
   - **Lancet on Ragora**: The app mentions this correctly -- present.
   - **Don't buy Wakka's Scout weapon from the merchant**: EPUB says *"don't waste money on Wakka's Scout weapon; you'll find a freebie soon."* App omits this shopping advice.
   - **Valefor Earthquake immunity at sub-2000 HP**: Critical Lord Ochu strategy tip missing.
   - **Wake Lord Ochu with physical attacks (not spells) when sleeping**: Present in EPUB, app gives misleading version.
   - **NulBlaze Shield conditional reward**: Missing entirely.
   - **Kilika Temple: Dona encounter**: EPUB mentions *"head back toward the door for another encounter with Dona and her guardian"* -- minor flavor, LOW priority.

10. **[LOW] [F. Missable Warnings]** The Red Armlet is correctly flagged as missable in both the `missables` array and the item entry. The EPUB confirms: *"Open the chest inside the newly revealed area to obtain the Red Armlet."* The app's warning text is clear: "Cannot return to Kilika Temple after leaving — this is permanently missable." No missing missable warnings.

11. **[MEDIUM] [G. Image Assessment]** Per the 1d audit:
    - `image_0031_00.jpeg` is used for BOTH Kilika Port and Kilika Woods sublocations. The 1d audit flagged this as "Questionable -- single image used for 2 sublocations; may be intentional if the guide map covers both." The EPUB page 31 contains content for both areas, so this is a borderline case -- the image may cover a map spanning both zones.
    - `image_0032_00.jpeg` and `image_0032_01.jpeg` are correctly assigned to Kilika Temple from EPUB page 32.
    - No image from EPUB page 30 is assigned to Kilika. Page 30 contains the Sin/Echuilles boss content (end of S.S. Liki chapter) AND the beginning of Kilika's item/enemy list header. An image from page 30 could potentially enhance the chapter but none exists.

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | Complete | 0 |
| B. Prose Quality | 3.3/5 avg | 2 (Port and Woods prose rated <=3) |
| C. Missing Items | -- | 1 (NulBlaze Shield) |
| D. Boss Strategy | 2/5 avg | 2 (Lord Ochu misleading, Geneaux incorrect mechanics) |
| E. Missing Tips | -- | 4 (Scout shopping, Valefor threshold, sleep mechanic, NulBlaze) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 1 (image_0031 duplicated across 2 sublocations) |

---

## S.S. Winno (slug: ss-winno)
**EPUB Pages**: 33
**Overall Health**: NEEDS WORK

### Findings

1. **[LOW] [A. Sublocation Completeness]** The app has one sublocation: "S.S. Winno". The EPUB covers this as a single area with two informal section headings: "Set Sail to Your Next Adventure" (embarkation from Kilika) and "Master the Legendary Jecht Shot" (deck minigame). The app correctly treats these as one sublocation. No missing areas.

2. **[MEDIUM] [B. Prose Quality]** The app prose (131 words) covers Hi-Potion, Primer, O'aka donation, Jecht Shot, and optional events. However, it contains several problems:
   - **Factual error (Jecht Sphere)**: The prose states *"Also look for the glowing sphere near the stern — this is Jecht Sphere #1, which unlocks Auron's Overdrive Bushido: Dragon Fang."* This is wrong on multiple counts: (a) The EPUB makes no mention of any Jecht Sphere on S.S. Winno; (b) The 1c poptracker data lists no Jecht Sphere for S.S. Winno; (c) The jechtSpheresData.js assigns Jecht Sphere #2 to S.S. Liki (Captain's Cabin), not S.S. Winno; (d) Jecht Sphere #1 is at Zanarkand Ruins. The S.S. Winno prose has fabricated a collectible that does not exist in this location.
   - **Fabricated event (passing drills)**: The prose says *"Talk to the Blitzball players on deck to run passing drills with the team before you arrive at Luca."* The EPUB does not mention any passing drills. It mentions talking to the Luca Goers (Yuna conversation) and overhearing Lulu and Wakka, but no blitzball practice drills.
   - **Second Hi-Potion**: The app lists two Hi-Potions as items, but the EPUB only mentions one: *"Grab a Hi-Potion from the chest in your cabin."* The second Hi-Potion appears to be fabricated.
   - **Missing Lulu/Wakka backstory tip**: The EPUB specifically notes *"Ascend the stairs to the upper deck, where Tidus overhears Lulu and Wakka talking. Only a fraction of the backstory is revealed each time you walk upstairs, so you must do so multiple times to hear it all."* This is absent from the app.
   - **Missing save-before-Jecht-Shot warning**: The EPUB emphasizes *"save at the Save Sphere downstairs"* before attempting the Jecht Shot and warns *"If you fail, well... That was your only chance. Good thing you saved, right?"* The app mentions you can "reload and retry" but doesn't explicitly warn to save first.

   EPUB quote for reference: *"Head to the deck to view a number of optional events and pick up Al Bhed Primer vol. V from the deckhouse near the stairs. Move to Yuna's location at the rear of the boat to break up a conversation between Yuna and the Luca Goers blitzball team."*

   **Rating: 2/5** -- contains fabricated content (Jecht Sphere, passing drills, extra Hi-Potion) and misses key EPUB details.

3. **[HIGH] [C. Missing Items — verification]** Cross-referencing EPUB against app items:
   - Hi-Potion: EPUB mentions 1. App lists 2. **One Hi-Potion is fabricated.**
   - Al Bhed Primer Vol. V: EPUB yes, app yes. Match.
   - The EPUB does not mention any other obtainable items on S.S. Winno.

   **Extra item**: The app's second Hi-Potion (`winno-hi-potion-2`) does not appear in the EPUB and should be removed or verified against an independent game data source.

4. **[HIGH] [E. Missing Tips — Fabricated Content]** The Jecht Sphere reference in the prose is not just a missing tip -- it is fabricated content that directs the player to look for a collectible that does not exist on S.S. Winno. This will cause confusion. The "passing drills" event is similarly fabricated.

5. **[MEDIUM] [E. Missing Tips]** Genuine EPUB tips missing from the app:
   - **Lulu/Wakka backstory (multiple trips upstairs)**: The EPUB notes you must go upstairs multiple times to hear all the backstory. This is a unique mechanic that players could easily miss.
   - **Yuna/Luca Goers conversation**: EPUB describes breaking up a conversation between Yuna and the Luca Goers at the rear of the boat.
   - **Save before Jecht Shot**: Explicit save warning before the one-chance minigame.
   - **Jecht Shot input details**: EPUB describes pressing *"the D-pad in the direction of each line of dialogue that appears on the screen"* -- the app's description is vaguer.

6. **[MEDIUM] [E. Missing Tips — Party Error]** The app lists the party as `["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"]`. Auron does not join the party until Luca. He should not be listed for S.S. Winno. The EPUB makes no mention of Auron during this chapter.

7. **[LOW] [F. Missable Warnings]** The app correctly lists no missables. The EPUB does not flag anything as missable on S.S. Winno. The Jecht Shot is technically a one-time-only attempt (missable minigame), but the EPUB treats it as a retry-via-save situation, not a permanent missable. The app handles this adequately by mentioning reload.

8. **[HIGH] [G. Image Assessment]** Per the 1d audit, both images assigned to S.S. Winno are from wrong EPUB pages:
   - `image_0034_00.jpeg` is from EPUB page 34 (Luca content). The 1d audit flags this as **ERROR**: "EPUB pg 34 is Luca content. No S.S. Winno-specific image exists; this Luca image was likely copied as a placeholder."
   - `image_0035_00.jpeg` is from EPUB page 35 (Luca content). Same error.
   - S.S. Winno has **no correct guide images**. Both are Luca placeholders. The EPUB apparently contains no dedicated screenshot for S.S. Winno (page 33 content has no `<img>` tags).

### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | Complete | 0 |
| B. Prose Quality | 2/5 | 1 (fabricated content, factual errors) |
| C. Missing Items | -- | 1 fabricated item (extra Hi-Potion), 0 missing |
| D. Boss Strategy | N/A | 0 (no bosses, correctly) |
| E. Missing Tips | -- | 5 (Jecht Sphere fabrication, passing drills fabrication, Lulu/Wakka backstory, Yuna/Goers event, party list error) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 2 (both images are from wrong chapter -- Luca placeholders) |

---

## Cross-Chapter Summary

| Chapter | Overall Health | Critical Issues |
|---------|---------------|-----------------|
| S.S. Liki | ACCEPTABLE | Auron/Yuna party error in prose; missing Sinscale management tip |
| Kilika | NEEDS WORK | Geneaux phase 1 mechanics described incorrectly; Lord Ochu strategy misleading; NulBlaze Shield missing from items |
| S.S. Winno | NEEDS WORK | Fabricated Jecht Sphere, fabricated passing drills, fabricated extra Hi-Potion, two wrong images, Auron in party list |

### Priority Fixes (ranked)

1. **S.S. Winno prose: Remove fabricated Jecht Sphere reference** -- directs players to a non-existent collectible
2. **S.S. Winno prose: Remove fabricated passing drills** -- describes an event that doesn't exist
3. **S.S. Winno items: Verify or remove second Hi-Potion** -- EPUB only mentions one
4. **S.S. Winno party: Remove Auron** -- he doesn't join until Luca
5. **Kilika boss: Fix Sinspawn Geneaux phase 1 mechanics** -- app says "only magic" works on shell, EPUB says only Kimahri's piercing weapons work and tentacles absorb magic
6. **Kilika boss: Fix Lord Ochu sleep mechanic** -- app exaggerates "wakes fully healed"; add Valefor sub-2000 HP Earthquake immunity tip
7. **Kilika items: Add NulBlaze Shield** (conditional on Lord Ochu defeat) to Kilika Woods
8. **S.S. Liki prose: Fix "Auron" to "Yuna's aeon"** in Sin's Fin description
9. **S.S. Winno images: Remove or replace** the two Luca placeholder images
10. **S.S. Winno prose: Add Lulu/Wakka backstory tip** (go upstairs multiple times)
