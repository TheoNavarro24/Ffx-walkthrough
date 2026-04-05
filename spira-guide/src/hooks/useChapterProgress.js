import { getChapterData } from '../data/chapterData'
import { useCheckbox } from './useCheckbox'

function getAllCheckableIds(data) {
  const itemIds = data.subLocations.flatMap((loc) => loc.items.map((i) => i.id))
  const bossIds = data.bosses.map((slug) => `${data.slug}-boss-${slug}`)
  const optionalIds = (data.optionalAreas ?? []).flatMap((area) =>
    area.items.map((i) => i.id)
  )
  return [...itemIds, ...bossIds, ...optionalIds]
}

export function useChapterProgress(slug) {
  const data = getChapterData(slug)
  const { checkedCount } = useCheckbox()
  const ids = getAllCheckableIds(data)
  return { checked: checkedCount(ids), total: ids.length }
}
