// spira-guide/src/data/searchIndex.js
import { chapters } from './chapterIndex'
import { getChapterData } from './chapterData'
import { PRIMERS } from './collectibles/primersData'
import { JECHT_SPHERES } from './collectibles/jechtSpheresData'
import { CELESTIALS_BY_CHARACTER } from './collectibles/celestialsData'
import superbossData from './superbosses.json'

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

const records = []

// Chapters
for (const ch of chapters) {
  records.push({ type: 'chapter', title: ch.name, subtitle: null, chapterId: ch.slug, anchor: null })
}

// Bosses — drive loop from chapterIndex, fetch boss list via getChapterData
for (const ch of chapters) {
  const data = getChapterData(ch.slug)
  for (const boss of (data.bosses ?? [])) {
    records.push({
      type: 'boss',
      title: toTitleCase(boss.slug.replace(/-/g, ' ')),
      subtitle: ch.name,
      chapterId: ch.slug,
      anchor: null,
    })
  }
}

// Primers
for (const p of PRIMERS) {
  records.push({
    type: 'primer',
    title: `Al Bhed Primer ${p.num}`,
    subtitle: p.location,
    chapterId: p.chapterSlug,
    anchor: p.anchor ?? null,
  })
}

// Jecht Spheres
for (const s of JECHT_SPHERES) {
  records.push({
    type: 'jecht-sphere',
    title: `Jecht Sphere ${s.id.replace('jecht-sphere-', '')}`,
    subtitle: s.location,
    chapterId: s.chapterSlug,
    anchor: s.anchor ?? null,
  })
}

// Celestials
for (const [characterKey, character] of Object.entries(CELESTIALS_BY_CHARACTER)) {
  for (const item of character.items) {
    records.push({
      type: 'celestial',
      title: item.name,
      subtitle: characterKey,
      chapterId: item.chapterSlug,
      anchor: item.anchor ?? null,
    })
  }
}

// Superbosses
for (const da of superbossData.darkAeons) {
  records.push({
    type: 'superboss',
    title: da.name,
    subtitle: da.location,
    path: '/superbosses',
    scrollTo: `boss-${da.slug}`,
  })
}
records.push({
  type: 'superboss',
  title: 'Penance',
  subtitle: 'Airship destination',
  path: '/superbosses',
  scrollTo: `boss-${superbossData.penance.slug}`,
})
records.push({
  type: 'superboss',
  title: 'Nemesis',
  subtitle: 'Monster Arena',
  path: '/superbosses',
  scrollTo: `boss-${superbossData.nemesis.slug}`,
})

export const searchIndex = records
