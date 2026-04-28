document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year dynamically
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight today's schedule row
  const days = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
  const today = days[new Date().getDay()];
  document.querySelectorAll('[data-day]').forEach(el => {
    if (el.dataset.day === today) el.classList.add('today');
  });

  // Toast helper exposed globally
  window.showToast = (msg, duration = 3000) => {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.classList.add('toast');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
  };
});
