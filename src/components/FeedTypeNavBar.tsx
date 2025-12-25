'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function FeedTypeNavBar() {
  const { slug } = useParams<{ slug?: string[] }>();
  const pathname = usePathname();

  // slug is an array for catch-all routes [[...slug]]
  const feedSlug = slug?.[0];
  const isItemPage = pathname.startsWith('/item');
  const activeFeed = isItemPage ? '' : (feedSlug ?? 'top');

  return (
    <nav>
      <Tabs value={activeFeed}>
        <TabsList>
          {HNFeedTypes.map((type) => (
            <TabsTrigger key={type} value={type} className='capitalize' asChild>
              <Link href={`/${type}`}>{type}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
