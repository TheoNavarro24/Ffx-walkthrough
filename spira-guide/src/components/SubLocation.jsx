import { useLocalStorage } from '../hooks/useLocalStorage'
import GuideImages from './GuideImages'

export default function SubLocation({ slug, name, prose, guideImages, items = [], children }) {
  const storageKey = `subloc-${slug}-${name}`
  const [open, setOpen] = useLocalStorage(storageKey, true)

  return (
    <div className="border-b border-[#0d2137] last:border-0">
      <button
        className="w-full text-left px-4 py-2 text-sm text-[var(--color-border-alt)] bg-[rgba(79,195,247,0.05)] hover:bg-[rgba(79,195,247,0.08)] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={name}
      >
        {open ? '▼' : '▶'} {name}
        {!open && items.length > 0 && (
          <span className="ml-3 text-xs text-gray-600">
            {items.filter((i) => i.missable).length > 0
              ? `${items.filter((i) => i.missable).length} missable`
              : `${items.length} items`}
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 py-3 flex flex-col gap-2">
          {prose && <p className="text-xs text-gray-400 italic mb-1">{prose}</p>}
          <GuideImages images={guideImages} />
          {children ?? items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              {item.name}
              {item.missable && (
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide ml-2">Missable</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
