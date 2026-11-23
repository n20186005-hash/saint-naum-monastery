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
  const { copy, sources, group, path, ui, map, photo, location, manager, hours, tickets, route, view, legacyCopy, extra, details } = guide(locale, slug);
  const zh = locale === 'zh';
  const text = zh ? {
    map: '地图与访客评价', basics: '基本信息', place: '地点', hours: '开放时间', tickets: '门票',
    transport: '交通与游览路线', photography: '拍摄位置',
    reviews: '游客评分与评价', live: '在 Google Maps 查看此地点最新评分、评价数量及近期留言。', photo: '照片', resized: '已调整尺寸',
  } : {
    map: 'Map and visitor reviews', basics: 'Basic information', place: 'Location', hours: 'Opening hours', tickets: 'Admission',
    transport: 'Getting there and visiting', photography: 'Photo viewpoint',
    reviews: 'Visitor ratings and reviews', live: 'See the current rating, review count and recent visitor comments for this place on Google Maps.', photo: 'Photo', resized: 'Resized',
  };
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
          <section className="max-w-6xl mx-auto px-6 pt-10" aria-labelledby="about-attraction">
          <div className="guide-panel">
            <h2 id="about-attraction" className="font-display text-2xl font-semibold mb-3">
              {zh ? `关于${copy.title}` : `About ${copy.title}`}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{manager}</p>
            <p className="leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
          </div>
        </section>
        <div className="max-w-6xl mx-auto">
            <nav aria-label={locale === 'zh' ? '面包屑导航' : 'Breadcrumb'} className="text-sm mb-10">
              <Link href="/" className="hover:underline">{ui.home}</Link>
              <span className="mx-3" aria-hidden="true">/</span><span aria-current="page">{copy.title}</span>
            </nav>
            <p className="guide-kicker">{groups[group][locale]}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold max-w-4xl leading-tight mt-4 mb-6">{copy.title}</h1>
            <p className="text-lg sm:text-xl max-w-3xl leading-relaxed">{copy.subtitle}</p>
            <a href={map} className="inline-block mt-5 underline underline-offset-4">{text.map} →</a>
          </div>
        </section>
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
            {details && <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{zh ? '游览建议' : 'Planning your visit'}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{details.tip}</p>
            </section>}
            <section className="guide-panel mb-9">
              <h2 className="font-display text-2xl font-semibold mb-4">{text.basics}</h2>
              <dl className="space-y-3">
                {[[text.place, location], [text.hours, hours], [text.tickets, tickets]].map(([key, value]) => (
                  <div key={key}><dt className="font-semibold">{key}</dt><dd style={{ color: 'var(--text-secondary)' }}>{value}</dd></div>
                ))}
              </dl>
            </section>
            <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{text.transport}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{route}</p>
              {details && <ol className="list-decimal pl-5 space-y-3 mt-4" style={{ color: 'var(--text-secondary)' }}>
                {details.routeSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>}
            </section>
            {details && <section className="mb-9">
              <h2 className="font-display text-2xl font-semibold mb-3">{zh ? '历史与地方背景' : 'History and setting'}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{details.history}</p>
              <h3 className="font-display text-xl font-semibold mt-5 mb-2">{zh ? '建筑、地形与观察重点' : 'Architecture, landscape and what to notice'}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{details.observation}</p>
            </section>}
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
          </article>
          <aside className="min-w-0 space-y-7">
            <section className="guide-panel">
              <h2 className="font-display text-xl font-semibold mb-3">{text.reviews}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{text.live}</p>
              <a href={map} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>Google Maps →</a>
            </section>
            {copy.tips.length > 0 && <section className="guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-5">{ui.plan}</h2>
              <ol className="list-decimal pl-5 space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {copy.tips.map((tip) => <li key={tip} className="pl-1">{tip}</li>)}
              </ol>
            </section>}
            <section className="guide-panel">
              <h2 className="font-display text-xl font-semibold mb-4">{ui.sources}</h2>
              <ul className="space-y-4 text-sm leading-relaxed">
                {sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{source[locale]}<span className="sr-only">{locale === 'zh' ? '（新标签页）' : ' (new tab)'}</span></a></li>)}
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
