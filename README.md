# Cumbia De+Lito — landing

Sitio estático hecho con Astro. Las imágenes fuente están en WebP (`src/assets/`) y Astro genera
versiones AVIF/WebP redimensionadas en el build.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Docker

La imagen compila el sitio con Node y lo sirve con nginx (puerto 80 dentro del contenedor).

```sh
docker compose up -d --build          # http://localhost:8080
PORT=3000 docker compose up -d --build  # otro puerto en el host
```

Sin compose:

```sh
docker build -t cumbia-delito .
docker run -d --restart unless-stopped -p 8080:80 cumbia-delito
```

Para HTTPS y dominio, pon un proxy (Caddy, Traefik, Nginx Proxy Manager, Coolify, Dokploy…) delante
del contenedor. El dominio canónico se define en `src/config.ts` (`SITE_URL`).

## Carpetas

- `src/assets/` — imágenes que usa el sitio (WebP).
- `imagenes/`, `brief/` — material original del cliente; no entra en la imagen Docker.
- `scripts/make-og.mjs` — regenera `public/og.jpg` (`node scripts/make-og.mjs`).
