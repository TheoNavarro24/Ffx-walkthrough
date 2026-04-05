import PartyIndicator from './PartyIndicator'

export default function ChapterHeader({ name, act, slug, mapImage, party = [] }) {
  return (
    <div className="ffx-panel p-3 flex gap-4 items-center">
      {mapImage && (
        <img
          src={mapImage}
          alt={`${name} map`}
          className="w-28 h-20 object-cover rounded border border-[#1e3a5f] flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}
      <div className="flex flex-col gap-1.5">
        <h1 className="ffx-header text-xl">{name}</h1>
        <p className="text-xs text-[var(--color-border-alt)]">Act {act}</p>
        <PartyIndicator party={party} />
      </div>
    </div>
  )
}
