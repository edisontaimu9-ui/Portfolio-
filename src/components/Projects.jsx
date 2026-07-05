import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { SiJavascript, SiAppwrite, SiGithubpages } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import oasisHome from '../assets/oasis-home.jpg'
import oasisFoodSearch from '../assets/oasis-food-search.jpg'
import oasisNutritionNews from '../assets/oasis-nutrition-news.jpg'
import oasisAiAssistant from '../assets/oasis-ai-assistant.jpg'
import thanziHome from '../assets/thanzi-home.jpg'
import thanziDiary from '../assets/thanzi-diary.jpg'
import thanziProgress from '../assets/thanzi-progress.jpg'
import thanziAiAssistant from '../assets/thanzi-ai-assistant.jpg'
import chakudyaIllustration from '../assets/chakudya-illustration.png'

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

/* ── Reusable screenshot carousel ─────────────────────────────── */
function ScreenshotCarousel({ shots, label }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % shots.length)
    }, 3000)
    return () => clearInterval(id)
  }, [shots.length])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0f1117' }}>
      {shots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${label} screenshot ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      ))}
    </div>
  )
}

const oasisShots  = [oasisHome, oasisFoodSearch, oasisNutritionNews, oasisAiAssistant]
const thanziShots = [thanziHome, thanziDiary, thanziProgress, thanziAiAssistant]

function OasisVisual()  { return <ScreenshotCarousel shots={oasisShots}  label="Oasis CNST" /> }
function ThanziVisual() { return <ScreenshotCarousel shots={thanziShots} label="Thanzi" /> }

function ChakudyaVisual() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f4f4f5',
    }}>
      <img
        src={chakudyaIllustration}
        alt="Chakudya API — open food and nutrition data infrastructure"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
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
    desc: `A consumer nutrition tracking progressive web application (PWA) built on the 
    Chakudya API. It enables daily meal logging, nutrient and macronutrient tracking, BMI, 
    BMR, and TDEE assessments, recipe nutrition analysis, personalized dashboards, user 
    profiles, and a responsive light/dark interface. The application serves as a 
    production-ready demonstration of the Chakudya nutrition data infrastructure.`,
    tech:   [
      { label: 'Vanilla JS',    Icon: SiJavascript,             color: '#F7DF1E' },
      { label: 'Appwrite',      Icon: SiAppwrite,                color: '#FD366E' },
      { label: 'Chakudya API',  Icon: TbApi,                     color: '#2fbfa4' },
      { label: 'GitHub Pages',  Icon: SiGithubpages,             color: '#FFFFFF' },
      { label: 'PWA',           Icon: HiOutlineDevicePhoneMobile, color: '#8B8B8B' },
    ],
    repo:   'https://github.com/edisontaimu9-ui',
    visual: <ThanziVisual />,
  },
  {
    id:     'chakudya',
    title:  'Chakudya API',
    status: 'In development',
    live:   false,
    desc: `Chakudya API is an open food and nutrition data service built on the authoritative 
    Malawi Food Composition Table (2019). It extends this national resource with exchange 
    lists, renal diet classifications, and commonly consumed packaged supermarket foods. 
    Designed as shared public infrastructure, Chakudya enables standardized, extensible, 
    and reliable nutrient data access for nutrition applications across clinical, community, 
    and consumer contexts. By bridging local Malawian food systems with international needs, 
    it empowers developers, researchers, clinicians, and organizations to build 
    better-informed tools for nutrition improvement in Malawi and beyond.`,
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
                    {tech.map(t => {
                      const label = typeof t === 'string' ? t : t.label
                      const Icon  = typeof t === 'string' ? null : t.Icon
                      const color = typeof t === 'string' ? undefined : t.color
                      return (
                        <span className="chip" key={label}>
                          {Icon && (
                            <Icon size={14} color={color}
                              style={{ marginRight: 6, verticalAlign: '-2px' }} />
                          )}
                          {label}
                        </span>
                      )
                    })}
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
