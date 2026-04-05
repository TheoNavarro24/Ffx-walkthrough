import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACT_NAMES, getChaptersByAct } from '../../data/chapterIndex'
import ProgressDashboard from './ProgressDashboard'
import { useCheckbox } from '../../hooks/useCheckbox'

const SUPERBOSS_IDS = [
  'dark-valefor', 'dark-ifrit', 'dark-ixion-first-fight', 'dark-ixion-second-fight',
  'dark-shiva', 'dark-bahamut', 'dark-yojimbo', 'dark-anima',
  'dark-cindy', 'dark-sandy', 'dark-mindy', 'penance', 'penance-arms', 'nemesis',
]

function ActGroup({ actNumber, children }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="mb-2">
      <button
        className="ffx-button w-full text-left text-sm flex items-center cursor-pointer"
        aria-label={ACT_NAMES[actNumber]}
        onClick={() => setExpanded((e) => !e)}
      >
        <span className="flex-1 text-left">{ACT_NAMES[actNumber]}</span>
        {expanded
          ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        }
      </button>
      <ul style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: 'grid-template-rows 0.2s ease', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden' }}>
          {children}
        </div>
      </ul>
    </div>
  )
}

export default function ChapterDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isChecked } = useCheckbox()
  const defeatedCount = SUPERBOSS_IDS.filter((id) => isChecked(`superbosses-boss-${id}`)).length

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
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
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
        <div className="mt-2 border-t border-[var(--color-border-alt)] pt-2">
          <button
            className="w-full text-left px-3 py-1.5 text-sm hover:text-[var(--color-gold)] ffx-header tracking-wider"
            style={{ fontSize: '14px' }}
            onClick={() => { navigate('/superbosses'); onClose() }}
          >
            Superbosses
            <span className="text-[10px] opacity-60 ml-2 font-normal">{defeatedCount}/14</span>
          </button>
        </div>
      </nav>
    </>
  )
}
