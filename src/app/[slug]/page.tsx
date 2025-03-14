import { StoryList } from '@/components/ui/StoryList';
import { StoryListSkeleton } from '@/components/ui/StoryListSkeleton';
import { HNFeedTypes, type HNFeedType, type RouteParams } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const revalidate = 60;

export default async function Stories({ searchParams, params }: RouteParams) {
  const { p } = await searchParams;
  const { slug: feedType } = await params;

  // Check for undefined because we want to allow the default feed type when no
  // slug is provided.
  if (!isHNFeedType(feedType) && feedType !== undefined) {
    notFound();
  }

  const resolvedFeedType = feedType || 'top';
  const pageNumber = parseInt(p as string) || 1;

  return (
    // Suspense here instead of loading.tsx because notFound() can only return
    // the proper 404 status code on the server rather than client.
    <Suspense fallback={<StoryListSkeleton />}>
      <StoryList feedType={resolvedFeedType} pageNumber={pageNumber} />
    </Suspense>
  );
}

function isHNFeedType(value: unknown): value is HNFeedType {
  return HNFeedTypes.includes(value as HNFeedType);
}
