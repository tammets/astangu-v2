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

}); 
