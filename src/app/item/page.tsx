import Comments from '@/components/ui/Comments';
import { ItemText } from '@/components/ui/ItemText';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { type RouteParams } from '@/lib/types';

export const revalidate = 60;

export default async function ItemPage({ searchParams }: RouteParams) {
  const itemId = searchParams.id;

  if (!itemId || typeof itemId !== 'string') {
    return <p>Invalid item id</p>;
  }

  const item = await HNClient.fetchItem(parseInt(itemId));

  return (
    <article className='flex flex-col gap-8'>
      <StoryTile story={item} />

      {item.text && <ItemText text={item.text} />}

      <div className='flex flex-col gap-4'>
        {item.kids && <Comments ids={item.kids} />}
      </div>
    </article>
  );
}
