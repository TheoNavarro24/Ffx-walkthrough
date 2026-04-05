import { render, screen } from '@testing-library/react'
import ChapterHeader from './ChapterHeader'

describe('ChapterHeader', () => {
  it('renders the chapter name', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={['Tidus']} />)
    expect(screen.getByText('Besaid')).toBeInTheDocument()
  })

  it('renders the act label', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={[]} />)
    expect(screen.getByText(/act 1/i)).toBeInTheDocument()
  })

  it('renders a region map image', () => {
    render(<ChapterHeader name="Besaid" act={1} slug="besaid" party={[]} mapImage="/img/maps/regions/besaid/besaid.png" />)
    expect(screen.getByRole('img', { name: /besaid map/i })).toBeInTheDocument()
  })
})
