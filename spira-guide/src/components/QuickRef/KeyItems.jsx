// Fully hardcoded — items.json is a flat dict with no category field.

const KEY_ITEMS = [
  { name: 'Al Bhed Potion',   use: 'Restores 1000 HP + cures Petrify/Silence/Darkness. Damages Undead.' },
  { name: 'Mega-Potion',      use: 'Restores 2000 HP to all party members.' },
  { name: 'Elixir',           use: 'Fully restores HP and MP of one character.' },
  { name: 'Megalixir',        use: 'Fully restores HP and MP of all party members.' },
  { name: 'Turbo Ether',      use: 'Restores 500 MP to one character.' },
  { name: 'Mega Phoenix',     use: 'Revives all KO\'d party members with full HP.' },
  { name: 'Pendulum',         use: 'Teaches Overdrive \u2192 AP ability to weapons. Rare.' },
  { name: 'Friend Sphere',    use: 'Moves to a node occupied by another party member.' },
  { name: 'Master Sphere',    use: 'Activates any empty node. Obtained from Dark Aeons/Penance.' },
  { name: 'Dark Matter',      use: 'Grants Ribbon (immunity to most status). 99 needed for Penance.' },
  { name: 'Power Distiller',  use: 'Enemy drops Power Spheres instead of normal drops.' },
  { name: 'Mana Distiller',   use: 'Enemy drops Mana Spheres instead of normal drops.' },
  { name: 'Speed Distiller',  use: 'Enemy drops Speed Spheres instead of normal drops.' },
  { name: 'Ability Distiller',use: 'Enemy drops Ability Spheres instead of normal drops.' },
  { name: 'Tetra Elemental',  use: 'Grants Elemenstrike abilities to armor. Rare craft material.' },
  { name: 'Supreme Gem',      use: 'Grants Break Damage Limit to weapon. From Monster Arena.' },
  { name: 'Stamina Tonic',    use: 'Raises Max HP of one character permanently.' },
  { name: 'Door to Tomorrow', use: 'Grants Overdrive Mode abilities to weapons.' },
]

export default function KeyItems() {
  return (
    <div className="space-y-1">
      {KEY_ITEMS.map(({ name, use }) => (
        <div key={name} className="border-b border-[var(--color-border)] pb-1 last:border-0">
          <span className="text-xs font-bold text-[var(--color-gold)]">{name}</span>
          <p className="text-xs opacity-80 mt-0.5">{use}</p>
        </div>
      ))}
    </div>
  )
}
