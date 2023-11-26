'use client';

import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function FeedTypeNavBar() {
  const { slug: feedType } = useParams();
  const pathname = usePathname();

  const resolvedFeedType = pathname !== '/item' ? feedType || 'top' : null;

  return (
    <nav>
      <ul className='flex gap-4 text-lg font-semibold'>
        {HNFeedTypes.map((type) => (
          <li key={type}>
            <Link href={`/${type}`}>
              <h2
                className={type === resolvedFeedType ? '' : 'text-neutral-400'}
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
