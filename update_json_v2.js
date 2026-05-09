const fs = require('fs');
const path = require('path');

const files = [
  'src/messages/zh.json',
  'src/messages/en.json',
  'src/messages/petrovaradin.zh.json',
  'src/messages/petrovaradin.en.json'
];

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isZh = file.includes('zh.json');

  // 1. Hero title
  if (data.hero) {
    data.hero.title = 'Petrovaradin Fortress Clock';
    data.hero.rating = '4.8(14,043)';
    data.hero.reviewCount = isZh ? '14,043 条评价' : '14,043 reviews';
  }
  if (data.petrovaradin && data.petrovaradin.hero) {
    data.petrovaradin.hero.title = 'Petrovaradin Fortress Clock';
  }

  // 2. intro.alsoKnownAs.title
  if (data.intro) {
    if (!data.intro.alsoKnownAs) data.intro.alsoKnownAs = {};
    data.intro.alsoKnownAs.title = isZh ? '别名' : 'Also Known As';
    
    // Add default items if missing to avoid breaking frontend
    if (!data.intro.alsoKnownAs.items) {
      data.intro.alsoKnownAs.items = isZh 
        ? ["醉钟 (Drunken Clock)", "多瑙河上的直布罗陀"] 
        : ["Drunken Clock", "Gibraltar of the Danube"];
    }
  }

  // 3. Official Management
  data.officialManagement = {
    title: isZh ? '关于彼得罗瓦拉丁堡垒钟塔' : 'About Petrovaradin Fortress Clock Tower',
    text: isZh 
      ? '彼得罗瓦拉丁要塞钟楼由塞尔维亚诺维萨德市管理维护，是诺维萨德市最重要的历史文化遗产之一。作为塞尔维亚最具辨识度的地标钟楼，彼得罗瓦拉丁要塞钟楼见证了多瑙河畔城市 300 余年的岁月变迁。如今，钟楼免费向公众开放，是诺维萨德市民俯瞰城市与多瑙河的核心观景台，也是世界各地游客了解塞尔维亚历史与文化的重要窗口。'
      : 'The Petrovaradin Fortress Clock Tower is managed and maintained by the City of Novi Sad, Serbia, and is one of the most important historical and cultural heritage sites in Novi Sad. As the most recognizable landmark clock tower in Serbia, Petrovaradin Fortress Clock Tower has witnessed over 300 years of history of this Danube riverside city. Today, the clock tower is open to the public free of charge, serving as the core panoramic viewpoint for Novi Sad citizens overlooking the city and the Danube, as well as an important window for visitors from around the world to learn about Serbian history and culture.'
  };

  // 4. Basic Info
  if (data.basicInfo) {
    data.basicInfo.ratingValue = isZh ? '4.8 (14,043条评价)' : '4.8 (14,043 reviews)';
  }

  // 5. Hours (fix and improve)
  if (data.hours) {
    data.hours.summer = isZh ? '堡垒观景台 (夏季)' : 'Fortress Viewpoint (Summer)';
    data.hours.summerTime = isZh ? '全天 24 小时' : '24 Hours';
    data.hours.winter = isZh ? '堡垒观景台 (冬季)' : 'Fortress Viewpoint (Winter)';
    data.hours.winterTime = isZh ? '全天 24 小时' : '24 Hours';
    data.hours.christmas = isZh ? '地下军事隧道' : 'Underground Catacombs';
    data.hours.christmasTime = isZh ? '09:00 - 17:00 (需导游)' : '09:00 - 17:00 (Guided only)';
    data.hours.rosenborg = isZh ? '全景餐厅与咖啡馆' : 'Panoramic Restaurants & Cafés';
    data.hours.rosenborgTime = '09:00 - 23:00';
  }

  // 6. Tickets (fix and improve)
  if (data.tickets) {
    data.tickets.garden = isZh ? '堡垒全域及钟塔外部' : 'Fortress Grounds & Clock Tower';
    data.tickets.gardenPrice = isZh ? '免费' : 'Free';
    data.tickets.rosenborg = isZh ? '堡垒地下军事隧道 (Catacombs)' : 'Underground Military Tunnels';
    data.tickets.adults = isZh ? '成人票' : 'Adults';
    data.tickets.adultsPrice = '300 RSD';
    data.tickets.students = isZh ? '学生/儿童票' : 'Students/Children';
    data.tickets.studentsPrice = '150 RSD';
    data.tickets.under17 = isZh ? '7岁以下儿童' : 'Children under 7';
    data.tickets.under17Price = isZh ? '免费' : 'Free';
    data.tickets.card = isZh ? '诺维萨德城市博物馆联票' : 'Novi Sad City Museum Ticket';
    data.tickets.cardPrice = isZh ? '包含在博物馆门票内，可一并参观' : 'Included with museum admission';
  }

  // 7. Transport (fix and improve)
  if (data.transport) {
    data.transport.metro = isZh ? '步行 (极度推荐)' : 'Walking (Highly Recommended)';
    data.transport.metroDesc = isZh ? '从诺维萨德市中心多瑙河公园出发，步行穿过瓦拉丁大桥，登约214级台阶即可到达。' : 'From Danube Park, walk across Varadin Bridge and climb ~214 steps to the top.';
    data.transport.train = isZh ? '公交' : 'Bus';
    data.transport.trainDesc = isZh ? '从市区搭乘 3, 9, 61, 62, 64 路跨河公交，在过桥后的首站下车后步行上山。' : 'Take bus 3, 9, 61, 62, or 64 across the river and walk up from the first stop.';
    data.transport.bus = isZh ? '自驾/打车' : 'Car / Taxi';
    data.transport.busDesc = isZh ? '车辆可直接开上堡垒，钟塔附近有免费或收费停车场；市区打车单程仅需10分钟。' : 'Drive up the winding road to the fortress parking, or take a 10-min taxi from the city center.';
    data.transport.taxi = isZh ? '旅游巴士' : 'Tour Bus';
    data.transport.taxiDesc = isZh ? '大型旅游团大巴可停靠在堡垒下方的指定停车场。' : 'Large tour buses can park at the designated parking lot below the fortress.';
    data.transport.rideshare = isZh ? '拼车/网约车' : 'Rideshare';
    data.transport.rideshareDesc = isZh ? '诺维萨德当地可使用 Yandex Go 等打车软件，方便快捷到达堡垒顶部。' : 'Use Yandex Go or local taxi apps for a quick ride to the fortress top.';
    data.transport.cycling = isZh ? '自行车' : 'Cycling';
    data.transport.cyclingDesc = isZh ? '堡垒区域支持骑行，但上山坡度较大，建议有经验的骑行者尝试。' : 'Cycling is allowed, but the steep climb is recommended only for experienced cyclists.';
    data.transport.fromStation = isZh ? '从火车站出发' : 'From Train Station';
    data.transport.fromStationDesc = isZh ? '距离堡垒约 3.5 公里，可乘坐公交 61、62 路直达桥头，或打车前往。' : 'About 3.5 km away; take bus 61 or 62, or a taxi.';
    data.transport.fromNyhavn = isZh ? '从自由广场出发' : 'From Liberty Square';
    data.transport.fromNyhavnDesc = isZh ? '距离堡垒约 2 公里，步行 25-30 分钟，沿途可欣赏老城与多瑙河风光。' : 'About 2 km away; a 25-30 minute scenic walk through the old town and across the river.';
  }

  // 8. Route steps
  if (data.route && Array.isArray(data.route.steps)) {
    if (data.route.steps.length > 6) {
      data.route.steps.splice(6);
    }
  }

  // 9. Footer name
  if (data.footer) {
    data.footer.logo = isZh ? '彼得罗瓦拉丁堡垒钟塔' : 'Petrovaradin Fortress Clock Tower';
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
console.log('JSON files updated successfully.');
