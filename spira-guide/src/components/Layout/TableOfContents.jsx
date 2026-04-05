export default function TableOfContents({ isOpen, onToggle, sections = [], activeId = null }) {
  return (
    <div
      data-testid="toc-panel"
      className={`transition-all ${isOpen ? 'toc-expanded w-40' : 'w-6'}`}
    >
      <button
        className="w-6 h-10 flex items-center justify-center text-[var(--color-border-alt)] hover:text-white hover:bg-white/10 transition-colors rounded cursor-pointer"
        onClick={onToggle}
        aria-label="Contents"
      >
        {isOpen
          ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        }
      </button>
      {isOpen && (
        <nav className="p-2 text-sm" aria-label="Page contents">
          <p className="ffx-header text-sm mb-2">Contents</p>
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block text-xs px-2 py-1 border-l-2 transition-colors ${
                    activeId === s.id
                      ? 'border-[var(--color-gold)] text-[var(--color-gold)]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
