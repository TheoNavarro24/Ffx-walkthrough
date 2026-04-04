# FFX Boss Data — DEFINITIVE (from game data mining)

Source: `andreasSchauer/ffx-lookup-tool` monsters.json — 274 monsters, 72 bosses
This is mined from actual game data files, not from guides. These numbers are exact.

## All Story Bosses (in order)

| Boss | Location ID | HP | Overkill | Notes |
|------|------------|-----|----------|-------|
| Sinspawn Ammes | zanarkand | 2,400 | 800 | Tutorial, Dream Zanarkand |
| Klikk | zanarkand | 1,500 | 400 | Baaj Temple underwater |
| Tros | salvage-ship | 2,200 | 600 | Baaj Temple underwater |
| Sin (Fin) | ss-liki | 2,000 | — | S.S. Liki deck |
| Sinspawn Echuilles | ss-liki | 2,000 | 400 | S.S. Liki deck |
| Sinspawn Geneaux (Phase 1) | kilika | 3,000 | — | Shell form |
| Sinspawn Geneaux (Phase 2) | kilika | 3,000 | 1,000 | Exposed |
| Sinspawn Geneaux (Tentacles) | kilika | 450 each | — | x2 |
| Lord Ochu (optional) | kilika | 4,649 | 900 | Kilika Woods |
| Oblitzerator | luca | 6,000 | 600 | Luca stadium |
| Chocobo Eater | mihen | 10,000 | 800 | Mi'ihen Highroad |
| Sinspawn Gui (1st fight) | mushroom-rock | 12,000 | 1,600 | Head: 4,000 |
| Sinspawn Gui (Arms) | mushroom-rock | 800 each | — | x2 |
| Sinspawn Gui (2nd fight) | mushroom-rock | 6,000 | 600 | Head: 4,000 |
| Extractor | moonflow | 4,000 | 600 | Underwater, Tidus+Wakka |
| Spherimorph | macalania | 12,000 | 2,000 | Lake Macalania |
| Crawler | macalania | 16,000 | 4,000 | + Negator (1,000 HP) |
| Seymour (Phase 1) | macalania | 6,000 | — | Macalania Temple |
| Seymour (Phase 2) | macalania | 6,000 | 3,500 | After Anima |
| Anima (Seymour's) | macalania | 18,000 | — | |
| Guado Guardian x2 | macalania | 2,000 each | — | With Seymour |
| Wendigo | home | 18,000 | 1,432 | + 2 Guado Guardians (1,200 each) |
| Evrae | fahrenheit | 32,000 | 2,000 | Airship battle |
| Isaaru's Aeons x3 | via-purifico | varies | — | Yuna solo |
| Evrae Altana | via-purifico | 16,384 | 2,000 | Undead (Phoenix Down!) |
| Seymour Natus | bevelle | 36,000 | 3,500 | + Mortibody (4,000) |
| Defender X | calm-lands | 64,000 | 4,060 | |
| Biran Ronso | gagazet | scales | — | Kimahri solo |
| Yenke Ronso | gagazet | scales | — | Kimahri solo |
| Seymour Flux | gagazet | 70,000 | 3,500 | + Mortiorchis (4,000) |
| Sanctuary Keeper | gagazet | 40,000 | 6,400 | |
| Spectral Keeper | zanarkand-ruins | 52,000 | 8,000 | |
| Yunalesca | zanarkand-ruins | 132,000 total | 10,000 | 3 phases (see below) |
| Sin (Left Fin) | sin | 65,000 | — | |
| Sin (Right Fin) | sin | 65,000 | — | |
| Sin (Head) | sin | 140,000 | — | |
| Sin (Core) | sin | 36,000 | — | |
| Sinspawn Genais | inside-sin | 20,000 | 2,000 | |
| Seymour Omnis | inside-sin | 80,000 | 15,000 | + Mortiphasms (1 HP each) |
| Braska's Final Aeon (Phase 1) | inside-sin | 60,000 | — | |
| Braska's Final Aeon (Phase 2) | inside-sin | 120,000 | 10,000 | Pulls sword, HP doubles |
| Yu Yevon | inside-sin | 99,999 | — | Trivial (auto-life) |

## Yunalesca Phase Breakdown
Note: monsters.json shows Yunalesca as 132,000 total HP. Research snippets suggested 24k/48k/60k = 132k total. This confirms the phase breakdown.
- Phase 1: 24,000 HP
- Phase 2: 48,000 HP  
- Phase 3: 60,000 HP
- Total: 132,000 HP

## Optional Bosses

| Boss | Location | HP | Overkill |
|------|----------|-----|----------|
| Geosgaeno | Baaj Temple | ~32,000 | — |
| Ultima Weapon | Omega Ruins | 99,999 | 15,000 |
| Omega Weapon | Omega Ruins | 999,999 | 15,000 |

## Dark Aeons (HD Remaster only)

| Boss | Location | HP |
|------|----------|-----|
| Dark Valefor | Besaid | 800,000 |
| Dark Ifrit | Bikanel | 1,400,000 |
| Dark Ixion | Thunder Plains | 1,200,000 |
| Dark Shiva | Macalania | 1,100,000 |
| Dark Bahamut | Zanarkand | 4,000,000 |
| Dark Yojimbo | Cavern | 1,600,000 |
| Dark Anima | Mt. Gagazet | 8,000,000 |
| Dark Cindy | Mushroom Rock | 3,000,000 |
| Dark Sandy | Mushroom Rock | 2,500,000 |
| Dark Mindy | Mushroom Rock | 2,000,000 |
| Penance | Calm Lands | 12,000,000 |

## Summary of Handoff Document Errors (FINAL)

| Field | Handoff Value | Actual Value |
|-------|-------------|-------------|
| Tros HP | ~2,800 | 2,200 |
| Sinspawn Ammes location | S.S. Liki | Dream Zanarkand |
| Sinspawn Gui head HP | not specified | 4,000 |
| Wendigo HP | ~32,000 | 18,000 |
| Spectral Keeper HP | ~32,000 | 52,000 |
| Yunalesca HP | "~3 phases" | 24k/48k/60k = 132k total |
| Sin Fins HP | ~50,000 each | 65,000 each |
| Seymour Omnis HP | ~60,000 | 80,000 |
| Braska's Final Aeon | "~2 forms" | Phase 1: 60k, Phase 2: 120k |
| O'aka discount | 50% | 30% |
| Rikku Crest | "Venus Crest?" | Mercury Crest |
| Tidus Crest/Sigil | "Mercury" | Sun Crest / Sun Sigil |
| Kimahri Sigil location | Thunder Plains/Macalania | Macalania Woods only |
