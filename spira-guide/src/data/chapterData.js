// spira-guide/src/data/chapterData.js
import besaidData from './chapters/besaid.json' with { type: 'json' }

const chapters = {
  besaid: besaidData,
}

const EMPTY_CHAPTER = {
  missables: [],
  party: [],
  oaka: null,
  sgTip: null,
  subLocations: [],
  bosses: [],
  cloister: null,
  optionalAreas: [],
}

export function getChapterData(slug) {
  return chapters[slug] ?? { ...EMPTY_CHAPTER, slug }
}
