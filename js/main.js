// Mobile menu toggle logic for Astangu pages

document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  function openMenu() {
    mobileMenu.style.display = 'block';
    backdrop.style.display = 'block';
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
  }

  if (openBtn && closeBtn && mobileMenu && backdrop) {
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
  }

  // Ensure menu is closed by default
  closeMenu();

  // Mobile dropdown toggle for navigation
  document.querySelectorAll('[data-collapse-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const targetId = this.getAttribute('data-collapse-toggle');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.classList.toggle('hidden');
        const svg = this.querySelector('svg');
        if (svg) {
          svg.classList.toggle('rotate-180');
        }
      }
    });
  });
}); 