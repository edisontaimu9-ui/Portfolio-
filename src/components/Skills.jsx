import Reveal from './Reveal'

const tools = [
  { label: 'Firebase',    icon: '🔥' },
  { label: 'Appwrite',    icon: '⚡' },
  { label: 'React',       icon: '⚛️'  },
  { label: 'Vite',        icon: '⚡' },
  { label: 'Cloudflare',  icon: '🌐' },
  { label: 'Groq LLM',   icon: '🤖' },
  { label: 'USDA FDC',   icon: '🥦' },
  { label: 'PubMed API',  icon: '📚' },
  { label: 'FatSecret',   icon: '🍎' },
  { label: 'Scrapy',      icon: '🕷️'  },
  { label: 'Paychangu',   icon: '💳' },
  { label: 'GitHub',      icon: '🐙' },
  { label: 'Termux',      icon: '📱' },
  { label: 'Node.js',     icon: '🟩' },
  { label: 'Python',      icon: '🐍' },
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
                  <h3>Clinical Nutrition</h3>
                  <p>
                    Nutrition assessment, NRS-2002, MUST, MNA, PG-SGA. Enteral and parenteral
                    nutrition support. ADIME documentation using IDNT codes. Paediatric NCP
                    with ESPGHAN, ASPEN, and WHO growth references. Renal, diabetes, and
                    burn nutrition management. Drug–nutrient interactions.
                  </p>
                  <div className="chip-row">
                    {['ADIME / NCP','PES statements','Enteral support','Parenteral nutrition',
                      'Paediatric NCP','Malnutrition screening','NFPE'].map(c => (
                      <span className="chip" key={c}>{c}</span>
                    ))}
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
                    Self-taught full-stack developer building clinical PWAs from scratch.
                    Vanilla JS, React, Vite. Firebase Auth, Firestore, RTDB, Remote Config.
                    Appwrite collections, Realtime, Functions. Python Scrapy web crawlers.
                    REST API integration, Cloudflare Workers, GitHub Actions CI/CD.
                  </p>
                  <div className="chip-row">
                    {['React / Vite','Firebase','Appwrite','Cloudflare Workers',
                      'REST APIs','PWA / offline-first','GitHub Actions'].map(c => (
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
                Evidence-based practice grounded in ASPEN, ESPEN, ESPGHAN, KDIGO, WHO, FAO,
                and Malawi-specific nutrition protocols. Malawi FCT 2019 as primary food
                composition reference; UCT Exchange Lists, USDA FDC, and Open Food Facts
                as layered fallbacks.
              </p>
              <div className="chip-row">
                {['ASPEN','ESPEN','ESPGHAN','KDIGO','WHO / FAO','Malawi FCT 2019','PubMed'].map(c => (
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
                Groq LLaMA 3.3 70B for clinical NCP generation, PES statements, and enteral
                plan analysis. FatSecret Premier API food search. pgvector / Supabase vector
                embeddings for semantic search over clinical guidelines.
              </p>
              <div className="chip-row">
                {['Groq LLaMA 3.3','FatSecret API','PubMed E-utilities','pgvector','Scrapy crawler'].map(c => (
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
              {doubled.map(({ label, icon }, i) => (
                <span className="marquee-item" key={`${label}-${i}`}>
                  <span>{icon}</span> {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
