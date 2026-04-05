import { useCheckbox } from '../../hooks/useCheckbox'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'
import { assetUrl } from '../../utils/assetUrl'

export default function PrimerList() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div>
      <img
        src={assetUrl('img/guide/image_0023_00.jpeg')}
        alt="Al Bhed alphabet chart"
        loading="lazy"
        className="w-full max-w-lg mb-6 rounded border border-[var(--color-border)]"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <ul className="flex flex-col gap-2">
        {PRIMERS.map((primer) => {
          const id = getPrimerId(primer)
          const checked = isChecked(id)
          return (
            <li key={id}>
              <CollectibleCard
                chapterSlug={primer.chapterSlug}
                anchor={primer.anchor}
                airshipRequired={primer.airshipRequired}
                airshipUnlocked={airshipUnlocked}
                airshipReason={primer.airshipRequired ? 'Accessible after boarding the airship' : ''}
              >
                <div className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-opacity
                  ${checked ? 'opacity-40 line-through' : ''}
                  ${primer.missable ? 'bg-orange-950/20 border border-orange-800/30' : 'bg-[var(--color-accent-peach)]/10'}`}
                >
                  <input type="checkbox" id={id} checked={checked} onChange={() => toggle(id)}
                    className="w-4 h-4 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
                  <label htmlFor={id} className="cursor-pointer flex-1 flex gap-3">
                    <span className="font-bold w-14 flex-shrink-0" style={{ color: 'var(--color-gold)' }}>
                      Vol. {primer.num}
                    </span>
                    <span style={{ color: 'var(--color-border-alt)' }}>{primer.translation}</span>
                    <span className="flex-1">{primer.location}</span>
                  </label>
                  {primer.missable && (
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wide flex-shrink-0">
                      Missable
                    </span>
                  )}
                </div>
              </CollectibleCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
