# Wave 2 Audit: Zanarkand Dome, Airship-Sin, Inside Sin

**Agent**: 2h
**Chapters**: zanarkand-dome, airship-sin, inside-sin
**EPUB Pages Reviewed**: 68 (partial, Gagazet tail/Zanarkand transition), 69, 70, 71, 72, 73, 74, 75
**Date**: 2026-04-06

---

## Zanarkand Dome (slug: zanarkand-dome)
**EPUB Pages**: 69, 70, 71
**Overall Health**: ACCEPTABLE

### Findings

1. **[MEDIUM] A. Sublocation Completeness** -- The EPUB clearly describes three distinct areas: the outdoor ruins approach (p69), the Cloister of Trials (p70), and the post-Yunalesca exit + Destruction Sphere return visit (p71). The app collapses these into two sublocations: "Zanarkand Dome Approach" and "Zanarkand Dome Interior". The Cloister of Trials is not a named sublocation despite being a major puzzle section covering an entire EPUB page. The `cloister` field is set to `zanarkand-dome` which may trigger a separate cloister component, but the walkthrough prose in "Zanarkand Dome Interior" only mentions the Cloister in passing ("The Destruction Sphere chest in the Zanarkand Cloister can only be retrieved after you return via airship") and omits the detailed puzzle solution.

2. **[MEDIUM] B. Prose Quality** -- The Approach sublocation prose (91 words) captures the spirit of the EPUB content but omits several specific EPUB details. The EPUB warns about YKT-11 enemies ejecting party members: *"try to eliminate YKT-11s before all other enemies, or they'll eject individual party members from battle with their Thrust Kick!"* and notes *"These foes can't be captured for the Monster Arena, so go ahead and use your best weapons against them."* The app mentions Defender Z and Fallen Monks but skips YKT-11s entirely. The EPUB also describes Fallen Monks being killable with Phoenix Down/Life spell, which the app omits. The Interior prose (76 words) mentions the Lv. 3 Key Sphere but lacks the specific navigation instructions the EPUB provides: *"When you see a layer of road above, search along the east rim of the road to find a path to the upper level treasure chest"* and *"When crossing the debris, look for a path leading down to a rare Lv. 3 Key Sphere."*

3. **[HIGH] C. Missing Items** -- The EPUB lists a **Lv. 3 Key Sphere** in the Approach/Dome area (p69: "a rare Lv. 3 Key Sphere") which is NOT in any sublocation's item list. The Approach sublocation lists Fortune Sphere, Spiritual Targe, 10,000 Gil, Luck Sphere, Friend Sphere. The Interior sublocation lists only Sun Crest. The Lv. 3 Key Sphere is confirmed by the 1a page map: *"Items mentioned: Fortune Sphere, 10,000 Gil, Lv. 3 Key Sphere, Spiritual Targe, Friend Sphere, Luck Sphere, Sun Crest"*. Additionally, the EPUB (p71) mentions the Zanarkand Destruction Sphere yields a **Magistral Rod** (Yuna's weapon): *"Insert it in the slot to the right of the second room's monitor and collect the Magistral Rod."* This is not in any item list. The poptracker data (1c) also confirms a Destruction Sphere chest and additional chest locations in the Dome Interior/Corridor that map to items not captured in the app.

4. **[MEDIUM] D. Boss Strategy -- Spectral Keeper** -- The app strategy (34 words) is extremely terse: "Uses Berserk + Glyph Mines. Remove Berserk with Esuna immediately..." The EPUB (p70) provides a richly detailed strategy covering: the unique 6-platform positioning mechanic, spacing characters one platform apart to avoid AoE counterattacks, the critical role of Lulu's high Evasion, Auron's Mental Break setup, the futility of Bio and status ailments, and aeons lasting only one turn due to glyph mines. Key EPUB quote: *"Its counterattacks hit the three platforms centered on the character who attacked it, so positioning the members of your party a platform away from each other prevents multiple characters from taking damage."* The app's strategy entirely misses the positioning system and does not mention Mental Break, Lulu's role, or Protect strategy.

5. **[LOW] D. Boss Strategy -- Yunalesca** -- The app strategy (139 words) is solid and covers all three phases, the counter-type mechanics (physical -> Darkness, spells -> Silence, special -> Sleep), the Zombie balance, Mega-Death, and Regen/Dispel. This matches the EPUB well. Minor omissions: the EPUB specifies Reflect as protection against Yunalesca's healing spells on zombified characters and notes Holy Water as Zombie cure, while the app doesn't mention specific curative items. HP values in app (24k/48k/60k) match EPUB (24,000/48,000/60,000). Note: The 1c reference lists total Yunalesca HP as 132,000 (sum of all forms), which is consistent.

6. **[LOW] D. Boss Strategy -- Steals missing** -- Spectral Keeper steal (Ether, Turbo Ether) and Yunalesca steal (Stamina Tablet, Farplane Wind) are documented in EPUB stat blocks and 1c data but not mentioned in app strategies.

7. **[MEDIUM] E. Missing Tips** -- The EPUB specifically warns about Fallen Monks being undead (killable with Phoenix Down/Life). It also notes the Zanarkand fiends cannot be captured for Monster Arena -- important for players tracking captures. The app's sgTip is about Yunalesca's status removal, which is useful but not from the EPUB; the EPUB doesn't frame this as a Sphere Grid tip.

8. **[LOW] F. Missable Warnings** -- The Sun Crest missable warning is present and prominently noted. The EPUB confirms: *"a treasure chest containing the Sun Crest at the top of the same staircase"* -- the app correctly flags this. No other missables identified.

9. **[LOW] G. Image Assessment** -- zanarkand-dome has 7 images across 2 sublocations (5 in Approach from EPUB pages 68-69, 2 in Interior from page 71). Note: images from page 68 (image_0068_00 through _03) are technically from the Mt. Gagazet exit / Zanarkand transition page, but assignment is reasonable. Page 70 (Cloister of Trials / Spectral Keeper) has no images in the EPUB, so no gap there. Coverage is good.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 -- Cloister of Trials not a separate sublocation; puzzle solution absent from prose |
| B. Prose Quality | 3/5 | 1 -- Missing YKT-11 warning, Fallen Monk undead trick, specific navigation cues |
| C. Missing Items | -- | 2 -- Lv. 3 Key Sphere, Magistral Rod (Destruction Sphere) |
| D. Boss Strategy | 3.5/5 | 1 -- Spectral Keeper far too brief (34 words vs ~200 in EPUB); Yunalesca good |
| E. Missing Tips | -- | 2 -- Fallen Monk Phoenix Down trick, fiends not capturable |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 0 -- 7 images, good coverage |

---

## Airship-Sin (slug: airship-sin)
**EPUB Pages**: 72 (partial -- "Punch a Hole Through Sin" section), 73
**Overall Health**: NEEDS WORK

### Findings

1. **[HIGH] A. Sublocation Completeness** -- The app has a single sublocation "Airship En Route to Sin" with 58 words of prose. The EPUB clearly describes two phases: the pre-departure briefing (visit Mika on Highbridge, speak to Cid) and then the multi-boss exterior gauntlet with distinct mechanics for each fight (fins from the deck with move-closer/further commands, core fight inside Sin, Overdrive Sin as a time-limited DPS race). A second sublocation for the deck battles would better match the EPUB structure. The EPUB also lists a full item sidebar on page 72 with 20+ items (Phantom Ring, Lv. 3 Key Sphere, HP Sphere, Prism Ball, Mage's Staff, etc.) but these are "Inside Sin" area items listed on the same page, not airship-sin items. The chapter legitimately has zero collectible items on the deck.

2. **[HIGH] B. Prose Quality** -- The single sublocation prose (58 words) is thin for the final gauntlet. EPUB page 72 provides crucial tactical framing: *"The first step of your final journey involves battling a series of four bosses. You can return to the airship to heal, save, and pursue other side quests between the third and fourth battles, if you desire."* The app prose mentions returning between fights but lacks the EPUB's context about meeting Mika and getting "the crucial clue needed to defeat Sin." The boss strategies carry most of the tactical weight, but a walkthrough-level overview of the gauntlet pacing and the return opportunity is inadequate.

3. **[HIGH] D. Boss Strategy -- Left/Right Fin** -- The app strategies (69 and 57 words) miss the EPUB's key tactical mechanic: the move-closer/move-further ship positioning system. EPUB quote: *"Tidus or Rikku can order the ship closer or further away from Sin, and Cid will comply on his next turn. Battling Sin from afar is safest; it uses weaker attacks and often passes its turns without action. However, only Wakka, Lulu, and summoned aeons are capable of damaging it at this range."* The app mentions Gravija but the EPUB does not mention Gravija for the fin fights -- this may be an error in the app (Gravija is not a documented fin attack in the EPUB stat block). The EPUB notes Sin uses **Negation** to strip buffs: *"its Negation ability will remove debuffs like Armor Break and any buffs like Haste"*. App completely omits Negation and the range/distance mechanic.

4. **[HIGH] D. Boss Strategy -- Sinspawn Genais** -- This boss is in the **inside-sin** chapter JSON, not airship-sin, but the EPUB places it in the Sin exterior gauntlet (p73) as the third fight. The app's inside-sin strategy (75 words) has significant errors: it says "Attack the body exclusively" and "kill the cell after the body goes down" -- the EPUB says the opposite: *"concentrate the party's attacks on this foe first"* (the sinspawn/Genais, not Sin). The EPUB also notes Genais curls up and casts Cura when near death (silence it), and that physical attacks against Sin's core need Armor Break. The Genais fight is also incorrectly placed in the inside-sin chapter when it should be in airship-sin per the EPUB gauntlet sequence.

5. **[HIGH] D. Boss Strategy -- Overdrive Sin (Head)** -- The app strategy (35 words) is extremely brief and critically omits the time-limited nature of this fight. EPUB: *"Sin gradually begins opening its mouth, and when it's fully open -- around its 16th turn -- it will use its Giga-Graviton Overdrive to destroy the world. Nothing can save you from Giga-Graviton; it's an instant game over."* The app does not mention Giga-Graviton at all, nor the ~16 turn deadline, which is the defining mechanic of this boss. The app also incorrectly attributes Gravija to the Head -- the EPUB does not list Gravija as a Head attack.

6. **[MEDIUM] D. Boss Strategy -- Sin Core** -- The app treats this as the fourth fight in the exterior gauntlet (HP: 36,000). The EPUB places the Core as part of the Sinspawn Genais encounter (same fight, same stat block: Sin HP 36,000, Genais HP 20,000). The app has the Core as a separate boss entry, which is misleading -- it should be paired with Genais. Additionally, the order in the app is Left Fin -> Right Fin -> Head -> Core, but the EPUB order is Left Fin -> Right Fin -> Sin+Genais -> Overdrive Sin (Head).

7. **[MEDIUM] D. Boss Strategy -- Missing steal data** -- EPUB provides detailed steal info for each Sin fight: Left Fin (Mega-Potion, Supreme Gem), Right Fin (X-Potion, Shining Gem), Genais (Star Curtain, Shining Gem), Sin Core (Stamina Spring), Overdrive Sin (Ether, Supreme Gem). None appear in the app strategies.

8. **[HIGH] C. Missing Items** -- Zero items in the chapter. While the deck fights legitimately have no chest items, the EPUB lists steal items from each boss. The airship-sin chapter should at minimum note the key steals (Supreme Gem from Left Fin, Shining Gem from Right Fin, Star Curtain from Genais, etc.) as boss encounter loot even if not chest items.

9. **[MEDIUM] E. Missing Tips** -- No Sphere Grid tip specific to the Sin fights. The current sgTip is generic prep advice. EPUB-sourced tips missing: the ship positioning mechanic (move closer/further), the Armor Break necessity for physical damage on Sin's core, Genais's Slow vulnerability, and the ~16 turn Giga-Graviton deadline.

10. **[LOW] F. Missable Warnings** -- No missables in this section per EPUB. Correct as-is.

11. **[MEDIUM] G. Image Assessment** -- Only 1 image (image_0073_00.jpeg from EPUB p73). This image is also shared with the airship chapter's Omega Ruins sublocation, which the 1d audit flagged as questionable. EPUB page 72 has image_0072_00.jpeg but that is assigned to the airship chapter's Remiem Temple sublocation. The airship-sin chapter could use the p72 image for the "Punch a Hole Through Sin" section, but this is a minor issue.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | HIGH | 1 -- Single thin sublocation for a multi-phase gauntlet |
| B. Prose Quality | 2/5 | 1 -- 58 words for entire chapter; missing gauntlet overview, Mika meeting |
| C. Missing Items | -- | 0 chest items (correct), but steal loot absent from strategies |
| D. Boss Strategy | 2/5 | 4 -- Ship positioning omitted; Giga-Graviton deadline missing; Genais strategy has errors and is in wrong chapter; boss fight order incorrect |
| E. Missing Tips | -- | 3 -- Ship positioning, Armor Break on Sin core, Giga-Graviton turn limit |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 1 -- Only 1 image; shared with airship/Omega Ruins |

---

## Inside Sin (slug: inside-sin)
**EPUB Pages**: 74, 75
**Overall Health**: CRITICAL

### Findings

1. **[CRITICAL] A. Sublocation Completeness** -- The EPUB describes three distinct areas: **Sea of Sorrow** (p74), **City of Dying Dreams** (p75), and **Tower of Death** (p75). The app has a single sublocation "Inside Sin" that mashes everything together. The poptracker data (1c) confirms both areas with specific chest locations: 5 chests in Sea of Sorrow and 7+ chests in City of Dying Dreams, plus additional items in the Tower of Death. The EPUB has explicit section headings: *"Cross the Sea of Sorrow"* (p74) and *"Explore the City of Dying Dreams"* and *"Prepare for Battle Atop the Tower of Death"* (p75). All three should be separate sublocations.

2. **[HIGH] B. Prose Quality** -- The single sublocation prose (128 words) covers general enemy warnings well (Behemoth King Meteor, Energy Dragons weak to Bio) but lacks the specific area navigation guidance the EPUB provides for both zones. For Sea of Sorrow, the EPUB notes: *"The treasure chests are typically located at the tops of waterfalls, which you can ride down but not climb. To get them, you typically need to take a circuitous route to the top."* For City of Dying Dreams, the EPUB describes the glyph door mechanic: *"search the right-hand wall for a glyph. A message hints that you need to kill 10 fiends to open the door... Beyond that is a third door that demands no less than 15 dead fiends. Your reward for the 35 kills is a single Lv. 4 Key Sphere."* None of this appears in the app. The EPUB also details Demonolith's petrification danger: *"either keep a party member with Stoneproof armor on the front lines or fight exclusively with aeons; otherwise, the Demonolith's Breath attack could petrify the entire party for an immediate game over."* The app mentions neither Demonolith nor the kill-door puzzles.

3. **[CRITICAL] C. Missing Items** -- The app lists only 1 item: Jecht Sphere #10. The EPUB and poptracker data list a massive number of items across both areas. From EPUB page 75 alone: **Lv. 4 Key Sphere** (glyph door reward), **Four-on-One** (Wakka's weapon, on a lift platform), **Defending Bracer**, **20,000 Gil**, **HP Sphere**, **Defense Sphere**, **Laevatein** (Yuna's weapon, in a spiral slide building). From the poptracker (1c), the Sea of Sorrow has at least 5 chests (West Alcove, Atop Western Falls, Northwestern Alcove, Atop Eastern Falls, Eastern Alcove). That is a minimum of **12+ items** missing from the app. Additionally, the Tower of Death has collectible crystals: *"Small colored crystals form around the area... You must run up to these and touch them before they disappear to gain the items contained within (mostly weapons and rare spheres)."* These are not documented.

4. **[HIGH] D. Boss Strategy -- Seymour Omnis** -- The app strategy (95 words) captures the Mortiphasm mechanic but gets key details wrong. The app says *"Destroy all four before casting any spell each round, every round, or your magic will heal him"* and *"they reform at the start of every one of Seymour's turns."* The EPUB says: *"you can force them to rotate by targeting them with attacks or spells"* -- the discs are rotated, not destroyed. The EPUB strategy is about matching/mismatching elemental types via rotation, not destroying Mortiphasms. The app also omits the Ultima trigger: EPUB states *"About halfway through the fight, Seymour casts Dispel on your team. His next action will be the deadly, non-elemental Ultima spell, so swap out your weak characters for ones with over 5,000 HP, or summon an expendable aeon to soak up the damage."* This Dispel -> Ultima sequence is absent from the app. The EPUB also notes Mental Break and Armor Break from Auron, and exploiting elemental weaknesses with Lulu, and Kimahri's Mighty Guard for Shell + Nul shields.

5. **[HIGH] D. Boss Strategy -- Braska's Final Aeon** -- The app strategy (149 words) is the most detailed in the chapter and covers Zombie Attack, Trigger Command talking, aeon Overdrive absorption, and second-form buffing. However, the EPUB adds several important details the app misses: (a) *"do let Jecht use his Overdrive at least once, because it looks awesome"* -- a fun note, minor; (b) Spare Change strategy: *"empty your wallet with the Spare Change ability (100,000 gil for 9999 damage)"*; (c) the EPUB specifies Mega-Potions thrown at a zombified foe as an offensive tactic -- the app mentions this but frames it less clearly; (d) the EPUB notes *"Remember the zombie trick against your final non-aeon foe to speed the battle along"* (referring to Yu Yevon's aeon fights). HP values in app: "60,000 HP" for first form is mentioned in strategy prose, and second form is implied. EPUB confirms 60,000 first form, 120,000 second form. The app strategy doesn't explicitly state the second form's 120,000 HP.

6. **[MEDIUM] D. Boss Strategy -- Yu Yevon** -- The app strategy (21 words) says "Unkillable conventionally -- Yu Yevon has permanent Auto-Life. The game ends the fight automatically after Braska's Final Aeon." This is misleading -- Yu Yevon IS killable (you must kill it to end the game), it just has Auto-Life that you must work around. The EPUB doesn't provide a detailed Yu Yevon strategy but notes it's impossible to lose the remaining battles. The app could note that the player fights their own aeons first (which are zombieable per the EPUB hint), then Yu Yevon with permanent Auto-Life, and that it's functionally unlosable.

7. **[HIGH] D. Boss Strategy -- Sinspawn Genais in wrong chapter** -- As noted in the airship-sin section, Sinspawn Genais is listed under inside-sin in the app JSON but belongs to the Sin exterior gauntlet (EPUB p73). This is a chapter assignment error. The fight occurs before entering Sin, not inside it.

8. **[MEDIUM] D. Boss Strategy -- Missing steal data** -- Seymour Omnis steals (Shining Gem, Supreme Gem) and Braska's Final Aeon steals (Turbo Ether, Elixir per 1c) not mentioned in strategies.

9. **[CRITICAL] E. Missing Tips** -- No Sphere Grid tip at all (`sgTip: null`). The EPUB provides essential endgame tips: Demonolith Stoneproof warning, the kill-door puzzle mechanic, waterfall navigation in Sea of Sorrow, Tower of Death crystal collection mechanic, and the critical note that the final Save Sphere is the last chance to return to the airship. The EPUB also notes Behemoth King's Meteor can be halved with **Protect** (not Shell) and can be avoided entirely with Counterattack or "Catch" weapons -- the app mentions the Meteor danger but not these specific mitigations (it mentions aeons absorbing the hit, which the EPUB also covers).

10. **[MEDIUM] F. Missable Warnings** -- While Inside Sin items technically aren't missable (you can't leave the final dungeon and lose access in the traditional sense), the EPUB explicitly warns: *"The final Save Sphere in the game is near the top of the ramp. This is your last chance to return to the airship and pursue side quests before the finale!"* This "point of no return" warning should be a missable-level alert. The app has no missable warnings for this chapter.

11. **[MEDIUM] G. Image Assessment** -- Only 1 image (image_0074_00.jpeg from EPUB p74, Sea of Sorrow). Page 75 (City of Dying Dreams, Tower of Death, Braska's Final Aeon) has no EPUB images to extract, so coverage is limited by source availability. However, the single image covers only the Sea of Sorrow; the City of Dying Dreams and Tower of Death have no visual reference.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | CRITICAL | 1 -- Three EPUB areas (Sea of Sorrow, City of Dying Dreams, Tower of Death) collapsed into one sublocation |
| B. Prose Quality | 2/5 | 1 -- Missing glyph door puzzles, Demonolith warning, Tower of Death crystal collection, specific navigation for both areas |
| C. Missing Items | -- | 12+ -- Lv. 4 Key Sphere, Four-on-One, Defending Bracer, 20,000 Gil, HP Sphere, Defense Sphere, Laevatein, 5+ Sea of Sorrow chests |
| D. Boss Strategy | 2.5/5 | 3 -- Seymour Omnis Mortiphasm mechanic wrong (rotate vs destroy), Ultima trigger missing; Genais in wrong chapter; BFA missing 2nd form HP |
| E. Missing Tips | -- | 5 -- No sgTip; Demonolith Stoneproof; kill-door puzzle; Protect halves Meteor; point-of-no-return warning |
| F. Missable Warnings | -- | 1 -- No point-of-no-return warning before Tower of Death |
| G. Image Assessment | -- | 0 -- Limited by EPUB source (only 1 image available) |

---

## Cross-Chapter Issue: Sinspawn Genais Placement

The Sinspawn Genais boss is currently in the `inside-sin` chapter JSON but belongs to the Sin exterior gauntlet per the EPUB (p73). It fights alongside the Sin Core in a single combined encounter on the airship deck, before the party enters Sin. It should be moved to `airship-sin`. This also means the app's `airship-sin` boss fight order is wrong:

- **App order**: Left Fin -> Right Fin -> Head -> Core
- **EPUB order**: Left Fin -> Right Fin -> Sin Core + Sinspawn Genais (combined fight) -> Overdrive Sin (Head)

The Head fight ("Overdrive Sin") is actually the final and hardest exterior boss, not the third.

---

## Cross-Chapter Issue: Inside Sin Item Listing on Page 72

EPUB page 72 lists an extensive item sidebar (Phantom Ring, Lv. 3 Key Sphere, HP Sphere, Prism Ball, Mage's Staff, Wicked Cait Sith, Special Sphere, Four-on-One, Defense Sphere, Skill Sphere, Infinity, Hrunting, Elixir, Defending Bracer, Laevatein, Knight Lance, Wizard Lance, 20,000 Gil, Lv. 4 Key Sphere, Attribute Sphere, Stillblade, Wht Magic Sphere). Many of these are Inside Sin chest items and Tower of Death crystal items. The inside-sin chapter has only 1 item (Jecht Sphere #10) tracked. This is the single largest item gap in the entire audit.
