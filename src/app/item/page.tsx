import CommentTile from '@/components/ui/CommentTile';
import { ItemText } from '@/components/ui/ItemText';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { type RouteParams } from '@/lib/types';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 60;

export default async function ItemPage({ searchParams }: RouteParams) {
  const { id: itemId } = searchParams;

  if (!itemId || typeof itemId !== 'string') {
    throw Error('Invalid item id');
  }

  const item = await HNClient.fetchItemById(parseInt(itemId));

  if (!item) notFound();

  const { text, kids, by } = item;

  return (
    <article className='flex flex-col gap-4'>
      <div className='sticky inset-0 border-b border-neutral-300 bg-neutral-50 py-4 dark:border-neutral-700 dark:bg-black'>
        <StoryTile story={item} />
      </div>

      {text && (
        <div className='border-b border-neutral-300 pb-4 dark:border-neutral-700'>
          <ItemText text={text} />
        </div>
      )}

      {kids && by && (
        <ul className='flex flex-col'>
          {kids.map((id) => (
            <li key={id}>
              <CommentTile postAuthorUsername={by} id={id} level={0} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
