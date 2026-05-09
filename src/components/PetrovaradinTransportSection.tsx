import { useTranslations } from 'next-intl';

export default function PetrovaradinTransportSection() {
  const t = useTranslations('transport');

  const transportOptions = [
    { key: 'walking', icon: 'M13 4v16l7-4 7 4V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z' },
    { key: 'bus', icon: 'M8 6v6M15 6v6M2 12h19.6M18 18h3M3 18h1M6 18h1M17 18h1M9 18h1M12 6v12M6 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z' },
    { key: 'car', icon: 'M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 11l2-4h10l2 4M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2M7 9v2M17 9v2' },
  ];

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

        <div className="space-y-4">
          {/* Walking */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d={transportOptions[0].icon} />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t('walking.title')}
                  <span className="ml-2 text-sm font-normal" style={{ color: 'var(--accent)' }}>{t('walking.badge')}</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('walking.desc')}</p>
              </div>
            </div>
          </div>

          {/* Bus */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d={transportOptions[1].icon} />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('bus.title')}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('bus.desc')}</p>
              </div>
            </div>
          </div>

          {/* Car/Taxi */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d={transportOptions[2].icon} />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('car.title')}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('car.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
