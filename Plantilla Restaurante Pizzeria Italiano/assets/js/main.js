const navLinks = [
  { href: "index.html", label: "Home" },
  { href: "carta.html", label: "Carta" },
  { href: "nosotros.html", label: "Nosotros" },
  { href: "locales.html", label: "Locales" },
  { href: "reservas.html", label: "Reservas" },
  { href: "pedidos.html", label: "Pedidos" },
  { href: "promociones.html", label: "Promos" },
  { href: "club.html", label: "Club" },
  { href: "contacto.html", label: "Contacto" },
  { href: "faq.html", label: "FAQ" }
];

function currentFile() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

function isCurrent(href) {
  const page = currentFile();
  if (page === "" && href === "index.html") {
    return true;
  }
  return page === href;
}

function headerTemplate() {
  const links = navLinks
    .map(
      (link) =>
        `<a href="${link.href}" class="${isCurrent(link.href) ? "active" : ""}">${link.label}</a>`
    )
    .join("");

  return `
    <div class="nav-wrap">
      <a class="brand" href="index.html" aria-label="Santo Impasto inicio">
        <span class="brand-badge" aria-hidden="true"></span>
        <span class="brand-text">Santo Impasto</span>
      </a>
      <nav class="main-nav" aria-label="Navegacion principal">${links}</nav>
      <div class="nav-cta">
        <button class="btn btn-primary" data-open-reserva="true">Reserva ya</button>
        <button class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="Abrir menu">
          <span class="menu-lines" aria-hidden="true"></span>
          <span class="menu-pizza" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div class="mobile-overlay" id="mobile-overlay"></div>
    <aside class="mobile-drawer" id="mobile-drawer" aria-label="Menu movil">
      <button class="btn btn-ghost" id="mobile-close">Cerrar</button>
      ${links}
      <button class="btn btn-primary" data-open-reserva="true">Reserva ya</button>
      <a class="btn btn-secondary" href="pedidos.html">Pide ahora</a>
    </aside>
  `;
}

function footerTemplate() {
  return `
    <div class="footer-inner">
      <section>
        <h3>Santo Impasto</h3>
        <p>Masa lenta, horno encendido y barrio con hambre feliz.</p>
        <div class="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
          <a href="https://wa.me/34910555870" target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a>
        </div>
      </section>
      <section>
        <h4>Menu</h4>
        <p><a href="carta.html">Carta</a></p>
        <p><a href="reservas.html">Reservas</a></p>
        <p><a href="pedidos.html">Pedidos</a></p>
        <p><a href="promociones.html">Promociones</a></p>
      </section>
      <section>
        <h4>Contacto</h4>
        <p>+34 910 555 870</p>
        <p>ciao@santoimpasto.es</p>
        <p>L-D 13:00-16:30 | 20:00-00:00</p>
        <p><a href="legal-aviso.html">Aviso legal</a></p>
        <p><a href="legal-privacidad.html">Privacidad</a></p>
        <p><button id="footer-cookies" class="btn btn-ghost">Cookies</button></p>
      </section>
    </div>
    <div class="footer-bottom">© <span id="year"></span> Santo Impasto. Alla salute.</div>
  `;
}

function uiShell() {
  const cookieAccepted = localStorage.getItem("si-cookies");
  const bannerClass = cookieAccepted ? "cookie-banner" : "cookie-banner show";

  return `
    <div class="sticky-mobile-cta" role="region" aria-label="Acciones rapidas">
      <a class="btn btn-primary" href="pedidos.html">Pedir ahora</a>
      <button class="btn btn-secondary" data-open-reserva="true">Reservar</button>
    </div>

    <div class="modal" id="reserva-modal" aria-hidden="true">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center;">
          <h3>Reserva en 20 segundos</h3>
          <button class="btn btn-ghost" id="reserva-close">Cerrar</button>
        </div>
        <p class="small">Tu mesa te espera caliente. Sin llamadas y sin dramas.</p>
        <form id="quick-booking" class="form-grid">
          <div>
            <label for="qb-local">Local</label>
            <select id="qb-local" required>
              <option value="">Selecciona</option>
              <option>Chamberi</option>
              <option>Salamanca</option>
              <option>La Latina</option>
            </select>
          </div>
          <div>
            <label for="qb-date">Fecha</label>
            <input id="qb-date" type="date" required>
          </div>
          <div>
            <label for="qb-time">Hora</label>
            <input id="qb-time" type="time" required>
          </div>
          <div>
            <label for="qb-guests">Comensales</label>
            <input id="qb-guests" type="number" min="1" max="12" placeholder="2" required>
          </div>
          <div style="grid-column:1/-1;display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;">
            <button type="submit" class="btn btn-primary" id="quick-booking-btn">Confirmar reserva</button>
            <span class="small muted" id="quick-booking-msg"></span>
          </div>
        </form>
      </div>
    </div>

    <section class="${bannerClass}" id="cookie-banner" aria-live="polite">
      <strong>Cookies al dente</strong>
      <p class="small">Usamos cookies para mejorar tu experiencia, medir conversion y mostrar promos mas sabrosas.</p>
      <div class="cookie-actions">
        <button class="btn btn-primary" id="accept-cookies">Aceptar todo</button>
        <button class="btn btn-secondary" id="reject-cookies">Rechazar</button>
        <a class="btn btn-ghost" href="legal-cookies.html">Personalizar</a>
      </div>
    </section>
  `;
}

function bindHeaderEvents() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-close");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");

  if (!openBtn || !closeBtn || !drawer || !overlay) {
    return;
  }

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

function bindHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) {
    return;
  }

  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function bindRevealAnimations() {
  const elements = document.querySelectorAll(".hero, .section, .section-tight, .card, .local-card, .menu-item");

  if (!elements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  elements.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function bindModalEvents() {
  const modal = document.getElementById("reserva-modal");
  const closeBtn = document.getElementById("reserva-close");

  if (!modal || !closeBtn) {
    return;
  }

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-open-reserva='true']").forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  const quickForm = document.getElementById("quick-booking");
  const quickBtn = document.getElementById("quick-booking-btn");
  const quickMsg = document.getElementById("quick-booking-msg");

  if (quickForm && quickBtn && quickMsg) {
    quickForm.addEventListener("submit", (event) => {
      event.preventDefault();
      quickBtn.classList.add("loading");
      quickBtn.disabled = true;
      quickMsg.textContent = "Confirmando...";
      setTimeout(() => {
        quickBtn.classList.remove("loading");
        quickBtn.disabled = false;
        quickMsg.textContent = "Reserva enviada. Te confirmamos por WhatsApp en breve.";
        quickForm.reset();
      }, 1100);
    });
  }
}

function bindCookieEvents() {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("accept-cookies");
  const reject = document.getElementById("reject-cookies");
  const footerOpen = document.getElementById("footer-cookies");

  if (!banner || !accept || !reject) {
    return;
  }

  const close = (value) => {
    localStorage.setItem("si-cookies", value);
    banner.classList.remove("show");
  };

  accept.addEventListener("click", () => close("accepted"));
  reject.addEventListener("click", () => close("rejected"));

  if (footerOpen) {
    footerOpen.addEventListener("click", () => {
      banner.classList.add("show");
    });
  }
}

function bindFaqEvents() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const trigger = item.querySelector(".faq-q");
    if (!trigger) {
      return;
    }
    trigger.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

function bindGenericForms() {
  document.querySelectorAll("form[data-ui='async']").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit'], input[type='submit']");
      const feedback = form.querySelector("[data-role='feedback']");

      if (button) {
        button.classList.add("loading");
        button.disabled = true;
      }

      if (feedback) {
        feedback.textContent = "Enviando...";
      }

      setTimeout(() => {
        if (button) {
          button.classList.remove("loading");
          button.disabled = false;
        }
        if (feedback) {
          feedback.textContent = "Listo. Te respondemos muy pronto.";
        }
        form.reset();
      }, 1100);
    });
  });
}

function bindTestimonialSlider() {
  const track = document.querySelector("[data-slider='track']");
  const prev = document.querySelector("[data-slider='prev']");
  const next = document.querySelector("[data-slider='next']");

  if (!track || !prev || !next) {
    return;
  }

  const items = Array.from(track.children);
  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const step = (delta) => {
    index = (index + delta + items.length) % items.length;
    update();
  };

  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));

  setInterval(() => {
    step(1);
  }, 5500);
}

function bindYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function mountLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const shell = document.getElementById("ui-shell");

  if (header) {
    header.classList.add("site-header");
    header.innerHTML = headerTemplate();
  }

  if (footer) {
    footer.classList.add("site-footer");
    footer.innerHTML = footerTemplate();
  }

  if (shell) {
    shell.innerHTML = uiShell();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout();
  bindHeaderEvents();
  bindHeaderScroll();
  bindModalEvents();
  bindCookieEvents();
  bindFaqEvents();
  bindGenericForms();
  bindTestimonialSlider();
  bindRevealAnimations();
  bindYear();
});
