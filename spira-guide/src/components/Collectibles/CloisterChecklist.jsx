import { useCheckbox } from '../../hooks/useCheckbox'
import { CLOISTERS } from '../../data/collectibles/cloistersData'
import { assetUrl } from '../../utils/assetUrl'
import { Link } from 'react-router-dom'

export default function CloisterChecklist() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const cloisterIds = CLOISTERS.map((c) => c.id)
  const completedCount = checkedCount(cloisterIds)

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-dark)' }}>
        <strong>{completedCount}/6</strong> Destruction Spheres collected —
        {completedCount === 6
          ? ' ✅ Anima can now be unlocked at Baaj Temple.'
          : ' all 6 required to unlock Anima at Baaj Temple.'}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {CLOISTERS.map((cloister) => {
          const checked = isChecked(cloister.id)
          return (
            <Link
              key={cloister.id}
              to={`/chapter/${cloister.chapterSlug}`}
              className={`ffx-panel p-3 flex flex-col gap-2 transition-opacity no-underline
                ${checked ? 'opacity-50' : ''}
                ${cloister.missable ? 'border-orange-500' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text)' }}>
                  {cloister.name}
                </h3>
                {cloister.missable && (
                  <span className="text-[10px] text-orange-400 font-bold uppercase">Missable</span>
                )}
              </div>
              {cloister.mapImage ? (
                <img src={assetUrl(cloister.mapImage)} alt={`${cloister.name} cloister map`}
                  loading="lazy" className="w-full rounded" onError={(e) => { e.target.style.display = 'none' }} />
              ) : (
                <p className="text-xs italic" style={{ color: 'var(--color-border-alt)' }}>No cloister map available</p>
              )}
              {cloister.missable && (
                <p className="text-xs text-orange-300">{cloister.missableReason}</p>
              )}
              <label className="flex items-center gap-2 text-sm cursor-pointer mt-auto" onClick={(e) => e.preventDefault()}>
                <input type="checkbox" checked={checked}
                  onChange={(e) => { e.stopPropagation(); toggle(cloister.id) }}
                  className="w-4 h-4 accent-[var(--color-gold)]" />
                <span style={{ color: 'var(--color-text)' }}>Destruction Sphere: <strong>{cloister.reward}</strong></span>
              </label>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
