import { useMemo } from 'react'
import { searchIndex } from '../data/searchIndex'

const TYPE_PRIORITY = { chapter: 0, boss: 1, superboss: 2, primer: 3, 'jecht-sphere': 4, celestial: 5 }

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.length < 2) return []

    const q = query.toLowerCase()

    const matches = searchIndex.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.subtitle && r.subtitle.toLowerCase().includes(q))
    )

    matches.sort((a, b) => {
      const aExact = a.title.toLowerCase() === q ? 0 : 1
      const bExact = b.title.toLowerCase() === q ? 0 : 1
      if (aExact !== bExact) return aExact - bExact
      const ap = TYPE_PRIORITY[a.type] ?? 99
      const bp = TYPE_PRIORITY[b.type] ?? 99
      return ap - bp
    })

    return matches.slice(0, 12)
  }, [query])
}
