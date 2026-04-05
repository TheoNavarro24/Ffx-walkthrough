import { migrateLegacyChecks, SaveContextProvider, useSaveSlot } from './SaveContext'
import { render, act } from '@testing-library/react'

beforeEach(() => localStorage.clear())

describe('migrateLegacyChecks', () => {
  it('creates a default slot when nothing exists', () => {
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots).toHaveLength(1)
    expect(data.slots[0].id).toBe('slot-default')
    expect(data.slots[0].name).toBe('Main Run')
    expect(data.activeSlotId).toBe('slot-default')
  })

  it('migrates existing spira-checks into slot-default', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'item-1': true }))
    migrateLegacyChecks()
    expect(localStorage.getItem('spira-checks')).toBeNull()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({ 'item-1': true })
  })

  it('does not overwrite existing slot-default checks during migration', () => {
    localStorage.setItem('spira-checks', JSON.stringify({ 'old': true }))
    localStorage.setItem('spira-checks:slot-default', JSON.stringify({ 'existing': true }))
    migrateLegacyChecks()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({ 'existing': true })
    expect(localStorage.getItem('spira-checks')).toBeNull()
  })

  it('is idempotent when spira-slots already exists', () => {
    const existing = { slots: [{ id: 'slot-abc', name: 'My Run', createdAt: '2026-01-01' }], activeSlotId: 'slot-abc' }
    localStorage.setItem('spira-slots', JSON.stringify(existing))
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots[0].id).toBe('slot-abc')
  })

  it('re-initializes when spira-slots is malformed', () => {
    localStorage.setItem('spira-slots', 'NOT_JSON')
    migrateLegacyChecks()
    const data = JSON.parse(localStorage.getItem('spira-slots'))
    expect(data.slots[0].id).toBe('slot-default')
  })

  it('treats malformed spira-checks as empty object', () => {
    localStorage.setItem('spira-checks', 'GARBAGE')
    migrateLegacyChecks()
    const checks = JSON.parse(localStorage.getItem('spira-checks:slot-default'))
    expect(checks).toEqual({})
  })
})

// Helper: render a component that exposes useSaveSlot for testing
function TestConsumer({ fn }) {
  const ctx = useSaveSlot()
  fn(ctx)
  return null
}

function renderWithSave(fn) {
  let captured
  render(
    <SaveContextProvider>
      <TestConsumer fn={(ctx) => { captured = ctx }} />
    </SaveContextProvider>
  )
  return () => captured
}

describe('useSaveSlot', () => {
  beforeEach(() => localStorage.clear())

  it('initialises with a default slot after migration', () => {
    const getCtx = renderWithSave(() => {})
    expect(getCtx().slots).toHaveLength(1)
    expect(getCtx().activeSlot.name).toBe('Main Run')
  })

  it('createSlot adds a slot and switches to it', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('100% Run'))
    expect(getCtx().slots).toHaveLength(2)
    expect(getCtx().activeSlot.name).toBe('100% Run')
  })

  it('deleteSlot removes non-active slot without changing active', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Extra'))
    const extraId = getCtx().slots.find(s => s.name === 'Extra').id
    // Switch back to default so Extra is non-active before deleting it
    act(() => getCtx().switchSlot(getCtx().slots.find(s => s.name === 'Main Run').id))
    const activeId = getCtx().activeSlot.id
    act(() => getCtx().deleteSlot(extraId))
    expect(getCtx().slots).toHaveLength(1)
    expect(getCtx().activeSlot.id).toBe(activeId)
  })

  it('deleteSlot on active slot switches to first remaining', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Other'))
    const otherId = getCtx().slots.find(s => s.name === 'Other').id
    act(() => getCtx().switchSlot(otherId))
    act(() => getCtx().deleteSlot(otherId))
    expect(getCtx().activeSlot.name).toBe('Main Run')
  })

  it('deleteSlot does nothing when only one slot exists', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().deleteSlot(id))
    expect(getCtx().slots).toHaveLength(1)
  })

  it('deleteSlot removes the corresponding spira-checks key', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Temp'))
    const tempId = getCtx().slots.find(s => s.name === 'Temp').id
    localStorage.setItem(`spira-checks:${tempId}`, JSON.stringify({ x: true }))
    act(() => getCtx().deleteSlot(tempId))
    expect(localStorage.getItem(`spira-checks:${tempId}`)).toBeNull()
  })

  it('renameSlot updates the slot name', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().renameSlot(id, 'Renamed'))
    expect(getCtx().activeSlot.name).toBe('Renamed')
  })

  it('renameSlot ignores empty string', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    const originalName = getCtx().activeSlot.name
    act(() => getCtx().renameSlot(id, ''))
    expect(getCtx().activeSlot.name).toBe(originalName)
  })

  it('renameSlot truncates names over 40 characters', () => {
    const getCtx = renderWithSave(() => {})
    const id = getCtx().activeSlot.id
    act(() => getCtx().renameSlot(id, 'A'.repeat(50)))
    expect(getCtx().activeSlot.name.length).toBe(40)
  })

  it('switchSlot changes the active slot', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Other'))
    const otherId = getCtx().slots.find(s => s.name === 'Other').id
    act(() => getCtx().switchSlot(otherId))
    expect(getCtx().activeSlot.name).toBe('Other')
  })

  it('persists slot state to localStorage', () => {
    const getCtx = renderWithSave(() => {})
    act(() => getCtx().createSlot('Saved'))
    const stored = JSON.parse(localStorage.getItem('spira-slots'))
    expect(stored.slots).toHaveLength(2)
  })
})
