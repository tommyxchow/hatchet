import { StoryList } from '@/components/StoryList';
import { StoryListSkeleton } from '@/components/StoryListSkeleton';
import { HNFeedTypes, type HNFeedType } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Stories({
  searchParams,
  params,
}: PageProps<'/[[...slug]]'>) {
  const { p } = await searchParams;
  const { slug } = await params;

  // slug is an array for catch-all routes, get the first segment
  const feedType = slug?.[0];

  if (feedType !== undefined && !isHNFeedType(feedType)) {
    notFound();
  }

  const resolvedFeedType = feedType ?? 'top';
  const pageNumber = parseInt(p as string) || 1;

  return (
    <Suspense fallback={<StoryListSkeleton />}>
      <StoryList feedType={resolvedFeedType} pageNumber={pageNumber} />
    </Suspense>
  );
}

function isHNFeedType(value: unknown): value is HNFeedType {
  return HNFeedTypes.includes(value as HNFeedType);
}
