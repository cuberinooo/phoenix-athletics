// Gallery manifest. Order here is the display order.
// Photos: 4:5 WebP in two widths (800 for the grid, 1600 for the lightbox), in src/assets/hero.
// Videos: H.264 MP4 + 4:5 WebP poster, served from public/media/gallery (kept out of the JS bundle).

const photo = (slug, alt) => ({
  type: 'image',
  src: require(`../assets/hero/${slug}-800.webp`),
  srcLarge: require(`../assets/hero/${slug}-1600.webp`),
  alt,
});

const video = (slug, alt) => ({
  type: 'video',
  src: `${process.env.PUBLIC_URL}/media/gallery/${slug}.mp4`,
  poster: `${process.env.PUBLIC_URL}/media/gallery/${slug}-poster.webp`,
  alt,
});

export const galleryItems = [
  photo('01-team', {
    de: 'Das Phoenix-Athletics-Team gemeinsam in der Box',
    en: 'The Phoenix Athletics team together in the box',
  }),
  video('02-db-snatch-heat', {
    de: 'Dumbbell Snatches im Wettkampf-Heat',
    en: 'Dumbbell snatches during a competition heat',
  }),
  photo('03-ring-rows', {
    de: 'Ring Rows im Wettkampf, mit Judge an der Seite',
    en: 'Ring rows during the competition, judge alongside',
  }),
  photo('04-ulm-run', {
    de: 'Unser Team beim Stadtlauf vor dem Ulmer Münster',
    en: 'Our team at the city run in front of Ulm Minster',
  }),
  photo('05-finished', {
    de: 'Erschöpft, aber geschafft: nach dem Workout',
    en: 'Exhausted but done: right after the workout',
  }),
  photo('06-back-logo', {
    de: 'Phoenix-Athletics-Shirt von hinten',
    en: 'Phoenix Athletics shirt from behind',
  }),
  video('07-wall-sit', {
    de: 'Wall Sit mit Hantelscheibe - Daumen hoch trotz brennender Beine',
    en: 'Wall sit holding a plate - thumbs up despite burning legs',
  }),
  photo('08-crowd', {
    de: 'Zuschauerinnen und Zuschauer fiebern am Wettkampftag mit',
    en: 'Spectators cheering on competition day',
  }),
  photo('09-db-snatch', {
    de: 'Zwei Athleten beim Dumbbell Snatch',
    en: 'Two athletes doing dumbbell snatches',
  }),
  video('10-city-run', {
    de: 'Läuferinnen und Läufer beim Stadtlauf in Ulm',
    en: 'Runners at the Ulm city run',
  }),
  photo('11-toes-to-bar', {
    de: 'Toes to Bar an der Klimmzugstange',
    en: 'Toes to bar on the pull-up rig',
  }),
  photo('12-back-logo-2', {
    de: 'Phoenix-Athletics-Logo auf dem Trainingsshirt',
    en: 'Phoenix Athletics logo on the training shirt',
  }),
  photo('13-fun', {
    de: 'Spaß nach dem Training',
    en: 'Having fun after training',
  }),
  photo('14-podium', {
    de: 'Siegerehrung auf dem Podium',
    en: 'Award ceremony on the podium',
  }),
  video('15-partner-workout', {
    de: 'Partner-Workout mit viel Spaß',
    en: 'Partner workout with plenty of laughs',
  }),
  photo('16-community', {
    de: 'Die Phoenix-Community nach dem Workout',
    en: 'The Phoenix community after a workout',
  }),
];
