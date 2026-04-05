import { render, screen } from '@testing-library/react'
import CloisterSection from './CloisterSection'

const cloister = {
  slug: 'besaid',
  name: 'Besaid Cloister of Trials',
  mapImage: '/img/maps/cloisters/besaid.png',
  destructionSphere: 'Rod of Wisdom',
  missable: true,
  steps: ['Take the Besaid Sphere.', 'Insert it into the slot.'],
}

describe('CloisterSection', () => {
  it('renders nothing when cloister is null', () => {
    const { container } = render(<CloisterSection cloister={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the cloister name', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText('Besaid Cloister of Trials')).toBeInTheDocument()
  })

  it('renders all steps', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText('Take the Besaid Sphere.')).toBeInTheDocument()
    expect(screen.getByText('Insert it into the slot.')).toBeInTheDocument()
  })

  it('shows missable destruction sphere label', () => {
    render(<CloisterSection cloister={cloister} />)
    expect(screen.getByText(/rod of wisdom/i)).toBeInTheDocument()
  })
})
