'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import { getTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
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
    queryFn: () => HNClient.fetchItem(id),
    enabled: isVisible,
    staleTime: 60 * 5,
  });

  if (isPending) return <div className='h-48' ref={commentRef} />;
  if (error) return <p>Error: {error.message}</p>;

  if (comment.dead) return null;

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

        <div className='flex flex-col py-2'>
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
            <p>{comment.deleted ? 'deleted' : comment.by}</p>
            <time>{comment.time ? getTimeAgo(comment.time) : '? ago'}</time>
          </div>

          <div className={isCollapsed ? 'hidden' : undefined}>
            {comment.text && <ItemText text={comment.text} />}
          </div>
        </div>
      </div>

      {comment.kids && (
        <div className={`flex flex-col ${isCollapsed ? 'hidden' : ''}`}>
          {comment.kids.map((id) => (
            <CommentTile key={id} id={id} level={level + 1} />
          ))}
        </div>
      )}
    </article>
  );
}
