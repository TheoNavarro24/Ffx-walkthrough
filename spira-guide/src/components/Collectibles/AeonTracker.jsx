import { useCheckbox } from '../../hooks/useCheckbox'
import { AEONS } from '../../data/collectibles/aeonsData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import CollectibleCard from './CollectibleCard'
import { assetUrl } from '../../utils/assetUrl'

export default function AeonTracker() {
  const { isChecked, toggle, checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div className="grid grid-cols-4 gap-4">
      {AEONS.map((aeon) => {
        const checked = isChecked(aeon.id)
        return (
          <CollectibleCard
            key={aeon.id}
            chapterSlug={aeon.chapterSlug}
            anchor={aeon.anchor}
            airshipRequired={aeon.airshipRequired}
            airshipUnlocked={airshipUnlocked}
            airshipReason="Accessible after boarding the airship"
          >
            <div data-testid="aeon-card" className={`ffx-panel p-3 flex flex-col gap-2 ${checked ? 'opacity-50' : ''}`}>
              <img src={assetUrl(aeon.portrait)} alt={aeon.name}
                className="w-16 h-16 object-contain mx-auto"
                onError={(e) => { e.target.style.display = 'none' }} />
              <p className="text-center font-bold text-sm" style={{ color: 'var(--color-gold)' }}>{aeon.name}</p>
              <p className="text-xs text-center" style={{ color: 'var(--color-border-alt)' }}>{aeon.acquisition}</p>
              <label className="flex items-center gap-2 text-xs cursor-pointer mt-auto justify-center">
                <input type="checkbox" checked={checked} onChange={() => toggle(aeon.id)}
                  className="w-3 h-3 accent-[var(--color-gold)]" />
                Obtained
              </label>
            </div>
          </CollectibleCard>
        )
      })}
    </div>
  )
}
