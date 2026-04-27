/* ============================================================
   COMUTER – Header Component
   ============================================================ */
(function () {
  'use strict';

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  function a(p) { return page === p ? ' active' : ''; }

  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  /*
   * IMPORTANTE: NO usamos class="collapse" en #mainNav porque
   * Tailwind Play CDN intercepta esa clase y aplica
   * visibility:collapse, ocultando el menú en desktop.
   * El show/hide en móvil lo gestionamos nosotros con JS + CSS.
   */
  placeholder.innerHTML = `
    <a href="#main" class="skip-link">Saltar al contenido principal</a>
    <nav id="navbar" class="navbar navbar-expand-lg" role="navigation" aria-label="Navegación principal">
      <div class="container nav-container">

        <a class="navbar-brand nav-logo" href="index.html" aria-label="Comuter – Inicio">
          <img src="assets/images/LogoComuter.png"
               alt="Comuter Comunicaciones Deportivas"
               width="165" height="44">
        </a>

        <button class="nav-toggler" type="button"
          aria-expanded="false"
          aria-controls="mainNav"
          aria-label="Abrir menú de navegación">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <div id="mainNav">
          <ul id="navList">
            <li><a class="nav-link-item${a('index.html')}"        href="index.html">Inicio</a></li>
            <li><a class="nav-link-item${a('servicios.html')}"    href="servicios.html">Servicios</a></li>
            <li><a class="nav-link-item${a('equipamiento.html')}" href="equipamiento.html">Equipamiento</a></li>
            <li><a class="nav-link-item${a('contacto.html')}"     href="contacto.html">Contacto</a></li>
            <li class="nav-cta-item">
              <a class="nav-cta-btn" href="contacto.html">Solicitar Presupuesto</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>`;

  /* ── Scroll effect ── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Hamburguesa: toggle manual del menú móvil ── */
  const toggler  = document.querySelector('.nav-toggler');
  const mainNav  = document.getElementById('mainNav');

  function openMenu() {
    mainNav.classList.add('show');
    toggler.classList.add('open');
    toggler.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mainNav.classList.remove('show');
    toggler.classList.remove('open');
    toggler.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    mainNav.classList.contains('show') ? closeMenu() : openMenu();
  }

  toggler && toggler.addEventListener('click', toggleMenu);

  /* Cerrar al pulsar un enlace del menú */
  mainNav && mainNav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  /* Cerrar al pulsar fuera del menú */
  document.addEventListener('click', function (e) {
    if (mainNav && !navbar.contains(e.target)) closeMenu();
  });

})();
