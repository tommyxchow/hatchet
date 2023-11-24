'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HNClient } from '@/lib/hnClient';
import { getTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

interface CommentProps {
  id: number;
  level: number;
}

export default function CommentTile({ id, level }: CommentProps) {
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

  return (
    <article className='flex flex-col'>
      <div className='flex'>
        <div className='flex'>
          {Array.from({ length: level }).map((_, index) => (
            <div
              key={`${id}-${index}`}
              className='w-4 border-l border-neutral-700'
            />
          ))}
        </div>

        <div className='flex flex-col py-2'>
          <div className='flex gap-4 text-sm font-medium text-neutral-400'>
            <p>
              {comment.deleted ? 'deleted' : comment.by} ·{' '}
              {comment.time ? getTimeAgo(comment.time) : '? ago'}
            </p>
          </div>
          <div
            className='flex flex-col gap-4'
            dangerouslySetInnerHTML={{ __html: comment.text ?? '' }}
          />
        </div>
      </div>

      {comment.kids && (
        <div className='flex flex-col'>
          {comment.kids.map((id) => (
            <CommentTile key={id} id={id} level={level + 1} />
          ))}
        </div>
      )}
    </article>
  );
}
