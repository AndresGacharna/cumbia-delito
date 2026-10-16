// Underlines the top-bar link for the part of the page being read.
const navGroups: Record<string, string> = {
  musica: 'musica',
  colaboraciones: 'musica',
  historia: 'trayectoria',
  show: 'show',
  trayectoria: 'trayectoria',
  organizadores: 'organizadores',
  contratacion: 'organizadores',
};

const navLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'),
);
const sections = Array.from(
  document.querySelectorAll<HTMLElement>('[data-stage]'),
);

const setActive = (group: string | undefined): void => {
  for (const link of navLinks) {
    if (group && link.dataset.navLink === group) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
};

if (navLinks.length > 0 && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).dataset.stage ?? '';
        setActive(navGroups[id]);
      }
    },
    // a thin line across the middle of the viewport
    { rootMargin: '-50% 0px -50% 0px' },
  );

  for (const section of sections) observer.observe(section);

  // Above the first section nothing is current.
  const hero = document.getElementById('top');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(undefined);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    ).observe(hero);
  }
}
