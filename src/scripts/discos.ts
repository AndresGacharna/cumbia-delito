// Música crate: hover or focus flips through the sleeves; a click pulls one
// out and plays it in the single Spotify player.
//
// Sleeves never travel sideways through the crate: going out, a sleeve first
// rises straight up out of its slot, then moves over the top to the front, and
// only then does the record slide out and the music start. Going back is the
// reverse: record in, up over the crate above its own slot, straight down.
//
// Spotify's iFrame API (loaded on the first pick) starts playback and reports
// pauses so the record stops turning; if it cannot load, a plain embed is used.
import { playSpotify, type SpotifyController } from './spotify-api';

const deck = document.querySelector<HTMLElement>('[data-crate]');

if (deck) {
  const sleeves = Array.from(deck.querySelectorAll<HTMLButtonElement>('[data-sleeve]'));
  const picks = Array.from(deck.querySelectorAll<HTMLButtonElement>('[data-pick]'));
  const player = deck.querySelector<HTMLElement>('[data-player]')!;
  const title = deck.querySelector<HTMLElement>('[data-now-title]')!;
  const meta = deck.querySelector<HTMLElement>('[data-now-meta]')!;
  const openLink = deck.querySelector<HTMLAnchorElement>('[data-open-link]')!;
  const idle = {
    title: title.textContent ?? '',
    meta: meta.textContent ?? '',
    player: player.innerHTML,
    link: openLink.href,
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // step lengths, matched to the transitions in Musica.astro
  const STEP = { vinylIn: 350, lift: 420, travel: 560, drop: 560 };

  let browsing = 0;
  let current: number | null = null; // the record that is out, or on its way out
  let homing = false; // a record is on its way back into the crate
  let controller: SpotifyController | null = null;
  const timers: number[] = [];

  const after = (ms: number, fn: () => void): void => {
    timers.push(window.setTimeout(fn, reducedMotion.matches ? 0 : ms));
  };
  const cancel = (): void => {
    timers.forEach((t) => window.clearTimeout(t));
    timers.length = 0;
  };

  // While a record is out (or moving) the crate holds still; otherwise the
  // browsed sleeve peeks up and the ones in front of it lean forward.
  const render = (): void => {
    const focus = current === null && !homing ? browsing : -1;
    sleeves.forEach((sleeve, index) => {
      sleeve.classList.toggle('is-front', index < focus);
      sleeve.classList.toggle('is-sel', index === focus);
    });
    picks.forEach((pick, index) => pick.setAttribute('aria-pressed', String(index === current)));
  };

  const setSpinning = (spinning: boolean): void => {
    if (current === null) return;
    const sleeve = sleeves[current];
    sleeve.classList.toggle('is-spinning', spinning && sleeve.classList.contains('is-open'));
  };

  const silence = (): void => {
    if (controller) controller.pause();
    else if (player.querySelector('iframe')) player.innerHTML = idle.player;
  };

  const startMusic = async (index: number): Promise<void> => {
    const sleeve = sleeves[index];
    controller = await playSpotify(
      player,
      controller,
      sleeve.dataset.track ?? '',
      sleeve.dataset.title ?? '',
      setSpinning,
    );
  };

  /** record in, up over the crate above its own slot, straight down */
  const putAway = (index: number, done?: () => void): void => {
    const sleeve = sleeves[index];
    sleeve.classList.remove('is-open', 'is-spinning');
    after(STEP.vinylIn, () => {
      sleeve.classList.remove('is-out');
      sleeve.classList.add('is-up');
    });
    after(STEP.vinylIn + STEP.travel, () => sleeve.classList.remove('is-up'));
    after(STEP.vinylIn + STEP.travel + STEP.drop, () => done?.());
  };

  /** straight up out of the slot, over the top to the front, record out, play */
  const bringOut = (index: number): void => {
    const sleeve = sleeves[index];
    sleeve.classList.add('is-up');
    after(STEP.lift, () => {
      sleeve.classList.remove('is-up');
      sleeve.classList.add('is-out');
    });
    after(STEP.lift + STEP.travel, () => {
      sleeve.classList.add('is-open', 'is-spinning');
      void startMusic(index);
    });
  };

  /** any sleeve caught mid-move by a new click goes straight back to rest */
  const settleOthers = (keep: (number | null)[]): void => {
    sleeves.forEach((sleeve, index) => {
      if (keep.includes(index)) return;
      sleeve.classList.remove('is-up', 'is-out', 'is-open', 'is-spinning');
    });
  };

  const pick = (index: number): void => {
    cancel();
    const previous = current;
    homing = false;

    // clicking the record that is out puts it away and stops the music
    if (previous === index) {
      silence();
      current = null;
      homing = true;
      render();
      settleOthers([index]);
      // once it has dropped home, the whole crate straightens back to rest
      putAway(index, () => {
        homing = false;
        browsing = 0;
        render();
      });
      title.textContent = idle.title;
      meta.textContent = idle.meta;
      openLink.href = idle.link;
      return;
    }

    const sleeve = sleeves[index];
    current = index;
    browsing = index;
    render();
    settleOthers([index, previous]);
    title.textContent = sleeve.dataset.title ?? '';
    meta.textContent = `Sencillo · ${sleeve.dataset.year}`;
    openLink.href = `https://open.spotify.com/track/${sleeve.dataset.track}`;

    if (previous !== null) {
      // one at a time: the old record goes home, then the new one comes out
      silence();
      putAway(previous, () => bringOut(index));
    } else {
      bringOut(index);
    }
  };

  sleeves.forEach((sleeve, index) => {
    // flip through the crate under the pointer or the keyboard
    const browse = (): void => {
      if (current !== null || homing) return;
      browsing = index;
      render();
    };
    sleeve.addEventListener('pointerenter', browse);
    sleeve.addEventListener('focus', browse);
    sleeve.addEventListener('click', () => pick(index));
  });

  picks.forEach((button, index) => button.addEventListener('click', () => pick(index)));

  render();
}

export {};
