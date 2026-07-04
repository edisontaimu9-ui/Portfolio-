import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import oasisHome from '../assets/oasis-home.jpg'
import oasisFoodSearch from '../assets/oasis-food-search.jpg'
import oasisNutritionNews from '../assets/oasis-nutrition-news.jpg'
import oasisAiAssistant from '../assets/oasis-ai-assistant.jpg'

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

function ExtLink() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  )
}

/* ── Oasis CNST screenshot carousel ───────────────────────────── */
const oasisShots = [oasisHome, oasisFoodSearch, oasisNutritionNews, oasisAiAssistant]

function OasisVisual() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % oasisShots.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0f1117' }}>
      {oasisShots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Oasis CNST screenshot ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      ))}
    </div>
  )
}

function ThanziVisual() {
  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <rect width="340" height="240" fill="#0f1117"/>
      {/* phone frame */}
      <rect x="110" y="12" width="120" height="216" rx="16" fill="#18181c" stroke="#2a2a34" strokeWidth="2"/>
      {/* status bar */}
      <rect x="118" y="20" width="104" height="8" rx="2" fill="#111115"/>
      <circle cx="170" cy="24" r="3" fill="#2fbfa4" opacity=".8"/>
      {/* hero card */}
      <rect x="118" y="36" width="104" height="50" rx="6" fill="#111115" stroke="#1e1e24" strokeWidth="1"/>
      <rect x="126" y="44" width="40" height="7" rx="2" fill="#2fbfa4" opacity=".6"/>
      <rect x="126" y="55" width="28" height="14" rx="3" fill="#2fbfa4"/>
      <rect x="126" y="72" width="50" height="6" rx="2" fill="#222228"/>
      {/* ring chart placeholder */}
      <circle cx="210" cy="61" r="18" stroke="#1e1e24" strokeWidth="2" fill="none"/>
      <circle cx="210" cy="61" r="18" stroke="#2fbfa4" strokeWidth="2"
        strokeDasharray="70 43" strokeDashoffset="22" fill="none"/>
      {/* meal log */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="118" y={96 + i*24} width="104" height="18" rx="4"
          fill="#111115" stroke="#1e1e24" strokeWidth="1"/>
      ))}
      {/* meal labels */}
      <rect x="126" y="100" width="30" height="6" rx="2" fill="#222228"/>
      <rect x="126" y="124" width="44" height="6" rx="2" fill="#222228"/>
      <rect x="126" y="148" width="36" height="6" rx="2" fill="#222228"/>
      <rect x="126" y="172" width="28" height="6" rx="2" fill="#222228"/>
      {/* kcal chips */}
      <rect x="194" y="100" width="22" height="6" rx="2" fill="#2fbfa4" opacity=".5"/>
      <rect x="194" y="124" width="22" height="6" rx="2" fill="#c9933a" opacity=".5"/>
      <rect x="194" y="148" width="22" height="6" rx="2" fill="#2fbfa4" opacity=".5"/>
      <rect x="194" y="172" width="22" height="6" rx="2" fill="#2fbfa4" opacity=".3"/>
      {/* bottom nav */}
      <rect x="118" y="204" width="104" height="16" rx="4" fill="#111115" stroke="#1e1e24" strokeWidth="1"/>
      {[134, 162, 190, 210].map((x,i) => (
        <circle key={i} cx={x} cy="212" r="3" fill={i===0 ? '#2fbfa4' : '#222228'}/>
      ))}
    </svg>
  )
}

function ChakudyaVisual() {
  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <rect width="340" height="240" fill="#0f1117"/>
      {/* terminal window */}
      <rect x="16" y="16" width="308" height="208" rx="8" fill="#111115" stroke="#1e1e24" strokeWidth="1.5"/>
      {/* titlebar */}
      <rect x="16" y="16" width="308" height="28" rx="8" fill="#18181c"/>
      <rect x="16" y="32" width="308" height="12" fill="#18181c"/>
      <circle cx="32" cy="30" r="5" fill="#ff5f57"/>
      <circle cx="48" cy="30" r="5" fill="#febc2e"/>
      <circle cx="64" cy="30" r="5" fill="#28c840"/>
      <rect x="120" y="25" width="100" height="10" rx="3" fill="#222228"/>
      {/* terminal content */}
      <rect x="28" y="56" width="80" height="7" rx="2" fill="#3f3f46"/>
      <rect x="28" y="70" width="16" height="7" rx="2" fill="#2fbfa4"/>
      <rect x="48" y="70" width="120" height="7" rx="2" fill="#f0f0f2"/>
      <rect x="28" y="84" width="16" height="7" rx="2" fill="#2fbfa4"/>
      <rect x="48" y="84" width="90" height="7" rx="2" fill="#f0f0f2"/>
      {/* JSON block */}
      <rect x="28" y="104" width="284" height="84" rx="6" fill="#0a0a0e" stroke="#1e1e24" strokeWidth="1"/>
      <rect x="40" y="114" width="20" height="6" rx="2" fill="#c9933a"/>
      <rect x="64" y="114" width="40" height="6" rx="2" fill="#2fbfa4"/>
      <rect x="40" y="126" width="30" height="6" rx="2" fill="#c9933a"/>
      <rect x="74" y="126" width="60" height="6" rx="2" fill="#f0f0f2"/>
      <rect x="40" y="138" width="24" height="6" rx="2" fill="#c9933a"/>
      <rect x="68" y="138" width="44" height="6" rx="2" fill="#f0f0f2"/>
      <rect x="40" y="150" width="36" height="6" rx="2" fill="#c9933a"/>
      <rect x="80" y="150" width="80" height="6" rx="2" fill="#f0f0f2"/>
      <rect x="40" y="162" width="20" height="6" rx="2" fill="#c9933a"/>
      <rect x="64" y="162" width="32" height="6" rx="2" fill="#f0f0f2"/>
      {/* status */}
      <rect x="28" y="200" width="48" height="14" rx="4" fill="#2fbfa41a" stroke="#2fbfa433" strokeWidth="1"/>
      <rect x="34" y="206" width="36" height="6" rx="2" fill="#2fbfa4"/>
      <rect x="86" y="203" width="120" height="8" rx="2" fill="#3f3f46"/>
    </svg>
  )
}

const projects = [
  {
    id:     'oasis',
    title:  'Oasis CNST',
    status: 'Live · oasiscnst.app',
    live:   true,
    desc: `A comprehensive offline-first clinical nutrition software suite for resource-limited 
    healthcare settings. Built during clinical rotations to automate what was being done by 
    hand. Features 11+ modules: adult & paediatric nutrition calculators, enteral & parenteral 
    nutrition, burn management, malnutrition screening (NRS-2002, MNA, MUST, PG-SGA), 
    drug–nutrient interactions, NFPE, growth charts, food database 
    (Malawi FCT 2019 + USDA FDC + Open Food Facts barcode), and AI-assisted NCP generation.`,
    tech:   ['Firebase','Appwrite','Groq LLaMA 3.3','FatSecret API','USDA FDC','Cloudflare Workers','Scrapy'],
    demo:   'https://oasiscnst.app',
    repo:   'https://github.com/edisontaimu9-ui/MiNutriQ-',
    visual: <OasisVisual />,
  },
  {
    id:     'thanzi',
    title:  'Thanzi',
    status: 'In development',
    live:   false,
    desc: `A consumer nutrition tracking PWA powered entirely by the Chakudya API — no 
    hardcoded food data. Daily meal logging, macronutrient tracking, BMI/BMR/TDEE stat 
    cards, recipe calculator, dark/light theme system, and avatar upload. 
    Vanilla JS, Appwrite backend, hosted on GitHub Pages. Serves as the applied product 
    proof of Chakudya's infrastructure.`,
    tech:   ['Vanilla JS','Appwrite','Chakudya API','GitHub Pages','PWA'],
    repo:   'https://github.com/edisontaimu9-ui',
    visual: <ThanziVisual />,
  },
  {
    id:     'chakudya',
    title:  'Chakudya API',
    status: 'In development',
    live:   false,
    desc: `Malawi's first open food nutrients API. Built on the Malawi Food Composition 
    Table 2019, extended with UCT Exchange Lists and USDA FDC for global fallback. 
    Designed as infrastructure — a shared resource for any nutrition application 
    targeting Malawian food systems. Powers Thanzi with zero hardcoded food data 
    and is a key portfolio piece demonstrating data infrastructure depth.`,
    tech:   ['Malawi FCT 2019','USDA FDC','REST API','Appwrite','Node.js'],
    repo:   'https://github.com/edisontaimu9-ui',
    visual: <ChakudyaVisual />,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Work</span>
            <h2 className="display">Built from necessity, <br />not curiosity.</h2>
          </div>
        </Reveal>

        <div className="projects-list">
          {projects.map(({ id, title, status, live, desc, tech, demo, repo, visual }) => (
            <Reveal key={id} delay={100}>
              <div className="project-card">
                <div className="project-visual">{visual}</div>
                <div className="project-body">
                  <span className="status">
                    <span className={`status-dot${live ? ' live' : ''}`}/>
                    {status}
                  </span>
                  <h3 className="project-title">{title}</h3>
                  <p className="project-desc">{desc}</p>
                  <div className="chip-row">
                    {tech.map(t => <span className="chip" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    {demo && (
                      <a href={demo} target="_blank" rel="noopener noreferrer" className="text-link">
                        Live demo <ExtLink/>
                      </a>
                    )}
                    {repo && (
                      <a href={repo} target="_blank" rel="noopener noreferrer" className="text-link">
                        GitHub <ExtLink/>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="project-cta">
            <div>
              <h3>More coming soon</h3>
              <p>Web Crawler case study and portfolio site source in progress.</p>
            </div>
            <a href="https://github.com/edisontaimu9-ui"
               target="_blank" rel="noopener noreferrer"
               className="btn btn-ghost">
              GitHub <ArrowRight/>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
