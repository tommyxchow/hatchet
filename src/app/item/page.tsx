import CommentTile from '@/components/CommentTile';
import { StoryTile } from '@/components/StoryTile';
import { HNClient } from '@/lib/hnClient';
import type { HNItem } from '@/lib/types';
import { notFound } from 'next/navigation';

export default async function ItemPage({ searchParams }: PageProps<'/item'>) {
  const { id: itemId } = await searchParams;

  if (typeof itemId !== 'string' || !itemId) {
    throw Error('Invalid item id');
  }

  const item = await HNClient.fetchItemById(parseInt(itemId));

  if (!item) notFound();

  const { kids, by } = item;

  // Batch fetch top-level comments server-side for faster initial render
  const topLevelComments: (HNItem | null)[] = kids
    ? await HNClient.fetchItemsByIds(kids)
    : [];

  // Create a map of id -> comment for O(1) lookup
  const commentsMap = new Map<number, HNItem>();
  topLevelComments.forEach((comment) => {
    if (comment) commentsMap.set(comment.id, comment);
  });

  return (
    <article className='flex flex-col'>
      <StoryTile story={item} showText />

      {kids && by && (
        <ul className='flex flex-col'>
          {kids.map((id) => (
            <li key={id}>
              <CommentTile
                postAuthorUsername={by}
                id={id}
                level={0}
                initialData={commentsMap.get(id)}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
