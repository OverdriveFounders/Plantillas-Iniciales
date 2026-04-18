/* ─── carta.js ──────────────────────────────── */
(function () {
  'use strict';

  function initMenuFilter() {
    const tabs = document.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.menu-category');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        // Update active tab
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (filter === 'all') {
          categories.forEach(cat => cat.classList.remove('hidden'));
          return;
        }

        categories.forEach(cat => {
          const catId = cat.id.replace('cat-', '');
          if (catId === filter) {
            cat.classList.remove('hidden');
          } else {
            // Also check individual card data-category
            const cards = cat.querySelectorAll(`[data-category~="${filter}"]`);
            if (cards.length > 0 && catId === filter) {
              cat.classList.remove('hidden');
            } else if (catId !== filter) {
              cat.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuFilter);
  } else {
    initMenuFilter();
  }
})();
