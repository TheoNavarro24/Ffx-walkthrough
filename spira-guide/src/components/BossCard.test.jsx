import { render, screen, fireEvent } from '@testing-library/react'
import BossCard from './BossCard'

beforeEach(() => localStorage.clear())

const boss = {
  name: 'Valefor',
  hp: 4000,
  weaknesses: ['Thunder'],
  steals: ['Ability Sphere'],
  drops: ['Ability Sphere'],
  strategy: 'Use Thunder magic. Valefor uses Sonic Wings to reduce turns.',
}

describe('BossCard', () => {
  it('renders the boss name', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.getByText('Valefor')).toBeInTheDocument()
  })

  it('renders HP and weakness in compact view', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.getByText(/4,000/)).toBeInTheDocument()
    expect(screen.getByText(/Thunder/)).toBeInTheDocument()
  })

  it('expands to show strategy on click', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    expect(screen.queryByText(/Sonic Wings/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /valefor/i }))
    expect(screen.getByText(/Sonic Wings/)).toBeInTheDocument()
  })

  it('renders a checkbox for marking the boss as defeated when expanded', () => {
    render(<BossCard chapterSlug="besaid" bossSlug="valefor" boss={boss} />)
    fireEvent.click(screen.getByRole('button', { name: /valefor/i }))
    expect(screen.getByRole('checkbox', { name: /defeated/i })).toBeInTheDocument()
  })
})
