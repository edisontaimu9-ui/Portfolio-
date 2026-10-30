import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const interests = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Clinical dietetics',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Public health & community nutrition',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    label: 'Clinical nutrition education',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
    label: 'Global health & nutrition programmes',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <path d="m9 14 2 2 4-4"/>
      </svg>
    ),
    label: 'Malnutrition screening & treatment',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Nutrition informatics',
  },
]

const researchInterests = [
  'Public Health Nutrition',
  'Clinical Nutrition and Dietetics',
  'Maternal, Infant and Child Nutrition',
  'Malnutrition and Micronutrient Deficiencies',
  'Nutrition and Non-Communicable Diseases',
  'Community Nutrition Interventions',
  'Medical Nutrition Therapy',
  'Nutrition Epidemiology and Research',
]

const researchTools = [
  { name: 'R Programming Language', desc: 'Statistical computing, data analysis and visualization.' },
  { name: 'Biostatistics', desc: 'Statistical methods for analysing health and nutrition data.' },
  { name: 'Research Methodology', desc: 'Study design, data collection and interpretation.' },
  { name: 'Scientific Writing', desc: 'Literature reviews, research reports and academic publications.' },
]

const innovationInterests = [
  'Nutrition informatics',
  'Open nutrition data',
  'Digital health tools',
  'AI-assisted dietetic practice',
  'Offline-first design for low-resource settings',
]

const innovationWork = [
  {
    name: 'Chakudya Nutrition Registry (CNR)',
    desc: 'An open food and nutrition API for Malawi. It extends the Malawi Food Composition Table (2019) with exchange lists, renal diet classifications, enteral formulas and community-submitted packaged foods.',
  },
  {
    name: 'AI-ready knowledge retrieval',
    desc: 'Semantic search and retrieval-augmented generation (RAG) over clinical references, plus an MCP server, so AI applications and chatbots can draw on Malawi-specific nutrition data.',
  },
  {
    name: 'Applied clinical and public tools',
    desc: 'Oasis CNST, an offline-first clinical nutrition suite built during clinical rotations; Thanzi, a consumer nutrition tracker built on CNR; and DietitianOS and NCRS for practice and facility record-keeping.',
  },
  {
    name: 'In progress',
    desc: 'A human metabolism simulator and Thanzi Guide, a nutrition education platform for Malawians.',
  },
]

export default function Opportunities() {
  return (
    <section id="internship" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Opportunities</span>
            <h2 className="display">Open to dietetic <br />internship placements.</h2>
          </div>
        </Reveal>

        <div className="internship-layout">

          <Reveal delay={100}>
            <div>
              <p className="internship-lead">
                I'm actively seeking dietetic internship opportunities in clinical and
                public health nutrition: hospital and ward-based placements, community
                nutrition programmes, and roles where I can build supervised clinical
                practice toward becoming a Registered Dietitian.
              </p>
              <p className="internship-lead">
                My training is grounded in Malawi-specific clinical protocols and the
                Nutrition Care Process, from bedside assessment to community-level
                screening. Alongside that clinical foundation, I also build nutrition
                software to support the field I'm training in.
              </p>
              <p className="internship-lead">
                If you're offering an internship, placement, or supervised practice
                opportunity in clinical or community nutrition, I'd like to hear from you.
              </p>

              <div className="internship-availability">
                <span className="avail-dot"/>
                <div>
                  <span className="avail-label">Availability</span>
                  <span className="avail-value">
                    Available now. In-person or hybrid; based in Zomba, Malawi.
                  </span>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary">
                Let's talk
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <p className="interest-heading">Areas of interest</p>
              <div className="interest-grid">
                {interests.map(({ icon, label }) => (
                  <div className="interest-card" key={label}>
                    <span className="interest-icon">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        <div className="ri-block">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Research &amp; innovation</span>
              <h2 className="display">Evidence and tools, <br />built side by side.</h2>
            </div>
          </Reveal>

          <div className="ri-grid">
            <Reveal delay={80}>
              <div className="skill-card ri-card">
                <span className="ri-tag">R · Research</span>
                <h3>Public health and clinical nutrition research</h3>
                <p>
                  I am passionate about nutrition research, with particular interests in
                  public health nutrition and clinical nutrition. I am interested in exploring
                  nutrition-related challenges, investigating evidence-based interventions, and
                  contributing to research that improves health outcomes at both individual and
                  population levels.
                </p>
                <p className="ri-sub">Key research interests</p>
                <div className="chip-row">
                  {researchInterests.map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
                <p className="ri-sub">Research tools and technical skills</p>
                <ul className="ri-list">
                  {researchTools.map(({ name, desc }) => (
                    <li key={name}><strong>{name}:</strong> {desc}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="skill-card ri-card">
                <span className="ri-tag">I · Innovation</span>
                <h3>Nutrition informatics and digital health</h3>
                <p>
                  Alongside research, I build the digital infrastructure that clinical and
                  public health nutrition work depends on. My focus is turning local nutrition
                  evidence, such as Malawi-specific food composition data and clinical protocols,
                  into open, usable tools for dietitians, researchers and developers.
                </p>
                <p className="ri-sub">Areas of innovation interest</p>
                <div className="chip-row">
                  {innovationInterests.map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
                <p className="ri-sub">What I have built</p>
                <ul className="ri-list">
                  {innovationWork.map(({ name, desc }) => (
                    <li key={name}><strong>{name}:</strong> {desc}</li>
                  ))}
                </ul>
                <p className="ri-recognition">
                  Chakudya received 2nd Best Innovation at the 5th Research Dissemination
                  Conference, KUHeS.{' '}
                  <Link to="/projects#chakudya" className="text-link">See the project</Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
