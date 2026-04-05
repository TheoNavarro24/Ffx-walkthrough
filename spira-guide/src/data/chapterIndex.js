export const chapters = [
  { slug: 'zanarkand',          name: 'Zanarkand',                    act: 1, mapImage: '/img/maps/regions/zanarkand/zanarkand.png' },
  { slug: 'baaj-temple',        name: 'Baaj Temple',                  act: 1, mapImage: '/img/maps/regions/baaj-temple/baaj-temple.png' },
  { slug: 'besaid',             name: 'Besaid',                       act: 1, mapImage: '/img/maps/regions/besaid/besaid.png' },
  { slug: 'ss-liki',            name: 'S.S. Liki',                    act: 1, mapImage: '/img/maps/regions/ss-liki/ss-liki.png' },
  { slug: 'kilika',             name: 'Kilika',                       act: 1, mapImage: '/img/maps/regions/kilika/kilika.png' },
  { slug: 'ss-winno',           name: 'S.S. Winno',                   act: 1, mapImage: '/img/maps/regions/ss-winno/ss-winno.png' },
  { slug: 'luca',               name: 'Luca',                         act: 1, mapImage: '/img/maps/regions/luca/luca.png' },
  { slug: 'miihen-highroad',    name: "Mi'ihen Highroad",             act: 2, mapImage: '/img/maps/regions/miihen-highroad/miihen-highroad.png' },
  { slug: 'mushroom-rock-road', name: 'Mushroom Rock Road',           act: 2, mapImage: '/img/maps/regions/mushroom-rock-road/mushroom-rock-road.png' },
  { slug: 'djose',              name: 'Djose',                        act: 2, mapImage: '/img/maps/regions/djose/djose.png' },
  { slug: 'moonflow',           name: 'Moonflow',                     act: 2, mapImage: '/img/maps/regions/moonflow/moonflow.png' },
  { slug: 'guadosalam',         name: 'Guadosalam',                   act: 2, mapImage: '/img/maps/regions/guadosalam/guadosalam.png' },
  { slug: 'thunder-plains',     name: 'Thunder Plains',               act: 2, mapImage: '/img/maps/regions/thunder-plains/thunder-plains.png' },
  { slug: 'macalania-woods',    name: 'Macalania Woods',              act: 2, mapImage: '/img/maps/regions/macalania-woods/macalania-woods.png' },
  { slug: 'lake-macalania',     name: 'Lake Macalania',               act: 2, mapImage: '/img/maps/regions/lake-macalania/lake-macalania.png' },
  { slug: 'bikanel-desert',     name: 'Bikanel Desert',               act: 2, mapImage: '/img/maps/regions/bikanel-desert/bikanel-desert.png' },
  { slug: 'home',               name: 'Home',                         act: 3, mapImage: '/img/maps/regions/home/home.png' },
  { slug: 'airship',            name: 'Airship',                      act: 3, mapImage: '/img/maps/regions/airship/airship.png' },
  { slug: 'bevelle',            name: 'Bevelle',                      act: 3, mapImage: '/img/maps/regions/bevelle/bevelle.png' },
  { slug: 'via-purifico',       name: 'Via Purifico',                 act: 3, mapImage: '/img/maps/regions/via-purifico/via-purifico.png' },
  { slug: 'highbridge',         name: 'Highbridge',                   act: 4, mapImage: '/img/maps/regions/highbridge/highbridge.png' },
  { slug: 'calm-lands',         name: 'Calm Lands',                   act: 4, mapImage: '/img/maps/regions/calm-lands/calm-lands.png' },
  { slug: 'mt-gagazet',         name: 'Mt. Gagazet',                  act: 4, mapImage: '/img/maps/regions/mt-gagazet/mt-gagazet.png' },
  { slug: 'zanarkand-dome',     name: 'Zanarkand Dome',               act: 4, mapImage: '/img/maps/regions/zanarkand-dome/zanarkand-dome.png' },
  { slug: 'airship-sin',        name: 'Airship (En Route to Sin)',     act: 4, mapImage: '/img/maps/regions/airship-sin/airship-sin.png' },
  { slug: 'inside-sin',         name: 'Inside Sin',                   act: 4, mapImage: '/img/maps/regions/inside-sin/inside-sin.png' },
]

export function getChapterBySlug(slug) {
  return chapters.find((ch) => ch.slug === slug)
}

export const ACT_NAMES = {
  1: 'Act 1: Zanarkand → Luca',
  2: "Act 2: Mi'ihen → Bikanel Desert",
  3: 'Act 3: Home → Via Purifico',
  4: 'Act 4: Highbridge → Inside Sin',
}

export function getChaptersByAct(act) {
  return chapters.filter((ch) => ch.act === act)
}
