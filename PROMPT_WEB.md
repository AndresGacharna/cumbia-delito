# Encargo: página oficial de Cumbia De+Lito

Vas a diseñar y construir la página oficial de **Cumbia De+Lito**, un proyecto colombiano de cumbia villera, usando la skill **Impeccable**. Es una landing de una sola página, así que el modo de Impeccable es **Persuade**.

Trabaja como lo haría un director de diseño premiado: con punto de vista, sin plantillas y con la verdad como límite. Respeta los pases de verificación acotados de Impeccable y no entres en bucles de autorrevisión.

---

## 1. Fuentes de verdad (léelas completas antes de preguntarme nada)

| Archivo | Para qué |
|---|---|
| `brief/brief.json` | Fuente estructurada. **Manda sobre todo lo demás.** |
| `brief/brief.md` | La misma información explicada. La sección 6 tiene las decisiones cerradas. |
| `brief/_volcado.md` | El texto literal del EPK, para citar sin errores. |
| `brief/assets/ref_*.jpg` | Capturas del EPK original. Son la referencia del mundo visual. |
| `brief/assets/logo_*.png`, `afiche_se_busca.png` | Recortes de referencia del logo y del afiche. |
| `imagenes/` | **Fotos y logos originales. Es la única fuente de imágenes para publicar.** |

**Regla de verdad:**
- Se publica como hecho solo lo que en `brief.json` tenga `tipo` igual a `dato`, `dato_cliente`, `dato_web` o `decision`.
- `interpretacion` es guía de tono y diseño, nunca una afirmación que se publique.
- `falta` no se rellena jamás: ni con placeholders creíbles, ni con "lorem", ni con datos inventados.

---

## 2. Contexto para `/impeccable init` (escribe PRODUCT.md con esto)

Si no existe `PRODUCT.md`, corre init usando esta sección y `brief/`. Pregúntame solo lo que no esté aquí, en una sola ronda como máximo.

- **Platform:** web.
- **Stack** (respuesta mía, no delegada):
  - **Astro con salida 100 % estática** (`dist/`), sin frameworks de UI en el cliente salvo que algo lo exija.
  - CSS propio.
  - Imágenes optimizadas con `astro:assets` (AVIF/WebP, `srcset`).
  - Fuentes servidas desde el propio proyecto, no desde fonts.googleapis.com.
  - El despliegue lo hago yo. El sitio solo tiene que poder servirse como estático en cualquier hosting.
- **Build path** (si te pregunta comp-first o code-first): **code-first**. Las fotos son reales y no quiero imágenes generadas que las sustituyan.
- **Users:** hay dos públicos con el mismo peso.
  - El **organizador**: festivales, eventos privados y eventos sociales, en Colombia o en el exterior. Decide si contrata el show y escribe por WhatsApp.
  - El **fan** de la cumbia villera y la cumbia argentina en Colombia. Quiere escuchar, ver y seguir.
  - **Interpretación, márcala como tal en PRODUCT.md:** la mayoría llegará desde el celular, por el link de Instagram o TikTok.
- **Product Purpose:** que contraten el show y que escuchen la música, con el mismo peso `[CLIENTE-1]`.
- **Positioning:**
  - Desde 2012, el proyecto de Christian Delgado cruza la cumbia villera argentina con el folclor de la costa atlántica colombiana: "Tradición caribe colombiana + energía urbana latinoamericana."
  - Participó junto a Karol G en «Cuando me muera te olvido» dentro del especial *La Premiere* (2025).
  - La formación se arma según el destino.
- **Brand Commitments (vinculantes):** los de la sección 3.
- **Evidence on Hand:**
  - 4 sencillos y 4 colaboraciones verificadas.
  - El video oficial de *La Premiere* y la nota de Noticias RCN.
  - 15 ciudades de Colombia y 5 países.
  - Ficha técnica, rider y stage plot.
  - Fotos reales en `imagenes/`.
- **Ausencias que nadie debe fabricar:**
  - Testimonios.
  - Agenda o fechas.
  - Nombres de medios, de festivales o de los músicos contratados.
  - Fotos con Karol G.
  - Cifras de público o de streams.
  - Merch.
  - Letras.
- **Product Principles:**
  1. La pista manda: todo empuja a bailar o a contratar.
  2. Probar, no proclamar: cada credencial se muestra con su fuente.
  3. Su voz es la del barrio, no la de una agencia.
  4. El "+" es la fusión.
- **Accessibility:** WCAG 2.2 AA, `prefers-reduced-motion` respetado y todo el contenido en español (`lang="es-CO"`).

---

## 3. Mundo visual: marca establecida, se hereda y se amplía (no se reemplaza)

El EPK de la banda ya define una identidad coherente. Para Impeccable es un **mundo establecido o una marca incompleta**: preserva sus rasgos reconocibles y amplíalos para la web. **No es un rediseño.** Antes de proponer nada, mira `brief/assets/ref_epk_completo_preview.jpg`, `ref_header_epk.jpg`, `ref_portadas_canciones.jpg` y `ref_colaboraciones.jpg`.

**Fijado por la marca (no se negocia):**

- **Nombre visible:** "Cumbia De+Lito", siempre así. Se escribe "CUMBIA DE+LITO" solo cuando el estilo tipográfico vaya en mayúsculas. "Cumbia Delito" va solo en metadatos de SEO, nunca en el texto visible. **No expliques** qué significa el "+" ni "Lito".
- **Logo:** script de pincel blanca con el **"+" en rojo**. Hay versión neón. Usa el archivo original de `imagenes/` si existe y no lo redibujes. Si solo tienes el recorte de referencia, avísame antes de vectorizarlo.
- **Paleta base:**
  - Azul marino `#151931` / `#0D1121`
  - Rojo ladrillo `#721D1F`
  - Gris ladrillo `#8B8D95`
  - Rojo acento `#DA291C` (el del "+"), que también es el color de los CTA
  - Rojo de las portadas `#F41821`
  - Blanco
- **Materiales del mundo:**
  - Muro de ladrillo en franjas curvas de azul, rojo y gris.
  - Chorreados de aerosol y grafiti en plantilla.
  - Polaroids pegadas con cinta para fotos y portadas.
  - Hojas de cuaderno cuadriculado y rayado, y papel arrugado, para textos.
  - Afiche envejecido de "SE BUSCA · CANTANDO O TOCANDO · RECOMPENSA EN EFECTIVO · $1,000,000".
  - Letrero de neón.
- **Ícono:** el keytar blanco.
- **El "+" rojo como recurso gráfico recurrente:** separadores, marcadores, microinteracciones. Es la "suma" de los dos mundos.
- **Títulos:** sans geométrica gruesa en mayúsculas con tracking amplio. En el EPK es Gotham, que necesita licencia web. Si no está en `imagenes/` o en `fonts/` con licencia, elige otra cara con carácter que dialogue con la letra de cartel callejero y evita la lista de caras reflejo de Impeccable.

**Libre para ti:** la composición, el recorrido de scroll, el movimiento, la tipografía de texto, la elección de la cara de títulos dentro de lo anterior y cómo el muro de ladrillo vive en la web (no tiene que ser una textura en todo el fondo).

**Riesgo a evitar:** "oscuro con acento neón" es uno de los looks saturados de la IA. Aquí está justificado por la marca, pero tiene que sentirse de esta banda gracias al ladrillo, el papel, la cinta y el aerosol, no por brillos genéricos. Nada de glassmorphism, gradientes morado-azul ni tarjetas anidadas.

---

## 4. Contenido de la página

Escribe en español de Colombia, tuteando. Usa el registro **popular y pícaro** en el hero, los titulares y los CTA, y el registro **institucional del EPK** solo en la zona para organizadores. Cita textual siempre que puedas y corrige erratas obvias (Tuluá, Ibagué, presiónalo, Líder, Batería, "timbal electrónico", "octapad").

### Llamados a la acción

Hay dos CTA con el mismo peso, los dos visibles en la primera pantalla de móvil y de escritorio. La contratación tiene que estar siempre a un toque.

- **"Contrata el show"** abre WhatsApp con el mensaje prellenado, tal cual:
  `https://wa.me/573144817052?text=Hola%20Christian%2C%20vi%20la%20p%C3%A1gina%20de%20Cumbia%20De%2BLito%20y%20quiero%20cotizar%20un%20show.%20Fecha%3A%20%20%7C%20Ciudad%3A%20%20%7C%20Tipo%20de%20evento%3A%20`
- **"Escúchanos"** lleva a `https://open.spotify.com/artist/6ektyhX4BfvzDIMmy5IQX8`.
- **Secundarios:**
  - Instagram: `https://www.instagram.com/cumbiadelito`
  - TikTok: `https://www.tiktok.com/@cumbiadelito`
  - YouTube: `https://www.youtube.com/@cumbiadelito282`
  - Facebook: `https://www.facebook.com/CUMBIADELITOCOLOMBIA`
  - Correo: `mailto:cumbiadelito@gmail.com`
- **"Descarga el EPK":** solo si existe `descargas/` con un PDF de menos de 10 MB. Si no existe, no pongas el botón.

### Secciones (el orden y la forma los decides tú; el contenido es este)

1. **Primera pantalla.**
   - El logo.
   - "Cumbia villera · cumbia urbana · Bogotá, Colombia".
   - Subtítulo (cita): "Tradición caribe colombiana + energía urbana latinoamericana."
   - Los dos CTA.
   - La mejor foto de tarima de `imagenes/`.
   - Prueba de memoria: quien se vaya tras ver solo esta pantalla debe poder decir qué es esto, cómo suena y cómo se contrata.
2. **La propuesta.**
   - `[EPK·Propuesta¶1–2]` y `[EPK·Sonido]`: concepto y características del sonido.
   - Frase disponible: "Cumbia villera con sabor a costa atlántica."
3. **Música.**
   - Los 4 sencillos como embeds de Spotify, cargados en diferido:
     - *Cumbiando el Mundo* (2025): `https://open.spotify.com/embed/track/2LxGPX8pds6awxsRLo3kxE`
     - *La Rueda de la Cumbia* (2022): `https://open.spotify.com/embed/track/5TDHnKfNF1xL7oUmBYPZ4Y`
     - *La Famosa Banda* (2022): `https://open.spotify.com/embed/track/4k9zkSRaV5NIS7RGbcRBTd`
     - *Cumbia Cerveza y Mujer* (2022): `https://open.spotify.com/embed/track/0BBn9asbdOC67y2t0QhW6p`
   - Las portadas de 2022 llevan "10 AÑOS". Muéstralas tal cual, sin afirmar nada más.
4. **Colaboraciones.** Es la franja de credenciales.
   - **Karol G** (la credencial principal):
     - Texto exacto: "Junto a Karol G en «Cuando me muera te olvido» — La Premiere (2025)."
     - Prueba: el video oficial (`https://www.youtube-nocookie.com/embed/LenBa0yOAus?start=83`) y un link a la nota de Noticias RCN (`https://www.noticiasrcn.com/tendencias/karol-g-y-cumbia-delito-cuando-me-muera-te-olvido-cancion-video-970301`).
     - No hay fotos con ella y no se usan portadas, capturas ni imágenes suyas.
     - Prohibido "feat.", enlazar al track del álbum *Tropicoqueta*, mencionar el Teatro Heredia o contar cualquier anécdota de la grabación.
   - **Subcantante:** *Eres Mi Cumbia*. Video oficial `https://www.youtube-nocookie.com/embed/TKoP6RfIJV8` y Spotify `https://open.spotify.com/embed/track/06y7Ldlvfrv7prurOtTxBE`.
   - **Los Varriletes:** *Pibe Ganador*, en `https://open.spotify.com/embed/track/7b4Ya5LYOZWxsRAJClyooR`. La portada lleva las banderas de Argentina y Colombia.
   - **Los Pibes Del Penal:** *Amor a escondidas*, en `https://www.youtube-nocookie.com/embed/4KgEM-KdnyM`. Escribe el nombre así.
   - **Videos:** usa una fachada liviana que cargue el iframe al hacer clic. La fachada puede mostrar la miniatura oficial que sirve YouTube (`i.ytimg.com`), pero no descargues ni recortes capturas. Si un video no permite insertarse, usa una tarjeta que enlace a YouTube.
5. **Historia.**
   - Nace en 2012 por iniciativa de Christian Delgado, "tras su recorrido por diversas agrupaciones en Bogotá", para "renovar la cumbia desde una perspectiva urbana y actual" `[EPK·Historia]`.
   - El productor argentino Gustavo Coronel va en el texto de Historia, con baja prominencia y como lo dice el EPK.
   - Frase disponible: "Cumbiando el mundo desde 2012."
6. **El show.**
   - 4 músicos en escena y un equipo técnico de 3 personas.
   - "Un repertorio diseñado para mantener la pista en movimiento" e "interacción con el público".
   - La formación se arma según el destino `[CLIENTE-3]`. Frase disponible: "Un show que viaja: la formación se arma según el destino."
   - **Sin nombres de músicos.** Christian Delgado es el fundador y director.
7. **Trayectoria.**
   - Colombia: Bogotá, Mosquera, Villeta, Barranquilla, Cartagena, Tuluá, Ibagué, Medellín, Manizales, Pasto, Nariño, Bucaramanga, Girón, Piedecuesta, Cúcuta "y más".
   - Internacional: México, Ecuador, Perú, Argentina y Chile.
   - Festivales, eventos privados y eventos sociales.
   - Sin fechas ni nombres de eventos.
8. **Para organizadores** (registro institucional).
   - Requerimientos básicos.
   - Rider técnico como tabla accesible: los 5 puestos de `brief.json → info_tecnica.rider_tecnico`.
   - Stage plot como esquema sencillo de posiciones hecho en HTML/CSS (no como ilustración).
   - "Rider técnico y hospitality rider disponibles bajo solicitud".
9. **Contratación y cierre.**
   - El guiño "SE BUSCA · CANTANDO O TOCANDO" recreado con el material del afiche, sin armas, violencia ni drogas.
   - CTA de WhatsApp.
   - "Christian Delgado · Manager / Dirección General".
   - Correo y redes.

**No incluyas** agenda, merch, testimonios, contadores ni secciones vacías "próximamente".

---

## 5. Imágenes

1. Haz un inventario de `imagenes/`. Mira cada archivo y clasifícalo: tarima, retrato, grupo, logo, portada u otro.
2. **Descarta:**
   - Fotos donde aparezcan personas que no son de la banda o invitados sin identificar.
   - Cualquier cosa de Karol G o de Vevo.
   - Marcas de terceros en primer plano.
   - Fotos que no tengan la calidad para el tamaño al que se van a mostrar.
3. **Usa solo fotos reales.** Prohibido generar o "mejorar" con IA imágenes de personas, de la banda, de shows o de portadas. Sí puedes crear texturas o materiales (ladrillo, papel, cinta, aerosol) en CSS o como recursos propios.
4. No asumas quién es quién. Nombra a Christian Delgado en un `alt` o en un pie de foto solo si el nombre del archivo lo identifica (por ejemplo, `christian-*.jpg`).
5. **Optimiza:**
   - AVIF/WebP con `srcset`.
   - `width` y `height` explícitos.
   - `loading="lazy"` debajo del primer viewport.
   - La imagen del hero, priorizada.
   - `alt` descriptivo en español.
6. Ignora `brief/assets/` para publicar: son recortes de baja resolución que sirven solo como referencia.
7. Al terminar, dime qué imágenes faltan o no alcanzaron la calidad necesaria.

---

## 6. Técnico

- **Configuración del sitio:** constante `SITE_URL` en un solo lugar del config. Si no te la doy, deja `https://cumbiadelito.com` marcado con `TODO` (el dominio no está confirmado).
- **`<title>`:** "Cumbia De+Lito · Cumbia villera desde Bogotá".
- **Meta description:** de unos 150 caracteres. Debe incluir "Cumbia Delito" una vez, de forma natural.
- **Open Graph y Twitter:** imagen de 1200×630 compuesta con una foto real y el logo.
- **JSON-LD `MusicGroup`:**
  - `name`: "Cumbia De+Lito"
  - `alternateName`: ["Cumbia Delito", "CUMBIA DE+LITO"]
  - `foundingDate`: "2012"
  - `foundingLocation`: Bogotá, Colombia
  - `genre`: ["Cumbia villera", "Cumbia urbana"]
  - `founder`: Christian Delgado
  - `sameAs`: las redes y Spotify
  - Nada que no esté en el brief.
- **Favicon:** a partir del "+" rojo o del logo.
- **Rendimiento (objetivo):** Lighthouse móvil de 90 o más en rendimiento, accesibilidad, buenas prácticas y SEO; LCP por debajo de 2,5 s. Los embeds de Spotify y YouTube no deben bloquear la carga.
- **Accesibilidad:**
  - Contraste AA.
  - Foco visible.
  - Navegación por teclado.
  - Movimiento reducido con `prefers-reduced-motion`.
  - Logo con `alt="Cumbia De+Lito"`.
  - La tabla del rider con `<th scope>`.
- **Sin analítica ni cookies de terceros.** Usa `youtube-nocookie.com`.

---

## 7. Proceso con Impeccable

1. **Init:** si falta `PRODUCT.md`, ejecuta `init` con la sección 2.
2. **Nuevo trabajo:** modo **Persuade**, dentro del mundo de la sección 3. Si Impeccable propone direcciones o estructuras en la página de decisión, preséntamelas y elijo yo. Si alguna propuesta reemplaza la identidad del EPK en vez de ampliarla, descártala por motivos de producto: viola un compromiso de marca.
3. **Construcción:** code-first, con el contrato de dirección completo en la surface brief.
4. **Cierre:**
   - Revisión de cierre con el revisor de Impeccable (subagente fresco).
   - `DESIGN.md` escrito desde lo construido.
   - `npx impeccable detect` o el detector del hook, sin hallazgos mecánicos pendientes.
5. **Trazabilidad:** escribe `brief/trazabilidad.md`, fuera del sitio y nunca dentro de `src/` ni de `public/`. Debe tener una tabla con cada afirmación factual que aparece en la página (fechas, nombres, cifras, ciudades, colaboraciones, citas) y su fuente en `brief.json`. Si una frase no tiene fuente, se elimina de la página.

---

## 8. Definición de terminado

- [ ] Quien vea solo la primera pantalla sabe qué es, cómo suena y cómo contratar, en móvil (390 px) y en escritorio (1440 px).
- [ ] "Contrata el show" abre WhatsApp con el mensaje prellenado y "Escúchanos" abre Spotify.
- [ ] Están los 4 sencillos y las 4 colaboraciones con su prueba. La de Karol G cumple todas las prohibiciones.
- [ ] La única forma visible del nombre es "Cumbia De+Lito" (o en mayúsculas) y "Cumbia Delito" solo está en metadatos.
- [ ] No hay nombres de músicos contratados, fotos de invitados, material de Karol G o Vevo, imágenes generadas de personas, agenda, merch, testimonios ni cifras.
- [ ] La paleta, el logo, el "+" y los materiales del EPK se reconocen sin leer el texto.
- [ ] `brief/trazabilidad.md` está completo y sin frases huérfanas.
- [ ] El resultado de la revisión de cierre y `DESIGN.md` están entregados.
- [ ] Hay una lista de lo que yo debo aportar o confirmar (dominio, fotos que faltan, licencia de fuente).
