# Wave 2 Audit: Bikanel Desert, Home, Bevelle

**Agent**: 2f
**Date**: 2026-04-06
**EPUB Pages Reviewed**: 49 (partial, tail end of Macalania), 50-58 (Bikanel through Bevelle Cloister)
**Chapters Audited**: bikanel-desert, home, bevelle

---

## Primer Numbering Clarification

The task brief references "Al Bhed Primers X, XI, XII (Home) and XIII (Bevelle)" as the critical missables. This appears to be a numbering error in the brief. The actual permanently missable primers are:
- **Home**: Vol. XIX, XX, XXI (three interior primers lost when Home is destroyed)
- **Bevelle**: Vol. XXII (floor of Priests' Passage before Cloister save sphere)
- Vol. XVIII (Home exterior) is missable in the sense that you can rush past it, but it is not permanently lost in the same way.

All four of the above are present and correctly flagged in the app. See detailed findings below.

---

### Bikanel Desert (slug: `bikanel-desert`)
**EPUB Pages**: 52-53
**Overall Health**: NEEDS WORK

#### Findings

1. **[HIGH] [A. Sublocation Completeness]** The EPUB describes at least 4 distinct desert zones: the oasis where Tidus wakes up, the path north where companions rejoin (Wakka, then Kimahri/Rikku), the fork area (east/west prongs with separate loot), and the final Sandragora-pit zone in the northwest. The app collapses all of this into just 2 sublocations ("Sanubia Desert West" and "Sanubia Desert East"). This loses significant navigational granularity. EPUB quote: *"Reunite with Kimahri and Rikku... Follow Rikku through the dunes until she reaches another Al Bhed marker that reads 'Home Ahead.'"* -- this is a distinct section with its own items (2 Ethers, 8 Al Bhed Potions) not reflected in the app structure.

2. **[MEDIUM] [A. Sublocation Completeness]** The app's sublocation names ("Sanubia Desert West" and "Sanubia Desert East") do not match the EPUB section headings: "Find Your Scattered Companions", "Reunite with Kimahri and Rikku", "Follow Both Prongs of the Fork", "Fish Treasure Out of the Sandragora Traps". The EPUB uses a progression-based structure while the app uses a geographic split that does not correspond to the actual game areas (poptracker uses "East", "Central", "West" -- the app's "West"/"East" split is the reverse of poptracker naming).

3. **[HIGH] [B. Prose Quality — 2/5]** The walkthrough prose is sparse and mixes up details. The "Sanubia Desert West" prose incorrectly mentions "Primer XVI" and "Mercury Crest" as if they are in this sublocation, but according to the EPUB, Primer XVI is picked up outside the Macalania Travel Agency (page 49) -- not in Bikanel at all. The primers in Bikanel are XVII and XVIII. The Mercury Crest is in the far western Sandragora zone (the other sublocation). EPUB quote for orientation: *"Tidus awakens in a small oasis in the center of a vast desert. Before climbing out, swim to the lower left side to find a sunken treasure chest containing four Remedies."*

4. **[HIGH] [C. Missing Items]** The EPUB item list for Sanubia Desert on page 52 includes: Remedy x4, Hi-Potion x16, 10,000 Gil, Megalixir x3, Al Bhed Primer Vol. XVII, Al Bhed Potion x24, X-Potion x4, Lv. 2 Key Sphere, Teleport Sphere x2, Al Bhed Primer Vol. XVIII, Ether x2, Mega-Potion x5, Elixir, Mercury Crest. The app only has 2 items total across both sublocations: "Al Bhed Primer Vol. XVI" (wrong number -- should be XVII or XVIII) and "Mercury Crest" in West; "Al Bhed Primer Vol. XVII" in East. Missing from the app entirely:
   - Remedy x4 (oasis chest)
   - Hi-Potion x16 (multiple chests)
   - 10,000 Gil
   - Megalixir x3
   - Al Bhed Potion x24 (first aid kits)
   - X-Potion x4
   - Lv. 2 Key Sphere
   - Teleport Sphere x2
   - Ether x2
   - Mega-Potion x5
   - Elixir
   - Al Bhed Primer Vol. XVIII (EPUB clearly places XVIII in the fork area of the desert)

5. **[CRITICAL] [C. Missing Items / F. Missable Warnings]** Al Bhed Primer Vol. XVIII is listed in the EPUB on page 53 as being in the desert fork area. The app has it listed under the `home` chapter as "Al Bhed Primer Vol. XVIII -- outside the main entrance", and the EPUB page 54 confirms "Al Bhed Primer vol. XIX is nearby" at Home. Cross-referencing: the EPUB page 53 mentions "Al Bhed Primer vol. XVIII" in the desert fork section AND the page 52 item list includes it. Meanwhile, page 54 lists "Al Bhed Primer vol. XIX" at Home exterior. The app attributes XVIII to Home exterior, but the EPUB suggests XVIII is in Bikanel Desert and XIX starts at Home. This is either an app error or a discrepancy in how the EPUB/game boundary is drawn. The poptracker data shows the primer pair as "Desert, Central - Near Sign At Northeast Exit (Primer)" and "Desert, Central - Northeast Structure of Northwest Zone (Primer)" for Bikanel, with Home having "Left of Entrance (Primer)" and interior primers. **This needs verification** -- the app's numbering assignment (XVIII at Home) may be wrong.

6. **[HIGH] [D. Boss Strategy — N/A]** The app has zero bosses for Bikanel Desert. The 1c reference shows Dark Ifrit (HD Remaster superboss, HP 1,400,000) is located in Bikanel but is an endgame-only encounter, not part of the story walkthrough. The Zu encounter mentioned in the EPUB is a field enemy, not a boss. No story boss is expected here, but the Zu combat tip from the EPUB is missing: *"Cast Slow on the Zu and Haste on Tidus, and use Delay Attacks to further reduce the amount of actions this deadly foe can take."*

7. **[MEDIUM] [E. Missing Tips]** The EPUB provides several tactical tips not in the app:
   - Zu strategy (Slow + Haste + Delay Attack + Dark)
   - Rikku's importance as Yuna's replacement for healing (Al Bhed Potions) and instant-killing machina
   - Sandragora strategy: fire magic/weapons, Remedies for Confusion, steal Remedies from Sandragora
   - Shadow Gem steal from Sand Worms
   - Cactuar stone mention for later revisit

8. **[LOW] [F. Missable Warnings]** The app's `missables` array is empty. While Bikanel items are not permanently missable (you can return later), the Cactuar stone and some chests are notable. The EPUB mentions: *"take note of the Cactuar stone overlooking a sandstorm-swept region of the area. You can't do anything with it now, but you'll be able to on a later visit."* This foreshadowing would be useful.

9. **[MEDIUM] [G. Image Assessment]** Per 1d audit: image_0052_00.jpeg is correctly assigned to bikanel-desert but also erroneously assigned to thunder-plains. image_0053_00.jpeg is correctly assigned to bikanel-desert but also erroneously assigned to lake-macalania. The bikanel-desert chapter itself has the correct 2 images for its 2 sublocations.

#### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM-HIGH | 2 (only 2 sublocations vs. 4+ EPUB sections; naming mismatch with poptracker) |
| B. Prose Quality | 2/5 | 1 (sparse, contains wrong primer number, missing EPUB detail) |
| C. Missing Items | -- | 12+ (only 3 items tracked vs. 14+ in EPUB) |
| D. Boss Strategy | N/A | 0 (no story boss expected) |
| E. Missing Tips | -- | 5 (Zu strategy, Rikku replacement healer, Sandragora tips, steals, Cactuar stone) |
| F. Missable Warnings | -- | 1 (Primer XVIII location ambiguity) |
| G. Image Assessment | -- | 2 cross-chapter misassignments (not bikanel's fault) |

---

### Home (slug: `home`)
**EPUB Pages**: 54-55 (partial)
**Overall Health**: ACCEPTABLE (with caveats)

#### Findings

1. **[MEDIUM] [A. Sublocation Completeness]** The EPUB describes at least 4 distinct areas: the exterior approach (meeting Cid, first fight), the main corridor with Al Bhed puzzle chests, the living quarters / secret stash area, and the Summoner's Sanctum with stairs. The app consolidates into 2 sublocations ("Home Exterior" and "Home Interior"), which is reasonable but loses the Summoner's Sanctum area. EPUB headings: "Defend Home from the Guado", "Raid the Al Bhed Secret Stash", "Solve Another Pair of Al Bhed Puzzle Chests", "Save the Captives in the Summoner's Sanctum". The "Console the Home Refugees" section covers the airship transition (not Home proper).

2. **[MEDIUM] [B. Prose Quality — 3/5]** The prose is functional but brief (85 + 94 words). It covers the critical primer warnings well but lacks the EPUB's navigational detail. EPUB quote not reflected in app: *"Exit the living quarters and descend the stairs. Move straight up the corridor across the intersection. Another treasure chest in this area contains six more Al Bhed Potions. Move up the northeast corridor and search for the Al Bhed Primer vol. XXI on the floor."* The app says "go RIGHT down the northeast corridor for Primer XXI" but the EPUB says the northeast corridor has Primer XXI -- the direction could be confusing since the app also says "left/straight path for Primer XX" which contradicts the EPUB (the EPUB has XX on the bed in the living quarters, south of main corridor, and XXI in the northeast corridor).

3. **[HIGH] [B. Prose / C. Missing Items]** The app mislabels Primer XX and XXI locations. According to the EPUB:
   - Page 54: "Al Bhed Primer vol. XIX is nearby" (the dead body area outside Home) -- wait, re-reading: "Search the dead body for two Hi-Potions. The Al Bhed Primer vol. XIX is nearby." This is at Home Exterior.
   - Page 54: "The Al Bhed Primer vol. XX on the bed nearby should help." This is in the first interior room (with the forced fight), on a bed.
   - Page 55: "Move up the northeast corridor and search for the Al Bhed Primer vol. XXI on the floor."

   The app says: XIX = "room with forced fight, on a bed", XX = "three-way fork, right hallway", XXI = "three-way fork, straight/left path". This contradicts the EPUB which says **XX is on the bed** (the room with forced fight) and **XXI is in the northeast corridor**. The app has swapped XIX and XX's descriptions: the EPUB has XIX outside (near the dead body) and XX on the bed inside, but the app has XVIII outside and XIX on the bed. **This numbering discrepancy needs resolution** -- the app may be using a different source than the BradyGames guide, or the EPUB OCR may have garbled the numbers.

4. **[MEDIUM] [C. Missing Items]** The EPUB lists several items the app does not track:
   - Hi-Potion x2 (from dead body outside)
   - Al Bhed Potion chest (obscured by smoke in main corridor)
   - Special Sphere (from number-locked Al Bhed chest)
   - Skill Sphere (from question-answer Al Bhed chest)
   - The app has "Lv. 4 Key Sphere" and "Lv. 2 Key Sphere" which match "under the stairs" and "far right before sanctum" from EPUB page 55

5. **[LOW] [C. Missing Items]** The "Chest of Dreams" (choose-your-reward chest) contents are not documented in the app. EPUB page 54 lists the possible contents: Bomb, Elixir, Hi-Potion, Mega Potion, Soft, Chimera, Potion, Remedy, Evil Eye. This is a unique mechanic worth noting.

6. **[MEDIUM] [D. Boss Strategy — 2/5]** The app places Wendigo under the `home` chapter, but this is **incorrect placement**. The Wendigo fight occurs at the frozen lake after escaping Macalania Temple (EPUB page 51: "Regroup Beneath the Ice"), which is `lake-macalania` territory. The 1c game data reference lists Wendigo's location as `['macalania']`. The lake-macalania.json has no Wendigo entry either, so this boss is misplaced. Furthermore, the strategy itself is brief and has an error: it says "Kill both Guardians first -- if Wendigo falls while they're alive, they revive it" -- the EPUB says the Guardians "cast protective spells and Berserk on the Wendigo" as a final act before dying, not that they revive it. The actual strategy from EPUB: *"The Guado Guardians provide most of the challenge in this battle, so summon an aeon to perform an Overdrive attack to dispose of them... As a final act before dying, they cast protective spells and Berserk on the Wendigo."*

7. **[MEDIUM] [E. Missing Tips]** Several tips from the EPUB not in app:
   - Wendigo can be Blinded, put to Sleep, or debuffed with Power Break / Jinx
   - Rikku can instantly KO machina enemies with Steal (mentioned in desert section but applies to Home's machina fights too)
   - Lancet tips: Self-Destruct from Bomb, Fire Breath from Dual Horn, Aqua Breath from Chimera (these are in poptracker data but not in app prose)
   - The puzzle chest solutions (number lock formula and quiz answers) from EPUB pages 54-55

8. **[LOW] [F. Missable Warnings]** The app's missable warnings are comprehensive for the primers. All 4 missable primer entries (XVIII-XXI) are flagged. The prose also warns about permanent loss. This is the strongest aspect of the Home chapter. However, the Al Bhed puzzle chest items (Special Sphere, Skill Sphere) are also permanently missable and not flagged.

9. **[LOW] [G. Image Assessment]** Per 1d audit: image_0054_00.jpeg and image_0054_01.jpeg are both correctly assigned to home only. No cross-chapter misassignment issues. 2 images for 2 sublocations is adequate.

#### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (2 sublocations vs. 4 EPUB sections; Summoner's Sanctum area missing) |
| B. Prose Quality | 3/5 | 1 (functional but brief; primer location descriptions may conflict with EPUB) |
| C. Missing Items | -- | 5 (Hi-Potion x2, smoke-obscured Al Bhed Potion chest, Special Sphere, Skill Sphere, Chest of Dreams) |
| D. Boss Strategy | 2/5 | 1 (Wendigo misplaced from lake-macalania; strategy has factual error about Guardian revive mechanic) |
| E. Missing Tips | -- | 4 (Wendigo debuffs, Lancet targets, machina steal-KO, puzzle solutions) |
| F. Missable Warnings | -- | 1 (puzzle chest items are also permanently missable but not flagged) |
| G. Image Assessment | -- | 0 issues |

---

### Bevelle (slug: `bevelle`)
**EPUB Pages**: 55 (partial transition), 56-58 (partial)
**Overall Health**: NEEDS WORK

#### Findings

1. **[HIGH] [A. Sublocation Completeness]** The EPUB describes several distinct areas for Bevelle: the airship approach with the Evrae boss fight (page 56), the temple rooftop assault through waves of Warrior Monks, the wedding scene area, the Priests' Passage with Primer XXII, the Cloister of Trials (pages 57-58), and the Chamber of the Fayth where Bahamut is acquired. The app has only 2 sublocations: "Priests' Passage" and "Bevelle Cloister of Trials". The Evrae fight (which the EPUB covers as the gateway to Bevelle) is absent -- it is currently in the `airship` chapter. The rooftop assault, Warrior Monk waves, and wedding scene are compressed into a single paragraph in "Priests' Passage". Missing the Bahamut acquisition as a distinct moment.

2. **[HIGH] [B. Prose Quality — 2/5]** Both sublocation prose blocks are very brief (66 + 51 words). The "Priests' Passage" prose mentions "several waves of Warrior Monks on the roof" and "flamethrower monks" but provides none of the EPUB's tactical detail. EPUB quote: *"The Warrior Monks with flamethrowers provide the toughest fight; they can douse the entire party with fire. Always eliminate them first. The second fight consists of two Warrior Monks and a giant machina. Use a Dark Attack or a Smoke Bomb to blind the machina, and then quickly dispose of the Warrior Monks."* The Cloister prose is just a high-level summary with no step-by-step navigation, while the EPUB devotes 2 full pages (57-58) to detailed Cloister instructions.

3. **[CRITICAL] [D. Boss Strategy — 0/5]** The app has **zero bosses** for Bevelle. The 1c game data reference shows **Seymour Natus (HP 36,000)** and **Mortibody (HP 4,000)** are mapped to Bevelle. While Isaaru and Evrae Altana are technically in Via Purifico, and Evrae is on the airship approach, Seymour Natus (fought on the Highbridge after the Cloister) should arguably be referenced here or in the Highbridge chapter. The complete absence of any boss entry is a significant gap. The Evrae fight (HP 32,000) is the gateway to Bevelle and the EPUB covers it on page 56 alongside the Bevelle assault.

4. **[HIGH] [C. Missing Items]** The EPUB page 56 item list for Bevelle includes: HP Sphere, Black Magic Sphere, Elixir, Skill Sphere, Avenger, Al Bhed Primer Vol. XXII, Knight Lance, Mega-Potion, White Magic Sphere, Lucid Ring, Rematch, 10,000 Gil. The app tracks only 3 items: Al Bhed Primer Vol. XXII, HP Sphere, and Knight Lance. Missing:
   - Black Magic Sphere
   - Elixir
   - Skill Sphere
   - Avenger (Tidus's weapon)
   - Mega-Potion
   - White Magic Sphere
   - Lucid Ring
   - Rematch (weapon)
   - 10,000 Gil

   Note: Some of these (Skill Sphere, Lucid Ring, etc.) appear on the EPUB page 58 Cloister map diagram, which shows chest contents along the Cloister paths. These are Cloister rewards the player gets during the trials.

5. **[HIGH] [E. Missing Tips]** The EPUB contains critical combat and navigation tips not in the app:
   - Warrior Monk flamethrower priority ("always eliminate them first")
   - Blinding the YAT-99/giant machina with Dark Attack or Smoke Bomb
   - Detailed Cloister of Trials walkthrough (2 full pages of step-by-step instructions)
   - The Destruction Sphere path is critical for Anima later -- the app mentions this but the EPUB's detailed instructions are needed to actually find it
   - Steal tip: "Steal Lv. 1-2 Key Spheres from enemies in Bevelle" is in the Sphere Grid Tip field but not in the walkthrough prose

6. **[LOW] [F. Missable Warnings]** The app correctly flags Al Bhed Primer Vol. XXII as permanently missable with the note "walk past this and it's gone forever." The Bevelle Cloister Destruction Sphere treasure (Knight Lance, needed for Anima) is also flagged in the item name. This dimension is well-covered. However, the Bevelle chapter represents the last chance to collect Primer XXII before being sent to Via Purifico, and this urgency could be stated more strongly.

7. **[MEDIUM] [E. Missing Tips]** Bahamut acquisition is not mentioned. After the Cloister, Yuna receives Bahamut -- this is one of the most powerful aeons and a major story beat. EPUB: *"After Yuna receives the aeon Bahamut, the party is sentenced to the Via Purifico."*

8. **[MEDIUM] [G. Image Assessment]** Per 1d audit: image_0056_00.jpeg is shared with airship (legitimate -- Evrae approach), image_0058_00.jpeg is correctly assigned only to Bevelle, and image_0059_00.jpeg is assigned to Bevelle Cloister but actually originates from EPUB page 59 (Via Purifico content) -- this is a misassignment. Bevelle should have a page 57 image but none exists in the filesystem for that page. The EPUB page 57 has no image tag, so no image was available to extract.

#### Summary Table
| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | HIGH | 1 (missing rooftop assault area; Evrae approach absent; Bahamut acquisition not a sublocation) |
| B. Prose Quality | 2/5 | 2 (both sublocations extremely brief; no Cloister step-by-step) |
| C. Missing Items | -- | 9 (only 3 of 12 EPUB items tracked) |
| D. Boss Strategy | 0/5 | 1 (zero boss entries; Seymour Natus and arguably Evrae should be here) |
| E. Missing Tips | -- | 5 (flamethrower priority, machina blinding, Cloister steps, Bahamut, key sphere steals) |
| F. Missable Warnings | -- | 0 (Primer XXII and Knight Lance both properly flagged) |
| G. Image Assessment | -- | 1 (image_0059_00 misassigned from Via Purifico) |

---

## Cross-Chapter Issues

### Wendigo Boss Misplacement
The Wendigo boss (18,000 HP + 2 Guado Guardians) is in the `home` chapter JSON but should be in `lake-macalania`. The fight occurs at the frozen lake after escaping Macalania Temple (EPUB page 51). The 1c game data reference maps it to `['macalania']`. The `lake-macalania.json` has no Wendigo entry, meaning this boss is orphaned from its correct chapter.

### Primer XVIII Location Conflict
The app assigns Primer XVIII to Home Exterior ("outside the main entrance"). The EPUB page 52-53 appears to place XVIII in the Bikanel Desert fork area, with XIX starting at Home. The poptracker data has primers in both Bikanel Central and Home Entrance. This discrepancy needs game verification -- the BradyGames guide may differ from the actual in-game placement.

### Primer Numbering in Bikanel
The bikanel-desert.json lists "Al Bhed Primer Vol. XVI" in the "Sanubia Desert West" sublocation. Primer XVI is actually found outside the Macalania Travel Agency (EPUB page 49), not in Bikanel. The primers found in Bikanel Desert are XVII and XVIII. The primersData.js collectible tracker correctly maps XVI to `bikanel-desert` with location "Bikanel -- East", and XVII to `bikanel-desert` with location "Bikanel -- West". This naming is also confusing (the shared primer between S.S. Winno and Bikanel labeled as paired locations complicates things). The chapter JSON and the collectibles tracker may be using different source interpretations.

---

## Al Bhed Primer Missable Coverage -- Thorough Assessment

### Home Primers (XVIII-XXI)
| Primer | In Chapter JSON? | In missables[]? | In primersData.js? | Correctly flagged missable? | Notes |
|--------|-----------------|-----------------|--------------------|-----------------------------|-------|
| XVIII | Yes (Home Exterior) | Yes ("Missable if you rush past") | Yes (missable: true) | Yes | Location matches; severity could be stronger |
| XIX | Yes (Home Interior) | Yes ("PERMANENTLY MISSABLE") | Yes (missable: true) | Yes | App says "on a bed" -- matches EPUB for XX, not XIX (see finding #3 under Home) |
| XX | Yes (Home Interior) | Yes ("PERMANENTLY MISSABLE") | Yes (missable: true) | Yes | App says "right hallway" -- needs verification |
| XXI | Yes (Home Interior) | Yes ("PERMANENTLY MISSABLE") | Yes (missable: true) | Yes | App says "straight/left path" -- needs verification |

### Bevelle Primer (XXII)
| Primer | In Chapter JSON? | In missables[]? | In primersData.js? | Correctly flagged missable? | Notes |
|--------|-----------------|-----------------|--------------------|-----------------------------|-------|
| XXII | Yes (Priests' Passage) | Yes ("PERMANENTLY MISSABLE") | Yes (missable: true) | Yes | Correctly described and flagged |

**Verdict**: All permanently missable primers are present and flagged in both the chapter JSONs and the collectibles tracker. The specific location descriptions for XIX/XX may have swapped identities compared to the EPUB, but all primers are tracked. This is the strongest aspect of these three chapters.

---

## Overall Assessment

| Chapter | Health | Most Critical Issue |
|---------|--------|-------------------|
| bikanel-desert | NEEDS WORK | Only 3 items tracked out of 14+; primer numbering confusion |
| home | ACCEPTABLE | Wendigo misplaced; primer numbering swap possible; puzzle items missing |
| bevelle | NEEDS WORK | Zero bosses; 9 missing items; no Cloister walkthrough |
