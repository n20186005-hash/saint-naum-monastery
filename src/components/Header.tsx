'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { localPath } from '@/lib/site';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false }: { solid?: boolean }) {
  const locale = useLocale();
  const t = useTranslations('header');
  const tPetro = useTranslations('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: (solid || scrolled) ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: (solid || scrolled) ? '1px solid var(--border-color)' : 'none',
        backdropFilter: (solid || scrolled) ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-base sm:text-lg font-semibold tracking-tight max-w-[48%] leading-tight" style={{ color: (solid || scrolled) ? 'var(--text-primary)' : '#fff' }}>
          {tPetro('title')}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {(['nearby', 'gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={localPath(locale) + '#' + section}
              className="text-sm font-medium transition-colors"
              style={{ color: (solid || scrolled) ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {section === 'nearby' ? (locale === 'zh' ? '周边探索' : 'Explore nearby') : t(section)}
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
