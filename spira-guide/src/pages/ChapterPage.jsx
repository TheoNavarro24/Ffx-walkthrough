import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getChapterBySlug } from '../data/chapterIndex'
import { getChapterData } from '../data/chapterData'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useToc } from '../context/TocContext'
import SubLocation from '../components/SubLocation'
import MissableAlert from '../components/MissableAlert'
import ItemList from '../components/ItemList'
import BossCard from '../components/BossCard'
import ChapterHeader from '../components/ChapterHeader'
import OakaReminder from '../components/OakaReminder'
import SphereGridTip from '../components/SphereGridTip'
import CloisterSection from '../components/CloisterSection'
import ChapterNav from '../components/ChapterNav'
import { getBoss } from '../data/bossBySlug'
import besaidCloister from '../data/cloisters/besaid.json'

const SECTION_IDS = ['section-walkthrough', 'section-bosses', 'section-collectibles']
const SECTION_LABELS = [
  { id: 'section-walkthrough', label: 'Walkthrough' },
  { id: 'section-bosses', label: 'Bosses' },
  { id: 'section-collectibles', label: 'Collectibles' },
]

const CLOISTER_DATA = {
  besaid: besaidCloister,
}

export default function ChapterPage() {
  const { slug } = useParams()
  const chapter = getChapterBySlug(slug)
  const data = getChapterData(slug)
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)
  const { setSections, setActiveId } = useToc()

  useEffect(() => {
    setSections(SECTION_LABELS)
    return () => setSections([])
  }, [setSections])

  useEffect(() => {
    setActiveId(activeId)
  }, [activeId, setActiveId])

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4">
      <MissableAlert missables={data.missables} />
      <ChapterHeader
        name={chapter?.name ?? slug}
        act={chapter?.act ?? 1}
        slug={slug}
        mapImage={chapter?.mapImage}
        party={data.party}
      />

      <div className="flex justify-end">
        <button
          className="ffx-button text-xs"
          onClick={() => setShowUncheckedOnly((v) => !v)}
        >
          {showUncheckedOnly ? 'Show All' : 'Unchecked Only'}
        </button>
      </div>

      <section id="section-walkthrough" aria-label="Walkthrough and Items">
        <h2 className="ffx-header text-base mb-2">Walkthrough &amp; Items</h2>
        <div className="ffx-panel">
          {data.subLocations.map((loc) => (
            <SubLocation
              key={loc.name}
              slug={slug}
              name={loc.name}
              prose={loc.prose}
              items={loc.items}
            >
              <ItemList items={loc.items} showUncheckedOnly={showUncheckedOnly} />
            </SubLocation>
          ))}
        </div>
      </section>

      <OakaReminder oaka={data.oaka} />

      <SphereGridTip tip={data.sgTip} />

      <section id="section-bosses" aria-label="Boss Encounters">
        <h2 className="ffx-header text-base mb-2">Boss Encounters</h2>
        <div className="flex flex-col gap-3">
          {data.bosses.map((bossSlug) => (
            <BossCard
              key={bossSlug}
              chapterSlug={slug}
              bossSlug={bossSlug}
              boss={getBoss(bossSlug)}
            />
          ))}
        </div>
      </section>

      <section id="section-collectibles" aria-label="Collectibles">
        <h2 className="ffx-header text-base mb-2">Collectibles</h2>
        {data.cloister && (
          <CloisterSection cloister={CLOISTER_DATA[data.cloister] ?? null} />
        )}
      </section>

      {data.optionalAreas?.length > 0 && (
        <section id="section-optional" aria-label="Optional Areas">
          <h2 className="ffx-header text-base mb-2">Optional Areas</h2>
          <div className="ffx-panel">
            {data.optionalAreas.map((area) => (
              <SubLocation
                key={area.name}
                slug={slug}
                name={area.name}
                prose={area.prose}
                items={area.items}
              >
                <ItemList items={area.items} showUncheckedOnly={showUncheckedOnly} />
              </SubLocation>
            ))}
          </div>
        </section>
      )}

      <ChapterNav currentSlug={slug} />
    </div>
  )
}
