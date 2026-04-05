import { useCheckbox } from '../../hooks/useCheckbox'
import { JECHT_SPHERES, JECHT_MILESTONES } from '../../data/collectibles/jechtSpheresData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'

export default function JechtSpheres() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0
  const jechtIds = JECHT_SPHERES.map((j) => j.id)
  const collected = checkedCount(jechtIds)

  return (
    <div className="flex gap-8">
      <ul className="flex-1 flex flex-col gap-2">
        {JECHT_SPHERES.map((sphere, i) => {
          const checked = isChecked(sphere.id)
          return (
            <li key={sphere.id}>
              <CollectibleCard
                chapterSlug={sphere.chapterSlug}
                anchor={sphere.anchor}
                airshipRequired={sphere.airshipRequired}
                airshipUnlocked={airshipUnlocked}
              >
                <div className={`flex items-center gap-3 px-3 py-2 rounded text-sm bg-[var(--color-accent-peach)]/10 ${checked ? 'opacity-40 line-through' : ''}`}>
                  <input type="checkbox" id={sphere.id} checked={checked} onChange={() => toggle(sphere.id)}
                    className="w-4 h-4 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
                  <label htmlFor={sphere.id} className="cursor-pointer flex-1">
                    <span className="font-bold mr-2" style={{ color: 'var(--color-border-alt)' }}>#{i + 1}</span>
                    {sphere.location}
                  </label>
                </div>
              </CollectibleCard>
            </li>
          )
        })}
      </ul>

      <div className="w-48 flex-shrink-0">
        <p className="text-xs font-bold uppercase mb-3" style={{ color: 'var(--color-border-alt)' }}>
          Wakka Overdrives
        </p>
        <ul className="flex flex-col gap-3">
          {JECHT_MILESTONES.map((m) => {
            const reached = collected >= m.count
            return (
              <li key={m.overdrive} className={`text-sm ${reached ? 'text-[var(--color-gold)]' : 'opacity-50'}`}>
                <span className="font-bold">{reached ? '✓' : `${m.count}`}</span> sphere{m.count > 1 ? 's' : ''} →{' '}
                <span className="font-bold">{m.overdrive}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
