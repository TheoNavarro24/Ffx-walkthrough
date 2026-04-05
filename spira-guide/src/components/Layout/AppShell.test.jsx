import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppShell from './AppShell'

function renderAppShell() {
  return render(
    <MemoryRouter>
      <AppShell />
    </MemoryRouter>
  )
}

describe('AppShell', () => {
  it('renders the header', () => {
    renderAppShell()
    expect(screen.getByText('Spira Guide')).toBeInTheDocument()
  })

  it('chapter drawer is hidden by default', () => {
    renderAppShell()
    expect(screen.queryByRole('navigation', { name: /chapters/i })).not.toBeVisible()
  })

  it('hamburger button opens the chapter drawer', () => {
    renderAppShell()
    fireEvent.click(screen.getByRole('button', { name: /open chapter list/i }))
    expect(screen.getByRole('navigation', { name: /chapters/i })).toBeVisible()
  })

  it('clicking the backdrop closes the chapter drawer', () => {
    renderAppShell()
    fireEvent.click(screen.getByRole('button', { name: /open chapter list/i }))
    fireEvent.click(screen.getByTestId('drawer-backdrop'))
    expect(screen.queryByRole('navigation', { name: /chapters/i })).not.toBeVisible()
  })

  it('TOC is collapsed by default and can be expanded', () => {
    renderAppShell()
    const tocToggle = screen.getByRole('button', { name: /contents/i })
    expect(screen.getByTestId('toc-panel')).not.toHaveClass('toc-expanded')
    fireEvent.click(tocToggle)
    expect(screen.getByTestId('toc-panel')).toHaveClass('toc-expanded')
  })
})
