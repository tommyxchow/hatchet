'use client';

import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export function FeedTypeNavBar() {
  const { slug } = useParams();
  const path = usePathname();

  const resolvedPathname =
    !Array.isArray(slug) && path !== '/item' ? (slug ?? 'top') : null;

  return (
    <nav className='overflow-x-auto rounded-md border border-neutral-200 p-2 dark:border-neutral-800'>
      <ul className='grid grid-cols-6 gap-1'>
        {HNFeedTypes.map((type) => (
          <li key={type}>
            <Link href={`/${type}`}>
              <h2
                className={twJoin(
                  'rounded-sm py-1 text-center text-sm capitalize',
                  resolvedPathname === type
                    ? 'bg-neutral-200 font-semibold dark:bg-neutral-800'
                    : 'opacity-80 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800',
                )}
              >
                {type}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
