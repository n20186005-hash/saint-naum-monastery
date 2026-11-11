import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';

export const SITE = 'https://www.saintnaummonastery.com';
export const languages = ['zh', 'en'] as const;
export function isLocale(value: string): value is Locale { return value === 'zh' || value === 'en'; }
export function localPath(locale: string, path = '') { return ((locale === 'en' ? '/en' : '') + (path === '/' ? '' : path)) || '/'; }
export function metadataFor(locale: Locale, path: string, title: string, description: string): Metadata {
  const canonical = SITE + localPath(locale, path);
  return {
    title, description,
    alternates: { canonical, languages: {
      'zh-CN': SITE + localPath('zh', path),
      en: SITE + localPath('en', path),
      'x-default': SITE + localPath('zh', path),
    }},
    openGraph: { title, description, url: canonical, siteName: 'Saint Naum Monastery',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US', type: 'website' },
  };
}
