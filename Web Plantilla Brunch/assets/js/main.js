/* ============================================================
   YUMMY MAMY – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navbar scroll ─────────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Smooth active nav link ─────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.ym-navbar .nav-link');

  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', activateLink, { passive: true });

  /* ─── Carta tabs ─────────────────────────────────────────── */
  const tabs = document.querySelectorAll('.ym-tab');
  const panels = document.querySelectorAll('.ym-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('panel-' + tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  /* ─── Scroll reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.ym-value-card, .ym-dish-card, .ym-review-card, .ym-exp-item, ' +
    '.ym-tl-item, .ym-contact-item, .ym-section-label, .ym-section-title'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('ym-reveal');
    el.classList.add(`ym-reveal-delay-${(i % 4) + 1}`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── Reserva form ───────────────────────────────────────── */
  const form = document.getElementById('reservaForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando…';

      setTimeout(() => {
        form.innerHTML = `
          <div class="ym-form-success" style="display:block;">
            <div class="success-icon">✅</div>
            <h4>¡Reserva recibida!</h4>
            <p>Te llamamos en breve para confirmar tu mesa.<br>
               Si prefieres llamar tú: <a href="tel:+34965000000" class="ym-link">965 000 000</a></p>
          </div>`;
      }, 1400);
    });
  }

  /* ─── Set min date for date input ───────────────────────── */
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  /* ─── Cookie banner ──────────────────────────────────────── */
  if (!localStorage.getItem('ym_cookie')) {
    const banner = document.createElement('div');
    banner.className = 'ym-cookie-banner';
    banner.innerHTML = `
      <p>Usamos cookies para mejorar tu experiencia.
         <a href="#">Más info</a></p>
      <div style="display:flex;gap:.6rem;flex-shrink:0">
        <button onclick="this.closest('.ym-cookie-banner').remove(); localStorage.setItem('ym_cookie','ok')"
          class="btn ym-btn-primary" style="padding:.45rem 1.1rem;font-size:.82rem;">
          Aceptar
        </button>
        <button onclick="this.closest('.ym-cookie-banner').remove(); localStorage.setItem('ym_cookie','ok')"
          class="btn ym-btn-outline-light" style="padding:.45rem 1rem;font-size:.82rem;border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.6)!important;">
          Rechazar
        </button>
      </div>`;
    document.body.appendChild(banner);
    setTimeout(() => banner.classList.add('show'), 800);
  }

  /* ─── WhatsApp float button ──────────────────────────────── */
  const wa = document.createElement('a');
  wa.className = 'ym-whatsapp-btn';
  wa.href = 'https://wa.me/34965000000?text=Hola%2C%20quiero%20reservar%20una%20mesa%20en%20Yummy%20Mamy';
  wa.target = '_blank';
  wa.setAttribute('aria-label', 'WhatsApp');
  wa.innerHTML = '<i class="bi bi-whatsapp"></i>';
  document.body.appendChild(wa);

  /* ─── Scroll to top ──────────────────────────────────────── */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'ym-scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
  scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ─── Gallery item hover effect ──────────────────────────── */
  document.querySelectorAll('.ym-gal-placeholder').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(0.97)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
    });
  });

  /* ─── Animated counter for rating ───────────────────────── */
  const scoreEl = document.querySelector('.big-score');
  if (scoreEl) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let count = 4.0;
          const target = 4.8;
          const step = () => {
            count = Math.min(count + 0.1, target);
            scoreEl.textContent = count.toFixed(1);
            if (count < target) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(scoreEl);
  }

  /* ─── Navbar close on mobile link click ──────────────────── */
  document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show')) {
        toggler && toggler.click();
      }
    });
  });

});
