import { assetUrl } from '../../utils/assetUrl'

export default function BlitzballNote() {
  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex gap-6 items-start">
        <img
          src={assetUrl('img/party/characters/wakka.png')}
          alt="Wakka"
          className="w-20 h-20 object-cover rounded flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div>
          <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>
            WAKKA'S OVERDRIVES
          </h2>
          <p className="text-sm italic" style={{ color: 'var(--color-border-alt)' }}>
            This is the only reason to engage with Blitzball — no full game database here.
          </p>
        </div>
      </div>

      <div className="ffx-panel p-4 flex flex-col gap-3">
        <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-gold)' }}>
          Overdrive Unlocks (Jecht Spheres)
        </h3>
        <ul className="flex flex-col gap-2 text-sm">
          <li><strong style={{ color: 'var(--color-gold)' }}>1 sphere</strong> — Shooting Star</li>
          <li><strong style={{ color: 'var(--color-gold)' }}>3 spheres</strong> — Banishing Blade</li>
          <li><strong style={{ color: 'var(--color-gold)' }}>10 spheres</strong> — Tornado</li>
        </ul>
      </div>

      <div className="ffx-panel p-4 flex flex-col gap-2">
        <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-gold)' }}>
          Jupiter Sigil (World Champion)
        </h3>
        <p className="text-sm">
          Win the Blitzball League <strong>after</strong> obtaining all 3 of Wakka's overdrives.
          The sigil has a ~50% drop rate and may require multiple league wins.
        </p>
      </div>
    </div>
  )
}
