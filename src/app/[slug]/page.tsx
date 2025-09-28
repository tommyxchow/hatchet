import { StoryList } from '@/components/StoryList';
import { HNFeedTypes, type HNFeedType, type RouteParams } from '@/lib/types';
import { notFound } from 'next/navigation';

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

  return <StoryList feedType={resolvedFeedType} pageNumber={pageNumber} />;
}

function isHNFeedType(value: unknown): value is HNFeedType {
  return HNFeedTypes.includes(value as HNFeedType);
}
