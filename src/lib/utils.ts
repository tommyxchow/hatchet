import { parse } from 'node-html-parser';

function getDisplayTime(value: number, unit: string): string {
  return value === 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
}

export function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return getDisplayTime(years, 'year');
  } else if (months > 0) {
    return getDisplayTime(months, 'month');
  } else if (weeks > 0) {
    return getDisplayTime(weeks, 'week');
  } else if (days > 0) {
    return getDisplayTime(days, 'day');
  } else if (hours > 0) {
    return getDisplayTime(hours, 'hour');
  } else if (minutes > 0) {
    return getDisplayTime(minutes, 'minute');
  } else if (seconds > 0) {
    return getDisplayTime(seconds, 'second');
  } else {
    return 'just now';
  }
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
      next: { revalidate: 3600 },
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      return null;
    }

    const html = await response.text();
    const root = parse(html);

    // Extract og:image
    const ogImage = root.querySelector('meta[property="og:image"]');
    if (ogImage) {
      return ogImage.getAttribute('content') ?? null;
    }

    // Extract twitter:image
    const twitterImage = root.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      return twitterImage.getAttribute('content') ?? null;
    }

    return null;
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return null;
  }
}

export async function isCorsSafeImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
