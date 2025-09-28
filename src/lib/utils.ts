import { clsx, type ClassValue } from 'clsx';
import { parse } from 'node-html-parser';
import { twMerge } from 'tailwind-merge';
import type { UrlObject } from 'url';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getDisplayURL(
  url: string,
  preserveProtocol = false,
): UrlObject {
  const parsedURL = new URL(url);
  let host = parsedURL.hostname;

  if (host.startsWith('www.')) {
    host = host.substring(4);
  }

  if (preserveProtocol) {
    return {
      protocol: parsedURL.protocol,
      hostname: host,
    };
  } else {
    return {
      hostname: host,
    };
  }
}

export async function getThumbnailUrl(
  url: string,
  options = { timeout: 3000 },
): Promise<string | null> {
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HatchetBot/1.0)',
      },
      next: { revalidate: 3600 }, // Cache thumbnails for 1 hour
    });

    // Check response size to avoid processing huge documents
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1_000_000) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      return null;
    }

    const html = await response.text();

    // Optimize parsing by truncating to first 50KB (meta tags are typically in head)
    const truncatedHtml = html.slice(0, 50_000);
    const root = parse(truncatedHtml);

    // Try multiple meta tags in priority order
    const metaSelectors = [
      'meta[name="twitter:image"]',
      'meta[property="og:image"]',
      'meta[property="og:image:secure_url"]',
      'meta[itemprop="image"]',
      'meta[name="thumbnail"]',
    ];

    for (const selector of metaSelectors) {
      const metaTag = root.querySelector(selector);
      if (metaTag) {
        const imageUrl = metaTag.getAttribute('content');
        if (imageUrl) {
          return normalizeUrl(imageUrl, url);
        }
      }
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`Thumbnail fetch timed out for ${url}`);
    } else {
      console.error('Error fetching thumbnail:', error);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Helper to convert relative URLs to absolute
function normalizeUrl(imageUrl: string, baseUrl: string): string {
  try {
    return new URL(imageUrl, baseUrl).toString();
  } catch {
    return imageUrl;
  }
}
