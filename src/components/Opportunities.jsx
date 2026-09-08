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
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
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
                    Open to dietetic internships and supervised practice placements.
                    In-person or hybrid; based in Zomba, Malawi.
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
      </div>
    </section>
  )
}
