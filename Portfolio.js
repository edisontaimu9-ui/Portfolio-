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
   Config
───────────────────────────────────────────────────────────────────────────── */
const OASIS_URL = 'https://oasiscnst.app/support';

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
const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'oasis-cnst', 'contact'];
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
   Oasis CNST CTA buttons
   All open the support URL in a new tab; the mobile button also closes the menu
───────────────────────────────────────────────────────────────────────────── */
const oasisButtonIds = ['btn-oasis-nav', 'btn-oasis-mobile', 'btn-oasis-section', 'btn-oasis-footer'];

oasisButtonIds.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', () => {
    window.open(OASIS_URL, '_blank', 'noreferrer,noopener');
  });
});

// Also close the mobile menu when the in-menu Oasis button is tapped
const mobileOasisBtn = document.getElementById('btn-oasis-mobile');
if (mobileOasisBtn) {
  mobileOasisBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

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
