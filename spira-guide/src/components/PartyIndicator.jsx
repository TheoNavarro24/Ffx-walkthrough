export default function PartyIndicator({ party = [] }) {
  if (party.length === 0) return null

  return (
    <div className="flex items-center gap-1.5">
      {party.map((name) => (
        <img
          key={name}
          src={`/img/party/characters/${name.toLowerCase()}.png`}
          alt={name}
          title={name}
          width={28}
          height={28}
          className="rounded-full object-cover border border-[var(--color-border)]"
          onError={(e) => {
            e.target.outerHTML = `<span class="text-xs text-gray-500 px-1" title="${name}">${name[0]}</span>`
          }}
        />
      ))}
    </div>
  )
}
