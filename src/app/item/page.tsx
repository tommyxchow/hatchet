import CommentTile from '@/components/CommentTile';
import StoryTile from '@/components/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { type RouteParams } from '@/lib/types';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 60;

export default async function ItemPage({ searchParams }: RouteParams) {
  const { id: itemId } = await searchParams;

  if (!itemId || typeof itemId !== 'string') {
    throw Error('Invalid item id');
  }

  const item = await HNClient.fetchItemById(parseInt(itemId));

  if (!item) notFound();

  const { kids, by } = item;

  return (
    <article className='flex flex-col'>
      <StoryTile story={item} showText />

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
