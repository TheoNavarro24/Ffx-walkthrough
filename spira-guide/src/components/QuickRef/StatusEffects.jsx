// Fully hardcoded — no status data in source JSON.

const STATUSES = [
  { name: 'Poison',    effect: 'Drains HP each turn. Cured by Antidote.' },
  { name: 'Silence',   effect: 'Cannot use magic or skills. Cured by Echo Screen.' },
  { name: 'Sleep',     effect: 'Cannot act. Wakes on taking damage. Cured by Eye Drops.' },
  { name: 'Darkness',  effect: 'Physical attacks miss often. Cured by Eye Drops.' },
  { name: 'Slow',      effect: 'CTB gauge fills slower. Cured by Remedy.' },
  { name: 'Petrify',   effect: 'Stone countdown — turns to stone then shatters. Soft cures.' },
  { name: 'Zombie',    effect: 'Healing damages; KO becomes permanent. No cure — wear off.' },
  { name: 'Berserk',   effect: 'Auto-attacks every turn; cannot be controlled.' },
  { name: 'Confuse',   effect: 'Attacks allies randomly. Hit the ally to snap out.' },
  { name: 'Doom',      effect: 'Countdown to instant KO. No cure.' },
  { name: 'Threaten',  effect: 'Target will flee on their turn.' },
  { name: 'Provoke',   effect: 'Target focuses only on the provoker.' },
  { name: 'Sensor',    effect: 'Reveals enemy HP and weaknesses.' },
  { name: 'Full Break', effect: 'All four stats halved. Dispel or wear off.' },
]

export default function StatusEffects() {
  return (
    <div className="space-y-1">
      {STATUSES.map(({ name, effect }) => (
        <div key={name} className="border-b border-[var(--color-border)] pb-1 last:border-0">
          <span className="text-xs font-bold text-[var(--color-gold)]">{name}</span>
          <p className="text-xs opacity-80 mt-0.5">{effect}</p>
        </div>
      ))}
    </div>
  )
}
