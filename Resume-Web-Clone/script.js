document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id], .hero');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
    });
  });

  const setActiveLink = () => {
    const currentSection = [...sections].reverse().find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 120;
    });

    navAnchors.forEach((link) => {
      const targetId = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', targetId === currentSection?.id);
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
