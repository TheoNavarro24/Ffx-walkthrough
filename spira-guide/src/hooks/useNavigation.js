import { useLocalStorage } from './useLocalStorage'
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

export function useLastVisited() {
  const [lastVisited, setLastVisited] = useLocalStorage('spira-last-visited', 'zanarkand')
  return { lastVisited, setLastVisited }
}

export function useNextIncomplete() {
  const { checkedCount } = useCheckbox()
  const slug = CHAPTER_SLUGS.find((s) => {
    const ids = getAllCheckableIds(getChapterData(s))
    return ids.length === 0 || checkedCount(ids) < ids.length
  }) ?? CHAPTER_SLUGS[0]
  return slug
}
