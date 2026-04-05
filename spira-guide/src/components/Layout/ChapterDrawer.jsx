import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACT_NAMES, getChaptersByAct } from '../../data/chapterIndex'
import ProgressDashboard from './ProgressDashboard'

function ActGroup({ actNumber, children }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="mb-2">
      <button
        className="ffx-button w-full text-left text-sm"
        aria-label={ACT_NAMES[actNumber]}
        onClick={() => setExpanded((e) => !e)}
      >
        {ACT_NAMES[actNumber]} {expanded ? '▾' : '▸'}
      </button>
      <ul style={{ visibility: expanded ? 'visible' : 'hidden', height: expanded ? 'auto' : '0', overflow: 'hidden' }}>
        {children}
      </ul>
    </div>
  )
}

export default function ChapterDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()

  function handleChapterClick(slug) {
    navigate(`/chapter/${slug}`)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          data-testid="drawer-backdrop"
          className="fixed inset-0 bg-black/50 z-10"
          onClick={onClose}
        />
      )}
      <nav
        aria-label="Chapters"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        className="fixed top-0 left-0 h-full w-72 ffx-panel z-20 overflow-y-auto p-4 flex flex-col gap-3"
      >
        <ProgressDashboard />
        {[1, 2, 3, 4].map((act) => (
          <ActGroup key={act} actNumber={act}>
            {getChaptersByAct(act).map((ch) => (
              <li key={ch.slug}>
                <button
                  className="w-full text-left px-3 py-1 text-sm hover:text-[var(--color-gold)]"
                  onClick={() => handleChapterClick(ch.slug)}
                >
                  {ch.name}
                </button>
              </li>
            ))}
          </ActGroup>
        ))}
      </nav>
    </>
  )
}
