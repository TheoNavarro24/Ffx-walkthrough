import { render, screen, fireEvent } from '@testing-library/react'
import TabBar from './TabBar'

const TABS = ['Celestials', 'Primers', 'Cloisters', 'Aeons', 'Jecht Spheres', 'Blitzball']

it('renders all 6 tab buttons', () => {
  render(<TabBar tabs={TABS} active="Celestials" onSelect={() => {}} />)
  TABS.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument())
})

it('calls onSelect with tab name when clicked', () => {
  const onSelect = vi.fn()
  render(<TabBar tabs={TABS} active="Celestials" onSelect={onSelect} />)
  fireEvent.click(screen.getByText('Primers'))
  expect(onSelect).toHaveBeenCalledWith('Primers')
})

it('marks active tab with aria-selected', () => {
  render(<TabBar tabs={TABS} active="Primers" onSelect={() => {}} />)
  expect(screen.getByText('Primers').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true')
})
