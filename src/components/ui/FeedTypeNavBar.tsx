'use client';

import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

function navItemClassname(
  resolvedPathname: string | null,
  pathname: string,
): string {
  return resolvedPathname === pathname
    ? 'underline decoration-2 underline-offset-2'
    : 'transition-colors text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200';
}

export function FeedTypeNavBar() {
  const { slug } = useParams();
  const pathname = usePathname();
  const isItemPage = pathname === '/item';
  const isSettingsPage = pathname === '/settings';

  let resolvedPathname: string | null = null;
  if (!isItemPage && !isSettingsPage) {
    resolvedPathname = !Array.isArray(slug) ? slug || 'top' : null;
  } else if (isSettingsPage) {
    resolvedPathname = 'settings';
  }

  return (
    <nav
      className={twJoin(
        'overflow-x-auto border-b border-neutral-400 py-4 dark:border-neutral-700',
        !isItemPage && 'sticky inset-0 mb-4 bg-white dark:bg-black',
      )}
    >
      <ul className='flex gap-4 text-lg font-semibold'>
        {HNFeedTypes.map((type) => (
          <li key={type}>
            <Link href={`/${type}`}>
              <h2 className={navItemClassname(resolvedPathname, type)}>
                {type}
              </h2>
            </Link>
          </li>
        ))}

        <li>
          <Link href='/settings'>
            <h2 className={navItemClassname(resolvedPathname, 'settings')}>
              settings
            </h2>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
