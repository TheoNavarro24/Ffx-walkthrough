import { Link } from 'react-router-dom'
import { assetUrl } from '../../utils/assetUrl'
import SearchDropdown from '../Search/SearchDropdown'

export default function Header({ onHamburgerClick, isDrawerOpen, onQRPClick, isQRPOpen }) {
  return (
    <header
      className="rounded-none border-b border-[var(--color-border)] flex items-center gap-3 px-3"
      style={{
        background: 'linear-gradient(to right, #ffffff 0%, #d6eef8 20%, #f8dde8 45%, #fad4bc 70%, #fdecc8 100%)',
        height: '52px',
      }}
    >
      <button
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors cursor-pointer flex-shrink-0"
        onClick={onHamburgerClick}
        aria-label={isDrawerOpen ? 'Close chapter list' : 'Open chapter list'}
        aria-expanded={isDrawerOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>

      <img
        src={assetUrl('img/ffx-logo.webp')}
        alt="Final Fantasy X"
        className="flex-shrink-0"
        style={{ height: '48px', width: 'auto' }}
      />

      <span className="flex-1" />

      <SearchDropdown />

      <Link
        to="/settings"
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors flex-shrink-0"
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </Link>

      <button
        className="w-9 h-9 flex items-center justify-center rounded text-[var(--color-bg-panel-dark)] hover:bg-black/10 transition-colors flex-shrink-0"
        onClick={onQRPClick}
        aria-label={isQRPOpen ? 'Close quick reference' : 'Open quick reference'}
        aria-expanded={isQRPOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      </button>
    </header>
  )
}
