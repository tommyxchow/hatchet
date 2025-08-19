import { StoryListSkeleton } from '@/components/StoryListSkeleton';
import { type RouteParams } from '@/lib/types';
import { Suspense } from 'react';
import Stories from './[slug]/page';

export const runtime = 'edge';

export const revalidate = 60;

export default function HomePage(routeParams: RouteParams) {
  return (
    <Suspense fallback={<StoryListSkeleton />}>
      <Stories {...routeParams} />
    </Suspense>
  );
}
