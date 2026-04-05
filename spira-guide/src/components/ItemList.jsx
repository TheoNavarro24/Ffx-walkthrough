import { useCheckbox } from '../hooks/useCheckbox'
import { assetUrl } from '../utils/assetUrl'
import { triggerPyreflyBurst } from '../hooks/usePyreflyBurst'

export default function ItemList({ items = [], showUncheckedOnly = false }) {
  const { isChecked, toggle } = useCheckbox()

  const visible = showUncheckedOnly
    ? items.filter((item) => !isChecked(item.id))
    : items

  if (visible.length === 0 && showUncheckedOnly) {
    return <p className="text-xs text-gray-500 italic py-1">All items collected.</p>
  }

  return (
    <ul className="flex flex-col gap-1">
      {visible.map((item) => {
        const checked = isChecked(item.id)
        return (
          <li
            key={item.id}
            className={`flex items-center gap-2 text-sm transition-opacity ${checked ? 'opacity-40 line-through' : ''}`}
          >
            <input
              type="checkbox"
              id={item.id}
              checked={checked}
              onChange={(e) => {
                if (!checked) triggerPyreflyBurst(e.clientX, e.clientY, 6)
                toggle(item.id)
              }}
              className="w-3.5 h-3.5 accent-[var(--color-border)] cursor-pointer"
            />
            <img
              src={assetUrl(`img/items/sd/${item.icon}.png`)}
              alt=""
              width={16}
              height={16}
              className="flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <label htmlFor={item.id} className="cursor-pointer flex-1">
              {item.name}
              {item.missable && (
                <span className="ml-2 text-[10px] text-orange-400 font-bold uppercase tracking-wide">
                  Missable
                </span>
              )}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
