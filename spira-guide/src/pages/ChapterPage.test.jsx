import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ChapterPage from './ChapterPage'

function renderChapter(slug = 'besaid') {
  return render(
    <MemoryRouter initialEntries={[`/chapter/${slug}`]}>
      <Routes>
        <Route path="/chapter/:slug" element={<ChapterPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ChapterPage', () => {
  it('renders the chapter name as a heading', () => {
    renderChapter('besaid')
    expect(screen.getByRole('heading', { name: /besaid/i })).toBeInTheDocument()
  })

  it('renders section anchors for TOC', () => {
    renderChapter('besaid')
    expect(document.getElementById('section-walkthrough')).toBeInTheDocument()
    expect(document.getElementById('section-bosses')).toBeInTheDocument()
  })

  it('renders gracefully for an unknown chapter slug', () => {
    renderChapter('unknown-slug')
    expect(document.getElementById('section-walkthrough')).toBeInTheDocument()
  })
})
