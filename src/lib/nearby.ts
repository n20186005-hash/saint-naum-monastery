import { nearbyPlaces as legacyPlaces } from './nearbyLegacy';
import { nearbyExtra } from './nearbyExtra';
import content from '@/content/nearby.json';
import lake from '@/content/lake-ohrid.json';
import visitorInfo from '@/content/nearby-visitor-info.json';
import detailContent from '@/content/nearby-details.json';
import photos from '@/content/nearby-photos.json';
import type { Locale } from '@/i18n/routing';

export const groups = {
  south: { en: 'Southeastern lakeshore', zh: '东南湖岸' },
  city: { en: 'Ohrid old town and waterfront', zh: '奥赫里德老城与湖滨' },
  park: { en: 'Galičica and Lake Prespa', zh: '加利奇察与普雷斯帕湖' },
  west: { en: 'Struga and the western shore', zh: '斯特鲁加与湖西岸' },
  albania: { en: 'Albanian lakeshore', zh: '阿尔巴尼亚湖岸' },
};

type Group = keyof typeof groups;
type LocalText = Record<Locale, string>;
type Source = LocalText & { url: string };
type LocalDetails = {
  history: string;
  observation: string;
  tip: string;
  routeSteps: string[];
  manager?: string;
};
type Photo = { path: string; page: string; artist: string; license: string; licenseUrl: string; alt?: LocalText };
type Visit = {
  group: Group;
  kind: string;
  map: string;
  en: { location: string; route: string; view: string };
  zh: { location: string; route: string; view: string };
  operator?: LocalText;
};

const visitDetails: Record<string, Visit> = {
  'saint-naum-springs': {
    group: 'south', kind: 'park', map: 'Springs of Saint Naum, Ljubaništa, North Macedonia',
    en: { location: 'Saint Naum visitor complex, Ljubaništa', route: 'From the monastery precinct, follow the signed footpath toward the spring boat landing.', view: 'Look for reflected branches from the bank and keep footpaths clear.' },
    zh: { location: '柳巴尼什塔圣瑙姆游客区', route: '从修道院沿标示步行至泉群划艇登船处。', view: '从岸边拍树枝倒影，并保持步道畅通。' },
  },
  'bay-of-bones': {
    group: 'south', kind: 'museum', map: 'Bay of Bones Museum on Water, Gradište, North Macedonia',
    operator: { en: 'National Institution for Protection of Monuments of Culture and Museum – Ohrid', zh: '奥赫里德文化古迹保护研究所与博物馆' },
    en: { location: 'Gradište, south of Peštani, on the Ohrid–Saint Naum road', route: 'Use the signed Museum on Water turnoff from the east-shore road. For a cruise stop, confirm that museum admission is included or available separately.', view: 'From the shore, frame the raised huts, timber piles and footbridge together.' },
    zh: { location: '佩什塔尼以南格拉迪什特，奥赫里德至圣瑙姆公路旁', route: '从东岸公路按水上博物馆标示驶入。若乘游船到访，先核实船票是否含门票。', view: '从岸上同时拍高脚茅屋、木桩和连接栈桥。' },
  },
  'galicica-national-park': {
    group: 'park', kind: 'park', map: 'Galičica National Park, North Macedonia',
    en: { location: 'Between Lake Ohrid and Lake Prespa; visitor centre on Velestovski Pat, Ohrid', route: 'Use the visitor centre to check the route, entrance regulations and current mountain road conditions before choosing a trail.', view: 'Choose a marked viewpoint for the lake panorama and keep the road shoulder clear.' },
    zh: { location: '奥赫里德湖与普雷斯帕湖之间；游客中心在奥赫里德韦莱斯托夫斯基路', route: '先向游客中心核实路线、入园规定与山路状况，再选步道。', view: '在标记观景点拍湖景，避开公路路肩。' },
  },
};

const cityMap: Source = {
  url: 'https://visitohrid.com.mk/wp-content/uploads/2024/08/MAPA.pdf',
  en: 'Visit Ohrid city and regional map', zh: '奥赫里德市区与湖区旅游地图',
};
const cultural: Source = {
  url: 'https://visitohrid.com.mk/cultural-attractions/',
  en: 'Visit Ohrid cultural attractions', zh: '奥赫里德旅游文化景点资料',
};
const worldHeritage: Source = {
  url: 'https://whc.unesco.org/en/list/99/',
  en: 'UNESCO World Heritage Centre: Ohrid region', zh: '联合国教科文组织世界遗产中心：奥赫里德地区',
};
const park: Source = {
  url: 'https://galicica.org.mk/en/atrakcii_category/tourist-attractions/',
  en: 'Galičica National Park attractions', zh: '加利奇察国家公园景点目录',
};
const itinerary: Source = {
  url: 'https://whc.unesco.org/document/163880',
  en: 'Lake Ohrid regional visitor map', zh: '奥赫里德湖区域游客地图',
};
const museum: Source = {
  url: 'https://muzejohrid.mk/contact-2/',
  en: 'Ohrid Institute and Museum: site contacts', zh: '奥赫里德文化古迹保护研究所与博物馆：各馆联系人',
};
const struga: Source = {
  url: 'https://tourismmacedonia.gov.mk/wp-content/uploads/2018/09/3.-Struga-A-WALK-THROUGH-THE-CITY-OF-POETRY.pdf',
  en: 'North Macedonia tourism: Struga and nearby villages', zh: '北马其顿旅游资料：斯特鲁加及周边村庄',
};
const museumOperator: LocalText = {
  en: 'National Institution for Protection of Monuments of Culture and Museum – Ohrid',
  zh: '奥赫里德文化古迹保护研究所与博物馆',
};
const operators: Record<string, LocalText> = {
  'robev-house': museumOperator,
  'icon-gallery': museumOperator,
  plaosnik: {
    en: 'For the archaeological grounds, the Ohrid Institute and Museum lists a dedicated Plaošnik contact. For church access, consult the church on site.',
    zh: '考古区由奥赫里德文化古迹保护研究所与博物馆提供专门咨询，教堂开放请向现场教堂核实。',
  },
  'kalista-monastery': {
    en: 'Kališta is an active Orthodox monastery. Consult its community for access to the rock church and active worship areas.',
    zh: '卡利什塔是仍有宗教活动的东正教修道院。洞窟教堂和礼拜区域的参观安排请向修道院核实。',
  },
};
const heritageManagement: Source = {
  url: 'https://whc.unesco.org/document/187543',
  en: 'World Heritage Centre: Ohrid region conservation responsibilities',
  zh: '世界遗产中心：奥赫里德地区遗产保护职责',
};
const protectedLandscape: Source = {
  url: 'https://whc.unesco.org/document/176097',
  en: 'World Heritage Centre: Pogradec protected landscape administration',
  zh: '世界遗产中心：波格拉德茨保护景观管理',
};
const regionalOperators: Record<string, LocalText> = {
  drilon: {
    en: 'Drilon is part of the Pogradec protected landscape. The Korçë Regional Administration for Protected Areas oversees the wider landscape. Ask at the park for the schedules of individual visitor services.',
    zh: '德里隆位于波格拉德茨保护景观内，区域自然保护由科尔察保护地管理机构负责。园内各项游览服务的开放安排请现场核实。',
  },
  'lin-basilica': {
    en: 'The Korçë Regional Directorate for Cultural Heritage oversees monument conservation in Lin. The World Heritage mission records its Pogradec department as the contact for monitoring the ruins and opening them to visitors.',
    zh: '林村的文物保护由科尔察区域文化遗产主管机构负责。世界遗产考察报告记载，其波格拉德茨部门负责监测这处遗址并安排公众参观。',
  },
  'pogradec-castle': {
    en: 'The Korçë Regional Directorate for Cultural Heritage is responsible for protecting monuments in the Pogradec area. Check posted access arrangements before ascending the castle hill.',
    zh: '波格拉德茨地区的文物保护属于科尔察区域文化遗产主管机构的职责。登上城堡山前，可先查看现场通行公告。',
  },
};
const ottomanHeritage: Source = {
  url: 'https://tourismmacedonia.gov.mk/wp-content/uploads/2018/09/Otomanskite-spomenici-ENG.pdf',
  en: 'North Macedonia tourism: Ottoman monuments', zh: '北马其顿旅游资料：奥斯曼时期古迹',
};
const citySources: Record<string, Source> = {
  'ali-pasha-mosque': ottomanHeritage,
  'zeynel-abidin-mosque': ottomanHeritage,
  'robev-house': { url: 'https://muzejohrid.mk/house-of-robev-family/', en: 'Robev Family House: museum information', zh: '罗贝夫家族宅邸：馆方参观信息' },
  'icon-gallery': { url: 'https://muzejohrid.mk/en/', en: 'Ohrid Institute and Museum: gallery address and hours', zh: '奥赫里德研究所与博物馆：画廊地址和开放时间' },
  plaosnik: museum,
};

const regionalSources: Record<string, Source> = {
  peshtani: { url: 'https://eprints.ugd.edu.mk/30777/', en: 'Goce Delčev University: lakeside settlements', zh: '戈采·德尔切夫大学：湖岸聚落资料' },
  trpejca: { url: 'https://eprints.ugd.edu.mk/30777/', en: 'Goce Delčev University: lakeside settlements', zh: '戈采·德尔切夫大学：湖岸聚落资料' },
  velestovo: { url: 'https://eprints.ugd.edu.mk/30777/', en: 'Goce Delčev University: lakeside settlements', zh: '戈采·德尔切夫大学：湖岸聚落资料' },
  'vevcani-springs': {
    url: 'https://www.pont.org/sustainable-development-in-vevchani-nurturing-nature-strengthening-communities/',
    en: 'Prespa Ohrid Nature Trust: Vevčani Springs', zh: '普雷斯帕奥赫里德自然信托：韦夫查尼泉群',
  },
};
const albanianSources: Record<string, Source> = {
  'lin-basilica': { url: 'https://akt.gov.al/en/atraksionet/rrenojat-e-kishes-paleokristiane-dhe-mozaiket-e-linit/', en: 'Albanian National Tourism Agency: Lin basilica', zh: '阿尔巴尼亚国家旅游局：林村早期基督教遗址' },
  drilon: { url: 'https://akt.gov.al/en/attractions/Drilon-National-Park--natural-monument/', en: 'Albanian National Tourism Agency: Drilon', zh: '阿尔巴尼亚国家旅游局：德里隆' },
  tushemisht: { url: 'https://akt.gov.al/en/tourist_areas/frankly/', en: 'Albanian National Tourism Agency: Tushemisht', zh: '阿尔巴尼亚国家旅游局：图舍米什特' },
  'pogradec-waterfront': { url: 'https://akt.gov.al/en/cities/pogradec/', en: 'Albanian National Tourism Agency: Pogradec', zh: '阿尔巴尼亚国家旅游局：波格拉德茨' },
  'pogradec-castle': { url: 'https://akt.gov.al/en/atraksionet/kalaja-e-pogradecit/', en: 'Albanian National Tourism Agency: Pogradec Castle', zh: '阿尔巴尼亚国家旅游局：波格拉德茨城堡' },
};

const access: Record<string, { manager: LocalText; hours: LocalText; tickets: LocalText }> = {
  church: {
    manager: { en: 'For interior access and worship schedules, consult the church or monastery on site. For protected fabric, refer to the relevant heritage authority.', zh: '室内参观与礼拜安排请向现场教堂或修道院核实。历史建筑保护事项请查阅当地文保机构资料。' },
    hours: { en: 'Interior access may depend on worship and staffing. Confirm locally before making a dedicated trip.', zh: '室内开放受礼拜及值守安排影响，专程到访前请现场核实。' },
    tickets: { en: 'Check at the entrance for any interior admission charge.', zh: '室内是否收费请核实入口公告。' },
  },
  faith: {
    manager: { en: 'The worship community is the point of contact for interior access and prayer times.', zh: '室内参观与礼拜时段由现场宗教场所提供信息。' },
    hours: { en: 'Ask locally about visitor access around prayer times.', zh: '请现场核实礼拜时段及访客开放安排。' },
    tickets: { en: 'Confirm any visitor arrangements at the entrance.', zh: '访客入内安排请核实入口公告。' },
  },
  museum: {
    manager: { en: 'Check the venue or Ohrid’s cultural heritage institute for current visitor arrangements.', zh: '参观安排请查阅场馆或奥赫里德文化古迹保护研究所资讯。' },
    hours: { en: 'Check the venue’s posted schedule before visiting, especially outside summer.', zh: '出发前查阅场馆公告，淡季尤其需要核实。' },
    tickets: { en: 'Check current admission and any reduced fares at the entrance.', zh: '以现场公告核实票价及优惠。' },
  },
  heritage: {
    manager: { en: 'Use the local heritage authority or signs at the site for conservation and visitor access information.', zh: '遗址保护与游客出入安排请参考当地文保机构资料及现场标示。' },
    hours: { en: 'Check event, conservation and access notices before entering.', zh: '进入前请核实活动、维护与通行公告。' },
    tickets: { en: 'Check separately for any event ticket or admission to fenced areas.', zh: '活动和围护区如另设门票，请查看现场公告。' },
  },
  outdoor: {
    manager: { en: 'Follow municipal or local access signs for public areas and posted rules for separately operated facilities.', zh: '公共区域以当地市镇通行标示为准，独立运营设施另按现场公告。' },
    hours: { en: 'Plan for daylight. Seasonal services and temporary access restrictions vary.', zh: '建议白天游览。季节性设施和临时通行安排请现场核实。' },
    tickets: { en: 'Check charges separately for operated services, parking or boats.', zh: '付费服务、停车或乘船费用请分别核实。' },
  },
  park: {
    manager: { en: 'Public Institution Galičica National Park manages park access and conservation.', zh: '加利奇察国家公园公共管理机构负责园区通行管理及自然保护。' },
    hours: { en: 'Confirm trail, road or boat access with the park before leaving.', zh: '出发前向公园核实步道、道路或船只通行安排。' },
    tickets: { en: 'Check park fees and any separately operated boat services before departure.', zh: '出发前核实公园收费，另行运营的船只请单独询价。' },
  },
};

const primaryMapNames: Record<string, string> = {
  'saint-clement-old-town': 'St Clement the Lesser Church, Ohrid',
  'old-plane-tree': 'Chinar Tree, Kruševo Republic Square, Ohrid',
  'kaneo-boardwalk': 'Ohrid Boardwalk, Potpesh, Ohrid',
  'black-drin-outflow': 'Black Drin River Outflow, lakefront bridge, Struga',
  'lin-basilica': 'Paleochristian Basilica of Lin, Lin, Pogradec',
  'pogradec-castle': 'Kalaja e Pogradecit, Pogradec',
};
const originals = Object.keys(visitDetails);
const additions = Object.keys(lake);
export const guideSlugs = [...originals, ...additions];
export const guidePaths = guideSlugs.map((slug) => '/nearby/' + slug);
export const guideLink = (slug: string) => ({ pathname: '/nearby/[slug]' as const, params: { slug } });
export const labels = (locale: Locale) => content.labels[locale];

export function hasGuide(slug: string) {
  return guideSlugs.includes(slug);
}

function sourcesFor(group: Group, slug: string) {
  switch (group) {
    case 'city': return [citySources[slug] ?? cultural, cityMap, heritageManagement];
    case 'park': return [park, cityMap];
    case 'west': return [struga, worldHeritage, heritageManagement];
    case 'albania': return [albanianSources[slug] ?? worldHeritage, itinerary, slug === 'drilon' ? protectedLandscape : heritageManagement];
    case 'south': return [cityMap, itinerary];
  }
}

const stayByGroup: Record<Group, LocalText> = {
  city: { zh: '以奥赫里德老城下部或港口一带为落脚点，便于步行串联老城景点。订房前核对上坡路段和停车位置。', en: 'Base yourself near the lower Old Town or harbour for a walking itinerary. Check slopes and parking before booking.' },
  south: { zh: '想串联沿湖村庄，可住佩什塔尼；需要更多餐饮和返程选择，可回奥赫里德市区住宿。', en: 'Consider Peštani for a shore-road itinerary, or stay in Ohrid for more dining and onward travel options.' },
  park: { zh: '从奥赫里德出发适合西侧山地行程；若主要游览普雷斯帕湖一侧，按已确认的登山口或码头选择落脚点。', en: 'Ohrid is a practical base for the western side. For a Prespa-side trip, choose a base once you have confirmed your trailhead or boat departure.' },
  west: { zh: '斯特鲁加市区适合串联湖西岸和黑德林河。计划留在村镇时，提前确认住宿与返程交通。', en: 'Base yourself in Struga to combine the western shore with the Black Drin. Check accommodation and return transport before staying in a village.' },
  albania: { zh: '波格拉德茨市区可作为阿尔巴尼亚湖岸行程的落脚点。若要早晨游览泉区，可优先考虑图舍米什特附近。', en: 'Pogradec is a practical base for this stretch of the Albanian shore. Consider a stay near Tushemisht if you want an early visit to the springs.' },
};

const museumHours: Record<string, { winter: string; summer: string; url: string }> = {
  'bay-of-bones': { winter: '09:00–15:30', summer: '09:00–16:30', url: 'https://muzejohrid.mk/museum-on-water/' },
  'robev-house': { winter: '09:00–15:30', summer: '09:00–20:00', url: 'https://muzejohrid.mk/house-of-robev-family/' },
  'icon-gallery': { winter: '09:00–14:00', summer: '09:00–17:00', url: 'https://muzejohrid.mk/galerija-na-ikoni/' },
};
const parkTickets = { url: 'https://galicica.org.mk/en/e-prodavnica/', zh: '国家公园官方门票目录', en: 'Official national park ticket listings' };
const museumFees = { url: 'https://muzejohrid.mk/images/oglasi/' + encodeURIComponent('Одлука за утврдување на висина на цените на влезните билети (2022).pdf'),
  zh: '奥赫里德博物馆公布的 2022 年票价决定', en: 'Ohrid Museum’s published 2022 admission decision' };

export function guide(locale: Locale, slug: string) {
  const details = (detailContent as Record<string, Record<Locale, LocalDetails>>)[slug]?.[locale];
  const regionalSource = regionalSources[slug];
  const legacy = legacyPlaces.find((place) => place.slug === slug);
  const legacyCopy = legacy?.[locale];
  const extra = nearbyExtra[slug]?.[locale];
  const old = content.places.find((place) => place.slug === slug);
  const added = Object.hasOwn(lake, slug) ? lake[slug as keyof typeof lake] : undefined;
  const visit: Visit | undefined = added ? {
    ...added,
    group: added.group as Group,
    map: (primaryMapNames[slug] ?? (added.en.title + ', ' + added.en.location))
      + (added.group === 'albania' ? (primaryMapNames[slug] ? ', Albania' : '') : ', North Macedonia'),
    operator: operators[slug],
  } : (old ? visitDetails[slug] : undefined);
  if (!visit) throw new Error('Unknown nearby guide: ' + slug);
  const { group, kind } = visit;
  const detail = visit[locale];
  const translated = added?.[locale];
  const copy = translated ? {
    title: translated.title,
    subtitle: translated.subtitle,
    description: translated.intro,
    intro: translated.intro,
    sections: [], faqs: [translated.faq], tips: [],
  } : old![locale];
  const photo = (photos as Record<string, Photo>)[slug];
  const policy = access[kind];
  const visitor = visitorInfo[slug as keyof typeof visitorInfo];
  const museum = museumHours[slug];
  const visitSources = [
    ...(museum ? [{ url: museum.url, zh: '馆方开放公告', en: 'Museum opening hours' }, museumFees] : []),
    ...(['galicica-national-park', 'magaro'].includes(slug) ? [parkTickets] : []),
  ];
  const preservation = (group === 'city' || group === 'west') && ['church', 'heritage', 'museum'].includes(kind)
    ? (locale === 'zh'
      ? '奥赫里德文化古迹保护研究所与博物馆负责湖区的文保工作。参观入口与现场开放安排请以景点公告为准。'
      : 'The Ohrid Institute and Museum is responsible for cultural heritage conservation across the region. Check the site notice for its visitor entrance and opening arrangements.')
    : undefined;

  return {
    copy,
    group,
    location: detail.location,
    route: detail.route,
    details,
    view: detail.view,
    manager: visit.operator?.[locale] ?? regionalOperators[slug]?.[locale] ?? details?.manager ?? preservation ?? legacyCopy?.management ?? policy.manager[locale],
    hours: legacyCopy?.hours ?? policy.hours[locale],
    tickets: legacyCopy?.tickets ?? policy.tickets[locale],
    visitor: { ...visitor[locale], duration: visitor.duration, stay: stayByGroup[group][locale] },
    museum,
    parkTicket: ['galicica-national-park', 'magaro'].includes(slug) ? parkTickets.url : undefined,
    legacyCopy,
    extra,
    photo,
    path: '/nearby/' + slug,
    map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(visit.map),
    sources: [...(old?.sources ?? sourcesFor(group, slug)), ...visitSources, ...(regionalSource ? [regionalSource] : []), ...(legacy && !old?.sources.some(({ url }) => url === legacy.source) ? [{ url: legacy.source, en: 'Additional visitor information', zh: '补充参观资料' }] : [])],
    ui: labels(locale),
  };
}
