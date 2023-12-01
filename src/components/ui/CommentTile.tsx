'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import { getTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { ItemText } from './ItemText';

interface CommentProps {
  id: number;
  level: number;
}

export default function CommentTile({ id, level }: CommentProps) {
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

  return (
    <article className='flex flex-col'>
      <div className='flex'>
        <div className='flex'>
          {Array.from({ length: level }).map((_, index) => (
            <div
              className='w-4 border-l border-neutral-700'
              key={`${id}-${index}`}
            />
          ))}
        </div>

        <div className='flex grow flex-col py-2'>
          <div className='flex gap-2 text-sm text-neutral-400'>
            {!comment.deleted && (
              <button
                aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
                className='group font-mono'
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                [
                <span className='group-hover:underline'>
                  {isCollapsed ? '+' : '-'}
                </span>
                ]
              </button>
            )}
            {comment.deleted ? (
              <p>deleted</p>
            ) : (
              <Link className='hover:underline' href={`/user?id=${comment.by}`}>
                {comment.by}
              </Link>
            )}
            <time>{comment.time ? getTimeAgo(comment.time) : '? ago'}</time>

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
            <CommentTile key={id} id={id} level={level + 1} />
          ))}
        </div>
      )}
    </article>
  );
}
