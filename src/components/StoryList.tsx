import { Button } from '@/components/ui/button';
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
          <Button variant='outline' size='icon' asChild>
            <Link href={`/${feedType}?p=${pageNumber - 1}`}>
              <ChevronLeftIcon className='size-4' />
            </Link>
          </Button>
        )}
        {stories.length === 30 && (
          <Button variant='outline' size='icon' className='ml-auto' asChild>
            <Link href={`/${feedType}?p=${pageNumber + 1}`}>
              <ChevronRightIcon className='size-4' />
            </Link>
          </Button>
        )}
      </nav>
    </div>
  );
}
