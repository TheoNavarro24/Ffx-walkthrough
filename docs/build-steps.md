# Spira Guide — Build Steps

52 discrete steps organized by phase. Check off as completed.

---

## Phase 1: Foundation
- [ ] 1. Install dependencies (react-router, tailwindcss, @tailwindcss/vite, vite-plugin-pwa)
- [ ] 2. Configure vite.config.js (Tailwind plugin, path aliases to `@data`, base path, PWA)
- [ ] 3. Download Tuffy font files, set up `@font-face`
- [ ] 4. Create FFX theme CSS (menu boxes, colors, borders, gradients, gold accents)
- [ ] 5. Set up Tailwind (`@import "tailwindcss"` + custom theme variables)
- [ ] 6. Set up React Router with `createHashRouter` (landing, chapter, collectibles, settings routes)
- [ ] 7. Build AppShell layout (header with search bar + hamburger, main content area, sticky right TOC slot)
- [ ] 8. Build ChapterDrawer (slide-out, 4 collapsible story acts, chapter list with progress bars, dashboard header)
- [ ] 9. Build Landing page (branding, "Continue", "Next Incomplete", links to hub/settings)
- [ ] 10. Build progress dashboard (story %, primers, celestials counts — on landing + drawer)
- [ ] 11. Create chapter index data (slugs, names, act groupings, map image paths)
- [ ] 12. Set up GitHub Actions deploy workflow
- [ ] 13. Verify build + deploy works on GitHub Pages

## Phase 2: Area Pages
- [ ] 14. Build ChapterPage shell (assembles sections, provides TOC anchors)
- [ ] 15. Build useScrollSpy hook + TableOfContents component (sticky right sidebar)
- [ ] 16. Build SubLocation component (collapsible groups with persisted state)
- [ ] 17. Convert `research-walkthrough-items.md` into structured per-chapter JSON (27 files)
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
- [ ] 29. Source and write walkthrough prose for all 27 chapters

## Phase 3: Collectibles Hub
- [ ] 30. Build CollectiblesHub page shell
- [ ] 31. Build CelestialTracker (character portraits + 3-step weapon→crest→sigil progress)
- [ ] 32. Build PrimerList (26 primers, missable flags, synced checkboxes)
- [ ] 33. Build JechtSpheres (10 spheres, overdrive unlock milestones)
- [ ] 34. Build CloisterChecklist (6 temples, maps, Anima progress)
- [ ] 35. Build AeonTracker (aeon cards with images, obtained tracking)
- [ ] 36. Add Blitzball note (Wakka's overdrives + Jupiter Sigil only)
- [ ] 37. Wire up checkbox sync between area pages and hub (single source of truth)

## Phase 4: Save System & Settings
- [ ] 38. Build useLocalStorage hook (debounced writes, lazy init)
- [ ] 39. Build useSaveSlot hook (CRUD for unlimited named slots)
- [ ] 40. Build SaveManager UI (create/rename/delete slots, switch active)
- [ ] 41. Build export/import JSON
- [ ] 42. Build SettingsPage (save manager + effect toggles + display prefs)

## Phase 5: Search & Quick Reference
- [ ] 43. Build search index (bosses, items, primers, celestials, locations)
- [ ] 44. Build SearchBar with instant dropdown results
- [ ] 45. Build QuickRefPanel (pullout from any page)
- [ ] 46. Build ElementalChart, StatusEffects, KeyItems reference content

## Phase 6: Polish & Deploy
- [ ] 47. Build pyrefly page transition (CSS-only dissolve)
- [ ] 48. Build pyrefly celebration burst (completion effect)
- [ ] 49. Configure PWA manifest + icons for iPad home screen install
- [ ] 50. Test offline mode
- [ ] 51. Responsive polish for iPad Pro landscape
- [ ] 52. Final GitHub Pages deployment
