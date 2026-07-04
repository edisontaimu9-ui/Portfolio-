import Reveal from './Reveal'

const entries = [
  {
    year:  '2025 – Present',
    title: 'Self-taught Software Developer',
    org:   'Independent',
    desc: `Building Oasis CNST, a clinical nutrition PWA with 11+ modules, evolved from an 
    initial dietary recall tool into a comprehensive clinical decision support platform. Also 
    developed Thanzi, a consumer nutrition tracking application, and Chakudya API, Malawi's 
    first open food composition database.`,
  },
  {
    year:  '2025 – 2026',
    title: 'Clinical Nutrition Student',
    org:   'Queen Elizabeth Central Hospital',
    desc: `Clinical rotations spanning critical care, paediatrics, renal, diabetes, and general 
    medicine, alongside food service management and community nutrition. Conducted nutrition 
    assessments and developed structured care plans, applying international and Malawi-specific 
    nutrition protocols.`,
  },
  {
    year:  '2021 – 2026',
    title: 'BSc Nutrition & Dietetics (Pioneer Cohort)',
    org:   'Kamuzu University of Health Sciences (KUHeS) · Blantyre, Malawi',
    desc: `Member of the inaugural BSc Nutrition & Dietetics cohort at KUHeS, Malawi's first 
    degree-level dietetics programme. Curriculum covered food science, medical nutrition 
    therapy, community nutrition, and research methods, complemented by clinical placement.`,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Experience</span>
            <h2 className="display">The timeline of <br />a problem-solver.</h2>
          </div>
        </Reveal>

        <div className="timeline">
          {entries.map(({ year, title, org, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <span className="timeline-year">{year}</span>
                <div>
                  <div className="timeline-title">{title}</div>
                  <div style={{
                    fontSize: '.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                    fontWeight: 500
                  }}>
                    {org}
                  </div>
                </div>
                <p className="timeline-desc">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
