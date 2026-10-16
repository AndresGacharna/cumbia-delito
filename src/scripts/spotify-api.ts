// Spotify's iFrame API, loaded once and only when someone first presses play.
// It gives a controller that can start playback and reports pause/play.
export type SpotifyController = {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
};

type IFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width: string; height: number },
    cb: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

let apiPromise: Promise<IFrameAPI> | null = null;

export const loadSpotifyApi = (): Promise<IFrameAPI> => {
  apiPromise ??= new Promise<IFrameAPI>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('timeout')), 6000);
    window.onSpotifyIframeApiReady = (api) => {
      window.clearTimeout(timer);
      resolve(api);
    };
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    script.onerror = () => reject(new Error('blocked'));
    document.head.append(script);
  });
  return apiPromise;
};

/** A plain embed, used when the iFrame API cannot load. */
export const plainSpotifyEmbed = (host: HTMLElement, trackId: string, name: string): void => {
  const iframe = document.createElement('iframe');
  iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  iframe.title = `${name} en Spotify`;
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  host.replaceChildren(iframe);
};

/**
 * Plays a track in `host`, reusing `controller` when there is one. Returns the
 * controller (or null on the plain-embed fallback). `onPlaying` follows the
 * real playback state.
 */
export const playSpotify = async (
  host: HTMLElement,
  controller: SpotifyController | null,
  trackId: string,
  name: string,
  onPlaying: (playing: boolean) => void,
): Promise<SpotifyController | null> => {
  const uri = `spotify:track:${trackId}`;
  try {
    if (controller) {
      controller.loadUri(uri);
      controller.play();
      return controller;
    }
    const api = await loadSpotifyApi();
    const mount = document.createElement('div');
    host.replaceChildren(mount);
    return await new Promise<SpotifyController>((resolve) => {
      api.createController(mount, { uri, width: '100%', height: 152 }, (created) => {
        created.addListener('playback_update', (event) => onPlaying(!event.data.isPaused));
        created.addListener('ready', () => created.play());
        resolve(created);
      });
    });
  } catch {
    plainSpotifyEmbed(host, trackId, name);
    return null;
  }
};
