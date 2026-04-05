import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ChapterDrawer from './ChapterDrawer'
import TableOfContents from './TableOfContents'
import QuickRefPanel from '../QuickRef/QuickRefPanel'
import PyreflyTransition from '../PyreflyTransition'
import { useToc } from '../../context/TocContext'

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [qrpOpen, setQrpOpen] = useState(false)
  const { sections, activeId } = useToc()

  return (
    <div className="flex flex-col h-screen">
      <Header
        onHamburgerClick={() => setDrawerOpen((o) => !o)}
        isDrawerOpen={drawerOpen}
        onQRPClick={() => setQrpOpen((o) => !o)}
        isQRPOpen={qrpOpen}
      />
      <div className="flex flex-1 relative">
        <ChapterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
        <TableOfContents
          isOpen={tocOpen}
          onToggle={() => setTocOpen((o) => !o)}
          sections={sections}
          activeId={activeId}
        />
      </div>
      <QuickRefPanel isOpen={qrpOpen} onClose={() => setQrpOpen(false)} />
      <PyreflyTransition />
    </div>
  )
}
