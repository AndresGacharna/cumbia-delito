// TODO: domain not confirmed by the client; replace before deploy.
export const SITE_URL = 'https://cumbiadelito.com';

export const WHATSAPP_BOOKING_URL =
  'https://wa.me/573144817052?text=Hola%20Christian%2C%20vi%20la%20p%C3%A1gina%20de%20Cumbia%20De%2BLito%20y%20quiero%20cotizar%20un%20show.%20Fecha%3A%20%20%7C%20Ciudad%3A%20%20%7C%20Tipo%20de%20evento%3A%20';
export const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/6ektyhX4BfvzDIMmy5IQX8';
export const EMAIL = 'cumbiadelito@gmail.com';
export const PHONE_DISPLAY = '+57 314 481 7052';

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', handle: '@cumbiadelito', url: 'https://www.instagram.com/cumbiadelito' },
  { id: 'tiktok', label: 'TikTok', handle: '@cumbiadelito', url: 'https://www.tiktok.com/@cumbiadelito' },
  { id: 'youtube', label: 'YouTube', handle: '@cumbiadelito282', url: 'https://www.youtube.com/@cumbiadelito282' },
  { id: 'facebook', label: 'Facebook', handle: 'CUMBIADELITOCOLOMBIA', url: 'https://www.facebook.com/CUMBIADELITOCOLOMBIA' },
  { id: 'spotify', label: 'Spotify', handle: 'CUMBIA DE+LITO', url: SPOTIFY_ARTIST_URL },
] as const;
export type SocialId = (typeof SOCIALS)[number]['id'];
