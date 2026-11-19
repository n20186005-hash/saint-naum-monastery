import Link from 'next/link';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const destinationMap = 'https://maps.app.goo.gl/s8JhZaSRJxDGzAvX6';
const content = {
  zh: {
    title: '圣瑙姆修道院交通、门票与开放时间指南', subtitle: '从奥赫里德出发：游船、公路、泉群与半日路线',
    intro: '圣瑙姆修道院坐落在奥赫里德湖南端，距离奥赫里德市区约 29 公里。安排交通时要区分「修道院教堂」「外围园区」和「泉群划艇」：这三项的开放安排与收费可能不同。以下把出行选择和需要现场核实的事项分开说明。',
    managementTitle: '关于圣瑙姆修道院及周边的管理',
    management: '修道院是马其顿东正教的宗教场所，位于加利契察国家公园范围内。教堂和宗教活动涉及教会，周围泉水与自然保护涉及国家公园管理机构。访客应分别参考宗教场所的现场公告以及国家公园发布的自然保护与参观规则。',
    optionsTitle: '如何从奥赫里德抵达',
    options: [
      ['沿湖公路与自驾', '沿奥赫里德湖南岸公路行驶，经佩什塔尼和格拉迪什特往柳巴尼什塔方向。出发前查看道路条件，抵达后按现场指示停车；停车收费可能独立于教堂票价。'],
      ['季节性游船', '旅游季常有从奥赫里德港出发的湖上观光航线，部分班次结合沿岸停靠。船期、是否停靠圣瑙姆、往返时刻与价格均应在购票前向营运商核实。'],
      ['巴士及当地交通', '南岸公共交通的班次与终点可能随季节变化。先确认车辆是否抵达圣瑙姆入口，而非仅到附近村庄，并预先查好返程班次。'],
    ],
    timetableTitle: '开放时间与门票应如何核对',
    timetable: ['教堂内部：宗教活动、节庆及季节可能影响开放；进入前查看入口公告与着装要求。', '外围庭院：与教堂室内可能有不同访问安排，不应把全年全天开放当作保证。', '泉群划艇：现场营运、天气与保护规定会影响是否出船；费用和时长需向现场确认。', '付款准备：备少量当地货币，不能假定每个服务点都可刷卡。'],
    routeTitle: '建议半日游览路线',
    route: ['到达圣瑙姆入口，确认返程交通及开放信息', '参观修道院院落，了解圣瑙姆与奥赫里德宗教文化', '在允许开放时参观教堂内部、壁画与圣人墓室', '步行至圣瑙姆泉群，视现场条件选择划艇', '沿湖岸观景，返回停车区或码头'],
    combine: '顺路的其他景点', combines: ['圣瑙姆泉群：观察喀斯特泉水与湿地', '柳巴尼什塔湖滩：沿湖岸短暂停留', '骨头湾水上博物馆：了解史前木桩聚落'],
    faqTitle: '出发前常见问答', faq: [
      ['修道院和泉群是同一个门票吗？', '不一定。教堂内部参观与当地划艇是不同服务，按现场分别确认。'],
      ['需要留多久？', '只看教堂与庭院可安排较短停留；包含泉群和划艇建议留出约半天。'],
      ['能从奥赫里德一日往返吗？', '通常可以，但应先确定最后一班回程交通，尤其是依赖观光游船时。'],
    ],
    map: '打开圣瑙姆 Google 地图定位', home: '返回景点首页', sourceTitle: '官方与管理机构资料', sources: ['加利契察国家公园：圣瑙姆旅游区', '北马其顿旅游机构：修道院指南'],
  },
  en: {
    title: 'Visiting St Naum: Transport, Admission and Opening Guide', subtitle: 'From Ohrid by road or boat, with a route to the springs',
    intro: 'St Naum Monastery stands near the southern end of Lake Ohrid, roughly 29 km from Ohrid town. Plan the church, outer grounds and spring rowboats as distinct experiences: opening arrangements and charges may differ. This guide separates practical choices from details that need a fresh check on site.',
    managementTitle: 'Who manages St Naum and its surroundings?',
    management: 'The monastery is an Orthodox religious site within the wider Galičica National Park landscape. Church matters and worship involve the Macedonian Orthodox Church, while conservation of the surrounding spring ecosystem involves the national park institution. Follow the respective religious-site and protected-area notices.',
    optionsTitle: 'How to reach St Naum from Ohrid',
    options: [
      ['Lakeshore road and car', 'Follow the southern shore road past Peštani and Gradište toward Ljubaništa. Check conditions before departure and follow local parking signs. Parking fees may be separate from church admission.'],
      ['Seasonal excursion boats', 'Tourist-season cruises operate from Ohrid harbour, sometimes with intermediate stops. Check whether a particular sailing calls at St Naum, its return time, fare and cancellation conditions before purchasing.'],
      ['Bus and local transport', 'South-shore service patterns and terminal stops can vary by season. Confirm that your service reaches the monastery entrance rather than stopping in a nearby village, and check the return trip.'],
    ],
    timetableTitle: 'Checking hours and admission',
    timetable: ['Church interior: worship, holidays and the season may affect visitor access; read entrance notices and dress respectfully.', 'Outer grounds: arrangements can differ from church access; do not assume every area is open at all hours.', 'Spring rowboats: weather, conservation rules and local operations determine availability; confirm fare and duration on arrival.', 'Payment: carry some local currency rather than assuming every operator accepts cards.'],
    routeTitle: 'A practical half-day itinerary',
    route: ['Arrive and verify return transport and opening notices', 'Explore the monastery courtyard and its cultural setting', 'Visit the church frescoes and tomb when visitor access is allowed', 'Walk to the springs and consider an operated rowboat', 'Enjoy a lake viewpoint before returning to the road or pier'],
    combine: 'Other places along the route', combines: ['St Naum Springs: karst water and wetland observation', 'Ljubaništa Beach: a quiet lakeshore break', 'Bay of Bones Museum: reconstructed prehistoric stilt settlement'],
    faqTitle: 'Frequently asked questions', faq: [
      ['Does one ticket include the monastery and springs?', 'Not necessarily. Church admission and rowboats are separate services; confirm each at the entrance.'],
      ['How much time do I need?', 'A shorter stop covers church and courtyard; allow around half a day to include the springs and a boat.'],
      ['Can I return to Ohrid on the same day?', 'Usually yes, but verify the last return departure, particularly for seasonal cruises.'],
    ],
    map: 'Open St Naum on Google Maps', home: 'Back to the attraction guide', sourceTitle: 'Official and management sources', sources: ['Galičica National Park: St Naum tourist complex', 'North Macedonia tourism agency: monastery guide'],
  },
};

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params; const c=locale==='zh'?content.zh:content.en;
  const base='https://www.saintnaummonastery.com'; const path='guide/visiting-st-naum';
  return {title:c.title,description:c.intro,alternates:{canonical:`${base}/${locale==='zh'?'':'en/'}${path}`,languages:{zh:`${base}/${path}`,en:`${base}/en/${path}`}}};
}

export default async function VisitingGuide({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;setRequestLocale(locale);const zh=locale==='zh';const c=zh?content.zh:content.en;
  const slugs=['saint-naum-springs','ljubanista-beach','bay-of-bones'];
  const root=`https://www.saintnaummonastery.com${zh?'':'/en'}`;
  const breadcrumb={ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:zh?'首页':'Home',item:root||'https://www.saintnaummonastery.com/'},
    {'@type':'ListItem',position:2,name:c.title,item:`${root}/guide/visiting-st-naum`},
  ]};
  return <><Header/><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
    <section className="pt-32 pb-16 px-5" style={{background:'var(--bg-tertiary)'}}><div className="max-w-4xl mx-auto"><Link href={`/${locale}`} className="text-sm underline" style={{color:'var(--accent)'}}>← {c.home}</Link><h1 className="text-4xl sm:text-5xl font-semibold mt-7 mb-4">{c.title}</h1><p className="text-xl leading-8" style={{color:'var(--text-secondary)'}}>{c.subtitle}</p><a href={destinationMap} target="_blank" rel="noopener noreferrer" className="inline-block mt-7 rounded-full px-6 py-3 text-white font-semibold" style={{background:'var(--accent)'}}>{c.map} ↗</a></div></section>
    <section className="section-padding px-5"><div className="max-w-4xl mx-auto"><h2 className="text-3xl font-semibold mb-5">{zh?'探索与行前准备':'Overview and planning'}</h2><p className="leading-8" style={{color:'var(--text-secondary)'}}>{c.intro}</p><div className="mt-9 p-7 rounded-xl border" style={{background:'var(--bg-tertiary)',borderColor:'var(--border-color)'}}><h2 className="text-2xl font-semibold mb-4">{c.managementTitle}</h2><p className="leading-8">{c.management}</p></div></div></section>
    <section className="section-padding px-5" style={{background:'var(--bg-tertiary)'}}><div className="max-w-4xl mx-auto"><h2 className="text-3xl font-semibold mb-6">{c.optionsTitle}</h2><div className="grid gap-5">{c.options.map(([h,t])=><article key={h} className="rounded-xl p-6" style={{background:'var(--bg-secondary)'}}><h3 className="text-xl font-semibold mb-3">{h}</h3><p className="leading-8" style={{color:'var(--text-secondary)'}}>{t}</p></article>)}</div><h2 className="text-3xl font-semibold mt-14 mb-6">{c.timetableTitle}</h2><ul className="list-disc pl-6 space-y-3 leading-8">{c.timetable.map(x=><li key={x}>{x}</li>)}</ul></div></section>
    <section className="section-padding px-5"><div className="max-w-4xl mx-auto"><h2 className="text-3xl font-semibold mb-7">{c.routeTitle}</h2><ol className="space-y-5">{c.route.map((x,i)=><li key={x} className="flex gap-4"><span className="rounded-full w-9 h-9 flex-shrink-0 flex items-center justify-center text-white" style={{background:'var(--accent)'}}>{i+1}</span><p className="pt-1 leading-7">{x}</p></li>)}</ol><h2 className="text-3xl font-semibold mt-14 mb-6">{c.combine}</h2><div className="grid sm:grid-cols-3 gap-4">{c.combines.map((x,i)=><Link href={`/${locale}/nearby/${slugs[i]}`} key={x} className="rounded-xl p-5 border font-medium hover:underline" style={{borderColor:'var(--border-color)'}}>{x} →</Link>)}</div></div></section>
    <section className="section-padding px-5" style={{background:'var(--bg-tertiary)'}}><div className="max-w-4xl mx-auto"><h2 className="text-3xl font-semibold mb-7">{c.faqTitle}</h2><div className="space-y-5">{c.faq.map(([q,a])=><article key={q}><h3 className="text-lg font-semibold mb-2">{q}</h3><p className="leading-8">{a}</p></article>)}</div><h2 className="text-2xl font-semibold mt-14 mb-4">{c.sourceTitle}</h2><ul className="space-y-3"><li><a target="_blank" rel="noopener noreferrer" className="underline" href="https://galicica.org.mk/en/attractions/tourist-attractions/tourist-complex-sv-naum/">{c.sources[0]}</a></li><li><a target="_blank" rel="noopener noreferrer" className="underline" href="https://tourismmacedonia.gov.mk/wp-content/uploads/2018/09/A-gudie-to-the-monasteries-in-the-RM-1.pdf">{c.sources[1]}</a></li></ul></div></section>
  </main><Footer/></>;
}
