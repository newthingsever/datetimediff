import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seoConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*?*start=',     // Prevent indexing query parameter duplicate URLs
          '/*?*end=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/date-difference-calculator',
          '/time-difference-calculator',
          '/days-between-dates',
          '/age-calculator',
          '/date-calculator',
          '/business-days-calculator',
          '/sitemap',
          '/sitemap.xml',
          '/about',
          '/contact',
          '/privacy-policy',
          '/terms',
          '/disclaimer',
          '/manifest.webmanifest',
          '/opengraph-image',
          '/favicon.svg',
          '/favicon.ico',
          '/icon.svg',
        ],
        disallow: [
          '/api/',
          '/*?*start=',
          '/*?*end=',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/icon.svg',
          '/favicon.svg',
          '/favicon.ico',
          '/opengraph-image',
          '/*.svg',
          '/*.ico',
          '/*.png',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
