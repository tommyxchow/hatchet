import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { type HNFeedType, type RouteParams } from '@/lib/types';
import Link from 'next/link';

export const runtime = 'edge';

export const revalidate = 60;

export default async function Stories({ params, searchParams }: RouteParams) {
  const feedType = (params.slug || 'top') as HNFeedType;
  const pageNumber = parseInt(searchParams.p as string) || 1;
  const stories = await HNClient.fetchStories(feedType, pageNumber);

  return (
    <div className='flex flex-col gap-8'>
      <ol className='flex flex-col gap-8'>
        {stories.map((story) => (
          <li key={story.id}>
            <StoryTile story={story} />
          </li>
        ))}
      </ol>

      <nav className='grid grid-cols-2 font-semibold'>
        {pageNumber > 1 && (
          <Link className='' href={`/${feedType}?p=${pageNumber - 1}`}>
            Previous
          </Link>
        )}
        {stories.length == 30 && (
          <Link
            className='col-start-2 justify-self-end'
            href={`/${feedType}?p=${pageNumber + 1}`}
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
