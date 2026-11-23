import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { guideLink } from '@/lib/nearby';
import NearbyGuides from './NearbyGuides';
import { nearbyPlaces } from '@/lib/nearbyLegacy';

export default function NearbyExplore({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return <><section id="nearby-explore" className="section-padding" style={{ background:'var(--bg-tertiary)' }}>
    <div className="max-w-5xl mx-auto px-5 sm:px-8">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-center mb-4">{zh?'周边景点 · 深入探索奥赫里德湖南岸':'Nearby places · Explore southern Lake Ohrid'}</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 leading-7" style={{color:'var(--text-secondary)'}}>{zh?'从清泉与湖滩到水上考古遗址，三处真实地点各有独立的游览、交通和地图指南。':'From karst springs and lakeshore beaches to a reconstructed prehistoric settlement, explore three distinct places with their own guides and maps.'}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{nearbyPlaces.map(place=>{
        const c=zh?place.zh:place.en;
        return <Link key={place.slug} href={guideLink(place.slug)} className="block rounded-xl overflow-hidden border hover:shadow-lg transition-shadow" style={{background:'var(--bg-secondary)',borderColor:'var(--border-color)'}}>
          <div className="relative h-48"><Image src={place.image} alt={c.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></div>
          <div className="p-6"><h3 className="font-display text-xl font-semibold mb-2">{c.name}</h3><p className="text-sm leading-6 mb-4" style={{color:'var(--text-secondary)'}}>{c.tagline}</p><span className="font-semibold text-sm" style={{color:'var(--accent)'}}>{zh?'查看完整景点指南':'Read the detailed guide'} →</span></div>
        </Link>;
      })}</div>
      <div className="text-center mt-9"><Link href="/guide/visiting-st-naum" className="inline-flex rounded-full px-6 py-3 font-semibold border hover:underline" style={{borderColor:'var(--accent)',color:'var(--accent)'}}>{zh?'圣瑙姆交通、开放时间与门票实用指南':'Practical guide: transport, hours and admission'} →</Link></div>
    </div>
  </section><NearbyGuides omit={nearbyPlaces.map(({ slug }) => slug)} /></>;
}
