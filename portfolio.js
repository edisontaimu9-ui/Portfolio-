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
