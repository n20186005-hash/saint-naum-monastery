import { useTranslations } from 'next-intl';

export default function PetrovaradinRouteSection() {
  const t = useTranslations('route');

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

        {/* Overview */}
        <div className="p-5 rounded-xl mb-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--accent)', borderLeftWidth: '4px' }}>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('overview')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-color)' }} />

          <div className="space-y-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative flex gap-4">
                {/* Step number */}
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: 'var(--accent)' }}>
                  {i + 1}
                </div>
                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(`steps.${i}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional tips */}
        <div className="mt-8 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('tips.title')}</h4>
          <ul className="space-y-2">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)' }}>•</span>
                {t(`tips.items.${i}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
