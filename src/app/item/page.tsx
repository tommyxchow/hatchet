import Comments from '@/components/ui/Comments';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

export const revalidate = 60 * 5;

export default async function ItemPage({ searchParams }: RouteParams) {
  const itemId = searchParams.id;

  if (!itemId || typeof itemId !== 'string') {
    return <p>Invalid item id</p>;
  }

  const item = await HNClient.fetchItem(parseInt(itemId));

  return (
    <article className='flex flex-col gap-8'>
      <section>
        <StoryTile story={item} />
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='font-semibold'>comments</h2>

        {item.kids && <Comments ids={item.kids} />}
      </section>
    </article>
  );
}
