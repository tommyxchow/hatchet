'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import { getTimeAgo } from '@/lib/utils';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
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
              className='w-4 border-l border-neutral-200 dark:border-neutral-800'
              key={`${id}-${index}`}
            />
          ))}
        </div>

        <div className='flex grow flex-col py-2'>
          <div className='flex items-center gap-x-1'>
            {!comment.deleted && (
              <button
                aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
                className='rounded-sm border border-neutral-200 p-0.5 transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800'
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className='size-4.5' />
                ) : (
                  <ChevronDownIcon className='size-4.5' />
                )}
              </button>
            )}
            {comment.deleted ? (
              <p>deleted</p>
            ) : (
              <LinkWithHoverEffect
                className={twJoin(
                  'text-sm text-neutral-600 dark:text-neutral-400',
                  postAuthorUsername === comment.by &&
                    'font-medium text-orange-700 dark:text-orange-500',
                )}
                href={`/user?id=${comment.by}`}
              >
                <UserIcon className='size-4' />
                <span>{comment.by}</span>
              </LinkWithHoverEffect>
            )}
            <div className='flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-neutral-600 dark:text-neutral-400'>
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

            <button
              aria-hidden
              className='grow sm:hidden'
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>

          <div className={twJoin(isCollapsed && 'hidden')}>
            {comment.text && <ItemText text={comment.text} />}
          </div>
        </div>
      </div>

      {comment.kids && (
        <div className={twJoin('flex flex-col', isCollapsed && 'hidden')}>
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
