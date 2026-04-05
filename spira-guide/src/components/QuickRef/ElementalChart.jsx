// Hardcoded — monsters.json has no category field; data curated from game knowledge.
// elem_resists keys in source: fire, ice, lightning, water, holy, gravity

const ELEMENTS = ['Fire', 'Ice', 'Lightning', 'Water', 'Holy', 'Gravity']

// W = Weak, R = Resists, A = Absorbs, I = Immune, '' = Neutral
const CATEGORIES = [
  { name: 'Fiend',    row: ['',  '',  '',  '',  '',  ''] },
  { name: 'Aerial',   row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Aquatic',  row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Machine',  row: ['',  '',  'W', '',  '',  ''] },
  { name: 'Undead',   row: ['W', '',  '',  '',  'W', 'I'] },
  { name: 'Dragon',   row: ['',  '',  '',  '',  '',  ''] },
  { name: 'Plant',    row: ['W', '',  '',  '',  '',  ''] },
  { name: 'Fungus',   row: ['W', '',  '',  '',  '',  ''] },
  { name: 'Humanoid', row: ['',  '',  '',  '',  '',  ''] },
]

const CELL_STYLE = {
  W: { label: '\u25B2', className: 'text-[var(--color-gold)] font-bold' },
  R: { label: '\u25BC', className: 'text-blue-400 font-bold' },
  A: { label: '\u2605', className: 'text-green-400 font-bold' },
  I: { label: '\u2014', className: 'text-gray-400' },
  '': { label: '', className: '' },
}

export default function ElementalChart() {
  return (
    <div className="overflow-x-auto">
      <table className="text-xs w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 pr-2 opacity-60 font-normal">Enemy</th>
            {ELEMENTS.map((el) => (
              <th key={el} className="py-1 px-1 text-center text-[10px] font-bold opacity-80 whitespace-nowrap">
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map(({ name, row }) => (
            <tr key={name} className="border-t border-[var(--color-border)]">
              <td className="py-1 pr-2 opacity-80 whitespace-nowrap">{name}</td>
              {row.map((cell, i) => {
                const { label, className } = CELL_STYLE[cell]
                return (
                  <td key={i} className={`py-1 px-1 text-center ${className}`}>
                    {label}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[9px] opacity-40 mt-3">{'\u25B2'} Weak {'\u00B7'} {'\u25BC'} Resists {'\u00B7'} {'\u2605'} Absorbs {'\u00B7'} {'\u2014'} Immune</p>
    </div>
  )
}
