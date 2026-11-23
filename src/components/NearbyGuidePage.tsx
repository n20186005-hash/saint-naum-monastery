import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Header from './Header';
import Footer from './Footer';
import NearbyGuides from './NearbyGuides';
import { guide, groups, hasGuide } from '@/lib/nearby';
import { isLocale, localPath, metadataFor, SITE } from '@/lib/site';

export function guideMetadata(locale: string, slug: string) {
  if (!isLocale(locale) || !hasGuide(slug)) notFound();
  const { copy, path } = guide(locale, slug);
  return metadataFor(locale, path, copy.title + ' | Saint Naum Monastery', copy.description);
}

export default function NearbyGuidePage({ locale, slug }: { locale: string; slug: string }) {
  if (!isLocale(locale) || !hasGuide(slug)) notFound();
  const { copy, sources, group, path, ui, map, photo, location, manager, hours, tickets, route, view, legacyCopy, extra, details, visitor, museum, parkTicket } = guide(locale, slug);
  const zh = locale === 'zh';
  const text = zh ? {
    basics: '基本信息', place: '地点', hours: '开放时间', tickets: '门票',
    photography: '拍摄位置',
    reviews: '游客评分与评价', live: '在 Google Maps 查看此地点最新评分、评价数量及近期留言。', photo: '照片', resized: '已调整尺寸',
  } : {
    basics: 'Basic information', place: 'Location', hours: 'Opening hours', tickets: 'Admission',
    photography: 'Photo viewpoint',
    reviews: 'Visitor ratings and reviews', live: 'See the current rating, review count and recent visitor comments for this place on Google Maps.', photo: 'Photo', resized: 'Resized',
  };
  const data = zh ? {
    discover: '探索景点', tips: '游览建议', highlight: '景区特色', type: '景点类型',
    region: '所在区域', timing: '建议游览时间', manager: '管理与维护', route: '游览路线',
    notice: '游览须知', stay: '住宿建议', directions: '交通指南', map: '在 Google Maps 查看位置',
  } : {
    discover: 'Discover the attraction', tips: 'Visit tips', highlight: 'Highlights', type: 'Attraction type',
    region: 'Area', timing: 'Suggested visit length', manager: 'Management and maintenance', route: 'Suggested route',
    notice: 'Visitor information', stay: 'Where to stay', directions: 'Location and directions', map: 'View location on Google Maps',
  };
  const facts = [
    [zh ? '景点名称' : 'Attraction', copy.title],
    [data.type, visitor.type],
    [data.region, groups[group][locale]],
    [text.place, location],
    [data.timing, zh ? `${visitor.duration} 分钟（行程估算）` : `${visitor.duration} minutes (planning estimate)`],
    [data.manager, manager],
  ];
  const sourceList = sources.filter((source, index) => sources.findIndex(({ url }) => url === source.url) === index);
  const url = SITE + localPath(locale, path);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url + '#page', name: copy.title, description: copy.description,
        url, inLanguage: locale === 'zh' ? 'zh-CN' : 'en', breadcrumb: { '@id': url + '#breadcrumbs' } },
      { '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs', itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.home, item: SITE + localPath(locale) },
        { '@type': 'ListItem', position: 2, name: copy.title, item: url },
      ] },
    ],
  };
  return (
    <>
      <Header solid />
      <main id="main-content" className="pt-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <section className="guide-hero">
          <div className="max-w-6xl mx-auto">
            <nav aria-label={locale === 'zh' ? '面包屑导航' : 'Breadcrumb'} className="text-sm mb-10">
              <Link href="/" className="hover:underline">{ui.home}</Link>
              <span className="mx-3" aria-hidden="true">/</span><span aria-current="page">{copy.title}</span>
            </nav>
            <p className="guide-kicker">{groups[group][locale]}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold max-w-4xl leading-tight mt-4 mb-6">{copy.title}</h1>
            <p className="text-lg sm:text-xl max-w-3xl leading-relaxed">{copy.subtitle}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5">
              <a href={map} className="underline underline-offset-4">{data.map} →</a>
              <a href="#guide-hours" className="underline underline-offset-4">{text.hours}</a>
              <a href="#guide-reviews" className="underline underline-offset-4">{text.reviews}</a>
            </div>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-6 pt-10">
          <div className="max-w-3xl mb-7">
            <h2 className="font-display text-2xl font-semibold mb-3">{data.discover}</h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
            <h3 className="font-display text-xl font-semibold mt-5 mb-2">{data.tips}</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{details?.tip ?? copy.tips[0] ?? visitor.notice}</p>
            <h3 className="font-display text-xl font-semibold mt-5 mb-2">{data.highlight}</h3>
            {details ? <a href="#guide-highlights" className="underline underline-offset-4">
              {zh ? '查看建筑、地形与观察重点' : 'See the architecture, landscape and what to notice'}
            </a> : <p className="leading-relaxed">{copy.subtitle}</p>}
          </div>
          <section className="guide-panel" aria-labelledby="about-attraction">
            <h2 id="about-attraction" className="font-display text-2xl font-semibold mb-3">
              {zh ? `关于${copy.title}` : `About ${copy.title}`}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{manager}</p>
          </section>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)] gap-10 lg:gap-16">
          <article className="min-w-0">
            {photo && <figure className="mb-9">
              {/* The local image has already been resized for this layout. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.path} alt={photo.alt?.[locale] ?? copy.title} className="w-full aspect-[3/2] object-cover rounded-xl" />
              <figcaption className="text-sm mt-2">
                {text.photo} {' · '}<a className="underline" href={photo.page}>
                  {zh && photo.artist === 'Unknown author' ? '作者不详' : photo.artist}
                </a>
                {' · '}<a className="underline" href={photo.licenseUrl}>{photo.license}</a>{' · '}{text.resized}
              </figcaption>
            </figure>}
            <section className="guide-panel mb-9" aria-labelledby="guide-basic">
              <h2 id="guide-basic" className="font-display text-2xl font-semibold mb-4">{text.basics}</h2>
              <table aria-labelledby="guide-basic" className="w-full text-sm sm:text-base">
                <tbody>
                  {facts.map(([key, value]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th scope="row" className="text-left align-top py-3 pr-3 w-1/3">{key}</th>
                      <td className="py-3" style={{ color: 'var(--text-secondary)' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section id="guide-hours" className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{text.hours}</h2>
              <p className="leading-relaxed">{hours}</p>
              {museum && <p className="leading-relaxed mt-2">
                {zh
                  ? `馆方公布的常规时段为冬季 ${museum.winter}、夏季 ${museum.summer}，周一闭馆。节假日与季节交接前请核实。`
                  : `The museum lists winter hours of ${museum.winter} and summer hours of ${museum.summer}, with Monday closures. Check holiday and seasonal changeover dates before visiting.`}
              </p>}
            </section>
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{zh ? '门票价格' : 'Admission prices'}</h2>
              <p className="leading-relaxed">{tickets}</p>
              {museum && <p className="leading-relaxed mt-2">
                {zh ? '馆方 2022 年公布的参考票价为境外游客 150 马其顿代纳尔、本国成人 120 代纳尔、本国儿童及学生 60 代纳尔。当前价格以购票时公告为准。'
                  : 'The museum’s 2022 decision lists 150 MKD for international visitors, 120 MKD for domestic adults, and 60 MKD for domestic children and students. Check the current price at purchase.'}
              </p>}
              {parkTicket && <a className="underline mt-2 inline-block" href={parkTicket}>{zh ? '查询官方门票目录' : 'Check the park’s ticket listings'}</a>}
            </section>
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{zh ? '交通方式' : 'Getting there'}</h2>
              <p className="leading-relaxed">{route}</p>
            </section>
            {details && <section id="guide-highlights" className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{zh ? '发现景点魅力' : 'What makes this place special'}</h2>
              <h3 className="font-display text-xl font-semibold mb-2">{zh ? '历史与地方背景' : 'History and setting'}</h3>
              <p className="leading-relaxed">{details.history}</p>
              <h3 className="font-display text-xl font-semibold mt-5 mb-2">{zh ? '建筑、地形与观察重点' : 'Architecture, landscape and what to notice'}</h3>
              <p className="leading-relaxed">{details.observation}</p>
            </section>}
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{data.route}</h2>
              <ol className="list-decimal pl-5 space-y-3">
                {(details?.routeSteps ?? (copy.tips.length ? copy.tips : [route])).map((step) => <li key={step}>{step}</li>)}
              </ol>
            </section>
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{data.notice}</h2>
              <p className="leading-relaxed">{visitor.notice}</p>
            </section>
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{text.photography}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{view}</p>
            </section>
            {copy.sections.map((section) => (
              <section key={section.title} className="mb-9">
                <h2 className="font-display text-2xl font-semibold mb-3">{section.title}</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.body}</p>
              </section>
            ))}
            {legacyCopy && extra && (
              <section className="guide-panel mb-9">
                <h2 className="font-display text-2xl font-semibold mb-4">{zh ? '延伸游览资料' : 'More visitor information'}</h2>
                <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
                  {[legacyCopy.overview, legacyCopy.management, legacyCopy.history, legacyCopy.architecture,
                    legacyCopy.nature, extra.introduction, extra.culture, extra.experience,
                    extra.itinerary, extra.details, legacyCopy.transport].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <p>{extra.category} · {extra.duration} · {extra.bestTime}</p>
                  <p>{extra.access}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {[...legacyCopy.highlights, ...legacyCopy.visit, ...legacyCopy.photo,
                      ...extra.planning, ...extra.etiquette].map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </section>
            )}
            {copy.faqs.length > 0 && <section className="mt-12" aria-labelledby="guide-questions">
              <h2 id="guide-questions" className="font-display text-2xl font-semibold mb-5">{ui.faq}</h2>
              {[...copy.faqs, ...(legacyCopy?.faq ?? [])].map((faq) => <details key={faq.q} className="guide-faq"><summary>{faq.q}</summary><p className="pt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p></details>)}
            </section>}
            <section className="mt-9 guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-3">{data.stay}</h2>
              <p className="leading-relaxed">{visitor.stay}</p>
            </section>
            <section id="guide-reviews" className="mt-7 guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-3">{text.reviews}</h2>
              <p className="leading-relaxed mb-3">{text.live}</p>
              <a href={map} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>Google Maps →</a>
            </section>
            <section className="mt-7 guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-3">{data.directions}</h2>
              <address className="not-italic mb-3">{location}</address>
              <a href={map} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{data.map} →</a>
            </section>
          </article>
          <aside className="min-w-0 space-y-7">
            {copy.tips.length > 0 && <section className="guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-5">{ui.plan}</h2>
              <ol className="list-decimal pl-5 space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {copy.tips.map((tip) => <li key={tip} className="pl-1">{tip}</li>)}
              </ol>
            </section>}
            <section className="guide-panel">
              <h2 className="font-display text-xl font-semibold mb-4">{ui.sources}</h2>
              <ul className="space-y-4 text-sm leading-relaxed">
                {sourceList.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{source[locale]}<span className="sr-only">{locale === 'zh' ? '（新标签页）' : ' (new tab)'}</span></a></li>)}
              </ul>
            </section>
            <Link href={{ pathname: '/', hash: 'nearby' }} className="inline-block hover:underline" style={{ color: 'var(--accent)' }}>← {ui.back}</Link>
          </aside>
        </div>
        <NearbyGuides exclude={slug} />
      </main>
      <Footer />
    </>
  );
}
