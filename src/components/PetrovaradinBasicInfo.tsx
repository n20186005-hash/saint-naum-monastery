import { useTranslations } from 'next-intl';

export default function PetrovaradinBasicInfo() {
  const t = useTranslations('basicInfo');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Official Name */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('officialName')}</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('officialNameValue')}</p>
          </div>

          {/* Type */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('type')}</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('typeValue')}</p>
          </div>

          {/* Country */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('country')}</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('countryValue')}</p>
          </div>

          {/* City */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('city')}</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('cityValue')}</p>
          </div>

          {/* Google Rating */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('googleRating')}</p>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0b429" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('ratingValue')}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('phone')}</p>
            <a href="tel:+381216433145" className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>
              {t('phoneValue')}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('address')}</p>
          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('addressValue')}</p>
        </div>
      </div>
    </section>
  );
}
