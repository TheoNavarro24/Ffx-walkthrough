import { render, screen } from '@testing-library/react'
import PartyIndicator from './PartyIndicator'

describe('PartyIndicator', () => {
  it('renders portrait image for each party member', () => {
    render(<PartyIndicator party={['Tidus', 'Yuna', 'Wakka']} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('uses character name as alt text', () => {
    render(<PartyIndicator party={['Tidus']} />)
    expect(screen.getByAltText('Tidus')).toBeInTheDocument()
  })

  it('renders nothing for empty party array', () => {
    const { container } = render(<PartyIndicator party={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
