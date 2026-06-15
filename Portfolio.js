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


/* ─────────────────────────────────────────────────────────────────────────────
   Custom cursor — dot + trailing ring
───────────────────────────────────────────────────────────────────────────── */
(function () {
  // Only run on fine pointer (mouse) devices
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot snaps instantly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring lags behind — lerp each frame
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.14);
    ringY = lerp(ringY, mouseY, 0.14);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow on interactive elements
  const hoverTargets = 'a, button, [role="button"], label, .interest-card, .skill-card, .stat-card, .btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    }
  });
}());

/* ─────────────────────────────────────────────────────────────────────────────
   Floating particles — subtle dots drifting behind the hero
───────────────────────────────────────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COUNT = 38;
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Detect accent color from CSS variable
  function getAccent() {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim();
    return v || '#0f7a6e';
  }

  function makeParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 2.2 + 0.6,
      vx:   (Math.random() - 0.5) * 0.28,
      vy:   (Math.random() - 0.5) * 0.28,
      a:    Math.random() * 0.55 + 0.15,
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const accent = getAccent();
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.a;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
      if (p.y < -4) p.y = H + 4;
      if (p.y > H + 4) p.y = -4;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}());

/* ─────────────────────────────────────────────────────────────────────────────
   Animated number counters — count up when element enters viewport
───────────────────────────────────────────────────────────────────────────── */
(function () {
  const counterEls = document.querySelectorAll('.counter-value[data-target]');
  if (!counterEls.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600; // ms
    const start = performance.now();

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counterEls.forEach(el => {
    el.textContent = '0' + (el.dataset.suffix || '');
    obs.observe(el);
  });
}());
