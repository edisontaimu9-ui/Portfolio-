import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { TbCalculator, TbClipboardCheck, TbApple, TbAward } from 'react-icons/tb'

const lead = {
  id: 'chakudya',
  title: 'Chakudya Nutrition Registry',
  summary: 'An open nutrition data API for Malawi: foods, exchange lists, renal foods and enteral formulas, plus RAG search over clinical references. It powers Thanzi and Oasis.',
}

const featured = [
  {
    id: 'oasis',
    title: 'Oasis CNST',
    summary: 'Offline-first clinical nutrition suite with 11+ modules, built during clinical rotations.',
    cover: {
      tone: 'oasis',
      Icon: TbCalculator,
      stat: '11+',
      caption: 'clinical modules',
      chips: ['Offline-first', 'Enteral & parenteral', 'Malnutrition screening'],
    },
  },
  {
    id: 'thanzi',
    title: 'Thanzi',
    summary: 'Nutrition tracking PWA for daily meal logging, BMI/BMR/TDEE and progress dashboards.',
    cover: {
      tone: 'thanzi',
      Icon: TbApple,
      stat: 'BMI · BMR · TDEE',
      caption: 'plus daily meal logging',
      chips: ['Meal diary', 'Progress dashboards', 'PWA'],
    },
  },
  {
    id: 'dietitianos',
    title: 'DietitianOS',
    summary: 'Practice management app for dietitians: patient records, appointments and reporting.',
    cover: {
      tone: 'dietitianos',
      Icon: TbClipboardCheck,
      stat: 'One dashboard',
      caption: 'for your whole caseload',
      chips: ['Patients', 'Appointments', 'Reports'],
    },
  },
]

/* Cover for the lead card: a mini terminal using a real response from the live API
   (same values as the terminal demo on the Projects page). */
function ApiCover() {
  return (
    <div className="cover-terminal" aria-hidden="true">
      <div className="cover-terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="cover-terminal-tag">GET /foods</span>
      </div>
      <div className="cover-terminal-body">
        <div className="cover-terminal-cmd"><span>$</span> curl api.chakudya.xyz/foods?search=nsima</div>
        <pre>{`{
  "food_name": "Nsima ya kondowole",
  "category": "Staples",
  "kcal": 160,
  "protein_g": 1,
  "carbs_g": 37
}`}</pre>
      </div>
      <span className="cover-award"><TbAward size={14} /> 2nd Best Innovation</span>
    </div>
  )
}

function TileCover({ tone, Icon, stat, caption, chips }) {
  return (
    <div className={`cover-tile cover-tile--${tone}`} aria-hidden="true">
      <span className="cover-tile-icon"><Icon size={26} /></span>
      <div className="cover-tile-stat">{stat}</div>
      <div className="cover-tile-caption">{caption}</div>
      <div className="cover-tile-chips">
        {chips.map((c) => <span key={c}>{c}</span>)}
      </div>
    </div>
  )
}

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
          <Link to={`/projects#${lead.id}`} className="featured-card featured-card--lead">
            <div className="featured-shot featured-shot--cover">
              <ApiCover />
            </div>
            <div className="featured-body">
              <span className="featured-status">
                <span className="status-dot live" />
                Live · API
              </span>
              <h3 className="featured-title">{lead.title}</h3>
              <p className="featured-summary">{lead.summary}</p>
              <span className="tile-cta">View project</span>
            </div>
          </Link>
        </Reveal>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Link to={`/projects#${p.id}`} className="featured-card">
                <div className="featured-shot featured-shot--cover">
                  <TileCover {...p.cover} />
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
