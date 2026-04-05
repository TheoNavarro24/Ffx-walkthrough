import { Link } from 'react-router-dom'

// Shared wrapper for all collectible rows/cards.
// Handles three lock states: airship-locked, postgame-locked, permanently missed.
export default function CollectibleCard({
  children,
  chapterSlug,
  anchor,
  airshipRequired = false,
  airshipUnlocked = false,
  airshipReason = '',
  postgameRequired = false,
  postgameReason = '',
  missed = false,
  missedExplanation = '',
}) {
  const isAirshipLocked = airshipRequired && !airshipUnlocked
  const href = isAirshipLocked
    ? '/chapter/airship'
    : `/chapter/${chapterSlug}${anchor ? `#${anchor}` : ''}`

  return (
    <div className="relative">
      {children}
      {missed && (
        <div className="absolute inset-0 bg-red-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-red-300 text-xs font-bold uppercase tracking-wide">Permanently missed</p>
          {missedExplanation && <p className="text-red-200 text-xs">{missedExplanation}</p>}
        </div>
      )}
      {!missed && isAirshipLocked && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Airship required</p>
          {airshipReason && <p className="text-amber-200 text-xs">{airshipReason}</p>}
          <Link to={href} className="text-amber-400 text-xs underline mt-1">→ Find the airship</Link>
        </div>
      )}
      {!missed && !isAirshipLocked && postgameRequired && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-lg">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Requires postgame</p>
          {postgameReason && <p className="text-amber-200 text-xs">{postgameReason}</p>}
          <Link to={href} className="text-amber-400 text-xs underline mt-1">→ View in guide</Link>
        </div>
      )}
      {!missed && !isAirshipLocked && (
        <Link
          to={href}
          className="absolute top-2 right-2 text-[var(--color-border)] hover:text-[var(--color-gold)] text-xs"
          aria-label="View in guide"
        >→</Link>
      )}
    </div>
  )
}
