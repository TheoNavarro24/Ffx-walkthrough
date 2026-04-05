import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchDropdown from './SearchDropdown'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('SearchDropdown', () => {
  it('renders a search input', () => {
    wrap(<SearchDropdown />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows no dropdown when query is empty', () => {
    wrap(<SearchDropdown />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows results after typing 2+ characters', () => {
    wrap(<SearchDropdown />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'be' } })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows "No results" when query matches nothing', () => {
    wrap(<SearchDropdown />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzzzz' } })
    expect(screen.getByText(/no results/i)).toBeInTheDocument()
  })

  it('clears results on Escape key', () => {
    wrap(<SearchDropdown />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'besaid' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
