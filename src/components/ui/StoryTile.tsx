import { type HNItem } from '@/lib/types';
import {
  getDisplayURL,
  getThumbnailUrl,
  getTimeAgo,
  isCorsSafeImage,
} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiArrowTopRightOnSquare,
  HiArrowUp,
  HiDocumentText,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineUser,
} from 'react-icons/hi2';
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
      <div className='flex items-center gap-4'>
        <div className='flex grow items-center gap-4'>
          <a
            className='relative flex aspect-square h-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-200 transition-opacity hover:opacity-50 sm:aspect-[4/3] dark:bg-neutral-800'
            href={url ?? `/item?id=${id}`}
            target={url ? '_blank' : undefined}
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
                <HiArrowTopRightOnSquare className='text-lg' />
              )
            ) : (
              <HiDocumentText className='text-lg' />
            )}
          </a>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-wrap gap-x-2 text-sm font-medium text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-1'>
                <HiOutlineClock />
                <time
                  dateTime={storyDate?.toISOString()}
                  title={storyDate?.toLocaleString()}
                >
                  {storyDate ? getTimeAgo(storyDate) : '? ago'}
                </time>
              </div>
              {url && (
                <div className='flex items-center gap-1'>
                  <HiOutlineGlobeAlt />
                  <span>{getDisplayURL(url)}</span>
                </div>
              )}
            </div>
            <h3 className='font-semibold'>
              <a
                className='transition-opacity hover:opacity-50'
                href={url ?? `/item?id=${id}`}
                target='_blank'
              >
                {title}
              </a>
            </h3>
            <div className='flex flex-wrap items-baseline text-sm font-medium text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-1 pr-2'>
                <HiArrowUp />
                <span>{score}</span>
              </div>
              <Link
                className='flex items-center gap-1 rounded-md px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                href={`/item?id=${id}`}
              >
                <HiOutlineChatBubbleBottomCenterText />
                <span>{descendants ?? 0}</span>
              </Link>
              <Link
                className='flex items-center gap-1 rounded-md px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                href={`/user?id=${by}`}
              >
                <HiOutlineUser />
                <span>{by}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showText && text && (
        <div className='mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800'>
          <ItemText text={text} />
        </div>
      )}
    </article>
  );
}
