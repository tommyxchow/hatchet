import { type HNItem } from '@/lib/types';
import { getDisplayURL, getThumbnailUrl, getTimeAgo } from '@/lib/utils';
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { ItemText } from './ItemText';
import { LinkWithHoverEffect } from './LinkWithHoverEffect';

interface StoryTileProps {
  story: HNItem;
  showText?: boolean;
}

export default async function StoryTile({ story, showText }: StoryTileProps) {
  const { by, descendants, id, score, text, time, title, url } = story;

  const storyDate = time ? new Date(time * 1000) : null;

  const thumbnailUrl = url && (await getThumbnailUrl(url));

  return (
    <article className='flex flex-col rounded-md border border-neutral-200 p-2 dark:border-neutral-800'>
      <div className='flex items-center gap-4'>
        <div className='flex grow items-center gap-4'>
          <a
            className='relative flex aspect-square h-20 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-neutral-200 transition-opacity hover:opacity-50 sm:aspect-4/3 dark:bg-neutral-800'
            href={url ?? `/item?id=${id}`}
            target={url ? '_blank' : undefined}
          >
            {url ? (
              thumbnailUrl ? (
                <Image
                  className='object-cover'
                  src={thumbnailUrl}
                  alt={title ?? 'Thumbnail'}
                  fill
                  unoptimized
                />
              ) : (
                <ArrowTopRightOnSquareIcon className='h-5 w-5' />
              )
            ) : (
              <DocumentTextIcon className='h-5 w-5' />
            )}
          </a>
          <div className='flex flex-col items-start gap-0.5'>
            <div className='flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-1'>
                <ClockIcon className='size-4' />
                <time
                  dateTime={storyDate?.toISOString()}
                  title={storyDate?.toLocaleString()}
                >
                  {storyDate ? getTimeAgo(storyDate) : '? ago'}
                </time>
              </div>
              {url && (
                <LinkWithHoverEffect
                  href={getDisplayURL(url, true)}
                  openInNewTab
                >
                  <GlobeAltIcon className='size-4' />
                  <span>{getDisplayURL(url)}</span>
                </LinkWithHoverEffect>
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
            <div className='mt-0.5 flex flex-wrap items-baseline text-sm font-medium text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-1 pr-2'>
                <ArrowUpIcon className='size-4' />
                <span>{score}</span>
              </div>
              <LinkWithHoverEffect href={`/item?id=${id}`}>
                <ChatBubbleBottomCenterTextIcon className='size-4' />
                <span>{descendants ?? 0}</span>
              </LinkWithHoverEffect>
              <LinkWithHoverEffect href={`/user?id=${by}`}>
                <UserIcon className='size-4' />
                <span>{by}</span>
              </LinkWithHoverEffect>
            </div>
          </div>
        </div>
      </div>

      {showText && text && (
        <div className='mt-2 border-t border-neutral-200 pt-2 dark:border-neutral-800'>
          <ItemText text={text} />
        </div>
      )}
    </article>
  );
}
