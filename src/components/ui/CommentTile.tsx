import { HNClient } from '@/lib/hnClient';
import { getTimeAgo } from '@/lib/utils';

type CommentProps = {
  id: number;
  level: number;
};

export default async function CommentTile({ id, level }: CommentProps) {
  const comment = await HNClient.fetchItem(id);

  return (
    <article className='flex flex-col'>
      <div className='flex'>
        <div className='flex'>
          {[...Array(level)].map((index) => (
            <div key={index} className='w-4 border-l border-neutral-700' />
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
