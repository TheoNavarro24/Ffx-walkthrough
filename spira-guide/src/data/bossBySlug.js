// spira-guide/src/data/bossBySlug.js
import monstersRaw from '../../../docs/source-data/monsters.json' with { type: 'json' }

const bossMap = {}
for (const [name, data] of Object.entries(monstersRaw)) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  bossMap[slug] = data
}

export function getBoss(slug) {
  return bossMap[slug] ?? null
}
