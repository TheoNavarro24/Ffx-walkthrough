const TIERS = [
  { threshold: 10001, label: 'Discount (80%)', description: 'Best prices — donate at least 10,001 gil total' },
  { threshold: 1001,  label: 'Standard (100%)', description: 'Standard prices — donate at least 1,001 gil total' },
  { threshold: 101,   label: 'Slight surcharge (110%)', description: 'Small surcharge — donate at least 101 gil total' },
  { threshold: 0,     label: 'Surcharge (130%)', description: 'High surcharge — donate nothing' },
]

function getTierForTarget(target) {
  return TIERS.find((t) => target >= t.threshold) ?? TIERS[TIERS.length - 1]
}

export default function OakaReminder({ oaka }) {
  if (!oaka) return null

  const tier = getTierForTarget(oaka.cumulativeTarget)

  return (
    <div className="ffx-panel px-4 py-3 border-[var(--color-gold)] flex flex-col gap-1">
      <p className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-wide">
        💰 O'aka Encounter
      </p>
      <p className="text-sm text-gray-300">
        Donate to reach <span className="text-white font-medium">{oaka.cumulativeTarget.toLocaleString()} gil</span> cumulative total.
      </p>
      <p className="text-xs text-gray-400">
        Unlocks: <span className="text-gray-200">{tier.label}</span>
      </p>
    </div>
  )
}
