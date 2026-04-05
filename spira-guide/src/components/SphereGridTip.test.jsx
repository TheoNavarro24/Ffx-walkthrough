import { render, screen } from '@testing-library/react'
import SphereGridTip from './SphereGridTip'

describe('SphereGridTip', () => {
  it('renders nothing when tip is null', () => {
    const { container } = render(<SphereGridTip tip={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the tip text', () => {
    render(<SphereGridTip tip="Unlock NulBlaze before leaving." />)
    expect(screen.getByText(/NulBlaze/)).toBeInTheDocument()
  })

  it('has a sphere grid label', () => {
    render(<SphereGridTip tip="Unlock NulBlaze before leaving." />)
    expect(screen.getByText(/sphere grid/i)).toBeInTheDocument()
  })
})
