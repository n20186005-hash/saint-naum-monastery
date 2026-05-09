import { useTranslations } from 'next-intl';

export default function PetrovaradinHotelsSection() {
  const t = useTranslations('hotels');

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="p-5">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t(`hotels.${i}.name`)}
                </h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(`hotels.${i}.desc`)}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  {t(`hotels.${i}.price`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Exit Festival warning */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('exitWarning')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
