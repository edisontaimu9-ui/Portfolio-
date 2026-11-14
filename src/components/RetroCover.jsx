import { useState } from 'react'
import { TbBolt } from 'react-icons/tb'

/* Shared retro-terminal shell for the featured-card covers. Each card passes its own
   colour tone, chassis variant, tabs and tab content, so the covers share behaviour
   (tap tabs, glitch on switch, CRT boot) but not looks. Tabs are buttons, so they
   never trigger the card's link. Styles live in src/index.css (.pip-*). */
export default function RetroCover({ tone, variant, tabs, stats = [], label, children }) {
  const [tab, setTab] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === tab)
  const seg = variant === 'tablet'

  return (
    <div className={`pip-wrapper pip-wrapper--${tone}`}>
      <div className={`pip-chassis pip-chassis--${variant}`}>
        {['tl', 'tr', 'bl', 'br'].map((c) => <span key={c} className={`pip-screw pip-${c}`} />)}

        <div className="pip-crt">
          <div className="pip-glass" aria-hidden="true" />
          <div className="pip-scanlines" aria-hidden="true" />

          <div className="pip-boot">
            <header className="pip-top">
              <div className="pip-title pip-flicker">{current.title}</div>
              <div className="pip-line pip-flex" />
              <div className="pip-stats">
                {stats.map(([k, v]) => <span key={k}>{k} <b>{v}</b></span>)}
                <span className="pip-pulse"><TbBolt size={12} /></span>
              </div>
            </header>

            <main className="pip-middle">
              <div className="pip-tab" key={tab}>{children(tab)}</div>
            </main>

            <footer className={`pip-bottom${seg ? ' pip-bottom--seg' : ''}`} role="tablist" aria-label={label}>
              {tabs.map((t) => (
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
                  {!seg && <div className="pip-line pip-flex" />}
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
