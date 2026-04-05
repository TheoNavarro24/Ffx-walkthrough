import zanarkandData from './chapters/zanarkand.json' with { type: 'json' }
import baajTempleData from './chapters/baaj-temple.json' with { type: 'json' }
import besaidData from './chapters/besaid.json' with { type: 'json' }
import ssLikiData from './chapters/ss-liki.json' with { type: 'json' }
import kilikaData from './chapters/kilika.json' with { type: 'json' }
import ssWinnoData from './chapters/ss-winno.json' with { type: 'json' }
import lucaData from './chapters/luca.json' with { type: 'json' }
import miihenHighroadData from './chapters/miihen-highroad.json' with { type: 'json' }
import mushroomRockRoadData from './chapters/mushroom-rock-road.json' with { type: 'json' }
import djoseData from './chapters/djose.json' with { type: 'json' }
import moonflowData from './chapters/moonflow.json' with { type: 'json' }
import guadosalamData from './chapters/guadosalam.json' with { type: 'json' }
import thunderPlainsData from './chapters/thunder-plains.json' with { type: 'json' }
import macalaniaWoodsData from './chapters/macalania-woods.json' with { type: 'json' }
import lakeMacalaniaData from './chapters/lake-macalania.json' with { type: 'json' }
import bikanelDesertData from './chapters/bikanel-desert.json' with { type: 'json' }
import homeData from './chapters/home.json' with { type: 'json' }
import airshipData from './chapters/airship.json' with { type: 'json' }
import bevelleData from './chapters/bevelle.json' with { type: 'json' }
import viaPurificoData from './chapters/via-purifico.json' with { type: 'json' }
import highbridgeData from './chapters/highbridge.json' with { type: 'json' }
import calmLandsData from './chapters/calm-lands.json' with { type: 'json' }
import mtGagazetData from './chapters/mt-gagazet.json' with { type: 'json' }
import zanarkandDomeData from './chapters/zanarkand-dome.json' with { type: 'json' }
import airshipSinData from './chapters/airship-sin.json' with { type: 'json' }
import insideSinData from './chapters/inside-sin.json' with { type: 'json' }

const chapters = {
  zanarkand: zanarkandData,
  'baaj-temple': baajTempleData,
  besaid: besaidData,
  'ss-liki': ssLikiData,
  kilika: kilikaData,
  'ss-winno': ssWinnoData,
  luca: lucaData,
  'miihen-highroad': miihenHighroadData,
  'mushroom-rock-road': mushroomRockRoadData,
  djose: djoseData,
  moonflow: moonflowData,
  guadosalam: guadosalamData,
  'thunder-plains': thunderPlainsData,
  'macalania-woods': macalaniaWoodsData,
  'lake-macalania': lakeMacalaniaData,
  'bikanel-desert': bikanelDesertData,
  home: homeData,
  airship: airshipData,
  bevelle: bevelleData,
  'via-purifico': viaPurificoData,
  highbridge: highbridgeData,
  'calm-lands': calmLandsData,
  'mt-gagazet': mtGagazetData,
  'zanarkand-dome': zanarkandDomeData,
  'airship-sin': airshipSinData,
  'inside-sin': insideSinData,
}

const EMPTY_CHAPTER = {
  missables: [],
  party: [],
  oaka: null,
  sgTip: null,
  subLocations: [],
  bosses: [],
  cloister: null,
  optionalAreas: [],
}

export function getChapterData(slug) {
  return chapters[slug] ?? { ...EMPTY_CHAPTER, slug }
}
