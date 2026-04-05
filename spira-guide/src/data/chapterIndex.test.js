import { describe, it, expect } from 'vitest'
import { chapters, getChapterBySlug } from './chapterIndex'

describe('chapterIndex', () => {
  it('has exactly 26 chapters', () => {
    expect(chapters).toHaveLength(26)
  })

  it('every chapter has required fields', () => {
    chapters.forEach((ch) => {
      expect(ch).toHaveProperty('slug')
      expect(ch).toHaveProperty('name')
      expect(ch).toHaveProperty('act')
      expect(ch).toHaveProperty('mapImage')
      expect(typeof ch.slug).toBe('string')
      expect(typeof ch.name).toBe('string')
      expect([1, 2, 3, 4]).toContain(ch.act)
      expect(typeof ch.mapImage).toBe('string')
    })
  })

  it('all slugs are unique', () => {
    const slugs = chapters.map((ch) => ch.slug)
    expect(new Set(slugs).size).toBe(26)
  })

  it('getChapterBySlug returns the correct chapter', () => {
    const ch = getChapterBySlug('besaid')
    expect(ch.name).toBe('Besaid')
    expect(ch.act).toBe(1)
  })

  it('getChapterBySlug returns undefined for unknown slug', () => {
    expect(getChapterBySlug('not-a-place')).toBeUndefined()
  })
})
