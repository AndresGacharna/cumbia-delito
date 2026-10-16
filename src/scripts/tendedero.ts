// Clothesline: hauls the rope one photo forward every few seconds, in a
// quick tug that eases out, and lets the visitor drag it either way. The
// photos lean against each jerk.
const lines = document.querySelectorAll<HTMLElement>('[data-tendedero]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const line of lines) {
  const track = line.querySelector<HTMLElement>('[data-track]')!;
  const firstSet = track.firstElementChild as HTMLElement;

  let offset = 0; // px the rope has travelled
  let velocity = 0;
  let tug: { from: number; to: number; start: number } | null = null;
  let drag: { x: number; offset: number } | null = null;
  let paused = false;
  let lastTug = performance.now();
  let lastFrame = performance.now();
  let lastOffset = 0;

  const slot = (): number =>
    (firstSet.firstElementChild as HTMLElement | null)?.offsetWidth ?? 300;

  const render = (now: number): void => {
    const setWidth = firstSet.offsetWidth || 1;
    const wrapped = ((offset % setWidth) + setWidth) % setWidth;
    track.style.transform = `translateX(${-wrapped}px)`;

    const dt = Math.max(1, now - lastFrame);
    velocity = (offset - lastOffset) / dt;
    lastOffset = offset;
    lastFrame = now;
    const lean = Math.max(-9, Math.min(9, velocity * 9));
    track.style.setProperty('--lean', `${lean.toFixed(2)}deg`);
  };

  const frame = (now: number): void => {
    if (tug) {
      const t = Math.min(1, (now - tug.start) / 1100);
      // a hand-over-hand pull: sharp start, long ease out
      const e = 1 - Math.pow(1 - t, 3.2);
      offset = tug.from + (tug.to - tug.from) * e;
      if (t >= 1) {
        tug = null;
        lastTug = now;
      }
    } else if (!drag && !paused && !reducedMotion.matches && now - lastTug > 2600) {
      tug = { from: offset, to: offset + slot(), start: now };
    }
    render(now);
    requestAnimationFrame(frame);
  };

  // pause while someone is looking closely or using the keyboard
  line.addEventListener('pointerenter', () => (paused = true));
  line.addEventListener('pointerleave', () => {
    paused = false;
    lastTug = performance.now();
  });

  // pull the rope yourself
  line.addEventListener('pointerdown', (event) => {
    tug = null;
    drag = { x: event.clientX, offset };
    line.classList.add('is-dragging');
    line.setPointerCapture(event.pointerId);
  });
  line.addEventListener('pointermove', (event) => {
    if (!drag) return;
    offset = drag.offset - (event.clientX - drag.x);
  });
  const release = (): void => {
    if (!drag) return;
    drag = null;
    line.classList.remove('is-dragging');
    lastTug = performance.now();
  };
  line.addEventListener('pointerup', release);
  line.addEventListener('pointercancel', release);

  requestAnimationFrame(frame);
}

export {};
