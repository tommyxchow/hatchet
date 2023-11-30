import { type RouteParams } from '@/lib/types';
import { Suspense } from 'react';
import StoryListLoadingSkeleton from './[slug]/loading';
import Stories from './[slug]/page';

export const runtime = 'edge';

export const revalidate = 60;

export default function HomePage(routeParams: RouteParams) {
  return (
    <Suspense fallback={<StoryListLoadingSkeleton />}>
      <Stories {...routeParams} />
    </Suspense>
  );
}
