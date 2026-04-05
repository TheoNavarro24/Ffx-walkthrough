export default function TableOfContents({ isOpen, onToggle }) {
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
        <div className="p-2 text-sm">
          <p className="ffx-header text-xs">Contents</p>
        </div>
      )}
    </div>
  )
}
