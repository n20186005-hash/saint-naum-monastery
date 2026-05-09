import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function PetrovaradinFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 px-4" style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Logo & Copyright */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('logo')}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('rights')}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="/petrovaradin-fortress-clock/privacy-policy" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
            {t('privacy')}
          </Link>
          <Link href="/petrovaradin-fortress-clock/terms-of-service" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
            {t('terms')}
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
