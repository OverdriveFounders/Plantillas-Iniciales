/* ============================================================
   LA NAPOLETANA — script.js
   Animations, interactivity, scroll effects
   ============================================================ */

'use strict';

// ============================================================
// NAVBAR — scroll state & mobile menu
// ============================================================
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Scroll: add .scrolled class
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click (outside the menu)
    document.addEventListener('click', function (e) {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link highlight on scroll
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--clr-text)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(function (sec) { io.observe(sec); });
})();


// ============================================================
// REVEAL ON SCROLL — [data-reveal] elements
// ============================================================
(function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, idx) {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Stagger siblings
        const parent  = el.parentElement;
        const siblings = Array.from(parent.querySelectorAll('[data-reveal]'));
        const order    = siblings.indexOf(el);
        const delay    = order * 120;

        setTimeout(function () {
          el.classList.add('revealed');
        }, delay);

        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(function (el) { io.observe(el); });
})();


// ============================================================
// HERO PARTICLES
// ============================================================
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const COUNT = 22;

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    dot.className = 'particle';

    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const dur   = (Math.random() * 5 + 5).toFixed(2);
    const delay = (Math.random() * 8).toFixed(2);

    dot.style.cssText = [
      'width:'  + size + 'px',
      'height:' + size + 'px',
      'left:'   + left + '%',
      'top:'    + top  + '%',
      '--dur:'  + dur  + 's',
      '--delay:'+ delay + 's',
    ].join(';');

    container.appendChild(dot);
  }
})();


// ============================================================
// TICKER — pause on hover
// ============================================================
(function initTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  const wrapper = track.closest('.ticker-wrapper');
  if (!wrapper) return;

  wrapper.addEventListener('mouseenter', function () {
    track.style.animationPlayState = 'paused';
  });
  wrapper.addEventListener('mouseleave', function () {
    track.style.animationPlayState  = 'running';
  });
})();


// ============================================================
// CARTA SLIDER
// ============================================================
(function initSlider() {
  const track    = document.getElementById('slider-track');
  const btnPrev  = document.getElementById('slider-prev');
  const btnNext  = document.getElementById('slider-next');
  const dotsWrap = document.getElementById('slider-dots');

  if (!track) return;

  const cards = track.querySelectorAll('.slide-card');
  const total = cards.length;
  let current = 0;

  // Build dots
  const dots = [];
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ir a pizza ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }

  function updateDots(idx) {
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const card   = cards[current];
    const offset = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    updateDots(current);
  }

  if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
  if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

  // Keyboard support
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Drag / swipe
  let startX = 0;
  let isDragging = false;

  track.addEventListener('pointerdown', function (e) {
    startX     = e.clientX;
    isDragging = true;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointerup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  });

  track.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    track.scrollLeft += (startX - e.clientX) * 0.05;
  });

  // Update dot on manual scroll
  let scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      let closest = 0;
      let minDist = Infinity;
      cards.forEach(function (card, i) {
        const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      current = closest;
      updateDots(current);
    }, 80);
  });

  // Auto-play
  let autoplay = setInterval(function () {
    goTo(current + 1 < total ? current + 1 : 0);
  }, 4500);

  track.addEventListener('pointerdown', function () { clearInterval(autoplay); });
})();


// ============================================================
// SMOOTH ANCHOR SCROLL (offset for fixed navbar)
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


// ============================================================
// LOCATION CARDS — hover tilt effect
// ============================================================
(function initTiltCards() {
  const cards = document.querySelectorAll('.location-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      card.style.transform = 'perspective(600px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg) translateZ(4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();


// ============================================================
// CURSOR GLOW — subtle gold glow that follows cursor
// ============================================================
(function initCursorGlow() {
  // Only on large screens
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:400px',
    'height:400px',
    'border-radius:50%',
    'pointer-events:none',
    'z-index:9999',
    'background:radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
    'transform:translate(-50%,-50%)',
    'transition:opacity 0.3s ease',
    'will-change:transform',
  ].join(';');

  document.body.appendChild(glow);

  let mouseX = -999, mouseY = -999;
  let glowX  = -999, glowY  = -999;
  let raf;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('mouseleave', function () {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    glow.style.opacity = '1';
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.transform = 'translate(' + (glowX - 200) + 'px,' + (glowY - 200) + 'px)';
    raf = requestAnimationFrame(animate);
  }
  raf = requestAnimationFrame(animate);
})();


// ============================================================
// NUMBER COUNTER — history stats
// ============================================================
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  function animateCounter(el) {
    const text   = el.textContent.trim();
    const suffix = text.replace(/[\d.]/g, '');     // e.g. '+', 'h', '°'
    const rawNum = parseFloat(text);

    if (isNaN(rawNum)) return;

    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value    = rawNum < 10
        ? (eased * rawNum).toFixed(0)
        : Math.round(eased * rawNum);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(function (el) { io.observe(el); });
})();


// ============================================================
// FOOTER TICKER — reversed direction
// ============================================================
(function initFooterTicker() {
  const track = document.querySelector('.ticker-track-footer');
  if (!track) return;
  // CSS animation already handles this; just ensure it loops
})();


// ============================================================
// HERO PARALLAX — subtle on scroll
// ============================================================
(function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const scrollY = window.scrollY;
        const speed   = 0.25;
        heroBg.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ============================================================
// PEDIDO CARD — ripple effect on click
// ============================================================
(function initRipple() {
  const cards = document.querySelectorAll('.pedido-card');

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'left:'  + x        + 'px',
        'top:'   + y        + 'px',
        'width:0;height:0',
        'border-radius:50%',
        'background:rgba(201,168,76,0.18)',
        'transform:translate(-50%,-50%)',
        'pointer-events:none',
        'animation:ripple 0.6s ease-out forwards',
      ].join(';');

      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);

      setTimeout(function () { ripple.remove(); }, 700);
    });
  });

  // Inject ripple keyframes once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes ripple{to{width:300px;height:300px;opacity:0}}';
    document.head.appendChild(style);
  }
})();


// ============================================================
// INIT LOG
// ============================================================
console.log('%c🍕 La Napoletana — Pronto para servir', 'color:#C9A84C;font-size:14px;font-weight:bold;');
