/**
 * Portfolio.js
 * All interactive behaviour for edisontaimu9-ui.github.io
 *
 * Sections handled:
 *  - Nav scroll shadow
 *  - Active nav-link highlight (IntersectionObserver)
 *  - Mobile menu open / close
 *  - Oasis CNST CTA buttons (nav, mobile, section, footer)
 *  - Scroll-reveal animation
 *  - Contact form → mailto handler
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────────────────
   Theme — dark / light mode
───────────────────────────────────────────────────────────────────────────── */
const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

// Apply immediately (before paint) to avoid flash
applyTheme(getPreferredTheme());

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
});

// Keep in sync if the user changes their OS preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   Config
───────────────────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────────────────
   Nav — scroll shadow
───────────────────────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load so state is correct without scrolling

/* ─────────────────────────────────────────────────────────────────────────────
   Nav — active link highlight
───────────────────────────────────────────────────────────────────────────── */
const navLinks   = document.querySelectorAll('.nav-link');
const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sectionEls.forEach(el => activeObs.observe(el));

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile menu — open / close
───────────────────────────────────────────────────────────────────────────── */
const mobileMenu = document.getElementById('mobile-menu');
const openBtn    = document.getElementById('menu-open');
const closeBtn   = document.getElementById('menu-close');

openBtn.addEventListener('click',  () => mobileMenu.classList.add('open'));
closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

// Close when any nav link inside the menu is tapped
mobileMenu.querySelectorAll('a.mobile-link').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ─────────────────────────────────────────────────────────────────────────────
   Scroll-reveal animation
   Elements marked `.reveal` fade + slide up when they enter the viewport
───────────────────────────────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ─────────────────────────────────────────────────────────────────────────────
   Contact form — mailto handler
───────────────────────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Portfolio inquiry from ' + (name || 'a visitor'));
    const body    = encodeURIComponent(
      message + '\n\n— ' + name + (email ? ' (' + email + ')' : '')
    );

    window.location.href = `mailto:edisontaimu9@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Typewriter hero — rotates phrases with a type / delete / pause cycle
───────────────────────────────────────────────────────────────────────────── */
(function () {
  const phrases = [
    'Evidence-based nutrition care — and the software I build to support it.',
    'Bridging clinical dietetics and digital health in low-resource settings.',
    'Building offline-first tools for nutrition care where it matters most.',
    'Aspiring clinical dietitian · self-taught developer · Zomba, Malawi.',
  ];

  const el = document.getElementById('typewriter-text');
  if (!el) return;

  // Respect prefers-reduced-motion: just show the first phrase statically
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  const TYPE_MS  = 38;   // ms per character typed
  const DEL_MS   = 18;   // ms per character deleted
  const PAUSE_MS = 2400; // pause at full phrase

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      // Typing forward
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        // Finished typing — pause then start deleting
        deleting = true;
        setTimeout(tick, PAUSE_MS);
        return;
      }
      setTimeout(tick, TYPE_MS);
    } else {
      // Deleting
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        // Finished deleting — move to next phrase
        deleting   = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 300); // tiny pause before typing starts
        return;
      }
      setTimeout(tick, DEL_MS);
    }
  }

  tick();
}());

/* ─────────────────────────────────────────────────────────────────────────────
   PREMIUM ENHANCEMENTS
───────────────────────────────────────────────────────────────────────────── */

/* ── Scroll progress bar ─────────────────────────────────── */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}());

/* ── Custom magnetic cursor ──────────────────────────────── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with lag
  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    rx = lerp(rx, mx, 0.14);
    ry = lerp(ry, my, 0.14);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(tick);
  }
  tick();

  // Hover state on interactive elements
  const hoverSelectors = 'a, button, .skill-card, .stat-card, .interest-card, .project-visual, .chip, .oasis-feature-pill';
  const textSelectors  = 'p, h1, h2, h3, .lead, .about-text, .timeline-desc';

  document.querySelectorAll(hoverSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.querySelectorAll(textSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
  });

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));
}());

/* ── Skill card spotlight (mouse-tracking glow) ──────────── */
(function () {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}());

/* ── Reveal — directional variants ──────────────────────── */
(function () {
  // Tag about-grid children for directional reveal
  const aboutGrid = document.querySelector('.about-grid');
  if (aboutGrid) {
    const children = aboutGrid.children;
    if (children[0]) { children[0].classList.add('reveal-left');  children[0].classList.remove('reveal'); }
    if (children[1]) { children[1].classList.add('reveal-right'); children[1].classList.remove('reveal'); }
  }

  const dirEls  = document.querySelectorAll('.reveal-left, .reveal-right');
  const dirObs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        dirObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  dirEls.forEach(el => dirObs.observe(el));
}());

/* ── Skill bars animated fill ───────────────────────────── */
(function () {
  // skill bar widths keyed by heading text content
  const barWidths = {
    'clinical nutrition'    : 92,
    'dietetics'             : 88,
    'nutrition assessment'  : 90,
    'critical care'         : 78,
    'community nutrition'   : 85,
    'software development'  : 80,
    'javascript'            : 75,
    'python'                : 68,
    'html / css'            : 82,
    'offline-first apps'    : 76,
    'ai-assisted tools'     : 72,
  };

  document.querySelectorAll('.skill-card').forEach(card => {
    const h3 = card.querySelector('h3');
    if (!h3) return;

    const track = document.createElement('div');
    track.className = 'skill-bar-track';
    const fill  = document.createElement('div');
    fill.className = 'skill-bar-fill';

    // Find the closest matching key
    const cardText = (h3.textContent + ' ' + (card.querySelector('p') || {textContent:''}).textContent).toLowerCase();
    let bestKey = '', bestScore = 0;
    Object.keys(barWidths).forEach(key => {
      if (cardText.includes(key) && key.length > bestScore) {
        bestScore = key.length;
        bestKey   = key;
      }
    });

    const pct = barWidths[bestKey] || 80;
    fill.style.setProperty('--bar-width', pct + '%');
    track.append(fill);
    card.append(track);

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Slight delay so reveal animation finishes first
        setTimeout(() => fill.classList.add('is-animated'), 300);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(card);
  });
}());

/* ── Footer observe ─────────────────────────────────────── */
(function () {
  const footer = document.querySelector('.footer-message');
  if (!footer) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      footer.classList.add('is-visible');
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(footer);
}());

/* ── Project card — subtle tilt on hover ────────────────── */
(function () {
  document.querySelectorAll('.project-visual').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateY(-4px) scale(1.01)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}());

/* ── Stat card — magnetic hover ─────────────────────────── */
(function () {
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translate(${dx * 5}px, ${dy * 5 - 6}px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}());

/* ── Button ripple on click ─────────────────────────────── */
(function () {
  document.querySelectorAll('.btn, .btn-oasis-cta, .btn-oasis').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Only for pointer events (not keyboard)
      if (e.detail === 0) return;

      const rect   = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${x}px; top: ${y}px;
        background: rgba(255,255,255,0.18);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple-out 0.55s var(--ease) forwards;
      `;

      // Ensure btn is relative
      const pos = getComputedStyle(btn).position;
      if (pos === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.append(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe if not already present
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-out { to { transform: scale(1); opacity: 0; } }`;
    document.head.append(s);
  }
}());

/* ── Stagger interest cards on reveal ────────────────────── */
(function () {
  const grid = document.querySelector('.interest-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.interest-card');
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }, i * 70);
      });
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  // Start hidden
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s var(--ease), transform 0.5s var(--ease)';
  });
  obs.observe(grid);
}());
