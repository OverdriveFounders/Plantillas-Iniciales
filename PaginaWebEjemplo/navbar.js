/* =============================================
   DAVO & ADAM PIZZERÍA — Shared Navbar
   ============================================= */

(function () {
  'use strict';

  const NAV_LINKS = [
    { href: 'index.html',         label: 'Inicio' },
    { href: 'carta.html',         label: 'Carta' },
    { href: 'nosotros.html',      label: 'Nosotros' },
    { href: 'localizaciones.html',label: 'Dónde Estamos' },
    { href: 'pedidos.html',       label: 'Pedidos' },
    { href: 'contacto.html',      label: 'Contacto' },
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function buildNavbar() {
    const current = getCurrentPage();

    const linksHTML = NAV_LINKS.map(link => {
      const active = current === link.href ? ' active' : '';
      return `<a href="${link.href}" class="${active}">${link.label}</a>`;
    }).join('');

    const drawerLinksHTML = NAV_LINKS.map(link => {
      const active = current === link.href ? ' active' : '';
      return `<a href="${link.href}" class="${active}">${link.label}</a>`;
    }).join('');

    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    navbar.innerHTML = `
      <div class="container">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo" aria-label="Davo & Adam Pizzería - Inicio">
            <span class="nav-logo-main">Davo &amp; <span>Adam</span></span>
            <span class="nav-logo-sub">Pizzería Artesanal</span>
          </a>

          <nav class="nav-links" aria-label="Navegación principal">
            ${linksHTML}
          </nav>

          <div class="nav-cta">
            <a href="pedidos.html" class="btn btn-outline" style="padding:9px 18px;font-size:0.78rem;">Pedir ahora</a>
            <a href="reservas.html" class="btn btn-primary" aria-label="Reservar mesa">Reservar mesa</a>
            <button class="hamburger" id="hamburger-btn" aria-label="Abrir menú" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>

      <nav class="nav-drawer" id="nav-drawer" aria-label="Menú móvil" aria-hidden="true">
        ${drawerLinksHTML}
        <div class="drawer-cta">
          <a href="pedidos.html" class="btn btn-outline">Pedir ahora</a>
          <a href="reservas.html" class="btn btn-primary">Reservar</a>
        </div>
      </nav>
    `;

    // Scroll behaviour
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('nav-drawer');

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        drawer.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Ticker Banner ───────────────────────────
  function buildTicker() {
    const ticker = document.getElementById('ticker');
    if (!ticker) return;

    const messages = [
      '🍕 Masa madre fermentada 72 horas',
      '🔥 Horno de leña a 450°C',
      '🛵 Reparto a domicilio · Lunes–Domingo',
      '⭐ Pizzería del año 2024 · Guía Repsol',
      '🌿 Ingredientes 100% frescos y locales',
      '🎉 Reserva tu mesa ahora — sin esperas',
      '🍷 Carta de vinos artesanales seleccionados',
      '🤌 Receta napolitana auténtica desde 1998',
    ];

    const items = [...messages, ...messages]
      .map(msg => `<span class="ticker-item">${msg}<span class="ticker-dot"></span></span>`)
      .join('');

    ticker.innerHTML = `<div class="ticker-track">${items}</div>`;
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { buildNavbar(); buildTicker(); });
  } else {
    buildNavbar();
    buildTicker();
  }
})();
