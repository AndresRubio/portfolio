// Progressive enhancement only — the page is fully usable without JS.

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.site-nav a');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach((section) => revealObserver.observe(section));

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach((section) => navObserver.observe(section));
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }
});
