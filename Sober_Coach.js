/**
 * Sober Coach — Allison Johnson
 * Sober_Coach.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav: add .scrolled class on scroll ── */
  const nav = document.querySelector('.nav');

  const updateNav = () => {
    if (window.scrollY > 60) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── Scroll-reveal animations ── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach((el) => {
    observer.observe(el);
  });


  /* ── Counter animation for stats band ── */
  const counters = document.querySelectorAll('[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.round(eased * target);
          el.textContent = current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => countObserver.observe(el));


  /* ── Smooth mobile nav toggle (placeholder) ── */
  const menuBtn = document.querySelector('.nav__menu-btn');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      mobileMenu.classList.toggle('is-open', !isOpen);
    });
  }


  /* ── Active nav link highlighting on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.4,
  });

  sections.forEach((s) => sectionObserver.observe(s));

});
