'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false }: { solid?: boolean }) {
  const activeLocale = useLocale();
  const t = useTranslations('header');
  const hero = useTranslations('hero');
  const [scrolled, setScrolled] = useState(false);

  const surface = solid || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: surface ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: surface ? '1px solid var(--border-color)' : 'none',
        backdropFilter: surface ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight" style={{ color: surface ? 'var(--text-primary)' : '#fff' }}>
          {hero('title')}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/guide/visiting-st-naum" className="text-sm font-medium" style={{ color: surface ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>{t('guide')}</Link>
          <a href={(activeLocale === 'en' ? '/en' : '/') + '#nearby-explore'} className="text-sm font-medium" style={{ color: surface ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>{t('nearby')}</a>
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={(activeLocale === 'en' ? '/en' : '/') + '#' + section}
              className="text-sm font-medium transition-colors"
              style={{ color: surface ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
