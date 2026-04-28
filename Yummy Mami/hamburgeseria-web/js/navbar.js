document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');
  const scrollBtn = document.getElementById('scrollTop');

  // ── Mobile overlay
  const overlay = document.createElement('div');
  overlay.classList.add('mobile-overlay');
  document.body.appendChild(overlay);

  function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ── Sticky scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  // ── Active link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll to top
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Intersection Observer: fade-in animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // ── Keyboard: close menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
});
