# Trazabilidad de la página

Cada afirmación factual que se publica en la página, con su fuente en `brief/brief.json`. Todas tienen `tipo` publicable (`dato`, `dato_cliente`, `dato_web` o `decision`). El texto vive en `src/data/content.ts` y `src/config.ts`; los componentes no escriben hechos propios.

## Identidad y primera pantalla

| Afirmación en la página | Dónde aparece | Fuente en `brief.json` | Tipo |
|---|---|---|---|
| Nombre "Cumbia De+Lito" (y "CUMBIA DE+LITO" en estilos en mayúsculas) | Todo el sitio | `identidad.nombre` | decision |
| "Cumbia Delito" solo en metadatos (meta description, `alternateName`) | `<head>` | `identidad.alias_seo` | decision |
| "Cumbia villera · cumbia urbana" | Hero (h1) | `identidad.generos` | dato |
| "Bogotá, Colombia" | Hero, JSON-LD | `identidad.origen` | dato |
| "Tradición caribe colombiana + energía urbana latinoamericana." | Hero | `identidad.concepto_artistico`, `citas[0]` | dato |
| Fundación en 2012 | Historia, JSON-LD, meta description | `identidad.anio_formacion` | dato |
| Christian Delgado, fundador (JSON-LD `founder`) | Historia, El show, JSON-LD | `identidad.fundador` | dato_cliente |
| Géneros del JSON-LD | `<head>` | `identidad.generos` | dato |

## La propuesta

| Afirmación | Fuente | Tipo |
|---|---|---|
| "Cumbia villera con sabor a costa atlántica." (titular) | `web.frases_propuestas` (titular alterno), base `[EPK·Propuesta¶1]` | decision |
| Párrafo 1: grupo colombiano; fusiona cumbia villera y urbana con el folclor de la costa atlántica; "sonido auténtico, fresco y altamente bailable" | `filosofia.sonido`, `identidad.influencias`, texto literal en `_volcado.md` §2 ¶1 | dato |
| Párrafo 2: energía festiva, narrativa popular latinoamericana, reinterpreta la tradición | `filosofia.identidad`, `filosofia.enfoque` (§2 ¶2) | dato |
| Las 5 características del sonido, incluida "Narrativa centrada en la mujer." | `filosofia.eje_narrativo`, `_volcado.md` §4 •1–5 | dato |

## Música

| Afirmación | Fuente | Tipo |
|---|---|---|
| *Cumbiando el Mundo* · 2025 | `musica.sencillos[0]` | dato_web |
| *La Rueda de la Cumbia* · 2022 | `musica.sencillos[1]` | dato_web |
| *La Famosa Banda* · 2022 | `musica.sencillos[2]` | dato_web |
| *Cumbia Cerveza y Mujer* · 2022 | `musica.sencillos[3]` | dato_web |
| Cinta "10 AÑOS" en las portadas de 2022 (se muestra la portada tal cual, sin texto propio) | `estetica.portadas_2022`, `historia[3]` | dato / dato_web |
| "Cuatro sencillos propios." | Conteo de `musica.sencillos` | dato_web |
| Perfil de Spotify y canal de YouTube | `presencia.spotify`, `presencia.youtube` | dato |

## Colaboraciones

| Afirmación | Fuente | Tipo |
|---|---|---|
| "Junto a Karol G en «Cuando me muera te olvido» — La Premiere (2025)." | `musica.colaboraciones[0].redaccion_web` | dato_web + decision |
| Video oficial desde 1:23 y nota de Noticias RCN | `musica.colaboraciones[0].prueba`, `musica.prensa[0]` | dato_web |
| "La Premiere · 2025" (cara del reproductor, sin imagen de Karol G) | `musica.colaboraciones[0]` (estreno 2025-12-07) | dato_web |
| Subcantante · *Eres Mi Cumbia* (video oficial y Spotify) | `musica.colaboraciones[1]` | dato_web |
| Los Varriletes · *Pibe Ganador* (portada con banderas de Argentina y Colombia) | `musica.colaboraciones[2]` | dato_web |
| Los Pibes Del Penal · *Amor a escondidas* | `musica.colaboraciones[3]` | dato_web |

## Historia

| Afirmación | Fuente | Tipo |
|---|---|---|
| "Cumbiando el mundo desde 2012." (titular) | `web.frases_propuestas` (Historia) | decision |
| Nace en 2012 por iniciativa de Christian Delgado, "tras su recorrido por diversas agrupaciones en Bogotá"; "renovar la cumbia desde una perspectiva urbana y actual" | `historia[0]`, `_volcado.md` §3 ¶1 | dato |
| Productor argentino Gustavo Coronel y los artistas que cita el EPK (texto pequeño, baja prominencia) | `historia[1]`, `decisiones[9]` | dato |
| Estilo propio: cumbia villera, groove urbano y folclor atlántico; figura femenina como eje | `historia[2]`, `filosofia.eje_narrativo` | dato |

## El show

| Afirmación | Fuente | Tipo |
|---|---|---|
| "Un show que viaja: la formación se arma según el destino." | `web.frases_propuestas` (El show), `identidad.modelo_formacion` | dato_cliente |
| 4 músicos en escena y un equipo técnico de 3 personas | `info_tecnica.show`, `identidad.formacion_en_vivo` | dato |
| Energía, interacción con el público y "un repertorio diseñado para mantener la pista en movimiento" | `citas[2]`, `_volcado.md` §6 ¶2 | dato |
| "Christian Delgado, fundador y director del proyecto." | `identidad.fundador` | dato_cliente |
| Pies de foto por instrumento (Keytar, Guitarra, Bajo, Octapad), sin nombres | `identidad.roles`, `identidad.integrantes_nombres` | dato / decision |

## Trayectoria

| Afirmación | Fuente | Tipo |
|---|---|---|
| "De Bogotá a México, Ecuador, Perú, Argentina y Chile." | `web.frases_propuestas` (Trayectoria) | dato |
| Las 15 ciudades de Colombia "y más" (tildes corregidas) | `musica.trayectoria_colombia` | dato |
| México, Ecuador, Perú, Argentina, Chile (sin ciudades ni años) | `musica.trayectoria_internacional`, `decisiones[7]` | dato |
| Festivales, eventos privados y sociales; presencia en radio y televisión | `musica.tipos_de_evento` | dato |

## Para organizadores

| Afirmación | Fuente | Tipo |
|---|---|---|
| Los 4 requerimientos básicos | `info_tecnica.requerimientos_basicos` | dato |
| Rider técnico de 5 puestos (erratas corregidas) | `info_tecnica.rider_tecnico` | dato |
| Stage plot: batería (octapad) atrás al centro, guitarra a la izquierda, bajo a la derecha, teclado y voz adelante | `info_tecnica.stage_plot` | dato |
| "Rider técnico y hospitality rider disponibles bajo solicitud." | `info_tecnica.riders`, `decisiones[13]` | dato |

## Contratación y contacto

| Afirmación | Fuente | Tipo |
|---|---|---|
| Afiche "SE BUSCA · CANTANDO O TOCANDO · RECOMPENSA EN EFECTIVO · $1,000,000" | `voz.humor_con_el_nombre` | dato |
| Christian Delgado · Manager / Dirección General | `presencia.contacto_booking` | dato |
| Correo y teléfono | `presencia.contacto_booking` (`privado.publicable`) | dato |
| WhatsApp con mensaje prellenado | `presencia.whatsapp_prellenado` | decision |
| "Visita nuestras redes" | `citas[6]` | dato |
| Instagram, TikTok, YouTube, Facebook y Spotify | `presencia.*` | dato |

## Textos funcionales sin contenido factual

No afirman nada sobre la banda, así que no necesitan fuente: "Contrata", "Contrata el show", "Escúchanos", "Escúchanos en Spotify", "Canal de YouTube", "Escuchar aquí", "Abrir en Spotify", "Ver en YouTube", "Lee la nota en Noticias RCN", "Dale play aquí mismo o síguenos en Spotify", "Así suena", "Colombia", "Internacional", "Requerimientos básicos", "Rider técnico", "Stage plot", "PÚBLICO", "Cotiza por WhatsApp", "Pide el rider por correo", "Saltar al contenido", "© 2026 Cumbia De+Lito", y las etiquetas del mapa de la tarima.

## Verificado como ausente

No hay en la página: agenda ni fechas de shows, testimonios, merch, letras, cifras de público o de streams, nombres de músicos contratados, fotos con invitados, material de Karol G o Vevo, "feat.", enlaces al álbum *Tropicoqueta*, menciones del Teatro Heredia, la anécdota de la grabación ni imágenes generadas.
