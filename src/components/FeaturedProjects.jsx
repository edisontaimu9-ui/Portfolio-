import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import oasisHome from '../assets/oasis-home.webp'
import thanziHome from '../assets/thanzi-home.webp'
import dietitianosDashboard from '../assets/dietitianos-dashboard.webp'

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
