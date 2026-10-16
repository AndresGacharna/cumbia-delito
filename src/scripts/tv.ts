// Colaboraciones TV: the knob or the channel guide tunes to another channel,
// with a burst of static; the play button loads that channel's YouTube video,
// or its Spotify player when there is no video, right into the screen.
import { playSpotify } from './spotify-api';

const tv = document.querySelector<HTMLElement>('[data-tv]');

if (tv) {
  const screen = tv.querySelector<HTMLElement>('[data-screen]')!;
  const channels = Array.from(tv.querySelectorAll<HTMLElement>('[data-channel]'));
  const sides = Array.from(tv.querySelectorAll<HTMLElement>('[data-side]'));
  const guide = Array.from(tv.querySelectorAll<HTMLButtonElement>('[data-goto]'));
  const knob = tv.querySelector<HTMLButtonElement>('[data-next]')!;
  const dial = tv.querySelector<HTMLElement>('[data-dial-n]')!;
  const now = tv.querySelector<HTMLElement>('[data-now]')!;
  const canvas = tv.querySelector<HTMLCanvasElement>('[data-static]')!;
  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let current = 0;
  let turns = 0;
  let staticFrame = 0;

  // ---- static ----
  const noise = (): void => {
    if (!ctx) return;
    const image = ctx.createImageData(canvas.width, canvas.height);
    const roll = Math.floor(Math.random() * canvas.height);
    for (let i = 0; i < image.data.length; i += 4) {
      const row = Math.floor(i / 4 / canvas.width);
      const v = Math.random() * 255 * (Math.abs(row - roll) < 6 ? 0.45 : 1);
      image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  };

  const burst = (ms: number): Promise<void> =>
    new Promise((resolve) => {
      if (reducedMotion.matches || !ctx) return resolve();
      cancelAnimationFrame(staticFrame);
      canvas.classList.add('is-on');
      const end = performance.now() + ms;
      const tick = (t: number): void => {
        noise();
        if (t < end) staticFrame = requestAnimationFrame(tick);
        else {
          canvas.classList.remove('is-on');
          resolve();
        }
      };
      staticFrame = requestAnimationFrame(tick);
    });

  // ---- stop whatever the old channel was playing ----
  const stopChannel = (index: number): void => {
    const channel = channels[index];
    const iframe = channel.querySelector('iframe');
    const host = channel.querySelector<HTMLElement>('[data-host]');
    if (iframe && host && host.dataset.button) {
      host.innerHTML = host.dataset.button;
      delete host.dataset.button;
    }
    screen.classList.remove('is-playing');
  };

  // A channel picked with the knob or the guide starts playing on its own: the
  // click is the user gesture browsers need to allow sound.
  const tune = async (index: number, autoplay = true): Promise<void> => {
    if (index === current) return;
    stopChannel(current);
    turns += 1;
    knob.style.setProperty('--knob', `${turns * 60}deg`);
    const pending = burst(420);
    current = index;
    tv.dataset.ch = String(index);
    channels.forEach((channel, i) => (channel.hidden = i !== index));
    sides.forEach((side, i) => (side.hidden = i !== index));
    guide.forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === index)));
    dial.textContent = String(index + 1);
    now.textContent = guide[index].dataset.label ?? '';
    await pending;
    if (current !== index) return; // tuned again during the static
    const button = channels[index].querySelector<HTMLButtonElement>('[data-play]');
    if (autoplay && button) playButton(button);
    else autoload();
  };

  knob.addEventListener('click', () => void tune((current + 1) % channels.length));
  guide.forEach((btn, i) => btn.addEventListener('click', () => void tune(i)));

  // ---- video on the screen ----
  const loadVideo = (button: HTMLButtonElement, src: string): void => {
    const host = button.closest<HTMLElement>('[data-host]')!;
    host.dataset.button = host.innerHTML;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = button.dataset.title ?? '';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    host.replaceChildren(iframe);
    screen.classList.add('is-playing');
  };

  const playButton = (button: HTMLButtonElement): void => {
    if (button.dataset.kind === 'spotify') {
      // songs without a video play on the screen: the cover, blurred, fills the
      // glass and the Spotify player sits centred on it
      const host = button.closest<HTMLElement>('[data-host]')!;
      const cover = button.querySelector('img')?.currentSrc ?? '';
      host.dataset.button = host.innerHTML;
      const bg = document.createElement('div');
      bg.className = 'tv__audio-bg';
      if (cover) bg.style.backgroundImage = `url("${cover}")`;
      const player = document.createElement('div');
      player.className = 'tv__audio-player';
      host.replaceChildren(bg, player);
      screen.classList.add('is-playing');
      void playSpotify(player, null, button.dataset.track ?? '', button.dataset.title ?? '', () => {});
      return;
    }
    loadVideo(button, button.dataset.src ?? '');
  };

  screen.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-play]');
    if (!button) return;
    playButton(button);
    screen.querySelector<HTMLIFrameElement>('iframe')?.focus();
  });

  // a channel with a live player shows YouTube's own player (and its poster
  // frame) as soon as it is on screen, without starting playback
  let inView = false;
  const autoload = (): void => {
    if (!inView) return;
    const button = channels[current].querySelector<HTMLButtonElement>('[data-idle-src]');
    if (button) loadVideo(button, button.dataset.idleSrc ?? '');
  };
  new IntersectionObserver(
    ([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      autoload();
    },
    { rootMargin: '200px 0px' },
  ).observe(screen);
}

export {};
