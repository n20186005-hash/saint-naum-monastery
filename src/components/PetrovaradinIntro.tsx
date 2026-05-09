import { useTranslations } from 'next-intl';

export default function PetrovaradinIntro() {
  const t = useTranslations('intro');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Main description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>
        </div>

        {/* About Section */}
        <div className="mb-12 p-6 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-display text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('aboutTitle')}
          </h3>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('aboutText')}
          </p>
        </div>

        {/* Visit Guide */}
        <div className="mb-10">
          <h3 className="font-display text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('visitGuide.title')}
          </h3>
          <ul className="space-y-2">
            {['visitGuide.items'].map((key, idx) => {
              const items = key === 'visitGuide.items' ? [
                t('visitGuide.items.0'),
                t('visitGuide.items.1'),
                t('visitGuide.items.2'),
                t('visitGuide.items.3'),
              ] : [];
              return items.map((item, i) => (
                <li key={`${idx}-${i}`} className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span className="text-base" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ));
            })}
          </ul>
        </div>

        {/* Also Known As / Highlights */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('highlights.title')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              t('highlights.items.0'),
              t('highlights.items.1'),
              t('highlights.items.2'),
              t('highlights.items.3'),
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-lg"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
