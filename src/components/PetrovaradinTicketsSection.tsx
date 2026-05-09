import { useTranslations } from 'next-intl';

export default function PetrovaradinTicketsSection() {
  const t = useTranslations('tickets');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Free admission */}
          <div className="p-6 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('fortress')}
            </h3>
            <p className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{t('free')}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('fortressDesc')}</p>
          </div>

          {/* Catacombs */}
          <div className="p-6 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('catacombs')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{t('catacombsDesc')}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('catacombsNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
