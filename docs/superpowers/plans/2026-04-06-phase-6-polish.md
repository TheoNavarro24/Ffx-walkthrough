# Phase 6: Remaining Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Spira Guide with a Superbosses page, image lazy loading, and responsive layout fixes.

**Architecture:** New `/superbosses` route with a standalone page component reusing `BossCard` and chapter-page layout patterns. Data JSON maps boss slugs to Brady Guide strategy text; stats come from existing `monsters.json`. Image lazy loading is a simple `loading="lazy"` attribute sweep. Responsive fixes use Tailwind responsive prefixes.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, React Router (hash router)

---

## File Map

### New Files
- `spira-guide/src/data/superbosses.json` — Boss metadata: slugs, strategy text, location descriptions, map paths, fight order
- `spira-guide/src/pages/SuperbossesPage.jsx` — Main page component with 4 sections

### Modified Files
- `spira-guide/src/main.jsx` — Add `/superbosses` route
- `spira-guide/src/data/searchIndex.js` — Add superboss search entries
- `spira-guide/src/components/Layout/ChapterDrawer.jsx` — Add Superbosses link below Act 4
- `spira-guide/src/pages/LandingPage.jsx` — Add Superbosses link (+ responsive fixes)
- `spira-guide/src/components/BossCard.jsx` — Add `loading="lazy"` to boss portrait
- `spira-guide/src/components/GuideImages.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/MissableAlert.jsx` — Make heading text configurable via prop
- `spira-guide/src/data/chapters/airship.json` — Add link text to Superbosses page in optional areas
- `spira-guide/src/components/ChapterHeader.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/ChapterNav.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/ItemList.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/PartyIndicator.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/CloisterSection.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Collectibles/CelestialTracker.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Collectibles/PrimerList.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Collectibles/AeonTracker.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Collectibles/BlitzballNote.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Collectibles/CloisterChecklist.jsx` — Add `loading="lazy"`
- `spira-guide/src/components/Layout/AppShell.jsx` — Responsive layout adjustments
- `spira-guide/src/components/Layout/Header.jsx` — Responsive header adjustments
- `spira-guide/src/components/Layout/TableOfContents.jsx` — Hide on small screens

---

### Task 1: Create superbosses.json data file

**Files:**
- Create: `spira-guide/src/data/superbosses.json`

This is the content backbone. It maps each superboss to its strategy text (from Brady Guide), location description, region map path, and fight order. The `BossCard` component will merge this data with stats from `monsters.json` via `bossBySlug`.

- [ ] **Step 1: Create the data file**

Create `spira-guide/src/data/superbosses.json` with the following structure. All strategy text and location descriptions are sourced from the Brady Guide (pages 85-89 of `docs/official-guide/brady-guide.xml`, lines 1862-1945).

```json
{
  "preparation": {
    "title": "Preparing to Face the Dark Aeons",
    "prose": [
      "The dark aeons and the superboss Penance offer the game's greatest challenge...",
      ...sections from Brady Guide lines 1864-1890
    ],
    "guideImages": ["image_0085_00.jpeg", "image_0086_00.jpeg"]
  },
  "generalStrategy": "All Dark Aeons are immune to every ailment, including breaks. They are not vulnerable to any elements, so physical attacks (especially Quick Hit) are far stronger than magic. Watch their Overdrive bars and summon an aeon to absorb the hit when they're nearly full. Rikku's Mix ability is invaluable — Final Elixir, Final Phoenix, and Hyper Mighty G cover healing and buffing.",
  "darkAeons": [
    {
      "slug": "dark-valefor",
      "name": "Dark Valefor",
      "location": "Besaid Village entrance",
      "locationDescription": "Dark Valefor strikes when you attempt to enter Besaid Village. With only 800,000 HP, it's the weakest of the dark aeons, but it still packs a punch. Don't let your ability to survive its Energy Ray Overdrive (which deals 9999 damage to the party) make you overconfident; its next Overdrive could be Energy Blast, which can shatter the damage limit to wipe out your party. Use Auto-Life spells or have an aeon take the hit.",
      "regionMap": "img/maps/regions/besaid/besaid village.png",
      "strategy": "Weakest dark aeon at 800,000 HP. Energy Ray Overdrive deals 9,999 to the party — survivable. Energy Blast breaks the damage limit and can wipe you. Use Auto-Life or summon an aeon to absorb Overdrives."
    },
    {
      "slug": "dark-ifrit",
      "name": "Dark Ifrit",
      "location": "Sanubia Sands, near Home",
      "locationDescription": "In Sanubia Sands, you encounter a woman near the entrance to Home who claims to be looking for a lost child. Go along with her little ruse to battle Dark Ifrit.",
      "regionMap": "img/maps/regions/bikanel/Sanubia Desert.png",
      "strategy": "Dark Ifrit counters each of your attacks with a powerful physical attack. Since Ifrit is slow and doesn't get frequent turns, focus on reviving or casting Auto-Life on your attackers. Auto-Phoenix handles this automatically. 1,400,000 HP."
    },
    {
      "slug": "dark-ixion-first-fight",
      "name": "Dark Ixion (First Fight)",
      "location": "Thunder Plains",
      "locationDescription": "Dark Ixion's summoner can be found in the Thunder Plains. It should be one of the first dark aeons you fight.",
      "regionMap": "img/maps/regions/thunder plains/Thunder Plains.png",
      "strategy": "1,200,000 HP. With two characters with Auto-Phoenix and diligent aeon summoning before its Overdrive, it can be beaten fairly easily. Attacks inflict Sleep and various break effects. Auto-Med ability is helpful."
    },
    {
      "slug": "dark-ixion-second-fight",
      "name": "Dark Ixion (Second Fight)",
      "location": "Thunder Plains, during lightning",
      "locationDescription": "After defeating Dark Ixion, it disappears, but during lightning strikes it appears briefly. Run up to it to fight it a second time and defeat it for good. You're free to save and heal between the two battles.",
      "regionMap": "img/maps/regions/thunder plains/Thunder Plains.png",
      "strategy": "Second encounter — attacks now inflict Confuse and Petrify instead of Sleep and breaks. Stoneproof or Ribbon armor essential. You can also have aeons do the bulk of the fighting."
    },
    {
      "slug": "dark-shiva",
      "name": "Dark Shiva",
      "location": "Macalania Temple approach",
      "locationDescription": "When you approach Macalania Temple, a Guado summoner attacks with Dark Shiva.",
      "regionMap": "img/maps/regions/macalania/Macalania Temple.png",
      "strategy": "High agility allows frequent attacks. Heavenly Strike has an instant-death effect that circumvents Auto-Life entirely. Auto-Phoenix armor is highly effective — her only multi-target attack is her Overdrive, which you can survive by summoning an aeon. Only 1,100,000 HP, so a relatively quick fight."
    },
    {
      "slug": "dark-bahamut",
      "name": "Dark Bahamut",
      "location": "Zanarkand Dome, Yunalesca's chamber",
      "locationDescription": "You can find Dark Bahamut in the Zanarkand Dome chamber where you met Yunalesca.",
      "regionMap": "img/maps/regions/zanarkand/Zanarkand Ruins.png",
      "strategy": "4,000,000 HP. His Impulse counterattack damages every party member and causes status conditions including Petrify. If fatal damage + Petrify hits, the character shatters permanently — Auto-Life and Auto-Phoenix won't help. Everyone must have Ribbon or Stoneproof. Alternatively, have one character constantly use Sentinel to prevent the counterattack entirely."
    },
    {
      "slug": "dark-yojimbo",
      "name": "Dark Yojimbo (x5 fights)",
      "location": "Cavern of the Stolen Fayth",
      "locationDescription": "Enter the area with the teleport pad that can send you into Yojimbo's chamber and attempt to walk south. A Yevonite summons Yojimbo to block the way. Once beaten, Yojimbo continues to appear in various parts of the cavern until you've defeated him five times. You're free to save and heal between battles, but leaving the cavern resets the encounter count. You can farm Dark Yojimbo's rare drops (including Ribbon armor) by intentionally leaving after winning four or fewer fights.",
      "regionMap": "img/maps/regions/cotsf/Cavern of the Stolen Fayth.png",
      "strategy": "Ambushes the party at fight start. Start with a First Strike character (Auron with Masamune), then swap for Yuna (summon aeon) or Rikku (Hyper Mighty G for Auto-Life). Always summon aeons for Zanmato Overdrive — it kills the entire party instantly and ignores Auto-Life. Stoneproof or Ribbon essential (dog attacks with Stonetouch). Must defeat 5 times to clear."
    },
    {
      "slug": "dark-anima",
      "name": "Dark Anima",
      "location": "Mt. Gagazet entrance",
      "locationDescription": "Return to the Mt. Gagazet Mountain Cave and have Wakka throw his ball through the spinning shield again. Dark Anima will then appear at the entrance to Mt. Gagazet to await your challenge.",
      "regionMap": "img/maps/regions/gagazet/Gagazet Outside.png",
      "strategy": "8,000,000 HP. Pain is an instant-kill attack that cannot be stopped by Ribbon or Deathproof. Mega-Graviton deals damage equal to slightly more than half max HP and inflicts Sleep, Slow, and Doom. Oblivion Overdrive is almost certainly not survivable. Auto-Phoenix and Auto-Life essential. If lacking Ribbon armor, consider Auto-Med ability instead."
    },
    {
      "slug": "dark-cindy",
      "name": "Dark Cindy",
      "location": "Mushroom Rock Road entrance",
      "locationDescription": "The Dark Magus Sisters make for a deadly encounter when fought three-on-three, but they are much easier to beat individually. Walk past the summoner at the entrance to Mushroom Rock Road, then run into the valley following the path to the Operation Mi'ihen staging area. When 'Getting Away' text appears, keep running — one by one the sisters give up the chase, letting you fight them solo.",
      "regionMap": "img/maps/regions/mushroom rock road/MRR.png",
      "strategy": "When fought together, all three begin with full Overdrive bars — summon an aeon immediately. When fought solo, they use Mega-Graviton instead of their usual Overdrive. With Stoneproof/Ribbon and two Auto-Phoenix characters, the sisters have little hope when fought individually."
    },
    {
      "slug": "dark-sandy",
      "name": "Dark Sandy",
      "location": "Mushroom Rock Road entrance",
      "locationDescription": "Separate Dark Sandy from the group using the same fleeing strategy as Dark Cindy.",
      "regionMap": "img/maps/regions/mushroom rock road/MRR.png",
      "strategy": "Same general strategy as Dark Cindy. Cannot damage multiple characters with non-Overdrive attacks when fought solo. Stoneproof or Ribbon required for Stonetouch attacks."
    },
    {
      "slug": "dark-mindy",
      "name": "Dark Mindy",
      "location": "Mushroom Rock Road entrance",
      "locationDescription": "Separate Dark Mindy from the group using the same fleeing strategy.",
      "regionMap": "img/maps/regions/mushroom rock road/MRR.png",
      "strategy": "Weakest of the three sisters but still deadly. Same solo isolation strategy. Stoneproof or Ribbon and Auto-Phoenix make this manageable."
    }
  ],
  "penance": {
    "slug": "penance",
    "armsSlug": "penance-arms",
    "name": "Penance",
    "prerequisite": "Requires defeating all Dark Aeons. Penance then appears in the Airship destination list.",
    "strategy": "Penance's body has 12,000,000 HP and each arm has 500,000 HP. Destroying the arms is essential — as long as one or both are destroyed, Penance can't use Judgment Day (which clears the battlefield). Time your killing blows on arms just before the arm's turn for maximum regeneration delay. Use Auto-Potion, Auto-Regen, or Regen to sustain offense.\n\nIf everyone has Ribbon, prioritize destroying the left arm. Without Ribbon, the right arm is more dangerous (focused on ailments). Focus attacks on Penance's body only when both arms are destroyed.\n\nAfter dealing 3,000,000 damage to the body, Penance casts Haste on itself (Dispel it) and switches from Obliteration (party-wide heavy damage, reduced by Cheer) to Immolation (single-target, inflicts breaks and drains MP). Use Dispel on break statuses and Three Stars item when MP runs out.",
    "zanmatoTip": "If you get to a boss you just can't beat, there's always one last hope: summoning Yojimbo and hoping he uses Zanmato. The odds against a dark aeon or Penance are extremely low, but you can increase them slightly by paying handsomely, having Yojimbo in Overdrive, and maintaining a record of decent payments without dismissing him early or letting him fall in combat."
  },
  "nemesis": {
    "slug": "nemesis",
    "name": "Nemesis",
    "note": "Unlocked by capturing every monster 10 times and defeating all Area Conquest, Species Conquest, and Original monsters in the Monster Arena."
  }
}
```

Read the Brady Guide content from `docs/official-guide/brady-guide.xml` lines 1862-1945 and write the full prose for each entry. The JSON above shows the structure and key content — fill in complete strategy text from the guide.

- [ ] **Step 2: Verify boss slugs resolve**

Run this in the browser console or write a quick test to confirm all slugs resolve via `bossBySlug`:

```
dark-valefor, dark-ifrit, dark-ixion-first-fight, dark-ixion-second-fight,
dark-shiva, dark-bahamut, dark-yojimbo, dark-anima, dark-cindy, dark-sandy,
dark-mindy, penance, penance-arms, nemesis
```

All 14 slugs must return non-null from `getBoss(slug)`.

- [ ] **Step 3: Commit**

```bash
git add spira-guide/src/data/superbosses.json
git commit -m "feat: add superbosses.json data with Dark Aeon/Penance strategies from Brady Guide"
```

---

### Task 2: Create SuperbossesPage component

**Files:**
- Create: `spira-guide/src/pages/SuperbossesPage.jsx`

Follow `ChapterPage.jsx` patterns: scroll-spy sections, TOC integration, `BossCard` reuse.

- [ ] **Step 1: Create the page component**

```jsx
// spira-guide/src/pages/SuperbossesPage.jsx
import { useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useToc } from '../context/TocContext'
import BossCard from '../components/BossCard'
import MissableAlert from '../components/MissableAlert'
import GuideImages from '../components/GuideImages'
import { getBoss } from '../data/bossBySlug'
import { assetUrl } from '../utils/assetUrl'
import superbossData from '../data/superbosses.json'

const SECTION_IDS = ['section-preparation', 'section-dark-aeons', 'section-penance', 'section-nemesis']
const SECTION_LABELS = [
  { id: 'section-preparation', label: 'Preparation' },
  { id: 'section-dark-aeons', label: 'Dark Aeons' },
  { id: 'section-penance', label: 'Penance' },
  { id: 'section-nemesis', label: 'Nemesis' },
]

function buildBoss(slug, overrides = {}) {
  const stats = getBoss(slug)
  return stats ? { ...stats, ...overrides } : null
}

export default function SuperbossesPage() {
  const activeId = useScrollSpy(SECTION_IDS)
  const { setSections, setActiveId } = useToc()

  useEffect(() => {
    setSections(SECTION_LABELS)
    return () => setSections([])
  }, [setSections])

  useEffect(() => {
    setActiveId(activeId)
  }, [activeId, setActiveId])

  const penanceBody = buildBoss(superbossData.penance.slug, {
    name: 'Penance',
    strategy: superbossData.penance.strategy,
  })
  const penanceArms = buildBoss(superbossData.penance.armsSlug, {
    name: 'Penance (Arms)',
    strategy: 'Each arm has 500,000 HP and regenerates after being destroyed. Destroy arms to prevent Judgment Day. Time killing blows just before the arm\'s turn for maximum regeneration delay.',
  })
  const nemesis = buildBoss(superbossData.nemesis.slug, { name: 'Nemesis' })

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col gap-4 pyrefly-page-enter">
      {/* Page Title */}
      <div className="ffx-panel p-4">
        <h1 className="ffx-header text-3xl tracking-widest">SUPERBOSSES</h1>
        <p className="text-sm text-gray-400 mt-1">Dark Aeons & Penance — HD Remaster Endgame</p>
      </div>

      {/* Section 1: Preparation */}
      <section id="section-preparation" aria-label="Preparation Guide">
        <h2 className="ffx-section-heading">Preparation</h2>
        <div className="ffx-panel p-4 flex flex-col gap-3">
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {superbossData.preparation.prose.join('\n\n')}
          </p>
          {superbossData.preparation.guideImages && (
            <GuideImages images={superbossData.preparation.guideImages} />
          )}
        </div>
      </section>

      {/* Section 2: Dark Aeons */}
      <section id="section-dark-aeons" aria-label="Dark Aeons">
        <h2 className="ffx-section-heading">Dark Aeons</h2>
        <div className="ffx-panel p-4 mb-3">
          <p className="text-sm text-gray-300">{superbossData.generalStrategy}</p>
        </div>
        <div className="flex flex-col gap-4">
          {superbossData.darkAeons.map((da) => {
            const boss = buildBoss(da.slug, { name: da.name, strategy: da.strategy })
            return (
              <div key={da.slug} id={`boss-${da.slug}`}>
                {/* Location & Map */}
                <div className="ffx-panel p-3 mb-2 flex gap-3">
                  <img
                    src={assetUrl(da.regionMap)}
                    alt={`${da.location} map`}
                    className="w-32 h-24 object-cover rounded flex-shrink-0"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div>
                    <p className="ffx-header text-sm">{da.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{da.locationDescription}</p>
                  </div>
                </div>
                {/* BossCard */}
                <BossCard chapterSlug="superbosses" bossSlug={da.slug} boss={boss} />
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 3: Penance */}
      <section id="section-penance" aria-label="Penance">
        <h2 className="ffx-section-heading">Penance</h2>
        <MissableAlert heading="Prerequisite" missables={[superbossData.penance.prerequisite]} />
        <div className="flex flex-col gap-3 mt-3">
          <div id={`boss-${superbossData.penance.slug}`}>
            <BossCard chapterSlug="superbosses" bossSlug={superbossData.penance.slug} boss={penanceBody} />
          </div>
          <div id={`boss-${superbossData.penance.armsSlug}`}>
            <BossCard chapterSlug="superbosses" bossSlug={superbossData.penance.armsSlug} boss={penanceArms} />
          </div>
        </div>
        {/* Zanmato Tip */}
        <div className="ffx-panel p-3 mt-3" style={{ borderColor: 'var(--color-gold)' }}>
          <p className="ffx-header text-sm" style={{ color: 'var(--color-gold)' }}>There's Always Zanmato...</p>
          <p className="text-xs text-gray-400 mt-1">{superbossData.penance.zanmatoTip}</p>
        </div>
      </section>

      {/* Section 4: Nemesis */}
      <section id="section-nemesis" aria-label="Nemesis">
        <h2 className="ffx-section-heading">Nemesis</h2>
        <div className="ffx-panel p-3 mb-2">
          <p className="text-xs text-gray-400">{superbossData.nemesis.note}</p>
        </div>
        <div id={`boss-${superbossData.nemesis.slug}`}>
          <BossCard chapterSlug="superbosses" bossSlug={superbossData.nemesis.slug} boss={nemesis} />
        </div>
      </section>
    </div>
  )
}
```

**Note:** The `MissableAlert` component currently hardcodes "Missable in this chapter" as its heading. Add a `heading` prop to make it configurable — see Task 2b below.

- [ ] **Step 2: Verify the page renders**

Start dev server (`npm run dev`), navigate to `/#/superbosses` manually in the browser. Confirm:
- All 4 sections render with headings
- BossCards show stats from `monsters.json`
- Strategy text appears in expanded BossCards
- Region maps load next to location descriptions
- Defeat checkboxes work
- TOC doesn't show yet (route not registered — that's Task 3)

- [ ] **Step 3: Make MissableAlert heading configurable**

In `spira-guide/src/components/MissableAlert.jsx`, add an optional `heading` prop with a default of `"Missable in this chapter"`:

Change the function signature from:
```jsx
export default function MissableAlert({ missables = [] }) {
```
to:
```jsx
export default function MissableAlert({ missables = [], heading = 'Missable in this chapter' }) {
```

And change the hardcoded heading text from `Missable in this chapter` to `{heading}`.

This is backwards-compatible — all existing usages keep the default heading. The Superbosses page passes `heading="Prerequisite"`.

- [ ] **Step 4: Commit**

```bash
git add spira-guide/src/pages/SuperbossesPage.jsx spira-guide/src/components/MissableAlert.jsx
git commit -m "feat: SuperbossesPage — Dark Aeons, Penance, Nemesis with BossCards and prep guide"
```

---

### Task 3: Register route and wire navigation

**Files:**
- Modify: `spira-guide/src/main.jsx:13-24`
- Modify: `spira-guide/src/components/Layout/ChapterDrawer.jsx`
- Modify: `spira-guide/src/pages/LandingPage.jsx`

- [ ] **Step 1: Add the route to main.jsx**

In `spira-guide/src/main.jsx`, add the import and route:

```jsx
import SuperbossesPage from './pages/SuperbossesPage'
```

Add to the children array after the settings route:

```jsx
{ path: 'superbosses', element: <SuperbossesPage /> },
```

- [ ] **Step 2: Add Superbosses link with progress to ChapterDrawer**

In `spira-guide/src/components/Layout/ChapterDrawer.jsx`, add a Superbosses link after the Act 4 group (after the `{[1,2,3,4].map(...)}` block, before the closing `</nav>`). Include a progress count showing defeated superbosses out of 14 total.

Import `useCheckbox` and count defeated entries using the 14 superboss checkbox IDs (all prefixed with `superbosses-boss-`). The IDs are:
`dark-valefor, dark-ifrit, dark-ixion-first-fight, dark-ixion-second-fight, dark-shiva, dark-bahamut, dark-yojimbo, dark-anima, dark-cindy, dark-sandy, dark-mindy, penance, penance-arms, nemesis`

```jsx
<div className="mt-2 border-t border-[var(--color-border-alt)] pt-2">
  <button
    className="w-full text-left px-3 py-1.5 text-sm hover:text-[var(--color-gold)] ffx-header tracking-wider"
    style={{ fontSize: '14px' }}
    onClick={() => { navigate('/superbosses'); onClose() }}
  >
    Superbosses
    <span className="text-[10px] opacity-60 ml-2 font-normal">{defeatedCount}/14</span>
  </button>
</div>
```

- [ ] **Step 3: Add Superbosses link to LandingPage**

In `spira-guide/src/pages/LandingPage.jsx`, add a Superbosses link after the Collectibles Hub link. Always visible (no completion gate — the user wants easy access):

```jsx
<Link to="/superbosses" className="ffx-button text-center py-1.5 text-xs">
  Superbosses
</Link>
```

- [ ] **Step 4: Add Superbosses link in Airship chapter**

In `spira-guide/src/data/chapters/airship.json`, add a note in the optional areas section mentioning the Superbosses page. Add a prose line like: "For Dark Aeons and Penance, see the Superbosses page." The link will be rendered as text (the user can navigate via drawer/landing page).

- [ ] **Step 5: Verify navigation works**

Test in browser:
- Landing page shows Superbosses button
- Clicking it navigates to `/#/superbosses`
- Drawer shows Superbosses link below Act 4 with progress count
- TOC shows Preparation / Dark Aeons / Penance / Nemesis sections
- Scroll-spy highlights work

- [ ] **Step 6: Commit**

```bash
git add spira-guide/src/main.jsx spira-guide/src/components/Layout/ChapterDrawer.jsx spira-guide/src/pages/LandingPage.jsx spira-guide/src/data/chapters/airship.json
git commit -m "feat: wire Superbosses route, drawer link with progress, landing page and airship links"
```

---

### Task 4: Add superboss entries to search index

**Files:**
- Modify: `spira-guide/src/data/searchIndex.js`

- [ ] **Step 1: Add superboss search entries**

In `spira-guide/src/data/searchIndex.js`, import the superboss data and add entries after the Celestials block:

```jsx
import superbossData from './superbosses.json'

// Superbosses
for (const da of superbossData.darkAeons) {
  records.push({
    type: 'superboss',
    title: da.name,
    subtitle: da.location,
    path: '/superbosses',
    scrollTo: `boss-${da.slug}`,
  })
}
records.push({
  type: 'superboss',
  title: 'Penance',
  subtitle: 'Airship destination',
  path: '/superbosses',
  scrollTo: `boss-${superbossData.penance.slug}`,
})
records.push({
  type: 'superboss',
  title: 'Nemesis',
  subtitle: 'Monster Arena',
  path: '/superbosses',
  scrollTo: `boss-${superbossData.nemesis.slug}`,
})
```

- [ ] **Step 2: Update SearchDropdown to handle superboss results**

In `spira-guide/src/components/Search/SearchDropdown.jsx`:

1. Add `superboss: 'SUPERBOSS'` to the `TYPE_LABELS` object (line 5-11).

2. Change the `<Link>` `to` prop (line 60) to handle the `path` field. Replace:
```jsx
to={`/chapter/${r.chapterId}${r.anchor ? '#' + r.anchor : ''}`}
```
with:
```jsx
to={r.path ?? `/chapter/${r.chapterId}`}
```

3. Add a click handler that scrolls to the target element after navigation. The `onClick` handler already calls `setQuery('')`. Add scrolling logic using `setTimeout` to wait for the route change to render:
```jsx
onClick={() => {
  setQuery('')
  if (r.scrollTo) {
    setTimeout(() => {
      document.getElementById(r.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}}
```

- [ ] **Step 3: Update useSearch type priority**

In `spira-guide/src/hooks/useSearch.js`, add `superboss` to the `TYPE_PRIORITY` object:
```jsx
const TYPE_PRIORITY = { chapter: 0, boss: 1, superboss: 2, primer: 3, 'jecht-sphere': 4, celestial: 5 }
```

- [ ] **Step 4: Test search**

In the browser, search for "Dark Valefor", "Penance", "Nemesis". Confirm:
- Results appear with type label "superboss"
- Clicking navigates to `/superbosses` and scrolls to the correct boss
- Regular boss/chapter search still works

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/data/searchIndex.js spira-guide/src/components/Search/SearchDropdown.jsx spira-guide/src/hooks/useSearch.js
git commit -m "feat: add superboss entries to global search index"
```

---

### Task 5: Source Dark Aeon portrait images

**Files:**
- Add images to: `spira-guide/public/img/bosses/`

- [ ] **Step 1: Source Dark Aeon images**

Find portrait images for all 10 Dark Aeons + verify existing Penance and Nemesis images. The images need to work at 52x52px in the `BossCard` component.

Required images (save to `spira-guide/public/img/bosses/`):
- `dark-valefor.png`
- `dark-ifrit.png`
- `dark-ixion-first-fight.png` (or a shared `dark-ixion.png` used for both fights)
- `dark-ixion-second-fight.png`
- `dark-shiva.png`
- `dark-bahamut.png`
- `dark-yojimbo.png`
- `dark-anima.png`
- `dark-cindy.png`
- `dark-sandy.png`
- `dark-mindy.png`

Already exist:
- `img/bosses/penance.png`
- `img/bosses/arena/Nemesis.png` — `BossCard` looks at `img/bosses/{slug}.png`, so copy this to `img/bosses/nemesis.png`:
  ```bash
  cp "spira-guide/public/img/bosses/arena/Nemesis.png" "spira-guide/public/img/bosses/nemesis.png"
  ```

Potential sources:
- FFX wiki fan sites (check licenses)
- In-game screenshots
- If portraits can't be sourced, the `BossCard` `onError` handler hides the image gracefully — the card works without portraits

- [ ] **Step 2: Verify images load in BossCards**

Navigate to `/#/superbosses` and check that boss portraits appear in the BossCard headers.

- [ ] **Step 3: Commit**

```bash
git add spira-guide/public/img/bosses/
git commit -m "feat: add Dark Aeon and superboss portrait images"
```

---

### Task 6: Image lazy loading sweep

**Files:**
- Modify: Every component listed in the File Map that renders `<img>` tags

- [ ] **Step 1: Add `loading="lazy"` to all img tags**

Add `loading="lazy"` to every `<img>` tag in these components:

| Component | File | Exception |
|-----------|------|-----------|
| `BossCard` | `src/components/BossCard.jsx:102` | None |
| `GuideImages` | `src/components/GuideImages.jsx:19,34` | None |
| `CloisterSection` | `src/components/CloisterSection.jsx:25` | None |
| `CelestialTracker` | `src/components/Collectibles/CelestialTracker.jsx:18` | None |
| `PrimerList` | `src/components/Collectibles/PrimerList.jsx:13` | None |
| `ItemList` | `src/components/ItemList.jsx:35` | None |
| `PartyIndicator` | `src/components/PartyIndicator.jsx:9` | None |
| `ChapterHeader` | `src/components/ChapterHeader.jsx:8` | None |
| `BlitzballNote` | `src/components/Collectibles/BlitzballNote.jsx:7` | None |
| `CloisterChecklist` | `src/components/Collectibles/CloisterChecklist.jsx:39` | None |
| `AeonTracker` | `src/components/Collectibles/AeonTracker.jsx:25` | None |
| `ChapterNav` | `src/components/ChapterNav.jsx:17` | None |
| `LandingPage` | `src/pages/LandingPage.jsx:19` | **SKIP** — hero image, above fold |
| `Header` | `src/components/Layout/Header.jsx:23` | **SKIP** — logo, always visible |

For each `<img>` tag (except LandingPage hero and Header logo), add the attribute:
```html
<img ... loading="lazy" />
```

Also add `loading="lazy"` to the region map images in `SuperbossesPage.jsx` (already done in Task 2 code).

- [ ] **Step 2: Verify no visual regression**

Navigate through a few chapter pages in the browser. Images should still appear — they just load when scrolled into view instead of all at once. Check:
- Boss portraits load when scrolling to Boss section
- Guide images load when scrolling to sub-locations
- Collectibles Hub images load on tab switch

- [ ] **Step 3: Commit**

Stage all modified component files individually (the specific files from the table above), then commit:
```bash
git commit -m "perf: add loading=lazy to all img tags except above-fold hero and logo"
```

---

### Task 7: Responsive fixes — iPhone 15 (393px)

**Files:**
- Modify: `spira-guide/src/components/Layout/AppShell.jsx`
- Modify: `spira-guide/src/components/Layout/Header.jsx`
- Modify: `spira-guide/src/components/Layout/TableOfContents.jsx`
- Modify: `spira-guide/src/pages/LandingPage.jsx`

This is the highest-impact responsive work. Test at 393x852 (iPhone 15 portrait) using browser dev tools or preview.

- [ ] **Step 1: Hide TOC on small screens**

In `TableOfContents.jsx`, add `hidden md:block` (or equivalent) to the root element so it's hidden below 768px. The TOC is useful on iPad/desktop but takes too much space on phone.

- [ ] **Step 2: Adjust Header for small screens**

Read `Header.jsx` and check for elements that overflow at 393px. Likely fixes:
- Search bar may need to shrink or collapse behind an icon on small screens
- Use `hidden sm:block` / `sm:hidden` to toggle between icon and full search
- Ensure hamburger, logo, and action buttons don't wrap

- [ ] **Step 3: Adjust LandingPage corner card**

The corner card is `absolute top-4 left-4` with `maxWidth: 240px`. On iPhone, it may overflow. Change to responsive positioning:
- On small screens: full-width card centered, not absolutely positioned
- On medium+ screens: keep current corner card position

- [ ] **Step 4: Test at iPhone viewport**

Use browser dev tools at 393x852. Navigate through:
- Landing page
- A chapter page (e.g. Besaid)
- Collectibles Hub
- Superbosses page
- Settings

Check: nothing overflows, text is readable, buttons are tappable, drawer works as overlay.

- [ ] **Step 5: Commit**

```bash
git add spira-guide/src/components/Layout/AppShell.jsx spira-guide/src/components/Layout/Header.jsx spira-guide/src/components/Layout/TableOfContents.jsx spira-guide/src/pages/LandingPage.jsx
git commit -m "fix: responsive layout for iPhone 15 — hide TOC, adjust header and landing card"
```

---

### Task 8: Responsive fixes — MacBook Pro 14" (1512px)

**Files:**
- Potentially modify: `spira-guide/src/components/Layout/AppShell.jsx`
- Potentially modify: various page components

- [ ] **Step 1: Test at MacBook viewport**

Use browser dev tools at 1512x982. Navigate through all pages. Check:
- Content doesn't stretch too wide (the `max-w-4xl` on pages should contain it)
- Drawer and TOC spacing looks reasonable
- Search dropdown and QRP aren't floating awkwardly
- Header elements are well-spaced

- [ ] **Step 2: Fix any issues found**

Likely minimal. If content stretches too wide, add `max-w` constraints. The existing `max-w-4xl` on `ChapterPage` and `SuperbossesPage` should handle most cases.

- [ ] **Step 3: Commit (if changes needed)**

```bash
git add <modified files>
git commit -m "fix: responsive adjustments for MacBook Pro 14\" viewport"
```

---

### Task 9: Responsive verification — iPad Pro 11" (1194px)

**Files:**
- Potentially modify: various components

This is the primary viewport — it should already work. This task is a verification sweep.

- [ ] **Step 1: Test at iPad viewport**

Use browser dev tools at 1194x834. Systematically check every page:

1. **Landing page**: Corner card positioned correctly, buttons work, hero image fills
2. **Chapter pages**: Test Besaid (early), Calm Lands (mid), Airship (late/optional areas)
   - Drawer open/close
   - TOC scroll-spy highlighting
   - BossCard expand/collapse
   - Checkbox interactions
   - Guide images thumbnail + lightbox
3. **Collectibles Hub**: All 6 tabs render, celestial tracker grid, primer list
4. **Settings**: Save slot management, export/import, pyrefly toggle
5. **Superbosses**: All sections, BossCards, region maps, Zanmato tip
6. **Search**: Open dropdown, type a query, click a result
7. **QRP**: Slide in/out, all 3 tabs
8. **Pyrefly**: Visible during route changes

- [ ] **Step 2: Fix any issues found**

Fix layout-breaking issues. Minor cosmetic imperfections at this viewport are bugs — this is the primary target.

- [ ] **Step 3: Commit (if changes needed)**

```bash
git add <modified files>
git commit -m "fix: iPad Pro 11\" layout verification fixes"
```

---

### Task 10: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Run lint**

```bash
cd spira-guide && npm run lint
```

Fix any errors.

- [ ] **Step 2: Run build**

```bash
cd spira-guide && npm run build
```

Confirm successful build with no errors.

- [ ] **Step 3: Preview production build**

```bash
cd spira-guide && npm run preview
```

Navigate to all pages in the preview build. Confirm images load, routes work, search works, checkboxes persist.

- [ ] **Step 4: Commit any fixes**

```bash
git add <modified files>
git commit -m "fix: lint and build fixes for Phase 6"
```
