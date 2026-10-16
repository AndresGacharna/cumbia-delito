export type StageMarkId =
  | 'propuesta' | 'musica' | 'colaboraciones' | 'historia'
  | 'show' | 'trayectoria' | 'organizadores' | 'contratacion';

export interface StageMark { id: StageMarkId; label: string; x: number; y: number }
// x, y: percent of the stage floor (0,0 = back-left, 100,100 = front-right, audience at the front).
export const stageMarks: StageMark[] = [
  { id: 'musica', label: 'Música', x: 50, y: 16 },
  { id: 'historia', label: 'Historia', x: 22, y: 24 },
  { id: 'trayectoria', label: 'Trayectoria', x: 78, y: 24 },
  { id: 'propuesta', label: 'La propuesta', x: 26, y: 52 },
  { id: 'show', label: 'El show', x: 50, y: 46 },
  { id: 'colaboraciones', label: 'Colaboraciones', x: 74, y: 52 },
  { id: 'organizadores', label: 'Organizadores', x: 16, y: 82 },
  { id: 'contratacion', label: 'Contratación', x: 50, y: 88 },
];

export const hero = {
  generos: 'Cumbia villera · cumbia urbana · Bogotá, Colombia',
  subtitulo: 'Tradición caribe colombiana + energía urbana latinoamericana.',
};

export const propuesta = {
  titulo: 'El grupo #1 de cumbia villera en Colombia.',
  parrafos: [
    'Cumbia De+Lito es un grupo colombiano. Su propuesta fusiona la cumbia villera y la cumbia urbana con el folclor de la costa atlántica colombiana, creando un sonido auténtico, fresco y altamente bailable.',
    'Con una identidad marcada por la energía festiva y la narrativa popular latinoamericana, el proyecto reinterpreta la tradición desde una mirada contemporánea, conectando raíces culturales con nuevos lenguajes sonoros.',
  ],
  sonido: [
    'Ritmos festivos y bailables.',
    'Influencia de la cumbia villera argentina.',
    'Base electrónica y percusión híbrida.',
    'Letras inspiradas en la cultura popular.',
    'Narrativa centrada en la mujer.',
  ],
};

export interface Single { titulo: string; anio: number; spotifyTrackId: string; diezAnios: boolean }
export const singles: Single[] = [
  { titulo: 'Cumbiando el Mundo', anio: 2025, spotifyTrackId: '2LxGPX8pds6awxsRLo3kxE', diezAnios: false },
  { titulo: 'La Rueda de la Cumbia', anio: 2022, spotifyTrackId: '5TDHnKfNF1xL7oUmBYPZ4Y', diezAnios: true },
  { titulo: 'La Famosa Banda', anio: 2022, spotifyTrackId: '4k9zkSRaV5NIS7RGbcRBTd', diezAnios: true },
  { titulo: 'Cumbia Cerveza y Mujer', anio: 2022, spotifyTrackId: '0BBn9asbdOC67y2t0QhW6p', diezAnios: true },
];

export const karolG = {
  texto: 'Junto a Karol G en «Cuando me muera te olvido» — La Premiere (2025).',
  youtubeId: 'LenBa0yOAus',
  startSeconds: 83,
  rcnUrl: 'https://www.noticiasrcn.com/tendencias/karol-g-y-cumbia-delito-cuando-me-muera-te-olvido-cancion-video-970301',
};

export interface Colaboracion { con: string; obra: string; youtubeId?: string; spotifyTrackId?: string }
export const colaboraciones: Colaboracion[] = [
  { con: 'Subcantante', obra: 'Eres Mi Cumbia', youtubeId: 'TKoP6RfIJV8', spotifyTrackId: '06y7Ldlvfrv7prurOtTxBE' },
  { con: 'Los Varriletes', obra: 'Pibe Ganador', spotifyTrackId: '7b4Ya5LYOZWxsRAJClyooR' },
  { con: 'Los Pibes Del Penal', obra: 'Amor a escondidas', youtubeId: '4KgEM-KdnyM' },
];

export const historia = {
  titulo: 'Con antecedentes desde 2012.',
  parrafos: [
    'Cumbia De+Lito nace en 2012 por iniciativa de Christian Delgado, tras su recorrido por diversas agrupaciones en Bogotá. A partir de esa experiencia, el proyecto toma forma como una propuesta innovadora que busca renovar la cumbia desde una perspectiva urbana y actual.',
    'Con el tiempo, la agrupación consolida un estilo propio que integra la fuerza de la cumbia villera, el groove urbano y los elementos tradicionales del folclor atlántico colombiano. Su música, inspirada en situaciones populares y costumbres latinoamericanas, tiene como eje central la figura femenina dentro de su narrativa artística.',
  ],
  // Low prominence by client decision: render smaller than the other paragraphs.
  productor:
    'En su proceso de expansión nacional e internacional, el proyecto trabaja junto al productor argentino Gustavo Coronel, reconocido por su trabajo con referentes de la escena latinoamericana como Damas Gratis, Los Ángeles Azules, Los Márquez, El Combo Loco, El Plan Chala, Jimmy y su Combo Negro y Los Geddes.',
};

export const show = {
  titulo: 'Un show que viaja: la formación se arma según el destino.',
  parrafos: [
    'El show en vivo de Cumbia De+Lito está conformado por 4 músicos en escena y un equipo técnico de 3 personas, garantizando una puesta en escena sólida, dinámica y profesional.',
    'La agrupación ofrece un espectáculo cargado de energía, interacción con el público y un repertorio diseñado para mantener la pista en movimiento.',
  ],
  director: 'Christian Delgado, fundador y director del proyecto.',
};

export const trayectoria = {
  titulo: 'Cumbiando el mundo.',
  colombia: ['Bogotá', 'Mosquera', 'Villeta', 'Barranquilla', 'Cartagena', 'Tuluá', 'Ibagué', 'Medellín', 'Manizales', 'Pasto', 'Nariño', 'Bucaramanga', 'Girón', 'Piedecuesta', 'Cúcuta'],
  colombiaCierre: 'y más',
  internacional: ['México', 'Ecuador', 'Perú', 'Argentina', 'Chile'],
  eventos:
    'El proyecto ha participado en festivales, eventos privados y eventos de carácter social, además de contar con presencia en emisoras radiales y canales de televisión en los países donde se ha presentado.',
};

// Stable id for a place name ("Tuluá" -> "tulua"), shared by the map pins and the list.
export const lugarId = (name: string): string =>
  name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// [longitude, latitude] for the Trayectoria map. Cities are pinned on the town itself;
// countries on an inland point, since the EPK publishes no cities abroad.
export const trayectoriaCoords: Record<string, [number, number]> = {
  'Bogotá': [-74.0721, 4.711],
  // Mosquera, Cundinamarca (next to Bogotá), the reading that fits the band's base.
  'Mosquera': [-74.2302, 4.7059],
  'Villeta': [-74.4706, 5.0128],
  'Barranquilla': [-74.7813, 10.9685],
  'Cartagena': [-75.4794, 10.391],
  'Tuluá': [-76.1954, 4.0847],
  'Ibagué': [-75.2322, 4.4389],
  'Medellín': [-75.5812, 6.2442],
  'Manizales': [-75.5138, 5.0703],
  'Pasto': [-77.2811, 1.2136],
  // Ambiguous in the EPK (brief.json, hallazgo 7): pinned on the municipality of Nariño, Nariño.
  'Nariño': [-77.3594, 1.2883],
  'Bucaramanga': [-73.1227, 7.1193],
  'Girón': [-73.1698, 7.0682],
  'Piedecuesta': [-73.0503, 6.9886],
  'Cúcuta': [-72.5078, 7.8939],
  'Colombia': [-71.6, 2.6],
  'México': [-102.5, 23.9],
  'Ecuador': [-78.3, -1.4],
  'Perú': [-75.0, -9.6],
  'Argentina': [-65.0, -35.0],
  'Chile': [-71.0, -31.5],
};

export const organizadores = {
  titulo: 'Para organizadores',
  requerimientos: [
    'Sistema de sonido profesional.',
    'Monitores en escenario.',
    'Espacio para 4 músicos.',
    'Conexiones eléctricas adecuadas.',
  ],
  riders: 'Rider técnico y hospitality rider disponibles bajo solicitud.',
  rider: [
    { n: 1, puesto: 'Voz Líder', instrumento: 'Teclados', requerimientos: 'Micrófono vocal Shure Beta 58, 1 línea mono plug a plug teclado', base: 'Base micrófono' },
    { n: 2, puesto: 'Guitarrista', instrumento: 'Guitarra / Coros', requerimientos: '1 línea plug a plug / micrófono vocal', base: 'Base micrófono' },
    { n: 3, puesto: 'Bajista', instrumento: 'Bajo / Coros', requerimientos: '1 caja de paso - 1 línea plug a plug - 1 cable canon amplificador para bajo - micrófono vocal', base: 'Base micrófono' },
    { n: 4, puesto: 'Timbalero', instrumento: 'Timbal electrónico (octapad)', requerimientos: '2 líneas mono plug a plug', base: 'Base platillo' },
    { n: 5, puesto: 'Baterista', instrumento: 'Batería electrónica (octapad)', requerimientos: '2 líneas mono plug a plug', base: 'Base platillo' },
  ],
  stagePlot: {
    atrasCentro: 'Batería eléctrica (octapad)',
    izquierda: 'Guitarra eléctrica',
    derecha: 'Bajo',
    adelanteCentro: ['Teclado', 'Voz principal'],
  },
};

export const contratacion = {
  afiche: { titulo: 'SE BUSCA', linea1: 'CANTANDO O TOCANDO', linea2: 'RECOMPENSA EN EFECTIVO', monto: '$1,000,000' },
  contacto: { nombre: 'Christian Delgado', cargo: 'Manager / Dirección General' },
  redes: 'Visita nuestras redes',
};
