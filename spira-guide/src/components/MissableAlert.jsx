export default function MissableAlert({ missables = [], heading = 'Missable in this chapter' }) {
  if (missables.length === 0) return null

  return (
    <div
      role="alert"
      className="rounded-md border border-red-500 bg-red-900/25 px-4 py-3"
    >
      <p className="text-[10px] uppercase tracking-widest text-red-300 mb-2 font-bold flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        {heading}
      </p>
      <ul className="flex flex-col gap-1">
        {missables.map((m, i) => (
          <li key={i} className="text-sm text-red-200">{m}</li>
        ))}
      </ul>
    </div>
  )
}
