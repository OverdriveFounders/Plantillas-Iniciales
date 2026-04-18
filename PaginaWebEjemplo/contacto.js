/* ─── contacto.js ────────────────────────────── */
(function () {
  'use strict';

  function initContactForm() {
    const form     = document.getElementById('contact-form');
    const success  = document.getElementById('contact-success');
    const submitBtn = document.getElementById('btn-contact-submit');

    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
      }, 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
