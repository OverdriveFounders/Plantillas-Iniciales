/* ============================================================
   COMUTER – Footer Component
   ============================================================ */
(function () {
  'use strict';

  const placeholder = document.getElementById('site-footer');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="site-footer" role="contentinfo" aria-label="Pie de página">
      <div class="container">
        <div class="row g-4 pb-4">
          <div class="col-lg-4 mb-2">
            <div class="footer-logo">
              <img src="assets/images/LogoComuter.png" alt="Comuter Comunicaciones Deportivas" width="158" height="42">
            </div>
            <p class="footer-about">Especialistas en comunicaciones para pruebas deportivas. Tecnología Motorola de última
              generación para garantizar la seguridad y coordinación en cada evento.</p>
            <div class="d-flex gap-2 mt-3">
              <a href="#" class="social-btn" aria-label="Facebook de Comuter"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
              <a href="#" class="social-btn" aria-label="Instagram de Comuter"><i class="fab fa-instagram" aria-hidden="true"></i></a>
              <a href="#" class="social-btn" aria-label="LinkedIn de Comuter"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
              <a href="#" class="social-btn" aria-label="YouTube de Comuter"><i class="fab fa-youtube" aria-hidden="true"></i></a>
            </div>
          </div>
          <div class="col-sm-6 col-lg-2">
            <p class="footer-heading">Navegación</p>
            <ul class="footer-links">
              <li><a href="index.html">Inicio</a></li>
              <li><a href="servicios.html">Servicios</a></li>
              <li><a href="equipamiento.html">Equipamiento</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div class="col-sm-6 col-lg-3">
            <p class="footer-heading">Servicios</p>
            <ul class="footer-links">
              <li><a href="servicios.html#ciclismo">Ciclismo</a></li>
              <li><a href="servicios.html#motociclismo">Motociclismo</a></li>
              <li><a href="servicios.html#automovilismo">Automovilismo</a></li>
              <li><a href="servicios.html#atletismo">Atletismo y Trail</a></li>
              <li><a href="servicios.html#montana">Deportes de Montaña</a></li>
              <li><a href="servicios.html">Otros Deportes...</a></li>
            </ul>
          </div>
          <div class="col-lg-3">
            <p class="footer-heading">Contacto</p>
            <ul class="footer-links">
              <li><a href="tel:+34666685818"><i class="fas fa-phone me-2" style="color:#3b82f6" aria-hidden="true"></i>+34 666 68 58 18</a></li>
              <li><a href="mailto:comunicaciones@comuter.es"><i class="fas fa-envelope me-2" style="color:#3b82f6" aria-hidden="true"></i>comunicaciones@comuter.es</a></li>
              <li><span><i class="fas fa-map-marker-alt me-2" style="color:#3b82f6" aria-hidden="true"></i>Cobertura nacional – España</span></li>
              <li><span><i class="fas fa-clock me-2" style="color:#3b82f6" aria-hidden="true"></i>Disponibilidad 24/7</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p class="footer-copy">© 2025 Comuter Comunicaciones Deportivas. Todos los derechos reservados.</p>
          <p class="footer-copy">Partner Oficial <strong style="color:rgba(255,255,255,.4)">Motorola Solutions</strong></p>
        </div>
      </div>
    </footer>`;

})();
