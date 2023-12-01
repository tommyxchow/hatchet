import Comments from '@/components/ui/Comments';
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

  return (
    <article className='flex flex-col gap-4'>
      <div className='sticky inset-0 border-b border-neutral-700 bg-black py-4'>
        <StoryTile story={item} />
      </div>

      {item.text && <ItemText text={item.text} />}

      <div className='flex flex-col gap-4'>
        {item.kids && <Comments ids={item.kids} />}
      </div>
    </article>
  );
}
