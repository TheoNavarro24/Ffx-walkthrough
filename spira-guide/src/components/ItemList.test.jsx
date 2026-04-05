import { render, screen, fireEvent } from '@testing-library/react'
import ItemList from './ItemList'

beforeEach(() => localStorage.clear())

const items = [
  { id: 'item-1', name: 'Moon Crest', icon: 'moon-crest', missable: true },
  { id: 'item-2', name: 'Antidote', icon: 'antidote', missable: false },
]

describe('ItemList', () => {
  it('renders all items', () => {
    render(<ItemList items={items} />)
    expect(screen.getByText('Moon Crest')).toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders checkboxes for each item', () => {
    render(<ItemList items={items} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })

  it('checking an item marks it visually as done', () => {
    render(<ItemList items={items} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('hides checked items when showUncheckedOnly is true', () => {
    render(<ItemList items={items} showUncheckedOnly />)
    // check item-1 first
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.queryByText('Moon Crest')).not.toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders missable tag for missable items', () => {
    render(<ItemList items={items} />)
    expect(screen.getByText(/missable/i)).toBeInTheDocument()
  })
})
