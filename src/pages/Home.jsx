import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import BlogPreview from '../components/BlogPreview'

const sections = [
  {
    code: 'AB',
    to: '/about',
    title: 'About',
    summary: "I'm a BSc Nutrition & Dietetics graduate turned self-taught developer, building the clinical tools I wished existed on the ward.",
  },
  {
    code: 'PR',
    to: '/projects',
    title: 'Projects',
    summary: 'Four live tools, from a clinical nutrition suite to an open food database, all built to close real gaps in Malawian healthcare.',
  },
  {
    code: 'SK',
    to: '/skills',
    title: 'Skills',
    summary: 'Clinical dietetics and full-stack development, applied together rather than kept apart.',
  },
  {
    code: 'EX',
    to: '/experience',
    title: 'Experience',
    summary: 'From ward rotations to shipping production software used in real clinical settings.',
  },
  {
    code: 'IM',
    to: '/impact',
    title: 'Impact',
    summary: "Malawi's real nutrition indicators, and the case for why accessible nutrition care changes outcomes.",
  },
  {
    code: 'OP',
    to: '/opportunities',
    title: 'Opportunities',
    summary: 'Open to global health innovation internships and collaborations that put this work in front of more patients.',
  },
  {
    code: 'SU',
    to: '/support',
    title: 'Support',
    summary: 'A small contribution keeps these free clinical nutrition tools running.',
  },
  {
    code: 'CN',
    to: '/contact',
    title: 'Contact',
    summary: 'Reach out about internships, collaborations, or problems worth solving in low-resource clinical settings.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'Edison Taimu — Clinical Nutrition Software Builder'
  }, [])

  return (
    <>
      <Hero />

      <section className="section tiles-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Explore</span>
              <h2 className="display">Everything, at a glance.</h2>
            </div>
          </Reveal>

          <div className="tiles-grid">
            {sections.map((s, i) => (
              <Reveal key={s.to} delay={i * 50}>
                <Link to={s.to} className="tile">
                  <div className="tile-top">
                    <span className="tile-code">{s.code}</span>
                    <svg className="tile-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                  <h3 className="tile-title">{s.title}</h3>
                  <p className="tile-summary">{s.summary}</p>
                  <span className="tile-cta">Learn more</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BlogPreview />
    </>
  )
}
