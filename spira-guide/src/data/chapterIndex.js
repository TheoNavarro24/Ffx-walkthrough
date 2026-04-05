export const chapters = [
  { slug: 'zanarkand',          name: 'Zanarkand',                    act: 1, navImage: 'img/locations/zanarkand.jpg' },
  { slug: 'baaj-temple',        name: 'Baaj Temple',                  act: 1, navImage: 'img/locations/baaj-temple.png' },
  { slug: 'besaid',             name: 'Besaid',                       act: 1, navImage: 'img/locations/besaid.jpg' },
  { slug: 'ss-liki',            name: 'S.S. Liki',                    act: 1, navImage: 'img/locations/ss-liki.png' },
  { slug: 'kilika',             name: 'Kilika',                       act: 1, navImage: 'img/locations/kilika.png' },
  { slug: 'ss-winno',           name: 'S.S. Winno',                   act: 1, navImage: 'img/locations/ss-winno.png' },
  { slug: 'luca',               name: 'Luca',                         act: 1, navImage: 'img/locations/luca.png' },
  { slug: 'miihen-highroad',    name: "Mi'ihen Highroad",             act: 2, navImage: 'img/locations/miihen-highroad.jpg' },
  { slug: 'mushroom-rock-road', name: 'Mushroom Rock Road',           act: 2, navImage: 'img/locations/mushroom-rock-road.png' },
  { slug: 'djose',              name: 'Djose',                        act: 2, navImage: 'img/locations/djose.jpg' },
  { slug: 'moonflow',           name: 'Moonflow',                     act: 2, navImage: 'img/locations/moonflow.jpg' },
  { slug: 'guadosalam',         name: 'Guadosalam',                   act: 2, navImage: 'img/locations/guadosalam.jpg' },
  { slug: 'thunder-plains',     name: 'Thunder Plains',               act: 2, navImage: 'img/locations/thunder-plains.jpg' },
  { slug: 'macalania-woods',    name: 'Macalania Woods',              act: 2, navImage: 'img/locations/macalania-woods.jpg' },
  { slug: 'lake-macalania',     name: 'Lake Macalania',               act: 2, navImage: 'img/locations/lake-macalania.jpg' },
  { slug: 'bikanel-desert',     name: 'Bikanel Desert',               act: 2, navImage: 'img/locations/bikanel-desert.jpg' },
  { slug: 'home',               name: 'Home',                         act: 3, navImage: 'img/locations/home.png' },
  { slug: 'airship',            name: 'Airship',                      act: 3, navImage: 'img/locations/airship.jpg' },
  { slug: 'bevelle',            name: 'Bevelle',                      act: 3, navImage: 'img/locations/bevelle.jpg' },
  { slug: 'via-purifico',       name: 'Via Purifico',                 act: 3, navImage: 'img/locations/via-purifico.png' },
  { slug: 'highbridge',         name: 'Highbridge',                   act: 4, navImage: 'img/locations/highbridge.jpg' },
  { slug: 'calm-lands',         name: 'Calm Lands',                   act: 4, navImage: 'img/locations/calm-lands.jpg' },
  { slug: 'mt-gagazet',         name: 'Mt. Gagazet',                  act: 4, navImage: 'img/locations/mt-gagazet.png' },
  { slug: 'zanarkand-dome',     name: 'Zanarkand Dome',               act: 4, navImage: 'img/locations/zanarkand-dome.jpg' },
  { slug: 'airship-sin',        name: 'Airship (En Route to Sin)',     act: 4, navImage: 'img/locations/airship-sin.png' },
  { slug: 'inside-sin',         name: 'Inside Sin',                   act: 4, navImage: 'img/locations/inside-sin.jpg' },
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
