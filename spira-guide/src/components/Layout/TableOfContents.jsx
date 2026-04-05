export default function TableOfContents({ isOpen, onToggle, sections = [], activeId = null }) {
  return (
    <div
      data-testid="toc-panel"
      className={`transition-all ${isOpen ? 'toc-expanded w-40' : 'w-6'}`}
    >
      <button
        className="ffx-button w-full text-xs"
        onClick={onToggle}
        aria-label="Contents"
      >
        {isOpen ? '›' : '‹'}
      </button>
      {isOpen && (
        <nav className="p-2 text-sm" aria-label="Page contents">
          <p className="ffx-header text-xs mb-2">Contents</p>
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block text-xs px-2 py-1 border-l-2 transition-colors ${
                    activeId === s.id
                      ? 'border-[var(--color-border)] text-[var(--color-border)]'
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
