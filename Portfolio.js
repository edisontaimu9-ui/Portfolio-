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
