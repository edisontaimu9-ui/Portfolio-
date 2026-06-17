/**
 * Portfolio.js
 * All interactive behaviour for edisontaimu9-ui.github.io
 *
 * Sections handled:
 *  - Nav scroll shadow
 *  - Active nav-link highlight (IntersectionObserver)
 *  - Mobile menu open / close
 *  - Scroll-reveal animation
 *  - Contact form → mailto handler
 *  - Typewriter hero
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────────────────
   Theme — light mode only (dark mode removed)
───────────────────────────────────────────────────────────────────────────── */
document.documentElement.setAttribute('data-theme', 'light');

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
   Nutrition & Dietetics Slideshow — auto-advances every 3.5 s
───────────────────────────────────────────────────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slideshow-dots .dot');
  if (!slides.length) return;

  let current = 0;
  const INTERVAL_MS = 3500;

  function goTo(index) {
    slides[current].classList.remove('slide--active');
    dots[current].classList.remove('dot--active');
    current = index % slides.length;
    slides[current].classList.add('slide--active');
    dots[current].classList.add('dot--active');
  }

  // Pause when tab is not visible to avoid background cycling
  let timer = setInterval(() => goTo(current + 1), INTERVAL_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => goTo(current + 1), INTERVAL_MS);
    }
  });
}());
