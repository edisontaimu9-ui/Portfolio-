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

      <div className="container hero-grid">

        {/* Left: copy */}
        <div className="hero-content">
          <div className="hero-top hero-enter hero-enter-1">
            <span className="avatar" aria-hidden="true">ET</span>
            <span className="eyebrow">Aspiring Clinical Dietitian &bull; Zomba, Malawi</span>
          </div>

          <h1 className="hero-heading hero-enter hero-enter-2">
            Why is eating healthy so difficult for so many people?
          </h1>

          <p className="lead hero-enter hero-enter-3">
            Good nutrition should be practical, affordable, and easy to understand.
          </p>

          <p className="lead hero-enter hero-enter-3">
            I help people make healthier food choices that fit their health, their
            budget, and their everyday lives. Along the way, I discovered that many
            healthcare challenges could be solved with better digital tools. So I
            taught myself software development and now build applications that make
            nutrition care simpler for patients and healthcare professionals.
          </p>

          <p className="lead hero-enter hero-enter-3">
            Whether I'm working with people in a clinic or building technology, my
            goal is the same: to make healthy living more accessible, one solution
            at a time.
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
        </div>

        {/* Right: stat cards */}
        <aside className="hero-visual hero-enter hero-enter-5" aria-label="Portfolio highlights">
          <div className="stat-card">
            <span className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <path d="M12 20h.01"/>
              </svg>
            </span>
            <div>
              <div className="stat-value">Offline-first</div>
              <div className="stat-label">Low-resource ready</div>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
              </svg>
            </span>
            <div>
              <div className="stat-value">AI-assisted NCP</div>
              <div className="stat-label">ADIME / IDNT documentation</div>
            </div>
          </div>

        </aside>
      </div>
    </section>
  )
}
