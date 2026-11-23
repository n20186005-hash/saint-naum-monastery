export type NearbyPlace = {
  slug: string; image: string; map: string; source: string;
  zh: PlaceCopy; en: PlaceCopy;
};
type PlaceCopy = {
  name: string; tagline: string; location: string; overview: string; management: string;
  highlights: string[]; history: string; architecture: string; nature: string;
  visit: string[]; photo: string[]; transport: string; hours: string; tickets: string;
  faq: { q: string; a: string }[];
};
export const nearbyPlaces: NearbyPlace[] = [
  {
    slug: 'saint-naum-springs', image: '/gallery/saint-naum-monastery-19.jpg',
    map: 'https://www.google.com/maps/search/?api=1&query=Springs+of+St+Naum+Ohrid+North+Macedonia',
    source: 'https://galicica.org.mk/en/attractions/tourist-attractions/tourist-complex-sv-naum/',
    zh: {
      name: '圣瑙姆泉群', tagline: '修道院东侧的清澈喀斯特泉水与湖畔湿地', location: '圣瑙姆修道院东侧 · 奥赫里德湖，北马其顿',
      overview: '圣瑙姆泉群在加利契察山脚汇集成一片安静的水域，透明的泉水、沉水植物与林荫共同形成奥赫里德湖南岸最鲜明的自然景观。它与修道院相邻，但适合留出独立的时间慢慢观察。',
      management: '泉群位于加利契察国家公园范围内，公共机构「加利契察国家公园」负责该保护区的自然保育与生态管理。附近的圣瑙姆宗教建筑则涉及马其顿东正教会等不同管理主体；泉水生态保护与修道院宗教事务不可混为一谈。',
      highlights: ['辨认水下泉眼周围颜色不同的藻类与石面', '沿岸观察泉水进入奥赫里德湖前的缓流区', '在允许的线路上乘当地划艇，近距离观察透明水底'],
      history: '泉群长期与圣瑙姆修道院的朝圣路线相连，也构成奥赫里德湖自然与文化遗产景观的一部分。水源与加利契察山体的喀斯特地下水系统密切相关。',
      architecture: '这里的主角不是建筑，而是泉池、岸边步道与传统小艇；相邻修道院的石砌教堂可作为自然与宗教景观的对照。',
      nature: '留意不同深浅的绿色水草、清澈冷泉与树荫造成的光影变化。不要踩踏水生植物或向泉中投放食物。',
      visit: ['先从修道院步行至泉群岸边，观察水流与地形', '视现场运营情况选择短程划艇，勿自行进入保护水域', '回到湖岸拍摄泉流与湖面衔接的视角'],
      photo: ['上午从林荫边缘拍摄透明水底，减少强烈反光', '以船只和沿岸树木作前景，保留泉池的水面纹理'],
      transport: '从圣瑙姆修道院步行可达；由奥赫里德市区可经沿湖公路或季节性游船前往修道院区域。',
      hours: '自然景观开放条件和游船运营随季节与保护规定变化；出发前查询国家公园及现场公告。',
      tickets: '岸边参观与划艇可能采用不同收费方式；以现场公告为准。',
      faq: [{q:'需要单独安排多久？',a:'建议约45–90分钟；若乘划艇或摄影，可预留更久。'},{q:'可以下水游泳吗？',a:'泉群属于生态敏感区域，请遵守保护区标识，游泳可另选允许的湖滩。'},{q:'适合带孩子吗？',a:'岸边观察适合亲子，但水边须看护儿童，乘船应遵守船夫安全指示。'}]
    },
    en: {
      name: 'Springs of St Naum', tagline: 'Clear karst waters and shaded wetlands beside the monastery', location: 'East of St Naum Monastery · Lake Ohrid, North Macedonia',
      overview: 'At the foot of Galičica, springs gather into calm, remarkably transparent pools before meeting Lake Ohrid. Underwater vegetation and shaded banks reward a slower visit separate from the nearby monastery.',
      management: 'The springs lie within Galičica National Park, whose public institution oversees protected-area conservation and ecological management. The neighbouring religious complex also involves the Macedonian Orthodox Church and other stakeholders: management of the natural springs should not be confused with that of the monastery.',
      highlights: ['Look for coloured algae and submerged rocks around spring outlets', 'Watch where the slow spring channels meet Lake Ohrid', 'Take an operated rowboat where permitted to view the clear water'],
      history: 'The springs have long been part of the St Naum pilgrimage landscape and the natural-cultural heritage of the Ohrid region. They are associated with the karst groundwater system of Mount Galičica.',
      architecture: 'Water, footpaths and small traditional boats define this place rather than monumental buildings; the stone monastery church provides a nearby contrast.',
      nature: 'Observe submerged plants and shifting colours beneath the cool spring water. Avoid disturbing aquatic vegetation or feeding wildlife.',
      visit: ['Walk from the monastery toward the spring bank and observe the channels', 'Consider an operated rowboat subject to on-site rules', 'Return to the lakeshore for views of the spring water meeting the lake'],
      photo: ['Use morning shade to reduce glare on the transparent water', 'Frame boats and overhanging trees against the pool surface'],
      transport: 'A short walk from St Naum Monastery; reach the monastery area by lakeside road or seasonal boat from Ohrid.',
      hours: 'Access and boat operations depend on season and conservation rules; check park and local notices.',
      tickets: 'Bank access and rowboat trips may have separate charges; check displayed prices locally.',
      faq: [{q:'How much time should I allow?',a:'Around 45–90 minutes, longer for boating or photography.'},{q:'Can I swim in the springs?',a:'Respect protected-area signs; choose a designated lake beach for swimming.'},{q:'Is it suitable for families?',a:'Yes for shoreline observation, with close supervision near water and on boats.'}]
    }
  },
  {
    slug: 'ljubanista-beach', image: '/gallery/nearby-ljubanista.jpg',
    map: 'https://www.google.com/maps/search/?api=1&query=Ljubanista+Beach+Ohrid+North+Macedonia',
    source: 'https://galicica.org.mk/en/information/',
    zh: {
      name: '柳巴尼什塔湖滩', tagline: '奥赫里湖南端的卵石岸线与山景', location: '柳巴尼什塔村 · 奥赫里德，北马其顿',
      overview: '柳巴尼什塔村附近的湖滩与圣瑙姆修道院距离不远。与寺院参观不同，这里适合欣赏湖水层次、休息与在天气允许时体验湖岸生活。',
      management: '柳巴尼什塔湖滩位于奥赫里德市辖区、加利契察国家公园周边的湖岸环境。公共岸线、具体浴场经营区及国家公园保护地可能适用不同管理规则；本站不将整个湖滩归属于未经证实的单一经营者。请遵守现场公共管理和浴场公告。',
      highlights: ['从岸线观察湖水由浅绿转深蓝的变化', '以加利契察山坡为背景欣赏南岸湖景', '比较自然岸段与有设施的浴场区域'],
      history: '柳巴尼什塔是奥赫里湖南岸村落景观的一部分，长期与沿湖交通、农业和季节性游憩相连。',
      architecture: '主要景观是自然岸线和村落尺度的建筑，而非大型纪念性构筑物。观察小型码头、步道与湖岸设施如何随地形布置。',
      nature: '湖岸有卵石与较浅水域；天气、风浪和水温变化明显。避免进入标示保护区域，也不要留下垃圾。',
      visit: ['从可进入的湖滩入口沿岸步行', '观察湖面、远山和岸线植被', '将湖滩休息与圣瑙姆修道院、泉群安排成半日行程'],
      photo: ['清晨用低角度拍卵石与透明浅水', '傍晚将山体轮廓与湖面纳入宽景'],
      transport: '从圣瑙姆修道院区域沿湖岸道路向柳巴尼什塔方向前往；自奥赫里德市区走南岸公路。',
      hours: '自然岸段通常不按博物馆开放时间运营；具体浴场设施与季节服务以现场为准。',
      tickets: '自然湖岸与收费设施可能不同，停车、躺椅等服务另看现场价格。',
      faq: [{q:'可以与修道院同一天游览吗？',a:'可以，建议先参观寺院与泉群，再到湖滩休息。'},{q:'需要带什么？',a:'防滑鞋、防晒用品和适合湖水活动的装备。'},{q:'是否全年适合游泳？',a:'并非如此；需根据气温、水温、风浪和现场安全提示决定。'}]
    },
    en: {
      name: 'Ljubaništa Beach', tagline: 'Pebble shoreline and mountain views at the southern lake', location: 'Ljubaništa village · Ohrid, North Macedonia',
      overview: 'Close to St Naum, the lakeshore by Ljubaništa offers open water, mountain views and a slower contrast to a church visit. It is a useful rest stop during a southern Lake Ohrid outing.',
      management: 'The lakeshore lies in the Municipality of Ohrid and near the Galičica protected landscape. Public shore, privately operated beach facilities and protected areas may follow different rules. No single operator is asserted for the entire beach; follow the notices at each access point.',
      highlights: ['Notice the colour gradient from shallow green to deep blue', 'Frame the shore against the Galičica slopes', 'Compare natural shoreline and serviced beach sections'],
      history: 'Ljubaništa forms part of the long-established southern Ohrid lakeshore settlement landscape, linked to local travel and seasonal recreation.',
      architecture: 'The focus is the natural shore and village-scale buildings rather than a landmark monument. Look at modest jetties and shore facilities in relation to the terrain.',
      nature: 'Pebbles and shallow water meet a changeable lake environment. Wind, water temperature and lake conditions matter; avoid protected sections and leave no litter.',
      visit: ['Enter through an accessible shore approach', 'Walk the beach and compare lake, hills and vegetation', 'Combine a rest here with the monastery and springs in a half-day trip'],
      photo: ['Use a low angle for pebbles and clear shallows in morning light', 'Include the mountain silhouette in a wide evening composition'],
      transport: 'Follow the lakeshore road toward Ljubaništa from St Naum; from Ohrid use the southern shore road.',
      hours: 'Natural shore access differs from seasonal serviced facilities; follow local signs.',
      tickets: 'Natural shoreline access and paid beach services differ; parking and equipment may cost extra.',
      faq: [{q:'Can I combine it with the monastery?',a:'Yes. Visit the church and springs first, then pause at the lake.'},{q:'What should I bring?',a:'Grippy footwear, sun protection and appropriate swim gear.'},{q:'Is swimming possible all year?',a:'No; decide based on water temperature, weather, waves and safety notices.'}]
    }
  },
  {
    slug: 'bay-of-bones', image: '/gallery/nearby-bay-of-bones.jpg',
    map: 'https://www.google.com/maps/search/?api=1&query=Bay+of+Bones+Museum+Gradiste+Ohrid+North+Macedonia',
    source: 'https://muzejohrid.mk/museum-on-water/',
    zh: {
      name: '骨头湾水上博物馆', tagline: '沿湖木桩聚落重建与史前水下考古', location: '佩什塔尼村格拉迪什特 · 奥赫里德 6000，北马其顿',
      overview: '骨头湾水上博物馆位于奥赫里德湖南岸的格拉迪什特附近。沿木栈道走向水上重建聚落，可以从房屋结构理解青铜时代晚期与铁器时代早期居民如何利用湖岸环境。',
      management: '骨头湾水上博物馆由奥赫里德「文化古迹保护研究所及博物馆」这一国家机构负责文化遗产保护、研究与展示。馆方发布的开放、参观和维护信息应作为行程依据。',
      highlights: ['从栈桥观察木桩如何支撑水上居住平台', '进入重建茅草屋，比较生活空间与材料', '关注展示的陶器、石器与水下考古线索'],
      history: '1997–2005年的水下调查及后续研究揭示了史前湖居遗存；2007–2008年实施聚落重建。博物馆将湖底考古发现转化为可步行体验的展示。',
      architecture: '木平台与成组的木桩是核心结构，上方为以木材、泥土和茅草重建的史前房屋。周边山坡还展示更晚时期的防御遗迹。',
      nature: '站在水上栈道能观察清澈湖水与山岸地形；不要跨越护栏或触碰脆弱的展陈结构。',
      visit: ['从入口展板了解遗址年代与发现过程', '沿栈道逐座观察重建房屋和平台', '在岸边远眺全貌，比较建筑和湖面之间的关系'],
      photo: ['由入口侧拍出栈桥引向茅草屋的透视', '从侧面把木桩、湖水与山体层次纳入同一画面'],
      transport: '位于佩什塔尼以南的格拉迪什特沿湖公路旁，可与往返圣瑙姆的公路行程串联。',
      hours: '馆方公布季节性营业时间，周一通常闭馆；节假日及维护可能调整，请出发前查阅馆方网站。',
      tickets: '博物馆为收费文化场馆；以馆方当日票价为准。',
      faq: [{q:'它是真正的史前房屋吗？',a:'目前看到的是依据水下考古遗迹重建的展示建筑，不是原始房屋本体。'},{q:'与圣瑙姆相距远吗？',a:'两者位于同一段南岸公路，适合安排在同一天，但需预留交通时间。'},{q:'雨天还能参观吗？',a:'开放木栈道可能湿滑，恶劣天气请以馆方现场安排为准。'}]
    },
    en: {
      name: 'Bay of Bones Museum', tagline: 'Reconstructed stilt houses and underwater archaeology', location: 'Gradište, Peštani · Ohrid 6000, North Macedonia',
      overview: 'Near Gradište on the southern shore of Lake Ohrid, a walkway leads into a reconstructed prehistoric lake settlement. Its platforms and huts demonstrate how Late Bronze and Early Iron Age communities lived above the water.',
      management: 'The Museum on Water at Bay of Bones is presented and overseen by the National Institution Institute for Protection of Monuments of Culture and Museum – Ohrid, responsible for researching, conserving and exhibiting the region’s heritage. Consult its official notices for visiting arrangements.',
      highlights: ['Study how timber piles support the reconstructed platform', 'Compare house materials and small domestic interiors', 'Look for references to pottery, stone tools and underwater archaeology'],
      history: 'Underwater campaigns from 1997 to 2005 documented prehistoric remains. The settlement was reconstructed in 2007–2008 as an accessible presentation of finds from beneath the lake.',
      architecture: 'Timber piles and an elevated wooden platform support reconstructed houses using wood, clay and thatch. Later defensive remains are also presented on the hillside.',
      nature: 'The walkway offers lake and mountain perspectives. Keep behind barriers and avoid touching fragile displays.',
      visit: ['Read the entrance interpretation to understand the timeline', 'Follow the walkway and compare the huts and platform', 'Step back on shore for a full view of the settlement over the water'],
      photo: ['Use the entrance approach for a leading-line view toward the huts', 'Frame the timber piles, water and hillside together from the side'],
      transport: 'On the lakeside road at Gradište south of Peštani; a logical stop on the road to St Naum.',
      hours: 'The museum publishes seasonal hours and is generally closed Mondays; confirm holidays or maintenance on its official site.',
      tickets: 'This is a ticketed museum; consult the institution for the current admission price.',
      faq: [{q:'Are these original prehistoric houses?',a:'No. The visible structures reconstruct the settlement based on underwater archaeological evidence.'},{q:'Can I visit on the same day as St Naum?',a:'Yes, both lie along the southern shore route; allow time for transport.'},{q:'What about rainy days?',a:'The exposed wooden walkway may be slippery; follow museum instructions in bad weather.'}]
    }
  }
];
