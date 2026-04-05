import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'

const TYPE_LABELS = {
  chapter: 'CHAPTER',
  boss: 'BOSS',
  primer: 'PRIMER',
  'jecht-sphere': 'JECHT',
  celestial: 'CELESTIAL',
}

export default function SearchDropdown() {
  const [query, setQuery] = useState('')
  const results = useSearch(query)
  const wrapRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Escape') setQuery('')
  }

  const showDropdown = query.length >= 2

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="search"
        role="searchbox"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-black/5 border border-black/20 rounded px-3 py-1 w-32 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-black/40 transition-colors"
        placeholder="Search…"
      />

      {showDropdown && (
        <div
          role="listbox"
          className="ffx-panel absolute top-full right-0 mt-1 w-72 max-h-80 overflow-y-auto shadow-xl"
          style={{ zIndex: 200 }}
        >
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm opacity-60">No results</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                to={`/chapter/${r.chapterId}${r.anchor ? '#' + r.anchor : ''}`}
                onClick={() => setQuery('')}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors border-b border-[var(--color-border)] last:border-0"
              >
                <span className="text-[9px] font-bold tracking-wider opacity-50 w-16 flex-shrink-0">
                  {TYPE_LABELS[r.type] ?? r.type.toUpperCase()}
                </span>
                <span className="text-sm flex-1 min-w-0">
                  <span className="block truncate">{r.title}</span>
                  {r.subtitle && (
                    <span className="block text-[10px] opacity-60 truncate">{r.subtitle}</span>
                  )}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
