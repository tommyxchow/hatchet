'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HNFeedTypes } from '@/lib/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function FeedTypeNavBar() {
  const { slug } = useParams();
  const path = usePathname();

  const resolvedPathname =
    !Array.isArray(slug) && path !== '/item' ? (slug ?? 'top') : null;

  return (
    <nav className='overflow-x-auto'>
      <Tabs value={resolvedPathname ?? 'top'}>
        <TabsList>
          {HNFeedTypes.map((type) => (
            <TabsTrigger key={type} value={type} asChild>
              <Link href={`/${type}`} className='capitalize'>
                {type}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
