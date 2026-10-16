// Trayectoria map: click a pin (or a place in the list) to see its name, and
// zoom between Latin America and Colombia by animating the SVG viewBox. A plane
// flies to each place the visitor picks: from Bogotá the first time, then from
// wherever it last landed. Towns too close to tap apart share a numbered
// marker that fans them out.
type Point = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };
type Mode = 'latam' | 'colombia';

const root = document.querySelector<HTMLElement>('[data-mapa]');

if (root) {
  const svg = root.querySelector<SVGSVGElement>('svg')!;
  const tag = root.querySelector<HTMLElement>('[data-mapa-tag]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-mapa-toggle]')!;
  const toggleLabel = root.querySelector<HTMLElement>('[data-mapa-toggle-label]')!;
  const pins = Array.from(root.querySelectorAll<HTMLElement>('[data-x]'));
  const named = pins.filter((pin) => pin.dataset.pin);
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-mapa-layer]'));
  const listButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-lugar]'),
  );
  const full: Box = JSON.parse(root.dataset.full ?? '{}');
  const focus: Box = JSON.parse(root.dataset.focus ?? '{}');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let view: Box = { ...full };
  let mode: Mode = 'latam';
  let active: HTMLElement | null = null;
  let frame = 0;

  const grupos = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-grupo]'));
  let openGroup: HTMLButtonElement | null = null;

  // ---- grouped towns ----
  const fan = (group: HTMLButtonElement | null): void => {
    openGroup = group;
    // while a group is fanned out, everything else steps back (still clickable)
    root.classList.toggle('has-fan', group !== null);
    for (const g of grupos) g.setAttribute('aria-expanded', String(g === group));
    for (const pin of named) {
      if (!pin.dataset.cluster) continue;
      pin.classList.remove('is-fanned');
      pin.style.removeProperty('--fx');
      pin.style.removeProperty('--fy');
    }
    if (!group) return;
    const members = named.filter((pin) => pin.dataset.cluster === group.dataset.grupo);
    // offsets are from each town's real spot to its seat on the ring round the hub
    const pxPerUnit = svg.clientWidth / view.w;
    const width = root.clientWidth;
    const radius = Math.min(64, width * 0.12);
    group.style.setProperty('--ring', `px`);
    const hubX = ((Number(group.dataset.x) - view.x) / view.w) * width;
    // spread over the upper half-circle, labels pointing outward
    const spread = Math.min(180, (members.length - 1) * 60);
    members.forEach((pin, index) => {
      const step = members.length > 1 ? spread / (members.length - 1) : 0;
      const angle = ((-90 - spread / 2 + index * step) * Math.PI) / 180;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
      // from the town's real spot to its seat on the ring round the hub
      const fx = (Number(group.dataset.x) - Number(pin.dataset.x)) * pxPerUnit + dx;
      const fy = (Number(group.dataset.y) - Number(pin.dataset.y)) * pxPerUnit + dy;
      pin.style.setProperty('--fx', `${fx.toFixed(1)}px`);
      pin.style.setProperty('--fy', `${fy.toFixed(1)}px`);
      // labels point outward, unless that would run off the edge of the map
      const seatX = hubX + dx;
      const labelW = (pin.dataset.name ?? '').length * 8 + 30;
      const outward = dx < -1 ? 'left' : 'right';
      pin.dataset.labelSide =
        seatX - labelW < 0 ? 'right' : seatX + labelW > width ? 'left' : outward;
      pin.classList.add('is-fanned');
    });
  };

  // ---- flights ----
  const NS = 'http://www.w3.org/2000/svg';
  const vuelos = root.querySelector<SVGGElement>('[data-vuelos]')!;
  const avion = root.querySelector<SVGGElement>('[data-avion]')!;
  const bogota = named.find((pin) => pin.dataset.pin === 'bogota');
  // the plane starts in Bogotá; after that it always takes off from wherever it
  // last landed (or from mid-air, when a new pick interrupts a flight)
  let here: Point = { x: Number(bogota?.dataset.x), y: Number(bogota?.dataset.y) };
  let flightFrame = 0;
  let abortFlight: (() => void) | null = null;

  const fly = (to: Point, keep: boolean): Promise<void> =>
    new Promise((resolve) => {
      cancelAnimationFrame(flightFrame);
      abortFlight?.();
      abortFlight = null;
      const origin = { ...here };
      const dx = to.x - origin.x;
      const dy = to.y - origin.y;
      const dist = Math.hypot(dx, dy);
      if (reducedMotion.matches || !dist) return resolve();

      // a quadratic arc that bulges upward, like a flight path
      const mid = { x: (origin.x + to.x) / 2, y: (origin.y + to.y) / 2 };
      const n = { x: dy / dist, y: -dx / dist };
      const side = n.y <= 0 ? 1 : -1;
      const c = { x: mid.x + n.x * side * dist * 0.28, y: mid.y + n.y * side * dist * 0.28 };

      const route = document.createElementNS(NS, 'path');
      route.classList.add('mapa__vuelo');
      vuelos.append(route);
      avion.setAttribute('visibility', 'visible');
      abortFlight = () => {
        route.classList.add('is-gone');
        window.setTimeout(() => route.remove(), 1300);
        resolve();
      };

      const at = (t: number): Point => ({
        x: (1 - t) ** 2 * origin.x + 2 * (1 - t) * t * c.x + t * t * to.x,
        y: (1 - t) ** 2 * origin.y + 2 * (1 - t) * t * c.y + t * t * to.y,
      });
      const duration = Math.min(1800, 650 + (dist / full.w) * 3200);
      const start = performance.now();

      const step = (now: number): void => {
        const t = Math.min(1, (now - start) / duration);
        const e = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
        // the drawn part of the arc is the same curve cut at e (de Casteljau)
        const c1 = { x: origin.x + (c.x - origin.x) * e, y: origin.y + (c.y - origin.y) * e };
        const p = at(e);
        here = p;
        route.setAttribute('d', `M${origin.x} ${origin.y}Q${c1.x} ${c1.y} ${p.x} ${p.y}`);

        const tx = 2 * (1 - e) * (c.x - origin.x) + 2 * e * (to.x - c.x);
        const ty = 2 * (1 - e) * (c.y - origin.y) + 2 * e * (to.y - c.y);
        const deg = (Math.atan2(ty, tx) * 180) / Math.PI;
        // about 26px long whatever the zoom
        const scale = (view.w / svg.clientWidth) * 0.95;
        avion.setAttribute(
          'transform',
          `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${deg.toFixed(1)}) scale(${scale.toFixed(4)})`,
        );

        if (t < 1) {
          flightFrame = requestAnimationFrame(step);
          return;
        }
        abortFlight = null;
        here = { ...to };
        avion.setAttribute('visibility', 'hidden');
        route.classList.add(keep ? 'is-landed' : 'is-gone');
        if (!keep) window.setTimeout(() => route.remove(), 1300);
        resolve();
      };
      flightFrame = requestAnimationFrame(step);
    });

  const pointOf = (pin: HTMLElement): Point => ({
    x: Number(pin.dataset.x),
    y: Number(pin.dataset.y),
  });
  const placeTag = (): void => {
    if (!active || active.classList.contains('is-fanned')) return;
    const left = ((Number(active.dataset.x) - view.x) / view.w) * 100;
    const top = ((Number(active.dataset.y) - view.y) / view.h) * 100;
    tag.style.left = `${left}%`;
    tag.style.top = `${top}%`;
    tag.dataset.align = left < 16 ? 'start' : left > 84 ? 'end' : 'center';
    tag.dataset.side = top < 14 ? 'below' : 'above';
  };

  const render = (): void => {
    svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
    for (const pin of pins) {
      pin.style.left = `${((Number(pin.dataset.x) - view.x) / view.w) * 100}%`;
      pin.style.top = `${((Number(pin.dataset.y) - view.y) / view.h) * 100}%`;
    }
    placeTag();
  };

  const animateTo = (target: Box, done?: () => void): void => {
    cancelAnimationFrame(frame);
    if (reducedMotion.matches) {
      view = { ...target };
      render();
      done?.();
      return;
    }
    const from = { ...view };
    const start = performance.now();
    const duration = 800;
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 4);
      view = {
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e,
        h: from.h + (target.h - from.h) * e,
      };
      render();
      if (t < 1) frame = requestAnimationFrame(step);
      else done?.();
    };
    frame = requestAnimationFrame(step);
  };

  const hide = (): void => {
    fan(null);
    active?.classList.remove('is-active');
    active = null;
    tag.hidden = true;
    for (const button of listButtons) button.setAttribute('aria-pressed', 'false');
  };

  const setMode = (next: Mode, done?: () => void): void => {
    if (next === mode) {
      done?.();
      return;
    }
    mode = next;
    root.dataset.mode = next;
    for (const layer of layers) layer.inert = layer.dataset.mapaLayer !== next;
    toggleLabel.textContent =
      next === 'colombia' ? 'Volver a Latinoamérica' : 'Ver Colombia de cerca';
    hide();
    animateTo(next === 'colombia' ? focus : full, done);
  };

  const show = (id: string): void => {
    const pin = named.find((candidate) => candidate.dataset.pin === id);
    if (!pin) return;
    const needed: Mode = pin.closest('[data-mapa-layer]')?.getAttribute('data-mapa-layer') as Mode;
    setMode(needed, async () => {
      const group = grupos.find((g) => g.dataset.grupo === pin.dataset.cluster) ?? null;
      if (group !== openGroup) fan(group);
      active?.classList.remove('is-active');
      active = pin;
      pin.classList.add('is-active');
      for (const button of listButtons) {
        button.setAttribute('aria-pressed', String(button.dataset.lugar === id));
      }
      tag.hidden = true;
      await fly(pointOf(pin), false);
      if (active !== pin) return;
      // a fanned town already shows its own label
      if (!pin.classList.contains('is-fanned')) {
        tag.textContent = pin.dataset.name ?? '';
        tag.hidden = false;
        placeTag();
      }
    });
  };

  toggle.addEventListener('click', () => {
    setMode(mode === 'colombia' ? 'latam' : 'colombia');
  });

  root.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (target.closest('[data-mapa-toggle]')) return;
    const group = target.closest<HTMLButtonElement>('[data-grupo]');
    if (group) {
      active?.classList.remove('is-active');
      active = null;
      tag.hidden = true;
      fan(group === openGroup ? null : group);
      return;
    }
    if (target.closest('[data-mapa-zoom]') && mode === 'latam') {
      setMode('colombia');
      return;
    }
    const pin = target.closest<HTMLElement>('[data-pin]');
    if (pin?.dataset.pin) {
      if (pin === active) hide();
      else show(pin.dataset.pin);
      return;
    }
    hide();
  });

  for (const button of listButtons) {
    button.addEventListener('click', () => {
      if (button.dataset.lugar) show(button.dataset.lugar);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && (active || openGroup)) hide();
  });

}
