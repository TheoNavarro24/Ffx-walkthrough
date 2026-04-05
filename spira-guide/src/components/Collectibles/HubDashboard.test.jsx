import { render, screen } from '@testing-library/react'
import HubDashboard from './HubDashboard'

beforeEach(() => localStorage.clear())

it('renders Story pill', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Story/i)).toBeInTheDocument()
})

it('renders Collectibles pill', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Collectibles/i)).toBeInTheDocument()
})

it('renders all section counts', () => {
  render(<HubDashboard />)
  expect(screen.getByText(/Primers/i)).toBeInTheDocument()
  expect(screen.getByText(/Cloisters/i)).toBeInTheDocument()
  expect(screen.getByText(/Aeons/i)).toBeInTheDocument()
  expect(screen.getByText(/Jecht/i)).toBeInTheDocument()
})
