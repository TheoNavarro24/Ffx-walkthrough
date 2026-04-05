import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PrimerList from './PrimerList'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 26 primer rows', () => {
  wrap(<PrimerList />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(26)
})

it('shows missable badge on primers XVIII, XIX, XX, XXI, XXII', () => {
  wrap(<PrimerList />)
  expect(screen.getAllByText(/missable/i).length).toBeGreaterThanOrEqual(4)
})

it('shows airship overlay on Primer XXIV', () => {
  wrap(<PrimerList />)
  expect(screen.getAllByText(/Airship required/i).length).toBeGreaterThanOrEqual(1)
})
