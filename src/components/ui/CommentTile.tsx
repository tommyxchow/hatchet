import { HNComment } from '@/lib/types';
import { getTimeAgo } from '@/lib/utils';

type CommentProps = {
  comment: HNComment;
};

export default function CommentTile({ comment }: CommentProps) {
  return (
    <article className='flex'>
      <div className='flex'>
        {[...Array(comment.indent).keys()].map((index) => (
          <div key={index} className='w-4 border-l border-neutral-700' />
        ))}
      </div>

      <div className='flex flex-col py-2'>
        <div className='flex gap-4 text-sm font-medium text-neutral-400'>
          <p>
            {comment.by} • {comment.time ? getTimeAgo(comment.time) : '? ago'}
          </p>
          {/* <p>
            {comment.time} {Date.now()}
          </p> */}
        </div>
        {!comment.collapsed && (
          <div
            className='flex flex-col gap-4'
            dangerouslySetInnerHTML={{ __html: comment.text ?? '' }}
          />
        )}
      </div>
    </article>
  );
}
