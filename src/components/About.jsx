import { useState } from 'react'
import Reveal from './Reveal'

export default function About() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id="about" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">About me</span>
            <h2 className="display">Dietetics first, <br />technology in support.</h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-text">
              <p>
                I'm a BSc Nutrition & Dietetics (Hons) graduate (Pioneer Cohort) from
                <strong> Kamuzu University of Health Sciences (KUHeS)</strong>, formerly the
                University of Malawi College of Medicine, in Blantyre, Malawi, having
                completed my degree on 26 August 2026. I work across both
                <strong> clinical dietetics</strong> and <strong> public health nutrition</strong>,
                from bedside care plans to population-level nutrition data, and I'm currently
                seeking dietetic internship opportunities to build on that foundation and grow
                toward becoming a Registered Dietitian.
              </p>
              <p>
                During clinical rotations I found myself manually computing dietary recalls,
                cross-referencing Malawian food composition tables, and writing nutrition care
                plans by hand. To support that work, I also build nutrition software on the side;
                what started as a simple 24-hour recall calculator has grown into
                <strong> Oasis CNST</strong>, a clinical nutrition tool I keep developing alongside
                my dietetics practice.
              </p>

              {expanded && (
                <div className="ncp-explainer">
                  <h3 className="ncp-explainer-title">What does a dietitian actually do?</h3>
                  <p className="ncp-explainer-lead">
                    If you're not from a health background, "dietitian" can sound like it just means
                    meal plans. In practice, it's a structured process, the same one I follow for every
                    patient, and the same thinking behind the software I build:
                  </p>
                  <div className="ncp-steps">
                    <div className="ncp-step">
                      <span className="ncp-step-num">1</span>
                      <h4>Get to know the patient</h4>
                      <p>Understand their health history, lifestyle, budget and what actually matters to them, not just what's on their plate.</p>
                    </div>
                    <div className="ncp-step">
                      <span className="ncp-step-num">2</span>
                      <h4>Find the real issue</h4>
                      <p>Turn that information into a clear nutrition diagnosis: the specific problem to solve, not just a symptom.</p>
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
                    That loop (assess, diagnose, plan, monitor) is what dietitians call the Nutrition
                    Care Process. It's also, more or less, what I'm trying to digitize in Oasis CNST.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="text-link read-more-toggle"
                onClick={() => setExpanded(v => !v)}
                aria-expanded={expanded}
              >
                {expanded ? 'Show less' : "New to dietetics? Read what a dietitian actually does"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
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
                <span className="fact-value">BSc Nutrition & Dietetics, KUHeS</span>
                <span className="fact-sub">Pioneer Cohort · Blantyre, Malawi · formerly University of Malawi College of Medicine</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Focus areas</span>
                <span className="fact-value">Clinical & Public Health Nutrition</span>
                <span className="fact-sub">Critical care, Paediatrics, Renal, Diabetes & Community Nutrition</span>
              </div>
              <div className="fact-row fact-row-highlight">
                <span className="fact-label">Status</span>
                <span className="fact-value">Seeking Dietetic Internship</span>
                <span className="fact-sub">Graduate, ready to grow clinical practice under supervision</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Also building</span>
                <span className="fact-value">Oasis CNST & Chakudya Nutrition Registry (CNR)</span>
                <span className="fact-sub">Software in support of dietetics, not a separate career track</span>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
