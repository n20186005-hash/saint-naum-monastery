import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: {
    mode: 'as-needed',
  },
  pathnames: {
    '/': '/',
    '/petrovaradin-fortress-clock': '/petrovaradin-fortress-clock',
    '/petrovaradin-fortress-clock/privacy-policy': '/petrovaradin-fortress-clock/privacy-policy',
    '/petrovaradin-fortress-clock/terms-of-service': '/petrovaradin-fortress-clock/terms-of-service',
    '/st-naum-monastery-ohrid': '/st-naum-monastery-ohrid',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];
