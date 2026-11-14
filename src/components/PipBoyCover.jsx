import { useState } from 'react'
import { TbBolt } from 'react-icons/tb'

/* Retro terminal cover for the Oasis CNST card. Tabs are real buttons (not links),
   so tapping them never navigates away from the card. Module names come from the
   Oasis entry on the Projects page. */

const TABS = [
  { id: 'stat', label: 'STAT', title: 'OASIS_STATUS' },
  { id: 'mods', label: 'MODS', title: 'MODULES' },
  { id: 'sync', label: 'SYNC', title: 'OFFLINE_SYNC' },
]

const MODULES = [
  ['Adult & paeds calculators', 'CALC'],
  ['Enteral & parenteral', 'ENT/PN'],
  ['Burn management', 'BURN'],
  ['Malnutrition screening', '4 TOOLS'],
  ['Drug–nutrient interactions', 'DNI'],
  ['NFPE & growth charts', 'NFPE'],
  ['Food database', '3 SRC'],
  ['AI-assisted NCP', 'AI'],
]

export default function PipBoyCover() {
  const [tab, setTab] = useState('stat')
  const [activeMod, setActiveMod] = useState(3)
  const current = TABS.find((t) => t.id === tab)

  return (
    <div className="pip-wrapper">
      <div className="pip-chassis">
        <span className="pip-screw pip-tl" />
        <span className="pip-screw pip-tr" />
        <span className="pip-screw pip-bl" />
        <span className="pip-screw pip-br" />

        <div className="pip-crt">
          <div className="pip-glass" aria-hidden="true" />
          <div className="pip-scanlines" aria-hidden="true" />

          <div className="pip-boot">
            <header className="pip-top">
              <div className="pip-title pip-flicker">{current.title}</div>
              <div className="pip-line pip-flex" />
              <div className="pip-stats">
                <span>MOD <b>11+</b></span>
                <span>NET <b>OFF</b></span>
                <span className="pip-pulse"><TbBolt size={12} /></span>
              </div>
            </header>

            <main className="pip-middle">
              {tab === 'stat' && (
                <div className="pip-tab pip-stat" key="stat">
                  <aside className="pip-side">
                    <div>CALC</div>
                    <div>ENT</div>
                    <div>PN</div>
                    <div className="pip-active-box">SCR</div>
                  </aside>
                  <section className="pip-clock">
                    <div className="pip-block">
                      <div className="pip-big">11<span className="pip-blink">+</span></div>
                    </div>
                    <div className="pip-date">CLINICAL MODULES</div>
                  </section>
                  <aside className="pip-right">
                    <div className="pip-hazard"><div className="pip-core" /></div>
                    <div className="pip-rad">PWA</div>
                  </aside>
                </div>
              )}

              {tab === 'mods' && (
                <div className="pip-tab pip-inv" key="mods">
                  <ul className="pip-list">
                    {MODULES.map(([name, tag], i) => (
                      <li key={name}>
                        <button
                          type="button"
                          className={i === activeMod ? 'pip-row pip-row-active' : 'pip-row'}
                          onClick={() => setActiveMod(i)}
                          onMouseEnter={() => setActiveMod(i)}
                        >
                          <span>{name}</span>
                          <span>{tag}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === 'sync' && (
                <div className="pip-tab pip-data" key="sync">
                  <div className="pip-radar">
                    <span />
                    <div className="pip-blip" />
                  </div>
                  <div className="pip-radar-text pip-flicker-fast">CACHING OFFLINE DATA...</div>
                </div>
              )}
            </main>

            <footer className="pip-bottom" role="tablist" aria-label="Oasis CNST preview">
              {TABS.map((t, i) => (
                <span className="pip-nav-wrap" key={t.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    className={tab === t.id ? 'pip-nav pip-nav-on' : 'pip-nav'}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                  </button>
                  {i < TABS.length && <div className="pip-line pip-flex" />}
                </span>
              ))}
              <div className="pip-eq" aria-hidden="true">
                <div className="pip-bar pip-bar-1" />
                <div className="pip-bar pip-bar-2" />
                <div className="pip-bar pip-bar-3" />
                <div className="pip-bar pip-bar-4" />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
