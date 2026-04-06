# Wave 2 Audit: Via Purifico, Highbridge, Calm Lands, Mt. Gagazet

**Agent**: 2g
**Date**: 2026-04-06
**EPUB Pages Reviewed**: 58-68
**Chapters Audited**: 4

---

## Via Purifico (slug: via-purifico)
**EPUB Pages**: 58 (partial), 59, 60 (partial)
**Overall Health**: ACCEPTABLE

### Findings

1. **[LOW] A. Sublocation Completeness** -- The app correctly splits the chapter into two sublocations: "Via Purifico (Yuna's Path)" and "Via Purifico (Tidus's Sewers)." These match the EPUB's two distinct sections: "Solve the Maze of Sorrow" / "Infiltrate the Locked Treasure Room" (Yuna) and "Swim Out of the Channel" (Tidus). The split is clean and covers the EPUB content.

2. **[MEDIUM] B. Prose Quality** -- Yuna's Path prose (87 words) covers the gist but omits the step-by-step glyph activation and teleport pad mechanics described extensively in the EPUB. The EPUB says: *"Continue south from where you found Lulu until you reach a dead end. Collect the Elixir from the treasure chest, and activate the glyph in the rubble. Return north to the last T-intersection and head east."* The app condenses this to "Work your way to the southern dead end to activate the glyph that unlocks the treasure room." Tidus's Sewers prose (80 words) is solid and captures the Phoenix Down strategy and Confuseproof tip, which the EPUB does not even mention (good addition). Rating: **3/5** -- adequate strategy but thin on maze navigation.

3. **[MEDIUM] C. Missing Items** -- The app's Tidus's Sewers sublocation lists "Evade & Counter Armguard (Wakka)" and "Avenger" but is missing **Rematch** (Wakka's weapon). The EPUB (pg 60) explicitly states: *"Continue swimming through the area, collecting the Avenger and Wakka's excellent Rematch from the two treasure chests."* The Rematch is a notable weapon with SOS Overdrive. Additionally, the EPUB mentions an item shop chest at the start of the underwater area ("a blue chest where the trio can purchase items") -- the app mentions this in prose but does not list it as a point of interest.

4. **[LOW] D. Boss Strategy -- Isaaru's Aeons** -- The app strategy (36 words) is extremely terse: "Summon your own version of each -- your Aeons are stronger." The EPUB provides specific aeon-by-aeon tactics: use Bahamut with Blizzara against Grothia (Ice weakness), use Shield against Spathi's countdown to Mega Flare, and heal aeons with their own black magic. HP values not stated in app; 1c reference has Grothia 8,000 / Pterya 12,000 / Spathi 20,000. Rating: **2/5**.

5. **[LOW] D. Boss Strategy -- Evrae Altana** -- The app strategy (87 words) is good and captures both the Phoenix Down kill and the gate-escape mechanic with the trade-off warning about losing items. HP not stated in app; 1c reference shows 16,384. The EPUB also mentions the zombie status explicitly. Steal: Water Gem (EPUB) / Healing Spring (1c rare). The app mentions neither steal. Rating: **3/5**.

6. **[MEDIUM] E. Missing Tips** -- The EPUB mentions the Isaaru fight includes a countdown mechanic on Spathi: *"After using a special attack, Spathi begins a countdown. When the countdown reaches zero, use Shield to reduce damage from the Mega Flare attack."* This tactical detail is missing from the app. Also missing: specific Blue Magic Lancet opportunities from maze enemies, and the fact that Yuna starts underleveled ("Yuna has missed a big chunk of the game and is far behind the other characters").

7. **[LOW] F. Missable Warnings** -- No missables are flagged in the app, which is correct. However, the EPUB warns that using the gate escape in Tidus's sewers permanently locks out the Avenger and Rematch: *"trapping Evrae in the underwater chamber causes the gates to lock behind you, preventing access to the final two items in this area."* The app does mention this in the Evrae Altana strategy but not as a formal missable warning.

8. **[LOW] G. Image Assessment** -- image_0059_00 is correctly assigned to Yuna's Path. Per 1d audit, it is also incorrectly assigned to bevelle and airship chapters (wrong origins), but that is not this chapter's problem. image_0060_00 and image_0060_01 are correctly assigned to Tidus's Sewers. The image_0060_01 duplicate with highbridge is legitimate (boundary page). No missing images.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | GOOD | 0 |
| B. Prose Quality | 3/5 | 1 (maze navigation thin) |
| C. Missing Items | -- | 1 (Rematch weapon) |
| D. Boss Strategy | 2.5/5 avg | 1 (Isaaru very thin, no HP, no specific aeon tactics) |
| E. Missing Tips | -- | 2 (Spathi countdown/Shield, Yuna underleveled) |
| F. Missable Warnings | -- | 0 (gate lockout mentioned in strategy) |
| G. Image Assessment | -- | 0 |

---

## Highbridge (slug: highbridge)
**EPUB Pages**: 60 (partial)
**Overall Health**: ACCEPTABLE

### Findings

1. **[LOW] A. Sublocation Completeness** -- The app has a single "Highbridge" sublocation, which matches the EPUB content. The EPUB covers Highbridge in a small portion of page 60 -- the area between Via Purifico escape and the Seymour Natus fight. The app's single sublocation correctly represents this.

2. **[MEDIUM] B. Prose Quality** -- The app prose (90 words) captures the essentials: two Save Spheres, leveling opportunity, Overdrive preparation, and front-loading damage. The EPUB adds one specific tip not in the app: *"If Yuna can gain enough AP, try to learn the Reflect ability."* This is strategically important because Reflect is a key tool in the Seymour Natus fight. Rating: **3/5** -- functional but missing the Reflect learning tip.

3. **[LOW] C. Missing Items** -- The app has zero items. Checking the EPUB: the Highbridge section on page 60 lists no treasure chest pickups -- items are only obtained from the Seymour Natus fight (steals/drops). The EPUB item list on page 56 for Bevelle includes items from the Cloister and Via Purifico but nothing unique to Highbridge itself. The zero-item state is **correct** for this area. However, the Seymour Natus steal (Tetra Elemental) could be noted.

4. **[LOW] D. Boss Strategy -- Seymour Natus** -- The app strategy (143 words) is the strongest of the four chapters' bosses. It correctly covers: Trigger Commands (dismisses them), Overdrive front-loading, Bio for sustained damage, Reflect on Seymour to redirect Mortibody's Cura, escalating danger (Break/Flare/Protect), and the Mortibody drain strategy. HP is stated in the EPUB as 36,000, and the app correctly does not state it (the boss card pulls from monsters.json which has 36,000 per 1c). The EPUB quote: *"Seymour only gets stronger as his HP dwindles, casting Break spells after losing 1/3 of his HP, and deadly Flare spells when he's lost 2/3 of it."* The app captures this accurately. Steal info (Tetra Elemental per EPUB and 1c) is not mentioned in app strategy. Rating: **4/5**.

5. **[LOW] E. Missing Tips** -- The EPUB recommends learning Reflect before this fight and getting characters into Overdrive. The app mentions Overdrive preparation but not the Reflect-learning tip. Also, the EPUB mentions this is "an extremely good place to level up" -- the app does note the two Save Spheres for leveling.

6. **[LOW] F. Missable Warnings** -- No missables, which is correct. This is a linear boss encounter area.

7. **[LOW] G. Image Assessment** -- image_0060_01 is the sole image, shared with via-purifico. Per 1d audit this is a legitimate boundary-page duplicate. Given Highbridge only spans a partial page, having one image is adequate.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | GOOD | 0 |
| B. Prose Quality | 3/5 | 1 (missing Reflect learning tip) |
| C. Missing Items | -- | 0 (zero items is correct) |
| D. Boss Strategy | 4/5 | 0 |
| E. Missing Tips | -- | 1 (learn Reflect before fight) |
| F. Missable Warnings | -- | 0 |
| G. Image Assessment | -- | 0 |

---

## Calm Lands (slug: calm-lands)
**EPUB Pages**: 61, 62, 63, 64
**Overall Health**: NEEDS WORK

### Findings

1. **[CRITICAL] A. Sublocation Completeness** -- The app has a single sublocation "Calm Lands" to cover 4 full EPUB pages (61-64) that contain at least 7 distinct sections:
   - "Strike Camp and Head West" (Macalania campsite/Jecht Sphere) -- EPUB pg 61
   - "Cross the Calm Lands to the East" (main area, Rin's Agency) -- EPUB pg 62
   - "Catch Monsters for the Arena" (Monster Arena intro) -- EPUB pg 62
   - "Battle Belgemine in the Central Calm Lands" (Belgemine, Aeon's Soul) -- EPUB pg 62
   - "Train Your Very Own Chocobo" (4 training courses) -- EPUB pg 62
   - "Leap Across to Remiem Temple" / "Begin Belgemine's Final Challenges" / "Race Chocobos for the Cloudy Mirror" / "Activating the Celestial Mirror" -- EPUB pg 63
   - "Continue to Mt. Gagazet" / "Explore the Cavern of the Stolen Fayth" -- EPUB pg 64

   The app collapses all of this into a single 75-word paragraph. The EPUB has roughly 1,800+ words of walkthrough content for this chapter. This is the largest content gap in the assigned chapters.

2. **[CRITICAL] B. Prose Quality** -- At 75 words, the single sublocation prose covers only three points: Magic Counter Shield, Monster Arena, and Primer XXIII. It entirely omits:
   - The Macalania campsite section and Jecht's Sphere pickup at the start
   - Rin's Travel Agency
   - Belgemine fight and Aeon's Soul reward
   - Monster Arena mechanics and Nirvana weapon chest
   - All four chocobo training courses and their rewards
   - Remiem Temple (optional but covered in EPUB)
   - Celestial Mirror activation sequence
   - Cavern of the Stolen Fayth
   - Defender X approach details

   EPUB quote (pg 62): *"Catch Monsters for the Arena Master. The Monster Arena owner needs help capturing escaped fiends. If you agree to help him, he sells you weapons with the Capture ability... Your first quest is to collect all nine monster species in the Calm Lands."*

   Rating: **1/5** -- severely truncated, omits the majority of the EPUB content.

3. **[CRITICAL] C. Missing Items** -- The app lists only 3 items. The EPUB item list (pg 61) and walkthrough text mention at least 20+ distinct items. Missing from app:
   - Lucid Ring (Macalania campsite, partially hidden chest)
   - Jecht's Sphere (Macalania Woods west of campsite)
   - 5,000 Gil (southeast corner chest)
   - 10,000 Gil (southeast corner chest)
   - Lv. 2 Key Sphere (behind Al Bhed trading post)
   - Lv. 2 Key Sphere (second one, per EPUB)
   - Fortune Sphere (per EPUB items list)
   - Flexible Arm (per EPUB items list)
   - Aeon's Soul (Belgemine reward)
   - Rusty Sword (gorge bottom, Auron Celestial prereq)
   - Megalixir (per EPUB items list)
   - MP Sphere (per EPUB items list)
   - Farplane Wind x60 (Monster Arena reward)
   - Power Sphere x30 (Belgemine reward)
   - Mega-Potion x2 (per EPUB items list)
   - X-Potion x2 (per EPUB items list)
   - Chocobo Feather (per EPUB items list)
   - Nirvana (Yuna's Celestial Weapon, Monster Arena chest)
   - Al Bhed Primer Vol. XXIV (Remiem Temple area)
   - Al Bhed Primer Vol. XXV (listed on EPUB pg 61 items but actually in Cavern of Stolen Fayth / Mt. Gagazet boundary)
   - Cloudy Mirror (Remiem chocobo race)
   - Chocobo training rewards (Elixir, Lv. 1-3 Key Spheres, X-Potion, Mega-Potion, Ether, Turbo Ether)
   - Chocobo race prizes (Elixir, Megalixir, Wings to Discovery x30, Pendulum x30, Three Stars x60)

   This is at least 20 missing items/rewards.

4. **[MEDIUM] D. Boss Strategy -- Defender X** -- The app strategy (41 words) covers Taunt, Lancet for Mighty Guard, Provoke, and Armor Break. HP is stated as 64,000 (matches 1c reference). However, the EPUB provides a much richer strategy (pg 64): starting party recommendation (Yuna/Tidus/Auron), Haste/Hastega, Protect spells, Mental Break, Lulu's -ga spells, avoiding elemental attacks late in the fight when Mighty Guard is active, and Grand Summon caution. The app's Lancet/Mighty Guard tip is not actually in the EPUB -- the EPUB mentions Mighty Guard as Defender X's own ability, not a Lancet target. (Defender X does not teach Mighty Guard via Lancet; that is learned from Biran.) **Factual error in app**: Defender X is NOT a Lancet source for Mighty Guard. Steal info missing: Lunar Curtain x4 (per 1c). Rating: **2/5**.

5. **[CRITICAL] E. Missing Tips** -- Numerous EPUB-documented tips absent from the app:
   - Monster Arena introduction and Capture weapon purchasing guidance
   - Belgemine fight strategy (summon Ifrit, heal with Fire spells vs Shiva)
   - Chocobo training course details and reward table
   - Remiem Temple chocobo race mechanics and prize table
   - Celestial Mirror activation walkthrough (Macalania Woods woman/husband/child)
   - Cavern of the Stolen Fayth reference (optional Yojimbo, 200,000 gil needed)
   - Rusty Sword location for Auron's Celestial Weapon
   - The EPUB section "Strike Camp and Head West" mentions finding Yuna for the Heartstrings trophy
   - Wantz encounter is NOT mentioned anywhere in the Calm Lands chapter (it belongs in Mt. Gagazet, which has it)

6. **[MEDIUM] F. Missable Warnings** -- The app has two missable warnings: Magic Counter Shield (correct and important) and Duren (Blitzball player, correct). However, the Chocobo training unlocks and Remiem Temple rewards (Moon Sigil, Magus Sisters prerequisites) are time-gated and benefit from early engagement -- these are not strictly missable but are worth noting. The app does not mention that the Caladbolg chest requires winning the Catcher Chocobo minigame first.

7. **[LOW] G. Image Assessment** -- Three images assigned (image_0061_00, image_0062_00, image_0062_01), all correctly sourced per 1d audit. image_0062_00 and image_0062_01 are also shared with the airship chapter for side quest reuse (legitimate). No missing images for the pages covered. EPUB pages 63-64 have image_0064_00 which is assigned to mt-gagazet (correct, as that image covers the Defender X/Gagazet transition).

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | CRITICAL | 1 (single sublocation for 7+ EPUB sections spanning 4 pages) |
| B. Prose Quality | 1/5 | 1 (75 words vs ~1800+ in EPUB) |
| C. Missing Items | -- | 20+ items/rewards missing |
| D. Boss Strategy | 2/5 | 1 (thin strategy, factual error on Lancet/Mighty Guard) |
| E. Missing Tips | -- | 8+ (Monster Arena, chocobo training, Belgemine, Remiem, Celestial Mirror, Cavern, Rusty Sword, Heartstrings) |
| F. Missable Warnings | -- | 0 (existing warnings are correct) |
| G. Image Assessment | -- | 0 |

---

## Mt. Gagazet (slug: mt-gagazet)
**EPUB Pages**: 65, 66, 67, 68
**Overall Health**: NEEDS WORK

### Findings

1. **[MEDIUM] A. Sublocation Completeness** -- The app has two sublocations: "Mountain Trail" and "Mountain Trial / Prominence." The EPUB covers at least 4 distinct areas:
   - "Receive a Cool Reception at Mt. Gagazet" (Ronso homeland, Biran & Yenke) -- pg 65
   - "Make the Dangerous Mt. Gagazet Ascent" (trail chests, Wantz, Seymour Flux) -- pg 66
   - "Receive a Vision from the Fayth Cluster" (Saturn Crest, trials) -- pg 67
   - "Navigate the Half-Submerged Caverns" / "Collect the Cavern Treasures Before Moving On" (underwater area, Sanctuary Keeper) -- pg 67-68

   The app's two sublocations roughly cover these areas but the naming is confusing: "Mountain Trial / Prominence" conflates the Seymour Flux post-battle area with the underwater trials and Sanctuary Keeper. A better split would separate the outdoor trail from the underwater caverns.

2. **[MEDIUM] B. Prose Quality** -- Mountain Trail (113 words) covers Wantz, Primer XXV, enemy types, and Lancet opportunities. Mountain Trial/Prominence (120 words) covers the underwater split, Saturn Crest, and Rikku's Hyper Mighty G mix tip. However, significant EPUB content is missing:

   - The 20,000 Gil chest navigation ("continue north past the ledge until you see a snowy slope")
   - Braska's Sphere location and Auron Overdrive trigger
   - Defending Bracer location
   - Wantz's specific inventory (notably "Lulu's Booster Cactuar")
   - The fayth cluster vision scene walkthrough
   - Trial mechanics (Wakka's ball timing, color-coded light puzzle: Green=Rikku, Blue=Tidus, Orange=Wakka)
   - The warp panel back to Gagazet gates at the Sanctuary Keeper area

   EPUB quote (pg 66): *"Around the next corner, you meet O'aka's brother, Wantz, who's selling some fantastic items, notably Lulu's Booster Cactuar."*

   Rating: **3/5** -- covers the critical points but omits substantial navigation and mechanical details.

3. **[HIGH] C. Missing Items** -- The app lists 7 items across both sublocations. The EPUB and 1c poptracker reference list at least 28 location items. Missing from app:
   - 20,000 Gil (trail chest, pg 65-66)
   - Mega-Potion x2 (barely visible trail chest, pg 66)
   - Braska's Sphere (side path, pg 66; triggers Auron Overdrive)
   - Star Armguard (per pg 65 items list)
   - Defending Bracer (Auron armor, pg 66)
   - HP Sphere (under-path chest, pg 66)
   - Lv. 4 Key Sphere (under-path chest, pg 66)
   - Lv. 1 Key Sphere (first trial reward, pg 67)
   - Elixir (steal from Seymour, pg 66)
   - Various Lancet abilities from Biran/Yenke (tracked in poptracker: Thrust Kick, Self Destruct, Doom, Mighty Guard, Fire Breath, Aqua Breath, Stone Breath, White Wind)

   The app has Lv. 1 Key Sphere listed but many of the trail items are missing. At least 8 physical item pickups are absent.

4. **[MEDIUM] D. Boss Strategy -- Biran & Yenke** -- The app strategy (47 words) covers the basics: stats scale with Kimahri, steal Lv. 3 Key Spheres, use Lancet, focus Yenke then Biran. However, the EPUB (pg 66) provides critical mechanical detail:
   - When Ronso stand side-by-side, they guard for each other (physical attacks ineffective) -- use Lancet, items, Overdrives, or buffs during this phase
   - When one bulldozes Kimahri (separated positioning), free to attack
   - Biran gains Mighty Guard near death, Yenke gains White Wind -- must wait until they use it before Lancet works
   - When one falls, the other goes berserk (double damage) -- heal before delivering finishing blow

   HP is listed as "Varies" (correct, scales to Kimahri). Steals match 1c (Lv. 3 Key Sphere). Rating: **2/5** -- missing the guarding and berserk mechanics.

5. **[MEDIUM] D. Boss Strategy -- Seymour Flux** -- The app strategy (56 words) covers HP (70,000, correct per 1c), Lance of Atrophy + Full Life combo, Haste, and Shooting Star. The EPUB (pg 66) provides much richer detail:
   - Hastega + Protect + Rikku's Mighty G Potion mix (Al Bhed Potion/Remedy + Star/Lunar/Light Curtain)
   - Bio still works for sustained damage
   - Seymour is surprisingly weak to silence -- use Wakka's Silent Attacks
   - Zombie cure requires Holy Water/Remedy (not Esuna)
   - Cross Cleave (~2500 to whole party)
   - Mortiorchis Total Annihilation: requires 2-3 turns to charge, survival requires Shell + Defend
   - Seymour casts Protect/Reflect on himself, bounces Flare -- Dispel immediately

   Steal (Elixir per EPUB and 1c) not mentioned in app. Rating: **2/5** -- missing silence vulnerability, Total Annihilation counter, and Zombie cure detail.

6. **[LOW] D. Boss Strategy -- Sanctuary Keeper** -- The app strategy (101 words) is the most detailed of the three Gagazet bosses. It mentions Mana Breath MP drain, Photon Spray, Tail Sweep, Esuna self-cure near death, and Protect/Haste opening. HP stated as 40,000 (correct per 1c). However, the EPUB (pg 68) describes different mechanics:
   - Bio is effective (app warns against poison as unreliable finisher, which conflicts)
   - Curaga self-healing at half HP -- counter with Reflect (EPUB says this, app does not)
   - Photon Wings causes sleep/silence/darkness/confusion (EPUB is specific; app says "Photon Spray" and describes moderate damage but misses the status effects)
   - Armor Break, Power Break, Mental Break all work (EPUB)

   The app's description of "Mana Breath drains MP" and "Tail Sweep knocks out one row" appear to be inaccurate or confused with other bosses. Sanctuary Keeper's main attacks per the EPUB are Photon Wings (status) and Curaga (self-heal). Steal: Turbo Ether (per 1c), not mentioned in app. Rating: **3/5** -- has detail but some accuracy concerns.

7. **[HIGH] E. Missing Tips** -- Multiple EPUB-documented tips absent:
   - Braska's Sphere is the third sphere for Auron's new Overdrive
   - Wantz's inventory details (Booster Cactuar for Lulu)
   - Trial puzzle mechanics (ball timing, color-coded lights: Green=Rikku, Blue=Tidus, Orange=Wakka)
   - Warp panel at Sanctuary Keeper area for backtracking to Gagazet gates
   - Seymour Flux silence vulnerability (Wakka Silent Attacks)
   - Zombie cure requires Holy Water/Remedy, NOT Esuna
   - Total Annihilation countdown defense (Shell + Defend)
   - Rikku's Mighty G Potion mix recipe for Seymour Flux

8. **[LOW] F. Missable Warnings** -- The Wantz encounter is correctly flagged as a missable warning. This is the most important missable in this chapter. No additional missables are missing.

9. **[LOW] G. Image Assessment** -- Five images assigned across two sublocations. Mountain Trail has image_0064_00, image_0065_00, image_0065_01; Mountain Trial/Prominence has image_0066_00, image_0067_00. All correctly sourced per 1d audit. EPUB pg 68 images (image_0068_00 through image_0068_03) are assigned to zanarkand-dome, which is correct as the Sanctuary Keeper is at the boundary. No issues.

### Summary Table

| Dimension | Rating | Issues |
|-----------|--------|--------|
| A. Sublocation Completeness | MEDIUM | 1 (confusing naming, could benefit from 3 sublocations) |
| B. Prose Quality | 3/5 | 1 (missing navigation details, Braska's Sphere, trial mechanics) |
| C. Missing Items | -- | 8+ physical items missing |
| D. Boss Strategy | 2.3/5 avg | 2 (Biran/Yenke and Seymour Flux both thin; Sanctuary Keeper has accuracy concerns) |
| E. Missing Tips | -- | 8 (trial puzzles, silence vulnerability, Total Annihilation counter, mix recipes, Wantz inventory, etc.) |
| F. Missable Warnings | -- | 0 (Wantz correctly flagged) |
| G. Image Assessment | -- | 0 |

---

## Cross-Chapter Summary

| Chapter | Overall Health | Prose (avg) | Boss (avg) | Missing Items | Missing Tips | Critical Issues |
|---------|---------------|-------------|------------|---------------|--------------|-----------------|
| Via Purifico | ACCEPTABLE | 3/5 | 2.5/5 | 1 | 2 | 0 |
| Highbridge | ACCEPTABLE | 3/5 | 4/5 | 0 | 1 | 0 |
| Calm Lands | NEEDS WORK | 1/5 | 2/5 | 20+ | 8+ | 3 (sublocation coverage, prose, items) |
| Mt. Gagazet | NEEDS WORK | 3/5 | 2.3/5 | 8+ | 8 | 0 (but HIGH severity on items and tips) |

### Top Priority Fixes

1. **Calm Lands requires a complete rewrite** -- single 75-word sublocation cannot represent 4 EPUB pages of content. Needs at minimum: main Calm Lands area, Monster Arena introduction, Chocobo Training, and Remiem Temple/Celestial Mirror sublocations. Over 20 items are missing.

2. **Calm Lands Defender X strategy has a factual error** -- claims Lancet from Defender X teaches Mighty Guard. Mighty Guard is learned from Biran Ronso at Mt. Gagazet, not Defender X.

3. **Mt. Gagazet Seymour Flux strategy is dangerously thin** -- missing the Total Annihilation survival counter (Shell + Defend), silence vulnerability, and Zombie cure specifics (Holy Water/Remedy, not Esuna). These omissions could cause wipes.

4. **Mt. Gagazet missing 8+ trail items** -- including 20,000 Gil, Braska's Sphere (Auron Overdrive trigger), Defending Bracer, HP Sphere, Lv. 4 Key Sphere.

5. **Via Purifico missing Rematch** -- Wakka's excellent Rematch weapon from the underwater channels is not listed.

6. **Isaaru aeon strategy needs expansion** -- the current 36-word strategy provides no aeon-specific tactics. At minimum, mention Ice weakness on Grothia and Shield timing against Spathi's Mega Flare countdown.
