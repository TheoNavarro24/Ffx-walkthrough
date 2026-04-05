import { useParams } from 'react-router-dom'
import { getChapterBySlug } from '../data/chapterIndex'
import { getChapterData } from '../data/chapterData'

export default function ChapterPage() {
  const { slug } = useParams()
  const chapter = getChapterBySlug(slug)
  const data = getChapterData(slug)

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4">
      <h1 className="ffx-header text-2xl">{chapter?.name ?? slug}</h1>

      <section id="section-walkthrough" aria-label="Walkthrough and Items">
        <h2 className="ffx-header text-base mb-2">Walkthrough &amp; Items</h2>
        {data.subLocations.map((loc) => (
          <div key={loc.name}>{loc.name}</div>
        ))}
      </section>

      <section id="section-bosses" aria-label="Boss Encounters">
        <h2 className="ffx-header text-base mb-2">Boss Encounters</h2>
      </section>

      <section id="section-collectibles" aria-label="Collectibles">
        <h2 className="ffx-header text-base mb-2">Collectibles</h2>
      </section>
    </div>
  )
}
