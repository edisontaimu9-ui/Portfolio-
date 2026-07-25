import Reveal from './Reveal'
import parenteralImg from '../assets/parenteral-nutrition.jpg'
import {
  SiFirebase, SiAppwrite, SiReact, SiVite, SiCloudflare,
  SiNodedotjs, SiPython, SiGithub, SiPostgresql,
} from 'react-icons/si'
import { HiOutlineSparkles, HiOutlineGlobeAlt } from 'react-icons/hi2'

const tools = [
  { label: 'Firebase',    Icon: SiFirebase,   color: '#FFCA28' },
  { label: 'Appwrite',    Icon: SiAppwrite,   color: '#FD366E' },
  { label: 'React',       Icon: SiReact,      color: '#61DAFB' },
  { label: 'Vite',        Icon: SiVite,       color: '#646CFF' },
  { label: 'Cloudflare',  Icon: SiCloudflare, color: '#F38020' },
  { label: 'Node.js',     Icon: SiNodedotjs,  color: '#339933' },
  { label: 'Python',      Icon: SiPython,     color: '#3776AB' },
  { label: 'PostgreSQL',  Icon: SiPostgresql, color: '#4169E1' },
  { label: 'GitHub',      Icon: SiGithub,     color: '#FFFFFF' },
  { label: 'REST APIs',   Icon: HiOutlineGlobeAlt, color: '#8B8B8B' },
  { label: 'AI / LLMs',   Icon: HiOutlineSparkles,  color: '#A78BFA' },
]

const doubled = [...tools, ...tools] // infinite scroll

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Skills</span>
            <h2 className="display">Two disciplines, <br />one practice.</h2>
          </div>
        </Reveal>

        <div className="skills-grid">

          {/* Wide card: clinical */}
          <Reveal delay={80}>
            <div className="skill-card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <span className="skill-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </span>
                  <h3>Clinical & Public Health Nutrition</h3>
                  <p>
                    Comprehensive nutrition assessment and screening, enteral and parenteral
                    nutrition support, and structured care plan documentation at the bedside —
                    plus community nutrition programming and population-level screening.
                    Experienced across paediatric, renal, diabetes, and critical care settings,
                    applying international and national clinical guidelines.
                  </p>
                  <div className="chip-row">
                    {['Nutrition Assessment','Care Plan Documentation','Enteral Support',
                      'Parenteral Nutrition','Community Nutrition','Malnutrition Screening'].map(c => (
                      <span className="chip" key={c}>{c}</span>
                    ))}
                  </div>
                  <div className="media-highlight">
                    <img src={parenteralImg} alt="Parenteral nutrition infusion bag on a drip stand" />
                    <span>Hands-on with enteral & parenteral nutrition delivery during critical-care rotations.</span>
                  </div>
                </div>
                <div>
                  <span className="skill-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </span>
                  <h3>Software Development</h3>
                  <p>
                    Full-stack developer building clinical progressive web applications from the
                    ground up, with experience across frontend frameworks, cloud backends, API
                    integration, and automated deployment pipelines.
                  </p>
                  <div className="chip-row">
                    {['React','Cloud Infrastructure','REST APIs',
                      'Progressive Web Apps','CI/CD'].map(c => (
                      <span className="chip" key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Protocols card */}
          <Reveal delay={160}>
            <div className="skill-card">
              <span className="skill-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </span>
              <h3>Guidelines & References</h3>
              <p>
                Evidence-based practice grounded in leading international nutrition guidelines
                and the Malawi National Food Composition Table as the primary reference for
                local dietary assessment.
              </p>
              <div className="chip-row">
                {['International Guidelines','WHO / FAO Standards','Malawi FCT 2019','Clinical Research'].map(c => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* AI & Data card */}
          <Reveal delay={240}>
            <div className="skill-card">
              <span className="skill-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                </svg>
              </span>
              <h3>AI & Data Integration</h3>
              <p>
                Applied machine learning and large language models for clinical documentation
                support and care plan generation, alongside structured food data search and
                semantic retrieval over clinical reference material.
              </p>
              <div className="chip-row">
                {['Machine Learning','LLM Integration','Semantic Search','Food Data Systems'].map(c => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        {/* Tech marquee */}
        <Reveal delay={300}>
          <div className="marquee-section">
            <p className="marquee-label">Tools &amp; technologies</p>
            <div className="marquee-track" aria-hidden="true">
              {doubled.map(({ label, Icon, color }, i) => (
                <span className="marquee-item" key={`${label}-${i}`}>
                  <Icon size={16} color={color} /> {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
