import { render, screen } from '@testing-library/react'
import OakaReminder from './OakaReminder'

describe('OakaReminder', () => {
  it('renders nothing when oaka is null', () => {
    const { container } = render(<OakaReminder oaka={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a donation reminder when oaka is present', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/o'aka/i)).toBeInTheDocument()
  })

  it('shows the target donation amount', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/1,001/)).toBeInTheDocument()
  })

  it('describes the pricing tier unlocked', () => {
    render(<OakaReminder oaka={{ meeting: true, cumulativeTarget: 1001 }} />)
    expect(screen.getByText(/standard/i)).toBeInTheDocument()
  })
})
