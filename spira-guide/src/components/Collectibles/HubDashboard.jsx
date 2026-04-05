import { useCheckbox } from '../../hooks/useCheckbox'
import { useStoryProgress } from '../../hooks/useStoryProgress'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'
import { CLOISTERS } from '../../data/collectibles/cloistersData'
import { AEONS } from '../../data/collectibles/aeonsData'
import { JECHT_SPHERES } from '../../data/collectibles/jechtSpheresData'

const celestialIds = Object.values(CELESTIALS_BY_CHARACTER).flatMap((c) => c.items.map((i) => i.id))
const primerIds = PRIMERS.map(getPrimerId)
const cloisterIds = CLOISTERS.map((c) => c.id)
const aeonIds = AEONS.map((a) => a.id)
const jechtIds = JECHT_SPHERES.map((j) => j.id)
const allCollectibleIds = [...celestialIds, ...primerIds, ...cloisterIds, ...aeonIds, ...jechtIds]

function Pill({ label, checked, total, isPercent }) {
  const display = isPercent ? `${checked}%` : `${checked}/${total}`
  return (
    <span className="text-xs">
      <span style={{ color: 'var(--color-border-alt)' }}>{label}: </span>
      <strong style={{ color: 'var(--color-gold)' }}>{display}</strong>
    </span>
  )
}

export default function HubDashboard() {
  const { checkedCount } = useCheckbox()
  const { percent: storyPercent } = useStoryProgress()
  const collectiblesChecked = checkedCount(allCollectibleIds)
  const collectiblesPercent = Math.round((collectiblesChecked / allCollectibleIds.length) * 100)

  return (
    <div className="ffx-panel px-4 py-2 flex flex-wrap gap-x-4 gap-y-1 mb-4">
      <Pill label="Story" checked={storyPercent} total={100} isPercent />
      <Pill label="Collectibles" checked={collectiblesPercent} total={100} isPercent />
      <Pill label="Celestials" checked={checkedCount(celestialIds)} total={celestialIds.length} />
      <Pill label="Primers" checked={checkedCount(primerIds)} total={26} />
      <Pill label="Cloisters" checked={checkedCount(cloisterIds)} total={6} />
      <Pill label="Aeons" checked={checkedCount(aeonIds)} total={8} />
      <Pill label="Jecht" checked={checkedCount(jechtIds)} total={10} />
    </div>
  )
}
