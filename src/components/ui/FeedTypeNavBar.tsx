'use client';

import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export function FeedTypeNavBar() {
  const { slug } = useParams();

  const resolvedPathname = !Array.isArray(slug) ? slug || 'top' : null;

  return (
    <nav className='overflow-x-auto'>
      <ul className='grid grid-cols-6 divide-x rounded-lg border dark:divide-neutral-800 dark:border-neutral-800'>
        {HNFeedTypes.map((type) => (
          <li key={type}>
            <Link href={`/${type}`}>
              <h2
                className={twJoin(
                  'py-2 text-center font-semibold capitalize',
                  resolvedPathname === type
                    ? 'bg-neutral-200 dark:bg-neutral-900'
                    : 'hover:bg-neutral-200 dark:hover:bg-neutral-900',
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
