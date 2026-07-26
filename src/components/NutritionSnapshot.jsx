import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import NutritionChart from './NutritionChart'

const miycn = [
  {
    value: '35.5%',
    label: 'Stunting, under-5s',
    note: 'vs 30.7% Africa average',
    tag: 'Some progress',
    tone: 'progress',
  },
  {
    value: '2.6%',
    label: 'Wasting, under-5s',
    note: 'vs 6.0% Africa average',
    tag: 'On course',
    tone: 'ontrack',
  },
  {
    value: '4.4%',
    label: 'Overweight, under-5s',
    note: 'held below the risk threshold',
    tag: 'On course',
    tone: 'ontrack',
  },
  {
    value: '59.4%',
    label: 'Exclusive breastfeeding, 0–5mo',
    note: 'infants exclusively breastfed',
    tag: 'No progress',
    tone: 'off',
  },
  {
    value: '14.5%',
    label: 'Low birth weight',
    note: 'of infants born underweight',
    tag: 'Some progress',
    tone: 'progress',
  },
  {
    value: '31.4%',
    label: 'Anaemia, women 15–49',
    note: 'of reproductive-age women affected',
    tag: 'No progress',
    tone: 'off',
  },
]

const ncd = [
  { value: '11.0%', label: 'Obesity — women', note: 'vs 20.8% Africa average' },
  { value: '2.7%',  label: 'Obesity — men',   note: 'vs 9.2% Africa average' },
  { value: '6.9%',  label: 'Diabetes — women', note: 'adults 18 and over' },
  { value: '7.9%',  label: 'Diabetes — men',   note: 'adults 18 and over' },
]

export default function NutritionSnapshot() {
  return (
    <section id="nutrition-landscape" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Why This Work Matters</span>
            <h2 className="display">On course on 2 targets. <br />Behind on most of the rest.</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="internship-lead snapshot-lead">
            This is the public health side of the work. I didn't start building clinical
            software because I liked code. I started because these numbers kept showing up
            in my caseload. Malawi is currently
            <strong> 'on course' to meet only two</strong> of the global nutrition targets
            with enough data to be assessed. This is the gap my clinical training and my
            software both exist to close.
          </p>
        </Reveal>

        {/* Malawi vs Africa region — Chart.js */}
        <Reveal delay={150}>
          <NutritionChart />
        </Reveal>

        <Reveal delay={200}>
          <p className="metric-group-label">Maternal, infant &amp; young child nutrition</p>
        </Reveal>
        <Reveal delay={250}>
          <div className="metric-grid">
            {miycn.map(({ value, label, note, tag, tone }) => (
              <div className="metric-card" key={label}>
                <span className={`metric-tag metric-tag--${tone}`}>{tag}</span>
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
                <div className="metric-note">{note}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="metric-group-label metric-group-label--spaced">Diet-related non-communicable disease</p>
        </Reveal>
        <Reveal delay={250}>
          <div className="metric-grid metric-grid--four">
            {ncd.map(({ value, label, note }) => (
              <div className="metric-card metric-card--sm" key={label}>
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
                <div className="metric-note">{note}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={150}>
          <div className="snapshot-cta">
            <div>
              <p className="snapshot-cta-title">This is the gap I work in, clinically and in code.</p>
              <p className="snapshot-cta-text">
                If any of that overlaps with what you're working on, nutrition
                consultations, clinical dietetics support, screening and NCP audits,
                or food-data reviews for a health tool of your own, I'd like to hear
                about it.
              </p>
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

      </div>
    </section>
  )
}
