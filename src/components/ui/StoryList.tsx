import { HNClient } from '@/lib/hnClient';
import { type HNFeedType } from '@/lib/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import StoryTile from './StoryTile';

interface StoryListProps {
  feedType: HNFeedType;
  pageNumber: number;
}

export async function StoryList({ feedType, pageNumber }: StoryListProps) {
  const stories = await HNClient.fetchStoriesByFeedType(feedType, pageNumber);

  return (
    <div className='flex flex-col gap-2'>
      <ol className='flex flex-col gap-2'>
        {stories.map((story) => (
          <li key={story.id}>
            <StoryTile story={story} />
          </li>
        ))}
      </ol>

      <nav className='flex justify-between'>
        {pageNumber > 1 && (
          <Link href={`/${feedType}?p=${pageNumber - 1}`}>
            <div className='rounded-md border border-neutral-200 p-2 transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800'>
              <ChevronLeftIcon className='size-4' />
            </div>
          </Link>
        )}
        {stories.length === 30 && (
          <Link className='ml-auto' href={`/${feedType}?p=${pageNumber + 1}`}>
            <div className='rounded-md border border-neutral-200 p-2 transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800'>
              <ChevronRightIcon className='size-4' />
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}
