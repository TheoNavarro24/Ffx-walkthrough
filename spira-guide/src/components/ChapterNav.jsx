import { Link } from 'react-router-dom'
import { chapters } from '../data/chapterIndex'
import { useChapterProgress } from '../hooks/useChapterProgress'

function NavCard({ chapter, direction }) {
  const { checked, total } = useChapterProgress(chapter.slug)
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0

  return (
    <Link
      to={`/chapter/${chapter.slug}`}
      className={`flex-1 ffx-panel px-4 py-3 flex flex-col gap-2 hover:border-[var(--color-border-alt)] transition-colors ${direction === 'next' ? 'text-right items-end' : 'items-start'}`}
    >
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </p>
      <p className="text-sm text-[var(--color-border-alt)]">{chapter.name}</p>
      <div className="w-full h-1 bg-[#0d2137] rounded">
        <div
          className="h-full bg-[var(--color-border)] rounded transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  )
}

export default function ChapterNav({ currentSlug }) {
  const idx = chapters.findIndex((c) => c.slug === currentSlug)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  if (!prev && !next) return null

  return (
    <nav className="flex gap-3 mt-2" aria-label="Chapter navigation">
      {prev && <NavCard chapter={prev} direction="prev" />}
      {next && <NavCard chapter={next} direction="next" />}
    </nav>
  )
}
