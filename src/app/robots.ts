import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Rate limit crawlers by adding crawl delay
        // Disallow excessive pagination and user pages
        disallow: ['/user', '/item'],
      },
      {
        // Block aggressive bots
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'PetalBot',
          'BLEXBot',
        ],
        disallow: '/',
      },
    ],
  }
}
