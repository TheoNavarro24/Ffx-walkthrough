import { useStoryProgress } from '../../hooks/useStoryProgress'
import { useCheckbox } from '../../hooks/useCheckbox'
import { CELESTIALS_BY_CHARACTER } from '../../data/collectibles/celestialsData'
import { PRIMERS, getPrimerId } from '../../data/collectibles/primersData'

const celestialIds = Object.values(CELESTIALS_BY_CHARACTER).flatMap((c) => c.items.map((i) => i.id))
const primerIds = PRIMERS.map(getPrimerId)

export default function ProgressDashboard() {
  const { percent: storyPercent } = useStoryProgress()
  const { checkedCount } = useCheckbox()

  return (
    <div className="ffx-panel p-3 text-sm flex gap-4">
      <span>Story: <strong className="ffx-header">{storyPercent}%</strong></span>
      <span>Primers: <strong className="ffx-header">{checkedCount(primerIds)}/26</strong></span>
      <span>Celestials: <strong className="ffx-header">{checkedCount(celestialIds)}/21</strong></span>
    </div>
  )
}
