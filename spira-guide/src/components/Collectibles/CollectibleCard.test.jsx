import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CollectibleCard from './CollectibleCard'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

it('renders children when not locked', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="moon-crest"><span>Moon Crest</span></CollectibleCard>)
  expect(screen.getByText('Moon Crest')).toBeInTheDocument()
})

it('shows airship overlay when airshipRequired and not unlocked', () => {
  wrap(<CollectibleCard chapterSlug="airship" anchor="x" airshipRequired airshipUnlocked={false} airshipReason="Requires airship">child</CollectibleCard>)
  expect(screen.getByText(/Airship required/i)).toBeInTheDocument()
})

it('hides airship overlay when airshipUnlocked is true', () => {
  wrap(<CollectibleCard chapterSlug="airship" anchor="x" airshipRequired airshipUnlocked={true}>child</CollectibleCard>)
  expect(screen.queryByText(/Airship required/i)).not.toBeInTheDocument()
})

it('links to /chapter/airship when locked airship item is clicked', () => {
  wrap(<CollectibleCard chapterSlug="some-chapter" anchor="item" airshipRequired airshipUnlocked={false}>child</CollectibleCard>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/chapter/airship')
})

it('links to chapter when unlocked', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="moon-crest">child</CollectibleCard>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/chapter/besaid#moon-crest')
})

it('shows missed overlay when missed prop is true', () => {
  wrap(<CollectibleCard chapterSlug="besaid" anchor="x" missed missedExplanation="Dark Valefor blocks return.">child</CollectibleCard>)
  expect(screen.getByText(/permanently missed/i)).toBeInTheDocument()
})
