import { useState } from 'react'
import { useCheckbox } from '../hooks/useCheckbox'
import { assetUrl } from '../utils/assetUrl'

function formatHp(boss) {
  const hp = boss.hp ?? boss.stats?.hp?.[0]
  if (hp == null) return '???'
  if (typeof hp === 'number') return hp.toLocaleString()
  return String(hp)
}

function formatWeaknesses(boss) {
  if (boss.weaknesses) return boss.weaknesses.join(', ')
  if (boss.elem_resists) {
    const weak = Object.entries(boss.elem_resists)
      .filter(([, v]) => v > 1)
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
    return weak.length ? weak.join(', ') : '—'
  }
  return '—'
}

function formatSteals(boss) {
  if (boss.steals) return boss.steals.join(', ')
  const c = boss.items?.steal_common
  const r = boss.items?.steal_rare
  const parts = []
  if (c) parts.push(Array.isArray(c) ? c[0] : c)
  if (r && r[0] !== (Array.isArray(c) ? c[0] : c)) parts.push(Array.isArray(r) ? r[0] : r)
  return parts.length ? parts.join(', ') : null
}

function formatDrops(boss) {
  if (boss.drops) return boss.drops.join(', ')
  const c = boss.items?.drop_common
  if (!c) return null
  return Array.isArray(c) ? c[0] : c
}

export default function BossCard({ chapterSlug, bossSlug, boss }) {
  const [expanded, setExpanded] = useState(false)
  const { isChecked, toggle } = useCheckbox()
  const checkId = `${chapterSlug}-boss-${bossSlug}`

  if (!boss) return null

  const bossName = boss.name ?? bossSlug
  const defeated = isChecked(checkId)

  return (
    <div className={`ffx-panel p-0 overflow-hidden transition-opacity ${defeated ? 'opacity-50' : ''}`}>
      <button
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/5 transition-colors"
        onClick={() => setExpanded((e) => !e)}
        aria-label={bossName}
        aria-expanded={expanded}
      >
        <img
          src={assetUrl(`img/bosses/${bossSlug}.png`)}
          alt={bossName}
          width={52}
          height={52}
          className="rounded flex-shrink-0 object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="flex-1 min-w-0">
          <p className="ffx-header text-sm">{bossName}</p>
          <div className="flex gap-3 mt-0.5">
            <span className="boss-stat">
              <span className="boss-stat-label">HP</span>
              <span className="boss-stat-value">{formatHp(boss)}</span>
            </span>
            <span className="boss-stat">
              <span className="boss-stat-label">Weak</span>
              <span className="boss-stat-value">{formatWeaknesses(boss)}</span>
            </span>
          </div>
        </div>
        <span className="text-gray-600 text-xs">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#1e3a5f]">
          {boss.strategy && (
            <p className="text-sm text-gray-300 mt-3">{boss.strategy}</p>
          )}
          {formatSteals(boss) && (
            <p className="text-xs text-gray-400">
              <span className="text-[var(--color-border)]">Steal:</span> {formatSteals(boss)}
            </p>
          )}
          {formatDrops(boss) && (
            <p className="text-xs text-gray-400">
              <span className="text-[var(--color-border)]">Drops:</span> {formatDrops(boss)}
            </p>
          )}
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer mt-1">
            <input
              type="checkbox"
              aria-label="Defeated"
              checked={defeated}
              onChange={() => toggle(checkId)}
              className="accent-[var(--color-border)]"
            />
            Mark as defeated
          </label>
        </div>
      )}
    </div>
  )
}
