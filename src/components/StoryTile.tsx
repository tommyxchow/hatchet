import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type HNItem } from '@/lib/types';
import { getDisplayURL, getTimeAgo } from '@/lib/utils';
import {
  ArrowUp,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  MessageSquare,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { FaviconImage } from './FaviconImage';
import { ItemText } from './ItemText';

interface StoryTileProps {
  story: HNItem;
  showText?: boolean;
}

export function StoryTile({ story, showText }: StoryTileProps) {
  const { by, descendants, id, score, text, time, title, url } = story;

  const storyDate = time !== undefined ? new Date(time * 1000) : null;

  // Use favicon instead of fetching external sites for thumbnails
  // This eliminates 30 external HTTP requests per page load
  const faviconUrl = url
    ? `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`
    : null;

  return (
    <Card size='sm'>
      <CardContent>
        <div className='flex items-center gap-4'>
          <a
            className='bg-muted hover:bg-muted/80 relative flex aspect-square h-18 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-colors sm:aspect-4/3'
            href={url ?? `/item?id=${id}`}
            target={url ? '_blank' : undefined}
          >
            {url ? (
              faviconUrl ? (
                <FaviconImage src={faviconUrl} alt={title ?? 'Site favicon'} />
              ) : (
                <ExternalLink className='text-muted-foreground size-6' />
              )
            ) : (
              <FileText className='text-muted-foreground size-6' />
            )}
          </a>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex flex-wrap items-baseline gap-2'>
              <Badge variant='secondary'>
                <Clock className='size-3' />
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
                    <Globe className='size-3' />
                    <span>{getDisplayURL(url).hostname}</span>
                  </Link>
                </Badge>
              )}
            </div>
            <h3 className='text-foreground text-base leading-tight font-semibold'>
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
                <ArrowUp className='size-3' />
                <span>{score}</span>
              </Badge>
              <Badge variant='outline' asChild>
                <Link href={`/item?id=${id}`}>
                  <MessageSquare className='size-3' />
                  <span>{descendants ?? 0}</span>
                </Link>
              </Badge>
              <Badge variant='outline' asChild>
                <Link href={`/user?id=${by}`}>
                  <User className='size-3' />
                  <span>{by}</span>
                </Link>
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>

      {showText && text && (
        <CardFooter className='border-t'>
          <ItemText text={text} />
        </CardFooter>
      )}
    </Card>
  );
}
