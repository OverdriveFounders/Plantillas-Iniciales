const navWrap = document.querySelector('.nav-wrap');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navWrap) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navWrap.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const trigger = item.querySelector('.faq-question');
  if (!trigger) return;

  trigger.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      const openTrigger = openItem.querySelector('.faq-question');
      if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
    });

    if (!wasOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((block) => observer.observe(block));

const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
