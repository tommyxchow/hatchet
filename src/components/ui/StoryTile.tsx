import { type HNItem } from '@/lib/types';
import {
  getDisplayURL,
  getThumbnailUrl,
  getTimeAgo,
  isCorsSafeImage,
} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { ItemText } from './ItemText';

interface StoryTileProps {
  story: HNItem;
  showText?: boolean;
}

export default async function StoryTile({ story, showText }: StoryTileProps) {
  const storyDate = story.time ? new Date(story.time * 1000) : null;

  const thumbnailUrl = story.url && (await getThumbnailUrl(story.url));
  const isValidThumbnail =
    thumbnailUrl && (await isCorsSafeImage(thumbnailUrl));

  return (
    <article className='flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='flex flex-col gap-2'>
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
      </div>

      {story.url && (
        <div className='relative flex aspect-[4/3] h-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-800'>
          {thumbnailUrl && isValidThumbnail ? (
            <Image
              className='object-cover'
              src={thumbnailUrl}
              alt={story.title ?? 'Thumbnail'}
              fill
              unoptimized
            />
          ) : (
            <HiExternalLink className='text-2xl' />
          )}
        </div>
      )}

      {showText && story.text && <ItemText text={story.text} />}
    </article>
  );
}
