'use client';

import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function FeedTypeNavBar() {
  const { slug: feedType } = useParams();
  const pathname = usePathname();
  const isStoryPage = pathname !== '/item' && pathname !== '/user';

  let resolvedFeedType: string | null = null;
  if (isStoryPage) {
    resolvedFeedType = !Array.isArray(feedType) ? feedType || 'top' : null;
  }

  return (
    <nav
      className={`py-4 ${
        isStoryPage
          ? 'sticky inset-0 mb-4 border-b border-neutral-700 bg-black'
          : ''
      }`}
    >
      <ul className='flex gap-4 text-lg font-semibold'>
        {HNFeedTypes.map((type) => (
          <li key={type}>
            <Link href={`/${type}`}>
              <h2
                className={
                  type === resolvedFeedType
                    ? 'underline decoration-2 underline-offset-2'
                    : 'text-neutral-400 transition-colors hover:text-neutral-200'
                }
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
