import { render, screen, fireEvent } from '@testing-library/react'
import SubLocation from './SubLocation'

const items = [
  { id: 'item-1', name: 'Moon Crest', icon: 'moon-crest', missable: true },
  { id: 'item-2', name: 'Antidote', icon: 'antidote', missable: false },
]

beforeEach(() => localStorage.clear())

describe('SubLocation', () => {
  it('renders the location name', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByRole('button', { name: /Beach/i })).toBeInTheDocument()
  })

  it('renders items when expanded', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByText('Moon Crest')).toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('collapses and hides items on toggle', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    fireEvent.click(screen.getByRole('button', { name: /Beach/i }))
    expect(screen.queryByText('Moon Crest')).not.toBeInTheDocument()
  })

  it('shows MISSABLE tag for missable items', () => {
    render(<SubLocation slug="besaid" name="Beach" prose="Go east." items={items} />)
    expect(screen.getByText(/missable/i)).toBeInTheDocument()
  })
})
