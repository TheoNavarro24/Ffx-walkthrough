import { useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useToc } from '../context/TocContext'
import BossCard from '../components/BossCard'
import MissableAlert from '../components/MissableAlert'
import GuideImages from '../components/GuideImages'
import { getBoss } from '../data/bossBySlug'
import { assetUrl } from '../utils/assetUrl'
import superbossData from '../data/superbosses.json'

const SECTION_IDS = ['section-preparation', 'section-dark-aeons', 'section-penance', 'section-nemesis']
const SECTION_LABELS = [
  { id: 'section-preparation', label: 'Preparation' },
  { id: 'section-dark-aeons', label: 'Dark Aeons' },
  { id: 'section-penance', label: 'Penance' },
  { id: 'section-nemesis', label: 'Nemesis' },
]

function buildBoss(slug, overrides = {}) {
  const stats = getBoss(slug)
  return stats ? { ...stats, ...overrides } : null
}

export default function SuperbossesPage() {
  const activeId = useScrollSpy(SECTION_IDS)
  const { setSections, setActiveId } = useToc()

  useEffect(() => {
    setSections(SECTION_LABELS)
    return () => setSections([])
  }, [setSections])

  useEffect(() => {
    setActiveId(activeId)
  }, [activeId, setActiveId])

  const penanceBody = buildBoss(superbossData.penance.slug, {
    name: 'Penance',
    strategy: superbossData.penance.strategy,
  })
  const penanceArms = buildBoss(superbossData.penance.armsSlug, {
    name: 'Penance (Arms)',
    strategy: 'Each arm has 500,000 HP and regenerates after being destroyed. Destroy arms to prevent Judgment Day. Time killing blows just before the arm\'s turn for maximum regeneration delay.',
  })
  const nemesis = buildBoss(superbossData.nemesis.slug, { name: 'Nemesis' })

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4 pyrefly-page-enter">
      {/* Page Title */}
      <div className="ffx-panel p-4">
        <h1 className="ffx-header text-3xl tracking-widest">SUPERBOSSES</h1>
        <p className="text-sm text-gray-400 mt-1">Dark Aeons & Penance — HD Remaster Endgame</p>
      </div>

      {/* Section 1: Preparation */}
      <section id="section-preparation" aria-label="Preparation Guide">
        <h2 className="ffx-section-heading">Preparation</h2>
        <div className="ffx-panel p-4 flex flex-col gap-3">
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {superbossData.preparation.prose.join('\n\n')}
          </p>
          {superbossData.preparation.guideImages && (
            <GuideImages images={superbossData.preparation.guideImages} />
          )}
        </div>
      </section>

      {/* Section 2: Dark Aeons */}
      <section id="section-dark-aeons" aria-label="Dark Aeons">
        <h2 className="ffx-section-heading">Dark Aeons</h2>
        <div className="ffx-panel p-4 mb-3">
          <p className="text-sm text-gray-300">{superbossData.generalStrategy}</p>
        </div>
        <div className="flex flex-col gap-4">
          {superbossData.darkAeons.map((da) => {
            const boss = buildBoss(da.slug, { name: da.name, strategy: da.strategy })
            return (
              <div key={da.slug} id={`boss-${da.slug}`}>
                {/* Location & Map */}
                <div className="ffx-panel p-3 mb-2 flex gap-3">
                  <img
                    src={assetUrl(da.regionMap)}
                    alt={`${da.location} map`}
                    className="w-32 h-24 object-cover rounded flex-shrink-0"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div>
                    <p className="ffx-header text-sm">{da.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{da.locationDescription}</p>
                  </div>
                </div>
                {/* BossCard */}
                <BossCard chapterSlug="superbosses" bossSlug={da.slug} boss={boss} />
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 3: Penance */}
      <section id="section-penance" aria-label="Penance">
        <h2 className="ffx-section-heading">Penance</h2>
        <MissableAlert heading="Prerequisite" missables={[superbossData.penance.prerequisite]} />
        <div className="flex flex-col gap-3 mt-3">
          <div id={`boss-${superbossData.penance.slug}`}>
            <BossCard chapterSlug="superbosses" bossSlug={superbossData.penance.slug} boss={penanceBody} />
          </div>
          <div id={`boss-${superbossData.penance.armsSlug}`}>
            <BossCard chapterSlug="superbosses" bossSlug={superbossData.penance.armsSlug} boss={penanceArms} />
          </div>
        </div>
        {/* Zanmato Tip */}
        <div className="ffx-panel p-3 mt-3" style={{ borderColor: 'var(--color-gold)' }}>
          <p className="ffx-header text-sm" style={{ color: 'var(--color-gold)' }}>There's Always Zanmato...</p>
          <p className="text-xs text-gray-400 mt-1">{superbossData.penance.zanmatoTip}</p>
        </div>
      </section>

      {/* Section 4: Nemesis */}
      <section id="section-nemesis" aria-label="Nemesis">
        <h2 className="ffx-section-heading">Nemesis</h2>
        <div className="ffx-panel p-3 mb-2">
          <p className="text-xs text-gray-400">{superbossData.nemesis.note}</p>
        </div>
        <div id={`boss-${superbossData.nemesis.slug}`}>
          <BossCard chapterSlug="superbosses" bossSlug={superbossData.nemesis.slug} boss={nemesis} />
        </div>
      </section>
    </div>
  )
}
