import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

const polaroidWidth = 420;
const frameSide = 18;
const frameBottom = 52;
const photoW = polaroidWidth - frameSide * 2;
const photoH = 352;
const cardW = polaroidWidth;
const cardH = photoH + frameSide + frameBottom;

const photoBuf = await sharp(path.join(root, 'src/assets/fotos/tarima-keytar.webp'))
  .resize(photoW, photoH, { fit: 'cover' })
  .extend({
    top: frameSide,
    left: frameSide,
    right: frameSide,
    bottom: frameBottom,
    background: '#FFFFFF',
  })
  .png()
  .toBuffer();

const rotatedCard = await sharp(photoBuf)
  .rotate(-4, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const rotatedMeta = await sharp(rotatedCard).metadata();
const rw = rotatedMeta.width;
const rh = rotatedMeta.height;

const shadowSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${rw + 80}" height="${rh + 80}" viewBox="0 0 ${rw + 80} ${rh + 80}">
    <defs>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
      </filter>
    </defs>
    <g transform="translate(${(rw + 80) / 2}, ${(rh + 80) / 2 + 12}) rotate(-4)">
      <rect x="${-cardW / 2}" y="${-cardH / 2}" width="${cardW}" height="${cardH}" fill="rgba(0,0,0,0.52)" filter="url(#sh)" />
    </g>
  </svg>`,
);

const shadowPng = await sharp(shadowSvg).png().toBuffer();

const overlayPng = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <linearGradient id="navyFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${WIDTH * 0.6}" y2="0">
          <stop offset="0%" stop-color="rgb(13, 17, 33)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="rgb(13, 17, 33)" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${WIDTH * 0.6}" height="${HEIGHT}" fill="url(#navyFade)" />
    </svg>`,
  ),
)
  .png()
  .toBuffer();

const logoPad = 36;
const logoPng = await sharp(path.join(root, 'src/assets/logo/logo-blanco.svg'), { density: 200 })
  .resize({ width: 560 })
  .extend({
    top: logoPad,
    bottom: logoPad,
    left: logoPad,
    right: logoPad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();
const logoMeta = await sharp(logoPng).metadata();

const logoShadowPng = await sharp(logoPng)
  .ensureAlpha()
  .linear([0, 0, 0, 0.5], [0, 0, 0, 0])
  .blur(9)
  .png()
  .toBuffer();

const cardLeft = WIDTH - rw - 64;
const cardTop = Math.round((HEIGHT - rh) / 2);
const logoLeft = 68 - logoPad;
const logoTop = Math.round((HEIGHT - logoMeta.height) / 2);

await sharp(path.join(root, 'src/assets/muro/fondo-tarima.webp'))
  .resize(WIDTH, HEIGHT, { fit: 'cover' })
  .composite([
    {
      input: overlayPng,
      left: 0,
      top: 0,
    },
    {
      input: shadowPng,
      left: cardLeft - 40,
      top: cardTop - 40,
    },
    {
      input: rotatedCard,
      left: cardLeft,
      top: cardTop,
    },
    {
      input: logoShadowPng,
      left: logoLeft,
      top: logoTop + 4,
    },
    {
      input: logoPng,
      left: logoLeft,
      top: logoTop,
    },
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path.join(root, 'public/og.jpg'));
