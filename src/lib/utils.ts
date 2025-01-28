import { parse } from 'node-html-parser';

export function getTimeAgo(date: Date): string {
  const now = new Date().getTime();
  const elapsedSeconds = Math.floor((now - date.getTime()) / 1000);

  const timeUnits = [
    { unit: 'y', seconds: 60 * 60 * 24 * 365 }, // years
    { unit: 'mo', seconds: 60 * 60 * 24 * 30 }, // months
    { unit: 'd', seconds: 60 * 60 * 24 }, // days
    { unit: 'h', seconds: 60 * 60 }, // hours
    { unit: 'm', seconds: 60 }, // minutes
    { unit: 's', seconds: 1 }, // seconds
  ];

  for (const { unit, seconds } of timeUnits) {
    const value = Math.floor(elapsedSeconds / seconds);
    if (value > 0) {
      return `${value}${unit}`;
    }
  }

  return '0s';
}

export function getDisplayURL(url: string): string {
  const parsedURL = new URL(url);
  let host = parsedURL.hostname;

  if (host.startsWith('www.')) {
    host = host.substring(4);
  }

  return host;
}

export async function getThumbnailUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      return null;
    }

    const html = await response.text();
    const root = parse(html);

    // Extract twitter:image
    const twitterImage = root.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      return twitterImage.getAttribute('content') ?? null;
    }

    // Extract og:image
    const ogImage = root.querySelector('meta[property="og:image"]');
    if (ogImage) {
      return ogImage.getAttribute('content') ?? null;
    }

    return null;
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return null;
  }
}
