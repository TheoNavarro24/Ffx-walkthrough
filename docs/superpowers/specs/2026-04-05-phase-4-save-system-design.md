# Phase 4: Save System & Settings — Design Spec

**Date:** 2026-04-05
**Status:** Approved

---

## Goal

Robust save slot management, data export/import, and a real Settings page. Replaces the current single flat `spira-checks` localStorage key with a slot-aware system.

---

## Scope

- Slot-aware refactor of `useCheckbox`
- Named save slots (freely created/deleted, no cap)
- Export active slot as JSON / import from JSON
- Settings page: Save Slots panel + Data panel + Display panel
- Pyrefly effects on/off preference

Out of scope: display preferences beyond pyrefly toggle, blitzball database, any Phase 5 search features.

---

## Data Model

Two localStorage keys:

### `spira-slots`
```json
{
  "slots": [
    { "id": "slot-1712345678", "name": "Main Run", "createdAt": "2026-04-04T00:00:00Z" },
    { "id": "slot-1712399999", "name": "100% Run", "createdAt": "2026-04-05T00:00:00Z" }
  ],
  "activeSlotId": "slot-1712345678"
}
```

### `spira-checks:{slotId}`
```json
{ "ch1-item-guard": true, "boss-sinspawn-ammes": true }
```
One key per slot. Identical structure to the current `spira-checks` key.

### `spira-pyrefly`
```json
true
```
Single boolean. Default: `true`.

---

## Migration

On first app load after this update, if `spira-slots` doesn't exist:
1. Create a default slot: `{ id: "slot-default", name: "Main Run", createdAt: now }`
2. Copy all data from `spira-checks` → `spira-checks:slot-default`
3. Delete the old `spira-checks` key
4. Write `spira-slots` with the new slot as active

Migration is idempotent — if `spira-slots` already exists, do nothing.

---

## Architecture

### Approach: `SaveContext` + scoped `useCheckbox`

A `SaveContext` provider wraps the app (inside the router, outside page components). It owns slot metadata and the active slot ID. `useCheckbox` reads the active slot ID from this context to scope its localStorage key.

### `SaveContext` / `useSaveSlot`

```js
// Context value shape
{
  slots,            // array of slot objects
  activeSlot,       // the currently active slot object
  createSlot(name), // creates new slot, switches to it
  deleteSlot(id),   // deletes slot; if active, switches to first remaining
  renameSlot(id, name),
  switchSlot(id),
}
```

Constraints:
- Cannot delete the last remaining slot
- Slot IDs are generated as `slot-${Date.now()}`
- `createSlot` switches to the new slot immediately

### `useCheckbox` (refactored)

Internal change only. Public API (`isChecked`, `toggle`, `checkedCount`) is identical to callers.

```js
// Before
const [checks, setChecks] = useLocalStorage('spira-checks', {})

// After
const { activeSlot } = useSaveSlot()
const [checks, setChecks] = useLocalStorage(`spira-checks:${activeSlot.id}`, {})
```

No changes needed in any component that currently calls `useCheckbox`.

### `usePyrefly` (new)

```js
// Returns
{ pyreflyEnabled, togglePyrefly }
```

Reads/writes `spira-pyrefly` in localStorage. Default `true`. Used by:
- Settings page toggle
- `usePyreflyBurst` hook (check before triggering animation)

---

## Settings Page

Route: `/settings` (already in router, currently a stub)

Three FFX-style panels:

### Save Slots panel

- List of all slots, each row: active indicator dot, name, creation date, Rename button, Delete button
- Active slot: gold border, dot filled gold; Delete button disabled (last-slot rule also applies)
- Rename: inline — clicking Rename turns the name into an `<input>`, blur/Enter confirms
- Delete: shows a confirmation prompt before deleting
- "New Slot" button (dashed border, full width): prompts for a name via `window.prompt`, creates slot on confirm

### Data panel

- "↓ Export Save" button: serialises `spira-checks:{activeSlotId}` + slot name/date as JSON, triggers browser download as `spira-save-{slotName}.json`
- "↑ Import Save" button: opens a file picker (`<input type="file" accept=".json">`), reads file, confirms overwrite with `window.confirm`, then writes data into the active slot's checks key
- Subtitle line shows which slot is currently active

### Display panel

- Single row: "Pyrefly effects" label + subtitle + toggle switch (on/off)
- Toggle styled as a pill switch: gold when on, muted when off

---

## Component Files

| File | Status | Notes |
|------|--------|-------|
| `src/context/SaveContext.jsx` | New | Provider + `useSaveSlot` hook |
| `src/hooks/useCheckbox.js` | Refactor | Scope key to active slot |
| `src/hooks/usePyrefly.js` | New | Pyrefly toggle preference |
| `src/pages/SettingsPage.jsx` | Rewrite | Replace stub with full page |
| `src/main.jsx` or `App.jsx` | Edit | Wrap app in `SaveContextProvider`, run migration |

---

## Migration Utility

A standalone function `migrateLegacyChecks()` runs once at app startup (before render or in a `useEffect` in the provider). It is synchronous and reads/writes localStorage directly.

---

## Error Handling

- Import: if the JSON file is invalid or missing expected keys, show an error message (inline in the Data panel, not a modal) and abort
- Delete last slot: button is visually disabled; no action on click
- Slot not found (e.g. corrupted `spira-slots`): fall back to creating a fresh default slot

---

## Testing Notes

- `useCheckbox` tests should continue to pass after the refactor — mock `SaveContext` to provide a fixed slot ID
- `useSaveSlot` unit tests: create/delete/rename/switch, migration function, last-slot guard
- Settings page: render test confirming all three panels appear; interaction tests for rename and delete flows
