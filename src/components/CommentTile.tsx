'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import type { HNItem } from '@/lib/types';
import { cn, getTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight, Clock, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { ItemText } from './ItemText';
import { LinkWithHoverEffect } from './LinkWithHoverEffect';
import { SimpleTooltip } from './SimpleTooltip';

interface CommentProps {
  postAuthorUsername: string;
  id: number;
  level: number;
  initialData?: HNItem;
}

export default function CommentTile({
  postAuthorUsername,
  id,
  level,
  initialData,
}: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  // Use once: true so we don't refetch when scrolling back up
  // Increased margin to 2000px for more aggressive prefetching
  const isVisible = useIntersectionObserver(commentRef, {
    rootMargin: '0px 0px 2000px 0px',
    once: true,
  });

  const {
    isPending,
    error,
    data: comment,
  } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => HNClient.fetchItemById(id),
    // Only fetch when visible (initialData is used immediately if provided)
    enabled: isVisible,
    initialData,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending)
    return (
      <div className='flex' ref={commentRef}>
        <div className='flex'>
          {Array.from({ length: level }).map((_, index) => (
            <div className='border-border w-4 border-l' key={index} />
          ))}
        </div>
        <div className='flex grow flex-col gap-2 py-2'>
          <div className='flex items-center gap-x-1'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-5 w-16' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (!comment || comment.dead) return null;

  const commentDate =
    comment.time !== undefined ? new Date(comment.time * 1000) : null;

  return (
    <article className='animate-in fade-in flex flex-col duration-300'>
      <div className='flex'>
        <div className='flex'>
          {Array.from({ length: level }).map((_, index) => (
            <div className='border-border w-4 border-l' key={index} />
          ))}
        </div>

        <div className='flex grow flex-col py-2'>
          <div className='flex items-center gap-x-1'>
            {!comment.deleted && (
              <Button
                variant='outline'
                size='sm'
                className='size-5.5'
                aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronRight /> : <ChevronDown />}
              </Button>
            )}
            {comment.deleted ? (
              <p>deleted</p>
            ) : (
              <div className='flex flex-wrap items-baseline gap-2'>
                {postAuthorUsername === comment.by ? (
                  <SimpleTooltip content='Post Author'>
                    <Badge
                      variant='outline'
                      className='border-orange-600 text-orange-700 dark:border-orange-500 dark:text-orange-500'
                      asChild
                    >
                      <LinkWithHoverEffect href={`/user?id=${comment.by}`}>
                        <User className='size-3' />
                        <span>{comment.by}</span>
                      </LinkWithHoverEffect>
                    </Badge>
                  </SimpleTooltip>
                ) : (
                  <Badge variant='outline' asChild>
                    <LinkWithHoverEffect href={`/user?id=${comment.by}`}>
                      <User className='size-3' />
                      <span>{comment.by}</span>
                    </LinkWithHoverEffect>
                  </Badge>
                )}
                <Badge variant='secondary'>
                  <Clock className='size-3' />
                  <time
                    dateTime={commentDate?.toISOString()}
                    title={commentDate?.toLocaleString()}
                  >
                    {commentDate ? getTimeAgo(commentDate) : '? ago'}
                  </time>
                </Badge>
              </div>
            )}

            <Button
              variant='ghost'
              className='grow sm:hidden'
              aria-hidden
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>

          <div className={cn(isCollapsed && 'hidden')}>
            {comment.text && <ItemText text={comment.text} />}
          </div>
        </div>
      </div>

      {comment.kids && (
        <div className={cn('flex flex-col', isCollapsed && 'hidden')}>
          {comment.kids.map((id) => (
            <CommentTile
              key={id}
              postAuthorUsername={postAuthorUsername}
              id={id}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </article>
  );
}
