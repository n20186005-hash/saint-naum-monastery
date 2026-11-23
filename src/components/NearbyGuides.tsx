import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { guideSlugs, guide, guideLink, groups, labels } from '@/lib/nearby';

export default function NearbyGuides({ exclude, omit = [] }: { exclude?: string; omit?: string[] }) {
  const locale = useLocale() as Locale;
  const ui = labels(locale);
  const entries = guideSlugs.filter((slug) => !omit.includes(slug)).map((slug) => ({ slug, ...guide(locale, slug) }));
  const current = entries.find(({ slug }) => slug === exclude);
  const grouped = current
    ? [[current.group, entries.filter(({ slug, group }) => slug !== exclude && group === current.group).slice(0, 3)]] as const
    : Object.keys(groups).map((group) => [group as keyof typeof groups, entries.filter((entry) => entry.group === group)] as const);

  return (
    <section id="nearby" className="section-padding nearby-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">{current ? ui.related : ui.heading}</h2>
        {!current && <p className="max-w-2xl mb-9" style={{ color: 'var(--text-secondary)' }}>
          {ui.intro}
        </p>}
        {grouped.map(([group, list]) => (
          <div key={group} className="mt-8">
            <h3 className="font-display text-xl font-semibold mb-4">{groups[group][locale]}</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {list.map(({ slug, copy }) => (
                <Link key={slug} href={guideLink(slug)} className="guide-card">
                  <h4 className="font-display text-xl font-semibold mb-3">{copy.title}</h4>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{copy.subtitle}</p>
                  <span className="guide-action">{ui.read} <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
