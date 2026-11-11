import content from '@/content/nearby.json';
import type { Locale } from '@/i18n/routing';

export const guidePaths = {
  'saint-naum-springs': '/nearby/saint-naum-springs',
  'bay-of-bones': '/nearby/bay-of-bones',
  'galicica-national-park': '/nearby/galicica-national-park',
} as const;
export type GuideSlug = keyof typeof guidePaths;
export const guideSlugs = Object.keys(guidePaths) as GuideSlug[];
export function labels(locale: Locale) { return content.labels[locale]; }
export function guide(locale: Locale, slug: GuideSlug) {
  const place = content.places.find((item) => item.slug === slug);
  if (!place) throw new Error('Unknown guide');
  return { copy: place[locale], sources: place.sources, kind: place.kind, path: guidePaths[slug], ui: labels(locale) };
}
