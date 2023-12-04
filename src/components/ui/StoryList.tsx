import { HNClient } from '@/lib/hnClient';
import { type HNFeedType } from '@/lib/types';
import Link from 'next/link';
import StoryTile from './StoryTile';

interface StoryListProps {
  feedType: HNFeedType;
  pageNumber: number;
}

export async function StoryList({ feedType, pageNumber }: StoryListProps) {
  const stories = await HNClient.fetchStoriesByFeedType(feedType, pageNumber);

  return (
    <div className='flex flex-col gap-8'>
      <ol className='flex flex-col gap-8'>
        {stories.map((story) => (
          <li key={story.id}>
            <StoryTile story={story} />
          </li>
        ))}
      </ol>

      <nav>
        {stories.length == 30 && (
          <Link
            className='font-medium hover:underline'
            href={`/${feedType}?p=${pageNumber + 1}`}
          >
            next page
          </Link>
        )}
      </nav>
    </div>
  );
}
