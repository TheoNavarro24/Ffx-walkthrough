export default function MissableAlert({ missables = [] }) {
  if (missables.length === 0) return null

  return (
    <div
      role="alert"
      className="rounded-md border border-red-500 bg-red-900/20 px-4 py-3"
    >
      <p className="text-[10px] uppercase tracking-widest text-red-300 mb-2 font-bold">
        ⚠ Missable in this chapter
      </p>
      <ul className="flex flex-col gap-1">
        {missables.map((m, i) => (
          <li key={i} className="text-sm text-red-200">{m}</li>
        ))}
      </ul>
    </div>
  )
}
