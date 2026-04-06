import { render, screen, fireEvent } from '@testing-library/react'
import ItemList from './ItemList'
import { SaveContextProvider } from '../context/SaveContext'
import { CheckboxProvider } from '../context/CheckboxContext'

beforeEach(() => localStorage.clear())

function wrap(ui) {
  return render(
    <SaveContextProvider>
      <CheckboxProvider>{ui}</CheckboxProvider>
    </SaveContextProvider>
  )
}

const items = [
  { id: 'item-1', name: 'Moon Crest', icon: 'moon-crest', missable: true },
  { id: 'item-2', name: 'Antidote', icon: 'antidote', missable: false },
]

describe('ItemList', () => {
  it('renders all items', () => {
    wrap(<ItemList items={items} />)
    expect(screen.getByText('Moon Crest')).toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders checkboxes for each item', () => {
    wrap(<ItemList items={items} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })

  it('checking an item marks it visually as done', () => {
    wrap(<ItemList items={items} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('hides checked items when showUncheckedOnly is true', () => {
    wrap(<ItemList items={items} showUncheckedOnly />)
    // check item-1 first
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.queryByText('Moon Crest')).not.toBeInTheDocument()
    expect(screen.getByText('Antidote')).toBeInTheDocument()
  })

  it('renders missable tag for missable items', () => {
    wrap(<ItemList items={items} />)
    expect(screen.getByText(/missable/i)).toBeInTheDocument()
  })
})
