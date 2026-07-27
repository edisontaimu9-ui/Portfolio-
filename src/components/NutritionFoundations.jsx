import Reveal from './Reveal'
import brainImg      from '../assets/nutrition-brain-mental-health.jpg'
import wholeFoodsImg from '../assets/nutrition-whole-foods.jpg'
import habitsImg      from '../assets/nutrition-everyday-habits.jpg'
import heartImg       from '../assets/nutrition-heart-health.jpg'
import clinicalImg    from '../assets/nutrition-clinical-produce.jpg'

const pillars = [
  {
    img: wholeFoodsImg,
    title: 'Growth & repair',
    text: 'Protein, calcium and vitamin D are the raw materials the body uses to build muscle, bone and tissue, a need that never really stops, from childhood through adulthood.',
  },
  {
    img: heartImg,
    title: 'Disease prevention',
    text: 'A diet built around fruit, vegetables, whole grains and lean protein is one of the most effective tools we have against heart disease, diabetes, and other diet-related conditions.',
  },
  {
    img: brainImg,
    title: 'Mental & emotional health',
    text: 'Nutrients like omega-3s and key vitamins shape mood and cognitive function. Nutrition care is rarely just physical. It touches how people think and feel too.',
  },
  {
    img: habitsImg,
    title: 'Everyday, preventive habits',
    text: "The biggest gains rarely come from a single perfect meal. They come from small, repeatable habits that fit a person's real budget and routine, long before a crisis makes a diagnosis.",
  },
]

export default function NutritionFoundations() {
  return (
    <section id="foundations" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">The Bigger Picture</span>
            <h2 className="display">Nutrition isn't optional. <br />It's the foundation.</h2>
          </div>
        </Reveal>

        <div className="foundations-intro">
          <Reveal delay={80}>
            <p className="internship-lead">
              Food is more than fuel. What someone eats shapes their energy, their immune
              system, their long-term risk of disease, and even their mental clarity, which
              is exactly why nutrition sits at the center of preventive healthcare, not the
              edges of it. Good nutrition should be practical enough for real budgets and real
              schedules, or it doesn't hold up outside a textbook.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="foundations-visual">
              <img src={clinicalImg} alt="Fresh fruits, vegetables and a stethoscope" loading="lazy" decoding="async" />
            </div>
          </Reveal>
        </div>

        <div className="pillar-grid">
          {pillars.map(({ img, title, text }, i) => (
            <Reveal delay={100 + i * 60} key={title}>
              <div className="pillar-card">
                <div className="pillar-card-img">
                  <img src={img} alt={title} loading="lazy" decoding="async" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
