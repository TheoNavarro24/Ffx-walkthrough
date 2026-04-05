import { useCheckbox } from './useCheckbox'
import { getChapterData } from '../data/chapterData'
import { getAllCheckableIds } from './useChapterProgress'

const CHAPTER_SLUGS = [
  'zanarkand', 'baaj-temple', 'besaid', 'ss-liki', 'kilika', 'ss-winno',
  'luca', 'miihen-highroad', 'mushroom-rock-road', 'djose', 'moonflow',
  'guadosalam', 'thunder-plains', 'macalania-woods', 'lake-macalania',
  'bikanel-desert', 'home', 'airship', 'bevelle', 'via-purifico',
  'highbridge', 'calm-lands', 'mt-gagazet', 'zanarkand-dome',
  'airship-sin', 'inside-sin',
]

export function useStoryProgress() {
  const { checkedCount } = useCheckbox()
  const allIds = CHAPTER_SLUGS.flatMap((slug) =>
    getAllCheckableIds(getChapterData(slug))
  )
  const checked = checkedCount(allIds)
  const total = allIds.length
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100)
  return { checked, total, percent }
}
