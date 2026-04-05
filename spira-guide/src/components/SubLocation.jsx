import { useLocalStorage } from '../hooks/useLocalStorage'
import GuideImages from './GuideImages'

export default function SubLocation({ slug, name, prose, guideImages, items = [], children }) {
  const storageKey = `subloc-${slug}-${name}`
  const [open, setOpen] = useLocalStorage(storageKey, true)

  return (
    <div className="border-b border-[var(--color-border-alt)]/30 last:border-0">
      <button
        className="w-full text-left px-4 pt-2 pb-1 text-3xl text-[var(--color-gold)] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 cursor-pointer uppercase tracking-widest font-bold"
        style={{ fontFamily: 'var(--font-display)' }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={name}
      >
        {open
          ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        }
        {name}
        {!open && items.length > 0 && (
          <span className="ml-3 text-xs text-gray-600">
            {items.filter((i) => i.missable).length > 0
              ? `${items.filter((i) => i.missable).length} missable`
              : `${items.length} items`}
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 py-3 flex flex-col gap-3">
          {(prose || (guideImages && guideImages.length > 0)) && (
            <div className="flex gap-4 items-start">
              {prose && (
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  {prose.split('\n\n').map((para, i) => (
                    <p key={i} className="text-base text-gray-200 leading-relaxed">{para}</p>
                  ))}
                </div>
              )}
              <GuideImages images={guideImages} />
            </div>
          )}
          {(children || items.length > 0) && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border-alt)]/40">
              {children ?? items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  {item.name}
                  {item.missable && (
                    <span className="text-xs text-red-400 font-bold uppercase tracking-wide ml-2">Missable</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
