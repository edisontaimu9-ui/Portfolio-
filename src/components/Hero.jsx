import { Link } from 'react-router-dom'
import profilePhoto from '../assets/profile-photo.jpg'
import DayNightWidget from './DayNightWidget'
import Typewriter from './Typewriter'

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
        <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-top hero-enter hero-enter-1">
            <span className="eyebrow">Aspiring Clinical & Public Health Dietitian &bull; Zomba, Malawi</span>
          </div>

          <div className="hero-enter hero-enter-2">
            <DayNightWidget />
          </div>

          <h1 className="hero-heading hero-enter-2-noop">
            <Typewriter text="Why is eating healthy so difficult for so many people?" />
          </h1>

          <p className="lead hero-enter hero-enter-3">
            I'm Edison Taimu. I build clinical nutrition software that makes
            good nutrition practical, affordable, and easier to access, for
            patients and the people who care for them.
          </p>

          <div className="cta-row hero-enter hero-enter-4">
            <Link to="/contact" className="btn btn-primary">
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/projects" className="btn btn-ghost">View my work</Link>
          </div>

          <div className="hero-stats hero-enter hero-enter-5">
            <Link to="/projects" className="hero-stat">
              <span className="hero-stat-value">4</span>
              <span className="hero-stat-label">Projects shipped</span>
            </Link>
            <Link to="/projects" className="hero-stat">
              <span className="hero-stat-value">57+</span>
              <span className="hero-stat-label">Clinical docs ingested</span>
            </Link>
          </div>
        </div>

        <div className="hero-visual hero-enter hero-enter-1">
          <div className="ring-portrait">
            <img src={profilePhoto} alt="Edison Taimu" className="ring-portrait-img" />
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
