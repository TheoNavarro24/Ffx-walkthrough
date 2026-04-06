import { render, screen, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import JechtSpheres from './JechtSpheres'
import { useCheckbox } from '../../hooks/useCheckbox'
import { SaveContextProvider } from '../../context/SaveContext'
import { CheckboxProvider } from '../../context/CheckboxContext'

beforeEach(() => localStorage.clear())
const wrap = (ui) => render(
  <MemoryRouter>
    <SaveContextProvider>
      <CheckboxProvider>{ui}</CheckboxProvider>
    </SaveContextProvider>
  </MemoryRouter>
)

it('renders 10 sphere checkboxes', () => {
  wrap(<JechtSpheres />)
  expect(screen.getAllByRole('checkbox')).toHaveLength(10)
})

it('shows overdrive milestone list', () => {
  wrap(<JechtSpheres />)
  expect(screen.getByText(/Shooting Star/i)).toBeInTheDocument()
  expect(screen.getByText(/Banishing Blade/i)).toBeInTheDocument()
  expect(screen.getByText(/Tornado/i)).toBeInTheDocument()
})

it('highlights reached milestone when spheres are checked', () => {
  localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'jecht-sphere-1': true }))
  wrap(<JechtSpheres />)
  // Shooting Star milestone should be marked reached (1 sphere checked)
  const li = screen.getByText(/Shooting Star/i).closest('li')
  expect(li.className).toContain('text-[var(--color-gold)]')
})
