export default function Hero() {
  return (
    <section id="home" className="hero">

      {/* ECG ambient background */}
      <div className="hero-ecg" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            className="ecg-path"
            d="M0,60 L200,60 L220,60 L240,20 L260,100 L280,10 L300,110
               L320,60 L340,60 L560,60 L580,60 L600,20 L620,100 L640,10
               L660,110 L680,60 L700,60 L920,60 L940,60 L960,20 L980,100
               L1000,10 L1020,110 L1040,60 L1060,60 L1200,60"
            stroke="currentColor" strokeWidth="1.5" fill="none"
          />
        </svg>
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-top hero-enter hero-enter-1">
            <span className="avatar" aria-hidden="true">ET</span>
            <span className="eyebrow">Aspiring Clinical & Public Health Dietitian &bull; Zomba, Malawi</span>
          </div>

          <h1 className="hero-heading hero-enter hero-enter-2">
            Why is eating healthy so difficult for so many people?
          </h1>

          <p className="lead hero-enter hero-enter-3">
            I'm Edison Taimu. I build clinical nutrition software that makes
            good nutrition practical, affordable, and easier to access, for
            patients and the people who care for them.
          </p>

          <div className="cta-row hero-enter hero-enter-4">
            <a href="#contact" className="btn btn-primary">
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
            <a href="#projects" className="btn btn-ghost">View my work</a>
          </div>

          <dl className="hero-stats hero-enter hero-enter-5">
            <div className="hero-stat">
              <dt className="hero-stat-value">4</dt>
              <dd className="hero-stat-label">Projects shipped</dd>
            </div>
            <div className="hero-stat">
              <dt className="hero-stat-value">57+</dt>
              <dd className="hero-stat-label">Clinical docs ingested</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
