/* ─── reservas.js ────────────────────────────── */
(function () {
  'use strict';

  function initReservaForm() {
    // Set min date to today
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
      const today = new Date().toISOString().split('T')[0];
      fechaInput.setAttribute('min', today);
    }

    // Personas picker
    const minusBtnEl = document.getElementById('personas-minus');
    const plusBtnEl  = document.getElementById('personas-plus');
    const countEl    = document.getElementById('personas-count');
    const hiddenEl   = document.getElementById('personas-hidden');

    if (minusBtnEl && plusBtnEl && countEl && hiddenEl) {
      let count = 2;
      const update = () => {
        countEl.textContent = count;
        hiddenEl.value = count;
        minusBtnEl.disabled = count <= 1;
        plusBtnEl.disabled = count >= 10;
      };
      minusBtnEl.addEventListener('click', () => { if (count > 1) { count--; update(); } });
      plusBtnEl.addEventListener('click',  () => { if (count < 10) { count++; update(); } });
      update();
    }

    // Prefill from URL param ?local=
    const params = new URLSearchParams(window.location.search);
    const localParam = params.get('local');
    if (localParam) {
      const localSelect = document.getElementById('local');
      if (localSelect) {
        const option = localSelect.querySelector(`option[value="${localParam}"]`);
        if (option) localSelect.value = localParam;
      }
    }

    // Form submission
    const form     = document.getElementById('reserva-form');
    const success  = document.getElementById('form-success');
    const submitBtn = document.getElementById('btn-reserva-submit');

    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      // Simulate API call
      setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
      }, 1200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReservaForm);
  } else {
    initReservaForm();
  }
})();
