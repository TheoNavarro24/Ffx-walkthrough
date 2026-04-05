import { useCheckbox } from '../../hooks/useCheckbox'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { AIRSHIP_UNLOCK_TRIGGERS } from '../../data/collectibles/airshipTriggers'
import { assetUrl } from '../../utils/assetUrl'

const TYPE_LABEL = { weapon: 'Weapon', crest: 'Crest', sigil: 'Sigil' }

function CharacterCard({ char, airshipUnlocked }) {
  const { isChecked, toggle } = useCheckbox()
  const [missed, setMissed] = useLocalStorage(`celestial-missed-${char.name.toLowerCase()}`, false)

  const allChecked = char.items.every((item) => isChecked(item.id))
  const allLockedAirship = !missed && char.items.every((item) => !isChecked(item.id) && (item.airshipRequired || item.postgameRequired))

  return (
    <div className={`ffx-panel p-3 flex flex-col gap-2 relative ${allChecked ? 'ring-1 ring-[var(--color-gold)]' : ''}`}>
      <img
        src={assetUrl(char.portrait)}
        alt={char.name}
        className="w-12 h-12 object-cover rounded mx-auto"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <p className="text-center text-xs font-bold" style={{ color: 'var(--color-gold)' }}>{char.name}</p>
      <p className="text-center text-[10px]" style={{ color: 'var(--color-border-alt)' }}>{char.weapon}</p>

      <ul className="flex flex-col gap-1 mt-1">
        {char.items.map((item) => {
          const checked = isChecked(item.id)
          return (
            <li key={item.id} className={`text-xs flex items-center gap-1 ${checked ? 'opacity-40 line-through' : ''}`}>
              <input type="checkbox" id={item.id} checked={checked} onChange={() => toggle(item.id)}
                className="w-3 h-3 accent-[var(--color-gold)] cursor-pointer flex-shrink-0" />
              <label htmlFor={item.id} className="cursor-pointer flex-1">
                <span style={{ color: 'var(--color-border-alt)' }}>{TYPE_LABEL[item.type]}: </span>
                {item.name}
              </label>
            </li>
          )
        })}
      </ul>

      {char.missable && !missed && (
        <button
          onClick={() => setMissed(true)}
          className="text-[10px] text-red-400 underline mt-1 text-left"
        >
          Mark as missed
        </button>
      )}

      {missed && (
        <div className="absolute inset-0 bg-red-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-xl">🔒</span>
          <p className="text-red-300 text-xs font-bold uppercase">Permanently missed</p>
          <p className="text-red-200 text-xs">{char.missedExplanation}</p>
          <button onClick={() => setMissed(false)} className="text-red-400 text-[10px] underline mt-1">Undo</button>
        </div>
      )}
      {!missed && allLockedAirship && (
        <div className="absolute inset-0 bg-amber-950/90 rounded flex flex-col items-center justify-center gap-1 p-3 text-center z-10">
          <span className="text-xl">🔒</span>
          <p className="text-amber-300 text-xs font-bold uppercase">{char.weapon} locked</p>
          <p className="text-amber-200 text-xs">Requires airship or postgame content</p>
        </div>
      )}
    </div>
  )
}

export default function CelestialTracker() {
  const { checkedCount } = useCheckbox()
  const airshipUnlocked = checkedCount(AIRSHIP_UNLOCK_TRIGGERS) > 0

  return (
    <div>
      <div className="grid grid-cols-7 gap-3">
        {Object.values(CELESTIALS_BY_CHARACTER).map((char) => (
          <CharacterCard key={char.name} char={char} airshipUnlocked={airshipUnlocked} />
        ))}
      </div>
    </div>
  )
}
