// TODO: only the unused Spotify/YouTube facades load this; delete with them.
function activateEmbed(button: HTMLButtonElement): void {
  const kind = button.dataset.embed;
  const src = button.dataset.src;
  const title = button.dataset.embedTitle ?? '';

  if (!src || (kind !== 'spotify' && kind !== 'youtube')) {
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.tabIndex = 0;
  iframe.style.border = '0';

  if (kind === 'spotify') {
    iframe.width = '100%';
    iframe.height = '152';
    iframe.allow =
      'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
  } else {
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  }

  const host = button.closest<HTMLElement>('[data-embed-host]');
  if (host) {
    host.dataset.embedLoaded = 'true';
    host.replaceChildren(iframe);
  } else {
    button.replaceWith(iframe);
  }

  iframe.focus();
}

document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest<HTMLButtonElement>('button[data-embed]');
  if (!button) return;

  event.preventDefault();
  activateEmbed(button);
});
