import PartyIndicator from './PartyIndicator'
import { assetUrl } from '../utils/assetUrl'

export default function ChapterHeader({ name, act, slug, mapImage, party = [] }) {
  return (
    <div className="ffx-panel p-4 flex gap-5 items-center">
      {mapImage && (
        <img
          src={assetUrl(mapImage)}
          alt={`${name} map`}
          className="w-32 h-20 object-cover rounded border border-[var(--color-border-alt)] flex-shrink-0 opacity-90"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}
      <div className="flex flex-col gap-1.5 flex-1">
        <h1 className="ffx-header text-3xl">{name}</h1>
        <p className="text-sm text-[var(--color-border-alt)]">Act {act}</p>
        <PartyIndicator party={party} />
      </div>
    </div>
  )
}
