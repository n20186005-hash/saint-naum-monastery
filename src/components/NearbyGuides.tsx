import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { guideSlugs, guide, labels, type GuideSlug } from '@/lib/nearby';

export default function NearbyGuides({ exclude }: { exclude?: GuideSlug }) {
  const locale = useLocale() as Locale;
  const ui = labels(locale);
  return (
    <section id="nearby" className="section-padding nearby-section">
      <div className="max-w-6xl mx-auto">
        <p className="guide-kicker">{exclude ? ui.related : ui.nearby}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3 mb-4">{ui.heading}</h2>
        <p className="max-w-2xl mb-9" style={{ color: 'var(--text-secondary)' }}>{ui.intro}</p>
        <div className={exclude ? 'grid md:grid-cols-2 gap-5' : 'grid md:grid-cols-3 gap-5'}>
          {guideSlugs.filter((slug) => slug !== exclude).map((slug, index) => {
            const { copy, path, kind } = guide(locale, slug);
            return (
              <Link key={slug} href={path} className="guide-card">
                <span className="guide-number" aria-hidden="true">0{index + 1}</span>
                <span className="guide-kicker">{kind === 'local' ? ui.local : ui.regional}</span>
                <h3 className="font-display text-2xl font-semibold my-3">{copy.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{copy.subtitle}</p>
                <span className="guide-action">{ui.read} <span aria-hidden="true">→</span></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
