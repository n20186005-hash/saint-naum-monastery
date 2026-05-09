import { useTranslations } from 'next-intl';

export default function PetrovaradinHoursSection() {
  const t = useTranslations('hours');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {/* Main hours */}
          <div className="flex justify-between items-center p-4 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('fortress')}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('fortressDesc')}</p>
            </div>
            <span className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>{t('fortressTime')}</span>
          </div>

          {/* Cafe hours */}
          <div className="flex justify-between items-center p-4 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('cafe')}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('cafeDesc')}</p>
            </div>
            <span className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>{t('cafeTime')}</span>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('tip')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
