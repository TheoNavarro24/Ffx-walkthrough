import { Link } from 'react-router-dom'

export default function Header({ onHamburgerClick, isDrawerOpen }) {
  return (
    <header className="ffx-panel flex items-center gap-4 px-4 py-3">
      <button
        className="ffx-button text-xl w-10 h-10 flex items-center justify-center"
        onClick={onHamburgerClick}
        aria-label={isDrawerOpen ? 'Close chapter list' : 'Open chapter list'}
        aria-expanded={isDrawerOpen}
      >
        ☰
      </button>
      <span className="ffx-header text-lg flex-1">Spira Guide</span>
      <input
        className="ffx-button px-3 py-1 w-48"
        type="search"
        placeholder="Search…"
        aria-label="Search"
        disabled
      />
      <Link to="/settings" className="ffx-button w-10 h-10 flex items-center justify-center" aria-label="Settings">
        ⚙
      </Link>
    </header>
  )
}
