'use client';

import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import { cn, getTimeAgo } from '@/lib/utils';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { ItemText } from './ItemText';
import { LinkWithHoverEffect } from './LinkWithHoverEffect';

interface CommentProps {
  postAuthorUsername: string;
  id: number;
  level: number;
}

export default function CommentTile({
  postAuthorUsername,
  id,
  level,
}: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionObserver(commentRef, {
    rootMargin: '0px 0px 1000px 0px',
  });

  const {
    isPending,
    error,
    data: comment,
  } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => HNClient.fetchItemById(id),
    enabled: isVisible,
    staleTime: 60 * 5,
  });

  if (isPending) return <div className='h-48' ref={commentRef} />;
  if (error) return <p>Error: {error.message}</p>;

  if (!comment || comment.dead) return null;

  const commentDate = comment.time ? new Date(comment.time * 1000) : null;

  return (
    <article className='animate-in fade-in flex flex-col duration-500'>
      <div className='flex'>
        <div className='flex'>
          {Array.from({ length: level }).map((_, index) => (
            <div
              className='w-4 border-l border-border'
              key={`${id}-${index}`}
            />
          ))}
        </div>

        <div className='flex grow flex-col py-2'>
          <div className='flex items-center gap-x-1'>
            {!comment.deleted && (
              <Button
                variant='outline'
                size='sm'
                className='size-6 p-1'
                aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className='size-3.5' />
                ) : (
                  <ChevronDownIcon className='size-3.5' />
                )}
              </Button>
            )}
            {comment.deleted ? (
              <p>deleted</p>
            ) : (
              <LinkWithHoverEffect
                className={cn(
                  'text-sm font-medium text-muted-foreground',
                  postAuthorUsername === comment.by &&
                    'font-medium text-orange-700 dark:text-orange-500',
                )}
                href={`/user?id=${comment.by}`}
              >
                <UserIcon className='size-4' />
                <span>{comment.by}</span>
              </LinkWithHoverEffect>
            )}
            <div className='flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <ClockIcon className='size-4' />
                <time
                  dateTime={commentDate?.toISOString()}
                  title={commentDate?.toLocaleString()}
                >
                  {commentDate ? getTimeAgo(commentDate) : '? ago'}
                </time>
              </div>
            </div>

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
