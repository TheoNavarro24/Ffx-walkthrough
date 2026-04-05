export default function TabBar({ tabs, active, onSelect }) {
  return (
    <div role="tablist" className="flex gap-1 mb-6 border-b border-[var(--color-border)]">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2 text-sm font-bold transition-colors rounded-t
            ${active === tab
              ? 'bg-[var(--color-bg-panel)] text-[var(--color-gold)] border border-b-0 border-[var(--color-border)]'
              : 'text-[var(--color-text-dark)] hover:text-[var(--color-accent-blue)]'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
