type Extra = {
  category: string; duration: string; bestTime: string; access: string;
  introduction: string; planning: string[]; etiquette: string[];
  culture: string; experience: string; itinerary: string; details: string;
};

export const nearbyExtra: Record<string, { zh: Extra; en: Extra }> = {
  'saint-naum-springs': {
    zh: {
      category: '喀斯特泉群 · 国家公园自然景观', duration: '45–90 分钟', bestTime: '上午光线柔和时，春末至秋季适合结合湖岸游览', access: '修道院旁步行前往；部分泉眼需搭乘现场运营的划艇观看',
      introduction: '这不是普通的湖湾。圣瑙姆一带的地下水从石灰岩地层与岸边泉眼不断涌出，在流入奥赫里德湖前形成清澈的浅水区。可以从岸上观察水底植物和岩石，也可以在当地允许的航线上乘小艇。重点是慢看水流与生境，而不是匆忙拍照后离开。',
      planning: ['与修道院参观一起安排：先看教堂与花园，再沿指示走到泉群，避免在正午烈日下往返。', '如果计划乘划艇，到达后先确认出发点、等候时间、实际船程与收费方式。', '预留至少半小时在岸边步行，观察泉水流向、植物分布和不同水色。', '带轻便防滑鞋和饮水；需要赶返程游船的旅客应先确认码头时间。'],
      etiquette: ['自然保护区内沿开放步道行走，不踏入水草或封闭岸段。', '乘艇穿好现场提供的安全装备，摄影器材采取防水措施。', '不要触摸或投喂水生动物；不向泉池扔硬币、食物或其他物品。', '雨后与大风天气注意湿滑岸边和运营限制。'],
      culture: '圣瑙姆泉水与近旁的修道院共同构成宗教朝圣和自然观赏相邻的空间：游客可在数分钟内从壁画和圣人纪念地走到地下泉水汇集的湿地。它也是理解奥赫里德地区自然—文化遗产联系的一个直观入口。',
      experience: '从不同角度观察泉池，水中植物会呈现由黄绿到深绿的层次，岩石颜色则随藻类覆盖而变化。利用岸边树荫降低水面反光，更容易看清下方细节。',
      itinerary: '建议顺序：圣瑙姆修道院入口 → 教堂外观与庭院 → 泉群步道 → 视情况乘划艇 → 湖岸观景 → 返回码头或停车区。',
      details: '位于奥赫里德湖南岸的圣瑙姆旅游区，泉群与教堂属于相邻但不同性质的参观点。Google Maps 链接指向泉群名称搜索，尚未使用独立 Place ID。'
    },
    en: {
      category: 'Karst springs · National-park landscape', duration: '45–90 minutes', bestTime: 'Soft morning light; late spring through autumn for a combined lakeshore outing', access: 'Walk from the monastery; some spring outlets are best seen on locally operated rowboats',
      introduction: 'This is more than a sheltered corner of the lake. Groundwater emerges through limestone and shoreline outlets, collecting in clear shallows before reaching Lake Ohrid. Observe plants and stones from the bank or use an authorised local boat. A slow look at the water system is more rewarding than a quick photo stop.',
      planning: ['Pair the springs with a monastery visit: church and gardens first, then follow the signs toward the water.', 'For a rowboat, check the boarding point, wait, duration and fare before joining a queue.', 'Allow time on foot to compare flowing channels, plant growth and changes in colour.', 'Wear grippy shoes and carry water; check the return departure if travelling by excursion boat.'],
      etiquette: ['Stay on open paths and out of restricted shore or plant zones.', 'Follow the boat operator’s safety instructions and protect cameras from splashes.', 'Do not feed wildlife or throw coins, food or objects into the pools.', 'Watch for slippery paths and changes to boat service after wind or rain.'],
      culture: 'The springs and neighbouring monastery form a distinctive meeting of pilgrimage and nature. Within a short walk visitors move from frescoes and the saint’s memorial to a spring-fed wetland, a vivid example of the Ohrid region’s linked cultural and natural heritage.',
      experience: 'Aquatic plants shift from yellow-green to deep green, while algae change the appearance of submerged rocks. Shade from the trees reduces glare and reveals more detail below the surface.',
      itinerary: 'Suggested order: St Naum entrance → church exterior and courtyard → spring path → optional rowboat → lake viewpoint → return to pier or parking.',
      details: 'Within the St Naum tourist area at the south end of Lake Ohrid. The springs and the church are neighbouring but distinct visit sites. The map uses a place-specific search, not a verified Place ID.'
    }
  },
  'ljubanista-beach': {
    zh: {
      category: '湖岸自然景观 · 村落休闲区', duration: '45 分钟至半天', bestTime: '晴朗、风浪较小的日子；游泳以夏季现场条件为准', access: '从奥赫里德南岸公路前往柳巴尼什塔村及湖滩可开放入口',
      introduction: '柳巴尼什塔的魅力在于奥赫里德湖南部宽阔的水面、可见的山坡轮廓和岸线本身。与圣瑙姆修道院的历史文化游览相比，这里更适合休息、辨认湖岸地貌和体验村落尺度的湖滨生活。不同岸段可能有自然通行区和经营设施，应按入口指示选择。',
      planning: ['从圣瑙姆返回奥赫里德时把湖滩作为短暂停留点，可避免来回折返。', '先辨认公共通道、停车位置和收费设施范围，不要直接穿越私人经营区域。', '如果想游泳，应先留意水温、风浪、岸底石块与现场安全提示。', '与亲子旅客同行时，选择易下水且视线开阔的岸段。'],
      etiquette: ['不要把湖滩当作全天候有救生员管理的泳池；以现场实际服务为准。', '岸边卵石可能滑动，进出水面要留心脚下。', '维护村落与自然岸线整洁，带走食物包装及废弃物。', '尊重沿岸私人设施与居民通道。'],
      culture: '南岸村落与湖泊一直相互依存。观赏点不只是沙滩，而是居民道路、岸边设施、远山与湖面交织的日常景观。',
      experience: '沿岸行走时可以比较清澈浅水、卵石、水草与较深湖面的颜色变化。风平浪静时适合低机位摄影；有风时可以记录连续的波纹和山景。',
      itinerary: '建议顺序：停车或公共入口 → 岸边短步道 → 山湖全景拍摄点 → 休息或符合现场条件的湖水活动 → 返回公路。',
      details: '位于北马其顿奥赫里德市辖的柳巴尼什塔村一带，靠近圣瑙姆旅游区。谷歌地图使用「Ljubanista Beach, Ohrid」专属搜索，入口和场地边界仍须以现场为准。'
    },
    en: {
      category: 'Lakeshore landscape · Village leisure area', duration: '45 minutes to half a day', bestTime: 'Clear, calmer days; summer swimming depends on on-site conditions', access: 'Follow the southern lakeshore road to Ljubaništa village and an open beach entrance',
      introduction: 'Ljubaništa is about the wide southern lake, the mountain skyline and the changing shoreline. Compared with the historical focus at St Naum, this is a place to pause, study the lakeside terrain and experience a village-scale shore. Public access and serviced sections may have different rules.',
      planning: ['Stop on the return drive from St Naum to Ohrid to avoid backtracking.', 'Identify public paths, parking and paid facilities before choosing a place to stop.', 'Before swimming assess temperature, wind, stones underfoot and posted warnings.', 'For children, choose an accessible section with clear sightlines and close supervision.'],
      etiquette: ['Do not assume a lifeguard is present; check the actual facilities.', 'Pebbles can shift and become slippery near the water.', 'Take rubbish away and protect the village shoreline.', 'Respect private concessions and residents’ access routes.'],
      culture: 'The southern shore reflects the ongoing relationship between small settlements and the lake. Paths, modest facilities, mountain slopes and open water together tell the story of daily lakeside life.',
      experience: 'Compare the colour of shallow water, pebbles, plants and the deeper lake as you walk. Calm weather favours low-angle reflections; wind brings patterned waves against the mountain backdrop.',
      itinerary: 'Suggested order: public entrance or parking → short lakeshore walk → wide lake-and-mountain viewpoint → rest or permitted water activity → return to road.',
      details: 'Near Ljubaništa village in the Municipality of Ohrid, North Macedonia, close to the St Naum area. The map searches specifically for Ljubaništa Beach; verify the precise entrance and facility boundary on site.'
    }
  },
  'bay-of-bones': {
    zh: {
      category: '史前考古遗址 · 水上博物馆', duration: '约 60–90 分钟', bestTime: '营业时段内的上午，便于细看木结构与展陈', access: '奥赫里德—圣瑙姆南岸公路上的格拉迪什特，佩什塔尼村附近',
      introduction: '骨头湾水上博物馆将史前湖居聚落从湖底考古资料转化为可亲身步行的空间。游客走过木栈桥，进入以木桩支撑的平台与茅草屋群，能够直接理解房屋、交通和湖岸生计之间的关系。参观重点应放在重建依据与生活结构，而不只是拍摄水上房屋。',
      planning: ['先阅读入口关于水下考古的资料，再进入重建聚落，避免把新建展屋误认为原物。', '给不同房屋的结构与材料留出观察时间，留意木桩、平台和入口动线。', '按馆方季节营业时间规划；周一通常闭馆，不宜临时假设一定开放。', '从奥赫里德去圣瑙姆可顺路游览，建议把博物馆放在上午或返程途中。'],
      etiquette: ['在木栈道上行走，不越过栏杆或进入封闭展区。', '展屋中的复制品和陈列材料按馆方指示触摸或拍摄。', '遇雨时木板可能湿滑，穿防滑鞋并照顾儿童。', '尊重馆内讲解与团体参观动线。'],
      culture: '遗址呈现青铜时代晚期至铁器时代早期的湖上聚落。水下发现的木桩和生活器物说明早期居民如何利用湖面与湖岸环境；现有重建建筑用于展示考古解释，并非原始建筑原件。',
      experience: '观察地面以上的房屋与水面以下的支柱如何连接，再从岸边回看整体聚落。木桩间距、平台高度和茅草屋组合，比单张全景更能解释它的建筑逻辑。',
      itinerary: '建议顺序：入口与馆方展板 → 水下考古说明 → 木栈桥 → 重建房屋内部与外部 → 岸上远景 → 继续南下圣瑙姆。',
      details: '馆方列出的地址是 Village of Peshtani, Gradishte, 6000 Ohrid。该馆还设有相关考古展示和山坡遗址内容；具体开放范围依馆方当日安排。'
    },
    en: {
      category: 'Prehistoric archaeology · Museum on Water', duration: 'About 60–90 minutes', bestTime: 'Morning during museum hours for close study of structures and displays', access: 'At Gradište near Peštani on the Ohrid–St Naum lakeshore road',
      introduction: 'Bay of Bones turns underwater archaeological research into a walkable interpretation of prehistoric lake life. A wooden bridge leads to a raised platform and reconstructed huts. The most revealing detail is how houses, circulation and lakeshore livelihoods fit together—not simply the photogenic setting.',
      planning: ['Read the entrance archaeology interpretation first so the reconstructed buildings are not mistaken for originals.', 'Allow time to compare the timber supports, platform and arrangement of hut entrances.', 'Plan around seasonal museum hours; Mondays are generally closed.', 'Combine with St Naum on a southern-shore drive, preferably stopping in the morning or on the return.'],
      etiquette: ['Stay on the boardwalk and behind barriers.', 'Follow the museum’s instructions about touching exhibits and taking photographs.', 'Timber surfaces may be slippery in rain; supervise children closely.', 'Respect guided groups and interpretive spaces.'],
      culture: 'The display interprets a Late Bronze to Early Iron Age lakeside community. Underwater piles and household artefacts reveal how people adapted to the water. The visible huts are modern reconstructions based on evidence, not surviving original houses.',
      experience: 'Look from the house floors down to the piles beneath, then return to shore to see the platform as a whole. Spacing of supports, floor elevation and clustered roof forms explain more than a single panoramic image.',
      itinerary: 'Suggested order: entrance panels → underwater archaeology interpretation → boardwalk → reconstructed hut interiors and exteriors → shore panorama → continue toward St Naum.',
      details: 'The museum lists its address as Village of Peshtani, Gradishte, 6000 Ohrid. Additional archaeological displays and the hillside site are subject to the museum’s current opening arrangements.'
    }
  }
};
