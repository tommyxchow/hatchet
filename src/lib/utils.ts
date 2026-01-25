import { clsx, type ClassValue } from 'clsx';
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
