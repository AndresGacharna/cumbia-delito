# Product

<!-- impeccable:product-schema 1 -->

Página oficial de **Cumbia De+Lito**, proyecto colombiano de cumbia villera. Fuentes de verdad: `brief/brief.json` (manda sobre todo lo demás), `brief/brief.md` y `brief/_volcado.md`. Solo se publica como hecho lo que en `brief.json` tenga `tipo` `dato`, `dato_cliente`, `dato_web` o `decision`; `interpretacion` es guía de tono y `falta` no se rellena jamás.

## Platform

web

## Stack

Decisión del cliente, no delegada:

- Astro con salida 100 % estática (`dist/`). Sin frameworks de UI en el cliente salvo que algo lo exija.
- CSS propio.
- Imágenes optimizadas con `astro:assets` (AVIF/WebP, `srcset`).
- Fuentes servidas desde el propio proyecto, nunca desde fonts.googleapis.com.
- El despliegue lo hace el cliente. El sitio solo tiene que poder servirse como estático en cualquier hosting.

## Users

Dos públicos con el mismo peso `[CLIENTE-1]`:

- **Organizador:** festivales, eventos privados y eventos sociales, en Colombia o en el exterior. Decide si contrata el show y escribe por WhatsApp.
- **Fan** de la cumbia villera y la cumbia argentina en Colombia. Quiere escuchar, ver y seguir.

*Interpretación:* la mayoría llegará desde el celular, por el link de Instagram o TikTok.

## Product Purpose

Que contraten el show y que escuchen la música, con el mismo peso `[CLIENTE-1]`. La contratación es por WhatsApp; la escucha, en Spotify y YouTube.

## Positioning

- Desde 2012, el proyecto de Christian Delgado cruza la cumbia villera argentina con el folclor de la costa atlántica colombiana: "Tradición caribe colombiana + energía urbana latinoamericana." `[EPK·Sonido]`
- Participó junto a Karol G en «Cuando me muera te olvido» dentro del especial *La Premiere* (2025) `[WEB-10..12]`.
- La formación se arma según el destino: Christian Delgado es el único integrante fijo y los músicos se contratan por show `[CLIENTE-3]`.

## Operating Context

- El organizador evalúa con lo que un EPK le daría: qué es, cómo suena, qué pide en tarima (ficha técnica, rider, stage plot) y cómo cotizar. Cotiza por WhatsApp con un mensaje prellenado (Fecha, Ciudad, Tipo de evento).
- El fan llega desde redes, escucha y sigue.
- Contacto comercial público: Christian Delgado · Manager / Dirección General · +57 314 481 7052 · cumbiadelito@gmail.com.

## Capabilities and Constraints

- Landing de una sola página, en español de Colombia (`lang="es-CO"`), tuteando.
- Sin analítica ni cookies de terceros; videos por `youtube-nocookie.com`. Los embeds de Spotify y YouTube no bloquean la carga.
- Objetivo de rendimiento: Lighthouse móvil ≥ 90 en las cuatro categorías; LCP < 2,5 s.
- `SITE_URL` en un solo lugar del config. **Pendiente:** el dominio no está confirmado; mientras tanto `https://cumbiadelito.com` marcado con `TODO`.
- "Descarga el EPK" solo si existe `descargas/` con un PDF de menos de 10 MB. **Hoy no existe:** la carpeta está creada y vacía, así que el botón no va.
- Gotham (la cara del EPK) necesita licencia web. `fonts/` está creada y vacía: **no hay licencia aportada**.

## Brand Commitments

Vinculantes; detalle completo en `PROMPT_WEB.md` §3 y §4.

- **Nombre visible:** siempre "Cumbia De+Lito"; "CUMBIA DE+LITO" solo en estilos en mayúsculas. "Cumbia Delito" va solo en metadatos de SEO. No se explica el "+" ni "Lito".
- **Logo:** script de pincel blanca con el "+" rojo, y su versión neón. Se usa el archivo original, no se redibuja; vectorizar el recorte requiere aviso previo.
- **Marca establecida que se hereda y se amplía, no se reemplaza:** la identidad del EPK (paleta, materiales, logo, el "+" como recurso, keytar blanco) está fijada en `PROMPT_WEB.md` §3.
- **Voz:** registro popular y pícaro en el hero, los titulares y los CTA; registro institucional del EPK solo en la zona para organizadores. Cita textual siempre que se pueda.
- **El "delito" como juego:** guiño "SE BUSCA · CANTANDO O TOCANDO", sin armas, violencia ni drogas.
- **Karol G:** texto exacto "Junto a Karol G en «Cuando me muera te olvido» — La Premiere (2025)." Prueba solo con el video oficial y la nota de Noticias RCN. Prohibido "feat.", enlazar al track de *Tropicoqueta*, mencionar el Teatro Heredia, contar anécdotas de la grabación o usar fotos, portadas o capturas suyas.
- **Personas:** sin nombres de músicos contratados; no asumir quién es quién en las fotos; Christian Delgado se nombra en un `alt` solo si el archivo lo identifica.
- **La figura femenina** como eje se trata solo con las palabras del EPK, sin ampliarla ni ilustrarla con imágenes sexualizadas.
- **Nombres propios** como en las plataformas: Karol G, Subcantante, Los Varriletes, Los Pibes Del Penal.

## Evidence on Hand

- **Música:** 4 sencillos propios (*Cumbiando el Mundo* 2025; *La Rueda de la Cumbia*, *La Famosa Banda* y *Cumbia Cerveza y Mujer* 2022, con la cinta "10 AÑOS") y 4 colaboraciones verificadas (Karol G, Subcantante, Los Varriletes, Los Pibes Del Penal), con sus URL en `brief.json → musica`.
- **Prueba de Karol G:** el video oficial de *La Premiere* (desde 1:23) y la nota de Noticias RCN del 11-dic-2025.
- **Trayectoria:** 15 ciudades de Colombia "entre otras" y 5 países (México, Ecuador, Perú, Argentina, Chile), sin fechas ni nombres de eventos.
- **Ficha técnica, rider de 5 puestos y stage plot:** `brief.json → info_tecnica`.
- **Fotos y logos:** `imagenes/` es la única fuente para publicar. **Hoy está creada y vacía: faltan los originales** `[CLIENTE-4]`. `brief/assets/` solo tiene recortes de baja resolución y referencias del EPK; sirven para mirar, nunca para publicar.

**Ausencias que nadie debe fabricar:** testimonios; agenda o fechas; nombres de medios, de festivales o de los músicos contratados; fotos con Karol G; cifras de público o de streams (incluidas las métricas de Spotify); merch; letras; imágenes de personas, de la banda, de shows o de portadas generadas o "mejoradas" con IA.

## Product Principles

1. **La pista manda:** todo empuja a bailar o a contratar.
2. **Probar, no proclamar:** cada credencial se muestra con su fuente.
3. **Su voz es la del barrio, no la de una agencia.**
4. **El "+" es la fusión.**

## Accessibility & Inclusion

WCAG 2.2 AA: contraste AA, foco visible, navegación por teclado y `prefers-reduced-motion` respetado. Todo el contenido en español (`lang="es-CO"`). Logo con `alt="Cumbia De+Lito"`; la tabla del rider con `<th scope>`.
