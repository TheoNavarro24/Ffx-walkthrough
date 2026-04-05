// IDs sourced from chapter JSON files — must match exactly for checkbox sync
export const PRIMERS = [
  { num: 'I',     translation: 'A → E', location: 'Baaj Temple — Salvage Ship Deck',           chapterSlug: 'baaj-temple',      id: 'baaj-primer-i',            anchor: 'baaj-primer-i',            missable: false, airshipRequired: false },
  { num: 'II',    translation: 'B → P', location: 'Besaid — Crusaders Lodge',                  chapterSlug: 'besaid',           id: 'besaid-primer-ii',         anchor: 'besaid-primer-ii',         missable: false, airshipRequired: false },
  { num: 'III',   translation: 'C → S', location: 'S.S. Liki — Power Room',                    chapterSlug: 'ss-liki',          id: 'liki-primer-iii',          anchor: 'liki-primer-iii',          missable: false, airshipRequired: false },
  { num: 'IV',    translation: 'D → T', location: 'Kilika — Tavern',                            chapterSlug: 'kilika',           id: 'kilika-primer-iv',         anchor: 'kilika-primer-iv',         missable: false, airshipRequired: false },
  { num: 'V',     translation: 'E → I', location: 'S.S. Winno — Bridge',                       chapterSlug: 'ss-winno',         id: 'winno-primer-v',           anchor: 'winno-primer-v',           missable: false, airshipRequired: false },
  { num: 'VI',    translation: 'F → W', location: 'Luca — Basement B',                         chapterSlug: 'luca',             id: 'luca-primer-vi',           anchor: 'luca-primer-vi',           missable: false, airshipRequired: false },
  { num: 'VII',   translation: 'G → K', location: 'Luca — Theatre Main Hall',                  chapterSlug: 'luca',             id: 'luca-primer-vii',          anchor: 'luca-primer-vii',          missable: false, airshipRequired: false },
  { num: 'VIII',  translation: 'H → N', location: "Mi'ihen Highroad — Rin's Travel Agency",    chapterSlug: 'miihen-highroad',  id: 'miihen-primer-viii',       anchor: 'miihen-primer-viii',       missable: false, airshipRequired: false },
  { num: 'IX',    translation: 'I → U', location: "Mi'ihen Highroad — Newroad North",          chapterSlug: 'miihen-highroad',  id: 'miihen-primer-ix',         anchor: 'miihen-primer-ix',         missable: false, airshipRequired: false },
  { num: 'X',     translation: 'J → V', location: 'Mushroom Rock Road — Precipice',            chapterSlug: 'mushroom-rock-road', id: 'mmr-primer-x',           anchor: 'mmr-primer-x',             missable: false, airshipRequired: false },
  { num: 'XI',    translation: 'K → G', location: 'Moonflow — South Wharf',                    chapterSlug: 'moonflow',         id: 'moonflow-primer-xi',       anchor: 'moonflow-primer-xi',       missable: false, airshipRequired: false },
  { num: 'XII',   translation: 'L → C', location: 'Guadosalam — House West',                   chapterSlug: 'guadosalam',       id: 'guadosalam-primer-xii',    anchor: 'guadosalam-primer-xii',    missable: false, airshipRequired: false },
  { num: 'XIII',  translation: 'M → L', location: "Thunder Plains — Rin's Agency",             chapterSlug: 'thunder-plains',   id: 'thunder-primer-xiii',      anchor: 'thunder-primer-xiii',      missable: false, airshipRequired: false },
  { num: 'XIV',   translation: 'N → R', location: 'Macalania Woods — Lake Road',               chapterSlug: 'macalania-woods',  id: 'mac-woods-primer-xiv',     anchor: 'mac-woods-primer-xiv',     missable: false, airshipRequired: false },
  { num: 'XV',    translation: 'O → Y', location: 'Lake Macalania — Agency Road',              chapterSlug: 'lake-macalania',   id: 'lake-mac-primer-xv',       anchor: 'lake-mac-primer-xv',       missable: false, airshipRequired: false },
  { num: 'XVI',   translation: 'P → B', location: 'Bikanel — East',                            chapterSlug: 'bikanel-desert',   id: 'bikanel-primer-xvi',       anchor: 'bikanel-primer-xvi',       missable: false, airshipRequired: false },
  { num: 'XVII',  translation: 'Q → X', location: 'Bikanel — West',                            chapterSlug: 'bikanel-desert',   id: 'bikanel-primer-xvii',      anchor: 'bikanel-primer-xvii',      missable: false, airshipRequired: false },
  { num: 'XVIII', translation: 'R → H', location: 'Home — First Screen',                       chapterSlug: 'home',             id: 'home-primer-xviii',        anchor: 'home-primer-xviii',        missable: true,  airshipRequired: false },
  { num: 'XIX',   translation: 'S → M', location: 'Home — Room with forced fight (on a bed)',  chapterSlug: 'home',             id: 'home-primer-xix',          anchor: 'home-primer-xix',          missable: true,  airshipRequired: false },
  { num: 'XX',    translation: 'T → D', location: 'Home — Three-way fork, right hallway',      chapterSlug: 'home',             id: 'home-primer-xx',           anchor: 'home-primer-xx',           missable: true,  airshipRequired: false },
  { num: 'XXI',   translation: 'U → O', location: 'Home — Three-way fork, straight/left path', chapterSlug: 'home',             id: 'home-primer-xxi',          anchor: 'home-primer-xxi',          missable: true,  airshipRequired: false },
  { num: 'XXII',  translation: 'V → F', location: 'Bevelle Temple — floor before Cloister',    chapterSlug: 'bevelle',          id: 'bevelle-primer-xxii',      anchor: 'bevelle-primer-xxii',      missable: true,  airshipRequired: false },
  { num: 'XXIII', translation: 'W → Z', location: 'Calm Lands — Central West',                 chapterSlug: 'calm-lands',       id: 'calmlands-primer-xxiii',   anchor: 'calmlands-primer-xxiii',   missable: false, airshipRequired: false },
  { num: 'XXIV',  translation: 'X → Q', location: 'Remiem Temple — Outside Left',              chapterSlug: 'airship',          id: 'airship-remiem-primer-xxiv', anchor: 'airship-remiem-primer-xxiv', missable: false, airshipRequired: true },
  { num: 'XXV',   translation: 'Y → A', location: 'Mt. Gagazet — Mountain Gate',               chapterSlug: 'mt-gagazet',       id: 'gagazet-primer-xxv',       anchor: 'gagazet-primer-xxv',       missable: false, airshipRequired: false },
  { num: 'XXVI',  translation: 'Z → J', location: 'Omega Ruins — Lower Area North',            chapterSlug: 'airship',          id: 'airship-omega-primer-xxvi', anchor: 'airship-omega-primer-xxvi', missable: false, airshipRequired: true },
]

export function getPrimerId(primer) {
  return primer.id
}
