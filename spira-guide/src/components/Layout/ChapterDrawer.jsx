export default function ChapterDrawer({ isOpen, onClose }) {
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
        style={isOpen ? {} : { opacity: 0, pointerEvents: 'none' }}
        className="fixed top-0 left-0 h-full w-72 ffx-panel z-20 p-4"
      >
        <p>Chapter list coming in Task 7</p>
      </nav>
    </>
  )
}
