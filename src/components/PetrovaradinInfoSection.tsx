import { useTranslations } from 'next-intl';

export default function PetrovaradinInfoSection() {
  const t = useTranslations('knowledge');

  const sections = [
    { id: 'history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'architecture', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'culture', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12" style={{ background: 'var(--accent)' }} />

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d={section.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t(`sections.${index}.title`)}
                </h3>
              </div>
              <p className="text-base leading-relaxed whitespace-pre-line ml-13" style={{ color: 'var(--text-secondary)' }}>
                {t(`sections.${index}.content`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
