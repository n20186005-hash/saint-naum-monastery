import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Header from './Header';
import Footer from './Footer';
import NearbyGuides from './NearbyGuides';
import { guide, type GuideSlug } from '@/lib/nearby';
import { isLocale, localPath, metadataFor, SITE } from '@/lib/site';

export function guideMetadata(locale: string, slug: GuideSlug) {
  if (!isLocale(locale)) notFound();
  const { copy, path } = guide(locale, slug);
  return metadataFor(locale, path, copy.title + ' | Saint Naum Monastery', copy.description);
}

export default function NearbyGuidePage({ locale, slug }: { locale: string; slug: GuideSlug }) {
  if (!isLocale(locale)) notFound();
  const { copy, sources, kind, path, ui } = guide(locale, slug);
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
            <p className="guide-kicker">{kind === 'local' ? ui.local : ui.regional}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold max-w-4xl leading-tight mt-4 mb-6">{copy.title}</h1>
            <p className="text-lg sm:text-xl max-w-3xl leading-relaxed">{copy.subtitle}</p>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)] gap-10 lg:gap-16">
          <article className="min-w-0">
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
            {copy.sections.map((section) => (
              <section key={section.title} className="mb-9">
                <h2 className="font-display text-2xl font-semibold mb-3">{section.title}</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.body}</p>
              </section>
            ))}
            <section className="mt-12" aria-labelledby="guide-questions">
              <h2 id="guide-questions" className="font-display text-2xl font-semibold mb-5">{ui.faq}</h2>
              {copy.faqs.map((faq) => <details key={faq.q} className="guide-faq"><summary>{faq.q}</summary><p className="pt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p></details>)}
            </section>
          </article>
          <aside className="min-w-0 space-y-7">
            <section className="guide-panel">
              <h2 className="font-display text-2xl font-semibold mb-5">{ui.plan}</h2>
              <ol className="list-decimal pl-5 space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {copy.tips.map((tip) => <li key={tip} className="pl-1">{tip}</li>)}
              </ol>
            </section>
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
      <Footer compact />
    </>
  );
}
