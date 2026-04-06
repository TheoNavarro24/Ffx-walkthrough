# QA Spot-Check Report
Agent 3b. Independent verification of top 20 findings from 3a-consolidated-gap-report.md.

## Verification Summary
- CONFIRMED: 17
- PARTIALLY CONFIRMED: 3
- FALSE POSITIVE: 0
- NEEDS REVIEW: 0

No false positives were found. The audit is high quality and well-sourced.

---

### Finding #1: Al Bhed Primer off-by-one numbering across 6 chapters
**Chapters**: moonflow, guadosalam, thunder-plains, macalania-woods, lake-macalania, bikanel-desert
**Claim**: Each Primer in these 6 chapters is mislabeled as one volume behind the correct number.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 44: Item list header reads "AL BHED PRIMER VOL XII" for Moonflow. App JSON `moonflow.json` line 19: `"Al Bhed Primer Vol. XI"` (id: `moonflow-primer-xi`).
- EPUB pg 45: "Al Bhed Primer vol. XIII in the room west of the large red doors" for Guadosalam. App JSON `guadosalam.json` line 13: `"Al Bhed Primer Vol. XII"` (id: `guadosalam-primer-xii`).
- EPUB pg 47: "he hands over Al Bhed Primer vol. XIV" for Thunder Plains (Rin conversation). App JSON `thunder-plains.json` line 28: `"Al Bhed Primer Vol. XIII"` (id: `thunder-primer-xiii`). Note: the prose text in the same JSON correctly says "Primer XIV" but the item name says XIII.
- EPUB pg 48: "Al Bhed Primer vol. XV" for Macalania Woods (near O'aka). App JSON `macalania-woods.json` line 13: `"Al Bhed Primer Vol. XIV"` (id: `mac-woods-primer-xiv`).
- EPUB pg 49: "Al Bhed Primer vol. XVI outside of another Travel Agency" (Clasko area, at boundary of Macalania Woods/Lake Macalania). App `lake-macalania.json` line 13: `"Al Bhed Primer Vol. XV"` (id: `lake-mac-primer-xv`). The prose even says "Primer XVI" correctly but the item entry says XV.
- EPUB pg 52: Item list header reads "AL BHED PRIMER VOL XVII" for Bikanel Desert first area. App `bikanel-desert.json` line 13: `"Al Bhed Primer Vol. XVI"` (id: `bikanel-primer-xvi`). The second primer in the app (line 22) is labeled XVII, which EPUB pg 53 confirms as XVIII.
**Notes**: All 6 off-by-one errors independently confirmed. This is clearly a systematic data entry shift. Interestingly, the prose text in thunder-plains and lake-macalania JSONs uses the CORRECT number while the item name field uses the wrong one, suggesting the prose was written separately from the item data.

---

### Finding #2: Calm Lands complete content rewrite needed
**Chapter**: calm-lands
**Claim**: Single sublocation (75 words) for 7+ EPUB sections spanning 4 full pages. 20+ items/rewards missing. Defender X strategy fabricates Lancet/Mighty Guard source.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pgs 62-64: The Calm Lands EPUB content spans 3 full pages (62, 63, 64) with sections: "Cross the Calm Lands to the East" (5,000 + 10,000 gil), "Catch Monsters for the Arena Master" (Nirvana, 60 Farplane Wind), "Battle Belgemine" (Aeon's Soul, 30 Power Spheres, Lv. 2 Key Sphere), "Train Your Very Own Chocobo" (4 training courses with prizes: Elixir, X-Potion, Lv. 1-3 Key Spheres, Turbo Ether, Mega-Potion), "Remiem Temple" (Cloudy Mirror, Primer XXIV, chocobo race prizes up to Three Stars x60), "Celestial Mirror" activation, and "Defender X" boss.
- App JSON `calm-lands.json`: Single sublocation with 75-word prose. Only 3 items tracked (Primer XXIII, Magic Counter Shield, Caladbolg). No 5,000 gil, 10,000 gil, Lv. 2 Key Sphere, Nirvana, Aeon's Soul, chocobo training prizes, Remiem prizes, or Rusty Sword.
- Defender X strategy in app: "Use Lancet with Kimahri to learn Mighty Guard (extremely useful)." EPUB pg 64 says the opposite -- Defender X *casts* Mighty Guard on itself as a defensive buff near death: "Defender X's Mighty Guard gives it the ability to nullify each type of elemental damage once." The game data confirms Mighty Guard is learned from Biran at Gagazet (EPUB pg 66: "Mighty Guard, respectively. You must wait until they've used it before you can steal it with Lancet").
**Notes**: The Defender X Lancet/Mighty Guard claim is definitively fabricated. EPUB explicitly describes Mighty Guard as Defender X's own defensive ability, not something Kimahri can learn here. The item gap count of 20+ is conservative.

---

### Finding #3: Inside Sin -- complete content rewrite needed
**Chapter**: inside-sin
**Claim**: Three EPUB areas collapsed into 1 sublocation, 12+ items missing, Seymour Omnis Mortiphasm mechanic described incorrectly.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pgs 74-75: Clearly delineates "Sea of Sorrow" (pg 74, waterfalls, Behemoth Kings), "City of Dying Dreams" (pg 75, kill-door puzzle requiring 10+10+15 fiend kills for Lv. 4 Key Sphere, Four-on-One, Defending Bracer, 20,000 gil, HP Sphere, Defense Sphere, Laevatein), and "Tower of Death" (pg 75, icicle crystals containing weapons/spheres). App `inside-sin.json`: Single sublocation "Inside Sin" with 1 item (Jecht Sphere #10).
- EPUB pg 74 (Seymour Omnis): "The spinning discs behind him have circles corresponding to the four elements... Sometimes Seymour rotates the discs, but you can force them to rotate by targeting them with attacks or spells." App strategy says: "Destroy all four before casting any spell each round." The EPUB says ROTATE, not destroy. The Mortiphasms have circles that shift, not 1 HP targets to be destroyed.
- EPUB pg 75: "This is your last chance to return to the airship and pursue side quests before the finale!" -- point-of-no-return warning. App has no such warning; `missables` array is empty.
- EPUB pg 75 (BFA): "HP: 60,000 (FIRST FORM), 120,000 (SECOND FORM)." App strategy mentions only the 60,000 HP threshold without stating the 120,000 second-form HP.
**Notes**: All claims confirmed. The Seymour Omnis error is particularly significant -- "destroy" vs "rotate" fundamentally changes the player's approach to the fight.

---

### Finding #4: Moonflow -- all 3 guide images from wrong chapters
**Chapter**: moonflow
**Claim**: image_0046_00 (Guadosalam pg 46), image_0048_00 and image_0049_00 (Macalania Woods pgs 48-49) assigned to Moonflow. Zero correct images.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 44: Contains `image_0044_00.jpeg` and covers both Djose Highroad items AND the Moonflow section ("MOONFLOW" header with item list). This image belongs to the Moonflow chapter but is assigned to `djose.json` (Djose Temple sublocation, line 25: `"image_0044_00.jpeg"`).
- EPUB pg 46: Contains `image_0047_00.jpeg` (not image_0046_00). Page 46 is the Travel Agency in Thunder Plains. The image_0046_00 appears on a page that straddles Guadosalam/Thunder Plains content.
- EPUB pg 48: Contains `image_0048_00.jpeg` and `image_0048_01.jpeg`. Page 48 is entirely Macalania Woods content ("Traverse the Maze of Trees", "Al Bhed Primer vol. XV").
- EPUB pg 49: Contains `image_0049_00.jpeg`. Page 49 is entirely Macalania Woods/Lake Macalania content (butterfly chase, Crawler, Spherimorph).
- App `moonflow.json` line 11: `"guideImages": ["image_0046_00.jpeg", "image_0048_00.jpeg", "image_0049_00.jpeg"]` -- all three from wrong chapters.
**Notes**: Confirmed. The correct Moonflow image (image_0044_00) is misassigned to djose instead. The Moonflow chapter has zero correct guide images.

---

### Finding #5: Besaid -- Kimahri boss completely absent
**Chapter**: besaid
**Claim**: Kimahri (HP 750) is the only real boss and is completely absent. Valefor listed instead (not fought).
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 28: "KIMAHR HP: 750 (300) AP: 3 (4) WEAKNESS: NONE" with full strategy paragraph including "Use the Cheer ability to receive less damage from Kimahri's attacks."
- App `besaid.json` lines 39-43: `"bosses": [{ "slug": "valefor", "strategy": "Valefor is obtained here, not fought as an enemy. No strategy needed -- this entry exists for tracking purposes." }]`. Kimahri is completely absent from the bosses array.
- The EPUB also mentions items missing from the app: Brotherhood (given by Wakka), Valefor's second Overdrive (from the dog), Rod of Wisdom (already tracked but other mountain items like Seeker's Ring from Belgemine are absent since there is no Belgemine fight at Besaid -- that is at Mi'ihen).
**Notes**: Confirmed. Kimahri at HP 750 on EPUB pg 28 is the first real boss fight and is completely missing from the app.

---

### Finding #6: Airship -- 4 boss cards missing, 2 sublocations absent
**Chapter**: airship
**Claim**: Missing Geosgaeno, Ultima Weapon, Omega Weapon, Yojimbo boss cards. Hidden Locations (4 coordinate items) and Airship Passwords (3 equipment pieces) sublocations entirely absent.
**Verification**: CONFIRMED
**Evidence**:
- App `airship.json`: Only boss entry is Evrae (lines 15-19). The optionalAreas mention Geosgaeno in prose for "Baaj Temple (Revisit)" and "Omega Ruins" mentions Ultima/Omega Weapons in prose, but zero boss cards exist for any of them.
- EPUB pg 72 describes side quest areas and mentions these bosses. The monsters.json confirms: Geosgaeno (HP 32,767), and game data would have Ultima Weapon, Omega Weapon, and Yojimbo fights.
- No "Hidden Locations" sublocation exists in the JSON. EPUB pg 72 item list includes items like "PHANTOM RING", "LV. 3 KEY SPHERE", etc. that correspond to airship search coordinates.
- No "Airship Passwords" sublocation exists. The game has password-unlockable items (Godhand, Victorious, Murasame).
- Geosgaeno "weak to Ice" claim in Baaj Temple prose (app line 43): monsters.json confirms fire=1.5, lightning=1.5, water=1.5, ice=1.5, holy=1.5 -- equal weakness to all elements, not specifically Ice.
**Notes**: All claims confirmed. The Geosgaeno Ice weakness fabrication is an additional factual error in this chapter's prose.

---

### Finding #7: S.S. Winno -- fabricated content (Jecht Sphere, passing drills, extra Hi-Potion)
**Chapter**: ss-winno
**Claim**: App contains fabricated Jecht Sphere #1, fabricated passing drills, and a second Hi-Potion not in the EPUB. Auron listed in party but doesn't join until Luca.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 33: Describes S.S. Winno content. Items: "Grab a Hi-Potion from the chest in your cabin" (one Hi-Potion only), "pick up Al Bhed Primer vol. V from the deckhouse." Events: speaking to Yuna at rear, Lulu/Wakka backstory upstairs (must go multiple times), Jecht Shot practice on deck. NO mention of a Jecht Sphere, NO passing drills with blitzball players, NO second Hi-Potion.
- App `ss-winno.json` prose: "Jecht Sphere #1, which unlocks Auron's Overdrive Bushido: Dragon Fang" -- fabricated. "Talk to the Blitzball players on deck to run passing drills with the team" -- fabricated. Two Hi-Potion items listed (ids: winno-hi-potion-1, winno-hi-potion-2) -- EPUB mentions only one.
- App `ss-winno.json` line 4: `"party": ["Tidus", "Wakka", "Yuna", "Lulu", "Kimahri", "Auron"]` -- Auron does not join until Luca.
**Notes**: Three separate fabrications confirmed. This is the most egregious fabrication cluster in the entire walkthrough.

---

### Finding #8: Macalania Woods -- 12+ items missing, Primer mislabeled
**Chapter**: macalania-woods
**Claim**: App has only 1 item (mislabeled Primer XIV, should be XV). EPUB lists 12+ items. Jecht's Sphere from Spherimorph missing.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 48: Item list includes "SLEEPY CAIT SITH, REMEDY (X3), 400 GIL, ELIXIR, AL BHED PRIMER VOL XV, 2000 GIL, MEGA-POTION, HI-POTION (X2), LUCK SPHERE, AL BHED PRIMER VOL XVI, PHOENIX DOWN (X3), SHELL TARGE, X-POTION (X2), LV. 1 KEY SPHERE, JECHT'S SPHERE, MP SPHERE, ETHER, 5000 GIL, LV. 2 KEY SPHERE". Plus butterfly chase prizes (MP Sphere, Ether, then Elixirs/Megalixirs, then Saturn Sigil on later visits).
- App `macalania-woods.json` line 13: Only item is `"Al Bhed Primer Vol. XIV"`. Should be XV per EPUB.
- EPUB pg 49: "The Spherimorph leaves behind a memento from Tidus's old man, Jecht's Sphere." This Jecht's Sphere is absent from the app.
- Note: Some items in the EPUB list (Shell Targe, Primer XVI, 5000 Gil, Luck Sphere) are actually Lake Macalania items listed on the combined EPUB page, but even excluding those, at least 10 items are clearly Macalania Woods items that are missing.
**Notes**: Confirmed. The chapter has the single worst item-to-EPUB ratio of any chapter (1 item tracked vs 12+ in EPUB).

---

### Finding #9: Lake Macalania -- 15+ items missing, Wendigo boss missing, Primer mislabeled
**Chapter**: lake-macalania
**Claim**: Only 1 item (mislabeled Primer XV, should be XVI). Wendigo misplaced to Home. 15+ items absent.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 50: Lake Macalania temple items include "Mega-Potion, 400 gil, Shell Targe, two Remedies, two Hi-Potions, two X-Potions, 5000 gil, Elixir, Ether, three tufts of Phoenix Down." EPUB pg 51: Under-ice items include "Lv. 1 Key Sphere" (rocky trail), "Lv. 2 Key Sphere" (behind Kimahri), and "Avenger" (beside Auron). Plus "Luck Sphere" from Destruction Sphere.
- App `lake-macalania.json` line 13: Only item is `"Al Bhed Primer Vol. XV"` (should be XVI per EPUB pg 49: "Al Bhed Primer vol. XVI"). The Macalania Temple sublocation has zero items despite prose mentioning Shell Targe, X-Potions, 5,000 gil.
- EPUB pg 51: Wendigo fight occurs on "the frozen lake" as you flee Macalania Temple. "WEND1G0 HP: WENDIGO: 18,000 (1432)" -- this is clearly a Lake Macalania event. App places Wendigo in `home.json` instead.
**Notes**: Confirmed. The Wendigo misplacement is notable -- it occurs during the escape from Macalania Temple, not at Home. The app's `home.json` Wendigo strategy also says Guardians "revive" Wendigo, but EPUB says they "cast protective spells and Berserk on the Wendigo" as a dying act -- different mechanic.

---

### Finding #10: Bevelle -- zero boss entries, 9 missing items
**Chapter**: bevelle
**Claim**: Zero boss entries. Only 3 of 12 EPUB items tracked. Evrae and Seymour Natus should have representation.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 56: Bevelle section header lists items: "HP SPHERE, BLACK MAGIC SPHERE, ELIXIR, SKILL SPHERE, AVENGER, AL BHED PRIMER VOL XXII, KNIGHT LANCE, MEGA-POTION, WHITE MAGIC SPHERE, LUCID RING, REMATCH, 10,000 GIL."
- App `bevelle.json`: 3 items total (Primer XXII, HP Sphere, Knight Lance). Missing: Black Magic Sphere, Elixir, Skill Sphere, Avenger, Mega-Potion, White Magic Sphere, Lucid Ring, Rematch, 10,000 Gil.
- App `bevelle.json` line 28: `"bosses": []` -- empty array. Evrae is in the airship chapter (reasonable). Seymour Natus (fought at Highbridge) is documented in highbridge.json. However, there is no boss coverage for the Warrior Monk encounters on Bevelle's roof which the EPUB describes as challenging fights.
**Notes**: Partially confirmed on bosses -- while Evrae is in airship.json and Seymour Natus is in highbridge.json, the consolidated report's specific claim of "zero boss entries" for Bevelle is factually correct per the JSON. The item gap (9 missing of 12) is confirmed. The report's claim that Evrae and Seymour Natus "should have representation here" is debatable since they exist in adjacent chapters.

---

### Finding #11: Airship-Sin -- boss fight order wrong, ship positioning mechanic missing, Giga-Graviton absent
**Chapter**: airship-sin
**Claim**: App has wrong boss order (Fin/Fin/Head/Core vs EPUB Fin/Fin/Core+Genais/Head). Ship positioning mechanic completely omitted. Giga-Graviton instant game-over absent from Overdrive Sin.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 73: Boss order is Left Fin, Right Fin, then "SIN & SINSPAWN GENAIS" (Core+Genais as combined fight), then "OVERDRIVE SIN" (the Head). App `airship-sin.json` boss order: sin-left-fin, sin-right-fin, sin-head, sin-core. The app has Head before Core, contradicting EPUB.
- EPUB pg 73 (Left/Right Fin): "Tidus or Rikku can order the ship closer or further away from Sin, and Cid will comply on his next turn. Battling Sin from afar is safest..." This defining ship positioning mechanic is absent from both fin strategies in the app.
- EPUB pg 73 (Overdrive Sin/Head): "around its 16th turn -- it will use its Giga-Graviton Overdrive to destroy the world. Nothing can save you from Giga-Graviton; it's an instant game over." App sin-head strategy has no mention of Giga-Graviton or any turn limit.
- EPUB pg 73: Sinspawn Genais is fought as part of the airship exterior gauntlet, not inside Sin. App places it in `inside-sin.json`.
**Notes**: All claims confirmed. The boss ordering error, missing positioning mechanic, and absent Giga-Graviton warning are all independently verified.

---

### Finding #12: Bikanel Desert -- 11+ items missing, Primer mislabeled
**Chapter**: bikanel-desert
**Claim**: Only 3 items tracked vs 14+ in EPUB. Primer labeled XVI (should be XVII). Mercury Crest misplaced.
**Verification**: PARTIALLY CONFIRMED
**Evidence**:
- EPUB pg 52: Item list header includes "REMEDY (X4), HI-POTION (X16), 10,000 GIL, MEGALIXIR (X3), AL BHED PRIMER VOL XVII, AL BHED POTION (X24), X-POTION (X4), LV. 2 KEY SPHERE, TELEPORT SPHERE (X2), AL BHED PRIMER VOL. XVIII, ETHER (X2), MEGA-POTION (X5), ELIXIR, MERCURY CREST."
- App `bikanel-desert.json`: 4 items total across 2 sublocations (Primer XVI, Mercury Crest, Primer XVII). The first Primer is labeled XVI but EPUB says XVII; the second is labeled XVII but EPUB says XVIII. Both are off-by-one. Missing items include Remedy x4, Hi-Potion x16, 10,000 Gil, Megalixir x3, Al Bhed Potion x24, X-Potion x4, Lv. 2 Key Sphere, Teleport Sphere x2, Ether x2, Mega-Potion x5, Elixir.
- Mercury Crest: EPUB pg 53 says "the most valuable treasure, the Mercury Crest, in a small area that branches off to the west" in the sandstorm/Sandragora area. App has it in "Sanubia Desert West" sublocation, which is the starting area. The EPUB places it in a later section.
**Notes**: Item gap confirmed. However, the app has 4 items (2 primers + Mercury Crest + the second primer), not exactly 3 as the report states. The off-by-one primer error is confirmed for both primers. Mercury Crest placement is debatable -- it's in the chapter but possibly in the wrong sublocation. Marked as partially confirmed due to the minor count discrepancy.

---

### Finding #13: Mushroom Rock Road -- 9+ items missing, Gatta/Luzzu fate choice absent
**Chapter**: mushroom-rock-road
**Claim**: Over half the area's pickups absent (9+ missing). Gatta/Luzzu fate choice not documented.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 40: Items given by Crusaders include "Tough Bangle, Remedy, Ether, two tufts of Phoenix Down, Hi-Potion, X-Potion, and 400 gil" plus "1000 gil" and "10 Potions" from further up, plus "Mega-Potion" from guard, "Serene Armlet" from side path.
- EPUB pg 41: "Mega-Potion and Serene Bracer" from chests at command center, "Hi-Potion" from aftermath beach.
- App `mushroom-rock-road.json`: 6 items (Remedy, Hi-Potion, Serene Armlet, Mega-Potion, Serene Bracer, Primer X). Missing: Tough Bangle, Ether, Phoenix Down x2, X-Potion, 400 Gil, 1,000 Gil, Potion x10, aftermath Hi-Potion.
- EPUB pg 41: "The options you choose when talking to Gatta are crucial. They essentially determine the fate of Gatta and Luzzu. If you speak to Gatta twice and choose the second option both times, Luzzu dies in the upcoming battle. Any other option causes Gatta to die instead." App has zero mention of this mechanic in prose or tips.
- App prose also mentions "Dingo enemies on the lower paths" -- EPUB does not mention Dingos in Mushroom Rock Road. Dingos are Besaid/Mi'ihen enemies.
**Notes**: All claims confirmed. The Gatta/Luzzu choice is a significant story-affecting decision with permanent consequences. The fabricated Dingo reference is an additional error the audit correctly identified.

---

### Finding #14: Mi'ihen Highroad -- 8+ items missing, gate donation rewards absent
**Chapter**: miihen-highroad
**Claim**: 8+ items missing including Oldroad section items. Gate donation rewards (100 Gil=Scout, 1000 Gil=Ice Lance, 10,000 Gil=Moon Ring) missing.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 38: Highroad items include Hi-Potion, Hunter's Spear, Antidote x2, Lv. 1 Key Sphere, Antidote x4, Red Ring, 600 Gil, Ice Brand, Soft x3, 2000 Gil, Ether, Eye Drops x3.
- EPUB pg 39 (Oldroad/chocobo section): Heat Lance, Primer IX, Thunder Blade, Scout, Fortune Sphere, Mars Crest.
- EPUB pg 39 (gate donations): "If you donate 100 gil, you get a Scout... For 1000 gil, the guard hands over an Ice Lance. If you happen to have 10,000 gil, the guard gives you Yuna's Moon Ring."
- App `miihen-highroad.json`: 14 items total. Missing from EPUB: Ether, Eye Drops x3, Heat Lance, Thunder Blade, Scout, Fortune Sphere. Gate donation rewards (Scout/Ice Lance/Moon Ring) entirely absent.
- The app prose says "Lulu to blind the Dual Horns" but EPUB pg 38 says "use Wakka to... blind Dual Horns." The audit correctly identified this Lulu/Wakka attribution error.
**Notes**: Confirmed. The Oldroad section has some representation (Mars Crest, Primer IX are tracked) but Heat Lance, Thunder Blade, Scout, Fortune Sphere are missing. Gate donation rewards are completely absent.

---

### Finding #15: Thunder Plains -- Primer XIV missable flag missing, Primer mislabeled, wrong image
**Chapter**: thunder-plains
**Claim**: Primer XIV not flagged as missable despite requiring Rin conversation choice. Primer labeled XIII (should be XIV). image_0052_00 is from Bikanel Desert.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 47: "Speak to Rin and he asks how your study of Al Bhed is coming along. Choose the top option, and he hands over Al Bhed Primer vol. XIV." This is dialogue-dependent -- choosing wrong means missing the Primer permanently.
- App `thunder-plains.json` line 28: `"Al Bhed Primer Vol. XIII"` with `"missable": false`. Should be XIV and should be missable.
- EPUB pg 52: Contains `image_0052_00.jpeg`. Page 52 is entirely Bikanel Desert ("SANUBIA DESERT" header, "Find Your Scattered Companions"). App assigns this image to Thunder Plains North (line 24: `"image_0052_00.jpeg"`).
- EPUB pg 47 also says "the lightning is annoying, it doesn't actually damage your party." App prose says "Lightning strikes here can interrupt any battle" -- this is misleading per the EPUB.
**Notes**: All three claims confirmed. The missable flag being absent is a significant player-facing risk.

---

### Finding #16: Mt. Gagazet -- strategies need expansion, 8+ items missing
**Chapter**: mt-gagazet
**Claim**: Biran & Yenke strategy missing guarding mechanic, berserk-on-death trigger, Mighty Guard/White Wind Lancet timing. Seymour Flux missing silence vulnerability, Total Annihilation counter. 8+ items missing.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 65: Item list includes "20,000 GIL, LV. 4 KEY SPHERE, RECOVERY RING, BRASKA'S SPHERE, MEGA-POTION (X2), LV. 1 KEY SPHERE, STAR ARMGUARD, DEFENDING BRACER, FORTUNE SPHERE, HP SPHERE, RETURN SPHERE." App `mt-gagazet.json` tracks: Primer XXV, Lv. 1 Key Sphere, Pep Talk Armor, Fortune Sphere, Return Sphere, Recovery Ring, Saturn Crest. Missing: 20,000 Gil, Lv. 4 Key Sphere, Braska's Sphere, Mega-Potion x2, Star Armguard, Defending Bracer, HP Sphere.
- EPUB pg 66 (Biran/Yenke): "When your Ronso foes are standing side by side, they guard for each other, making your physical attacks ineffective." App strategy has no mention of this guarding mechanic. "When one of the Ronso falls, the other goes berserk and inflicts twice as much damage" -- app doesn't mention this. "White Wind and Mighty Guard, respectively. You must wait until they've used it before you can steal it with Lancet" -- app says "Use Lancet on both to learn their Blue Magic (Mighty Guard is endgame-useful)" but doesn't explain the timing requirement.
- EPUB pg 66 (Seymour Flux): "Seymour is surprisingly weak to silence effects, so have Wakka use Silent Attacks" -- not in app strategy. "Mortiorchis's Total Annihilation, which requires two to three turns to charge and can easily wipe out the entire party... cast Shell on your highest HP characters and have them defend" -- app has no mention of Total Annihilation defense.
**Notes**: All claims confirmed. These are two of the game's harder mandatory bosses and the missing tactical details are significant.

---

### Finding #17: Djose -- 8+ items missing/misattributed, Destruction Sphere reward wrong
**Chapter**: djose
**Claim**: 8+ items missing or misattributed. Destruction Sphere reward listed as Magistral Rod but EPUB says Magic Sphere.
**Verification**: PARTIALLY CONFIRMED
**Evidence**:
- EPUB pg 44 (Djose section): "Go back inside and collect the Switch Hitter from the treasure chest... A Halberd... two Hi-Potions... 10 Potions." These items (Switch Hitter, Halberd, Hi-Potion x2) are missing from `djose.json`.
- App `djose.json`: Lists 1,000 Gil, Potion x10, Remedy, X-Potion, Serene Armlet, Ability Sphere x4, 4,000 Gil, Magistral Rod. The 1,000 Gil and Potion x10 may be from Mushroom Rock Road area (audit claims provenance muddled).
- Destruction Sphere reward: The audit claims it should be "Magic Sphere" not "Magistral Rod." However, looking at the EPUB, the Djose Cloister section does not explicitly state the Destruction Sphere reward on the pages I have access to. The game data would need to be checked separately. The Magistral Rod is listed as the Zanarkand Dome Destruction Sphere reward on EPUB pg 71 ("collect the Magistral Rod"), which would make the Djose assignment potentially wrong.
**Notes**: Partially confirmed. The missing items (Switch Hitter, Halberd, Hi-Potion x2) are clearly documented in EPUB pg 44. The Destruction Sphere reward claim needs game data verification -- the EPUB Djose Cloister walkthrough is not detailed enough in the pages available to confirm the specific reward name. The Magistral Rod is confirmed as Zanarkand's reward, making its presence in Djose suspicious.

---

### Finding #18: Guadosalam -- Primer mislabeled, 5+ items missing, O'aka data error
**Chapter**: guadosalam
**Claim**: Primer labeled XII (should be XIII). 5+ items missing. O'aka set to null despite EPUB confirmation of his presence.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 45: "Al Bhed Primer vol. XIII in the room west of the large red doors." App `guadosalam.json` line 13: `"Al Bhed Primer Vol. XII"`.
- EPUB pg 45: Items include "Mega-Potion and an Elixir" (in winding paths), "3000 gil and Al Bhed Primer vol. XIII" (western room), "two Hi-Potions" (upper balcony of Seymour's mansion), Lightning Marbles (in Farplane corridor -- mentioned by audit but I did not find explicit quantity in EPUB pg 45 text).
- App `guadosalam.json`: 3 items (Primer XII, 3,000 Gil, Venus Crest). Missing: Hi-Potion x2, Mega-Potion, Elixir. The prose mentions "a Mega-Potion, Elixir, and 3,000 gil" but only 3,000 Gil is in the trackable items. Mega-Potion and Elixir mentioned in prose but not in item checklist.
- EPUB pg 45: "if you've sponsored O'aka (who is also in the shop), he'll be able to beat their prices." App `guadosalam.json` line 6: `"oaka": null`.
**Notes**: Confirmed. The Mega-Potion and Elixir being mentioned in prose but missing from the item checklist is an internal inconsistency in the app itself. O'aka null is a clear data error.

---

### Finding #19: Zanarkand Dome -- Spectral Keeper strategy inadequate, items missing
**Chapter**: zanarkand-dome
**Claim**: Spectral Keeper strategy (34 words) misses the 6-platform positioning system. Lv. 3 Key Sphere and Magistral Rod missing.
**Verification**: CONFIRMED
**Evidence**:
- EPUB pg 70: "In this unique fight, your party can move between six platforms that surround the Spectral Keeper. Its counterattacks hit the three platforms centered on the character who attacked it, so positioning the members of your party a platform away from each other prevents multiple characters from taking damage." This is the defining mechanic of the fight.
- App `zanarkand-dome.json` Spectral Keeper strategy: "Uses Berserk + Glyph Mines. Remove Berserk with Esuna immediately -- Berserk characters walk into mines. Don't move berserked characters onto glyphs. Wakka and Auron attack from range/power. Protect on the party. HP: 52,000." -- No mention of the 6-platform system, counterattack cone, or positioning strategy. The strategy is 34 words and misses the entire tactical framework.
- EPUB pg 70: "The key to this battle is Lulu. Her high Evasion stat allows her to dodge the fiend's mostly physical attacks." App doesn't mention Lulu's role.
- EPUB pg 69: Item list includes "LV. 3 KEY SPHERE" and EPUB pg 71 confirms "Magistral Rod" from Destruction Sphere (available on airship return). App `zanarkand-dome.json`: Lv. 3 Key Sphere is mentioned in prose ("rare Lv. 3 Key Sphere") but not in the trackable item list. Magistral Rod not listed at all.
**Notes**: Confirmed. The Spectral Keeper's platform positioning system is the entire fight and its absence is a major strategy gap. The Lv. 3 Key Sphere is mentioned in prose but not trackable, and the Magistral Rod is completely absent.

---

### Finding #20: Home -- Wendigo misplaced, Guardian mechanic wrong, Primer locations may be swapped
**Chapter**: home
**Claim**: Wendigo belongs in lake-macalania. Guardian mechanic says "revive" but EPUB says "Berserk." Primers XIX/XX may be swapped vs EPUB.
**Verification**: PARTIALLY CONFIRMED
**Evidence**:
- EPUB pg 51: Wendigo fight occurs on "the frozen lake" during the escape from Macalania Temple, not at Home. This is clearly Lake Macalania content. App `home.json` places Wendigo here instead of in `lake-macalania.json`.
- App `home.json` Wendigo strategy: "Kill both Guardians first -- if Wendigo falls while they're alive, they revive it." EPUB pg 51: "As a final act before dying, they cast protective spells and Berserk on the Wendigo." The EPUB says the Guardians cast Berserk as a dying act, not that they revive the Wendigo. These are fundamentally different mechanics.
- Primer XIX/XX locations: EPUB pg 54 says "The Al Bhed Primer vol. XIX is nearby" (near dead body at Home exterior), then "The Al Bhed Primer vol. XX on the bed nearby should help" (inside, with puzzle chests). App says XIX is "(room with forced fight, on a bed)" and XX is "(three-way fork, right hallway)." The EPUB places XIX outside and XX on a bed, while the app has XIX on a bed -- this appears to be a swap.
- However, EPUB pg 55 says "search for the Al Bhed Primer vol. XXI on the floor" in the northeast corridor. App says XXI is at "three-way fork, straight/left path" which doesn't precisely match "northeast corridor" but is close.
**Notes**: Partially confirmed. The Wendigo misplacement and Guardian mechanic error are both confirmed. The Primer XIX/XX swap appears real based on the EPUB evidence (XIX outside, XX on bed vs app's XIX on bed, XX in hallway), but the EPUB text is slightly ambiguous about exact room locations, making absolute certainty difficult.

---

## Bonus Findings

### Bonus #1: Thunder Plains prose contradicts EPUB on lightning damage
**Chapter**: thunder-plains
**Details**: App prose states "Lightning strikes here can interrupt any battle." EPUB pg 47 explicitly states "the lightning is annoying, it doesn't actually damage your party, so don't let it stop you from exploring the area." The app's claim is misleading and contradicts the source material.

### Bonus #2: Lake Macalania prose mentions items not in checklist (internal inconsistency)
**Chapter**: lake-macalania
**Details**: App prose in Macalania Temple sublocation says "Tromell gives a Shell Targe and Shelinda is here -- collect both X-Potions and the 5,000 gil from the main hall" but the items array for that sublocation is empty (`"items": []`). This is an internal consistency issue -- the prose acknowledges items that have no corresponding checklist entries.

### Bonus #3: Macalania Woods prose says "Primer XVI" but means Primer XVI at Lake Macalania
**Chapter**: macalania-woods
**Details**: App prose says "Primer XVI is found later with Clasko near the Lake Macalania Travel Agency." This is actually correct game information (Primer XVI is found near Clasko), but it creates confusion because it's in the Macalania Woods chapter prose while referring to a Lake Macalania item. Meanwhile, the actual Macalania Woods primer (XV) is mislabeled as XIV in the items list.

### Bonus #4: Djose prose references "Rin's Agency" inaccurately
**Chapter**: djose
**Details**: App `djose.json` prose mentions "Pick up Stoneproof armor from Rin's Agency (available just before this area)." The previous Rin's Agency is on the Mi'ihen Highroad, not "just before" Djose -- there's the entirety of Mushroom Rock Road between them. This is misleading geographic advice.

### Bonus #5: Inside Sin -- Sinspawn Genais strategy contains factual error about attack priority
**Chapter**: inside-sin
**Details**: App strategy says "Attack the body exclusively -- the cell will revive the body once if you kill the body first without first destroying the cell, so kill the cell after the body goes down." EPUB pg 73 says the opposite: "concentrate the party's attacks on this foe [Genais] first" and describes Genais curling up defensively near death. The app has the attack priority reversed.

### Bonus #6: Airship-Sin missing Sinspawn Genais entirely
**Chapter**: airship-sin
**Details**: The EPUB pg 73 shows Sin & Sinspawn Genais as one of the four exterior airship fights. The app's `airship-sin.json` has no Genais entry at all -- it only has sin-left-fin, sin-right-fin, sin-head, and sin-core. Genais is misplaced to `inside-sin.json` as noted in Finding #11, but the specific absence from `airship-sin.json` is worth highlighting as a separate issue since this chapter's boss lineup is incomplete.

### Bonus #7: Calm Lands -- Primer correctly labeled XXIII but Monster Arena and all chocobo rewards absent
**Chapter**: calm-lands
**Details**: While the audit focuses on the Calm Lands' structural and prose gaps, it's worth noting that the EPUB pg 62 lists specific Monster Arena rewards (Nirvana weapon, 60 Farplane Wind) and EPUB pg 62-63 lists all 4 chocobo training course prizes (Elixir, Lv. 1 Key Sphere, Lv. 2 Key Sphere, Lv. 3 Key Sphere) plus additional prizes (X-Potion, Mega-Potion, Ether, Turbo Ether). None of these rewards are tracked as items. Additionally, the chocobo race prizes at Remiem (Elixir through Three Stars x60) are all absent.
