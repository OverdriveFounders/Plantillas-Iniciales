/* =============================================
   CIAOCIAO DA' VITO — Shared main.js
   Scroll reveal + utilities used on every page
   ============================================= */

(function () {
  'use strict';

  // ─── Scroll Reveal ───────────────────────────
  function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // ─── Smooth anchor links ──────────────────────
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 75;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ─── Page transition fade in ─────────────────
  function initPageFade() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') ||
          href.startsWith('mailto:') || href.startsWith('http')) return;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.href;
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = target; }, 350);
      });
    });
  }

  // ─── Counter animation ────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('es-ES');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  // ─── Init ─────────────────────────────────────
  function init() {
    initReveal();
    initSmoothAnchors();
    initCounters();
    // initPageFade(); // Enable for production page transitions
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
