// IDs use real chapter JSON IDs where available for checkbox sync with area pages.
// Hub-only IDs (celestial-*) are used for items not yet tracked on chapter pages.
export const CELESTIALS_BY_CHARACTER = {
  tidus: {
    name: 'Tidus', weapon: 'Caladbolg', missable: false,
    portrait: 'img/party/characters/tidus.png',
    items: [
      { type: 'weapon', id: 'calmlands-caladbolg',    name: 'Caladbolg',  location: 'Calm Lands NW — beat Chocobo Trainer first',      chapterSlug: 'calm-lands',        anchor: 'calmlands-caladbolg',       airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'zanarkand-dome-sun-crest', name: 'Sun Crest', location: 'Zanarkand Dome — chest after Yunalesca',           chapterSlug: 'zanarkand-dome',    anchor: 'zanarkand-dome-sun-crest',  airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-tidus-sigil',  name: 'Sun Sigil',  location: 'Calm Lands — Catcher Chocobo Race (0:00.0)',        chapterSlug: 'calm-lands',        anchor: 'celestial-tidus-sigil',     airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  yuna: {
    name: 'Yuna', weapon: 'Nirvana', missable: true,
    portrait: 'img/party/characters/yuna.png',
    missedExplanation: 'Dark Valefor now blocks return to Besaid Beach.',
    items: [
      { type: 'weapon', id: 'celestial-yuna-weapon',  name: 'Nirvana',    location: 'Monster Arena — capture all Calm Lands fiends',     chapterSlug: 'airship',           anchor: 'celestial-yuna-weapon',     airshipRequired: true,  postgameRequired: false, missable: false },
      { type: 'crest',  id: 'besaid-moon-crest',      name: 'Moon Crest', location: 'Besaid Beach — east alcove (swim)',                  chapterSlug: 'besaid',            anchor: 'besaid-moon-crest',         airshipRequired: false, postgameRequired: false, missable: true  },
      { type: 'sigil',  id: 'airship-remiem-moon-sigil', name: 'Moon Sigil', location: 'Remiem Temple — defeat all 8 Belgemine Aeons',  chapterSlug: 'airship',           anchor: 'airship-remiem-moon-sigil', airshipRequired: true,  postgameRequired: false, missable: false },
    ],
  },
  wakka: {
    name: 'Wakka', weapon: 'World Champion', missable: false,
    portrait: 'img/party/characters/wakka.png',
    items: [
      { type: 'weapon', id: 'celestial-wakka-weapon', name: 'World Champion', location: 'Luca Café — bartender after placing 3rd+ in Blitzball', chapterSlug: 'luca', anchor: 'celestial-wakka-weapon', airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'celestial-wakka-crest',  name: 'Jupiter Crest',  location: 'Luca — Aurochs locker room (after story tournament)',   chapterSlug: 'luca', anchor: 'celestial-wakka-crest',  airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-wakka-sigil',  name: 'Jupiter Sigil',  location: 'Blitzball League prize (win after all 3 overdrives)',   chapterSlug: 'luca', anchor: 'celestial-wakka-sigil',  airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  lulu: {
    name: 'Lulu', weapon: 'Onion Knight', missable: false,
    portrait: 'img/party/characters/lulu.png',
    items: [
      { type: 'weapon', id: 'airship-baaj-onion-knight', name: 'Onion Knight', location: 'Baaj Temple — seafloor south pillars (defeat Geosgaeno first)', chapterSlug: 'airship',        anchor: 'airship-baaj-onion-knight', airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'guadosalam-venus-crest',    name: 'Venus Crest',  location: 'Guadosalam — Farplane chest (return after Yunalesca)',            chapterSlug: 'guadosalam',     anchor: 'guadosalam-venus-crest',    airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-lulu-sigil',      name: 'Venus Sigil',  location: 'Thunder Plains — dodge 200 consecutive lightning strikes',        chapterSlug: 'thunder-plains', anchor: 'celestial-lulu-sigil',      airshipRequired: false, postgameRequired: false, missable: false },
    ],
  },
  kimahri: {
    name: 'Kimahri', weapon: 'Spirit Lance', missable: false,
    portrait: 'img/party/characters/kimahri.png',
    items: [
      { type: 'weapon', id: 'thunder-spirit-lance',     name: 'Spirit Lance',  location: 'Thunder Plains — pray at 3 Qactuar stones then follow ghost',  chapterSlug: 'thunder-plains',  anchor: 'thunder-spirit-lance',    airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'gagazet-saturn-crest',     name: 'Saturn Crest',  location: 'Mt. Gagazet — Prominence (behind pillar)',                      chapterSlug: 'mt-gagazet',      anchor: 'gagazet-saturn-crest',    airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'celestial-kimahri-sigil',  name: 'Saturn Sigil',  location: 'Macalania Woods — Butterfly Hunt (both post-game hunts)',         chapterSlug: 'macalania-woods', anchor: 'celestial-kimahri-sigil', airshipRequired: false, postgameRequired: true,  missable: false },
    ],
  },
  auron: {
    name: 'Auron', weapon: 'Masamune', missable: false,
    portrait: 'img/party/characters/auron.png',
    items: [
      { type: 'weapon', id: 'celestial-auron-weapon',   name: 'Masamune',   location: "Mushroom Rock — Rusty Sword + Lord Mi'ihen statue",           chapterSlug: 'mushroom-rock-road', anchor: 'celestial-auron-weapon',   airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'miihen-mars-crest',        name: 'Mars Crest', location: "Mi'ihen Highroad — Oldroad South",                            chapterSlug: 'miihen-highroad',    anchor: 'miihen-mars-crest',        airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'airship-arena-mars-sigil', name: 'Mars Sigil', location: 'Monster Arena — capture 1 fiend from each of 10 areas',       chapterSlug: 'airship',            anchor: 'airship-arena-mars-sigil', airshipRequired: true,  postgameRequired: true,  missable: false },
    ],
  },
  rikku: {
    name: 'Rikku', weapon: 'Godhand', missable: false,
    portrait: 'img/party/characters/rikku.png',
    items: [
      { type: 'weapon', id: 'celestial-rikku-weapon',       name: 'Godhand',        location: 'Airship — enter password GODHAND and visit Mushroom Rock (Valley)', chapterSlug: 'airship',        anchor: 'celestial-rikku-weapon',       airshipRequired: true, postgameRequired: false, missable: false },
      { type: 'crest',  id: 'bikanel-mercury-crest',        name: 'Mercury Crest',  location: 'Bikanel Desert — shifting sand pit, western area',                  chapterSlug: 'bikanel-desert', anchor: 'bikanel-mercury-crest',        airshipRequired: false, postgameRequired: false, missable: false },
      { type: 'sigil',  id: 'airship-cactuar-mercury-sigil', name: 'Mercury Sigil', location: 'Bikanel — Cactuar Village, find all 10 Cactuars',                   chapterSlug: 'airship',        anchor: 'airship-cactuar-mercury-sigil', airshipRequired: true, postgameRequired: false, missable: false },
    ],
  },
}
