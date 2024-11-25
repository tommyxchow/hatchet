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
import { HiDocumentText } from 'react-icons/hi2';
import { ItemText } from './ItemText';

interface StoryTileProps {
  story: HNItem;
  showText?: boolean;
}

export default async function StoryTile({ story, showText }: StoryTileProps) {
  const { by, descendants, id, score, text, time, title, url } = story;

  const storyDate = time ? new Date(time * 1000) : null;

  const thumbnailUrl = url && (await getThumbnailUrl(url));
  const isValidThumbnail =
    thumbnailUrl && (await isCorsSafeImage(thumbnailUrl));

  return (
    <article className='flex flex-col rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-semibold'>
            <a
              className='transition-opacity hover:opacity-50'
              href={url ?? `/item?id=${id}`}
              target='_blank'
            >
              {title}
              {url && (
                <>
                  {' '}
                  <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                    ({getDisplayURL(url)})
                  </span>
                </>
              )}
            </a>
          </h3>
          <div className='flex flex-wrap gap-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400'>
            <p>{score} points</p>
            <p>
              <Link className='hover:underline' href={`/item?id=${id}`}>
                {descendants ?? 0} comments
              </Link>
            </p>
            <time
              dateTime={storyDate?.toISOString()}
              title={storyDate?.toLocaleString()}
            >
              {storyDate ? getTimeAgo(storyDate) : '? ago'}
            </time>
            <p>
              <Link className='hover:underline' href={`/user?id=${by}`}>
                by {by}
              </Link>
            </p>
          </div>
        </div>
        <a
          className='relative flex aspect-[4/3] h-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-200 transition-opacity hover:opacity-50 dark:bg-neutral-800'
          href={url ?? `/item?id=${id}`}
        >
          {url ? (
            thumbnailUrl && isValidThumbnail ? (
              <Image
                className='object-cover'
                src={thumbnailUrl}
                alt={title ?? 'Thumbnail'}
                fill
                unoptimized
              />
            ) : (
              <HiExternalLink className='text-lg' />
            )
          ) : (
            <HiDocumentText className='text-lg' />
          )}
        </a>
      </div>

      {showText && text && (
        <div className='mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800'>
          <ItemText text={text} />
        </div>
      )}
    </article>
  );
}
