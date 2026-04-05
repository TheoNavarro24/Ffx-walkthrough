import { useState } from 'react'
import TabBar from '../Collectibles/TabBar'
import ElementalChart from './ElementalChart'
import StatusEffects from './StatusEffects'
import KeyItems from './KeyItems'

const TABS = ['Elements', 'Status', 'Key Items']

export default function QuickRefPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Elements')

  return (
    <div
      className="fixed top-0 right-0 h-screen w-72 ffx-panel overflow-y-auto flex flex-col"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s ease',
        zIndex: 100,
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] flex-shrink-0">
        <h2 className="ffx-header text-lg">Quick Reference</h2>
        <button
          onClick={onClose}
          aria-label="Close quick reference"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
        >
          {'\u00D7'}
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
        {activeTab === 'Elements'  && <ElementalChart />}
        {activeTab === 'Status'    && <StatusEffects />}
        {activeTab === 'Key Items' && <KeyItems />}
      </div>
    </div>
  )
}
