import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CelestialTracker from './CelestialTracker'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders all 7 character names', () => {
  wrap(<CelestialTracker />)
  ;['Tidus', 'Yuna', 'Wakka', 'Lulu', 'Kimahri', 'Auron', 'Rikku'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 21 checkboxes total', () => {
  wrap(<CelestialTracker />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(21)
})

it('shows Mark as missed button only on Yuna card', () => {
  wrap(<CelestialTracker />)
  expect(screen.getAllByText(/mark as missed/i)).toHaveLength(1)
})

it('shows missed overlay when Yuna is marked missed', () => {
  wrap(<CelestialTracker />)
  fireEvent.click(screen.getByText(/mark as missed/i))
  expect(screen.getByText(/permanently missed/i)).toBeInTheDocument()
})
