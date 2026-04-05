import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CloisterChecklist from './CloisterChecklist'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders 6 temple cards', () => {
  wrap(<CloisterChecklist />)
  ;['Besaid', 'Kilika', 'Djose', 'Macalania', 'Bevelle', 'Zanarkand'].forEach((name) =>
    expect(screen.getByText(name)).toBeInTheDocument()
  )
})

it('renders 6 checkboxes', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(6)
})

it('shows Anima progress counter', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getByText(/Anima/i)).toBeInTheDocument()
})

it('shows missable badge on Besaid and Kilika', () => {
  wrap(<CloisterChecklist />)
  expect(screen.getAllByText(/missable/i).length).toBeGreaterThanOrEqual(2)
})
