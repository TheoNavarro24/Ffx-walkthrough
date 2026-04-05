import { render, screen } from '@testing-library/react'
import MissableAlert from './MissableAlert'

describe('MissableAlert', () => {
  it('renders nothing when missables array is empty', () => {
    const { container } = render(<MissableAlert missables={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a banner when missables are present', () => {
    render(<MissableAlert missables={['Rod of Wisdom — Besaid Temple']} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('lists each missable item', () => {
    render(<MissableAlert missables={['Item A', 'Item B']} />)
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Item B')).toBeInTheDocument()
  })
})
