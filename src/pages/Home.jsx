import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import BlogPreview from '../components/BlogPreview'
import HealthTechMarquee from '../components/HealthTechMarquee'
import FeaturedProjects from '../components/FeaturedProjects'
import { TbUser, TbLayoutGrid, TbHeartHandshake, TbTools, TbTimeline, TbMail } from 'react-icons/tb'

// Six core sections in one grid. Impact and Support live in the footer.
const sections = [
  {
    Icon: TbUser,
    to: '/about',
    title: 'About',
    summary: "I'm a BSc Nutrition & Dietetics graduate turned self-taught developer, building the clinical tools I wished existed on the ward.",
  },
  {
    Icon: TbLayoutGrid,
    to: '/projects',
    title: 'Projects',
    summary: 'Four live tools, from a clinical nutrition suite to an open food database, all built to close real gaps in Malawian healthcare.',
  },
  {
    Icon: TbHeartHandshake,
    to: '/opportunities',
    title: 'Opportunities',
    summary: 'Open to global health innovation internships and collaborations that put this work in front of more patients and clients.',
  },
  {
    Icon: TbTools,
    to: '/skills',
    title: 'Skills',
    summary: 'Clinical dietetics and full-stack development, applied together rather than kept apart.',
  },
  {
    Icon: TbTimeline,
    to: '/experience',
    title: 'Experience',
    summary: 'From ward rotations to shipping production software used in real clinical settings.',
  },
  {
    Icon: TbMail,
    to: '/contact',
    title: 'Contact',
    summary: 'Reach out about internships, collaborations, or problems worth solving in low-resource clinical settings.',
  },
]

function TileGrid({ items }) {
  return (
    <div className="tiles-grid">
      {items.map(({ Icon, ...s }, i) => (
        <Reveal key={s.to} delay={i * 50}>
          <Link to={s.to} className="tile">
            <div className="tile-top">
              <span className="tile-code"><Icon size={18} aria-hidden="true" /></span>
              <svg className="tile-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
            <h3 className="tile-title">{s.title}</h3>
            <p className="tile-summary">{s.summary}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Edison Taimu | Clinical Nutrition Software Builder'
  }, [])

  return (
    <>
      <Hero />

      <FeaturedProjects />

      <section className="section tiles-section">
        <HealthTechMarquee />
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Explore</span>
              <h2 className="display">Everything, at a glance.</h2>
            </div>
          </Reveal>

          <TileGrid items={sections} />
        </div>
      </section>

      <BlogPreview />
    </>
  )
}
