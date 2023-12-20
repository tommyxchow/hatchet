import { type HNItem } from '@/lib/types';
import { getDisplayURL, getTimeAgo } from '@/lib/utils';
import Link from 'next/link';

interface StoryTileProps {
  story: HNItem;
}

export default function StoryTile({ story }: StoryTileProps) {
  const storyDate = story.time ? new Date(story.time * 1000) : null;

  return (
    <article className='flex flex-col gap-2'>
      <h3 className='font-semibold'>
        <a
          className='transition-opacity hover:opacity-50'
          href={story.url ?? `/item?id=${story.id}`}
          target='_blank'
        >
          {story.title}
          {story.url && (
            <>
              {' '}
              <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                ({getDisplayURL(story.url)})
              </span>
            </>
          )}
        </a>
      </h3>

      <div className='flex flex-wrap gap-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400'>
        <p>{story.score} points</p>
        <p>
          <Link className='hover:underline' href={`/item?id=${story.id}`}>
            {story.descendants ?? 0} comments
          </Link>
        </p>
        <time
          dateTime={storyDate?.toISOString()}
          title={storyDate?.toLocaleString()}
        >
          {storyDate ? getTimeAgo(storyDate) : '? ago'}
        </time>
        <p>
          <Link className='hover:underline' href={`/user?id=${story.by}`}>
            by {story.by}
          </Link>
        </p>
      </div>
    </article>
  );
}
