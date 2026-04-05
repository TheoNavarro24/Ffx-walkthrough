import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ChapterNav from './ChapterNav'

beforeEach(() => localStorage.clear())

function renderNav(slug) {
  return render(
    <MemoryRouter>
      <ChapterNav currentSlug={slug} />
    </MemoryRouter>
  )
}

describe('ChapterNav', () => {
  it('renders previous chapter link for non-first chapter', () => {
    renderNav('besaid') // third chapter (index 2, after zanarkand and baaj-temple)
    expect(screen.getByText(/baaj temple/i)).toBeInTheDocument()
  })

  it('renders next chapter link', () => {
    renderNav('besaid')
    expect(screen.getByText(/s\.s\. liki/i)).toBeInTheDocument()
  })

  it('does not render a prev link for the first chapter', () => {
    renderNav('zanarkand')
    expect(screen.queryByText(/previous/i)).not.toBeInTheDocument()
  })

  it('does not render a next link for the last chapter', () => {
    renderNav('inside-sin')
    expect(screen.queryByText(/next/i)).not.toBeInTheDocument()
  })
})
