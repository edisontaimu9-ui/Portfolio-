import Reveal from './Reveal'

const entries = [
  {
    year:  '2024 – Present',
    title: 'Self-taught Software Developer',
    org:   'Independent',
    desc: `Built Oasis CNST from scratch during clinical training — starting as a 24-hour dietary 
    recall tool, growing into a full clinical nutrition PWA with 11+ modules. Developed entirely 
    on Termux (Android), deploying to GitHub Pages and minutriq.me via Namecheap + Cloudflare. 
    Integrated Firebase, Appwrite, Groq LLM, multiple food APIs, and a Python Scrapy web crawler. 
    Also built Thanzi (consumer PWA) and Chakudya API (Malawi's first open food nutrients API).`,
  },
  {
    year:  '2023 – 2024',
    title: 'Clinical Nutrition Student',
    org:   'Kamuzu University of Health Sciences (KUHeS)',
    desc: `Clinical rotations across critical care, paediatrics, renal, diabetes, and general 
    medicine wards. Conducted nutrition assessments using NRS-2002, MUST, MNA, and PG-SGA. 
    Wrote nutrition care plans in ADIME format with IDNT codes. Applied ASPEN, ESPEN, ESPGHAN, 
    KDIGO, WHO, and Malawi-specific nutrition protocols. The software I built was born directly 
    from the gaps I encountered here.`,
  },
  {
    year:  '2021 – 2024',
    title: 'BSc Nutrition & Dietetics (Pioneer Cohort)',
    org:   'Kamuzu University of Health Sciences (KUHeS) · Zomba, Malawi',
    desc: `Member of the inaugural BSc Nutrition & Dietetics cohort at KUHeS — the first 
    degree-level dietetics programme in Malawi. Curriculum spanning food science, 
    medical nutrition therapy, community nutrition, research methods, and clinical 
    placement. Graduated with both the clinical foundation and the hunger to fix 
    what the system couldn't give us.`,
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
