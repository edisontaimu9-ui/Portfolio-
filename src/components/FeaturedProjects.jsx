import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import chakudyaIllustration from '../assets/chakudya-illustration.png'
import oasisHome from '../assets/oasis-home.webp'
import thanziHome from '../assets/thanzi-home.webp'
import dietitianosDashboard from '../assets/dietitianos-dashboard.webp'

// Public docs for the Chakudya Nutrition Registry. (The /admin/ingest.html page
// is an internal noindex admin tool, so it is deliberately not linked here.)
const CHAKUDYA_DOCS_URL = 'https://edisontaimu9-ui.github.io/Chakudya-docs/'

const lead = {
  title: 'Chakudya Nutrition Registry',
  summary: 'An open nutrition data API for Malawi: foods, exchange lists, renal foods and enteral formulas, plus RAG search over clinical references. It powers Thanzi and Oasis.',
  image: chakudyaIllustration,
  alt: 'Chakudya Nutrition Registry illustration',
}

const featured = [
  {
    id: 'oasis',
    title: 'Oasis CNST',
    summary: 'Offline-first clinical nutrition suite with 11+ modules, built during clinical rotations.',
    image: oasisHome,
    alt: 'Oasis CNST home screen',
  },
  {
    id: 'thanzi',
    title: 'Thanzi',
    summary: 'Nutrition tracking PWA for daily meal logging, BMI/BMR/TDEE and progress dashboards.',
    image: thanziHome,
    alt: 'Thanzi home screen',
  },
  {
    id: 'dietitianos',
    title: 'DietitianOS',
    summary: 'Practice management app for dietitians: patient records, appointments and reporting.',
    image: dietitianosDashboard,
    alt: 'DietitianOS dashboard',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="section featured-section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Selected work</span>
            <h2 className="display">Built for real clinical gaps.</h2>
          </div>
        </Reveal>

        <Reveal>
          <a href={CHAKUDYA_DOCS_URL} target="_blank" rel="noopener noreferrer"
            className="featured-card featured-card--lead">
            <div className="featured-shot">
              <img src={lead.image} alt={lead.alt} loading="lazy" decoding="async" />
            </div>
            <div className="featured-body">
              <span className="featured-status">
                <span className="status-dot live" />
                Live · API
              </span>
              <h3 className="featured-title">{lead.title}</h3>
              <p className="featured-summary">{lead.summary}</p>
              <span className="tile-cta">Explore the API docs</span>
            </div>
          </a>
        </Reveal>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Link to="/projects" className="featured-card">
                <div className="featured-shot">
                  <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                </div>
                <div className="featured-body">
                  <span className="featured-status">
                    <span className="status-dot live" />
                    Live
                  </span>
                  <h3 className="featured-title">{p.title}</h3>
                  <p className="featured-summary">{p.summary}</p>
                  <span className="tile-cta">View project</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link to="/projects" className="text-link featured-all">See all projects</Link>
        </Reveal>
      </div>
    </section>
  )
}
