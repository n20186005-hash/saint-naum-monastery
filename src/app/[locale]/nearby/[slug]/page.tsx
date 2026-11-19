import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { nearbyPlaces } from '@/lib/nearby';
import { nearbyExtra } from '@/lib/nearbyExtra';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return ['en', 'zh'].flatMap(locale => nearbyPlaces.map(place => ({ locale, slug: place.slug })));
}

export async function generateMetadata({params}: {params: Promise<{locale:string;slug:string}>}): Promise<Metadata> {
  const {locale,slug} = await params;
  const place = nearbyPlaces.find(p=>p.slug===slug);
  if (!place) return {};
  const c = locale === 'zh' ? place.zh : place.en;
  const base = 'https://www.saintnaummonastery.com';
  return {
    title: `${c.name} | ${locale === 'zh' ? '圣瑙姆周边景点' : 'St Naum nearby attractions'}`,
    description: c.overview,
    alternates: {
      canonical: `${base}/${locale === 'zh' ? '' : 'en/'}nearby/${slug}`,
      languages: {en:`${base}/en/nearby/${slug}`,zh:`${base}/nearby/${slug}`,'x-default':`${base}/en/nearby/${slug}`},
    },
    openGraph: {title:c.name,description:c.overview,url:`${base}/${locale==='zh'?'':'en/'}nearby/${slug}`,locale:locale==='zh'?'zh_CN':'en_US',type:'article'},
  };
}

export default async function NearbyDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = nearbyPlaces.find(item => item.slug === slug);
  if (!place) notFound();
  const zh = locale === 'zh';
  const c = zh ? place.zh : place.en;
  const extra = nearbyExtra[slug][zh ? 'zh' : 'en'];
  const labels = zh ? {
    home: '返回圣瑙姆指南', about: '关于这里与管理主体', basics: '基本信息', features: '探索景观特色', history: '历史背景', architecture: '建筑与空间', nature: '自然观察',
    visit: '建议游览路线', photo: '拍摄机位', transport: '交通方式', hours: '开放信息', tickets: '门票与费用', faq: '常见问答', map: '在 Google 地图查看专属地点', source: '核对来源', nearby: '继续探索附近景点', stay: '住宿与行程建议', stayText: '以奥赫里德市区作为住宿基地，沿湖南岸安排半日或一日行程。季节性船期、停车与返程交通请提前核对。', reviews: '游客评价', reviewsText: '请前往此地点的 Google 地图页面查看最新用户评价；本站不为尚未同步的景点编造评分。'
  } : {
    home: 'Back to St Naum guide', about: 'About this place and its management', basics: 'Essential information', features: 'What makes it special', history: 'Historical background', architecture: 'Architecture and space', nature: 'What to observe',
    visit: 'Suggested route', photo: 'Photo viewpoints', transport: 'Getting there', hours: 'Opening information', tickets: 'Admission and costs', faq: 'Frequently asked questions', map: 'Open this place on Google Maps', source: 'Check source', nearby: 'Explore more nearby', stay: 'Where to stay and plan', stayText: 'Ohrid town makes a practical overnight base for a half- or full-day journey along the southern lakeshore. Check seasonal boats, parking and return transport in advance.', reviews: 'Visitor reviews', reviewsText: 'Use this place’s own Google Maps listing for recent visitor reviews. No unverified rating is displayed here.'
  };
  return <>
    <Header />
    <main>
      <section className="relative min-h-[500px] flex items-end pt-24 pb-16">
        <Image src={place.image} alt={c.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full text-white">
          <Link href={`/${locale}#nearby-explore`} className="text-sm underline underline-offset-4 text-white/85">← {labels.home}</Link>
          <p className="mt-8 text-sm tracking-widest uppercase text-white/80">{zh?'奥赫里德湖 · 周边指南':'Lake Ohrid · Nearby guide'}</p>
          <h1 className="font-display text-4xl sm:text-6xl mt-3 mb-4">{c.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{c.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-5 text-sm">
            <span className="rounded-full border border-white/60 px-3 py-1.5">{extra.category}</span>
            <span className="rounded-full border border-white/60 px-3 py-1.5">{zh?'建议停留':'Suggested visit'} · {extra.duration}</span>
            <a href={place.map} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/60 px-3 py-1.5 underline underline-offset-4">{zh?'Google 地图评分与评价':'Google Maps rating & reviews'} ↗</a>
          </div>
          <p className="mt-5 text-white/85">📍 {c.location}</p>
          <p className="mt-1 text-sm text-white/80">{c.hours}</p>
          <a href={place.map} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-white text-slate-900 rounded-full px-6 py-3 font-semibold hover:bg-slate-100">{labels.map} ↗</a>
        </div>
      </section>
      <section className="section-padding max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-wider uppercase mb-3" style={{color:'var(--accent)'}}>{zh?'探索景点':'Explore the place'}</p>
        <h2 className="text-3xl font-semibold mb-5">{zh?`走进${c.name}`:`Discover ${c.name}`}</h2>
        <p className="text-lg leading-8" style={{ color: 'var(--text-secondary)' }}>{c.overview}</p>
        <p className="text-base leading-8 mt-5" style={{color:'var(--text-secondary)'}}>{extra.introduction}</p>
        <h3 className="text-2xl font-semibold mt-10 mb-5">{zh?'出发前的游览建议':'Plan your visit'}</h3>
        <ul className="grid sm:grid-cols-2 gap-4">{extra.planning.map((item,i)=><li key={item} className="rounded-xl border p-5 flex gap-3 leading-7" style={{borderColor:'var(--border-color)'}}><span className="font-bold" style={{color:'var(--accent)'}}>{i+1}.</span>{item}</li>)}</ul>
        <div className="mt-10 rounded-2xl p-7 sm:p-9 border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-semibold mb-4">{labels.about}</h2>
          <p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{c.management}</p>
          <a className="inline-block mt-4 underline" style={{ color: 'var(--accent)' }} href={place.source} target="_blank" rel="noopener noreferrer">{labels.source} ↗</a>
        </div>
      </section>
      <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}><div className="max-w-5xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl font-semibold mb-6">{labels.features}</h2>
        <div className="grid md:grid-cols-3 gap-4">{c.highlights.map((v,i)=><div key={v} className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><span className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>0{i+1}</span><p className="mt-3 leading-7">{v}</p></div>)}</div>
        <h2 className="text-3xl font-semibold mt-14 mb-5">{labels.basics}</h2>
        <dl className="grid sm:grid-cols-2 gap-4">{[[zh?'景点类型':'Attraction type',extra.category],[zh?'建议停留':'Suggested duration',extra.duration],[zh?'最佳参观时段':'Best time to visit',extra.bestTime],[zh?'抵达方式与入口':'Access and entrance',extra.access],[labels.transport,c.transport],[labels.hours,c.hours],[labels.tickets,c.tickets],[zh?'具体地点':'Location',c.location]].map(([k,v])=><div key={k} className="rounded-xl p-5 border" style={{ borderColor:'var(--border-color)' }}><dt className="font-semibold mb-2">{k}</dt><dd className="leading-7" style={{color:'var(--text-secondary)'}}>{v}</dd></div>)}</dl>
        <p className="mt-6 text-sm leading-7" style={{color:'var(--text-secondary)'}}>{extra.details}</p>
      </div></section>
      <section className="section-padding max-w-5xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl font-semibold mb-7">{zh?'深入发现':'Discover in detail'}</h2>
        <div className="grid md:grid-cols-3 gap-7">{[[labels.history,c.history],[labels.architecture,c.architecture],[labels.nature,c.nature]].map(([k,v])=><article key={k}><h3 className="text-xl font-semibold mb-3">{k}</h3><p className="leading-8" style={{color:'var(--text-secondary)'}}>{v}</p></article>)}</div>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <article className="rounded-xl p-6" style={{background:'var(--bg-tertiary)'}}><h3 className="text-xl font-semibold mb-4">{zh?'人文与文化背景':'Culture and historical context'}</h3><p className="leading-8" style={{color:'var(--text-secondary)'}}>{extra.culture}</p></article>
          <article className="rounded-xl p-6" style={{background:'var(--bg-tertiary)'}}><h3 className="text-xl font-semibold mb-4">{zh?'核心体验与观察重点':'Core experience and observation'}</h3><p className="leading-8" style={{color:'var(--text-secondary)'}}>{extra.experience}</p></article>
        </div>
        <h2 className="text-3xl font-semibold mt-14 mb-6">{labels.visit}</h2>
        <p className="leading-8 mb-6" style={{color:'var(--text-secondary)'}}>{extra.itinerary}</p>
        <ol className="space-y-4">{c.visit.map((v,i)=><li key={v} className="flex gap-4 items-start"><span className="rounded-full flex-shrink-0 w-9 h-9 text-white flex items-center justify-center" style={{background:'var(--accent)'}}>{i+1}</span><p className="pt-1 leading-7">{v}</p></li>)}</ol>
        <h2 className="text-3xl font-semibold mt-14 mb-6">{zh?'游览须知':'Visitor guidance'}</h2>
        <ul className="list-disc pl-6 space-y-3 leading-8" style={{color:'var(--text-secondary)'}}>{extra.etiquette.map(v=><li key={v}>{v}</li>)}</ul>
        <h2 className="text-3xl font-semibold mt-14 mb-6">{labels.photo}</h2>
        <ul className="list-disc pl-6 space-y-3 leading-8">{c.photo.map(v=><li key={v}>{v}</li>)}</ul>
        <figure className="mt-8 max-w-3xl"><div className="relative h-64 sm:h-96 rounded-xl overflow-hidden"><Image src={place.image} alt={`${c.name} — ${c.tagline}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div><figcaption className="mt-2 text-sm" style={{color:'var(--text-muted)'}}>{c.name} · {zh?'景点实景':'On-location view'}</figcaption></figure>
        <div className="grid md:grid-cols-2 gap-5 mt-14"><div className="rounded-xl border p-6" style={{borderColor:'var(--border-color)'}}><h3 className="text-xl font-semibold mb-3">{labels.stay}</h3><p className="leading-7">{labels.stayText}</p></div><div className="rounded-xl border p-6" style={{borderColor:'var(--border-color)'}}><h3 className="text-xl font-semibold mb-3">{labels.reviews}</h3><p className="leading-7">{labels.reviewsText}</p><a href={place.map} className="inline-block mt-3 underline" style={{color:'var(--accent)'}}>{labels.map} ↗</a></div></div>
      </section>
      <section className="section-padding" style={{background:'var(--bg-tertiary)'}}><div className="max-w-5xl mx-auto px-5 sm:px-8"><h2 className="text-3xl font-semibold mb-7">{labels.faq}</h2><div className="space-y-4">{c.faq.map(({q,a})=><div key={q} className="rounded-xl p-6" style={{background:'var(--bg-secondary)'}}><h3 className="text-lg font-semibold mb-2">{q}</h3><p className="leading-7" style={{color:'var(--text-secondary)'}}>{a}</p></div>)}</div>
        <h2 className="text-3xl font-semibold mt-14 mb-5">{zh?'交通导航':'Map and directions'}</h2><p className="mb-5">{c.transport}</p><p className="mb-5">{c.location}</p><a href={place.map} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full text-white px-6 py-3 font-semibold" style={{background:'var(--accent)'}}>{labels.map} ↗</a>
        <h2 className="text-3xl font-semibold mt-14 mb-5">{labels.nearby}</h2><div className="grid sm:grid-cols-2 gap-5">{nearbyPlaces.filter(p=>p.slug!==slug).map(p=><Link className="rounded-xl overflow-hidden border hover:shadow-md transition-shadow" style={{borderColor:'var(--border-color)',background:'var(--bg-secondary)'}} key={p.slug} href={`/${locale}/nearby/${p.slug}`}><div className="relative h-40"><Image src={p.image} alt={zh?p.zh.name:p.en.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover"/></div><p className="p-5 font-semibold">{zh?p.zh.name:p.en.name} →</p></Link>)}</div>
      </div></section>
    </main><Footer />
  </>;
}
