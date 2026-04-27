/* ============================================================
   COMUTER – Main JavaScript
   ============================================================ */

'use strict';

/* ── Scroll reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Animated counters ── */
function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const suffix  = el.dataset.suffix || '';
  const duration = 2000;
  const start   = performance.now();

  (function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('es-ES') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  })(start);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item   = q.closest('.faq-item');
    const answer = item.querySelector('.faq-ans');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-ans').style.maxHeight = '0';
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ── Equipment filter tabs ── */
const filterTabs  = document.querySelectorAll('.filter-tab');
const filterItems = document.querySelectorAll('[data-category]');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    filterItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.display = match ? '' : 'none';
        if (match) {
          requestAnimationFrame(() => { item.style.opacity = '1'; });
        }
      }, 200);
    });
  });
});

/* ── Contact form ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      const ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.style.borderColor = ok ? '' : '#ef4444';
      if (!ok) valid = false;
    });

    if (!valid) return;

    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check me-2"></i>¡Solicitud enviada!';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1800);
  });

  form.querySelectorAll('[required]').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; });
  });
}

/* ── Smooth scroll for in-page anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Cerrar menú móvil al pulsar un enlace ── */
document.querySelectorAll('#mainNav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('mainNav');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});
