# Spira Guide — Build Steps

68 discrete steps organized by phase. Check off as completed.

---

## Phase 1: Foundation
- [x] 1. Install dependencies (react-router, tailwindcss, @tailwindcss/vite, vite-plugin-pwa)
- [x] 2. Configure vite.config.js (Tailwind plugin, path aliases to `@data`, base path, PWA)
- [x] 3. Download Tuffy font files, set up `@font-face`
- [x] 4. Create FFX theme CSS (menu boxes, colors, borders, gradients, gold accents)
- [x] 5. Set up Tailwind (`@import "tailwindcss"` + custom theme variables)
- [x] 6. Set up React Router with `createHashRouter` (landing, chapter, collectibles, settings routes)
- [x] 7. Build AppShell layout (header with search bar + hamburger, main content area, sticky right TOC slot)
- [x] 8. Build ChapterDrawer (slide-out, 4 collapsible story acts, chapter list with progress bars, dashboard header)
- [x] 9. Build Landing page (branding, "Continue", "Next Incomplete", links to hub/settings)
- [x] 10. Build progress dashboard (story %, primers, celestials counts — on landing + drawer)
- [x] 11. Create chapter index data (slugs, names, act groupings, map image paths)
- [x] 12. Set up GitHub Actions deploy workflow
- [x] 13. Verify build + deploy works on GitHub Pages

## Phase 2: Area Page Components
- [ ] 14. Design per-chapter JSON schema — define shape for items, bosses, missables, party, O'aka, SG tips, prose
- [ ] 15. Build ChapterPage shell (assembles sections, provides TOC anchors; use one stub data file for dev)
- [ ] 16. Build useScrollSpy hook + TableOfContents component (sticky right sidebar)
- [ ] 17. Build SubLocation component (collapsible groups with persisted state)
- [ ] 18. Build ItemList with checkboxes + SD item icons
- [ ] 19. Build "show unchecked only" toggle
- [ ] 20. Build MissableAlert component (red banners — top summary + inline)
- [ ] 21. Build BossCard (expandable: compact stats → full strategy + steals/drops + image)
- [ ] 22. Map bosses from `monsters.json` to chapter slugs
- [ ] 23. Build PartyIndicator (character portrait icons showing party changes)
- [ ] 24. Build OakaReminder cards (donation tiers + running total)
- [ ] 25. Build SphereGridTip (inline milestone advice)
- [ ] 26. Build cloister sections (map images + step-by-step solutions)
- [ ] 27. Build ChapterNav (prev/next cards with thumbnail + progress bar)
- [ ] 28. Add optional areas as sub-sections under the Airship chapter

## Phase 2.5: Content
- [ ] 29. Populate Act 1 chapter JSONs — items, sub-locations, missable flags (Zanarkand → Luca, 7 chapters)
- [ ] 30. Populate Act 2 chapter JSONs — items, sub-locations, missable flags (Mi'ihen → Bikanel, 9 chapters)
- [ ] 31. Populate Act 3 chapter JSONs — items, sub-locations, missable flags (Home → Via Purifico, 4 chapters)
- [ ] 32. Populate Act 4 chapter JSONs — items, sub-locations, missable flags (Highbridge → Inside Sin, 7 chapters)
- [ ] 33. Write boss strategy text for Act 1 bosses (Sinspawn Ammes, Klikk, Tros, Echuilles, Oblitzerator, Gui, Garuda, Sin's Fin)
- [ ] 34. Write boss strategy text for Act 2 bosses (Chocobo Eater, Gui 2, Extractor, Spherimorph, Crawler, Seymour 1, Wendigo, Yunalesca path)
- [ ] 35. Write boss strategy text for Act 3 & 4 bosses (Seymour Natus, Evrae, Seymour Flux, Sanctuary Keeper, Yunalesca, Overdrive Sin, Braska's Final Aeon + Jecht)
- [ ] 36. Write cloister of trials solutions for all 6 temples (Besaid, Kilika, Djose, Macalania, Bevelle, Zanarkand Dome)
- [ ] 37. Document party composition changes per chapter (who joins, who leaves, who's available)
- [ ] 38. Document O'aka encounter points and cumulative donation tiers across all meetings
- [ ] 39. Write Sphere Grid milestone tips per chapter (key nodes, overdrive modes, key abilities to unlock)
- [ ] 40. Write walkthrough prose for Act 1 (7 chapters — story beats, strategy notes, key decisions)
- [ ] 41. Write walkthrough prose for Act 2 (9 chapters)
- [ ] 42. Write walkthrough prose for Acts 3 & 4 (11 chapters)
- [ ] 43. Write optional areas content (Remiem Temple, Baaj revisit, Omega Ruins, Monster Arena intro — sub-sections under Airship chapter)
- [ ] 44. Map item icon filenames — match all item names in chapter JSONs to `/img/items/sd/` sprites; flag any missing assets
- [ ] 45. Accuracy QA pass — cross-reference missables, boss HPs, and primer locations against research docs

## Phase 3: Collectibles Hub
- [ ] 46. Build CollectiblesHub page shell
- [ ] 47. Build CelestialTracker (character portraits + 3-step weapon→crest→sigil progress)
- [ ] 48. Build PrimerList (26 primers, missable flags, synced checkboxes)
- [ ] 49. Build JechtSpheres (10 spheres, overdrive unlock milestones)
- [ ] 50. Build CloisterChecklist (6 temples, maps, Anima progress)
- [ ] 51. Build AeonTracker (aeon cards with images, obtained tracking)
- [ ] 52. Add Blitzball note (Wakka's overdrives + Jupiter Sigil only)
- [ ] 53. Wire up checkbox sync between area pages and hub (single source of truth)

## Phase 4: Save System & Settings
- [ ] 54. Build useLocalStorage hook (debounced writes, lazy init)
- [ ] 55. Build useSaveSlot hook (CRUD for unlimited named slots)
- [ ] 56. Build SaveManager UI (create/rename/delete slots, switch active)
- [ ] 57. Build export/import JSON
- [ ] 58. Build SettingsPage (save manager + effect toggles + display prefs)

## Phase 5: Search & Quick Reference
- [ ] 59. Build search index (bosses, items, primers, celestials, locations)
- [ ] 60. Build SearchBar with instant dropdown results
- [ ] 61. Build QuickRefPanel (pullout from any page)
- [ ] 62. Build ElementalChart, StatusEffects, KeyItems reference content

## Phase 6: Polish & Deploy
- [ ] 63. Build pyrefly page transition (CSS-only dissolve)
- [ ] 64. Build pyrefly celebration burst (completion effect)
- [ ] 65. Configure PWA manifest + icons for iPad home screen install
- [ ] 66. Test offline mode
- [ ] 67. Responsive polish for iPad Pro landscape
- [ ] 68. Final GitHub Pages deployment
