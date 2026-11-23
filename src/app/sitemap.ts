import type { MetadataRoute } from 'next';
import { guidePaths } from '@/lib/nearby';

const base = 'https://www.saintnaummonastery.com';

function localized(path: string, priority: number): MetadataRoute.Sitemap {
  const zh = `${base}/${path}`;
  const en = `${base}/en/${path}`;
  const alternates = { languages: { zh, en } };
  return [
    { url: zh, changeFrequency: 'monthly', priority, alternates },
    { url: en, changeFrequency: 'monthly', priority, alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized('', 1),
    ...localized('st-naum-monastery-ohrid', 0.9),
    ...localized('guide/visiting-st-naum', 0.85),
    ...guidePaths.flatMap(path => localized(path.slice(1), 0.8)),
    ...localized('privacy-policy', 0.2),
    ...localized('terms-of-service', 0.2),
    ...localized('cookie-settings', 0.2),
  ];
}
