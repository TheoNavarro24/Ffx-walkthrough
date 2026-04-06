# Wave 2 Audit: Djose, Moonflow, Guadosalam
**Agent**: 2d
**EPUB pages reviewed**: 42-46 (with page 44 straddling Djose/Moonflow boundary, page 45 straddling Moonflow/Guadosalam, page 46 straddling Guadosalam/Thunder Plains)

---

## Djose (slug: `djose`)
**EPUB Pages**: 42, 43, 44 (partial -- "Getting the Party Going Again" section)
**Overall Health**: NEEDS WORK

### Findings

1. **[HIGH] [A. Sublocation Completeness]** The EPUB has a distinct "Getting the Party Going Again" section on page 44 that covers the morning after the temple stay: collecting the Switch Hitter from the inn, collecting a Halberd from a Crusader on the bridge, Hi-Potions from a priest, and 10 Potions from a man on the bridge, plus checking on the Chocobo Knights before heading to the Moonflow split. This content is not represented as its own sublocation. It is partially referenced in the Djose Temple prose ("Inn" chest for the priest-blocked chest) and some items from this section appear in the Djose Highroad item list, but the EPUB's narrative sequence between temple completion and Moonflow departure is lost.

2. **[MEDIUM] [B. Prose Quality — Djose Highroad]** Rating: **3/5**. The prose covers Basilisk warnings, Primer XI location, and general item mentions, but omits the EPUB's specific routing advice. The EPUB says: *"The first chest along the route contains two tufts of Phoenix Down. Move directly across the path from this chest and search behind a spiky rock to find the Al Bhed Primer vol. XI."* The app prose mentions the primer behind a spiky rock but doesn't reference the Phoenix Down chest as a landmark. The EPUB also mentions Soft Ring and Variable Steel in the item header but the app prose doesn't mention where to find these items. The Rin's Agency / Stoneproof armor reference in the app appears to be from the Mi'ihen Highroad chapter (Rin's Agency is before Mushroom Rock, not on the Djose Highroad), which is geographically inaccurate for this chapter.

3. **[MEDIUM] [B. Prose Quality — Djose Temple]** Rating: **3/5**. The prose covers Isaaru, side chambers, and the Cloister puzzle conceptually. However, the EPUB has extensive content about the temple exterior (Chocobo Knights, 4000 gil chest on far west side, Ability Spheres behind the inn, Crusader from Besaid encounter) that the app prose only lightly touches. The Cloister walkthrough in the EPUB (page 43) is extremely detailed with step-by-step sphere placement instructions; the app prose hand-waves it as "more layered than Kilika" with minimal detail, relying on the cloister map component instead.

4. **[HIGH] [C. Missing Items]** Multiple EPUB items are missing from the app:
   - **Switch Hitter** (chest in inn, available morning after trial -- EPUB page 44: *"Go back inside and collect the Switch Hitter from the treasure chest, which you can now access."*)
   - **Halberd** (Crusader on bridge north of temple -- EPUB page 44)
   - **Hi-Potion x2** (priest pacing the bridges -- EPUB page 42 lists Hi-Potion x3 in the item header, and page 44 mentions a priest handing over two)
   - **Mega Phoenix** (right chamber of temple -- EPUB page 43: *"the prize is in the chamber to the right: a party-reviving Mega Phoenix"*)
   - **Phoenix Down x2** (first chest on the highroad -- EPUB page 42)
   - **Ether x2** (EPUB page 42 item header lists Ether x2; the app only lists one Ether within the temple section and none in the highroad items. Page 43 confirms an Ether chest in the left chamber.)
   - **Magic Sphere** (Destruction Sphere reward in the Cloister -- EPUB page 43: *"This destroys a section of wall to the east, revealing a treasure chest with a Magic Sphere."* The app lists "Magistral Rod" as the Destruction Sphere reward, but the EPUB clearly says Magic Sphere.)
   - **Soft Ring** and **Variable Steel** appear in the EPUB page 42 item header for Djose Highroad but are listed in the Moonflow chapter's app JSON instead. These may actually belong to the Djose Highroad area in the game (the EPUB header lists them under "DJOSE HIGHROAD"). This is a cross-chapter misattribution.

5. **[MEDIUM] [C. Missing Items]** The Djose Highroad item list in the app includes "1,000 Gil" and "Potion x10" but these appear to come from Mushroom Rock (page 40: *"The chest holds 1000 gil, and the guard gives you 10 Potions!"*), not Djose Highroad. The EPUB page 42 item header lists "4000 GIL" but not 1000 Gil for Djose. The 10 Potions on page 44 bridge section are from the post-temple scene, not the Highroad approach. Item provenance is muddled between chapters.

6. **[LOW] [D. Boss Strategy]** Rating: **N/A**. The app has zero bosses for Djose. The EPUB also has no boss encounters in the Djose chapter (Sinspawn Gui is in Mushroom Rock on page 41; Extractor is in Moonflow on page 45). This is correct -- no bosses are missing.

7. **[MEDIUM] [E. Missing Tips]** The EPUB's "LEARN FROM THE BASILISKS" sidebar (page 42) says: *"Use the Lancet ability to learn one of Kimahri's most devastating Overdrives, Stone Breath. To protect your party, equip Yuna with a Soft Ring so she'll be petrify-proof and can take care of the rest of the party."* The app prose partially covers this (mentions Lancet for Stone Breath, Soft Ring on Yuna) but adds inaccurate advice about "Stoneproof armor from Rin's Agency" which is a Mi'ihen Highroad location, not Djose.

8. **[MEDIUM] [E. Missing Tips]** The EPUB page 44 "Getting the Party Going Again" section mentions checking the Chocobo Knights after crossing the bridges and learning Sphere Grid abilities: the previous page (41) says *"take a moment to learn some new abilities on the Sphere Grid."* The app's `sgTip` about Rikku is good but relates to the post-Operation Mi'ihen beach scene, which is arguably part of the Mushroom Rock chapter (Rikku joins on the beach after the battle, before the Djose Highroad).

9. **[MEDIUM] [G. Image Assessment]** The app assigns `image_0042_00.jpeg` (EPUB page 42, Djose Highroad) -- correct. It also assigns `image_0044_00.jpeg` (EPUB page 44) to the Djose Temple sublocation, but per the 1d audit, page 44 actually straddles the Djose/Moonflow boundary. The image likely shows the Moonflow area map, not Djose Temple content. Meanwhile, page 43 (the Cloister of Trials page) has no image. The Djose Temple assignment of image_0044 is a **MISMATCH** flagged by the image audit.

10. **[LOW] [F. Missable Warnings]** No missables identified in the EPUB for this chapter. The app correctly has an empty `missables` array. The Magistral Rod (Destruction Sphere) is confirmed not missable by the app prose. Correct.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (post-temple bridge section missing as sublocation) |
| B. Prose Quality | 3/5 avg | 2 (both sublocations rated 3/5) |
| C. Missing Items | -- | 8+ items missing or misattributed |
| D. Boss Strategy | N/A | 0 (correctly no bosses) |
| E. Missing Tips | -- | 2 (inaccurate Rin's Agency reference; Sphere Grid tip placement) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 1 (image_0044_00 is a Moonflow-boundary image mislabeled as Djose Temple) |

---

## Moonflow (slug: `moonflow`)
**EPUB Pages**: 44 (partial -- from "MOONFLOW" header), 45 (partial -- through "Reunite with an Old Friend at Guadosalam" which transitions to Guadosalam at North Wharf)
**Overall Health**: NEEDS WORK

### Findings

1. **[HIGH] [A. Sublocation Completeness]** The app has only one sublocation: "Moonflow South Bank". The EPUB covers at least four distinct areas:
   - **South Bank Road** (Belgemine rematch, Lv. 1 Key Spheres, Shelinda encounter, Kimahri's rivals)
   - **South Wharf** (O'aka, shoopuf boarding, 5000 gil behind Lulu, Phoenix Down x2)
   - **Shoopuf Crossing / Extractor Battle** (underwater boss fight)
   - **North Wharf / North Bank** (Save Sphere, O'aka again, Al Bhed Primer XII, Ether chest, Rikku reunion, Mix tutorial, Antidotes, Mega-Potion on road to Guadosalam)

   The 1c poptracker reference confirms 16 distinct location checks across these areas. The app collapses everything into a single sublocation, losing the South Wharf, North Wharf, and North Bank as navigable areas. The app prose is also confusingly titled "South Bank" while describing items and events from both wharves and the north bank.

2. **[MEDIUM] [B. Prose Quality — Moonflow South Bank]** Rating: **3/5**. The prose opens with Kimahri's rivals and the Belgemine duel, which is good. The Ochu warning is good. However, it says *"At the south wharf, grab the 5,000 gil chest behind Lulu before boarding the shoopuf"* -- this is correct per the EPUB. But the prose then jumps to the Extractor fight and stops. Everything after the crossing -- Rikku's reunion at the North Wharf, Al Bhed Primer XII, the Ether chest, the Mix tutorial, the Antidotes and Mega-Potion on the road to Guadosalam -- is completely missing from the walkthrough prose. EPUB quote: *"In the North Wharf, use the Save Sphere and move into the next area. O'aka is only selling medicines, but take this opportunity to stock up on supplies... The Al Bhed Primer vol. XII is on the platform above O'aka. Head west onto the trail, taking the Ether from the treasure chest and speaking to the local Guado as you go."*

3. **[HIGH] [C. Missing Items]** Numerous EPUB items are missing from the app:
   - **Lv. 1 Key Sphere x3** (thin trail east of Shelinda -- EPUB page 44: *"follow a thin trail east of her to find three Lv. 1 Key Spheres"*)
   - **X-Potion** (after Kimahri's rivals -- EPUB page 44)
   - **Lv. 1 Key Sphere x3** (alcove on the right further along the path -- EPUB page 44)
   - **Dragon Scale x2** (reward for defeating Belgemine -- EPUB page 44)
   - **Summoner's Soul** (given by Belgemine win or lose -- key item)
   - **Magic Def Sphere** (narrow path west near road's northern end -- EPUB page 45)
   - **Phoenix Down x2** (at the shoopuf wharf -- EPUB page 45)
   - **5,000 Gil** (behind Lulu at the wharf -- mentioned in prose but not in item list)
   - **Antidote x4** (first chest on right, road to Guadosalam -- EPUB page 45)
   - **Mega-Potion** (chest on path's left side, road to Guadosalam -- EPUB page 45)

   Note: The app lists Soft Ring, Variable Steel, and Bright Bangle as Moonflow items, but these appear in the EPUB's Djose Highroad item header (page 42), not the Moonflow section. This is a cross-chapter misattribution (items likely belong to Djose or the transition zone).

4. **[MEDIUM] [C. Missing Items]** Al Bhed Primer vol. XII is listed as "Primer Vol. XI" in the app (id: `moonflow-primer-xi`). The EPUB page 44 item header lists "AL BHED PRIMER VOL XII" for Moonflow, and page 45 says *"The Al Bhed Primer vol. XII is on the platform above O'aka"* at the North Wharf. Primer XI is at Djose Highroad (EPUB page 42). The app has the wrong primer number.

5. **[MEDIUM] [D. Boss Strategy — Extractor]** Rating: **3/5**. The app strategy mentions Lightningstrike weapons, Haste, and Hi-Potions for depth charges, which aligns with the EPUB. However:
   - **HP is missing from the strategy text.** The 1c reference gives Extractor HP as **4,000** (matches EPUB: "HP: 4000 (600)"). The 1b audit says HP is mentioned but reviewing the actual strategy text, it does not contain an HP number.
   - **Steal data missing**: 1c reference shows Steal: Potion x1 (common), Potion x1 (rare). Not mentioned in strategy.
   - **Drop data missing**: 1c reference shows Drop: Mega Phoenix x1 (common), Mega Phoenix x2 (rare). Not mentioned.
   - **AP not mentioned**: EPUB says AP 660 (990 with Overkill).
   - The EPUB says *"equip Tidus and Wakka with weapons that have the Lightningstrike ability"* which the app faithfully reproduces.

6. **[HIGH] [E. Missing Tips]** Several significant EPUB tips are absent:
   - **Ochu combat strategy**: The EPUB has a dedicated "SURVIVE THE OCHU" sidebar (page 45): *"Their claws inflict poison, but they don't truly become dangerous until they run low on HP. That's when they start using Ochu Dance to inflict conditions like blindness, silence, and confusion on the entire party."* It recommends Cheer, Haste, Slow debuffs, and using Kimahri/Auron/Lulu with Yuna in reserve. The app prose mentions Ochu briefly but lacks the tactical depth.
   - **Belgemine battle strategy**: The EPUB (page 44) gives detailed tactical advice: *"It's best if Yuna and her aeons start this battle in Overdrive mode... summon Ifrit. Unleash Hellfire on Ixion first. If Ixion casts Haste and unleashes consecutive attacks, heal Ifrit with Fire spells. If it looks like Ixion will reach Overdrive first, use Boost."* The app prose is vague ("lead with Ifrit's Hellfire and heal with Fire spells").
   - **Aeon ability teaching**: After Belgemine, EPUB says *"she gives you the Summoner's Soul, which lets you teach new abilities to your aeons. You should be able to teach Cheer, Aim, Focus, and Reflex to all three aeons."* This is a significant gameplay tip missing from the app.
   - **Rikku reunion and Mix tutorial**: EPUB page 45 describes Rikku joining at the North Wharf, the tutorial battle for stealing from chests, and learning Rikku's Overdrive Mix. The app doesn't cover this (the `sgTip` about Rikku is in the Djose chapter instead).
   - **O'aka investment payoff**: EPUB notes *"If you've loaned him money, he is essentially the only merchant in this area offering anything close to a decent value."* The app has `oaka.meeting: true` but no prose about his inventory or investment payoff.
   - **Jecht Sphere**: The 1c poptracker reference lists "South Wharf (Jecht's Sphere) 2nd Visit" for Moonflow. This is a collectible available on return. Not mentioned in the app.

7. **[LOW] [F. Missable Warnings]** No missables identified in the EPUB for this chapter. The app correctly has an empty `missables` array. The Jecht Sphere at the South Wharf (2nd visit) is available on return, not missable.

8. **[CRITICAL] [G. Image Assessment]** Per the 1d image audit, **all three images assigned to the Moonflow chapter are incorrect**:
   - `image_0046_00.jpeg` -- from EPUB page 46 (Guadosalam/Thunder Plains boundary), not Moonflow content
   - `image_0048_00.jpeg` -- from EPUB page 48 (Macalania Woods), not Moonflow content
   - `image_0049_00.jpeg` -- from EPUB page 49 (Macalania Woods), not Moonflow content

   The correct Moonflow image should be `image_0044_00.jpeg` (EPUB page 44, which contains the Moonflow area map/items header). This image is currently assigned only to the Djose chapter's temple sublocation (itself a mismatch). The Moonflow chapter has **zero correct guide images**.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | HIGH | 1 (4 distinct areas collapsed into 1; North Wharf/North Bank missing entirely) |
| B. Prose Quality | 3/5 | 1 (North Wharf and post-crossing content completely absent) |
| C. Missing Items | -- | 10+ missing, 3+ misattributed from Djose, 1 wrong primer number |
| D. Boss Strategy | 3/5 | 1 (Extractor: no HP, no steal/drop, no AP) |
| E. Missing Tips | -- | 6 (Ochu strategy, Belgemine tactics, aeon teaching, Rikku/Mix, O'aka, Jecht Sphere) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | **CRITICAL**: all 3 images are from wrong chapters (0 correct) |

---

## Guadosalam (slug: `guadosalam`)
**EPUB Pages**: 45 (partial -- from "Make Yourself at Home in Guadosalam"), 46 (partial -- through party regrouping before Thunder Plains)
**Overall Health**: NEEDS WORK

### Findings

1. **[MEDIUM] [A. Sublocation Completeness]** The app has a single sublocation "Guadosalam" covering everything. The EPUB distinguishes several narrative areas:
   - **Guadosalam town** (inn, Save Sphere, shops, Customize tutorial, winding paths with chests)
   - **Seymour's Mansion** (the feast, the party members, upper balcony Hi-Potions x2, purple double doors)
   - **Farplane Corridor** (hidden chest with 8 Lightning Marbles)
   - **The Farplane** (Wakka/Lulu scenes, Brotherhood upgrade, Yuna's decision)
   - **Post-Farplane regrouping** (Lulu conversations, Rikku/Kimahri scenes, romance dialogue choice)

   The 1c poptracker reference lists 15 location checks. While a single sublocation is defensible for a small story-focused area, the EPUB clearly has 4-5 distinct zones with unique items in each.

2. **[MEDIUM] [B. Prose Quality — Guadosalam]** Rating: **3/5**. The prose opens well with "Mostly story" framing and mentions the Farplane, Seymour's proposal, and the Brotherhood upgrade. However:
   - The EPUB mentions Rikku's Customize tutorial: *"After Tromell runs off with Yuna, Rikku provides a short tutorial on the Customize option. If you have an excess of Antidotes, Eye Drops, Echo Screens and various other medicines, you can add some useful abilities to the empty slots on your weapons and armor."* This gameplay mechanic introduction is not mentioned in the app.
   - The app says "Primer XIII on the floor" but the EPUB says *"Al Bhed Primer vol. XIII in the room west of the large red doors"* -- both refer to the same item but the app has it labeled as Primer XII in the item list (`guadosalam-primer-xii`). The app prose says "Primer XIII" but the item ID and name say "Al Bhed Primer Vol. XII". **The item list has the wrong primer number.** The EPUB clearly states Primer XII is at the Moonflow North Wharf and Primer XIII is in Guadosalam.
   - The app prose says "Lightning Marbles" but the EPUB says "eight Lightning Marbles" (quantity missing from both prose and item list).
   - The romance dialogue choice (Lulu/Rikku/Yuna) mentioned in the EPUB is not in the app prose.

   EPUB quote: *"During this conversation, Tidus gets to confirm or deny his love for Yuna, or flirt with Lulu or Rikku instead."*

3. **[HIGH] [C. Missing Items]** Several EPUB items are not in the app:
   - **Hi-Potion x2** (hidden chest on upper balcony of Seymour's mansion -- EPUB page 45: *"look for a hidden treasure chest on the upper balcony to get two Hi-Potions"*)
   - **Lightning Marble x8** (hidden chest in Farplane corridor -- EPUB page 46: *"search for a hidden treasure chest containing eight Lightning Marbles"*)
   - **Mega-Potion** (winding paths -- EPUB page 45: *"a few chests in the winding paths of Guadosalam, offering a Mega-Potion and an Elixir"*). The app prose mentions "Mega-Potion" but it is not in the item checklist.
   - **Elixir** (winding paths -- EPUB page 45). The app prose mentions "Elixir" but it is not in the item checklist.
   - The app lists only 3 items (Primer XII, 3000 Gil, Venus Crest). The EPUB has at least 7-8 distinct collectibles.

4. **[MEDIUM] [C. Missing Items — Primer Numbering Error]** The app item list says "Al Bhed Primer Vol. XII" (`guadosalam-primer-xii`) but the EPUB clearly places Primer XIII in Guadosalam (page 45: *"Al Bhed Primer vol. XIII in the room west of the large red doors"*). Primer XII belongs to the Moonflow North Wharf. This is a numbering error in the app.

5. **[LOW] [D. Boss Strategy]** Rating: **N/A**. The app has zero bosses for Guadosalam. The EPUB also has no boss encounters in Guadosalam. The 1c reference confirms no bosses in monsters.json for this chapter. Correct.

6. **[MEDIUM] [E. Missing Tips]**
   - **Customize tutorial**: The EPUB introduces the Customize mechanic here. EPUB page 45: *"If you have an excess of Antidotes, Eye Drops, Echo Screens and various other medicines, you can add some useful abilities to the empty slots on your weapons and armor."* This is a significant gameplay feature unlock that the app doesn't mention.
   - **Sphere monitor**: EPUB page 45: *"The sphere monitor on the room's right side teaches you how to fight the Larva and Iron Giant fiends."* Not in the app.
   - **Shopping advice**: EPUB mentions the item shop on the higher level and O'aka's competitive prices: *"if you've sponsored O'aka (who is also in the shop), he'll be able to beat their prices for most of it. Whoever you choose to patronize, make sure to get some decent gear for Rikku."* The app has `oaka: null` despite O'aka being present in Guadosalam per the EPUB. This is a data error.
   - **Romance dialogue**: EPUB page 46 describes the hidden affection-system choice. Not in the app.
   - **Blitzball recruiting**: EPUB mentions *"There are several blitzball players in town, but unless you've been playing blitzball aggressively, most will still be contracted to the Guado Glories."* Not in the app.

7. **[MEDIUM] [E. Missing Tips — O'aka Data Error]** The app has `oaka: null` for Guadosalam, but the EPUB confirms O'aka is present and selling items: *"if you've sponsored O'aka (who is also in the shop), he'll be able to beat their prices."* The `oaka` field should indicate a meeting here.

8. **[LOW] [F. Missable Warnings]** No missables identified in the EPUB for this chapter. The app correctly has an empty `missables` array. The Venus Crest is available on return. Correct.

9. **[MEDIUM] [G. Image Assessment]** The app assigns `image_0046_00.jpeg` to Guadosalam. Per the 1d audit, EPUB page 46 straddles Guadosalam and Thunder Plains -- the image appears on the same page as the concluding Guadosalam content and the beginning of Thunder Plains (the item list header for Thunder Plains). This is a **borderline** assignment: the image is at least partially relevant to Guadosalam (the Farplane and party regrouping are on this page). However, Guadosalam's main content is on page 45, which has **no image**. Page 46's image likely shows the Thunder Plains area map. The assignment is **questionable but not definitively wrong** since the page does contain Guadosalam content.

10. **[MEDIUM] [C. Missing Items — Venus Crest]** The app lists "Venus Crest (Lulu's Onion Knight)" but the EPUB does not mention the Venus Crest in Guadosalam pages 45-46. The Venus Crest is obtainable in Guadosalam (it's in the Farplane corridor), but it's not called out in the BradyGames walkthrough for this area. The app is arguably more complete than the EPUB here, but the item name in parentheses is wrong -- the Venus Crest is for Lulu's **Onion Knight** celestial weapon, but listing it as "Venus Crest (Lulu's Onion Knight)" in the item name is unusual since the weapon itself is found elsewhere.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (single sublocation for 4-5 distinct EPUB areas; defensible for small area) |
| B. Prose Quality | 3/5 | 1 (Customize tutorial, romance choice, and several details missing) |
| C. Missing Items | -- | 5+ missing (Lightning Marbles x8, Hi-Potion x2, Mega-Potion, Elixir; primer numbering error) |
| D. Boss Strategy | N/A | 0 (correctly no bosses) |
| E. Missing Tips | -- | 5 (Customize mechanic, Sphere monitor, O'aka present, romance, blitzball) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 1 (borderline -- page 46 image straddles Guadosalam/Thunder Plains) |

---

## Cross-Chapter Issues

1. **Primer numbering is shifted by one across all three chapters.** The app assigns Primer XI to Moonflow (should be XII), Primer XII to Guadosalam (should be XIII), and Primer XI is correctly at Djose Highroad in the EPUB but not in the app's Moonflow chapter. This systematic off-by-one error suggests the primers were assigned based on the wrong chapter boundaries during data entry.

2. **Item misattribution between Djose and Moonflow.** The app's Moonflow item list contains Soft Ring, Variable Steel, and Bright Bangle, which appear in the EPUB's Djose Highroad item header (page 42). Conversely, several Moonflow-specific items (Lv. 1 Key Spheres, Dragon Scales, Magic Def Sphere) are missing entirely. The app's Djose item list contains 1000 Gil and Potion x10, which appear to come from Mushroom Rock or the post-temple bridge scene.

3. **Moonflow images are all wrong.** This is the most visible defect: all three guide images in the Moonflow chapter are from unrelated chapters (Guadosalam page 46, Macalania Woods pages 48-49). The correct image (`image_0044_00.jpeg`) is mislabeled as belonging to Djose Temple.

4. **O'aka tracking gap.** O'aka appears at both the Moonflow South Wharf and in Guadosalam's shop, but the app has `oaka: null` for Guadosalam despite EPUB evidence of his presence there.

5. **Rikku's introduction is split awkwardly.** The app puts the `sgTip` about Rikku joining in the Djose chapter, but the EPUB places her reunion at the Moonflow North Wharf (page 45). The Djose chapter's sgTip references Rikku but she doesn't actually join until partway through the Moonflow chapter. This creates a narrative inconsistency.
