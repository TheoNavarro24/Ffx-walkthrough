import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SaveContextProvider } from '../../context/SaveContext'
import { CheckboxProvider } from '../../context/CheckboxContext'
import ChapterDrawer from './ChapterDrawer'

function renderDrawer(isOpen = true) {
  return render(
    <SaveContextProvider>
      <CheckboxProvider>
        <MemoryRouter>
          <ChapterDrawer isOpen={isOpen} onClose={vi.fn()} />
        </MemoryRouter>
      </CheckboxProvider>
    </SaveContextProvider>
  )
}

describe('ChapterDrawer', () => {
  it('renders all 4 act group headings', () => {
    renderDrawer()
    expect(screen.getByText(/Act 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 3/i)).toBeInTheDocument()
    expect(screen.getByText(/Act 4/i)).toBeInTheDocument()
  })

  it('renders Besaid in act 1', () => {
    renderDrawer()
    expect(screen.getByText('Besaid')).toBeInTheDocument()
  })

  it('renders Inside Sin in act 4', () => {
    renderDrawer()
    expect(screen.getByText('Inside Sin')).toBeInTheDocument()
  })

  it('act groups are collapsible', () => {
    renderDrawer()
    const act1Toggle = screen.getByRole('button', { name: /Act 1/i })
    fireEvent.click(act1Toggle)
    expect(screen.queryByText('Besaid')).not.toBeVisible()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <SaveContextProvider>
        <CheckboxProvider>
          <MemoryRouter>
            <ChapterDrawer isOpen={true} onClose={onClose} />
          </MemoryRouter>
        </CheckboxProvider>
      </SaveContextProvider>
    )
    fireEvent.click(screen.getByTestId('drawer-backdrop'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
