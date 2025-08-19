import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { type HNItem } from '@/lib/types';
import { getDisplayURL, getThumbnailUrl, getTimeAgo } from '@/lib/utils';
import {
  ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  GlobeAltIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ItemText } from './ItemText';
import { ThumbnailImage } from './ThumbnailImage';

interface StoryTileProps {
  story: HNItem;
  showText?: boolean;
}

export default async function StoryTile({ story, showText }: StoryTileProps) {
  const { by, descendants, id, score, text, time, title, url } = story;

  const storyDate = time ? new Date(time * 1000) : null;

  const thumbnailUrl = url && (await getThumbnailUrl(url));

  return (
    <Card className='py-0'>
      <CardContent className='p-4'>
        <div className='flex items-start gap-4'>
          <a
            className='bg-muted hover:bg-muted/80 relative flex aspect-square h-16 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-colors sm:aspect-4/3'
            href={url ?? `/item?id=${id}`}
            target={url ? '_blank' : undefined}
          >
            {url ? (
              thumbnailUrl ? (
                <ThumbnailImage src={thumbnailUrl} alt={title ?? 'Thumbnail'} />
              ) : (
                <ArrowTopRightOnSquareIcon className='text-muted-foreground size-6' />
              )
            ) : (
              <DocumentTextIcon className='text-muted-foreground size-6' />
            )}
          </a>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex flex-wrap items-baseline gap-2'>
              <Badge variant='secondary'>
                <ClockIcon className='size-3' />
                <time
                  dateTime={storyDate?.toISOString()}
                  title={storyDate?.toLocaleString()}
                >
                  {storyDate ? getTimeAgo(storyDate) : '? ago'}
                </time>
              </Badge>
              {url && (
                <Badge variant='outline' asChild>
                  <Link href={getDisplayURL(url, true)} target='_blank'>
                    <GlobeAltIcon className='size-3' />
                    <span>{getDisplayURL(url)}</span>
                  </Link>
                </Badge>
              )}
            </div>
            <h3 className='text-foreground leading-tight font-semibold'>
              <a
                className='hover:text-muted-foreground transition-colors'
                href={url ?? `/item?id=${id}`}
                target='_blank'
              >
                {title}
              </a>
            </h3>
            <div className='flex flex-wrap items-baseline gap-2'>
              <Badge variant='secondary'>
                <ArrowUpIcon className='size-3' />
                <span>{score}</span>
              </Badge>
              <Badge variant='outline' asChild>
                <Link href={`/item?id=${id}`}>
                  <ChatBubbleBottomCenterTextIcon className='size-3' />
                  <span>{descendants ?? 0}</span>
                </Link>
              </Badge>
              <Badge variant='outline' asChild>
                <Link href={`/user?id=${by}`}>
                  <UserIcon className='size-3' />
                  <span>{by}</span>
                </Link>
              </Badge>
            </div>
          </div>
        </div>

        {showText && text && (
          <div className='mt-2 border-t pt-2'>
            <ItemText text={text} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
