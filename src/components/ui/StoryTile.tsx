import { type HNItem } from '@/lib/types';
import { getDisplayURL, getTimeAgo } from '@/lib/utils';
import Link from 'next/link';

interface StoryTileProps {
  story: HNItem;
}

export default function StoryTile({ story }: StoryTileProps) {
  return (
    <article className='flex flex-col gap-2'>
      <h3 className='font-semibold'>
        <Link
          className='transition-opacity hover:opacity-50'
          href={`/item?id=${story.id}`}
        >
          {story.title}
          {story.url && (
            <>
              {' '}
              <span className='font-medium text-neutral-400'>
                ({getDisplayURL(story.url)})
              </span>
            </>
          )}
        </Link>
      </h3>
      <div className='flex flex-wrap gap-1 text-sm font-medium text-neutral-400'>
        <p>{story.score} points</p>·
        <p>
          <Link className='hover:underline' href={`/item?id=${story.id}`}>
            {story.descendants ?? 0} comments
          </Link>
        </p>
        ·<p>{story.time ? getTimeAgo(story.time) : '? ago'}</p>·
        <p>
          <Link className='hover:underline' href={`/user?id=${story.by}`}>
            by {story.by}
          </Link>
        </p>
      </div>
    </article>
  );
}
