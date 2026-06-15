// ─── Globals from CDN ────────────────────────────────────────────────────────
const { useState, useEffect, useRef } = React;
const {
  Twitter, Linkedin, Facebook, Phone, Mail,
  ArrowRight, ArrowUpRight, ExternalLink,
  Menu, X, Code2, Stethoscope, Wrench,
  Layers, WifiOff, Brain, Heart, Sparkles,
} = lucideReact;
// ─────────────────────────────────────────────────────────────────────────────
/* ---------------------------------------------------------------------- */
/* Design system                                                            */
/* ---------------------------------------------------------------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* Color */
  --canvas: #fbfbfd;
  --surface: #ffffff;
  --surface-2: #f5f5f7;
  --ink: #1d1d1f;
  --ink-secondary: #6e6e73;
  --ink-tertiary: #a1a1a6;
  --line: #d8d8dc;
  --accent: #0f7a6e;
  --accent-soft: #e6f2f0;

  /* Type */
  --font-sans: 'Inter', -apple-system, 'SF Pro Display', 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', ui-monospace, monospace;
  --text-xs: 0.8125rem;
  --text-sm: 0.9375rem;
  --text-base: 1.0625rem;
  --text-lg: 1.25rem;
  --text-xl: 1.625rem;
  --text-2xl: 2.0625rem;

  /* Spacing (8px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 132px;

  /* Shape & motion */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03);
  --shadow-md: 0 12px 24px -8px rgba(0,0,0,0.10), 0 4px 8px -4px rgba(0,0,0,0.04);
  --shadow-lg: 0 24px 48px -12px rgba(0,0,0,0.14);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

.portfolio {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--canvas);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

a { color: inherit; }

button { font-family: inherit; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ---------------------------------------------------------------------- */
/* Nav                                                                      */
/* ---------------------------------------------------------------------- */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(251,251,253,0);
  border-bottom: 1px solid transparent;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
}

.nav.scrolled {
  background: rgba(251,251,253,0.92);
  border-bottom: 1px solid var(--line);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  font-weight: 700;
  font-size: var(--text-sm);
  letter-spacing: -0.01em;
}

.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: linear-gradient(145deg, var(--accent), #0a5b53);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  gap: var(--space-6);
  list-style: none;
}

.nav-link {
  font-size: var(--text-sm);
  color: var(--ink-secondary);
  text-decoration: none;
  position: relative;
  padding: 4px 0;
  transition: color 0.3s var(--ease);
}

.nav-link:hover { color: var(--ink); }

.nav-link.active { color: var(--ink); }

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.nav-cta {
  display: none;
}

@media (min-width: 760px) {
  .nav-cta { display: inline-flex; }
}

.menu-toggle {
  display: flex;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  padding: 8px;
}

@media (min-width: 760px) {
  .menu-toggle { display: none; }
  .nav-links { display: flex; }
}

@media (max-width: 759px) {
  .nav-links { display: none; }
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--canvas);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-6);
  padding: 0 var(--space-6);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.5s var(--ease), opacity 0.5s var(--ease);
  pointer-events: none;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu a {
  font-size: var(--text-2xl);
  font-weight: 700;
  text-decoration: none;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.mobile-menu .close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink);
}

/* ---------------------------------------------------------------------- */
/* Buttons                                                                  */
/* ---------------------------------------------------------------------- */

.btn {
  font-size: var(--text-sm);
  font-weight: 600;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), background 0.35s var(--ease), border-color 0.35s var(--ease), color 0.35s var(--ease);
}

.btn-primary {
  background: var(--ink);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}

.btn-secondary:hover {
  border-color: var(--ink);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 10px 20px;
  font-size: var(--text-xs);
}

/* ---------------------------------------------------------------------- */
/* Hero                                                                     */
/* ---------------------------------------------------------------------- */

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 96px;
  padding-bottom: var(--space-8);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: var(--space-9);
  align-items: center;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  display: inline-block;
}

.hero-top {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--accent), #0a5b53);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: var(--text-sm);
  flex-shrink: 0;
}

h1.display {
  font-size: clamp(2.6rem, 7vw, 5.25rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.06;
}

h1.display .accent-text { color: var(--accent); }

.lead {
  font-size: var(--text-lg);
  color: var(--ink-secondary);
  line-height: 1.65;
  max-width: 540px;
  margin-top: var(--space-5);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-7);
}

/* hero visual: floating stat cards */
.hero-visual {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  animation: float 7s ease-in-out infinite;
  max-width: 320px;
}

.stat-card:nth-child(1) { align-self: flex-start; animation-delay: 0s; }
.stat-card:nth-child(2) { align-self: center; margin-left: 56px; animation-delay: 1.4s; }
.stat-card:nth-child(3) { align-self: flex-start; margin-left: 24px; animation-delay: 2.8s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-value { font-size: var(--text-base); font-weight: 700; }
.stat-label { font-size: var(--text-xs); color: var(--ink-secondary); font-family: var(--font-mono); margin-top: 2px; }

/* ---------------------------------------------------------------------- */
/* Sections (generic)                                                       */
/* ---------------------------------------------------------------------- */

.section { padding: var(--space-10) 0; }

.section-head { max-width: 640px; margin-bottom: var(--space-8); }

h2.display {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.015em;
  margin-top: var(--space-3);
}

.section-sub {
  font-size: var(--text-base);
  color: var(--ink-secondary);
  margin-top: var(--space-4);
  line-height: 1.65;
}

/* ---------------------------------------------------------------------- */
/* About                                                                    */
/* ---------------------------------------------------------------------- */

.about-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
}

.about-text p {
  font-size: var(--text-base);
  color: var(--ink-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-5);
}

.about-text p:last-child { margin-bottom: 0; }

.about-text strong { color: var(--ink); font-weight: 600; }

.fact-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.fact-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--line);
  font-size: var(--text-sm);
}

.fact-row:first-child { padding-top: 0; }
.fact-row:last-child { border-bottom: none; padding-bottom: 0; }

.fact-label {
  color: var(--ink-tertiary);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.fact-value { font-weight: 600; text-align: right; }

/* ---------------------------------------------------------------------- */
/* Skills                                                                   */
/* ---------------------------------------------------------------------- */

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 900px) {
  .skills-grid { grid-template-columns: 1fr; }
}

.skill-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s var(--ease);
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.skill-card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: var(--space-5);
}

.skill-card h3 { font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-2); }

.skill-card p {
  font-size: var(--text-sm);
  color: var(--ink-secondary);
  line-height: 1.6;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-5);
}

.chip {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: var(--surface-2);
  color: var(--ink-secondary);
}

/* ---------------------------------------------------------------------- */
/* Projects                                                                 */
/* ---------------------------------------------------------------------- */

.project-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--line);
}

.project-card:first-of-type { padding-top: 0; }

@media (max-width: 900px) {
  .project-card { grid-template-columns: 1fr; padding: var(--space-7) 0; }
  .project-card .project-visual { order: -1; }
}

.project-card:nth-of-type(even) .project-visual { order: 2; }

@media (max-width: 900px) {
  .project-card:nth-of-type(even) .project-visual { order: -1; }
}

.project-visual {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  background-color: var(--surface-2);
  background-image:
    linear-gradient(160deg, var(--accent) 0%, rgba(15,122,110,0) 60%),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.05) 0px, rgba(29,29,31,0.05) 1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(90deg, rgba(29,29,31,0.05) 0px, rgba(29,29,31,0.05) 1px, transparent 1px, transparent 28px);
}

.project-visual span {
  position: absolute;
  bottom: var(--space-5);
  left: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--surface);
  background: rgba(29,29,31,0.35);
  padding: 6px 12px;
  border-radius: var(--radius-full);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-secondary);
  margin-bottom: var(--space-4);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-tertiary);
}

.status-dot.live {
  background: var(--accent);
  animation: pulse 2.4s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(15,122,110,0.45); }
  70% { box-shadow: 0 0 0 8px rgba(15,122,110,0); }
  100% { box-shadow: 0 0 0 0 rgba(15,122,110,0); }
}

.project-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-3);
}

.project-desc {
  color: var(--ink-secondary);
  line-height: 1.75;
  font-size: var(--text-base);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-top: var(--space-6);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease);
}

.text-link:hover { color: var(--accent); border-color: var(--accent); }

.project-cta {
  margin-top: var(--space-8);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.project-cta h3 { font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--space-2); }
.project-cta p { color: var(--ink-secondary); font-size: var(--text-sm); }

/* ---------------------------------------------------------------------- */
/* Experience timeline                                                      */
/* ---------------------------------------------------------------------- */

.timeline {
  position: relative;
  padding-left: 36px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--line);
}

.timeline-item { position: relative; padding-bottom: var(--space-8); }
.timeline-item:last-child { padding-bottom: 0; }

.timeline-dot {
  position: absolute;
  left: -36px;
  top: 4px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--canvas);
  border: 2px solid var(--accent);
}

.timeline-year {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
}

.timeline-title { font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-2); }

.timeline-desc {
  color: var(--ink-secondary);
  line-height: 1.7;
  max-width: 600px;
  font-size: var(--text-base);
}

/* ---------------------------------------------------------------------- */
/* Testimonials                                                             */
/* ---------------------------------------------------------------------- */

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

@media (max-width: 900px) {
  .testimonial-grid { grid-template-columns: 1fr; }
}

.testimonial-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: var(--space-7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-quote {
  font-size: var(--text-lg);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  letter-spacing: -0.005em;
}

.testimonial-author { font-weight: 700; font-size: var(--text-sm); }
.testimonial-role { font-size: var(--text-sm); color: var(--ink-secondary); margin-top: 2px; }

/* ---------------------------------------------------------------------- */
/* Contact                                                                  */
/* ---------------------------------------------------------------------- */

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: var(--space-9);
}

@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; gap: var(--space-7); }
}

.contact-text p {
  color: var(--ink-secondary);
  font-size: var(--text-base);
  line-height: 1.75;
  max-width: 440px;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: var(--space-6);
  font-size: var(--text-lg);
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  padding-bottom: 4px;
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease);
}

.contact-email:hover { color: var(--accent); border-color: var(--accent); }

.contact-links {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.icon-link {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.3s var(--ease), color 0.3s var(--ease), transform 0.3s var(--ease);
}

.icon-link:hover {
  background: var(--ink);
  color: #fff;
  transform: translateY(-2px);
}

.field { display: flex; flex-direction: column; gap: 8px; margin-bottom: var(--space-5); }

.field label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-tertiary);
}

.field input,
.field textarea {
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--ink);
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.form-foot {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-top: var(--space-2);
}

.form-note { font-size: var(--text-xs); color: var(--ink-tertiary); }

/* ---------------------------------------------------------------------- */
/* Support / Gift Card                                                      */
/* ---------------------------------------------------------------------- */

.support-section { padding: var(--space-10) 0; }

.support-inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.support-inner .eyebrow { justify-content: center; }

.support-inner h2.display { margin-top: var(--space-3); }

.support-inner .section-sub {
  margin-top: var(--space-4);
  margin-bottom: var(--space-8);
}

.gift-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
}

.gift-card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.gift-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: linear-gradient(145deg, #fde8e8, #fcd0d0);
  color: #e05050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gift-card-title {
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.gift-card-sub {
  font-size: var(--text-sm);
  color: var(--ink-secondary);
  margin-top: 2px;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

@media (max-width: 600px) {
  .amount-grid { grid-template-columns: repeat(2, 1fr); }
}

.amount-btn {
  background: var(--surface-2);
  border: 1.5px solid var(--line);
  border-radius: var(--radius-md);
  padding: 14px 12px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--ink);
  transition: border-color 0.25s var(--ease), background 0.25s var(--ease), color 0.25s var(--ease), transform 0.25s var(--ease);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.amount-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  transform: translateY(-2px);
}

.amount-btn.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}

.amount-btn .amount-label {
  font-size: var(--text-xs);
  font-family: var(--font-sans);
  color: var(--ink-tertiary);
  font-weight: 400;
  margin-top: 2px;
}

.amount-btn.selected .amount-label { color: var(--accent); }

.custom-amount-wrap {
  position: relative;
  margin-bottom: var(--space-6);
}

.custom-amount-prefix {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--ink-tertiary);
  pointer-events: none;
}

.custom-amount-input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--ink);
  padding: 14px 16px 14px 56px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--line);
  background: var(--surface);
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
  box-sizing: border-box;
}

.custom-amount-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.custom-amount-input::placeholder { color: var(--ink-tertiary); font-weight: 400; }

.btn-support {
  width: 100%;
  justify-content: center;
  font-size: var(--text-base);
  padding: 16px 28px;
  background: linear-gradient(135deg, var(--accent), #0a5b53);
  color: #fff;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), opacity 0.35s var(--ease);
  box-shadow: 0 4px 16px rgba(15,122,110,0.28);
}

.btn-support:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15,122,110,0.38);
}

.btn-support:active { transform: translateY(0); }

.support-note {
  margin-top: var(--space-5);
  font-size: var(--text-xs);
  color: var(--ink-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--font-mono);
}

.support-perks {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin-top: var(--space-8);
}

.support-perk {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--ink-secondary);
}

.support-perk-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

/* ---------------------------------------------------------------------- */
/* Footer                                                                   */
/* ---------------------------------------------------------------------- */

.footer {
  border-top: 1px solid var(--line);
  padding: var(--space-6) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer-copy { font-size: var(--text-xs); color: var(--ink-tertiary); }

.footer-socials { display: flex; gap: var(--space-5); }

.footer-socials a { color: var(--ink-tertiary); transition: color 0.3s var(--ease); display: flex; }
.footer-socials a:hover { color: var(--ink); }

/* ---------------------------------------------------------------------- */
/* Oasis CNST Support — nav pill, section, footer                          */
/* ---------------------------------------------------------------------- */

/* Nav pill */
.btn-oasis {
  background: var(--accent-soft);
  color: var(--accent);
  border: 1.5px solid rgba(15,122,110,0.28);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 9px 18px;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  white-space: nowrap;
  font-family: inherit;
  transition: background 0.32s var(--ease), color 0.32s var(--ease),
              border-color 0.32s var(--ease), transform 0.32s var(--ease),
              box-shadow 0.32s var(--ease);
}

.btn-oasis:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15,122,110,0.28);
}

.btn-oasis:active { transform: translateY(0); }

.nav-oasis { display: none; }

@media (min-width: 760px) {
  .nav-oasis { display: inline-flex; }
}

/* Mobile menu Oasis entry */
.mobile-menu-oasis {
  font-size: var(--text-2xl);
  font-weight: 700;
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-align: left;
}

/* Section */
.oasis-support-section { padding: var(--space-10) 0; }

.oasis-support-card {
  background: var(--accent-soft);
  border: 1px solid rgba(15,122,110,0.18);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  gap: var(--space-9);
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

/* Decorative background circle */
.oasis-support-card::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(15,122,110,0.07);
  pointer-events: none;
}

.oasis-support-card::after {
  content: '';
  position: absolute;
  bottom: -100px;
  right: 160px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(15,122,110,0.04);
  pointer-events: none;
}

@media (max-width: 900px) {
  .oasis-support-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-7);
  }
}

.oasis-support-text {
  flex: 1;
  min-width: 0;
  max-width: 560px;
  position: relative;
  z-index: 1;
}

.oasis-support-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.018em;
  color: var(--ink);
  margin-top: var(--space-3);
  line-height: 1.1;
}

.oasis-support-desc {
  font-size: var(--text-base);
  color: var(--ink-secondary);
  line-height: 1.72;
  margin-top: var(--space-4);
}

.oasis-support-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-5);
  margin-top: var(--space-6);
}

.btn-oasis-cta {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: 700;
  padding: 14px 26px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(15,122,110,0.3);
  transition: background 0.35s var(--ease), transform 0.35s var(--ease),
              box-shadow 0.35s var(--ease);
}

.btn-oasis-cta:hover {
  background: #0a5b53;
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(15,122,110,0.38);
}

.btn-oasis-cta:active { transform: translateY(0); }

/* Feature pill cluster */
.oasis-feature-pills {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .oasis-feature-pills {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.oasis-feature-pill {
  background: rgba(15,122,110,0.09);
  color: var(--accent);
  border: 1px solid rgba(15,122,110,0.2);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 7px 15px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* Footer support button */
.footer-oasis-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--accent);
  background: none;
  border: 1.5px solid rgba(15,122,110,0.3);
  border-radius: var(--radius-full);
  padding: 7px 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s var(--ease), color 0.3s var(--ease),
              border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.footer-oasis-btn:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  transform: translateY(-1px);
}

.footer-oasis-btn:active { transform: translateY(0); }

/* ---------------------------------------------------------------------- */
/* Scroll reveal                                                            */
/* ---------------------------------------------------------------------- */

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .stat-card, .status-dot.live {
    animation: none !important;
  }
}
`;

/* ---------------------------------------------------------------------- */
/* Analytics helper                                                         */
/* ---------------------------------------------------------------------- */

function trackEvent(eventName, params) {
  try {
    var p = Object.assign({ event_category: "oasis_cnst" }, params || {});
    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, p);
      } else if (typeof window.plausible === "function") {
        window.plausible(eventName, { props: p });
      }
    }
  } catch (e) {}
}

/* ---------------------------------------------------------------------- */
/* Scroll-reveal hook + wrapper                                             */
/* ---------------------------------------------------------------------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Data                                                                     */
/* ---------------------------------------------------------------------- */

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
];

const DEV_SKILLS = [
  "JavaScript (ES6+)",
  "React",
  "Firebase",
  "Appwrite",
  "Progressive Web Apps",
  "Service Workers",
  "Chart.js",
  "REST APIs",
];

const CLINICAL_SKILLS = [
  "Nutrition Care Process",
  "ADIME Documentation",
  "Nutrition Screening",
  "Anthropometry & NFPE",
  "Enteral & Parenteral Nutrition",
  "Drug–Nutrient Interactions",
  "Evidence-Based Practice",
];

const TOOLS = [
  "Git & GitHub",
  "VS Code",
  "Firebase Console",
  "Appwrite Console",
  "Vite",
  "Figma (basics)",
];

const TIMELINE = [
  {
    year: "2021",
    title: "BSc Nutrition & Dietetics (Honours) begins",
    desc: "Joined the pioneer cohort at Kamuzu University of Health Sciences (KUHeS) in Blantyre, Malawi.",
  },
  {
    year: "2025",
    title: "Started building software",
    desc: "Taught myself JavaScript and web development, building tools to solve real problems in clinical settings.",
  },
  {
    year: "2024–2026",
    title: "Designed and built Oasis CNST",
    desc: "Built a full offline-first clinical nutrition system over roughly three months and have continued developing it since — covering 11+ clinical modules, a localised Malawian food database, and AI-assisted documentation.",
  },
];

/* ---------------------------------------------------------------------- */
/* Components                                                               */
/* ---------------------------------------------------------------------- */

function Nav({ active, scrolled, menuOpen, setMenuOpen }) {
  function handleOasisNav(location) {
    trackEvent("oasis_support_click", { location: location });
    window.open(OASIS_SUPPORT_URL, "_blank", "noreferrer,noopener");
  }

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <span className="logo-mark">ET</span>
            Edison Taimu
          </a>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${active === item.id ? "active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="btn-oasis nav-oasis"
            onClick={function() { handleOasisNav("nav"); }}
            aria-label="Support Oasis CNST — opens in new tab"
          >
            <Heart size={13} />
            Support Oasis CNST
          </button>

          <a href="#contact" className="btn btn-primary btn-sm nav-cta">
            Get in touch
          </a>

          <button
            className="menu-toggle"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <button
          className="mobile-menu-oasis"
          onClick={function() {
            setMenuOpen(false);
            handleOasisNav("mobile_nav");
          }}
          aria-label="Support Oasis CNST — opens in new tab"
        >
          <Heart size={22} />
          Support Oasis
        </button>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Get in touch
        </a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-top">
            <span className="avatar" aria-hidden="true">ET</span>
            <span className="eyebrow">Software Developer · Zomba, Malawi</span>
          </div>

          <h1 className="display">
            I build software that helps clinicians do their jobs better.
          </h1>

          <p className="lead">
            I'm Edison Taimu — a self-taught developer and BSc Nutrition &amp; Dietetics
            graduate from Kamuzu University of Health Sciences. I design and build
            clinical software for healthcare settings where dependable tools are hard
            to come by.
          </p>

          <div className="cta-row">
            <a href="#contact" className="btn btn-primary">
              Get in touch <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View my work
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="stat-card">
            <span className="stat-icon"><Layers size={20} /></span>
            <div>
              <div className="stat-value">11+ clinical modules</div>
              <div className="stat-label">OASIS CNST</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><WifiOff size={20} /></span>
            <div>
              <div className="stat-value">Offline-first</div>
              <div className="stat-label">LOW-RESOURCE READY</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><Brain size={20} /></span>
            <div>
              <div className="stat-value">AI-assisted NCP</div>
              <div className="stat-label">DOCUMENTATION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About</span>
          <h2 className="display">From clinical practice to clinical software.</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-text">
            <p>
              My path started in clinical nutrition, not computer science. During my
              dietetics training at KUHeS, I kept running into the same problem: the
              tools clinicians need — for nutrition screening, documentation, and care
              planning — either didn't exist for our setting, or assumed a level of
              connectivity most facilities don't have.
            </p>
            <p>
              So I taught myself to build them. Over roughly three months, learning
              JavaScript, Firebase, and Appwrite from scratch, I built{" "}
              <strong>Oasis CNST</strong> — a clinical nutrition system designed to
              work offline, in the places that need it most.
            </p>
            <p>
              I'm finishing my BSc in Nutrition &amp; Dietetics (graduating August 2026)
              while continuing to develop Oasis CNST. Long-term, I want to keep working
              at the intersection of clinical practice and health technology — building
              tools that make good care easier to deliver, not harder.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="fact-card">
              <div className="fact-row">
                <span className="fact-label">Location</span>
                <span className="fact-value">Zomba, Malawi</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Education</span>
                <span className="fact-value">BSc Nutrition &amp; Dietetics (Hons), KUHeS</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Focus</span>
                <span className="fact-value">Clinical Nutrition × Health Tech</span>
              </div>
              <div className="fact-row">
                <span className="fact-label">Currently</span>
                <span className="fact-value">Building Oasis CNST</span>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Skills</span>
          <h2 className="display">What I work with.</h2>
        </Reveal>

        <div className="skills-grid">
          <Reveal>
            <div className="skill-card">
              <span className="skill-card-icon"><Code2 size={22} /></span>
              <h3>Development</h3>
              <p>
                Building fast, offline-capable web apps with vanilla JS and React,
                backed by Firebase and Appwrite.
              </p>
              <div className="chip-row">
                {DEV_SKILLS.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="skill-card">
              <span className="skill-card-icon"><Stethoscope size={22} /></span>
              <h3>Clinical &amp; Healthcare</h3>
              <p>
                Grounded in evidence-based dietetic practice, from screening through
                to documentation and care planning.
              </p>
              <div className="chip-row">
                {CLINICAL_SKILLS.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="skill-card">
              <span className="skill-card-icon"><Wrench size={22} /></span>
              <h3>Tools</h3>
              <p>
                The everyday toolkit I use to plan, build, and ship.
              </p>
              <div className="chip-row">
                {TOOLS.map((tool) => (
                  <span key={tool} className="chip">{tool}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Featured Work</span>
          <h2 className="display">Things I've built.</h2>
        </Reveal>

        <Reveal>
          <div className="project-card">
            <div className="project-visual" aria-hidden="true">
              <span>oasiscnst.app</span>
            </div>
            <div>
              <span className="status">
                <span className="status-dot live"></span> Live
              </span>
              <h3 className="project-title">Oasis CNST</h3>
              <p className="project-desc">
                A clinical nutrition system that works offline. Oasis covers 11+
                modules — adult and pediatric nutrition, burns, enteral and
                parenteral support, validated screening tools, and AI-assisted
                Nutrition Care Process documentation — built for clinical settings
                in Malawi with a localised food composition database and
                offline-first architecture from the ground up.
              </p>
              <div className="chip-row">
                <span className="chip">JavaScript</span>
                <span className="chip">Firebase</span>
                <span className="chip">Appwrite</span>
                <span className="chip">Service Workers</span>
                <span className="chip">Chart.js</span>
              </div>
              <div className="project-links">
                <a
                  href="https://oasiscnst.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Visit live site <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="project-cta">
            <div>
              <h3>More on GitHub</h3>
              <p>Smaller experiments, in-progress work, and code samples.</p>
            </div>
            <a
              href="https://github.com/edisontaimu9-ui"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
            >
              Visit profile <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="display">Where I've been.</h2>
        </Reveal>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 100}>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-title">{item.title}</div>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const OASIS_FEATURES = [
  "Nutrition Calculators",
  "Screening Tools",
  "Clinical Decision Support",
  "Drug–Nutrient Interactions",
  "Nutrition Resources",
  "AI-Assisted NCP",
];

const OASIS_SUPPORT_URL = "https://oasiscnst.app/support";

function OasisSupportSection() {
  function handleClick(location) {
    trackEvent("oasis_support_click", { location: location });
    window.open(OASIS_SUPPORT_URL, "_blank", "noreferrer,noopener");
  }

  return (
    <section id="oasis-cnst" className="oasis-support-section">
      <div className="container">
        <Reveal>
          <div className="oasis-support-card">
            <div className="oasis-support-text">
              <span className="eyebrow">Clinical Nutrition Tool</span>
              <h2 className="oasis-support-heading">Support Oasis CNST</h2>
              <p className="oasis-support-desc">
                Support the continued development of Oasis CNST, a platform
                designed to simplify clinical nutrition practice through
                calculators, screening tools, clinical decision support, and
                nutrition resources.
              </p>
              <div className="oasis-support-actions">
                <button
                  className="btn-oasis-cta"
                  onClick={function() { handleClick("section"); }}
                  aria-label="Support Oasis CNST — opens in new tab"
                >
                  <Heart size={16} />
                  Support Oasis CNST
                  <ExternalLink size={15} />
                </button>
                <a
                  href="https://oasiscnst.app"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-link"
                >
                  Visit the app <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="oasis-feature-pills" aria-hidden="true">
              {OASIS_FEATURES.map(function(feature) {
                return (
                  <span key={feature} className="oasis-feature-pill">
                    {feature}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const PRESET_AMOUNTS = [
  { value: 2000,  label: "Coffee ☕" },
  { value: 5000,  label: "Snack 🥪" },
  { value: 10000, label: "Meal 🍱" },
  { value: 20000, label: "Legend 🏆" },
];

function Support() {
  const [selected, setSelected] = useState(2000);
  const [custom, setCustom] = useState("");

  var effectiveAmount = custom !== "" ? parseInt(custom, 10) || 0 : selected;

  function handleCustomChange(e) {
    var val = e.target.value.replace(/\D/g, "");
    setCustom(val);
    if (val) setSelected(null);
  }

  function handlePreset(value) {
    setSelected(value);
    setCustom("");
  }

  function handleSupport(e) {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 100) return;

    // ─── TODO: Paychangu integration ──────────────────────────────────────
    // Replace this block with your Paychangu checkout call, e.g.:
    //
    // fetch("https://api.paychangu.com/payment", {
    //   method: "POST",
    //   headers: { "Authorization": "Bearer YOUR_SECRET_KEY", "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     amount: effectiveAmount,
    //     currency: "MWK",
    //     email: "donor@example.com",      // collect via a field if needed
    //     first_name: "Supporter",
    //     last_name: "",
    //     callback_url: "https://yoursite.com/support/thanks",
    //     return_url:   "https://yoursite.com/support/thanks",
    //     tx_ref: "support-" + Date.now(),
    //     title: "Support Edison Taimu",
    //     description: "Supporting Oasis CNST development",
    //   }),
    // })
    // .then(r => r.json())
    // .then(data => { window.location.href = data.data.checkout_url; });
    // ─────────────────────────────────────────────────────────────────────

    alert("Paychangu checkout coming soon! Amount selected: MK " + effectiveAmount.toLocaleString());
  }

  return (
    <section id="support" className="support-section">
      <div className="container">
        <Reveal className="support-inner">
          <span className="eyebrow">Support</span>
          <h2 className="display">Buy me a gift card.</h2>
          <p className="section-sub">
            Oasis CNST is free for clinicians in Malawi. If my work has been useful to you
            — or you just want to help keep it going — a small contribution goes a long way.
          </p>

          <div className="gift-card">
            <div className="gift-card-header">
              <span className="gift-icon">
                <Heart size={24} />
              </span>
              <div>
                <div className="gift-card-title">One-time support</div>
                <div className="gift-card-sub">Secure checkout via Paychangu</div>
              </div>
            </div>

            <form onSubmit={handleSupport}>
              <div className="amount-grid">
                {PRESET_AMOUNTS.map(function(preset) {
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      className={"amount-btn" + (selected === preset.value && custom === "" ? " selected" : "")}
                      onClick={function() { handlePreset(preset.value); }}
                    >
                      MK {preset.value.toLocaleString()}
                      <span className="amount-label">{preset.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="custom-amount-wrap">
                <span className="custom-amount-prefix">MK</span>
                <input
                  className="custom-amount-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter custom amount"
                  value={custom}
                  onChange={handleCustomChange}
                  aria-label="Custom amount in Malawian Kwacha"
                />
              </div>

              <button type="submit" className="btn-support">
                <Sparkles size={18} />
                Support with MK {effectiveAmount > 0 ? effectiveAmount.toLocaleString() : "—"}
                <Heart size={16} />
              </button>
            </form>

            <p className="support-note">
              🔒 &nbsp;Payments processed securely via Paychangu · MWK only
            </p>
          </div>

          <div className="support-perks">
            <span className="support-perk">
              <span className="support-perk-dot"></span>
              Keeps Oasis CNST free for clinicians
            </span>
            <span className="support-perk">
              <span className="support-perk-dot"></span>
              Funds server &amp; API costs
            </span>
            <span className="support-perk">
              <span className="support-perk-dot"></span>
              One-time, no subscription
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:edisontaimu9@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="display">Let's build something.</h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-text">
            <p>
              Open to roles and collaborations in clinical nutrition, digital health,
              and software development — or just a conversation about building
              software for healthcare in low-resource settings.
            </p>
            <a href="mailto:edisontaimu9@gmail.com" className="contact-email">
              <Mail size={20} /> edisontaimu9@gmail.com
            </a>
            <div className="contact-links">
              <a
                href="https://x.com/edisontaimu"
                target="_blank"
                rel="noreferrer"
                className="icon-link"
                aria-label="X / Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/edison-taimu-a37415367"
                target="_blank"
                rel="noreferrer"
                className="icon-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/Edison.Taimu"
                target="_blank"
                rel="noreferrer"
                className="icon-link"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/265998706971"
                target="_blank"
                rel="noreferrer"
                className="icon-link"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to build?"
                />
              </div>
              <div className="form-foot">
                <button type="submit" className="btn btn-primary">
                  Send message <ArrowRight size={16} />
                </button>
                <span className="form-note">Opens your email client</span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  function handleOasisFooter() {
    trackEvent("oasis_support_click", { location: "footer" });
    window.open(OASIS_SUPPORT_URL, "_blank", "noreferrer,noopener");
  }

  return (
    <footer className="footer container">
      <span className="footer-copy">© 2026 Edison Taimu. Built with React.</span>

      <button
        className="footer-oasis-btn"
        onClick={handleOasisFooter}
        aria-label="Support Oasis CNST — opens in new tab"
      >
        <Heart size={13} />
        Support Oasis CNST
        <ExternalLink size={12} />
      </button>

      <div className="footer-socials">
        <a href="https://x.com/edisontaimu" target="_blank" rel="noreferrer" aria-label="X / Twitter">
          <Twitter size={18} />
        </a>
        <a href="https://www.linkedin.com/in/edison-taimu-a37415367" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="https://www.facebook.com/Edison.Taimu" target="_blank" rel="noreferrer" aria-label="Facebook">
          <Facebook size={18} />
        </a>
        <a href="https://wa.me/265998706971" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <Phone size={18} />
        </a>
        <a href="mailto:edisontaimu9@gmail.com" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* App                                                                      */
/* ---------------------------------------------------------------------- */

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "experience", "oasis-cnst", "support", "contact"];
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="portfolio">
      <style>{css}</style>
      <Nav active={active} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <OasisSupportSection />
      <Support />
      <Contact />
      <Footer />
    </div>
  );
}

// ─── Mount ───────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
