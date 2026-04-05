import { useState } from 'react'
import { useSaveSlot } from '../context/SaveContext'
import { usePyrefly } from '../hooks/usePyrefly'

// ─── Export / Import helpers ──────────────────────────────────────────────────

function exportSave(activeSlot) {
  const checksRaw = localStorage.getItem(`spira-checks:${activeSlot.id}`)
  let checks = {}
  try { checks = JSON.parse(checksRaw) ?? {} } catch { /* empty */ }

  const payload = {
    version: 1,
    slotName: activeSlot.name,
    exportedAt: new Date().toISOString(),
    checks,
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const safeName = activeSlot.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  a.href = url
  a.download = `spira-save-${safeName}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importSave(activeSlot, onSuccess, onError) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = () => {
    const file = input.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (typeof data !== 'object' || typeof data.checks !== 'object' || typeof data.version !== 'number') {
          onError('Invalid save file — missing required fields.')
          return
        }
        const confirmed = window.confirm(
          `Replace all checks in "${activeSlot.name}" with imported data? This cannot be undone.`
        )
        if (!confirmed) return
        const coerced = Object.fromEntries(
          Object.entries(data.checks).map(([k, v]) => [k, Boolean(v)])
        )
        localStorage.setItem(`spira-checks:${activeSlot.id}`, JSON.stringify(coerced))
        // Reload so useLocalStorage re-reads the new data.
        window.location.reload()
      } catch {
        onError('Could not parse the save file.')
      }
    }
    reader.onerror = () => onError('Failed to read the file.')
    reader.readAsText(file)
  }
  input.click()
}

// ─── SlotRow ─────────────────────────────────────────────────────────────────

function SlotRow({ slot, isActive, onSwitch, onRename, onDelete, canDelete }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(slot.name)

  function startEdit() {
    setEditValue(slot.name)
    setEditing(true)
  }

  function commitEdit() {
    if (editValue.trim()) {
      onRename(slot.id, editValue.trim())
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditValue(slot.name)
      setEditing(false)
    }
  }

  const createdDate = new Date(slot.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div
      className="flex items-center gap-3 p-3 rounded"
      style={{
        background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        border: isActive ? '1px solid #FFC10F' : '1px solid #8888c0',
        cursor: isActive ? 'default' : 'pointer',
      }}
      onClick={!isActive ? () => onSwitch(slot.id) : undefined}
    >
      {/* Active indicator */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
        background: isActive ? '#FFC10F' : 'transparent',
        border: isActive ? 'none' : '1px solid #8888c0',
      }} />

      {/* Name */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            className="w-full bg-transparent border-b border-white text-white text-sm outline-none"
            value={editValue}
            maxLength={40}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-sm font-semibold truncate block">{slot.name}</span>
        )}
      </div>

      {/* Date */}
      <span className="text-xs opacity-50 flex-shrink-0">{createdDate}</span>

      {/* Actions */}
      <button
        className="text-xs px-2 py-1 rounded"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid #8888c0', color: '#fff' }}
        onClick={(e) => { e.stopPropagation(); startEdit() }}
      >
        Rename
      </button>
      <button
        className="text-xs px-2 py-1 rounded"
        style={{
          background: 'rgba(255,80,80,0.15)',
          border: '1px solid #c08080',
          color: canDelete ? '#ffaaaa' : 'rgba(255,170,170,0.3)',
          cursor: canDelete ? 'pointer' : 'not-allowed',
        }}
        disabled={!canDelete}
        onClick={(e) => {
          e.stopPropagation()
          if (!canDelete) return
          if (window.confirm(`Delete slot "${slot.name}"? This cannot be undone.`)) {
            onDelete(slot.id)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

// ─── DataPanel ────────────────────────────────────────────────────────────────

function DataPanel({ activeSlot }) {
  const [importError, setImportError] = useState(null)

  return (
    <div className="ffx-panel p-5">
      <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
        Data
      </div>
      <div className="flex gap-3">
        <button
          className="ffx-button px-4 py-2 text-sm"
          onClick={() => exportSave(activeSlot)}
        >
          ↓ Export Save
        </button>
        <button
          className="ffx-button px-4 py-2 text-sm"
          onClick={() => importSave(activeSlot, () => setImportError(null), setImportError)}
        >
          ↑ Import Save
        </button>
      </div>
      <p className="text-xs opacity-50 mt-2">Active slot: {activeSlot.name}</p>
      {importError && (
        <p className="text-xs mt-2" style={{ color: '#ff8888' }}>{importError}</p>
      )}
    </div>
  )
}

// ─── DisplayPanel ─────────────────────────────────────────────────────────────

function DisplayPanel() {
  const { pyreflyEnabled, togglePyrefly } = usePyrefly()

  return (
    <div className="ffx-panel p-5">
      <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
        Display
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm">Pyrefly effects</div>
          <div className="text-xs opacity-50 mt-1">Page transition and completion animations</div>
        </div>
        {/* Pill toggle */}
        <button
          role="switch"
          aria-checked={pyreflyEnabled}
          onClick={togglePyrefly}
          style={{
            width: 44, height: 24, borderRadius: 12, flexShrink: 0,
            background: pyreflyEnabled ? '#FFC10F' : '#444080',
            border: 'none', cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s',
          }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff', position: 'absolute', top: 2,
            left: pyreflyEnabled ? 22 : 2,
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }} />
        </button>
      </div>
    </div>
  )
}

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { slots, activeSlot, createSlot, deleteSlot, renameSlot, switchSlot } = useSaveSlot()

  function handleNewSlot() {
    const name = window.prompt('Name for new slot:')
    if (name && name.trim()) createSlot(name.trim())
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
      <h1 className="ffx-header text-3xl">Settings</h1>

      {/* ── Save Slots ── */}
      <div className="ffx-panel p-5">
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#FFC10F' }}>
          Save Slots
        </div>
        <div className="flex flex-col gap-2">
          {slots.map((slot) => (
            <SlotRow
              key={slot.id}
              slot={slot}
              isActive={slot.id === activeSlot.id}
              canDelete={slots.length > 1}
              onSwitch={switchSlot}
              onRename={renameSlot}
              onDelete={deleteSlot}
            />
          ))}
        </div>
        <button
          className="w-full mt-3 py-2 text-sm rounded"
          style={{ background: 'transparent', border: '1px dashed #8888c0', color: '#9898c8' }}
          onClick={handleNewSlot}
        >
          + New Slot
        </button>
      </div>

      {/* ── Data ── */}
      <DataPanel activeSlot={activeSlot} />

      {/* ── Display ── */}
      <DisplayPanel />
    </div>
  )
}
