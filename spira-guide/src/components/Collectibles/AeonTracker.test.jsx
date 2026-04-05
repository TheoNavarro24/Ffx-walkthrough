import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AeonTracker from './AeonTracker'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 8 aeon cards', () => {
  wrap(<AeonTracker />)
  ;['Valefor', 'Ifrit', 'Ixion', 'Shiva', 'Bahamut', 'Yojimbo', 'Anima', 'Magus Sisters'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 8 checkboxes', () => {
  wrap(<AeonTracker />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(8)
})

it('shows airship overlay on Anima and Magus Sisters when not unlocked', () => {
  wrap(<AeonTracker />)
  expect(screen.getAllByText(/Airship required/i).length).toBe(2)
})

it('Yojimbo has no airship overlay', () => {
  wrap(<AeonTracker />)
  const yojimboCard = screen.getByText('Yojimbo').closest('[data-testid="aeon-card"]')
  expect(yojimboCard).not.toHaveTextContent(/Airship required/i)
})
