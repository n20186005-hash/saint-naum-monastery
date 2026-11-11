import type { MetadataRoute } from 'next';
import { SITE, localPath, languages } from '@/lib/site';
import { guidePaths } from '@/lib/nearby';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', ...Object.values(guidePaths), '/privacy-policy', '/terms-of-service', '/cookie-settings'].flatMap((path) => languages.map((locale) => ({
    url: SITE + localPath(locale, path),
    alternates: { languages: { 'zh-CN': SITE + localPath('zh', path), en: SITE + localPath('en', path), 'x-default': SITE + localPath('zh', path) } },
  })));
}
