import Reveal from './Reveal'

const interests = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Digital health for LMICs',
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
    label: 'Global health innovation',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      </svg>
    ),
    label: 'Clinical AI & decision support',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    label: 'Nutrition informatics',
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
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Open-source health tools',
  },
]

export default function Opportunities() {
  return (
    <section id="internship" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Opportunities</span>
            <h2 className="display">Looking for a team <br />worth building with.</h2>
          </div>
        </Reveal>

        <div className="internship-layout">

          <Reveal delay={100}>
            <div>
              <p className="internship-lead">
                I'm actively seeking internships and fellowships at the intersection of
                clinical and public health nutrition and health technology — global health
                innovation programmes, digital health research roles, and clinical informatics
                positions where the work has direct patient and population impact in
                low-resource settings.
              </p>
              <p className="internship-lead">
                I bring a rare dual profile: clinical dietetics training grounded in
                Malawi-specific protocols, and a working software portfolio built entirely
                from that clinical need. I'm not transitioning into tech — I'm already in
                both. I apply ASPEN and write Firebase rules in the same afternoon.
              </p>
              <p className="internship-lead">
                If you're building health tools for underserved populations and need
                someone who understands the problem from the inside, I'd like to hear
                from you.
              </p>

              <div className="internship-availability">
                <span className="avail-dot"/>
                <div>
                  <span className="avail-label">Availability</span>
                  <span className="avail-value">
                    Open to internships, fellowships, and collaborative projects.
                    In-person, hybrid, or remote; based in Zomba, Malawi.
                  </span>
                </div>
              </div>

              <a href="#contact" className="btn btn-primary">
                Let's talk
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
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
