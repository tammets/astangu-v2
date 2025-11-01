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

  // Lesson accordion toggles on sample page
  document.querySelectorAll('[data-lesson-toggle]').forEach((button) => {
    const targetId = button.dataset.lessonToggle;
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const icon = button.querySelector('[data-lesson-icon]');
    const text = button.querySelector('[data-lesson-text]');

    button.addEventListener('click', () => {
      const isHidden = target.classList.contains('hidden');

      if (isHidden) {
        target.classList.remove('hidden');
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
        }
        if (text) {
          text.textContent = 'Peida';
        }
        button.setAttribute('aria-expanded', 'true');
      } else {
        target.classList.add('hidden');
        if (icon) {
          icon.style.transform = 'rotate(-90deg)';
        }
        if (text) {
          text.textContent = 'Vaata';
        }
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Ensure menu is closed by default
  closeMenu();

});
