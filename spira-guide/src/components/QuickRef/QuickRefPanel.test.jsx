import { render, screen, fireEvent } from '@testing-library/react'
import QuickRefPanel from './QuickRefPanel'

describe('QuickRefPanel', () => {
  it('is hidden when isOpen is false', () => {
    const { container } = render(<QuickRefPanel isOpen={false} onClose={() => {}} />)
    const panel = container.firstChild
    expect(panel.style.transform).toContain('translateX(100%)')
  })

  it('is visible when isOpen is true', () => {
    const { container } = render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    const panel = container.firstChild
    expect(panel.style.transform).toContain('translateX(0')
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<QuickRefPanel isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close quick reference'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows Elements tab by default', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('Elements')).toBeInTheDocument()
  })

  it('switches to Status tab on click', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    fireEvent.click(screen.getByText('Status'))
    expect(screen.getByText(/Poison/i)).toBeInTheDocument()
  })

  it('switches to Key Items tab on click', () => {
    render(<QuickRefPanel isOpen={true} onClose={() => {}} />)
    fireEvent.click(screen.getByText('Key Items'))
    expect(screen.getByText(/Al Bhed Potion/i)).toBeInTheDocument()
  })
})
