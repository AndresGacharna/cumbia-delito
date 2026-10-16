const mapEl = document.querySelector<HTMLElement>('[data-stage-map]');
const heroEl = document.querySelector<HTMLElement>('[data-stage-hero]');
const currentLabelEl =
  mapEl?.querySelector<HTMLElement>('[data-stage-current]') ?? null;
const leaderLineEl =
  mapEl?.querySelector<SVGLineElement>('[data-stage-leader]') ?? null;
const markLinks = Array.from(
  mapEl?.querySelectorAll<HTMLAnchorElement>('[data-stage-link]') ?? [],
);
const stageSections = Array.from(
  document.querySelectorAll<HTMLElement>('[data-stage]'),
);

if (mapEl && markLinks.length > 0) {
  const reducedMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  let activeId = '';
  let rafId = 0;

  const setLineEndpoints = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): void => {
    if (!leaderLineEl) return;
    leaderLineEl.setAttribute('x1', x1.toFixed(2));
    leaderLineEl.setAttribute('y1', y1.toFixed(2));
    leaderLineEl.setAttribute('x2', x2.toFixed(2));
    leaderLineEl.setAttribute('y2', y2.toFixed(2));
  };

  const animateLeaderTo = (targetX: number, targetY: number): void => {
    if (!leaderLineEl) return;
    const endX2 = 24;
    const endY2 = 98;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    if (reducedMotionQuery.matches || !mapEl.classList.contains('is-visible')) {
      setLineEndpoints(targetX, targetY, endX2, endY2);
      return;
    }

    const startX1 = Number(leaderLineEl.getAttribute('x1')) || targetX;
    const startY1 = Number(leaderLineEl.getAttribute('y1')) || targetY;
    const startX2 = Number(leaderLineEl.getAttribute('x2')) || endX2;
    const startY2 = Number(leaderLineEl.getAttribute('y2')) || endY2;
    const durationMs = 350;
    const startTime = performance.now();

    const step = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);

      setLineEndpoints(
        startX1 + (targetX - startX1) * eased,
        startY1 + (targetY - startY1) * eased,
        startX2 + (endX2 - startX2) * eased,
        startY2 + (endY2 - startY2) * eased,
      );

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = 0;
      }
    };

    rafId = requestAnimationFrame(step);
  };

  const activateSection = (stageId: string): void => {
    if (!stageId || stageId === activeId) return;
    const matchedLink = markLinks.find(
      (link) => link.dataset.stageLink === stageId,
    );
    if (!matchedLink) return;

    activeId = stageId;

    for (const link of markLinks) {
      const isCurrent = link === matchedLink;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }

    if (currentLabelEl && matchedLink.dataset.stageLabel) {
      currentLabelEl.textContent = matchedLink.dataset.stageLabel;
    }

    const x = Number(matchedLink.dataset.x);
    const y = Number(matchedLink.dataset.y);
    if (!Number.isNaN(x) && !Number.isNaN(y)) {
      animateLeaderTo(x, y);
    }
  };

  if (heroEl) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        mapEl.classList.toggle('is-visible', !entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    heroObserver.observe(heroEl);
  }

  const intersectingSections = new Set<HTMLElement>();

  const pickBestSection = (candidates: Iterable<HTMLElement>): HTMLElement | null => {
    const viewportCenter = window.innerHeight * 0.5;
    let best: HTMLElement | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const section of candidates) {
      const rect = section.getBoundingClientRect();
      const distance =
        rect.top <= viewportCenter && rect.bottom >= viewportCenter
          ? 0
          : Math.min(
              Math.abs(rect.top - viewportCenter),
              Math.abs(rect.bottom - viewportCenter),
            );
      if (distance < bestDistance) {
        bestDistance = distance;
        best = section;
      }
    }

    return best;
  };

  if (stageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            intersectingSections.add(el);
          } else {
            intersectingSections.delete(el);
          }
        }

        const candidate = pickBestSection(intersectingSections);
        if (candidate?.dataset.stage) {
          activateSection(candidate.dataset.stage);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    for (const section of stageSections) {
      sectionObserver.observe(section);
    }

    const initialSection = pickBestSection(stageSections) ?? stageSections[0];
    if (initialSection?.dataset.stage) {
      activateSection(initialSection.dataset.stage);
    }
  }

  for (const link of markLinks) {
    link.addEventListener('click', () => {
      if (link.dataset.stageLink) {
        activateSection(link.dataset.stageLink);
      }
    });
  }
}
