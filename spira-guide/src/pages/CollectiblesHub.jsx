import { useState } from 'react'
import HubDashboard from '../components/Collectibles/HubDashboard'
import TabBar from '../components/Collectibles/TabBar'
import CelestialTracker from '../components/Collectibles/CelestialTracker'
import PrimerList from '../components/Collectibles/PrimerList'
import CloisterChecklist from '../components/Collectibles/CloisterChecklist'
import AeonTracker from '../components/Collectibles/AeonTracker'
import JechtSpheres from '../components/Collectibles/JechtSpheres'
import BlitzballNote from '../components/Collectibles/BlitzballNote'

const TABS = ['Celestials', 'Primers', 'Cloisters', 'Aeons', 'Jecht Spheres', 'Blitzball']

const TAB_COMPONENTS = {
  Celestials: CelestialTracker,
  Primers: PrimerList,
  Cloisters: CloisterChecklist,
  Aeons: AeonTracker,
  'Jecht Spheres': JechtSpheres,
  Blitzball: BlitzballNote,
}

export default function CollectiblesHub() {
  const [activeTab, setActiveTab] = useState('Celestials')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>
        COLLECTIBLES
      </h1>
      <HubDashboard />
      <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
      <ActiveComponent />
    </div>
  )
}
