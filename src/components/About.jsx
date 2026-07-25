import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">About me</span>
            <h2 className="display">Nutrition science meets <br />code.</h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-text">
              <p>
                I'm <strong>Edison Taimu</strong>, a BSc Nutrition & Dietetics graduate
                (Pioneer Cohort) from <strong>Kamuzu University of Health Sciences (KUHeS)</strong>
                in Blantyre, Malawi. I built clinical nutrition software out of a need that existed
                long before I knew how to write a line of code — the gap between what evidence-based
                nutrition care demands and what the ward actually has.
              </p>
              <p>
                During clinical rotations I found myself manually computing dietary recalls,
                cross-referencing Malawian food composition tables, and writing nutrition care
                plans by hand. I automated the tedious parts first, then kept going. What started
                as a 24-hour recall calculator is now <strong>Oasis CNST</strong> — a full clinical
                nutrition software suite.
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
                <span className="fact-sub">Pioneer Cohort · Blantyre, Malawi</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Clinical focus</span>
                <span className="fact-value">Critical care, Paediatrics, Renal & Diabetes</span>
                <span className="fact-sub">ADIME / NCP · ASPEN · ESPEN · WHO / Malawi protocols</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Dev stack</span>
                <span className="fact-value">Full-Stack Development</span>
                <span className="fact-sub">React, Node.js & cloud infrastructure</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Currently</span>
                <span className="fact-value">Building Oasis CNST & Chakudya Nutrition Registry (CNR)</span>
                <span className="fact-sub">Seeking global health innovation internship</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="ncp-explainer">
            <h3 className="ncp-explainer-title">What does a dietitian actually do?</h3>
            <p className="ncp-explainer-lead">
              If you're not from a health background, "dietitian" can sound like it just means
              meal plans. In practice, it's a structured process — the same one I follow for every
              patient, and the same thinking behind the software I build:
            </p>
            <div className="ncp-steps">
              <div className="ncp-step">
                <span className="ncp-step-num">1</span>
                <h4>Get to know the patient</h4>
                <p>Understand their health history, lifestyle, budget and what actually matters to them — not just what's on their plate.</p>
              </div>
              <div className="ncp-step">
                <span className="ncp-step-num">2</span>
                <h4>Find the real issue</h4>
                <p>Turn that information into a clear nutrition diagnosis — the specific problem to solve, not just a symptom.</p>
              </div>
              <div className="ncp-step">
                <span className="ncp-step-num">3</span>
                <h4>Build a plan together</h4>
                <p>Set goals with the patient, not for them, and choose an intervention that fits their real life.</p>
              </div>
              <div className="ncp-step">
                <span className="ncp-step-num">4</span>
                <h4>Follow up & adjust</h4>
                <p>Track progress, monitor outcomes, and change course when something isn't working.</p>
              </div>
            </div>
            <p className="ncp-explainer-foot">
              That loop — assess, diagnose, plan, monitor — is what dietitians call the Nutrition
              Care Process. It's also, more or less, what I'm trying to digitize in Oasis CNST.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
