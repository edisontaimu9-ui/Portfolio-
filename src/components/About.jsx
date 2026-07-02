import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">About me</span>
            <h2 className="display">Nutrition science meets <br />handwritten code.</h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-text">
              <p>
                I'm <strong>Edison Taimu</strong>, a BSc Nutrition & Dietetics graduate
                (Pioneer Cohort) from <strong>Kamuzu University of Health Sciences (KUHeS)</strong>
                in Zomba, Malawi. I built clinical nutrition software out of a need that existed
                long before I knew how to write a line of code — the gap between what evidence-based
                nutrition care demands and what the ward actually has.
              </p>
              <p>
                During clinical rotations I found myself manually computing dietary recalls,
                cross-referencing Malawian food composition tables, and writing nutrition care
                plans by hand. I automated the tedious parts first, then kept going. What started
                as a 24-hour recall calculator is now <strong>Oasis CNST</strong> — a full clinical
                nutrition software suite with 11+ modules running offline-first in resource-limited
                healthcare settings.
              </p>
              <p>
                I work from <strong>Termux on Android</strong>, push to GitHub, and deploy to the
                web. No laptop. No office. Just the problem and the tools to solve it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="fact-card">
              <div className="fact-row">
                <span className="fact-label">Location</span>
                <span className="fact-value">Zomba, Malawi</span>
                <span className="fact-sub">Key contacts: Blantyre & internationally</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Education</span>
                <span className="fact-value">BSc Nutrition & Dietetics — KUHeS</span>
                <span className="fact-sub">Pioneer Cohort · Zomba, Malawi</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Clinical focus</span>
                <span className="fact-value">Critical care, Paediatrics, Renal & Diabetes</span>
                <span className="fact-sub">ADIME / NCP · ASPEN · ESPEN · WHO / Malawi protocols</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Dev stack</span>
                <span className="fact-value">Vanilla JS · React · Vite · Firebase · Appwrite</span>
                <span className="fact-sub">Termux on Android · GitHub Pages · Cloudflare</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Currently</span>
                <span className="fact-value">Building Oasis CNST & Chakudya API</span>
                <span className="fact-sub">Seeking global health innovation internship</span>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
