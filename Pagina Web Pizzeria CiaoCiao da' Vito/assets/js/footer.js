/* =============================================
   CIAOCIAO DA' VITO — Shared Footer
   ============================================= */

(function () {
  'use strict';

  function buildFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-logo-main">CiaoCiao <span>da' Vito</span></div>
            <div class="footer-logo-sub">Pizzería Artesanal</div>
            <p>Desde 1998, elaborando pizzas artesanales con masa madre de 72 horas y los mejores ingredientes mediterráneos.</p>
            <div class="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-icon" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener" class="social-icon" aria-label="TikTok">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.23 8.23 0 004.82 1.55V6.95a4.85 4.85 0 01-1.05-.26z"/>
                </svg>
              </a>
              <a href="https://google.com/maps" target="_blank" rel="noopener" class="social-icon" aria-label="Google Maps">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Menú rápido -->
          <div class="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="carta.html">Nuestra Carta</a></li>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="localizaciones.html">Dónde Estamos</a></li>
              <li><a href="pedidos.html">Pedir a Domicilio</a></li>
              <li><a href="reservas.html">Reservar Mesa</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>

          <!-- Contacto -->
          <div class="footer-col">
            <h4>Contacto</h4>
            <div class="footer-contact-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.56 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a href="tel:+34965123456">965 12 34 56</a>
            </div>
            <div class="footer-contact-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.56 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a href="tel:+34968007007">968 00 70 07</a>
            </div>
            <div class="footer-contact-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:hola@ciaociao.com">hola@ciaociao.com</a>
            </div>
            <div class="footer-contact-item" style="align-items:flex-start;">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-top:3px;">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Calle de la Pizza 14, <br>03001 Alicante</span>
            </div>
          </div>

          <!-- Horarios -->
          <div class="footer-col">
            <h4>Horarios</h4>
            <ul>
              <li><a href="#" style="cursor:default;">Lunes: Cerrado</a></li>
              <li><a href="#" style="cursor:default;">Martes – Jueves: 13–16h · 20–24h</a></li>
              <li><a href="#" style="cursor:default;">Viernes: 13–16h · 20–01h</a></li>
              <li><a href="#" style="cursor:default;">Sábado: 13–16h · 20–01h</a></li>
              <li><a href="#" style="cursor:default;">Domingo: 13–16h · 20–23h</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} CiaoCiao da' Vito Pizzería. Todos los derechos reservados.</p>
          <nav class="footer-legal" aria-label="Legal">
            <a href="cookies.html">Política de cookies</a>
            <a href="privacidad.html">Política de privacidad</a>
            <a href="legal.html">Aviso legal</a>
          </nav>
        </div>
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooter);
  } else {
    buildFooter();
  }
})();
