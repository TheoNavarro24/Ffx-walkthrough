# FFX Image Assets — Available from GitHub

## Source: FFX-AP/FFX-Poptracker
Repository: https://github.com/FFX-AP/FFX-Poptracker
Base raw URL: https://raw.githubusercontent.com/FFX-AP/FFX-Poptracker/main/images/

### Boss Images (43 files)
Path: `images/bosses/`

- BFA.png, Biran.png, Chocobo Eater.png, Crawler(side).png, Crawler.png
- Defender X.png, Evrae Altana.png, Evrae.png, Extractor.png, Geosgaeno.png
- Klikk.png, Lord Ochu.png, Oblitzerator.png, Omega Weapon.png, Penance.png
- Sanctuary Keeper.png, Seymour Flux 2.png, Seymour Flux.png
- Seymour Natus 2.png, Seymour Natus.png, Seymour Omnis.png, Seymour.png
- Sin Fin.png, Sin Head.png, Sin Left Fin.png, Sin Right Fin.png
- Sinspawn Ammes.png, Sinspawn Echuilles.png, Sinspawn Genaeux.png
- Sinspawn Genais.png, Sinspawn Gui.png
- Spectral Keeper 2.png, Spectral Keeper.png, Spherimorph.png
- Tros.png, Ultima Weapon.png, Wendigo.png
- Yenke&Biran.png, Yenke.png, Yu Yevon.png, Yunalesca.png, Zu.png

Also: `images/bosses/arena/` subdirectory (arena boss images)

### Fiend/Enemy Images (110 files)
Path: `images/fiends/`

Complete set of all capturable monsters for Monster Arena tracking.
110 PNG files covering every regular enemy in the game.

### Character Images (16 files)
Path: `images/party/characters/`

Each character has standard + portrait variants:
- Auron.png, Auron Portrait.png
- Kimahri.png, Kimahri Portrait.png
- Lulu.png, Lulu Portrait.png
- Rikku.png, Rikku Portrait.png
- Seymour.png, Seymour Portrait.png
- Tidus.png, Tidus Portrait.png
- Wakka.png, Wakka Portrait.png
- Yuna.png, Yuna Portrait.png

### Area Maps (21 regions)
Path: `images/maps/regions/`

Each region folder contains sub-area maps:
- airship/, baaj/, besaid/ (4 maps), bevelle/, bikanel/
- calm lands/, cotsf/, djose/, gagazet/, guadosalam/
- kilika/, luca/, macalania/, miihen/, monster arena/
- moonflow/, mushroom rock road/, omega ruins/
- sin/, thunder plains/, zanarkand/

Example (besaid/): besaid island.png, besaid village.png, besaid temple.png, S.S. Liki.png

### Cloister Maps (5 files)
Path: `images/maps/cloisters/`

- Besaid Cloister.png
- Djose Cloister.png
- Kilika Cloister.png
- Macalania Cloister.png
- Zanarkand Cloister.png

### World Map
Path: `images/maps/Spira.png`

### Other Image Directories
- `images/party/aeons/` — Aeon images
- `images/party/armor/` — Armor icons
- `images/party/weapon/` — Weapon icons
- `images/items/` — Item icons
- `images/spheres/` — Sphere Grid sphere icons
- `images/minigames/` — Minigame icons
- `images/npc/` — NPC images
- `images/settings/` — UI settings icons
- `images/Overdrives/` — Overdrive images
- `images/RESOURCES/` — Misc resources

## Download Strategy

All images are freely available on GitHub. The download script should:

1. Clone or fetch from `FFX-AP/FFX-Poptracker` repo
2. Copy the `images/` directory into our `public/img/` folder
3. Rename/reorganize as needed for our app structure

Alternatively, reference images directly via raw.githubusercontent.com URLs
during development, then download for production.

### Quick Download Command
```bash
# Clone just the images directory
git clone --depth 1 --filter=blob:none --sparse https://github.com/FFX-AP/FFX-Poptracker.git /tmp/ffx-poptracker
cd /tmp/ffx-poptracker
git sparse-checkout set images
cp -r images/ /path/to/spira-guide/public/img/
```

## Image Coverage Summary

| Category | Count | Coverage |
|----------|-------|---------|
| Boss images | 43 | All story + optional bosses |
| Enemy/fiend images | 110 | All capturable monsters |
| Character portraits | 16 | All 7 party + Seymour (standard + portrait) |
| Area maps | 21+ regions | All major areas with sub-area maps |
| Cloister maps | 5 | All cloisters (missing Bevelle) |
| World map | 1 | Spira overview |
| Aeon images | TBD | In aeons/ subfolder |
| Item/weapon/armor icons | TBD | In respective subfolders |

This gives us excellent visual coverage for the companion app without
needing to scrape any external websites.
