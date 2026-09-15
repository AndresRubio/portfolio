// Progressive enhancement only — the page is fully usable without JS.

function initScrollReveal(sections) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

  sections.forEach((section) => revealObserver.observe(section));
}

function initActiveNav(sections, navLinks) {
  const linkBySectionId = new Map();
  navLinks.forEach((l) => linkBySectionId.set(l.getAttribute('href').slice(1), l));

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((l) => {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });
      const link = linkBySectionId.get(entry.target.id);
      if (link) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach((section) => navObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.site-nav a');

  if ('IntersectionObserver' in window) {
    initScrollReveal(sections);
    initActiveNav(sections, navLinks);
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }
});
