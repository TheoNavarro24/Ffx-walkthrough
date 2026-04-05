import { Link } from 'react-router-dom'
import { chapters } from '../data/chapterIndex'
import { useChapterProgress } from '../hooks/useChapterProgress'
import { assetUrl } from '../utils/assetUrl'

function NavCard({ chapter, direction }) {
  const { checked, total } = useChapterProgress(chapter.slug)
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0
  const isNext = direction === 'next'

  return (
    <Link
      to={`/chapter/${chapter.slug}`}
      className={`flex-1 ffx-panel overflow-hidden flex ${isNext ? 'flex-row-reverse' : 'flex-row'} hover:border-[var(--color-border-alt)] transition-colors`}
    >
      {chapter.navImage && (
        <img
          src={assetUrl(chapter.navImage)}
          alt=""
          loading="lazy"
          className="w-24 h-16 object-cover flex-shrink-0 opacity-80"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}
      <div className={`flex flex-col justify-between px-4 py-3 gap-1 flex-1 ${isNext ? 'items-end text-right' : 'items-start'}`}>
        <p className="text-[10px] text-[var(--color-border-alt)] uppercase tracking-widest">
          {isNext ? 'Next →' : '← Previous'}
        </p>
        <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '1rem' }}>
          {chapter.name}
        </p>
        <div className="w-full h-1 bg-[var(--color-bg-deep)] rounded">
          <div
            className="h-full bg-[var(--color-border)] rounded transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
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
